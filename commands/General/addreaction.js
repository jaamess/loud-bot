const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      aliases: ['ar'],
      permissionLevel: 6,
      description: 'Permite adicionar novas reações customizadas com o bot',
      usage: '<keyword:string> <content:...string>',
      usageDelim: ' ',
    });
  }
  /**
   * @param {import('klasa').KlasaMessage} message
   * @param {String} content
   */
  async run(message, [keyword, content]) {
    if (keyword === 'loud') return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra chave não pode ser utilizada, tente novamente com um nome diferente.**`);
    // Before anything, lets check if the keyword doesnt already exist
    if (message.guild.settings.get('customReactions').keywords.includes(keyword))
      return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra chave já existe, tente um nome diferente.**`);
    // First we update the database, adding the keyword and the new reaction
    await message.guild.settings.update({ customReactions: { keywords: keyword, response: content } });
    const updatedSettings = await message.guild.settings.get('customReactions');
    const keywordIndex = updatedSettings.keywords.indexOf(keyword);
    const contentIndex = updatedSettings.keywords.indexOf(content);

    // Creating the message that will tell the user the database was successfully updated
    const successEmbed = new MessageEmbed()
      .setColor(this.client.settings.colors.LOUD_GREEN)
      .setThumbnail(this.client.settings.images.LOUD_LOGO)
      .setDescription(`O seguinte conteúdo foi atualizado no banco de dados:`)
      .addField('Palavra-Chave', `**${keyword}**`)
      .addField('Reação', `\`\`\`${content}\`\`\``);

    // If the indexes match, success, otherwise, tell them something went wrong (very unlikely)
    // TODO: I need to actualy handle this error later when I have more time
    if (keywordIndex !== contentIndex) return message.send(successEmbed);
    return message.send(`<:loudwarning:591525783994892288>  **|  Houve um erro.**`);
  }
};
