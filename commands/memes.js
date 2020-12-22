const randomPuppy = require('random-puppy')
const Chance = require('chance')
const chancejs = new Chance()

const subreddit = [
  {
    i: 'dankmemes'
  },
  {
    i: 'niceguys'
  },
  {
    i: 'PornhubComments'
  },
  {
    i: 'softwaregore'
  },
]

function sendMeme(msg) {
  const rnd = chancejs.integer({ min: 0, max: 3 })
  randomPuppy(subreddit[rnd].i)
    .then((url) => {
      const embed = {
        "title": `meme from r/${subreddit[rnd].i}`,
        "url": url,
        "color": 43333,
        "image": {
          "url": url
        }
      }
      msg.channel.send({ embed })
    })
}

function getReactions(msg, message) {
  msg.react('⏩')
  const filter = (reaction, user) => {
    return ['⏩'].includes(reaction.emoji.name) && user.id === message.author.id
  }

  msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first()
      if (reaction.emoji.name === '⏩') {
        msg.reactions.cache.find(r => r.emoji.name == '⏩').users.remove(message.author)
        sendMeme(msg)
        getReactions(msg, message)
      } else {
        msg.reply("La reaction n'existe pas")
      }
    }).catch((collected) => {
      console.log(`nb de reactions : ${collected.size}`)
    })
}

module.exports = {
  name: 'memes',
  aliases: ['meme'],
  description: 'Meme aléatoire depuis une liste de subreddit',
  guildOnly: true,
  execute(_bot, _config, message, _args) {
    if (!message.content.startsWith('!')) return
    const rnd = chancejs.integer({ min: 0, max: 3 })
    randomPuppy(subreddit[rnd].i)
      .then((url) => {
        const embed = {
          "title": `meme from r/${subreddit[rnd].i}`,
          "url": url,
          "color": 43333,
          "image": {
            "url": url
          }
        }
        message.channel.send({ embed }).then((msg) => {
          getReactions(msg, message)
      })
    })
  }
}
