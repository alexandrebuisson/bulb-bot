module.exports = {
  name: 'travail',
  description: 'Rejoindre ou quitter le channel travail',
  guildOnly: true,
  execute(_bot, _config, message, _args) {
    const allowedRole = message.guild.roles.cache.find((t) => t.name === "travaille fainéant")
    if (message.member.roles.cache.has(allowedRole.id)) {
      message.member.roles.remove(allowedRole.id)
      message.reply('Tu viens de quitter le FC travailleur !')
    } else {
      if (!message.guild) return
      message.member.roles.add(allowedRole.id)
      message.reply("Bienvenue dans l'élite jeune travailleur !")
    }
  },
}


