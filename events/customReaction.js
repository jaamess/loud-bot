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
    switch (keyword) {
      case 'test':
        message.channel.send(':white_check_mark:  **|  Tested!**');
        break;
      default:
        return null;
    }
  }
};
