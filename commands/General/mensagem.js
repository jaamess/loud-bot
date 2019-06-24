const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 6,
      description: 'Permite que o administrador defina as palavras-chave que farão com que o bot responda com uma mensagem customizada.',
      extendedHelp: 'Para definir os canais que o bot irá responder caso alguém diga uma palavra-chave, utilize o comando "reaction".',
      usage: '<palavra-chave:string> <response:...string>',
      usageDelim: ' ',
    });
  }

  async run(message, [keyword, response]) {
    message.send(`Under development`);
  }
};
