const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)

const keyboardOptions = Markup.keyboard([
  ['What are bots?', 'Who created me?'],
  ['Can I automate tasks?'],
  ['How I was developed?'],
  ['What was I developed for?']
]).resize().extra()

bot.start(async context => {
  const name = context.update.message.from.first_name
  await context.replyWithMarkdown(`*Hi, ${name}*\nI'm D'Luccabot`)
  await context.replyWithPhoto('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4C7g7qNmxye01hIWsnHgfNDZ8NLbXMB_6pSdFJufx&s')
  await context.replyWithMarkdown(`_Can I help you with anything?_`, keyboardOptions)
})

bot.hears('What are bots?', context => {
  context.replyWithMarkdown('Check out this article I found on google :) [link](https://www.kaspersky.com.br/resource-center/definitions/what-are-bots)', keyboardOptions)
})

bot.hears('Who created me?', async context => {
  await context.replyWithMarkdown('Who developed me is a very talented and cool guy, it is worth checking out his networks:')
  await context.replyWithMarkdown('LinkedIn: [link](https://www.linkedin.com/in/hugo-gomes-889658211)')
  await context.replyWithMarkdown('Github: [link](https://github.com/HugoGomes7)')
  context
  await context.replyWithMarkdown(`\n\n_Can I help you with anything?_`, keyboardOptions)
})

bot.hears('How I was developed?', async context => {
  await context.replyWithMarkdown('I was developed with Javascript and NodeJS.')
  await context.replyWithMarkdown('You can see all development in the project repository on Github: [link](https://github.com/HugoGomes7/chatbot-telegram)')
  await context.replyWithMarkdown(`\n\n_Can I help you with anything?_`, keyboardOptions)
})

bot.hears('What was I developed for?', async context => {
  await context.replyWithMarkdown('To be integrated into two other projects:')
  await context.replyWithMarkdown('1. Shopping List')
  await context.replyWithMarkdown('2. Schedule')
  await context.replyWithMarkdown('You can see all development in the project repository on Github: [link](https://github.com/HugoGomes7/chatbot-telegram)')
  await context.replyWithMarkdown(`\n\n_Can I help you with anything?_`, keyboardOptions)
})



bot.startPolling()