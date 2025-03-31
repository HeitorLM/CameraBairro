import React from 'react';

interface VideoWrapperProps {
    index: number;
    title: string;
    streamUrl: string;
    onOpenInNewTab: (streamUrl: string) => void;
    onReloadCamera: (streamUrl: string, index: number) => void;
    onCloseStream: (index: number) => void;
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({
    index,
    title,
    streamUrl,
    onOpenInNewTab,
    onReloadCamera,
    onCloseStream
}) => {
    return (
        <div className="video-wrapper" id={`video-wrapper-${index}`}>
            <div className="title-wrapper">
                <h4>{title}</h4>
                <button onClick={() => onOpenInNewTab(streamUrl)} aria-label="Abrir YOLO em nova aba" title="Abrir YOLO em nova aba">👁️‍🗨️</button>
                <button onClick={() => onReloadCamera(streamUrl, index)} aria-label="Recarregar câmera" title="Recarregar câmera">🔄</button>
                <button onClick={() => onCloseStream(index)} aria-label="Fechar câmera" title="Fechar câmera">❌</button>
            </div>
            <video id={`video-${index}`} controls width="640" height="360"></video>
        </div>
    );
};

export default VideoWrapper;
