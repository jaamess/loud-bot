const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
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

		const leaderboard = message.guild.members.sort((a, b) => b.user.settings.get('reputationPoints') - a.user.settings.get('reputationPoints')).filter(member => member.user.settings.get('reputationPoints') > 0).map((member, index) => `**${member.displayName}** :: *${member.user.settings.get('reputationPoints')}* pontos`).slice(0, 10);

		const response = new MessageEmbed()
		.setcolor(this.client.settings.colors.LOUD_GREEN)
		.setTitle('Rank de Pontos de Reputação')
		.setDescription(`**TOP 10**\n\n${leaderboard}`);

		return message.send(response);
	}

};
