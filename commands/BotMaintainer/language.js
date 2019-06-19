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
    console.log(language);
    this.parseLanguage(language);

    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`Configuração`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`O idioma da guilda foi definido como \`${message.guild.settings.language}\``);

    message.send(embed);
  }

  parseLanguage(rawLanguage) {
    console.log(rawLanguage);
    switch (rawLanguage) {
      case 'portugues':
      case 'português':
      case 'portuguese':
        message.guild.settings.update('language', 'pt-BR');
        console.log('pt-br');
        break;
      case 'inglês':
      case 'ingles':
      case 'english':
        message.guild.settings.update('language', 'en-US');
        console.log('en-us');
        break;
      default:
        break;
    }
  }
};
