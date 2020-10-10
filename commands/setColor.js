const firebase = require('../db/firebase.config')
const _ = require('lodash')

module.exports = {
  name: 'set',
  description: "Sélectionner une couleur",
  usage: "<nom de la couleur>",
  guildOnly: true,
  execute(_bot, _config, message, args) {
    let data = null
    const checkSelected = firebase.database.ref(`discord/users/${message.author.id}`)
    checkSelected.once('value', (snap) => {
      data = snap.val()
    })
    setTimeout(() => {
      const isExist = firebase.database.ref(`discord/colors/${args[0].toLowerCase()}`)
      isExist.once('value', async (snap) => {
        const colorExist = await snap.val()
        if (colorExist !== null) {
          const removeRole = async () => await message.member.roles.remove(message.member.guild.roles.cache.find(role => role.name === data.selected.toLowerCase()))
          removeRole()
          firebase.database.ref(`discord/users/${message.author.id}`).update({
            selected: args[0].toLowerCase()
          })
            .then(() => {
              message.delete()
              message.member.roles.add(message.member.guild.roles.cache.find(role => role.name === args[0].toLowerCase()))
              message.channel.send(`Votre couleur a été mis a jour en ${args[0].toLowerCase()} ${message.author}`)
            })
            .catch(() => {
              message.channel.send('Il y a eu une erreur lors de la suppresion de la couleur')
            })
        } else {
          message.reply(`La couleur ${args[0].toLowerCase()} n'existe pas`)
        }
      })
    }, 400)
  }
}
