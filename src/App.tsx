import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';

const App: React.FC = () => {
    interface Stream {
        stream_url: string;
        title: string;
        thumbnail_url: string;
        status: boolean;
    }

    const [streams, setStreams] = useState<Stream[]>([]);
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'localhost';
    const API_PORT = import.meta.env.VITE_API_PORT || '5001';

    useEffect(() => {
        const fetchStreams = async () => {
            const resp = await fetch(`http://${BASE_URL}:${API_PORT}/api/cameras`);
            if (resp.status === 200) {
                const data = await resp.json();
                setStreams(data);
            } else {
                alert('Nenhuma câmera disponível');
            }
        };
        fetchStreams();
    }, []);

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

    const removeCamera = (index: number) => {
        const video = document.getElementById(`video-${index}`) as HTMLVideoElement;
        if (video) {
            video.pause();
            video.src = '';
            video.load();
        }
    };

    const handleCheckboxChange = (index: number, streamUrl: string, streamTitle: string) => {
        setSelectedCameras((prevSelectedCameras) => {
            if (prevSelectedCameras.includes(index)) {
                removeCamera(index);
                return prevSelectedCameras.filter((i) => i !== index);
            } else {
                addCamera(streamUrl, streamTitle, index);
                return [...prevSelectedCameras, index];
            }
        });
    };

    useEffect(() => {
        selectedCameras.forEach((index) => {
            const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
            if (!videoElement?.src) {
                addCamera(streams[index].stream_url, streams[index].title, index);
            }
        });
    }, [selectedCameras, streams]);

    return (
        <div>
            <div id="sidebar">
                <h2>Câmeras</h2>
                {streams.map((data: any, index: number) => (
                    <div key={index} className="camera-item">
                        <input
                            type="checkbox"
                            disabled={!data.status}
                            checked={selectedCameras.includes(index)}
                            onChange={() => handleCheckboxChange(index, data.stream_url, data.title)}
                        />
                        <img src={data.thumbnail_url} alt={data.title} />
                        <span>{data.title}</span>
                    </div>
                ))}
            </div>
            <div id="main-content">
                <h1>KebradaViewer</h1>
                <div id="video-container">
                    {selectedCameras.map((index) => (
                        <div key={index} className="video-wrapper" id={`video-wrapper-${index}`}>
                            <div className="title-wrapper">
                                <h4>{streams[index].title}</h4>
                                <button onClick={() => addCamera(streams[index].stream_url, streams[index].title, index)}>⟳</button>
                            </div>
                            <video id={`video-${index}`} controls width="640" height="360"></video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
