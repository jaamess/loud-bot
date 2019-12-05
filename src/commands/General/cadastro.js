const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

const explanationChannelID = "";
const questions = [];
const MAX_TIME = 1000 * 60 * 5;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: "Muda o idioma do bot no servidor. Pode ser portugues ou ingles."
    });
  }

  async run(message) {
    // First send a message to see if the bot can send messages. This also introduces the bot to the user
    const introduce = await message.author
      .send(
        `Olá, eu sou o LOUD Bot. Vou te guiar durante seu cadastro no LOUDX1. Irei fazer algumas perguntas, responda corretamente, caso contrário a sua inscrição pode ser invalidada.`
      )
      .catch(() => undefined);
    // DMs were blocked
    if (!introduce) {
      // Send a message in the explanation channel on how to enable dms
      const channel = message.guild.channels.get(explanationChannelID);
      if (!channel) return;
      // Send a message to mention the user in this channel to get him to learn how to enable dms
      const alert = await channel.send(message.author).catch(() => undefined);
      // Delete the mention after 5 seconds to prevent spam in this channel
      if (alert) alert.delete({ timeout: 5000 });
      // Cancel out
      return;
    }

    const answers = [];
    const filter = m => m.author.id === message.author.id;

    // DMs are open, begin Q&A
    for (const question of questions) {
      // Ask the user the question
      const asking = await message.author.send(question).catch(() => undefined);
      if (!asking) return;
      // This will wait for the user to respond
      const responses = await message.author.dmChannel
        .awaitMessages(filter, { max: 1, time: MAX_TIME, errors: ["time"] })
        .catch(() => undefined);
      // If no response was given in 5 minutes cancel the survey
      if (!responses || !responses.size) return;

      // An answer was given so we add it to our answers
      answers.push({ question, answer: responses.first().content });
    }

    // If the code reaches here, all questions have been answered by this user
    await message.author.send('Por hoje é só, muito obrigado e boa sorte!').catch(() => undefined)
  }
};
