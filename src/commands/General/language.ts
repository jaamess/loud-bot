import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { GuildSettings } from '../../lib/types/settings';

export default class extends Command {
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            name: 'language',
            aliases: ['idioma'],
            enabled: true,
            permissionLevel: 6,
            usage: '<idioma:string>',
            description: 'Muda o idioma do bot no servidor. Pode ser portugues ou ingles.'
        });
    }

    public async run(message: KlasaMessage, language: string[]): Promise<KlasaMessage | KlasaMessage[]> {
        const newLanguage: string = await this.parseLanguage(message, language[0]);
        const responseString: string = await message.language.get('COMMAND_LANGUAGE_SUCCESS', newLanguage);

        const embed: MessageEmbed = new MessageEmbed()
            .setColor('#39d52d')
            .setTitle(message.language.get('SETTINGS'))
            .setThumbnail(message.guild.iconURL())
            .setDescription(responseString);

        return message.send(embed);
    }

    public async parseLanguage(message: KlasaMessage, rawLanguage: string): Promise<string> {
        switch (rawLanguage) {
            case 'portugues':
            case 'português':
            case 'portuguese':
                await message.guild.settings.update('language', 'pt-BR');
                break;
            case 'inglês':
            case 'ingles':
            case 'english':
                await message.guild.settings.update('language', 'en-US');
                break;
            default:
                break;
        }
        // @ts-ignore
        return (message.guild.settings as GuildSettings).get('language');
    }
}
