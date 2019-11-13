const { Monitor } = require('klasa');
const { getRandomItem } = require('../lib/util/rand');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreOthers: false
		});
	}

	async run(message) {
		if (message.channel.type === 'dm') return;
		if (!message.guild) return;

		const clientTickets = this.client.settings.get('tickets');

		if (clientTickets.get('blacklistedChannels').includes(message.channel.id)) return;

		const tickets = await message.author.settings.get('tickets');

		if (this.chanceGen(tickets.get('chance'))) {
			await message.author.settings.update([['tickets.count', tickets.get('count') + 1]]);
			await message.react(message.guild.emojis.get(clientTickets.get('reaction')));
			return;
		}

		return;
	}

	chanceGen(chance) {
		chance = Number(chance);
		const lossChance = 1 - chance;

		const options = [false, true];
		const weights = [lossChance, chance];
		return getRandomItem(options, weights);
	}

};
