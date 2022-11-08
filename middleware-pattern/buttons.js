const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let cont = 0

const buttons = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('+1', 'add 1'),
  Markup.callbackButton('+10', 'add 10'),
  Markup.callbackButton('+100', 'add 100'),
  Markup.callbackButton('-1', 'sub 1'),
  Markup.callbackButton('-10', 'sub 10'),
  Markup.callbackButton('-100', 'sub 100'),
  Markup.callbackButton('🔄 Reset', 'reset'),
  Markup.callbackButton('☑️ Result', 'result')
], { columns: 3 }))

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.reply(`Welcome, ${name}!`)
  await context.reply(`Current count: ${cont}`, buttons)
})

bot.action(/add (\d+)/, context => {
  cont += parseInt(context.match[1])
  context.reply(`\nCurrent count: ${cont}`, buttons)
})

bot.action(/sub (\d+)/, context => {
  cont -= parseInt(context.match[1])
  context.reply(`\nCurrent count: ${cont}`, buttons)
})

bot.action('reset', context => {
  cont = 0
  context.reply(`\nCurrent count: ${cont}`, buttons)
})

bot.action('result', context => {
  context.answerCbQuery(`\nCount result: ${cont}`)
})

bot.startPolling()
