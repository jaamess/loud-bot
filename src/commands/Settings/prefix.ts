import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { GuildSettings } from '../../lib/types/settings';

export default class extends Command {
  public constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      name: 'prefix',
      quotedStringSupport: true,
      enabled: true,
      runIn: ['text'],
      cooldown: 10,
      deletable: false,
      permissionLevel: 6,
      usage: '[prefixo:str]',
      description: 'Muda o prefixo do bot no servidor.',
    });
  }

  async run(message: KlasaMessage, newPrefix: string[]): Promise<KlasaMessage | KlasaMessage[]> {
    const oldPrefix = (message.guild.settings as GuildSettings).get('prefix')
    if (oldPrefix === newPrefix[0]) return message.send('O prefixo da guilda já é este, não há nada pra mudar.');
    if (!newPrefix[0]) {
      message.guild.settings.reset('prefix');
      return message.send(message.language.get('COMMAND_PREFIX_RESET'));
    }

    message.guild.settings.update('prefix', newPrefix[0]);

    const embed: MessageEmbed = new MessageEmbed()
      .setColor('#39d52d')
      .setTitle(message.language.get('SETTINGS'))
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('COMMAND_PREFIX_SUCCESS', newPrefix[0]));

    return message.send(embed);
  }
};
