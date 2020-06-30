const axios = require('axios')
const Chance = require('chance')
const chancejs = new Chance()

module.exports = {
  name: 'r34',
  description: 'Images aléatoire depuis r34 (par défaut 100 résultats)',
  args: true,
  guildOnly: true,
  usage: '<mot clé> <limite (facultatif)>',
  execute(_bot, _config, msg, args) {
    axios(`https://r34-json.herokuapp.com/posts?tags=${args[0]}&limit=${args[1] === undefined || args[1] > 500 ? 100 : args[1]}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 500) {
          msg.channel.send('Il y a eu une erreur !')
        } else {
          if (response.data.posts.length === 0) {
            msg.channel.send(`Aucun résultat pour ${args[0]}`)
          }
          if (response.data.posts.length > 0) {
            const resultsLength = response.data.posts.length
              let options = {
                limit: 3600 * 1000,
                min: 1,
                max: resultsLength,
                page: 1
              }
              const pages = []
              response.data.posts.map((i, index) => {
                pages.push({
                  "title": `Résultat page ${index + 1}/${options.max} pour ${args[0]}`,
                  "url": `${response.data.posts[index].sample_url}`,
                  "color": 43333,
                  "footer": {
                    "icon_url": "https://cdn.discordapp.com/app-icons/708760465999790244/228b2993e942a361518b557ee4511b26.png?size=32",
                    "text": "Bot made by Alexandre Buisson"
                  },
                  "image": {
                    "url": `${response.data.posts[index].sample_url}`
                  },
                  "fields": [
                    {
                      "name": "tags associés",
                      "value": `${response.data.posts[index].tags[0] || '/'}, ${response.data.posts[index].tags[1] || '/'}, ${response.data.posts[index].tags[2] || '/'}, ${response.data.posts[index].tags[3] || '/'}`
                    }
                  ]
                })
              })
  
              msg.channel.send({ embed: pages[options.page - 1] }).then((el) => {
                el.react('⬅️')
                el.react('🔄')
                el.react('➡️')
                el.react('🗑️')
  
                const filter = (reaction, user) => {
                  return ['⬅️', '➡️', '🗑️', '🔄'].includes(reaction.emoji.name) && user.id == msg.author.id
                }
  
                const handleReactions = (e) => {
                  e.awaitReactions(filter, { max: 1, time: options.limit, errors: ['time'] })
                    .then((collected) => {
                      const reaction = collected.first()
                      const { min, max, page } = options
  
                      if (reaction.emoji.name === '➡️') {
                        if (page != max) {
                          options = { ...options, page: page + 1 }
                          e.edit({ embed: pages[options.page - 1] })
                        }
                        e.reactions.cache.find(r => r.emoji.name == '➡️').users.remove(msg.author)
                        handleReactions(e)
                      }
                      else if (reaction.emoji.name === '⬅️') {
                        if (page != min) {
                          options = { ...options, page: page - 1 }
                          e.edit({ embed: pages[options.page - 1] })
                        }
                        e.reactions.cache.find(r => r.emoji.name == '⬅️').users.remove(msg.author)
                        handleReactions(e)
                      }
                      else if (reaction.emoji.name === '🗑️') {
                        e.delete()
                      }
                      else if (reaction.emoji.name === '🔄') {
                        const rnd = chancejs.integer({ min: 0, max: (response.data.posts).length - 1 })
                        const random = {
                          "title": `Résultat aléatoire pour ${args[0]}`,
                          "url": `${response.data.posts[rnd].sample_url}`,
                          "color": 43333,
                          "footer": {
                            "icon_url": "https://cdn.discordapp.com/app-icons/708760465999790244/228b2993e942a361518b557ee4511b26.png?size=32",
                            "text": "Made with ❤  by Alexandre Buisson"
                          },
                          "image": {
                            "url": `${response.data.posts[rnd].sample_url}`
                          },
                          "fields": [
                            {
                              "name": `Nombre de résultats`,
                              "value": `${response.data.posts.length}`
                            },
                            {
                              "name": "tags associés",
                              "value": `${response.data.posts[rnd].tags[0] || '/'}, ${response.data.posts[rnd].tags[1] || '/'}, ${response.data.posts[rnd].tags[2] || '/'}, ${response.data.posts[rnd].tags[3] || '/'}`
                            }
                          ]
                        }
  
                        msg.channel.send({ embed: random })
                        e.reactions.cache.find(r => r.emoji.name == '🔄').users.remove(msg.author)
                        handleReactions(e)
                      } else {
                        handleReactions(e)
                      }
                    }).catch((collected) => {
                      console.log(`reaction error : ${collected}`)
                    })
                }
                handleReactions(el)
              })
          }
        }
      })
  }
}

