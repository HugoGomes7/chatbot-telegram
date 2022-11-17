const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const moment = require('moment')
const bot = new Telegraf(env.token)
const { getSchedule, getTask } = require('./services')

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
})

const formatDate = Date => Date ? moment(Date).format('DD/MM/YYYY') : ''

const displayTask = async (context, taskId, newMessage = false) => {
  const task = await getTask(taskId)
  const conclusion = task.dt_conclusion ? `\n<b>Completed in:</b> ${formatDate(task.dt_conclusion)}` : ''
  const msg = `
    <b>${task.description}</b>
    <b>Prevision:</b> ${formatDate(task.dt_prevision)}${conclusion}
    <b>Observations:</b>\n${task.observation || ''}
  `

  if (newMessage) {
    context.reply(msg, buttonsTask(taskId))
  }
  else {
    context.editMessage(msg, buttonsTask(taskId))
  }
}

const buttonsSchedule = tasks => {
  const buttons = tasks.map(item => {
    const Date = item.dt_prevision ? `${moment(item.dt_prevision).format('DD/MM/YYYY')} - ` : ''
    return [Markup.callbackButton(`${Date}${item.description}`, `show ${item.id}`)]
  })
  return Extra.markup(Markup.inlineKeyboard(buttons, { columns: 1 }))
}

const buttonsTask = idTask => Extra.HTML().markup(Markup.inlineKeyboard[
  Markup.callbackButton('', `Completed ${idTask}`),
  Markup.callbackButton('', `setDate ${idTask}`),
  Markup.callbackButton('', `addNota ${idTask}`),
  Markup.callbackButton('', `Delete ${idTask}`)
], { columns: 4 })

bot.command('day', async context => {
  const tasks = await getSchedule(moment())
  context.reply(`Here is the your schedule of day`, buttonsSchedule(tasks))
})
