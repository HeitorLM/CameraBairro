
import React from 'react';

type Camera = {
    id: number;
    title: string;
    thumbnail_url: string;
    stream_url: string;
    status: boolean;
};

type CameraListProps = {
    cameras: Camera[];
    selectedCameras: number[];
    onSelectCamera: (index: number) => void;
    onDeselectCamera: (index: number) => void;
};

const CameraList: React.FC<CameraListProps> = ({ cameras, selectedCameras, onSelectCamera, onDeselectCamera }) => {
    return (
        <div id="sidebar">
            <h2>Câmeras</h2>
            {cameras.map((camera, index) => (
                <div key={camera.id} className="camera-item">
                    <input
                        type="checkbox"
                        checked={selectedCameras.includes(index)}
                        disabled={!camera.status}
                        onChange={() => {
                            if (selectedCameras.includes(index)) {
                                onDeselectCamera(index);
                            } else {
                                onSelectCamera(index);
                            }
                        }}
                    />
                    <img src={camera.thumbnail_url} alt={camera.title} />
                    <span>{camera.title}</span>
                </div>
            ))}
        </div>
    );
};

export default CameraList;