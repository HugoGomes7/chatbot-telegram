const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const moment = require('moment')
const bot = new Telegraf(env.token)
const { getSchedule, getTask } = require('./services')

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
})