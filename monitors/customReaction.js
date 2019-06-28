const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreOthers: false,
			ignoreEdits: false
		});
	}
	async run(message) {
		// Return if its a command
		if (!message.guild) return;
		if (message.content.startsWith(message.guild.settings.get('prefix'))) return;
		// Getting whitelisted channels and keywords from the database
		const whiteListedChannels = await message.guild.settings.get('whitelistedChannels');
		const keywords = await message.guild.settings.get('customReactions').keywords;
		const keywordInUserMessageContent = message.content.split(' ');
		// If it's not a whitelisted channel or if it's not a keyword, do nothing
		if (!whiteListedChannels.includes(message.channel.id)) return;
		if (!keywordInUserMessageContent.some((cont) => keywords.includes(cont))) return;

		const keyword = keywordInUserMessageContent.filter((key) => keywords.includes(key))[0];

		// Emit the event that will handle the custom reaction
		this.client.emit('customReaction', message, keyword);
	}

};
