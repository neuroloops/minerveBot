require('dotenv').config()
require('./getView')

const { listMenu } = require('./menu')
const { Client, Intents } = require('discord.js')

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
  } else {
    message.reply(
      `salut ${
        message.member.nickname
      } les commandes disponible sont \n ${listMenu(message)}`
    )
  }
})
client.login(BOT_TOKEN)
