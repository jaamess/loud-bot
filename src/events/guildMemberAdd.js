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
		console.log(member.user.username.toLowerCase());
		const username = member.user.username.toLowerCase();
		const brunoBot = ['bruno ph', 'brunoph', 'brunhophh', 'bruno playhard'];
		console.log(brunoBot.includes(username));
		if (brunoBot.includes(username)) {
			await member.ban({days: 7, reason: 'Self-bot do PH detectado'});
			member.guild.channels.get('628110340579917856').send(`<:loudwarning:591525783994892288> * |  Self bot do PH detectado e banido. Usuario: <@${member.id}>. ID: ${member.id}*`);
			console.log(`Self-bot banido: ${member.user.username}#${member.user.discriminator}`);
		}
	}

};

