require('dotenv').config()
require('./getView')
require('./update')

const { listMenu, competenceItem } = require('./menu')
const { Client, Intents } = require('discord.js')
const update = require('./update')

const BOT_TOKEN = process.env.BOT_TOKEN

const prefix = '!'

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

  if (+command > 0) {
    getView(message, command)
  } else if (command === 'up') {
    const competence = commandBody.split(' ')[1]
    const value = commandBody.split(' ')[2]
    if (!value || !competence) {
      message.reply(
        ` les commandes disponible sont \n ${listMenu('competenceItem')}`
      )
      return
    }
    console.log(competenceItem[1])
    message.reply(
      `${message.member.nickname}, on up ${
        competenceItem[competence - 1]
      } au niveau ${value} `
    )
  } else {
    message.reply(
      `salut ${
        message.member.nickname
      } les commandes disponible sont \n ${listMenu('menuItem')}`
    )
  }
})
client.login(BOT_TOKEN)
