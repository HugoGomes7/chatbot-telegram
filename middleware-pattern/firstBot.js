const env = require('../.env');
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(context => {
  const from = context.update.message.from
  console.log(from)
  context.reply(`Welcome, ${from.first_name}!`)
})

bot.on('text', async (context, next) => {
  await context.reply('Mid 1')
  next()
})

bot.on('text', async context => {
  await context.reply('Mid 2')
})

bot.startPolling()