const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'prefix',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      deletable: false,
      permissionLevel: 6,
      usage: '<prefixo:string>',
      description: 'Muda o prefixo do bot no servidor.',
    });
  }

  async run(message, newPrefix) {
    const oldPrefix = message.guild.settings.prefix;
    if (oldPrefix === newPrefix) return message.send('O prefixo da guilda já é este, não há nada pra mudar.');

    message.guild.settings.update('prefix', newPrefix);

    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`Configuração`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`O novo prefixo é \`${message.guild.settings.prefix}\``);

    message.send(embed);
  }
};
