import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import crypto from 'crypto';
import CameraService from '../cameras';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type CameraArray = {
    id: number;
    title: string;
    thumbnail_url: string;
    stream_url: string;
    status: boolean;
}

const router = express.Router();

const hashCameraTitle = (title: string): string => {
    let crxpto = crypto.createHash('sha256').update(title).digest('hex');
    return crxpto.substring(0, 16);
};

// Rota para pegar URL das streams através do arquivo camera.json
router.get('/api/cameras', (req, res) => {
    const cameraURLs: CameraArray[] = [];
    const cameraService = new CameraService(path.join(__dirname, '../../cameras.json'));

    cameraService.getAllCameras().forEach(camera => {

        cameraURLs.push({
            id: camera.id,
            title: hashCameraTitle(camera.title),
            thumbnail_url: camera.lastShot,
            stream_url: camera.stream_url,
            status: camera.status
        });
    });

    res.json(cameraURLs);
});

export default router;