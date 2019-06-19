const { Client } = require('klasa');
const { prefix, token } = require('./ecosystem.config.json');

Client.defaultPermissionLevels
  .add(5, (message) => message.member.roles.highest.position >= 20)
  .add(6, (message) => message.member.permissions.has('ADMINISTRATOR'));

new Client({
  fetchAllMembers: true,
  prefix: prefix,
  commandEditing: true,
  typing: false,
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`,
}).login(token);
