const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(context => {
  if (context.update.message.from.id == `${env.clientId}`) {
    context.reply('Hi, mister!')
  }
  else {
    context.reply('Sorry, I only answer my mister!')
  }
})

bot.startPolling()