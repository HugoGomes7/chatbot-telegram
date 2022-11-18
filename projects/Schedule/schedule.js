const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const moment = require('moment')
const {
  getSchedule,
  getTask,
  getPendingTasks,
  getCompletedTasks,
  includeTask,
  concludeTask,
  deleteTask
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

bot.action(/display (.+)/, async context => {
  await displayTask(context, context.match[1])
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
  context.reply('These are the tasks you completed', buttonsSchedule())
})

bot.startPolling()
