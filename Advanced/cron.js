const env = require('../.env');
const schedule = require('node-schedule')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const telegram = new Telegram(env.token)
const bot = new Telegraf(env.token)

let count = 1

const button = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('Cancel', 'cancel')
]))

const notify = () => {
  telegram.sendMessage(env.userId, `This is an event message [${count++}]`, button)
}

const notification = new schedule.scheduleJob('*/2 * * * * *', notify)

bot.action('cancel', context => {
  notification.cancel()
  context.reply('OK. I stopped bothering... :)')
})

bot.startPolling()