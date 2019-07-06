import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { ClientSettings, GuildSettings } from '../../lib/types/settings';

export default class extends Command {
  public constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      permissionLevel: 5,
      description: 'Mostra as configurações atuais no servidor',
      extendedHelp: 'config reacoes -> Mostra as configurações atuais para a função de reações customizadas, como canais permitidos e palavras-chave.',
      usage: '[reacoes]',
    });
  }

  async run(message: KlasaMessage, reacoes: any): Promise<KlasaMessage | KlasaMessage[]> {
    if (reacoes.length) return this.reactionConfig(message);

    const embed: MessageEmbed = new MessageEmbed()
      .setColor((this.client.settings as ClientSettings).get('colors').get('LOUD_GREEN'))
      .setThumbnail((this.client.settings as ClientSettings).get('images').get('LOUD_LOGO'))
      .setDescription(message.language.get('COMMAND_CONFIG_GENERAL_DESCRIPTION'))
      .addField('Prefix', message.guild.settings.get('prefix'), true)
      .addField(message.language.get('LANGUAGE'), message.language.name);

    return message.send(embed);
  }

  async reactionConfig(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
    const channels = await (message.guild.settings as GuildSettings).get('whitelistedChannels');
    const keywords = await (message.guild.settings as GuildSettings).get('customReactions').get('keywords');
    const responses = await (message.guild.settings as GuildSettings).get('customReactions').get('response');
    const embed: MessageEmbed = new MessageEmbed()
      .setColor((this.client.settings as ClientSettings).get('colors').get('LOUD_GREEN'))
      .setThumbnail((this.client.settings as ClientSettings).get('images').get('LOUD_LOGO'))
      .setDescription(message.language.get('COMMAND_CONFIG_REACTION_DESCRIPTION'))
      .addField('Canais Permitidos', channels.length ? `<#${channels.join('>, <#')}>` : 'Nenhum canal')
      .addField('Palavras-Chave', keywords.join(', '))
      .addField('Respostas', message.language.get('COMMAND_CONFIG_REACTION_RESPONSES', responses.length));

    return message.send(embed);
  }
};
