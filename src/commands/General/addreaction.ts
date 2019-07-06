import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { GuildSettings, CustomReactions, ClientSettings } from '../../lib/types/settings';

export default class extends Command {
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            runIn: ['text'],
            aliases: ['ar'],
            permissionLevel: 6,
            description: 'Permite adicionar novas reações customizadas com o bot',
            usage: '<keyword:string> <content:...string>',
            usageDelim: ' '
        });
    }

    public async run(message: KlasaMessage, [keyword, content]): Promise<KlasaMessage | KlasaMessage[]> {
        if (keyword === 'loud') return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra-chave não pode ser utilizada, tente novamente com um nome diferente.**`);
        // Before anything, lets check if the keyword doesnt already exist
        const gSettings: GuildSettings = message.guild.settings as GuildSettings;
        const cReactions: CustomReactions = gSettings.get('customReactions');
        if (cReactions.get('keywords').includes(keyword)) {
            return message.send(`<:loudwarning:591525783994892288>  **|  Esta palavra chave já existe, tente um nome diferente.**`);
        }
        // First we update the database, adding the keyword and the new reaction
        await message.guild.settings.update({ customReactions: { keywords: keyword, response: content } });
        const updatedSettings = await gSettings.get('customReactions');
        const keywordIndex = updatedSettings.get('keywords').indexOf(keyword);
        const contentIndex = updatedSettings.get('keywords').indexOf(content);

        // Creating the message that will tell the user the database was successfully updated
        const successEmbed = new MessageEmbed()
            .setColor((this.client.settings as ClientSettings).get('colors').get('LOUD_GREEN'))
            .setThumbnail((this.client.settings as ClientSettings).get('images').get('LOUD_LOGO'))
            .setDescription(`O seguinte conteúdo foi atualizado no banco de dados:`)
            .addField('Palavra-Chave', `**${keyword}**`)
            .addField('Reação', `\`\`\`${content}\`\`\``);

        // If the indexes match, success, otherwise, tell them something went wrong (very unlikely)
        // TODO: I need to actualy handle this error later when I have more time
        if (keywordIndex !== contentIndex) return message.send(successEmbed);
        return message.send(`<:loudwarning:591525783994892288>  **|  Houve um erro.**`);
    }
}
