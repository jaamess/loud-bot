const { Monitor } = require('klasa');
module.exports = class extends Monitor {

    constructor(...args) {
         
        super(...args, {
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: false
        });
    }

    async run(message) {
        if(message.channel.id !== '550196743099383818') return;
        if(message.member.permissions.has('ADMINISTRATOR')) return;
        // Forbidden words arrays
        const forbiddenWords = 'guilda';
        const politicaFutebol = ['vasco', 'bolsonaro', 'lula', 'brasileirão', 'futebol', 'bolsominion', 'petista', 'luladrão', 'salnorabo', 'fluminense', ''];
        const vendas = ['vendo conta', 'troco conta'];
        // Words from the message
        const words = message.content.split(' ').slice(0);

        if(words.includes('guilda')) {
            message.delete();
            return message.reply(`<:loudwarning:591525783994892288>  |  **Para divulgar sua guilda, ou encontrar guildas que estejam recrutando, vá em: <#579117494598631424>.**`);
        }

        if(politicaFutebol.some(f => words.includes(f))) {
            message.delete();
            return message.reply(`<:loudwarning:591525783994892288>  |  **Discussões sobre política, futebol e religião não são permitidas! Esses assuntos causam brigas, então evitem comentar sobre.**`);
        }

        if(vendas.some(v => words.includes(v))) {
            message.delete();
            return message.reply(`<:loudwarning:591525783994892288>  |  **Vendas e trocas não são permitidas no servidor, obrigado.**`);
        }
    }

};
