import { Command, CommandStore, KlasaMessage } from 'klasa';

export default class extends Command {
	public constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      runIn: ['text'],
      aliases: ['ph'],
      permissionLevel: 6,
      description: 'Codigo de convite do GS'
    });
	}

	async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[]> {
		return message.send('https://discord.gg/loudgs');
	}
}
