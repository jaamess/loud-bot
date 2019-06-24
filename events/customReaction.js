const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false,
    });
  }

  async run(message, keyword) {
    console.log(`Event emitted. Keyword: "${keyword}".`);
  }
};
