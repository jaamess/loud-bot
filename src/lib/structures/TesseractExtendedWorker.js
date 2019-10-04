const { TesseractWorker } = require('tesseract.js');
const TesseractExtendedJob = require('./TesseractExtendedJob');
const check = require('check-types');
const { fork } = require('child_process');

class TesseractExtendWorker extends TesseractWorker {

	_delay(fn) {
		if (check.null(this.worker)) {
			this.worker = this._spawnWorker(this, this.options);
		}

		const job = new TesseractExtendedJob(this);
		this._queue.push(() => {
			this._queue.shift();
			this._currentJob = job;
			fn(job);
		});
		if (check.null(this._currentJob)) {
			this.dequeue();
		}
		return job;
	}

	_spawnWorker(instance, { workerPath }) {
		const cp = fork(workerPath);
		cp.on('message', (packet) => {
			instance.recv(packet);
		});
		return cp;
	}

}

module.exports = {
	TesseractExtendWorker
};
