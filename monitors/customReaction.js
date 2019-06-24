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
    const messageContent = message.content.split(' ').slice(0)[0];
    const index = keywords.indexOf(messageContent);
    const keyword = keywords[index];

    return this.client.events.emit('customReaction', message, keyword);
  }
};
