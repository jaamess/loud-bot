const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'membros',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      deletable: false,
      permissionLevel: 5,
      subcommands: false,
      description: 'Mostra a quantidade de membros no servidor',
    });
  }

  async run(message) {
    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`LOUD`)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Este servidor tem ${message.guild.members.size} membros.`);

    message.send(embed);
  }
};
