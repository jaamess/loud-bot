const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const parseTime = require('duration-parser');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'slow',
      enabled: true,
      runIn: ['text'],
      permissionLevel: 6,
      usage: '<Canal:channel> <Tempo:string>',
      usageDelim: ' ',
      description: 'Ativa o modo lento no canal especificado. Permite que o administrador ative o modo slow por quanto tempo quiser, sem depender dos limites do Discord.',
      extendedHelp: 'Para desativar o modo lento, defina a duração como "0" segundos.',
    });
  }

  async run(message, [channel, duration]) {
    parseTime(duration);
    channel.setRateLimitPerUser(duration, 'Modo slow customizado');

    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('COMMAND_SLOW_SUCCESS', duration));

    return message.send(embed);
  }
};
