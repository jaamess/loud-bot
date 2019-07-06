import { Event, EventStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { GuildSettings, ClientSettings } from '../lib/types/settings';

export default class extends Event {

	constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, {
			name: 'customReaction',
			event: 'customReaction',
			enabled: true,
			once: false
		});
	}

	async run(message: KlasaMessage, keyword: string) {
		// Getting the keywords and responses from the database:
		// Since the keywords and responses are only added together,
		// their indexes will always match, so we will be using that
		// to match the keywords to their responses
		const keywords = await (message.guild.settings as GuildSettings).get('customReactions').get('keywords');
		const index = keywords.indexOf(keyword);
		const responses = await (message.guild.settings as GuildSettings).get('customReactions').get('response');
		const response = await (message.guild.settings as GuildSettings).get('customReactions').get(responses[index]);
		// If, by any means, we can't get the response, we will just do nothing
		if (!response) return null;
		const reactionEmbed = new MessageEmbed()
			.setColor((this.client.settings as ClientSettings).get('colors').get('LOUD_GREEN'))
			.setTitle(`LOUD`)
			.setDescription(response);
		return message.send(`<@${message.author.id}>`, reactionEmbed);
	}

};
