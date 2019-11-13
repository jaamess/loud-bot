const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ['text'],
			permissionLevel: 0,
			description: 'Mostra o top 10 de pontos de reputação no servidor da LOUD.'
		});
	}

	async run(message) {
		// Fetch everyone
		// await message.guild.members.fetch();

		const medals = {
			0: '🥇',
			1: '🥈',
			2: '🥉'
		};

		const leaderboard = [
			...message.guild.members
				.filter(member => member.user.settings.get('reputationPoints') > 0)
				.sort((a, b) => b.user.settings.get('reputationPoints') - a.user.settings.get('reputationPoints'))
				.values()
		]
			.slice(0, 12)
			.map((member, index) => `${index in medals ? medals[index] : `${index + 1} `}  ::  ${member.user.settings.get('reputationPoints')} pontos  ::  ${member.displayName}  `).join('\n');

		const response = new MessageEmbed()
			.setColor('#13ff00')
			.setTitle('Rank de Pontos de Reputação')
			.setDescription(`\`\`\`TOP 12\nPos.  ::  Pontos  ::  Membro\n\n${leaderboard}\`\`\``);

		return message.send(response);
	}

};
