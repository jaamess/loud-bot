import { KlasaClient } from 'klasa';

KlasaClient.defaultGuildSchema
    .add('whitelistedChannels', 'channel', { array: true })
    .add('customReactions', folder => folder.add('keywords', 'string', { array: true }).add('response', 'string', { array: true }));
