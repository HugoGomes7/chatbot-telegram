const env = require('../.env')
const Telegraf = require('telegraf')
const moment = require('moment')
const bot = new Telegraf(env.token)

bot.hears(['hello bot', 'hello, bot', 'Hello, bot', 'Hello bot'], context => context.reply('Hello, my human friend! 😄'))
bot.hears(['hi bot', 'hi, bot', 'Hi, bot', 'Hi bot'], context => context.reply('Hi, my human friend! 😄'))

bot.hears(/hello/i, context => context.reply('Hello, my human friend! 😄'))
bot.hears(/hi/i, context => context.reply('Hi, my human friend! 😄'))

bot.startPolling()