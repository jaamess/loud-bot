const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['inv', 'convite'],
			autoAliases: true,
			bucket: 1,
			cooldown: 10,
			permissionLevel: 5,
			description: 'Envia códigos de convite dos servidores verificados dos membros da LOUD.',
			usage: '[server:string]'
		});
	}

	async run(message, server) {
		if (!server[0]) return this._loudInvite(message);
		switch (server[0]) {
			case 'loud': return this._loudInvite(message);
			case 'bruno': return this._brunoInvite(message);
			case 'crusher': return this._crusherInvite(message);
		}
		return message;
	}

	_loudInvite(message) {
		return message.send('Convite do servidor da LOUD:\nhttps://discord.gg/loud/');
	}
	_brunoInvite(message) {
		return message.send('Convite do servidor do Bruno PH:\nhttps://discord.gg/playhard');
	}
	_crusherInvite(message) {
		return message.send('Convite do servidor do Crusher:\nhttps://discord.gg/loudcrusher');
	}

};
