const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Liste toutes les commandes',
  aliases: ['command'],
  usage: '[command name]',
  cooldown: 5,
  execute(_bot, _config, message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Voici toutes mes commandes');
      data.push(commands.filter(f => f.name !== 'message').map(command => command.name).join(', '));
      data.push(`${prefix}help [nom de la commande]\ te permet d'avoir plus d'informations sur une commande`);

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type == 'dm') return;
            message.reply("Je t'ai envoyé un DM avec toutes les commandes");
          }).catch((error) => {
            console.error(`Impossible d'envoyer les commandes par DM à ${message.author.tag}.\n`, error);
            message.reply("Il semblerait que tes DM ne sont pas ouvert ");
          });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("La commande n'est pas valide");
		}

		data.push(`**Nom:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Utilisation:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} seconde(s)`);

		message.channel.send(data, { split: true });
    },
}
