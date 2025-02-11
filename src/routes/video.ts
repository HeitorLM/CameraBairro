import express from 'express';
import path from 'path';
import CameraService from '../cameras';

type CameraArray = {
    id: number;
    title: string;
    thumbnail_url: string;
    stream_url: string;
    status: boolean;
}

const router = express.Router();

// Rota para pegar URL das streams através do arquivo camera.json
router.get('/api/cameras', (req, res) => {
    const cameraURLs: CameraArray[] = [];
    const cameraService = new CameraService(path.join(__dirname, '../../cameras.json'));

    cameraService.getAllCameras().forEach(camera => {

        cameraURLs.push({
            id: camera.id,
            title: camera.title,
            thumbnail_url: camera.lastShot,
            stream_url: camera.stream_url,
            status: camera.status
        });
    });

    res.json(cameraURLs);
});

export default router;