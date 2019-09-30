const { Event } = require('klasa');
module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			name: 'guildMemberAdd',
			event: 'guildMemberAdd',
			enabled: true,
			once: false
		});
	}

	async run(member) {
		const brunoBot = ['brunoph', 'brunhophh', 'bruno playhard'];
		console.log(member.username);
		if (brunoBot.includes(member.username)) {
			console.log('bruno bot');
			await member.ban({days: 7, reason: 'Self-bot do PH detectado'});
			member.guild.channels.get('579470954166747146').send(`:loudwarning: * |  Self bot do PH detectado e banido. Usuario: <@${member.id}>. ID: ${member.id}`);
			onsole.log(`Self-bot banido: ${member.user.username}#${member.user.discriminator}`);
		}
	}

};

