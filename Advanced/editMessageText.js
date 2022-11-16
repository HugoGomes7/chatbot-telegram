const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let progress = 3

const getProgress = () => {
  let label = ''
  for (let i = 1; i <= 5; i++) {
    label += (progress === i) ? '||' : '='
  }
  return label
}

const buttons = () => Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('<<', '<'),
  Markup.callbackButton(getProgress(), 'result'),
  Markup.callbackButton('>>', '>')
], { columns: 3 }))

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
  context.reply(`Current progress: ${progress}`, buttons())
})

bot.action('<', context => {
  if (progress === 1) {
    context.answerCbQuery('Minimum limit!!!')
  }
  else {
    progress--
    context.editMessageText(`Current progress: ${progress}`, buttons())
  }
})

bot.action('>', context => {
  if (progress === 5) {
    context.answerCbQuery('Maximum limit!!!')
  }
  else {
    progress++
    context.editMessageText(`Current progress: ${progress}`, buttons())
  }
})

bot.action('result', context => {
  context.answerCbQuery(`Current progress: ${progress}`)
})

bot.startPolling()