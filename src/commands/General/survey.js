const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'survey',
			enabled: true,
			runIn: ['text'],
			description: '',
			extendedHelp: ''
		});
	}

	async run(message) {
		const surveySettings = message.author.settings.get('survey');
		if (surveySettings.status.active) return message.send('Already in progress');
		try {
			await message.author.send(
				'Iai amigo! Prazer, eu sou o LOUD Bot. Ire te guiar em seu cadastro do LOUDX1. Vou te fazer algumas perguntas, responda corretamente, caso contrário a sua inscrição será invalidada.'
			);
		} catch (_) {
			return message.send('Oh well... Seems I can\'t DM you. Isn\' that a pain...');
		}

		await message.author.settings.update(['survey.status.active', 'survey.status.startTime', 'survey.step'], [true, Date.now().getUnixTime(), 1]);

		return message.reply('Please check our DM\'s');
	}

};
