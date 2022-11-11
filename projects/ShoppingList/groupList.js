const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let data = {}

const functionButtons = list => Extra.markup(
  Markup.inlineKeyboard(
    list.map(item => Markup.callbackButton(item, `delete ${item}`))
    , { columns: 3 }
  )
)

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.reply(`Welcome, ${name}!`)
  await context.reply('Write the items you want to add...')
})

bot.use((context, next) => {
  const chatId = context.chat
  if (!data.hasOwnProperty(chatId)) data[chatId] = []
  context.itens = data[chatId]
  next()
})

bot.on('text', context => {
  let textUser = context.update.message.text
  if (textUser.startsWith('/')) textUser = textUser.substring(1)
  context.itens.push(textUser)
  context.reply(`${textUser} added`, functionButtons(context.itens))
})

bot.action(/delete (.+)/, context => {
  const index = context.itens.indexOf(context.match[1])
  if (index >= 0) context.itens.splice(index, 1)
  context.reply(`${context.match[1]} deleted`, functionButtons(context.itens))
})

bot.startPolling()