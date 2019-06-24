const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'customReaction',
      event: 'customReaction',
      enabled: true,
      once: true,
    });
  }

  async run(message, keyword) {
    const keywords = message.guild.settings.get('customReactions').keywords;
    const index = keywords.indexOf(keyword);
    const response = message.guild.settings.get('customReactions').response[index];
    if (!response) return message.send('No response');

    return message.send(`You said "${keyword}", so I say "${response}"!`);
  }
};
