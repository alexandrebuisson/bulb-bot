module.exports = {
  name: 'work',
  aliases: ['travail'],
  description: 'Rejoindre ou quitter le channel travail',
  guildOnly: true,
  execute(_bot, _config, message, _args) {
    const allowedRole = message.guild.roles.cache.find((t) => t.name === "travaille fainéant")
    if (message.member.roles.cache.has(allowedRole.id)) {
      message.delete()
      message.member.roles.remove(allowedRole.id)
      message.reply(`Tu viens de quitter le FC travailleur ${message.author} !`)
    } else {
      if (!message.guild) return
      message.delete()
      message.member.roles.add(allowedRole.id)
      message.reply("Bienvenue dans l'élite jeune travailleur ${message.author} !")
    }
  },
}


