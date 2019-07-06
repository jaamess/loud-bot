import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '../lib/types/settings';

export default class extends Monitor {

	constructor(store:MonitorStore, file: string[], directory: string) {
		super(store, file, directory, {
			ignoreOthers: false,
			ignoreEdits: false
		});
	}
	async run(message: KlasaMessage) {
		// Return if its a command
		if (!message.guild) return null;
		if (message.content.startsWith((message.guild.settings as GuildSettings).get('prefix'))) return null;
		const guildSettings = await message.guild.settings as GuildSettings;
		// Getting whitelisted channels and keywords from the database
		const whiteListedChannels = await guildSettings.get('whitelistedChannels');
		const keywords = await guildSettings.get('customReactions').get('keywords');
		const keywordInUserMessageContent = message.content.split(' ');
		// If it's not a whitelisted channel or if it's not a keyword, do nothing
		if (!whiteListedChannels.includes(message.channel.id)) return null;
		if (!keywordInUserMessageContent.some((cont) => keywords.includes(cont))) return null;

		const keyword = keywordInUserMessageContent.filter((key) => keywords.includes(key))[0];

		// Emit the event that will handle the custom reaction
		return this.client.emit('customReaction', message, keyword);
	}

};
