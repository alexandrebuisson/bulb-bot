const firebase = require('../db/firebase.config')

module.exports = {
  name: 'setcolor',
  aliases: ['color='],
  description: "Sélectionner une couleur",
  usage: "<nom de la couleur>",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    let data = null
    const checkSelected = firebase.database.ref(`discord/users/${message.author.id}`)
    checkSelected.on('value', (snap) => {
      data = snap.val()
    })
    setTimeout(() => {
      const removeRole = async () => await message.member.roles.remove(message.member.guild.roles.cache.find(role => role.name === data.selected))
      removeRole()
      firebase.database.ref(`discord/users/${message.author.id}`).update({
        selected: args[0]
      })
        .then(() => {
          message.member.roles.add(message.member.guild.roles.cache.find(role => role.name === args[0]))
          message.channel.send(`Votre couleur a été mis a jour en ${args[0]}`)
        })
        .catch(() => {
          message.channel.send('Il y a eu une erreur lors de la suppresion de la couleur')
        })
    }, 400)
  }
}
