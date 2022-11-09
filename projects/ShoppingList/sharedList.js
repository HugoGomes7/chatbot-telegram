const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let list = []

const functionButtons = () => Extra.markup(
  Markup.inlineKeyboard(
    list.map(item => Markup.callbackButton(item, `delete ${item}`)),
    { columns: 3 }
  )
)

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.reply(`Welcome, ${name}!`)
  await context.reply('Write the items you want to add...')
})

bot.on('text', context => {
  list.push(context.update.message.text)
  context.reply(`${context.update.message.text} added!`, functionButtons())
})

bot.action(/delete (.+)/, context => {
  list = list.filter(item => item != context.match[1])
  context.reply(`${context.match[1]} deleted!`, functionButtons())
})

bot.startPolling()


