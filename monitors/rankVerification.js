const { Monitor } = require('klasa');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'rankVerification',
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true,
      ignoreOthers: false,
      ignoreWebhooks: true,
      ignoreEdits: false,
      ignoreBlacklistedUsers: true,
      ignoreBlacklistedGuilds: true,
    });
  }

  run(message) {
    /* This code is commented out because it is incomplete and will not be used for now
     * Do not remove the comments
     * unless you know exactly what you are doing
     */
    // if (message.channel.id !== '') return;
    // this.react(message);
  }

  react(message) {
    setTimeout(() => {
      message.react(message.guild.emojis.get(''));
    }, 850);
    setTimeout(() => {
      message.react(message.guild.emojis.get(''));
    }, 850);
    setTimeout(() => {
      message.react(message.guild.emojis.get(''));
    }, 850);
    setTimeout(() => {
      message.react(message.guild.emojis.get(''));
    }, 850);
    setTimeout(() => {
      message.react(message.guild.emojis.get(''));
    }, 850);
  }
};
