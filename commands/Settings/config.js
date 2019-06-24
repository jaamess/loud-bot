const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 5,
      description: 'Mostra as configurações atuais no servidor',
      extendedHelp: 'config reacoes -> Mostra as configurações atuais para a função de reações customizadas, como canais permitidos e palavras-chave.',
      usage: '[reacoes]',
    });
  }

  async run(message, reacoes) {
    console.log(reacoes);
    if (reacoes) return this.reactionConfig(message);

    const embed = new MessageEmbed()
      .setColor(this.client.settings.colors.LOUD_GREEN)
      .setThumbnail(this.client.settings.images.LOUD_LOGO)
      .setDescription(message.language.get('COMMAND_CONFIG_GENERAL_DESCRIPTION'))
      .addField('Prefix', message.guild.settings.get('prefix'), true)
      .addField(message.language.get('LANGUAGE'), message.language.name);

    return message.send(embed);
  }

  async reactionConfig(message) {
    const channels = await message.guild.settings.get('whitelistedChannels');
    const keywords = await message.guild.settings.get('customReactions').keywords;
    const responses = await message.guild.settings.get('customReactions').response;
    const embed = new MessageEmbed()
      .setColor(this.client.settings.colors.LOUD_GREEN)
      .setThumbnail(this.client.settings.images.LOUD_LOGO)
      .setDescription(message.language.get('COMMAND_CONFIG_REACTION_DESCRIPTION'))
      .addField('Canais Permitidos', channels.length ? `<#${channels.join('>, <#')}>` : 'Nenhum canal')
      .addField('Palavras-Chave', keywords.join(', '))
      .addField('Respostas', message.language.get('COMMAND_CONFIG_REACTION_RESPONSES', responses.length));

    return message.send(embed);
  }
};
