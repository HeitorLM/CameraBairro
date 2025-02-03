import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/stream', (req, res) => {
    const videoPath = path.join(__dirname, '../../videofile.mp4');
    res.sendFile(videoPath);
});

export default router;