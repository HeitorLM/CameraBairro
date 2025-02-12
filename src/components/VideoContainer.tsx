import React from 'react';
import Hls from 'hls.js';

type Camera = {
    id: number;
    title: string;
    thumbnail_url: string;
    stream_url: string;
    status: boolean;
};

type VideoContainerProps = {
    cameras: Camera[];
    selectedCameras: number[];
};

const VideoContainer: React.FC<VideoContainerProps> = ({ cameras, selectedCameras }) => {
    const addCamera = (streamUrl: string, streamTitle: string, index: number) => {
        const video = document.getElementById(`video-${index}`) as HTMLVideoElement;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
    };

    return (
        <div id="video-container">
            {selectedCameras.map(index => {
                const camera = cameras[index];
                return (
                    <div key={camera.id} className="video-wrapper" id={`video-wrapper-${index}`}>
                        <div className="title-wrapper">
                            <h4>{camera.title}</h4>
                            <button onClick={() => addCamera(camera.stream_url, camera.title, index)}>⟳</button>
                        </div>
                        <video id={`video-${index}`} controls width="640" height="360"></video>
                    </div>
                );
            })}
        </div>
    );
};

export default VideoContainer;
