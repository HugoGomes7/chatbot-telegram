const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const bot = new Telegraf(env.token)

const functionButtons = list => Extra.markup(
  Markup.inlineKeyboard(
    list.map(item => Markup.callbackButton(item, `delete ${item}`))
    , { columns: 3 }
  )
)

bot.use(session())

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.reply(`Welcome, ${name}!`)
  await context.reply('Write the items you want to add...')
  context.session.list = []
})

bot.on('text', context => {
  let msg = context.update.message.text
  context.session.list.push(msg)
  context.reply(`${msg} added!`, functionButtons(context.session.list))
})

bot.action(/delete (.+)/, context => {
  context.session.list = context.session.list.filter(
    item => item !== context.match[1])
  context.reply(`${context.match[1]} deleted!`, functionButtons(context.session.list))
})

bot.startPolling()