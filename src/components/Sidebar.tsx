import React from 'react';
import CameraItem from './CameraItem';

interface SidebarProps {
    isOpen: boolean;
    streams: any[];
    cameraStatuses: boolean[];
    selectedCameras: number[];
    onCheckboxChange: (index: number, streamUrl: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, streams, cameraStatuses, selectedCameras, onCheckboxChange }) => {
    return (
        <div id="sidebar" className={isOpen ? '' : 'collapsed'}>
            <h2>Câmeras</h2>
            {streams.map((data, index) => (
                <CameraItem
                    key={index}
                    index={index}
                    streamUrl={data.stream_url}
                    title={data.title}
                    thumbnailUrl={data.thumbnail_url}
                    status={data.status}
                    isSelected={selectedCameras.includes(index)}
                    isOnline={cameraStatuses[index]}
                    onCheckboxChange={onCheckboxChange}
                />
            ))}
        </div>
    );
};

export default Sidebar;
