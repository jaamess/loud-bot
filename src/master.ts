import { LoudClient } from './lib/structures/LoudClient';
// @ts-ignore
import { prefix, token } from '../ecosystem.config.json';

import './lib/schema/client';
import './lib/schema/guild';
import './lib/schema/permissionLevels';

new LoudClient({
    fetchAllMembers: true,
    prefix: prefix,
    commandEditing: true,
    typing: false,
    readyMessage: client => `[READY] Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);
