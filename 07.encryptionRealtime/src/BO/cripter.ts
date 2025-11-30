import crypto from 'node:crypto';
import { Transform } from 'node:stream';

export class Encryptor {
    algorithm = 'aes-256-cbc';

    constructor() {}

    createKey(password: string): Buffer<ArrayBuffer> {
        return crypto.createHash('sha256').update(password).digest();
    }

    encrypt(password: string): Transform {
        const algorithm = this.algorithm;
        const key = this.createKey(password);

        let cipher: crypto.Decipheriv;
        return new Transform({
            transform(chunk, encoding, callback) {
                if(!cipher) {
                    const IV = crypto.randomBytes(16);
                    cipher = crypto.createCipheriv(algorithm, key, IV);
                    this.push(IV);
                }
                callback(null, cipher.update(chunk));
            },
            flush(callback) {
                const final = cipher.final();
                callback(null, final);
            }
        });
    }

    decrypt(password: string): Transform {
        const algorithm = this.algorithm;
        const key = this.createKey(password);

        let cipher: crypto.Decipheriv;
        return new Transform({
            transform(chunk, encoding, callback) {
                if(!cipher) {
                    const IV = (chunk as Buffer).subarray(0, 16);
                    const rest = (chunk as Buffer).subarray(16);
                    cipher = crypto.createDecipheriv(algorithm, key, IV);

                    callback(null, cipher.update(rest));
                    return;
                }

                callback(null, cipher.update(chunk));
            },
            flush(callback) {
                const final = cipher.final();
                callback(null, final);
            }
        });
    }
}