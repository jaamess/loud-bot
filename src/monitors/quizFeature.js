const { Monitor } = require('klasa');
module.exports = class extends Monitor {
	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false,
			ignoreWebhooks: true,
			ignoreEdits: true
		});
	}

	async run(message) {
		if (message.channel.id !== '639560440862474243') return;
		console.log('right channel');
		const roles = { one: '640011392555941890', two: '640011438873903104', three: '640011460948525056', four: '640011477486534657', five: '640011505307222029', six: '640011523632136215', seven: '640011540090585097', eight: '640011555345399828h', nine: '640011572147650581', ten: '640011589344428032' };
		const question = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f', seven: 'g', eight: 'h', nine: 'i', ten: 'j' };
		const loudFoguete = '<:loudfoguete:551135142756745227>';
		if (message.content === question.one) {
			console.log(`question 1`)
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 1 eba.**`);
			return this.giveRole(message.member, roles.one);
		}
		if (message.content === question.two) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 2 eba.**`);
			return this.giveRole(message.member, roles.two);
		}
		if (message.content === question.three) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 3 eba.**`);
			return this.giveRole(message.member, roles.three);
		}
		if (message.content === question.four) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 4 eba.**`);
			return this.giveRole(message.member, roles.four);
		}
		if (message.content === question.five) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 5 eba.**`);
			return this.giveRole(message.member, roles.five);
		}
		if (message.content === question.six) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 6 eba.**`);
			return this.giveRole(message.member, roles.six);
		}
		if (message.content === question.seven) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 7 eba.**`);
			return this.giveRole(message.member, roles.seven);
		}
		if (message.content === question.eight) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 8 eba.**`);
			return this.giveRole(message.member, roles.eight);
		}
		if (message.content === question.nine) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 9 eba.**`);
			return this.giveRole(message.member, roles.nine);
		}
		if (message.content === question.ten) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou pergunta 10 eba.**`);
			return this.giveRole(message.member, roles.ten);
		}
	}

	async giveRole(member, role) {
		await member.roles.add(role);
		console.log((`role added`))
		return
	}

};

