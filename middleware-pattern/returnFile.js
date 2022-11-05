const env = require('../.env')
const Telegraf = require('telegraf')
const axios = require('axios')
const bot = new Telegraf(env.token)

bot.on('voice', async context => {
  const id = context.update.message.voice.file_id
  const reply = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
  context.replyWithVoice({ url: `${env.apiFileUrl}/${reply.data.result.file_path}` })
})

bot.on('photo', async context => {
  const id = context.update.message.photo[0].file_id
  const reply = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
  context.replyWithPhoto({ url: `${env.apiFileUrl}/${reply.data.result.file_path}` })
})

bot.startPolling()