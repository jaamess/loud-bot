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
		const surveySettings = await message.author.settings.get('survey');
		const surveyStatusSettings = await message.author.settings.get('survey');
		if (surveyStatusSettings.active) return message.send('Already in progress');
		try {
			await message.author.send(
				'Iai amigo! Prazer, eu sou o LOUD Bot. Ire te guiar em seu cadastro do LOUDX1. Vou te fazer algumas perguntas, responda corretamente, caso contrário a sua inscrição será invalidada.'
			);
			console.log(await message.author.settings.update([['survey.status.active', true], ['survey.status.startTime', Date.now()], ['survey.step', 0]]));
		} catch (_) {
			return message.send('Oh well... Seems I can\'t DM you. Isn\' that a pain...');
		}

		return message.reply('Please check our DM\'s');
	}

};
