import { Settings, SettingsFolder } from 'klasa';
import { Channel } from 'discord.js';

declare interface SchemaBase<T> {
    [K: string]: T;
}

export interface GuildSettings extends Settings {
    get<K extends keyof GuildSettingsSchema>(key: K): GuildSettingsSchema[K];
}

export interface GuildSettingsSchema {
    'whitelistedChannels': string[];
    'customReactions': CustomReactions;
    'language': string;
    'prefix': string;
}

export interface CustomReactions extends SettingsFolder {
    get<K extends keyof CustomReactionsSchema>(key: K): CustomReactionsSchema[K];
    toJSON(): CustomReactionsSchema;
}

export interface CustomReactionsSchema extends SchemaBase<string[]> {
    keywords: string[];
    response: string[];
}

export interface ClientSettings extends Settings {
    get<K extends keyof ClientSettingsScema>(key: K): ClientSettingsScema[K];
}

export interface ClientSettingsScema {
    'colors': Colors;
    'images': Images;
    'reactionRoleMessages': string[];
}

export interface Colors extends SettingsFolder {
    get<K extends keyof ColorsSchema>(key: K): ColorsSchema[K];
    toJSON(): ColorsSchema;
}

export interface ColorsSchema extends SchemaBase<string> {
    LOUD_GREEN: string;
    LOUD_BLACK: string;
}

export interface Images extends SettingsFolder {
    get<K extends keyof ImagesSchema>(key: K): ImagesSchema[K];
    toJSON(): ImagesSchema;
}

export interface ImagesSchema extends SchemaBase<string> {
    LOUD_LOGO: string;
}
