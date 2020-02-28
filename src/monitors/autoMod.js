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
        const forbiddenWords = ['guilda?', 'guilda'];
        const politicaFutebol = ['vasco', 'bolsonaro', 'lula', 'brasileirão', 'futebol', 'bolsominion', 'petista', 'luladrão', 'salnorabo', 'fluminense'];
        const vendas = ['vendo conta', 'troco conta', 'vende se conta', 'upo contas', 'upo conta'];
        const whatsapp = ['whatsapp', '+55', 'what\'sapp', 'no whats', 'no wpp'];
        // Words from the message
        const words = message.content.toLowerCase().split(' ').slice(0);

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
            return message.reply(`<:loudwarning:591525783994892288>  |  **Vender, trocar e upar contas não é permitido no servidor, obrigado.**`);
        }

        if(whatsapp.some(v => words.includes(v))) {
            message.delete();
            return message.reply(`<:loudwarning:591525783994892288>  |  **Divulgação de números de Whatsapp não é permitida aqui, obrigado.**`);
        }
}

};
