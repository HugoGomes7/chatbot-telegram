const env = require('../../.env')
const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

let description = ''
let price = 0
let data = null

const confirmation = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('Yes', 'y'),
  Markup.callbackButton('No', 'n')
]))

const priceHandler = new Composer()
priceHandler.hears(/(\d+)/, context => {
  price = context.match[1]
  context.reply('Whats the payday?')
  context.wizard.next()
})
priceHandler.use(context => context.reply('Only numbers are accepted!'))

const dataHandler = new Composer()
dataHandler.hears(/(\d{2}\/\d{2}\/\d{4})/, context => {
  context.match[1]
  context.reply(`
  Summary of purchase:
    Description: ${description}
    Price: ${price}
    Data: ${data}
          \nConfirm?
  `, confirmation)
  context.wizard.next()
})
dataHandler.use(context => context.reply('ERROR! Enter with one data on format dd/MM/YYYY'))

const confirmationHandler = new Composer()
confirmationHandler.action('y', context => {
  context.reply('Purchase confirmed!')
  context.scene.leave()
})
confirmationHandler.action('n', context => {
  context.reply('Purchase deleted!')
  context.scene.leave()
})
confirmationHandler.use(context => context.reply('Only confirm your purchase!', confirmation))

const wizardPurchase = new WizardScene('purchase',
  context => {
    context.reply('What did you purchase?')
    context.wizard.next()
  },
  context => {
    description = context.update.message.text
    context.reply('What was the price?')
    context.wizard.next()
  },
  priceHandler,
  dataHandler,
  confirmationHandler
)

const bot = new Telegraf(env.token)
const stage = new Stage([wizardPurchase], { default: 'purchase' })
bot.use(session())
bot.use(stage.middleware())

bot.startPolling()