import { useState, useEffect } from 'react';
import { Stream, CameraStatuses } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT || '5001';

export const useStreams = () => {
    const [streams, setStreams] = useState<Stream[]>([]);
    const [cameraStatuses, setCameraStatuses] = useState<CameraStatuses>({});

    const pingCamera = async (url: string, index: number) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            setCameraStatuses(prev => ({ ...prev, [index]: response.ok }));
        } catch {
            setCameraStatuses(prev => ({ ...prev, [index]: false }));
        }
    };

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const resp = await fetch(`http://${BASE_URL}:${API_PORT}/api/cameras`);
                if (resp.ok) {
                    const data = await resp.json();
                    setStreams(data);
                } else {
                    console.error('Nenhuma câmera disponível');
                }
            } catch (error) {
                console.error('Erro ao buscar câmeras:', error);
            }
        };
        fetchStreams();
    }, []);

    useEffect(() => {
        streams.forEach((stream, index) => {
            pingCamera(stream.stream_url, index);
        });
    }, [streams]);

    return { streams, cameraStatuses, pingCamera };
};