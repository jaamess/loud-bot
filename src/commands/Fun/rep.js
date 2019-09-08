const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['reputation', 'pontos'],
			cooldown: 10800,
			permissionLevel: 8,
			description: 'Dá um ponto de reputação a um outro membro do servidor!',
			extendedHelp: 'Nenhuma ajuda extra disponível.',
			usage: '<user:user>',
			usageDelim: ' ',
		});
	}

	async run(message, user) {
		if (message.channel.id !== '550198844265332756') return;
		if (user.id === message.author.id) return cantRep();
		const reppedUser = user.id;
		const currentPoints = await user.settings.get('reputationPoints');

		// Update user's rep points
		const updatedPoints = await reppedUser.settings.update('reputationPoints', currentPoints++);

		return message.send(`**${message.member.displayName}** deu 1 ponto de reputação para <@${reppedUser.id}>! <@${reppedUser.id}> agora tem **${updatedPoints > 1 ? `${updatedPoints} pontos.` : `${updatedPoints} ponto.`}**`);
	}

	cantRep() {
		return message.channel.send('<:loudwarning:591525783994892288>  **|  Oops, você não pode dar pontos de reputação para si mesmo! Tente novamente daqui a 2 horas.**')
	}
};

