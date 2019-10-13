const { Monitor, util: { deepClone } } = require('klasa');
const { Collection } = require('discord.js');

module.exports = class SurveyMonitor extends Monitor {

	constructor(...args) {
		super(...args, {
			name: 'surveyMonitor',
			enabled: true,
			ignoreBots: true,
			ignoreSelf: true,
			ignoreOthers: false,
			ignoreWebhooks: true,
			ignoreEdits: true,
			ignoreBlacklistedUsers: true,
			ignoreBlacklistedGuilds: true
		});

		this.QUESTIONS = new Collection([
			[-21, 'It\'s all for now, thank you for everything and good luck!']
		]);
	}

	async run(message) {
		if (!(message.channel.type !== 'dm' && message.guild)) return;

		const survey = deepClone(message.author.settings.get('survey'));
        const { step, answers } = survey;

		if (!this.QUESTIONS.has(step)) {
			await this.save(step, answers);
			message.author.send(this.QUESTIONS.get(-21));
			return;
		}
	}

	async save(step, answers) {

	}

};
