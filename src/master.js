const { LoudClient } = require('./lib/structures/LoudClientt')
const { prefix, token } = require('../ecosystem.config.json');

// Default Schemas
LoudClient.defaultGuildSchema
	.add('whitelistedChannels', 'channel', { array: true })
	.add('customReactions', (folder) => folder.add('keywords', 'string', { array: true }).add('response', 'string', { array: true }));

LoudClient.defaultClientSchema
	.add('colors', (folder) => folder.add('LOUD_GREEN', 'string').add('LOUD_BLACK', 'string'))
	.add('images', (folder) => folder.add('LOUD_LOGO', 'url'))
	.add('surveyPosition', 'integer', { default: 3, configurable: false })
	.add('reactionRoleMessages', 'string', { array: true });

LoudClient.defaultUserSchema
	.add('reputationPoints', 'integer', { default: 0, configurable: false })
	.add('survey', surveyFolder => surveyFolder
		.add('status', surveyStatusFolder => surveyStatusFolder
			.add('completed', 'boolean', { default: false, configurable: false })
			.add('active', 'boolean', { default: false, configurable: false })
			.add('startTime', 'integer', { default: 0, configurable: false })
		)
		.add('step', 'integer', { default: 1, configurable: false })
		.add('answers', 'any', { array: true, configurable: false })
	);

// Permission Levels
LoudClient.defaultPermissionLevels
// Torcedor Hyper
	.add(4, (message) => message.member.roles.has('585898221415563275'))
// Ajudante
	.add(5, (message) => message.member.roles.highest.position >= 27)
// Admin
	.add(6, (message) => message.member.permissions.has('ADMINISTRATOR'));

new LoudClient({
	commandLogging: true,
	fetchAllMembers: true,
	prefix: prefix,
	commandEditing: true,
	typing: false,
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);
