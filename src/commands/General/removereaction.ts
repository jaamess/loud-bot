import { Command, CommandStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '../../lib/types/settings';

export default class extends Command {
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            aliases: ['rm'],
            permissionLevel: 6,
            description: 'Remove reações do banco de dados',
            extendedHelp: 'rm <palavra-chave> -> Remove a palavra-chave e a reação associada a ela do banco de dados.',
            usage: '<keyword:string>'
        });
    }

    public async run(message: KlasaMessage, [keyword]: [string]): Promise<KlasaMessage | KlasaMessage[]> {
        const customReactions = await (message.guild.settings as GuildSettings).get('customReactions');
        const response = await (message.guild.settings as GuildSettings).get('customReactions').get('response');
        if (!customReactions.get('keywords').includes(keyword)) {
            return message.send(
                `<:loudwarning:591525783994892288>  |  A palavra-chave "${keyword}" não existe no banco de dados. Diga \`loud config reacoes\` para visualizar as palavras-chave registradas no momento.`
            );
        }
        const index = await customReactions.get('keywords').indexOf(keyword);
        // Now we can delete those items from the database using update()
        await message.guild.settings.update([['customReactions.keywords', keyword], ['customReactions.response', customReactions.get(response[index])]]);
        return message.send(`:white_check_mark:  **|  Feito, a palavra-chave ${keyword} e sua mensagem não existem mais.**`);
    }
}
