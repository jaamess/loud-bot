import { KlasaClient } from 'klasa';

KlasaClient.defaultPermissionLevels
// Torcedor Hyper
    .add(4, message => message.member.roles.has('585898221415563275'))
// Ajudante
    .add(5, message => message.member.roles.highest.position >= 20)
// Admin
    .add(6, message => message.member.permissions.has('ADMINISTRATOR'));
