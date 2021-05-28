const { Command } = require('klasa');

const questions = [
	`User Tag`,
	`User ID`,
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
	`Qual o seu canal de Streams? (Caso não tenha, digitar "-")`,
	`To end this, we need you to send us a 30-45 second video telling why we should pick you to participate in the tournament and to become the next LOUD member. Can be through Youtube, Instgram, Twitter, or Facebook. If you don't have it yet, don't you worry, you can send it later using the code !video and the link, like this: !video www.youtube.com/XXXXX. If you don't have the video yet, just hit enter.`
];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Export the survey answers to a csv file.',
			permissionLevel: 6
		});
	}

	async run(message) {
		// Fetch all the users that have custom settings
		const userSettings = await this.client.providers.default.getAll('users');
		if (!userSettings || !userSettings.length) return;

		const csvArray = [questions.join(` ; `)];

		for (const settings of userSettings) {
			// Check if this survey was already exported
			// if (settings.surveyExported) continue;
			// If they don't have survey filled skip em. 24 answers means already gave a video url
			if (!settings.surveyAnswers || !settings.surveyAnswers.length) continue;

			const user = this.client.users.get(settings.id);
			if (!user) continue;
			console.log(settings.surveyAnswers);
			csvArray.push(settings.surveyAnswers.map(a => a.answer).join(' ; '));

			user.settings.update('surveyExported', true);
		}

		console.log(csvArray);
		if (csvArray.length < 2) {
			message.channel.send("You don't have any non-exported surveys at this time.");
			return;
		}

		message.channel.sendFile(Buffer.from(csvArray.join(`\n`)), 'survey.csv', 'James is the best!');
	}

};
