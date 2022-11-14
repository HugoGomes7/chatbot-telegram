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

const buttonsYN = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('Yes', 'y'),
  Markup.callbackButton('No', 'n')
], { columns: 2 }))

bot.hears('Can I automate tasks?', async context => {
  await context.replyWithMarkdown('Of course!!!\nDo you want to test?', buttonsYN)
})

bot.action('n', context => {
  context.reply('Ok.', keyboardOptions)
})

bot.hears([/any message/i, /mensagem qualquer/i], context => {
  context.reply('HAHAHA this joke is very old. Try other...', keyboardOptions)
})

bot.on('text', async context => {
  let message = context.message.text
  message = message.split('').reverse().join('')
  await context.reply(`The your message on the contrary is: ${message}`)
  await context.reply('That means I can read the messages your send and process them. :)')
})

const location = Markup.keyboard([
  Markup.locationRequestButton('Click here to sent your location!')
]).resize().oneTime().extra()

bot.action('y', async context => {
  await context.reply('Alright... Send me your location or write on a any message...', location)
})

bot.on('location', async context => {
  try {
    const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather'
    const { latitude: lat, longitude: lon } = context.message.location
    const res = await axios.get(`${apiWeatherURL}?lat=${lat}&lon=${lon}&appid=263e96693cdf4f0563b2b60d386367aa&units=metric`)
    await context.reply(`Hmmm... you are in ${res.data.name}`)
    await context.reply(`Current temperature: ${res.data.main.temp}°C`, keyboardOptions)
  }
  catch (e) {
    context.reply('erro, não deu certo', keyboardOptions)
  }
})

bot.startPolling()