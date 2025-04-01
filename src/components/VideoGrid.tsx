import React from 'react';
import VideoWrapper from './VideoWrapper';

interface VideoGridProps {
    selectedCameras: number[];
    streams: { title: string; stream_url: string }[];
    onOpenInNewTab: (streamUrl: string, streamTitle: string) => void;
    onReloadCamera: (streamUrl: string, index: number) => void;
    onCloseStream: (index: number) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ selectedCameras, streams, onOpenInNewTab, onReloadCamera, onCloseStream }) => {
    return (
        <div id="video-container">
            {selectedCameras.map((index) => (
                <VideoWrapper
                    key={index}
                    index={index}
                    title={streams[index].title}
                    streamUrl={streams[index].stream_url}
                    onOpenInNewTab={onOpenInNewTab}
                    onReloadCamera={onReloadCamera}
                    onCloseStream={onCloseStream}
                />
            ))}
        </div>
    );
};

export default VideoGrid;
