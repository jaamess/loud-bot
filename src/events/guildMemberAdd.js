const { Event } = require('klasa');
module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			enabled: true,
			once: false
		});
	}

	async run(member) {
		const brunoBot = ['brunoph', 'brunhophh', 'bruno playhard'];

		if (brunoBot.includes(message.member.username)) {
			console.log(`Self-bot banido: ${member.user.username}#${member.user.discriminator}`);
			member.guild.channels.get('579470954166747146').send(`:loudwarning: * |  Self bot do PH detectado e banido. Usuario: <@${member.id}>. ID: ${member.id}`);
			member.ban({days: 7, reason: 'Self-bot do PH detectado'});
		}
	}

};

