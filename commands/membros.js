const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'members',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      deletable: false,
      permissionLevel: 0,
      subcommands: false,
      description: 'Mostra a quantidade de membros no servidor',
    });
  }

  async run(message) {
    const bots = message.guild.members.map((m) => m.user.bot);
    let botMembers;
    for (const bot of bots) {
      if (bot === 'true') botMembers.push(bot);
    }
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`LOUD`)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Este servidor tem ${message.guild.members.size} membros. Dos quais ${botMembers.size} são bots.`);

    message.send(embed);
  }
};
