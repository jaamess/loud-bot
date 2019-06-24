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
    const customReactions = message.guild.settings.get('customReactions');
    const index = customReactions.keyword.indexOf(keyword);
    const response = customReactions.response[index];
    if (!response) return message.send('No response');

    return message.send(response);
  }
};
