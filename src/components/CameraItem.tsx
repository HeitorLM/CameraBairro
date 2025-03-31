import React from 'react';

interface CameraItemProps {
    index: number;
    streamUrl: string;
    title: string;
    thumbnailUrl: string;
    status: boolean;
    isSelected: boolean;
    isOnline: boolean;
    onCheckboxChange: (index: number, streamUrl: string, streamTitle: string) => void;
}

const CameraItem: React.FC<CameraItemProps> = ({
    index,
    streamUrl,
    title,
    thumbnailUrl,
    status,
    isSelected,
    isOnline,
    onCheckboxChange,
}) => {
    return (
        <div
            className="camera-item"
            onClick={() => onCheckboxChange(index, streamUrl, title)}
        >
            <input
                type="checkbox"
                disabled={!status}
                checked={isSelected}
                onChange={(e) => e.stopPropagation()} // Evita que o clique no checkbox dispare o evento do container
                aria-label={`Selecionar câmera ${title}`}
            />
            <img src={thumbnailUrl} alt={title} />
            <span>{title}</span>
            <span
                className={`camera-status ${isOnline ? 'online' : 'offline'}`}
                title={isOnline ? 'Câmera online' : 'Câmera offline'}
            >
                {isOnline ? '🟢' : '🔴'}
            </span>
        </div>
    );
};

export default CameraItem;
