module.exports = {
  name: 'ping',
  aliases: ['bulb', 'status'],
  description: 'Statut du BOT',
  execute(_bot, _config, message, _args) {
    message.channel.send('En cours ...').then((msg) => {
      msg.edit(`Ping: ${Date.now() - msg.createdTimestamp}ms - status: ok`)
    })
  },
}
