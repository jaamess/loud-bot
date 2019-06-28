const { Monitor } = require('klasa');
const { TesseractExtendWorker } = require('../src/lib/structures/TesseractExtendedWorker');
const Cropper = require('../src/lib/util/CanvasCropper');
const worker = new TesseractExtendWorker();

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
			ignoreBlacklistedGuilds: true
		});

		this.NUMBER_REGEX = /[^0-9\s]/gi;
	}
	// //////////////////////////////////////////////////////////////////////
	// Main function
	async run(message) {
		// /////////////////////////
		// Checking if its the right channel and if there's an image attached to it
		const whitelistedChannels = ['591524061859807253', '593496858966360084'];
		if (!whitelistedChannels.includes(message.channel.id)) return;
		const screenshot = message.attachments.map((msg) => msg.attachment);
		if (!screenshot.length) {
			if (message.author.id !== '254808241643585547') {
				message.delete();
				const response = await message.send('<:loudwarning:591525783994892288>  |  **Você não enviou uma captura de tela válida para verificar sua patente. Tente novamente.**');
				setTimeout(() => {
					response.delete();
				}, 5000);
			}
			return;
		}
		// /////////////////////////
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
		console.log(split, { maxArrayLength: null });
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
			console.error(`Erro: Usuario ${message.author.id} (${message.author.username}) - Nao foi possivel obter o score com o print fornecido.`);
			await message.delete();
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
			bronze: '591518014831067138'
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
		// Gives the user their role, after removing their old role.
		const GUILD_LOUD = {
			freeFireRoles: ['591514831782412288', '591514826719625218', '591514820734615562', '591514823733542912', '591514817228046406', '591514813872603136']
		};
		/* const GUILD_FF = {
			freeFireRoles: []
		}; */
		GUILD_LOUD.freeFireRoles.forEach((i) => {
			if (message.member.roles.has(i)) message.member.roles.remove(i);
		});
		this.giveRole(message, rank);
	}
	// ///////////////////////////////////////////////////////////////////////
	// Recognises the characters in the image and converts them to lowercase
	async parseImage(image) {
		const cropped = await Cropper.crop(image[0]);
		let { text } = await worker.recognize(cropped);
		text = text.map((txt) => txt.replace(this.NUMBER_REGEX, ''));
		console.log(text);
		return text.toLowerCase();
	}
	// //////////////////////////////////////////////////////////////////////
	// Tells us what rank the user is based on their scores
	parseRank(score) {
		let rank = '';

		if (score >= 4000) rank = 'Desafiante';
		else if (score >= 3200) rank = 'Mestre';
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
		let role = '';
		const roles = {
			loud: {
				bronze: '591514831782412288',
				prata: '591514826719625218',
				ouro: '591514820734615562',
				platina: '591514823733542912',
				diamante: '591514817228046406',
				mestre: '591514813872603136',
				desafiante: ''
			},
			freeFire: {
				bronze: '593493955497164803',
				prata: '593493954192736286',
				ouro: '593493953303674909',
				platina: '593493952678592659',
				diamante: '593493952678592586',
				mestre: '593493951097602062',
				desafiante: '593493944411619374'
			}
		};
		// We give the right role depending on what guild this code is being executed
		if (message.guild.id === '550143369184280607') role = roles.loud;
		else if (message.guild.id === '593488629993832448') role = roles.freeFire;

		if (rank.startsWith('Bronze')) return this._addRole(message, role.bronze);
		if (rank.startsWith('Prata')) return this._addRole(message, role.prata);
		if (rank.startsWith('Ouro')) return this._addRole(message, role.ouro);
		if (rank.startsWith('Platina')) return this._addRole(message, role.platina);
		if (rank.startsWith('Diamante')) return this._addRole(message, role.diamante);
		if (rank.startsWith('Mestre')) return this._addRole(message, role.mestre);
		if (rank.startsWith('Desafiante')) return this._addRole(message, role.desafiante);
		return null;
	}

	_addRole(message, rank) {
		if (message.guild.me.roles.highest.position < message.guild.roles.get(rank).position) {
			return message.send(`<:loudwarning:591525783994892288>  **|  O meu cargo não é alto o suficiente para realizar esta ação.**`);
		}
		return message.member.roles.add(rank);
	}

};
