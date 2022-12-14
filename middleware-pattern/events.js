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

bot.on('contact', context => {
  const contact = context.update.message.contact
  console.log(contact)
  context.reply(`I'll remember
    ${contact.first_name} (${contact.phone_number})
  `)
})

bot.on('voice', context => {
  const voice = context.update.message.voice
  console.log(voice)
  context.reply(`Audio received, it has ${voice.duration} seconds`)
})

bot.on('photo', context => {
  const photo = context.update.message.photo
  console.log(photo)
  photo.forEach((ph, i) => {
    context.reply(`Photo ${i} has resolution of ${ph.width}x${ph.height}`)
  })
})

bot.on('sticker', context => {
  const sticker = context.update.message.sticker
  console.log(sticker)
  context.reply(`You sended the sticker
    ${sticker.emoji} of the set ${sticker.set_name}
  `)
})

bot.startPolling() 