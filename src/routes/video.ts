import express from 'express';
import path from 'path';
import CameraService from '../cameras';

type CameraArray = {
    id: number;
    title: string;
    stream_url: string;
}

const router = express.Router();

// Rota para pegar URL das streams através do arquivo camera.json
router.get('/api/cameras', (req, res) => {
    const cameraURLs: CameraArray[] = [];
    const cameraService = new CameraService(path.join(__dirname, '../../cameras.json'));

    cameraService.getAllCameras().forEach(camera => {

        // Selecionar cameras favoritas através do ID
        const favCamerasId: string[] = ["738364", "651358", "564625", "809818"];

        if (!favCamerasId.includes(camera.id.toString())) {
            return;
        }

        cameraURLs.push({
            id: camera.id,
            title: camera.title,
            stream_url: camera.stream_url,
        });
    });

    res.json(cameraURLs);
});

export default router;