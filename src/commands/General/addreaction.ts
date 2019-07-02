import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      runIn: ['text'],
      aliases: ['ar'],
      permissionLevel: 6,
      description: 'Permite adicionar novas reações customizadas com o bot',
      usage: '<keyword:string> <content:...string>',
      usageDelim: ' ',
    });
  }

  async run(message: KlasaMessage, [keyword, content]) {
    if (keyword === 'loud') return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra-chave não pode ser utilizada, tente novamente com um nome diferente.**`);
		// Before anything, lets check if the keyword doesnt already exist
		//@ts-ignore
    if (message.guild.settings.get('customReactions').keywords.includes(keyword)) {
      return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra chave já existe, tente um nome diferente.**`);
    }
    // First we update the database, adding the keyword and the new reaction
    await message.guild.settings.update({ customReactions: { keywords: keyword, response: content } });
		const updatedSettings = await message.guild.settings.get('customReactions');
		//@ts-ignore
		const keywordIndex = updatedSettings.keywords.indexOf(keyword);
		//@ts-ignore
    const contentIndex = updatedSettings.keywords.indexOf(content);

    // Creating the message that will tell the user the database was successfully updated
		const successEmbed = new MessageEmbed()
			//@ts-ignore
			.setColor(this.client.settings.colors.LOUD_GREEN)
			//@ts-ignore
      .setThumbnail(this.client.settings.images.LOUD_LOGO)
      .setDescription(`O seguinte conteúdo foi atualizado no banco de dados:`)
      .addField('Palavra-Chave', `**${keyword}**`)
      .addField('Reação', `\`\`\`${content}\`\`\``);

    // If the indexes match, success, otherwise, tell them something went wrong (very unlikely)
    // TODO: I need to actualy handle this error later when I have more time
    if (keywordIndex !== contentIndex) return message.send(successEmbed);
    return message.send(`<:loudwarning:591525783994892288>  **|  Houve um erro.**`);
  }
}
