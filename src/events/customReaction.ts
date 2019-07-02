import { Event, EventStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

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
		//@ts-ignore
		const keywords = await message.guild.settings.get('customReactions').keywords;
		const index = keywords.indexOf(keyword);
		//@ts-ignore
		const response = await message.guild.settings.get('customReactions').response[index];
		// If, by any means, we can't get the response, we will just do nothing
		if (!response) return null;
		const reactionEmbed = new MessageEmbed()
			//@ts-ignore
			.setColor(this.client.settings.colors.LOUD_GREEN)
			.setTitle(`LOUD`)
			.setDescription(response);
		return message.channel.send(`<@${message.author.id}>`, reactionEmbed);
	}

};
