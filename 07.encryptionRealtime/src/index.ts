import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import { Encryptor } from './BO/cripter.js';
import { Transform } from 'node:stream';

const app = express();
const upload = multer({
    dest: './tmp',
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limite
});
const cripter = new Encryptor();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.static('./public'));

app.post('/encrypt', upload.single('secret'), (req, res) => {
    if(!req.file) return res.status(400).send('Secret file is required!');
    
    console.log('msg: ', req.body)

    const fileStream = fs.createReadStream(req.file.path);
    // const destStream = fs.createWriteStream(`./dest/${req.file.filename}.enc`);

    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${req.file.originalname}.enc"`
    });
    fileStream.pipe(cripter.encrypt(req.body.decMessage)).pipe(res);

    res.on('finish', () => {
        fs.unlink((req.file?.path as string), err => {
            if(err) console.warn('Temp cleanup failed:', err);
        });
    });
});

app.post('/decrypt', upload.single('secret'), (req, res) => {
    if(!req.file) return res.status(400).send('Secret file is required!');
    
    res.on('finish', () => {
        fs.unlink((req.file?.path as string), err => {
            if(err) console.warn('Temp cleanup failed:', err);
        });
        console.log('FIM REAL')
    });

    const fileStream = fs.createReadStream(req.file.path);
    const transform = cripter.decrypt(req.body.encMessage);

    transform.on('error', err => {
        console.error('Decrypt error:', err);
        fileStream.destroy();
        res.status(400).send('Decrypt error: wrong password!');
    });

    fileStream.on('data', chunk => {
        const testTransform = cripter.decrypt(req.body.encMessage);
        testTransform.on('error', err => {
            console.error(`Cryptor Error:`, err);
            fileStream.destroy(err);
            testTransform.destroy(err);
            res.status(400).send('Decrypt error: wrong password!');
        });

        let hasChunk = 0;
        testTransform.on('data', () => {
            if(!res.headersSent && hasChunk === 1) {
                console.log('Write HEADER Download!');
                res.writeHead(200, {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': `attachment; filename="${req.file?.originalname?.replace('.enc', '.dec')}"`
                });
                transform.write(chunk);
                fileStream.pipe(transform).pipe(res);
            }
            hasChunk++;
        });

        testTransform.write(chunk);
        testTransform.end();
    });

    console.log('FIM')
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
