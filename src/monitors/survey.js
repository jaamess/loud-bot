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
			[1, { response: '1', type: 'TEXT', method: 'setDiscordTag' }],
			[2, { response: '2', type: 'TEXT', method: 'setUserID' }],
			[3, { response: '3', type: 'TEXT', method: 'setFullName' }],
			[-21, { response: 'This is all for now, thank you for everything and good luck!', type: 'END' }]
		]);
	}

	async run(message) {
		if (message.channel.type !== 'dm') return;
		if (message.guild) return;

		const survey = await message.author.settings.get('survey');
		const step = survey.get('step');
		const surveyStatus = deepClone(await message.author.settings.get('survey.status'));

		console.log(surveyStatus);
		if (!surveyStatus.get('active')) return;

		if (this.QUESTIONS.has(step)) await this.save(step, message.content, message.author.settings);

		message.author.settings.update('survey.step', step + 1);

		if (!this.QUESTIONS.has(step + 1)) {
			message.author.send(this.QUESTIONS.get(-21).response);
			return;
		}
		message.author.send(this.QUESTIONS.get(step + 1).response);
	}

	async save(step, answer, settings) {
		await this.client.writer[this.QUESTIONS.get(step).method](answer, 5, true);
	}

};
