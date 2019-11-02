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
		const roles = { one: '640011392555941890', two: '640011438873903104', three: '640011460948525056', four: '640011477486534657', five: '640011505307222029', six: '640011523632136215', seven: '640011540090585097', eight: '640011555345399828', nine: '640011572147650581', ten: '640011589344428032' };
		const question = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f', seven: 'g', eight: 'h', nine: 'i', ten: 'j' };
		const loudFoguete = '<:loudfoguete:551135142756745227>';
		if (message.content.toLowerCase() === question.one) {
			console.log(`question 1`)
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 1!*`);
			return this.giveRole(message.member, roles.one);
		}
		if (message.content.toLowerCase() === question.two) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 2!**`);
			return this.giveRole(message.member, roles.two);
		}
		if (message.content.toLowerCase() === question.three) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 3!**`);
			return this.giveRole(message.member, roles.three);
		}
		if (message.content.toLowerCase() === question.four) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 4!**`);
			return this.giveRole(message.member, roles.four);
		}
		if (message.content.toLowerCase() === question.five) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 5!**`);
			return this.giveRole(message.member, roles.five);
		}
		if (message.content.toLowerCase() === question.six) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 6!**`);
			return this.giveRole(message.member, roles.six);
		}
		if (message.content.toLowerCase() === question.seven) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 7!**`);
			return this.giveRole(message.member, roles.seven);
		}
		if (message.content.toLowerCase() === question.eight) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 8!**`);
			return this.giveRole(message.member, roles.eight);
		}
		if (message.content.toLowerCase() === question.nine) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 9!**`);
			return this.giveRole(message.member, roles.nine);
		}
		if (message.content.toLowerCase() === question.ten) {
			message.delete();
			message.channel.send(`${loudFoguete}  **|  <@${message.member.id}> acertou a pergunta 10!**`);
			return this.giveRole(message.member, roles.ten);
		}
	}

	async giveRole(member, role) {
		await member.roles.add(role);
		return
	}

};

