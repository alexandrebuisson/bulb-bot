module.exports = {
  name: 'nick',
  description: 'Renommer un utilisateur',
  args: true,
  aliases: ['nickname'],
  guildOnly: true,
  usage: '<@utilisateur> <pseudo>',
  execute(_bot, _config, message, _args) {
    if (!message.content.startsWith('!')) return
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
          if (nickReason.length === 2) {
           nickedUser.setNickname(nickReason[2])
           message.delete()
           message.channel.send(`Le surnom de <@${tagUser}> a été mis a jour`)
          }
          if (nickReason.length > 2) {
           nickedUser.setNickname(nickReason.splice(2).join(' '))
           message.delete()
           message.channel.send(`Le surnom de <@${tagUser}> a été mis a jour`)
          }
        } catch (e) {
          console.error(e)
          return message.channel.send("Une erreur s'est produite")
        }
      }
    }
  }
}
