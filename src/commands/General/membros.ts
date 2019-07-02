import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      name: 'membros',
      enabled: true,
      runIn: ['text'],
      cooldown: 0,
      deletable: false,
      permissionLevel: 5,
      subcommands: false,
      description: 'Mostra a quantidade de membros no servidor',
    });
  }

  async run(message: KlasaMessage) {
    const embed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(`LOUD`)
      .setDescription(`Este servidor tem ${message.guild.members.size} membros.`);

    return message.send(embed);
  }
};
