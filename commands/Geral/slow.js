const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'slow',
      enabled: true,
      runIn: ['text'],
      permissionLevel: 6,
      usage: '<Canal:channel> <Tempo:int>',
      usageDelim: ' ',
      description: 'Ativa o modo lento no canal especificado. Permite que o administrador ative o modo slow por quanto tempo quiser, sem depender dos limites do Discord.',
    });
  }

  async run(message, [channel, duration]) {
    console.log(channel, duration);

    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('COMMAND_SLOW_SUCCESS', duration));

    message.send(embed);
  }
};
