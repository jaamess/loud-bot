const Util = require('../util/Util');

let jobCounter = 0;

class TesseractExtendedJob {

	constructor(worker) {
		jobCounter += 1;
		this.id = `Job-${jobCounter}-${Math.random().toString(16).slice(3, 8)}`;

		this._worker = worker;

		this._resolve = [];
		this._reject = [];
		this._progress = [];
		this._finally = [];
	}

	then(resolve, reject) {
		if (this._resolve.push) {
			this._resolve.push(resolve);
		} else {
			resolve(this._resolve);
		}

		if (reject) this.catch(reject);
		return this;
	}

	catch(reject) {
		if (this._reject.push) {
			this._reject.push(reject);
		} else {
			reject(this._reject);
		}
		return this;
	}

	progress(fn) {
		this._progress.push(fn);
		return this;
	}

	finally(fn) {
		this._finally.push(fn);
		return this;
	}

	send(action, payload) {
		this._sendPacket(this._worker, {
			jobId: this.id,
			action,
			payload
		});
	}

	handle(packet) {
		const { data } = packet;
		let runFinallyCbs = false;

		if (packet.status === 'resolve') {
			if (this._resolve.length === 0) console.log(data);
			this._resolve.forEach((fn) => {
				const ret = fn(data);
				if (ret && typeof ret.then === 'function') {
					console.warn('TesseractJob instances do not chain like ES6 Promises. To convert it into a real promise, use Promise.resolve.');
				}
			});
			this._resolve = data;
			this._worker.dequeue();
			runFinallyCbs = true;
		} else if (packet.status === 'reject') {
			if (this._reject.length === 0) console.error(data);
			this._reject.forEach(fn => fn(data));
			this._reject = data;
			this._worker.dequeue();
			runFinallyCbs = true;
		} else if (packet.status === 'progress') {
			this._progress.forEach(fn => fn(data));
		} else {
			console.warn('Message type unknown', packet.status);
		}

		if (runFinallyCbs) {
			this._finally.forEach(fn => fn(data));
		}
	}

	_sendPacket(instance, iPacket) {
		const packet = { ...iPacket };
		Util.parseImage(packet.payload.image)
			.then((buf) => new Uint8Array(buf))
			.then((img) => {
				packet.payload.image = Array.from(img);
				instance.worker.send(packet);
			});
	}

}

module.exports = TesseractExtendedJob;
