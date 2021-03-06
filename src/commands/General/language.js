const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'language',
      aliases: ['idioma'],
      enabled: true,
      cooldown: 0,
      permissionLevel: 6,
      usage: '<idioma:string>',
      description: 'Muda o idioma do bot no servidor. Pode ser portugues ou ingles.',
    });
  }

  async run(message, language) {
    const newLanguage = await this.parseLanguage(message, language[0]);
    const responseString = await message.language.get('COMMAND_LANGUAGE_SUCCESS', newLanguage);

    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(responseString);

    message.send(embed);
  }

  async parseLanguage(message, rawLanguage) {
    switch (rawLanguage) {
      case 'portugues':
      case 'português':
      case 'portuguese':
        await message.guild.settings.update('language', 'pt-BR');
        break;
      case 'inglês':
      case 'ingles':
      case 'english':
        await message.guild.settings.update('language', 'en-US');
        break;
      default:
        break;
    }

    return message.guild.settings.language;
  }
};
