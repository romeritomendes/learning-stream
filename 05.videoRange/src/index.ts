import express from 'express';
import cors from 'cors';
import fs from 'node:fs';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.static('public'));

const VIDEO_PATH = '../00.resources/videos/Sintel.mp4';
const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB

app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        return res.status(416).send('Range header required!');
    }

    const videoStat = fs.statSync(VIDEO_PATH);

    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0] || '0', 10);
    let end = parts[1] ? parseInt(parts[1], 10) : start + CHUNK_SIZE - 1;
    if(end >= videoStat.size)
        end = videoStat.size - 1

    const chunkSize = (end - start) + 1;

    console.log('start: ', start)
    console.log('end: ', end)
    console.log('chunkSize: ', chunkSize)
    console.log('----------------------------------------------')

    res.status(206);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', chunkSize);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${videoStat.size}`);

    const originFile = fs.createReadStream(VIDEO_PATH, { start, end });
    originFile.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});