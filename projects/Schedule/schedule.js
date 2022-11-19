const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const moment = require('moment')

const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const {
  getSchedule,
  getTask,
  getPendingTasks,
  getCompletedTasks,
  includeTask,
  concludeTask,
  deleteTask,
  updateDateTask,
  updateObsTask
} = require('./services')

const bot = new Telegraf(env.token)

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
})

const buttonsTask = idTask => Extra.HTML().markup(Markup.inlineKeyboard([
  Markup.callbackButton('✔️', `Conclude ${idTask}`),
  Markup.callbackButton('📅', `setDate ${idTask}`),
  Markup.callbackButton('📝', `addNote ${idTask}`),
  Markup.callbackButton('❌', `Delete ${idTask}`),
], { columns: 4 }))

const formatDate = date =>
  date ? moment(date).format('DD/MM/YYYY') : ''

const displayTask = async (context, taskId, newMessage = false) => {
  const task = await getTask(taskId)
  const conclusion = task.dt_conclusion ?
    `\n<b>Completed in:</b> ${formatDate(task.dt_conclusion)}` : ''
  const msg = `
    <b>${task.description}</b>
    <b>Prevision:</b> ${formatDate(task.dt_prevision)}${conclusion}
    <b>Observations:</b>\n${task.observation || ''}
  `
  if (newMessage) {
    context.reply(msg, buttonsTask(taskId))
  }
  else {
    context.editMessageText(msg, buttonsTask(taskId))
  }
}

const buttonsSchedule = tasks => {
  const buttons = tasks.map(item => {
    const date = item.dt_prevision ?
      `${moment(item.dt_prevision).format('DD/MM/YYYY')} - ` : ''
    return [Markup.callbackButton(`${date}${item.description}`, `display ${item.id}`)]
  })
  return Extra.markup(Markup.inlineKeyboard(buttons, { columns: 1 }))
}

bot.command('day', async context => {
  const tasks = await getSchedule(moment())
  context.reply(`Here is the your schedule of day`, buttonsSchedule(tasks))
})

bot.command('tomorrow', async context => {
  const tasks = await getSchedule(moment().add({ day: 1 }))
  context.reply('Here is your schedule until tomorrow', buttonsSchedule(tasks))
})

bot.command('week', async context => {
  const tasks = await getSchedule(moment().add({ week: 1 }))
  context.reply('Here is your week schedule', buttonsSchedule(tasks))
})

bot.command('completed', async context => {
  const tasks = await getCompletedTasks()
  context.reply('These are the tasks you completed', buttonsSchedule(tasks))
})

bot.command('pending', async context => {
  const tasks = await getPendingTasks()
  context.reply('These are the pending tasks', buttonsSchedule(tasks))
})

bot.action(/display (.+)/i, async context => {
  await displayTask(context, context.match[1])
})

bot.action(/conclude (.+)/i, async context => {
  await concludeTask(context.match[1])
  await displayTask(context, context.match[1])
  await context.reply('Completed tasks!')
})

bot.action(/delete (.+)/i, async context => {
  await deleteTask(context.match[1])
  await context.editMessageText('Deleted task!')
})

const keyboardDates = Markup.keyboard([
  ['Today', 'Tomorrow'],
  ['1 week', '1 Month'],
]).resize().oneTime().extra()

let idTask = null

const dateScene = new Scene('date')

dateScene.enter(context => {
  idTask = context.match[1]
  context.reply('Do you want to set some date?', keyboardDates)
})

dateScene.leave(context => idTask = null)

dateScene.hears(/today/gi, async context => {
  const date = moment()
  handleDate(context, date)
})

dateScene.hears(/tomorrow/gi, async context => {
  const date = moment().add({ days: 1 })
  handleDate(context, date)
})

dateScene.hears(/^(\d+) days?$/gi, async context => {
  const date = moment().add({ days: context.match[1] })
  handleDate(context, date)
})

dateScene.hears(/^(\d+) weeks?/gi, async context => {
  const date = moment().add({ weeks: context.match[1] })
  handleDate(context, date)
})

dateScene.hears(/^(\d+) months/gi, async context => {
  const date = moment().add({ months: context.match[1] })
  handleDate(context, date)
})

dateScene.hears(/(\d{2}\/\d{2}\/\d{4})/g, async context => {
  const date = moment(context.match[1], 'DD/MM/YYYY')
  handleDate(context, date)
})

const handleDate = async (context, date) => {
  await updateDateTask(idTask, date)
  await context.reply('Date update!')
  await displayTask(context, idTask, true)
  context.scene.leave()
}

dateScene.on('message', context => {
  context.reply('Accepted standards:\ndd/MM/YYYY\nX days\nX weeks\nX months')
})

bot.on('text', async context => {
  try {
    const task = await includeTask(context.update.message.text)
    await displayTask(context, task.id, true)
  }
  catch (err) {
    console.log(err)
  }
})

obsScene.enter(context => {
  idTask = context.match[1]
  context.reply('Add your notes...')
})

obsScene.leave(context => idTask = null)

obsScene.on('text', async context => {
  const task = await getTask(idTask)
  const newText = context.update.message.text
  const obs = task.observation ?
    task.observation + '\n------\n' + newText : newText
  const res = await updateObsTask(idTask,)
})

bot.startPolling()
