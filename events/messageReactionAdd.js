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
    /*
     * Deactivating this event until further notice as per the server's current needs..
     */
    return;
    if (reaction.message.channel.parent.id !== '589243529075752970') return;
    if (reaction.emoji.name === '❌') {
      for (const users of reaction.users) {
        // if (users.roles.position >= 23) return;
        reaction.users.remove(user.id);
      }
    }
  }
};
