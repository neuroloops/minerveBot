require('dotenv').config()
const { Client, Intents } = require('discord.js')
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const BOT_TOKEN = process.env.BOT_TOKEN

const Discord = require('discord.js')

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

  if (command === 'who') {
    const { nickname } = message.author

    message.reply(`salut ${message.member.nickname}`)
  }
})
client.login(BOT_TOKEN)
