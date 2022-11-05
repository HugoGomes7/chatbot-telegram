const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)
const axios = require('axios')

but.on('voice', async context => {
  const id = context.update.message.voice.file_id
  const reply = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
  context.replyWithVoice({ url: `${env.apiFileUrl}/${reply.data.result.file_path}` })
})