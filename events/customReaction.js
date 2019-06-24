const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'customReaction',
      event: 'customReaction',
      enabled: true,
      once: false,
    });
  }

  async run(message, keyword) {
    // Getting the keywords and responses from the database.
    // Since the keywords and responses are only added together,
    // their indexes will always match, so we will be using that
    // to match the keywords to their responses
    const keywords = message.guild.settings.get('customReactions').keywords;
    const index = keywords.indexOf(keyword);
    const response = message.guild.settings.get('customReactions').response[index];
    // If, by any means, we can't get the response, we will just do nothing
    if (!response) return null;
		const reactionEmbed = new MessageEmbed()
		.setColor('#39d52d')
    return message.send(reactionEmbed);
  }
};
