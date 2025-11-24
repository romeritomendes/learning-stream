import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.post('/upload', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});