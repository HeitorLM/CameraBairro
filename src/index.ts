import express from 'express';
import path from 'path';
import videoRouter from './routes/video';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(videoRouter);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});