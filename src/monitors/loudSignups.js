const { Monitor } = require('klasa');
module.exports = class extends Monitor {
	constructor(...args) {
		super(...args, {
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: true,
			ignoreEdits: false
		});
	}

	async run(message) {
		/*if (!message.channel.id === '595832094471749664') return;
		const screenshot = message.attachments.map((msg) => msg.attachment);
		if (!screenshot.length) {
			message.send('**Você deve enviar um vídeo de pelo menos 30 segundos e no máximo 1 minuto para se inscrever! Tente novamente.**');
			return;
		}*/
	}

};
