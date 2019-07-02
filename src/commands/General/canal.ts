import { Command, CommandStore, KlasaMessage } from 'klasa';
import { GuildChannel } from 'discord.js';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      enabled: true,
      runIn: ['text'],
      permissionLevel: 6,
      description: 'Permite definir em quais canais o bot irá responder quando um usuário disser uma das palavras chaves definidas.',
      usage: '[remove] <canal:channel>',
      usageDelim: ' ',
    });
  }

  async run(message: KlasaMessage, [remove, channel]: [string, GuildChannel]) {
    // If remove param is entered, return remove() function instead
    if (remove) return this.remove(message, channel);
    // Update the values in the database
    message.guild.settings.update('whitelistedChannels', channel.id);
    return message.send(`:white_check_mark:  **|  Novo canal com nome "${channel.name}" adicionado com sucesso.**`);
  }

  async remove(message: KlasaMessage, channel: GuildChannel) {
    const whitelistedChannels = message.guild.settings.get('whitelistedChannels');
    //@ts-ignore
    if (!whitelistedChannels.includes(channel.id))
      return message.send(`<:loudwarning:591525783994892288>  **  |  O canal de nome ${channel.name} não está registrado no banco de dados, logo, não é possível removê-lo.**`);

    message.guild.settings.update('whitelistedChannels', channel.id);
    return message.send(`:white_check_mark:  **|  Canal "${channel.name}" removido com sucesso do banco de dados.*U`);
  }
};
