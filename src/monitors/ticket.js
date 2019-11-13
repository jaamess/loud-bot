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

		const clientTickets = await this.client.settings.get('tickets');

		if (clientTickets.get('blacklistedChannels').includes(message.channel.id)) return;

		const tickets = await message.author.settings.get('tickets');

		const cBool = this.chanceGen(clientTickets.get('chance'));

		if (cBool) {
			await message.author.settings.update([['tickets.count', tickets.get('count') + 1]]);
			await message.react(message.guild.emojis.get(clientTickets.get('reaction')));
			return;
		}

		return;
	}

	chanceGen(chance) {
		const pchance = Number(chance);
		const lossChance = 1 - pchance;

		const options = [false, true];
		const weights = [lossChance, pchance];
		return getRandomItem(options, weights);
	}

};
