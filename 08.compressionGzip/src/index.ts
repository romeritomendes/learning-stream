import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import Zlib from 'node:zlib';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.static('public')); // 13,590 kB - 1.31 s

app.get('/normal', (req, res) => {
    res.writeHead(200, {
        "content-type": 'text/html'
    });

    const staticFile = fs.createReadStream('./public/index.html');
    staticFile.pipe(res);//13,592 kB - 3.61 s
});

app.get('/compressed', (req, res) => {
    res.writeHead(200, {
        "content-encoding": 'gzip',
        "content-type": 'text/html'
    });

    const staticFile = fs.createReadStream('./public/index.html');
    staticFile.pipe(Zlib.createGzip()).pipe(res);//60.0 kB - 1.24 s
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});