import express from 'express';
import cors from 'cors';
import fs from 'node:fs';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    console.log('body', req);

    const destfile = fs.createWriteStream('./destination/file.txt');

    req.pipe(destfile);

    res.send({ message: 'File uploaded successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});