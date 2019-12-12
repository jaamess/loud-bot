const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Reset the survey for a user so they can fill it again.',
			permissionLevel: 6,
			usage: '<user:user>'
		});
	}

	async run(message, [user]) {
		// Save all the answers into the users database.
		await user.settings.reset('surveyAnswers');

		return message.send(`Reset ${user} survey answers. They can fill it out again.`);
	}

};
