import { Client } from 'klasa';
import { ClientSettings } from '../types/settings';

export class LoudClient extends Client {
    public settings!: ClientSettings;
}
