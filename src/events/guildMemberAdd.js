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
		const username = member.user.username.toLowerCase().trim();
		console.log(username);
		let brunoBot = ['bruno ph', 'brunoph', 'brunhophh', 'bruno playhard', 'bruno  ph'];
		console.log(brunoBot.includes(username));
		for (const username of brunoBot) {
			if (username === member.user.username) {
			await member.ban({days: 7, reason: 'Self-bot do PH detectado'});
			member.guild.channels.get('628110340579917856').send(`<:loudwarning:591525783994892288> * |  Self bot do PH detectado e banido. Usuario: <@${member.id}>. ID: ${member.id}*`);
			console.log(`Self-bot banido: ${member.user.tag}`);
			}
		}
	}

};

