const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: 'messageReactionAdd',
      enabled: true,
      event: 'messageReactionAdd',
      once: false,
    });
  }

  run(reaction, user) {
    if (reaction.emoji.name === '❌') {
      if (user.roles.position >= 23) return;
      for (const users of reaction.users) reaction.users.remove(user.id);
    }
  }
};
