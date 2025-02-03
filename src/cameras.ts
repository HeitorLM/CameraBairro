import * as fs from 'fs';
import { Camera } from './types.js';

export default class CameraService {
    private cameras: Camera[];

    constructor(filePath: string) {
        const data = fs.readFileSync(filePath, 'utf-8');
        this.cameras = JSON.parse(data);
    }

    getAllCameras(): Camera[] {
        return this.cameras;
    }

    getCameraById(id: number): Camera | undefined {
        return this.cameras.find(camera => camera.id === id);
    }

    getCameraStreamURLById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.stream_url : undefined;
    }

    getCameraLastShotById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.lastShot : undefined;
    }

    getCamerTitleById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.title : undefined;
    }
}
