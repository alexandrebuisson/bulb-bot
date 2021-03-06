require('dotenv').config()
const Discord = require('discord.js')

const bot = new Discord.Client()
const fs = require('fs')
const path = require('path')

const https = require('https')

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))
const config = require('./config.json')

let options = {}

try {
  const key = fs.readFileSync(path.resolve(__dirname, './encryption/server.key'))
  const cert = fs.readFileSync(path.resolve(__dirname, './encryption/server.cert'))
  options = {
    key,
    cert,
  }
} catch (e) {
  console.log('error certification files', e)
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
}).listen(9090)

const cooldowns = new Discord.Collection()
bot.commands = new Discord.Collection()

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  bot.commands.set(command.name, command)
}

bot.on('ready', () => {
  console.log('Bulb est en ligne !')
})

bot.on('guildMemberAdd', (member) => {
   member.roles.add(member.guild.roles.cache.find(role => role.name === "intérimaire"))
})

bot.on('message', (message) => {
  const args = message.content.slice(config.prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = bot.commands.get(commandName)
  || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  if (command.args && !args.length) {
    let reply = `Tu as oublié un argument, ${message.author} !`

    if (command.usage) {
      reply += `\nLa bonne utilisation serait : \`${config.prefix}${command.name} ${command.usage}\``
    }
    return message.channel.send(reply)
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply("Malheuresement la commande n'est pas disponible en DM !")
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      message.reply(`Merci de patienter ${timeLeft.toFixed(1)} secondes avant de réutiliser \`${command.name}\`.`)
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
  }
  try {
    command.execute(bot, config, message, args, message.content)
  } catch (error) {
    console.error(error)
    if (command.name === 'removecolor') {
      message.reply("La couleur n'existe pas")
    } else {
      message.reply('Il y a eu une erreur :c')
    }
  }
})


bot.login(config.token)
