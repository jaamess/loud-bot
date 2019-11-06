const { Monitor } = require('klasa');
const { Collection } = require('discord.js');

const DAY = 24 * 60 * 60 * 1000;

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
			[-900, { response: 'This is all for now, thank you for everything and good luck!', type: 'END' }],
			[-800, { response: 'I\' sorry but your time is up... oh wait don\'t give up just yet since you can try again.', type: 'TIMEOUT' }],
			[-90, { response: '', type: 'DATA', method: 'setDiscordTag' }],
			[-91, { response: '', type: 'DATA', method: 'setUserID' }]
		]);

		this.UPDATES = 0;
	}

	async run(message) {
		if (message.channel.type !== 'dm') return;
		if (message.guild) return;

		const survey = await message.author.settings.get('survey');
		const step = survey.get('step');
		const surveyStatus = await message.author.settings.get('survey.status');

		if (surveyStatus.get('completed')) return;
		if (!surveyStatus.get('active')) return;

		if ((surveyStatus.get('startTime') + DAY) < Date.now()) {
			await message.author.send(this.QUESTIONS.get(-800).response);
			await message.author.settings.update([['survey.step', 1], ['survey.status.startTime', 1], ['survey.status.active', false], ['survey.status.completed', false]]);
			return;
		}

		if (this.QUESTIONS.has(step)) await this.save(step, message.content, survey.get('position'));
		await this.save(-91, message.author.id, survey.get('position'));

		await message.author.settings.update([['survey.step', step + 1]]);

		if (!this.QUESTIONS.has(step + 1)) {
			await message.author.send(this.QUESTIONS.get(-900).response);
			await this.save(-90, message.author.tag, survey.get('position'));
			await message.author.settings.update([['survey.status.active', false], ['survey.status.completed', true]]);
			return;
		}
		message.author.send(this.QUESTIONS.get(step + 1).response);
	}

	async save(step, answer, position) {
		let update = false;
		if (this.UPDATES > 50) {
			update = true;
			this.UPDATES = 0;
		}
		await this.client.writer[this.QUESTIONS.get(step).method](answer, position, update);
		this.UPDATES++;
	}

};
