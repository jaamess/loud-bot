const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ['text'],
      permissionLevel: 6,
      description: 'Permite definir em quais canais o bot irá responder quando um usuário disser uma das palavras chaves definidas.',
      usage: '[remover] <canal:channel>',
      usageDelim: ' ',
      subcommands: true,
    });
  }
  /**
   * @param {import('klasa').KlasaMessage} message
   * @param {import('discord.js').GuildChannel} channel
   */
  async run(message, remove, channel) {
    // If remove param is entered, return remove() function instead
    if (remove) return this.remove(channel);
    // Update the values in the database
    message.guild.settings.update('whitelistedChannels', channel.id);
    return message.send(`:white_check_mark:  **|  Novo canal "${channel.name}" adicionado com sucesso.**`);
  }
  /**
   * @param {import('klasa').KlasaMessage} message
   * @param {import('discord.js').GuildChannel} channel
   */
  async remove(message, channel) {
    const whitelistedChannels = message.guild.settings.get('whitelistedChannels');
    if (!whitelistedChannels.has(channel.id))
      return message.send(`<:loudwarning:591525783994892288>  **  |  O canal ${channel.name} não está registrado no banco de dados, logo, não é possível removê-lo.**`);

    message.guild.settings.update('whitelistedChannels', channel.id);
    return message.send(`:white_check_mark:  **|  Canal ${channel.name} removido com sucesso do banco de dados.`);
  }
};
