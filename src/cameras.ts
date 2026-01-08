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
        return camera ? camera.live_url : undefined;
    }

    getCameraLastShotById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.thumb_url : undefined;
    }

    getCameraTitleById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.description : undefined;
    }

    getCameraLatLongById(id: number): string | undefined {
        const camera = this.getCameraById(id);
        return camera ? camera.latitude + camera.longitude : undefined;
    }
}
