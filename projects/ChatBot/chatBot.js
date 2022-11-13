const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)

const keyboardOptions = Markup.keyboard([
  ['Whats are bots?', 'Who created me?'],
  ['Can I automate tasks?'],
  ['How I was developed?']
]).resize().extra()

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.replyWithMarkdown(`*Hi, ${name}*\nI'm D'Luccabot`)
  await context.replyWithPhoto('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4C7g7qNmxye01hIWsnHgfNDZ8NLbXMB_6pSdFJufx&s')
  await context.replyWithMarkdown(`_Can I help you with anything?_`, keyboardOptions)
})

bot.startPolling()