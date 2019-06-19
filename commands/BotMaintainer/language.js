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
    const lang = language === 'portugues' ? 'pt-BR' : 'en-US';
    message.guild.settings.update('language', lang);

    const embed = new MessageEmbed()
      .setColor('#1a9901')
      .setTitle(`Configuração`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`O idioma da guilda foi definido como \`${message.guild.settings.language}\``);

    message.send(embed);
  }
};
