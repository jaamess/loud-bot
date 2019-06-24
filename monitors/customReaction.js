const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }
  /**
   *
   * @param {import('klasa').KlasaMessage} message
   */
  async run(message) {
		const whiteListedChannels = message.guild.settings.get('whitelistedChannels');
		const keywords = message.guild.settings.get('keywords');
    if (!whiteListedChannels.includes(message.channel.id)) return;
    if (!message.content.startsWith(keywords)) return;
  }
};
