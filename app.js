require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const randomPuppy = require('random-puppy')
const fs = require('fs')
const path = require('path')
const https = require('https')

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
  res.writeHead(200, {
      'Content-type': 'text/plain'
  })
}).listen(9000)

bot.on('ready', () => {
  console.log("Je suis connecté !")
})

bot.login('NzA4NzYwNDY1OTk5NzkwMjQ0.XrcS_A.KmEzHuPhDHfIaG7qc2t6BimK-50')

bot.on('message', (message) => {
  if (message.content === 'ping') {
    message.reply('pong !')
  }
})

bot.on('message', (message) => {
  if (message.content.startsWith('!memes')) {
    const event = randomPuppy.all("dankmemes")
    event.on('data', (url) => res.json(
      message.channel.send("Voici ton meme", { files: [url] })
    ))
  }
})
