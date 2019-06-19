const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'language',
      enabled: true,
      cooldown: 0,
      permissionLevel: 6,
      usage: '<idioma:string>',
      description: 'Muda o idioma do bot no servidor. Pode ser portugues ou ingles.',
    });
  }

  async run(message, language) {
    const newLanguage = await this.parseLanguage(message, language[0]);

    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`Configuração`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`O idioma da guilda foi definido como \`${newLanguage}\``);

    message.send(embed);
  }

  parseLanguage(message, rawLanguage) {
    switch (rawLanguage) {
      case 'portugues':
      case 'português':
      case 'portuguese':
        message.guild.settings.update('language', 'pt-BR');
        break;
      case 'inglês':
      case 'ingles':
      case 'english':
        message.guild.settings.update('language', 'en-US');
        break;
      default:
        break;
    }
  }
};
