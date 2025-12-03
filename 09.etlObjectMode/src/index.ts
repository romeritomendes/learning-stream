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

    const origFile = fs.createReadStream(req.file?.path);
    new CsvProcessor({
        file: origFile
    }).pipe(res);
    origFile.pipe(tranform).pipe(res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));