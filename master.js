const { Client } = require('klasa');
const { prefix, token } = require('./ecosystem.config.json');

Client.defaultPermissionLevels.add(5, async (message) => {
  message.member.roles.highest.position >= 23;
});

new Client({
  fetchAllMembers: true,
  prefix: prefix,
  commandEditing: true,
  typing: false,
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`,
}).login(token);
