const { Monitor } = require('klasa');
const Tesseract = require('tesseract.js');
const { TesseractWorker, OEM } = Tesseract;
const worker = new TesseractWorker();

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

  async run(message) {
    /* This code is incomplete and will not be used for now
     * First I'm getting the image url if it exists and feeding it to the OCR software
     * Then I need to filter specific numbers to see what rank the user is
     */
    if (message.channel.id !== '591340583159595028') return;
    const screenshot = message.attachments.map((m) => m.attachment);
    if (!screenshot.length) {
      const response = await message.send(':warning:  |  **Você não enviou uma captura de tela válida para verificar sua patente. Tente novamente.**');
      setTimeout(() => {
        response.delete();
      }, 5000);
      return message.delete(1000);
    }
    return this.parseImage(screenshot);
  }

  parseImage(image) {
    worker
      .recognize('https://tesseract.projectnaptha.com/img/eng_bw.png', 'eng', {
        tessedit_ocr_engine_mode: OEM.TESSERACT_ONLY,
        tessedit_char_whitelist: '0123456789-.',
      })
      .progress((p) => {
        console.log('progress', p);
      })
      .then(({ text }) => {
        console.log(text);
        worker.terminate();
      });
    return;
  }
};
