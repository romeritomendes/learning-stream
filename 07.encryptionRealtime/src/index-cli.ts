import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import { Transform } from 'node:stream';

const PASSWORD = 'meunomeéromerito';
const algorithm = 'aes-256-cbc';

const cripto = () => {
    const key = createHash('sha256').update(PASSWORD).digest(); //Gerante que a chave tenha 32bytes

    const CRIPTO_IV = randomBytes(16);
    const cipher = createCipheriv(algorithm, key, CRIPTO_IV);

    return {
        IV: CRIPTO_IV,
        transfrom: new Transform({
            transform(chunk, encoding, callback) {
                const encrypted = cipher.update(chunk);
                
                callback(null, encrypted);
            },
            flush(callback) {
                const final = cipher.final();
                this.push(final);
                callback();
            }
        })
    }
};

const decripto = (CRIPTO_IV: Buffer) => {
    const key = createHash('sha256').update(PASSWORD).digest(); //Gerante que a chave tenha 32bytes

    const decipher = createDecipheriv(algorithm, key, CRIPTO_IV);

    return new Transform({
        transform(chunk, encoding, callback) {
            const dencrypted = decipher.update(chunk);
            
            callback(null, dencrypted);
        },
        flush(callback) {
            const final = decipher.final();
            if (final && final.length) this.push(final);
            callback();
        }
    });
};

const encryptFile = (origFilePath: string, destFilePath: string) => {
    if(!origFilePath){
        console.error('Orig file path is required.');
        return;
    }
    
    if(!destFilePath) {
        console.error('Dest file path is srequired.');
        return;
    }

    console.log('-------------------------------')
    console.log('Encriptar')
    console.log('-------------------------------')
    console.log('orig: ', origFilePath);
    console.log('dest: ', destFilePath);

    const origFile = fs.createReadStream(origFilePath);
    const destFile = fs.createWriteStream(destFilePath);

    const { IV, transfrom } = cripto();

    destFile.write(IV, err => {
        if(err) {
            console.error('Erro ao escrever IV!');
            return;
        }

        origFile.on('error', (err) => {
            console.error('Error readable: ', err);
            destFile.destroy(err);
        }).pipe(transfrom).on('error', (err) => {
            console.error('Error criptor: ', err);
            destFile.destroy(err);
        })
        .pipe(destFile).on('error', (err) => {
            console.error('Error writable: ', err);
            destFile.destroy(err);
        }).on('finish', () => {
            console.log('Done: ', destFilePath);
            process.exit(0);
        });
    });
}

const dencryptFile = (origFilePath: string, destFilePath: string) => {
    if(!origFilePath){
        console.error('Orig file path is required.');
        return;
    }
    
    if(!destFilePath) {
        console.error('Dest file path is srequired.');
        return;
    }

    console.log('-------------------------------')
    console.log('Decriptar')
    console.log('-------------------------------')
    console.log('orig: ', origFilePath);
    console.log('dest: ', destFilePath);

    const origFile = fs.createReadStream(origFilePath, { start: 16 });
    const origIV = fs.createReadStream(origFilePath, { end: 16 });
    const destFile = fs.createWriteStream(destFilePath);

    let IV: Buffer | null = null;

    origFile.on('data', (chunk) => {
        let rest: Buffer | null = null;
        if(!IV) {
            IV = (chunk as Buffer).subarray(0, 16);
            rest = (chunk as Buffer).subarray(16);

            const transform = decripto(IV);

            if(rest && rest.length > 0)
                transform.write(rest);

            origFile.on('error', (err) => {
                console.error('Error readable: ', err);
                destFile.destroy(err);
            }).pipe(transform).on('error', (err) => {
                console.error('Error decifer: ', err);
                destFile.destroy(err);
            }).pipe(destFile).on('error', (err) => {
                console.error('Error writable: ', err);
                destFile.destroy(err);
            }).on('finish', () => {
                console.log('Done: ', destFilePath);
                process.exit(0); 
            });
        }
    });
}

// if(require.main === module) {
    let origPath = './orig/' + ( process.argv[3] || 'test.txc' ); 
    let destPath = process.argv[3] || 'test.txc'; 
    if(process.argv[2] === '-c') {
        destPath = `./dest/${destPath}.enc`; 
        encryptFile(origPath, destPath);
    } else {
        destPath = './dest/' + destPath.replace('.enc', '');
        dencryptFile(origPath, destPath);
    }
// }
