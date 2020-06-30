module.exports = {
  name: 'nickname',
  description: 'Renommer un utilisateur',
  args: true,
  guildOnly: true,
  usage: '<@utilisateur> <pseudo>',
  execute(_bot, _config, message, _args) {
    let nickedUser = message.mentions.members.first()
    const tagUser = message.mentions.members.first().id
    let nickReason = message.content.slice('!').split(/ +/)
    if (!nickedUser) {
      message.reply('Tu dois mentionner une personne pour changer son surnom !')
    } else {
      if(nickReason[2] === undefined) {
        message.reply('Tu as oublie le petit surnom :c')
      }
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) message.reply("Tu n'as pas la permission :c")
      if (nickReason[2] !== undefined && message.member.hasPermission('MANAGE_NICKNAMES')) {
        try {
          nickedUser.setNickname(nickReason[2])
          message.delete()
          message.channel.send(`Hoo pas mal ce nouveau nom <@${tagUser}>`)
        } catch (e) {
          console.error(e)
          return message.channel.send("Il y a eu une erreur :c")
        }
      }
    }
  }
}
