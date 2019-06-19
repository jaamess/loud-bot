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
    const lang = this.parseLanguage(language);

    message.guild.settings.update('language', lang);

    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`Configuração`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`O idioma da guilda foi definido como \`${message.guild.settings.language}\``);

    message.send(embed);
  }

  parseLanguage(language) {
    switch (language) {
      case 'portugues':
      case 'português':
      case 'portuguese':
        return (lang = 'pt-BR');
      case 'inglês':
      case 'ingles':
      case 'english':
        return (lang = 'en-US');
      default:
        return (lang = 'en-US');
    }
  }
};
