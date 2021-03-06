require('dotenv').config()
require('./getView')
require('./getComp')
require('./update')

const { listMenu, competenceItem, menuItem } = require('./menu')
const { Client, Intents } = require('discord.js')

const BOT_TOKEN = process.env.BOT_TOKEN
const base = require('airtable').base(process.env.AIRTABLE_TABLE)
const prefix = '!minerve '

// setup bot
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', function (message) {
  if (message.author.bot) return

  if (!message.content.startsWith(prefix)) return

  const commandBody = message.content.slice(prefix.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()
  if (command === 'liste') {
    const value = commandBody.split(' ')[1]
    console.log(value)
    if (!value) {
      // commande incomplete: on affiche la liste de compétence

      help(message)
      return
    }
    getComp(base, message, value)
  } else if (command === 'help') {
    // commande invalide , on affiche l'aide
    help(message)
  }
})

const help = message => {
  message.reply(
    `salut ${
      message.member.nickname
    } les commandes disponible pour lister les joueurs par compétences:

    ${listMenu('competenceItem')}

**${prefix}liste + numéro **
ex: **${prefix}liste 15** *pour voir ${competenceItem[15 - 1]}*

`
  )
}
client.login(BOT_TOKEN)
