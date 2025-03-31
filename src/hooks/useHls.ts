import { useRef } from 'react';
import Hls from 'hls.js';

export const useHls = () => {
    const hlsInstances = useRef<(Hls | null)[]>([]);

    const addCamera = (streamUrl: string, index: number) => {
        const video = document.getElementById(`video-${index}`) as HTMLVideoElement;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
            hlsInstances.current[index] = hls;
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
            hlsInstances.current[index] = null;
        }
    };

    const removeCamera = (index: number) => {
        const video = document.getElementById(`video-${index}`) as HTMLVideoElement;
        if (video && hlsInstances.current[index]) {
            hlsInstances.current[index]?.stopLoad();
            hlsInstances.current[index]?.destroy();
            hlsInstances.current[index] = null;

            video.pause();
            video.src = '';
            video.remove();
        }
    };

    return { addCamera, removeCamera };
};
