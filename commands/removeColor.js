const firebase = require('../db/firebase.config')

module.exports = {
  name: 'removecolor',
  aliases: ['-color', 'rm'],
  description: "Supprimer une couleur",
  usage: "<nom de la couleur>",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    const thisRole = message.guild.roles.cache.find((t) => t.name == args[0].toLowerCase())
    message.guild.members.cache.forEach((member) => {
      if (!member.roles.cache.find((t) => t.name == args[0].toLowerCase())) return
      member.roles.remove(message.member.guild.roles.cache.find(role => role === thisRole))
    })
    message.guild.roles.cache.find((t) => t.name === args[0].toLowerCase()).delete()
    firebase.database.ref(`discord/colors/${args[0].toLowerCase()}`).remove()
      .then(() => {
        return message.channel.send(`La couleur ${args[0].toLowerCase()} à été supprimé !`)
      })
      .catch(() => {
        return message.channel.send(`La couleur ${args[0].toLowerCase()} n'existe pas`)
      })
  }
}