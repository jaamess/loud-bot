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
  /**
   *
   * @param {import('discord.js').MessageReaction} reaction
   */
  async run(reaction, user) {
    const whitelistedChannels = ['589243529075752970', '593493916293136424'];
    if (!whitelistedChannels.includes(reaction.message.channel.id)) return;
    if (reaction.message.channel.parent.id === '589243529075752970') {
      if (reaction.emoji.name === '❌') {
        for (const users of reaction.users) {
          // Uncomment this to allow moderators to react with "x"
          // if (users.roles.position >= 27) return;
          reaction.users.remove(user.id);
        }
      }
    }

    if (reaction.message.channel.id === '593493916293136424') {
      const member = await reaction.message.guild.members.fetch(user).catch(() => console.error);
      member.roles.add('593494969478676483');
      console.log(`Verified user in FF server successfully.`);
    }
  }
};
