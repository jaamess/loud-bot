const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'prefix',
      quotedStringSupport: true,
      enabled: true,
      runIn: ['text'],
      cooldown: 10,
      deletable: false,
      permissionLevel: 6,
      usage: '[prefixo:str]',
      description: 'Muda o prefixo do bot no servidor.',
    });
  }

  async run(message, newPrefix) {
    const oldPrefix = message.guild.settings.prefix;
    if (oldPrefix === newPrefix[0]) return message.send('O prefixo da guilda já é este, não há nada pra mudar.');
    if (!newPrefix[0]) {
      message.send(message.language.get('COMMAND_PREFIX_RESET'));
      return message.guild.settings.reset('prefix');
    }

    message.guild.settings.update('prefix', newPrefix[0]);

    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('COMMAND_PREFIX_SUCCESS', newPrefix[0]));

    message.send(embed);
  }
};
