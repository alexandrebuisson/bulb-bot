const randomPuppy = require('random-puppy')

module.exports = {
  name: 'subreddit',
  aliases: ['r'],
  description: 'Image aléatoire depuis un subreddit spécifique',
  args: true,
  usage: '<nom du subreddit>',
  execute(_bot, _config, message, args) {
    randomPuppy(args[0])
      .then((url) => {
        message.channel.send(`random image from r/${args[0]} ${url}`)
      })
  }
}
