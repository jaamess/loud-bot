const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['reputation', 'pontos'],
			cooldown: 10800,
			permissionLevel: 0,
			description: 'Dá um ponto de reputação a um outro membro do servidor!',
			extendedHelp: 'Nenhuma ajuda extra disponível.',
			usage: '<usuario:user>',
			usageDelim: ' ',
		});
	}

	async run(message, [user]) {
		if (message.channel.id !== '550198844265332756') return;
		if (user.id === message.author.id) return this.cantRep(message);
		const reppedUser = user.id;
		let currentPoints = user.settings.get('reputationPoints');
		// Update user's rep points
		await user.settings.update('reputationPoints', currentPoints + 1, { throwOnError: true } );
		const updatedPoints = user.settings.get('reputationPoints');

		const response = new MessageEmbed()
		.setColor('#13ff00')
		.setDescription(`**${message.member.displayName}** deu 1 ponto de reputação para <@${reppedUser}>!\n<@${reppedUser}> agora tem **${updatedPoints > 1 ? `${updatedPoints} pontos.` : `${updatedPoints} ponto.`}**`)
		.setFooter('Para ver o ranking de pontos neste servidor, digite loud lb.');

		return message.send(response);
	}

	cantRep(message) {
		return message.channel.send('<:loudwarning:591525783994892288>  **|  Oops, você não pode dar pontos de reputação para si mesmo! Tente novamente daqui a 2 horas.**')
	}
};

