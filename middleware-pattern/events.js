const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
})

bot.on('text', context =>
  context.reply(`Text ${context.update.message.text} received with success`)
)

bot.on('location', context => {
  const location = context.update.message.location
  console.log(location)
  context.reply(
    `Understood, you are in 
      Latitude: ${location.latitude}
      Longitude: ${location.longitude}
    `
  )
})

bot.startPolling() 