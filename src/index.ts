import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import videoRouter from './routes/video';
import cors from 'cors';
import dotenv from "dotenv"



// Configurações de ambiente
dotenv.config({
    path: fileURLToPath(new URL("../.env", import.meta.url)),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const BASE_URL = process.env.VITE_API_BASE_URL || "localhost";
const PORT = process.env.VITE_API_PORT || 5000;

// Use CORS middleware
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(videoRouter);

// Rota para a página inicial
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${BASE_URL}:${PORT}`);
});