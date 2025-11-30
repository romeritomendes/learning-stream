import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import { Encryptor } from './BO/cripter.js';

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
    
    const fileStream = fs.createReadStream(req.file.path);
    // const destStream = fs.createWriteStream(`./dest/${req.file.filename}.dec`);

    res.writeHead(200, {
        "content-type": "application/octet-stream",
        "content-disposition": `attachment; filename="${req.file.originalname}.dec"`
    });
    fileStream.pipe(cripter.decrypt(req.body.encMessage)).pipe(res);

    res.on('finish', () => {
        fs.unlink((req.file?.path as string), err => {
            if(err) console.warn('Temp cleanup failed:', err);
        })
    })
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});