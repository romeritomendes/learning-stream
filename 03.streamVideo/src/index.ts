import express from 'express';
import cors from 'cors';
import fs from 'node:fs';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('/video', (req, res) => {
    const originFile = fs.createReadStream('../00.resources/videos/Sintel.mp4');

    res.setHeader('Content-Type', 'video/mp4');
    originFile.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});