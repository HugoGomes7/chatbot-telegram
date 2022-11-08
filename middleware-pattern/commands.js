const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!\nLet me know if you need help with the command "/help"`)
})

bot.command('help', context => context.reply(
  '/help: I will show options'
  + '\n/help1: to testing hears'
  + '\n/test1: test1'
  + '\n/test2: test2'
  + '\n/test3: test3'
))

bot.hears('/help1', context => context.reply('Testing command "/help1" with success'))

bot.hears(/\/test(1|2|3)/i, context => context.reply('standard answer'))

bot.startPolling()