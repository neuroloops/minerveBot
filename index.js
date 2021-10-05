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
    message.reply(`salut ${message.member.nickname}`)
  } else if (command === 'command') {
    message.reply(`1: fabrication, 2: transformation, 3: exploitation`)
  } else if (command === 'liste:1') {
    fabrication(message, 'Fabrication')
  } else if (command === 'liste:2') {
    fabrication(message, 'Transformation')
  } else if (command === 'liste:3') {
    fabrication(message, 'Exploitation')
  }
})
client.login(BOT_TOKEN)

const base = require('airtable').base(process.env.AIRTABLE_TABLE)

const fabrication = (message, view) =>
  base('Table 1')
    .select({
      view,
      fields: ['Name', 'Artisanat'],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const items = []
        records.forEach(function (record) {
          items.push(`${record.get('Name')} : [${record.get('Artisanat')}]  \n`)
        })
        message.reply(`${items}`)
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )
