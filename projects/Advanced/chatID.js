const env = require('../../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(context => {
  console.log(context.chat.id === context.update.message.from.id)
})

bot.startPolling()