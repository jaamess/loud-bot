const { KlasaClient } = require('klasa');
const { prefix, token } = require('../ecosystem.config.json');

// Default Schemas
KlasaClient.defaultGuildSchema
	.add('whitelistedChannels', 'channel', { array: true })
	.add('customReactions', (folder) => folder.add('keywords', 'string', { array: true }).add('response', 'string', { array: true }));
KlasaClient.defaultClientSchema
	.add('colors', (folder) => folder.add('LOUD_GREEN', 'string').add('LOUD_BLACK', 'string'))
	.add('images', (folder) => folder.add('LOUD_LOGO', 'url'))
	.add('reactionRoleMessages', 'string', { array: true });
KlasaClient.defaultUserSchema
	.add('reputationPoints', 'integer', {default: 0});

// Permission Levels
KlasaClient.defaultPermissionLevels
// Torcedor Hyper
	.add(5, (message) => message.member.roles.highest.position >= 53)
// Admin
	.add(6, (message) => message.member.permissions.has('ADMINISTRATOR'));

new KlasaClient({
	commandLogging: true,
	fetchAllMembers: true,
	prefix: prefix,
	commandEditing: true,
	typing: false,
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);
