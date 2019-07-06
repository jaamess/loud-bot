import { KlasaClient } from 'klasa';
import { prefix, token } from '../ecosystem.config.json';

import './lib/schema/client';
import './lib/schema/guild';
import './lib/schema/permissionLevels';

new KlasaClient({
    fetchAllMembers: true,
    prefix: prefix,
    commandEditing: true,
    typing: false,
    readyMessage: client => `[READY] Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);
