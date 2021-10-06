require('dotenv').config()
require('./getView')
require('./update')

const { listMenu, competenceItem, menuItem } = require('./menu')
const { Client, Intents } = require('discord.js')
const update = require('./update')

const BOT_TOKEN = process.env.BOT_TOKEN
const base = require('airtable').base(process.env.AIRTABLE_TABLE)
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
    getView(base, message, command)
  } else if (command === 'up') {
    const competence = commandBody.split(' ')[1]
    const value = commandBody.split(' ')[2]
    if (!value || !competence) {
      message.reply(` les compétences sont \n ${listMenu('competenceItem')}`)
      return
    }

    message.reply(
      `${message.member.nickname}, on up ${
        competenceItem[competence - 1]
      } au niveau ${value} `
    )
  } else {
    message.reply(
      `salut ${
        message.member.nickname
      } les commandes disponible pour lister par catégorie sont:
${listMenu('menuItem')}
**! + numéro** 
*ex pour afficher ${menuItem[1]}* : **!2**
---
ou pour changer vos compétences:
${listMenu('competenceItem')}
**!up + numéro + valeur**
*ex pour augmenter ${competenceItem[1]} à 40* : **!up 2 40**
      `
    )
  }
})
client.login(BOT_TOKEN)
