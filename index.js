require('dotenv').config()
require('./getView')
require('./getComp')
require('./update')

const { listMenu, competenceItem, menuItem } = require('./menu')
const { Client, Intents } = require('discord.js')

const BOT_TOKEN = process.env.BOT_TOKEN
const base = require('airtable').base(process.env.AIRTABLE_TABLE)
const prefix = '!'

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

  if (+command > 0) {
    // check si la commande est un chiffre
    // et on lance la fonction getView pour chercher les valeur dans airtable
    getView(base, message, command)
  } else if (command === 'up') {
    // si c'est up, on sort les arguments

    const competence = commandBody.split(' ')[1]
    const value = commandBody.split(' ')[2]
    if (!value || !competence) {
      // commande incomplete: on affiche la liste de compétence

      message.reply(` les compétences sont \n ${listMenu('competenceItem')}`)
      return
    }
    // on a une competence et sa valeur => on update

    message.reply(
      `${message.member.nickname}, on up ${
        competenceItem[competence - 1]
      } au niveau ${value} `
    )
  } else if (command === 'comp') {
    const value = commandBody.split(' ')[1]
    if (!value) {
      // commande incomplete: on affiche la liste de compétence

      message.reply(` les compétences sont \n ${listMenu('competenceItem')}`)
      return
    }
    getComp(base, message, value)
  } else {
    // commande invalide , on affiche l'aide

    message.reply(
      `salut ${
        message.member.nickname
      } les commandes disponible pour lister par catégorie sont:

---------------------------------------------------------------------

${listMenu('menuItem')}

**! + numéro**
ex **!2** *pour afficher ${menuItem[1]}*

---------------------------------------------------------------------

pour lister les joueurs par compétences
**!comp + numéro **
ex: **!comp 15** *pour voir ${competenceItem[15 - 1]}*

`
    )
  }
})
client.login(BOT_TOKEN)
