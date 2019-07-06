import Util from '../util/Util';

let jobCounter = 0;

export interface Packet {
    image: Buffer | string;
    langs: string;
    params: any;
    options: any;
}

export class TesseractExtendedJob {

    public id: string;

    private _worker: TesseractExtendWorker;

    private _resolve: any[];
    private _reject: any[];
    private _progress: any[];
    private _finally: any[];

    public constructor(worker: TesseractExtendWorker) {
        jobCounter += 1;
        this.id = `Job-${jobCounter}-${Math.random().toString(16).slice(3, 8)}`;

        this._worker = worker;

        this._resolve = [];
        this._reject = [];
        this._progress = [];
        this._finally = [];
    }

    public then(resolve: Function, reject: Function): TesseractExtendedJob {
        if (this._resolve.push) {
            this._resolve.push(resolve);
        } else {
            resolve(this._resolve);
        }

        if (reject) this.catch(reject);
        return this;
    }

    public catch(reject: Function): TesseractExtendedJob {
        if (this._reject.push) {
            this._reject.push(reject);
        } else {
            reject(this._reject);
        }
        return this;
    }

    public progress(fn: Function): TesseractExtendedJob {
        this._progress.push(fn);
        return this;
    }

    public finally(fn: Function): TesseractExtendedJob {
        this._finally.push(fn);
        return this;
    }

    public send(action: string, payload: Packet): void {
        this._sendPacket(this._worker, {
            jobId: this.id,
            action,
            payload
        });
    }

    public handle(packet: any): void {
        const { data } = packet;
        let runFinallyCbs = false;

        if (packet.status === 'resolve') {
            if (this._resolve.length === 0) console.log(data);
            this._resolve.forEach(fn => {
                const ret = fn(data);
                if (ret && typeof ret.then === 'function') {
                    console.warn('TesseractJob instances do not chain like ES6 Promises. To convert it into a real promise, use Promise.resolve.');
                }
            });
            this._resolve = data;
            // @ts-ignore
            this._worker.dequeue();
            runFinallyCbs = true;
        } else if (packet.status === 'reject') {
            if (this._reject.length === 0) console.error(data);
            this._reject.forEach(fn => fn(data));
            this._reject = data;
            // @ts-ignore
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

    private _sendPacket(instance, iPacket): void {
        const packet = { ...iPacket };
        Util.parseImage(packet.payload.image)
            .then(buf => new Uint8Array(buf))
            .then(img => {
                packet.payload.image = Array.from(img);
                instance.worker.send(packet);
            })
            .catch(() => null);
    }

}

import { TesseractExtendWorker } from './TesseractExtendedWorker';
