const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Add a video to your survey.',
			runIn: ['dm'],
			usage: '<url:url>'
		});
	}

	async run(message, [url]) {
		// Save all the answers into the users database.
		const answers = await message.author.settings.get('surveyAnswers');
		// If the user has not filled out the survey yet, we ask them to use the survey command.
		if (!answers || !answers.length) {
			return message.send('Please use the survey command first to answer the questions.');
		}

		// Add the url answer to the answers
		answers.push({
			question: `To end this, we need you to send us a 30-45 second video telling why we should pick you to participate in the tournament and to become the next LOUD member. Can be through Youtube, Instgram, Twitter, or Facebook. If you don't have it yet, don't you worry, you can send it later using the code !video and the link, like this: !video www.youtube.com/XXXXX. If you don't have the video yet, just hit enter.`,
			answer: url
		});

		return message.author.settings.update('surveyAnswers', answers);
	}

};
