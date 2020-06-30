const firebase = require('../db/firebase.config')

module.exports = {
  name: 'addcolor',
  aliases: ['+color'],
  description: "Ajouter une nouvelle couleur",
  usage: "#ffffff <nom de la couleur>",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    message.member.guild.roles.create({
      data: {
        name: args[1],
        color: args[0],
      },
    })
      .then(() => {
        firebase.database.ref(`discord/colors/${args[1]}`).set({
          name: args[1],
          color: args[0]
        })
          .then(() => {
            return message.channel.send(`La couleur ${args[1]} a été ajouté`)
          })
          .catch(() => {
            return message.channel.send('Il y a eu une erreur los de la création')
          })
      })
      .catch(console.error)
  }
}