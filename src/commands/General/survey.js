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
		const surveyStatusSettings = await message.author.settings.get('survey');
		const position = await this.client.settings.get('surveyPosition');
		if (surveyStatusSettings.active) return message.send('Already in progress');
		try {
			await message.author.send(
				'Iai amigo! Prazer, eu sou o LOUD Bot. Ire te guiar em seu cadastro do LOUDX1. Vou te fazer algumas perguntas, responda corretamente, caso contrário a sua inscrição será invalidada.'
			);
			await message.author.send(this.client.monitors.get('surveyMonitor').QUESTIONS.get(1).response);
			await message.author.settings.update([['survey.status.active', true], ['survey.status.startTime', Date.now()], ['survey.step', 0], ['survey.position', position]]);
			await this.client.settings.update([['surveyPosition', position + 1]]);
		} catch (__) {
			return message.send('Oh well... Seems I can\'t DM you. Isn\' that a pain...');
		}

		return message.reply('Please check our DM\'s');
	}

};
