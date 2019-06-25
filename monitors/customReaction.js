const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }
  /**
   * @param {import('klasa').KlasaMessage} message
   */
  async run(message) {
    // Getting whitelisted channels and keywords from the database
    const whiteListedChannels = await message.guild.settings.get('whitelistedChannels');
    const keywords = await message.guild.settings.get('customReactions').keywords;
    const keywordInUserMessageContent = message.content.split(' ');
    // If it's not a whitelisted channel or if it's not a keyword, do nothing
    if (!whiteListedChannels.includes(message.channel.id)) return;
    if (!keywordInUserMessageContent.some((k) => keywords.includes(k))) return;

    const keyword = keywordInUserMessageContent.filter((key) => keywords.includes(key))[0];

    // Emit the event that will handle the custom reaction
    return this.client.emit('customReaction', message, keyword);
  }
};
