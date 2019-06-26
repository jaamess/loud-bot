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
    if (reaction.message.channel.parent.id !== '589243529075752970') return;
    if (reaction.emoji.name === '❌') {
      for (const users of reaction.users) {
        // Uncomment this to allow moderators to react with "x"
        // if (users.roles.position >= 27) return;
        reaction.users.remove(user.id);
      }
    }
  }
};
