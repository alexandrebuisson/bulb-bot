module.exports = {
  name: 'uptime',
  description: "Temps qui s'est écoulé depuis le démarrage du BOT",
  execute(bot, _config, message, _args) {
    if (!message.content.startsWith('!')) return
    let totalSeconds = (bot.uptime / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const uptime = `${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes`
    message.channel.send(`Bulb est en ligne depuis ${uptime}`)
  },
}
