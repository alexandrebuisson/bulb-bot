const firebase = require('../db/firebase.config')
const _ = require('lodash')
const Discord = require('discord.js')

module.exports = {
  name: 'colors',
  aliases: ['list'],
  description: "Liste toutes les couleurs disponibles",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    if (!message.content.startsWith('!')) return
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
          message.delete()
          message.channel.send(displayColors)
          data = []
        }, 400)
      } else {
        message.delete()
        return message.channel.send("Il n'existe aucune couleur, !add #ffffff <nom> pour en créer une")
      }
    })
  }
}
