const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Tesseract = require('tesseract.js');
const { create } = Tesseract;
const worker = new create();

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      name: 'rankVerification',
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true,
      ignoreOthers: false,
      ignoreWebhooks: true,
      ignoreEdits: false,
      ignoreBlacklistedUsers: true,
      ignoreBlacklistedGuilds: true,
    });
  }
  /**
   * @param {import('klasa').KlasaMessage} message
   */
  ////////////////////////////////////////////////////////////////////////
  // Main function
  async run(message) {
    ///////////////////////////
    // Checking if its the right channel and if there's an image attached to it
    if (message.channel.id !== '591524061859807253') return;
    const screenshot = message.attachments.map((m) => m.attachment);
    if (!screenshot.length) {
      if (message.member.roles.highest.position < 28) {
        message.delete();
        const response = await message.send('<:loudwarning:591525783994892288>  |  **Você não enviou uma captura de tela válida para verificar sua patente. Tente novamente.**');
        setTimeout(() => {
          response.delete();
        }, 5000);
      }
      return;
    }
    ///////////////////////////
    /*
     * First, we detect the characters in the image with this.parseImage(), then we get
     * the number we find before the word "top", which is their score, and use it to
     * determine their rank, calling this.parseRank(). After their rank is determined,
     * we react to the image with the appropriate emoji and give that user the appropriate
     * role based on their score and position in the rank. That user can only use this
     * command once, therefore we give them a cooldown of at least 2 days to give them
     * enought time to forget about it.
     */
    const working = await message.send('Verificando patente...');
    const result = await this.parseImage(screenshot);
    const split = result.split(' ');
    const index = split.indexOf('top');
    const score = split[index - 1];
    if (!score) {
      working.delete();
      const errorMessage = await message.channel.send(
        `<:loudwarning:591525783994892288>  **|  Não foi possível verificar sua patente. Verifique se a captura de tela está correta e/ou tente novamente com uma imagem de maior qualidade.**`
      );
      setTimeout(() => {
        errorMessage.delete();
      }, 6500);
      return message.delete();
    }
    // End of optical character recognition
    // Start of rank determination
    const rank = await this.parseRank(parseInt(score));
    console.log(`Detected score: ${score}, and rank: ${rank}`);
    // End of rank determination
    // Now we react to the image with the appropriate emoji
    // Note that these emojis only exist in the server this bot was made for,
    // you should change the IDs in case you use this in a different server.
    const emoji = {
      guild: this.client.guilds.get('550143369184280607'),
      mestre: '591518007105290250',
      diamante: '591518018257813504',
      platina: '591518019315040275',
      ouro: '591518006111109120',
      prata: '591518006056714250',
      bronze: '591518014831067138',
    };
    if (rank.startsWith('Mestre')) message.react(emoji.guild.emojis.get(emoji.mestre));
    else if (rank.startsWith('Diamante')) message.react(emoji.guild.emojis.get(emoji.diamante));
    else if (rank.startsWith('Platina')) message.react(emoji.guild.emojis.get(emoji.platina));
    else if (rank.startsWith('Ouro')) message.react(emoji.guild.emojis.get(emoji.ouro));
    else if (rank.startsWith('Prata')) message.react(emoji.guild.emojis.get(emoji.prata));
    else if (rank.startsWith('Bronze')) message.react(emoji.guild.emojis.get(emoji.bronze));
    // Delete the message that says we're processing the image
    working.delete();
    // Finished reacting to the image
    // Gives the user their role
    return this.giveRole(message, rank);
  }
  /////////////////////////////////////////////////////////////////////////
  // Recognises the characters in the image and converts them to lowercase
  async parseImage(image) {
    const { text } = await worker.recognize(image[0]);
    return text.toLowerCase();
  }
  ////////////////////////////////////////////////////////////////////////
  // Tells us what rank the user is based on their scores
  parseRank(score) {
    let rank = '';

    if (score >= 3200) rank = 'Mestre';
    else if (score >= 3050) rank = 'Diamante VI';
    else if (score >= 2900) rank = 'Diamante III';
    else if (score >= 2750) rank = 'Diamante II';
    else if (score >= 2600) rank = 'Diamante I';
    else if (score >= 2475) rank = 'Platina VI';
    else if (score >= 2350) rank = 'Platina III';
    else if (score >= 2225) rank = 'Platina II';
    else if (score >= 2100) rank = 'Platina I';
    else if (score >= 1975) rank = 'Ouro VI';
    else if (score >= 1850) rank = 'Ouro III';
    else if (score >= 1725) rank = 'Ouro II';
    else if (score >= 1600) rank = 'Ouro I';
    else if (score >= 1500) rank = 'Prata III';
    else if (score >= 1400) rank = 'Prata II';
    else if (score >= 1300) rank = 'Prata I';
    else if (score >= 1200) rank = 'Bronze III';
    else if (score >= 1100) rank = 'Bronze II';
    else if (score >= 1000) rank = 'Bronze I';

    return rank;
  }

  giveRole(message, rank) {
    if (rank.startsWith('Bronze')) return addRole(message, '591514831782412288');
    if (rank.startsWith('Prata')) return addRole(message, '591514826719625218');
    if (rank.startsWith('Ouro')) return addRole(message, '591514820734615562');
    if (rank.startsWith('Platina')) return addRole(message, '591514823733542912');
    if (rank.startsWith('Diamante')) return addRole(message, '591514817228046406');
    if (rank.startsWith('Mestre')) return addRole(message, '591514813872603136');
    /**
     * @param {import('klasa').KlasaMessage} message
     */
    function addRole(message, rank) {
      if (message.guild.me.roles.highest.position < message.guild.roles.get(rank).position) return message.send(`<:loudwarning:591525783994892288>  **|  O meu cargo não é alto o suficiente para realizar esta ação.**`);
      return message.member.roles.add(rank);
    }
  }
};
