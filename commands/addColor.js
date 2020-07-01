const firebase = require('../db/firebase.config')

module.exports = {
  name: 'addcolor',
  aliases: ['+color', 'add'],
  description: "Ajouter une nouvelle couleur",
  usage: "#ffffff <nom de la couleur>",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    const isHexColor = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g
    if (isHexColor.test(args[0])) {
      message.member.guild.roles.create({
        data: {
          name: args[1].toLowerCase(),
          color: args[0],
        },
      })
        .then(() => {
          firebase.database.ref(`discord/colors/${args[1].toLowerCase()}`).set({
            name: args[1].toLowerCase(),
            color: args[0]
          })
            .then(() => {
              return message.channel.send(`La couleur ${args[1].toLowerCase()} a été ajouté`)
            })
            .catch(() => {
              return message.channel.send('Il y a eu une erreur los de la création')
            })
        })
        .catch(console.error)
    } else {
      message.channel.send(`La couleur ${args[0]} est invalide, il faut utiliser une couleur hex sous la forme #ffffff`)
    }
  }
}