import express from 'express';
import cors from 'cors';
import multer from 'multer';

const upload = multer({
    dest: 'tmp/'
});

const app = express();
app.use(cors());

app.use('/form', express.static('public'));

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    console.log(`filename:`, req.file?.originalname);
    console.log(`body:`, req.body);

    console.log('headers', req.headers);
    console.log('content-type', req.headers['content-type']);
    
    res.send({ message: 'File uploaded successfully' });
});

app.post('/upload', upload.single('fs01'), (req, res) => {
    console.log(`filename:`, req.file?.originalname);
    console.log(`body:`, req.body);

    console.log('headers', req.headers);
    console.log('content-type', req.headers['content-type']);

    res.send({ message: 'File uploaded successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
