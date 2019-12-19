const { Command } = require('klasa');

const explanationChannelID = '641474449228693526';
const questions = [
	`Para começar, qual é o seu nome completo?`,
	`E a sua idade?`,
	`Digite agora apenas os números do seu RG, sem traços ou pontos.`,
	`O email que você mais verifica.`,
	`O nickname que você usa no Free Fire. O meu, por exemplo, é LOUD Bot.`,
	`O seu GAME ID no Free Fire. Aquele número na aba "Galeria", embaixo do seu nickname e level. Se estiver no seu celular você consegue até pra copiar ele.`,
	`Qual seu Ranking atual?`,
	`Você é Brasileiro mesmo? SIM ou NÃO`,
	`E mora em que estado?`,
	`E a cidade?`,
	`Você já trabalhou? Onde?`,
	`Você está estudando?`,
	`Você já criou algum conteúdo antes ou participou de alguma competição oficial?`,
	`Quais idiomas você fala?`,
	`Nos diga 3 qualidades e 3 fraquezas suas`,
	`Você pode se mudar para a casa da LOUD caso seja necessário?`,
	`Qual o seu Twitter? (Caso não tenha, digitar "-")`,
	`Qual o seu Instagram? (Caso não tenha, digitar "-")`,
	`Qual o seu Facebook? (Caso não tenha, digitar "-")`,
	`Qual o seu canal de Youtube? (Caso não tenha, digitar "-")`,
	`Qual o seu canal de Streams? (Caso não tenha, digitar "-")`
];

const MAX_TIME = 1000 * 60 * 5;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Muda o idioma do bot no servidor. Pode ser portugues ou ingles.',
			runIn: ['text']
		});
	}

	async run(message) {
		const { settings } = message.author;
		if (settings.surveyAnswers.length) {
			message.author.send('You have already completed a survey.').catch(() => undefined);
			return;
		}
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
			const alert = await channel.send(`${message.author}`).catch(() => undefined);
			// Delete the mention after 5 seconds to prevent spam in this channel
			if (alert) alert.delete({ timeout: 5000 });
			// Cancel out
			return;
		}

		const answers = [{ question: 'User Tag', answer: message.author.tag }, { question: 'User ID', answer: message.author.id }];
		const filter = msg => msg.author.id === message.author.id;

		// DMs are open, begin Q&A
		for (const question of questions) {
			// Ask the user the question
			const asking = await message.author.send(question).catch(() => undefined);
			if (!asking) return;
			// This will wait for the user to respond
			const responses = await message.author.dmChannel
				.awaitMessages(filter, { max: 1, time: MAX_TIME, errors: ['time'] })
				.catch(() => undefined);
			// If no response was given in 5 minutes cancel the survey
			if (!responses || !responses.size) return;

			// An answer was given so we add it to our answers
			answers.push({ question, answer: responses.first().content });
		}

		// If the code reaches here, all questions have been answered by this user
		await message.author
			.send(
				'Agora, para finalizar, precisamos que você nos mande um vídeo de até 30 segundos nos contando por que devemos escolher você para particidar do campeonato e ser o próximo membro da LOUD. Pode enviar para o Youtube, Instagram, Twitter ou Facebook. Se ainda não tiver o vídeo, tudo bem pode enviar depois com o comando !video. Se já tiver agora, é só colar o link aqui!'
			)
			.catch(() => undefined);

		// Save all the answers into the users database.
		message.author.settings.update('surveyAnswers', answers);
	}

};
