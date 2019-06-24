const { KlasaClient } = require('klasa');
const { prefix, token } = require('./ecosystem.config.json');

// Default Schemas
KlasaClient.defaultGuildSchema.add('whitelistedChannels', 'channel', { array: true });
KlasaClient.defaultClientSchema.add('keywords', 'string', { array: true });

// Permission Levels
KlasaClient.defaultPermissionLevels
  .add(4, (message) => message.member.roles.has('585898221415563275')) // Torcedor Hyper
  .add(5, (message) => message.member.roles.highest.position >= 20) // Ajudante
  .add(6, (message) => message.member.permissions.has('ADMINISTRATOR')); // Admin

new KlasaClient({
  fetchAllMembers: true,
  prefix: prefix,
  commandEditing: true,
  typing: false,
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`,
}).login(token);
