import { KlasaClient } from 'klasa';

KlasaClient.defaultClientSchema
    .add('colors', folder => folder.add('LOUD_GREEN', 'string').add('LOUD_BLACK', 'string'))
    .add('images', folder => folder.add('LOUD_LOGO', 'url'))
    .add('reactionRoleMessages', 'string', { array: true });
