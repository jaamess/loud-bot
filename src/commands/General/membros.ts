import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export default class extends Command {
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            name: 'membros',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            permissionLevel: 5,
            subcommands: false,
            description: 'Mostra a quantidade de membros no servidor'
        });
    }

    public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
        const embed: MessageEmbed = new MessageEmbed()
            .setColor('#39d52d')
            .setTitle(`LOUD`)
            .setDescription(`Este servidor tem ${message.guild.members.size} membros.`);

        return message.send(embed);
    }
}
