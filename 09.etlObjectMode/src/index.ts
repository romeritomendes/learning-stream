import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import { CsvProcessor } from './BO/csvProcess.js';

const uploader = multer({
    dest: './tmp',
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limite
});

const app = express();
app.use(cors());

app.use(express.static('public'));



app.post('/upload', uploader.single('myCSV'),(req, res) => {
    // const tranform = new CsvProcessor().convertCsvToJSON();

    if(!req.file) {
        res.status(300).send({
            message: 'File obligatory!'
        });
        return;
    }

    res.writeHead(200, {
        "content-type": 'application/json'
    });
    
    res.on('finish', () => {
        fs.unlink((req.file?.path as string), err => {
            if(err) console.warn('Temp cleanup failed:', err);
        });
    })

    const origFile = fs.createReadStream(req.file?.path);
    new CsvProcessor({
        file: origFile,
        separated: ',',
        newline: '\r\n'
    }).convertCsvToJSON().pipe(res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));