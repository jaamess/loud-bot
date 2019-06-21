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
     * Desativando este evento ate que seja pedido.
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
