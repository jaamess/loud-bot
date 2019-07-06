import { Command, CommandStore, KlasaMessage, util } from 'klasa';

export default class extends Command {
    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            aliases: ['execute'],
            permissionLevel: 10,
            guarded: true,
            description: 'Executes commands in the terminal',
            usage: '<expression:string>'
        });
    }

    public async run(message: KlasaMessage, input: any): Promise<KlasaMessage | KlasaMessage[]> {
        const result = await util.exec(input, { timeout: `timeout` in message.flags ? Number(message.flags.timeout) : 60000 }).catch(error => ({ stdout: null, stderr: error }));
        const output = result.stdout ? `**\`OUTPUT\`**${util.codeBlock('prolog', result.stdout)}` : '';
        const outerr = result.stderr ? `**\`ERROR\`**${util.codeBlock('prolog', result.stderr)}` : '';

        return message.sendMessage([output, outerr].join('\n'));
    }
}
