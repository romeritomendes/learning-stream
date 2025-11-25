import express from 'express';
import cors from 'cors';
import { pipeline, Transform } from 'node:stream'
import fs from 'node:fs';
import Zlib from 'node:zlib';

const app = express();
app.use(cors());
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;

app.post('/pipe', (req, res) => {
    const toUpper = new Transform({
        decodeStrings: false,
        transform(chunk, encoding, callback) {
            console.log(chunk.toString())
            const upperText = chunk.toString().toUpperCase();
            callback(null, Buffer.from(upperText));
        }
    });
    req.pipe(toUpper).pipe(res).on('finish', () => res.end());
});

// Demonstração 2: Transformação em tempo real
// Crie endpoint `/transform` que recebe dados binários via req.pipe(), aplica compressão (usando Zlib), e retorna via res.
app.post('/transform', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        // 'Content-Encoding': 'gzip'
        "Content-Disposition": 'attachment; filename="output.gz"'
    });
    // req.pipe(Zlib.createGzip()).pipe(res).on('finish', () => res.end());
    pipeline(req, Zlib.createGzip(), res, (err) => {
        if(err) {
            console.error('Erro: ', err);
            process.exitCode = 1;
        }

        res.end();
    })
});

// Demonstração 3: Integração com outros streams
//- Crie endpoint `/integrate` que combina req com fs stream (ex: anexa dados recebidos a um arquivo existente).
//- Ou `/merge` que mescla req com outro Readable stream do sistema.
app.post('/merge', (req, res) => {
    const origFile = fs.createWriteStream('./tmp/test.txt', {
        flags: 'a'
    });

    req.pipe(origFile).on('finish', () => {
        origFile.close();
        res.status(200).send('Successo').end()
    });
});

//TODO Demonstração 4: Processamento de corpos multipart com múltiplos campos
// Crie endpoint `/multi` que recebe multipart/form-data com múltiplos campos (texto e arquivo), processa cada tipo usando streams, e retorna os dados processados via res.
app.post('/multi', (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
