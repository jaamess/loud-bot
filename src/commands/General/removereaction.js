const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      aliases: ['rm'],
      permissionLevel: 6,
      description: 'Remove reações do banco de dados',
      extendedHelp: 'rm <palavra-chave> -> Remove a palavra-chave e a reação associada a ela do banco de dados.',
      usage: '<keyword:string>',
    });
  }

  async run(message, [keyword]) {
    const customReactions = await message.guild.settings.get('customReactions');
    if (!customReactions.keywords.includes(keyword))
      return message.send(
        `<:loudwarning:591525783994892288>  |  A palavra-chave "${keyword}" não existe no banco de dados. Diga \`loud config reacoes\` para visualizar as palavras-chave registradas no momento.`
      );

    const index = await customReactions.keywords.indexOf(keyword);
    // Now we can delete those items from the database using update()
    await message.guild.settings.update([['customReactions.keywords', keyword], ['customReactions.response', customReactions.response[index]]]);
    return message.send(`:white_check_mark:  **|  Feito, a palavra-chave ${keyword} e sua mensagem não existem mais.**`);
  }
};
