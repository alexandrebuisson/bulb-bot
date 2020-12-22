module.exports = {
  name: 'message',
  description: 'commande réservé au serverur',
  args: true,
  guildOnly: true,
  usage: 'commande admin',
  execute(_bot, _config, message, args) {
    if (!message.content.startsWith('!')) return
    if (message.author.id === '144845324861571072') {
      const text = args.join(" ")
      message.delete()
      message.channel.send(text)
    } else {
      message.channel.send("Commande réservé au système")
    }
  }
}

