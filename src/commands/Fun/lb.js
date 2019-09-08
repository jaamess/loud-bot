const { Command } = require('klasa');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			permissionLevel: 0,
			description: 'Mostra o top 10 de pontos de reputação no servidor da LOUD.',
		});
	}

	async run(message) {
		// Fetch everyone
		await message.guild.members.fetch()

		const leaderboard = message.guild.members.sort((a, b) => b.user.settings.get('reputationPoints') - a.user.settings.get(reputationPoints)).map((member, index) => `${index + 1}. ${member.user.tag} :: ${member.user.settings.get('reputationPoints')}`).slice(0, 10).join('\n');
		console.log(leaderboard);
		message.send('**Resultado enviado no console.**');
	}

};
