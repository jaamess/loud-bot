import { Command, CommandStore, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      runIn: ['text'],
      aliases: ['rm'],
      permissionLevel: 6,
      description: 'Remove reações do banco de dados',
      extendedHelp: 'rm <palavra-chave> -> Remove a palavra-chave e a reação associada a ela do banco de dados.',
      usage: '<keyword:string>',
    });
  }

  async run(message: KlasaMessage, [keyword]: [string[]]) {
    const customReactions = await message.guild.settings.get('customReactions');
    //@ts-ignore
    if (!customReactions.keywords.includes(keyword))
      return message.send(
        `<:loudwarning:591525783994892288>  |  A palavra-chave "${keyword}" não existe no banco de dados. Diga \`loud config reacoes\` para visualizar as palavras-chave registradas no momento.`
      );
    //@ts-ignore
    const index = await customReactions.keywords.indexOf(keyword);
    // Now we can delete those items from the database using update()
    //@ts-ignore
    await message.guild.settings.update([['customReactions.keywords', keyword], ['customReactions.response', customReactions.response[index]]]);
    return message.send(`:white_check_mark:  **|  Feito, a palavra-chave ${keyword} e sua mensagem não existem mais.**`);
  }
};
