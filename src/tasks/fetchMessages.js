const { Task } = require('klasa');

module.exports = class extends Task {

	async init() {
		if (this.client.guilds.get('593488629993832448').available) {
			this.client.guilds
				.get('593488629993832448')
				.channels.get('593493916293136424')
				.messages.fetch();
		} else {
			console.error('Could not fetch guild Free Fire: guild is unavailable.');
		}
		return null;
	}

};
