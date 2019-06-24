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
    const keywords = message.guild.settings.get('customReactions').keywords;
    console.log(keywords);
    const messageContent = message.content.split(' ').slice(0)[0];
    if (!whiteListedChannels.includes(message.channel.id)) return;
    if (!keywords.includes(messageContent)) return;
    const index = keywords.indexOf(messageContent);
    const keyword = keywords[index];
    console.log(keyword);

    return this.client.emit('customReaction', message, keyword);
  }
};
