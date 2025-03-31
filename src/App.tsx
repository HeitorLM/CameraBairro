import React, { useEffect, useState } from 'react';
import { useStreams } from './hooks/useStreams';
import { useHls } from './hooks/useHls';
import CameraItem from './components/CameraItem';
import VideoWrapper from './components/VideoWrapper';

const App: React.FC = () => {

    const { streams, cameraStatuses } = useStreams();
    const { addCamera, removeCamera } = useHls();
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const BASE_URL_YOLO = import.meta.env.VITE_API_BASE_URL_YOLO || 'localhost';
    const API_PORT_YOLO = import.meta.env.VITE_API_PORT_YOLO || '3000';

    const handleCheckboxChange = (index: number, streamUrl: string, streamTitle: string) => {
        setSelectedCameras((prevSelectedCameras) => {
            if (prevSelectedCameras.includes(index)) {
                removeCamera(index);
                return prevSelectedCameras.filter((i) => i !== index);
            } else {
                addCamera(streamUrl, index);
                return [...prevSelectedCameras, index];
            }
        });
    };

    const openInNewTab = (streamUrl: string) => {
        const newTabUrl = `http://${BASE_URL_YOLO}:${API_PORT_YOLO}/?streamUrl=${encodeURIComponent(streamUrl)}`;
        window.open(newTabUrl, '_blank');
    };

    const closeStream = (index: number) => {
        removeCamera(index);
        setSelectedCameras((prevSelectedCameras) => prevSelectedCameras.filter((i) => i !== index));
    };

    useEffect(() => {
        selectedCameras.forEach((index) => {
            const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
            if (!videoElement?.src) {
                addCamera(streams[index].stream_url, index);
            }
        });
    }, [selectedCameras, streams]);

    return (
        <div>
            <button id="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Abrir/Fechar menu lateral">
                {isSidebarOpen ? '◄' : '►'}
            </button>
            <div id="sidebar" className={isSidebarOpen ? '' : 'collapsed'}>
                <h2>Câmeras</h2>
                {streams.map((data: any, index: number) => (
                    <CameraItem
                        key={index}
                        index={index}
                        streamUrl={data.stream_url}
                        title={data.title}
                        thumbnailUrl={data.thumbnail_url}
                        status={data.status}
                        isSelected={selectedCameras.includes(index)}
                        isOnline={cameraStatuses[index]}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
            </div>
            <div id="main-content">
                <h1>KebradaViewer</h1>
                <div id="video-container">
                    {selectedCameras.map((index) => (
                        <VideoWrapper
                            key={index}
                            index={index}
                            title={streams[index].title}
                            streamUrl={streams[index].stream_url}
                            onOpenInNewTab={openInNewTab}
                            onReloadCamera={addCamera}
                            onCloseStream={closeStream}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;