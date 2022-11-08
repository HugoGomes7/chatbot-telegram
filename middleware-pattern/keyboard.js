const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const moodKeyboard = Markup.keyboard([
  ['🤪', '🥰', '🙃'],
  ['😥', '😡', '🥵'],
  ['🤔', '🤒'],
  ['😭']
]).resize().extra()

bot.start(async context => {
  await context.reply(`Welcome, ${context.update.message.from.first_name}!`)
  await context.reply('How is your mood today?', moodKeyboard)
})

bot.hears('😭', context => context.reply('How can I help you? 😕'))
bot.hears('🤪', context => context.reply('test 1'))
bot.hears('🤒', context => context.reply('test 2'))
bot.hears('🥰', context => context.reply('test 3'))
bot.on('text', context => context.reply('Testing'))

bot.startPolling()