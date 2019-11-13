const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			permissionLevel: 0,
			usage: '[usuario:user]',
			usageDelim: ' '
		});
	}

	async run(message, [user]) {
		const { permission } = await this.client.permissionLevels.run(message, 6);

		if ((permission === true) && user) return this.getOthers(message, user);
		if (((message.channel.type !== 'dm') || message.guild) && !user) throw 'Now do you really want others seeing your ticket count? Yea I thought so. Now go run this again in my DMs';
		if (!user) return this.getPersonal(message);
		throw 'I am sorry but you can\'t check other peoples tickets. Again sorry... But not really';
	}

	async getPersonal(message) {
		const tickets = await message.author.settings.get('tickets');

		try {
			await message.author.send(`You currently have ${tickets.get('count')} tickets.`);
			return;
		} catch (__) {
			await message.channel.send('Oh it seems that I couldn\'t DM you... Now that is a pain');
			return;
		}
	}

	async getOthers(message, user) {
		const tickets = await user.settings.get('tickets');
		return message.channel.send(`${user.tag} currently has ${tickets.get('count')} tickets.`);
	}

};
