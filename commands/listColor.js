const firebase = require('../db/firebase.config')
const _ = require('lodash')
const Discord = require('discord.js')

module.exports = {
  name: 'listcolors',
  aliases: ['colors'],
  description: "Liste toutes les couleurs disponibles",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    const colors = firebase.database.ref('discord/colors')
    colors.on('value', (snap) => {
      const allColors = snap.val()
      const displayColors = new Discord.MessageEmbed()
      displayColors
        .setColor('#0099ff')
        .setTitle('Voici la liste des couleurs')
      if (!_.isEmpty(allColors) && args[0] === undefined) {
        const keys = Object.keys(allColors)
        const data = []
        keys.map((i) => data.push({ ...allColors[i] }))
        data.map((el) => {
          if (el.name === undefined) return
          displayColors
            .addFields(
              {
                name: el.name, value: el.color
              }
            )
        })
        setTimeout(() => {
          return message.channel.send(displayColors)
        }, 400)
      } else {
        return message.channel.send('Aucune couleur pour le moment :c')
      }
    })
  }
}