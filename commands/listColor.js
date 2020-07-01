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
    colors.once('value', (snap) => {
      const allColors = snap.val()
      let data = []
      if (!_.isEmpty(allColors) && _.isEmpty(data)) {
        let displayColors = new Discord.MessageEmbed()
        displayColors
          .setColor('#0099ff')
          .setTitle('Voici la liste des couleurs')
        const keys = Object.keys(allColors)
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
          message.channel.send(displayColors)
          data = []
        }, 400)
      } else {
        return message.channel.send('Aucune couleur pour le moment :c')
      }
    })
  }
}