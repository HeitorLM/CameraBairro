import React, { useEffect, useState } from 'react';
import { useStreams } from './hooks/useStreams';
import { useHls } from './hooks/useHls';
import VideoWrapper from './components/VideoWrapper';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid'; // Import do novo componente

const App: React.FC = () => {
    const { streams, cameraStatuses } = useStreams();
    const { addCamera, removeCamera } = useHls();
    const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const BASE_URL_YOLO = import.meta.env.VITE_API_BASE_URL_YOLO || 'localhost';
    const API_PORT_YOLO = import.meta.env.VITE_API_PORT_YOLO || '3000';

    const handleCheckboxChange = (index: number, streamUrl: string) => {
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

    const openInNewTab = (streamUrl: string, streamTitle: string) => {
        const newTabUrl = `http://${BASE_URL_YOLO}:${API_PORT_YOLO}/?streamUrl=${encodeURIComponent(streamUrl)}?streamTitle=${encodeURIComponent(streamTitle)}`;
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
            <Sidebar
                isOpen={isSidebarOpen}
                streams={streams}
                cameraStatuses={Object.values(cameraStatuses)}
                selectedCameras={selectedCameras}
                onCheckboxChange={handleCheckboxChange}
            />
            <div id="main-content">
                <h1>KebradaViewer</h1>
                <VideoGrid
                    selectedCameras={selectedCameras}
                    streams={streams}
                    onOpenInNewTab={openInNewTab}
                    onReloadCamera={addCamera}
                    onCloseStream={closeStream}
                />
            </div>
        </div>
    );
};

export default App;