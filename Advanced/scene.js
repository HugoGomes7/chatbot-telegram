const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const bot = new Telegraf(env.token)

bot.start(context => {
  const name = context.update.message.from.first_name
  context.reply(`Welcome, ${name}!`)
  context.reply('Enter with /echo or /sum to start...')
})

// Echo Mode
const echoScene = new Scene('echo')
echoScene.enter(context => context.reply('Entering in Echo Scene...'))
echoScene.leave(context => context.reply('Leaving Echo Scene...'))
echoScene.command('leave', leave())
echoScene.on('text', async context => {
  await context.reply(context.message.text)
  await context.reply('Write /leave to leave')
})
echoScene.on('message', context => context.reply('Only text messages, please...'))

//Sum Mode
let sum = 0
const sumScene = new Scene('sum')
sumScene.enter(context => context.reply('Entering in Sum Scene... Write numbers to sum...'))
sumScene.leave(context => context.reply('Leaving Sum Scene...'))

sumScene.use(async (context, next) => {
  await context.reply('You are in Sum Scene... Write numbers to sum...')
  await context.reply('Other commands: /clean /leave')
  next()
})

sumScene.command('clean', context => {
  sum = 0
  context.reply(`Value: ${sum}`)
})

sumScene.command('leave', leave())

sumScene.hears(/(\d+)/, context => {
  sum += parseInt(context.match[1])
  context.reply(`Value: ${sum}`)
})

sumScene.on('message', context => {
  context.reply('Only numbers, please...')
})

//Stage
const stage = new Stage([echoScene, sumScene])
bot.use(session())
bot.use(stage.middleware())
bot.command('sum', enter('sum'))
bot.command('echo', enter('echo'))
bot.on('message', context => context.reply('Enter with /echo or /sum to start...'))

bot.startPolling()
