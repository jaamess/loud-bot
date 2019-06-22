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
      extendedHelp:
        'Para desativar o modo lento, defina a duração como "0" segundos.\n\n== Exemplos ==\n!slow #geral 2h -> Modo lento por 2 horas no canal #geral\n!slow #geral 5h44m9s -> Slow de 4 horas 44 minutos e 9 segundos no canal #geral\n\nPor favor, note que o limite de cooldown imposto pelo Discord é de 6 horas.',
    });
  }

  async run(message, [channel, duration]) {
    const time = (await parseTime(duration)) / 1000;
    channel.setRateLimitPerUser(time, 'Modo slow customizado');

    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('COMMAND_SLOW_SUCCESS', time));

    return message.send(embed);
  }
};
