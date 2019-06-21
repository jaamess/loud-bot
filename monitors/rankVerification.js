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
    if (message.channel.id !== '591340583159595028') return;
    const screenshot = message.attachments.map((m) => m.attachment);
    if (!screenshot.length) {
      const response = await message.send(':warning:  |  **Você não enviou uma captura de tela válida para verificar sua patente. Tente novamente.**');
      setTimeout(() => {
        response.delete();
      }, 5000);
      return message.delete();
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
    if (!score) return message.react(`❌`);
    // End of optical character recognition
    // Start of rank determination
    const rank = await this.parseRank(parseInt(score));
    console.log(`Detected score: ${score}, and rank: ${rank}`);
    // End of rank determination
    // Now we react to the image with the appropriate emoji
    // Note that these emojis only exist in the server this bot was made for,
    // you should change the IDs in case you use this in a different server.
    const emoji = {
      mestre: '591340535164436480',
      diamante: '591340533235056640',
      platina: '591498756780720148',
      ouro: '591340532911833105',
      prata: '591340534379970590',
      bronze: '591340532882472961',
    };
    if (rank.startsWith('Mestre')) message.react(message.guild.emojis.get(emoji.mestre));
    if (rank.startsWith('Diamante')) message.react(message.guild.emojis.get(emoji.diamante));
    if (rank.startsWith('Platina')) message.react(message.guild.emojis.get(emoji.platina));
    if (rank.startsWith('Ouro')) message.react(message.guild.emojis.get(emoji.ouro));
    if (rank.startsWith('Prata')) message.react(message.guild.emojis.get(emoji.prata));
    if (rank.startsWith('Bronze')) message.react(message.guild.emojis.get(emoji.bronze));
    working.delete();
    // Finished reacting to the image
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

  giveRole(message) {
    //
  }
};
