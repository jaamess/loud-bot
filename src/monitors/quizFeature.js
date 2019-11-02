const { Monitor } = require('klasa');
module.exports = class extends Monitor {

	async run(message) {
		if (message.channel.id !== '639560440862474243') return;
		const roles = { one: '640011392555941890', two: '640011438873903104', three: '640011460948525056', four: '640011477486534657', five: '640011505307222029', six: '640011523632136215', seven: '640011540090585097', eight: '640011555345399828h', nine: '640011572147650581', ten: '640011589344428032' };
		const question = { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e', six: 'f', seven: 'g', eight: 'h', nine: 'i', ten: 'j' };

		if (message.content.startsWith(question.one)) {
			message.delete();
			return this.giveRole(message.member, roles.one);
		}
		if (message.content.startsWith(question.two)) {
			message.delete();
			return this.giveRole(message.member, roles.two);
		}
		if (message.content.startsWith(question.three)) {
			message.delete();
			return this.giveRole(message.member, roles.three);
		}
		if (message.content.startsWith(question.four)) {
			message.delete();
			return this.giveRole(message.member, roles.four);
		}
		if (message.content.startsWith(question.five)) {
			message.delete();
			return this.giveRole(message.member, roles.five);
		}
		if (message.content.startsWith(question.six)) {
			message.delete();
			return this.giveRole(message.member, roles.six);
		}
		if (message.content.startsWith(question.seven)) {
			message.delete();
			return this.giveRole(message.member, roles.seven);
		}
		if (message.content.startsWith(question.eight)) {
			message.delete();
			return this.giveRole(message.member, roles.eight);
		}
		if (message.content.startsWith(question.nine)) {
			message.delete();
			return this.giveRole(message.member, roles.nine);
		}
		if (message.content.startsWith(question.ten)) {
			message.delete();
			return this.giveRole(message.member, roles.ten);
		}
	}

	async giveRole(member, role) {
		await member.roles.add(role);
		return
	}

};

