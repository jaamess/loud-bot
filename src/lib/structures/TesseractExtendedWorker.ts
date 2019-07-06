import { TesseractWorker } from 'tesseract.js';
import { TesseractExtendedJob } from './TesseractExtendedJob';
import check from 'check-types';
import { fork, ChildProcess } from 'child_process';

export class TesseractExtendWorker extends TesseractWorker {

    private _delay(fn): TesseractExtendedJob {
        // @ts-ignore
        if (check.null(this.worker)) {
            // @ts-ignore
            this.worker = this._spawnWorker(this, this.options);
        }

        const job = new TesseractExtendedJob(this);
        // @ts-ignore
        this._queue.push(() => {
            // @ts-ignore
            this._queue.shift();
            // @ts-ignore
            this._currentJob = job;
            fn(job);
        });
        // @ts-ignore
        if (check.null(this._currentJob)) {
            // @ts-ignore
            this.dequeue();
        }
        return job;
    }

    private _spawnWorker(instance, { workerPath }): ChildProcess {
        const cp = fork(workerPath);
        cp.on('message', packet => {
            instance.recv(packet);
        });
        return cp;
    }

}
