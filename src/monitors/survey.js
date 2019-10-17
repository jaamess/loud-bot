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
			[1, { response: '1', id: '' }],
			[2, { response: '2', id: '' }],
			[3, { response: '3', id: '' }],
			[-21, { response: 'It\'s all for now, thank you for everything and good luck!', id: '' }]
		]);
	}

	async run(message) {
		if (!(message.channel.type !== 'dm' && message.guild)) return;

		const survey = deepClone(message.author.settings.get('survey'));
		const { step, answers } = survey;

		if (this.QUESTIONS.has(step)) await this.save(step, message.content, answers, message.author.settings);

		message.author.settings.update('survey.step', step + 1);

		message.author.send(this.QUESTIONS.get(step + 1));

		if (!this.QUESTIONS.has(step)) {
			message.author.send(this.QUESTIONS.get(-21).response);
			return;
		}
	}

	async save(step, answer, answers, settings) {
		answers.push([step, { answer }]);
		return settings.update('surver.answers', answers, { action: 'overwrite' })
	}

};
