export interface Camera {
    id: number;
    title: string;
    latitude: string;
    longitude: string;
    isOnServerFarm: boolean;
    stream_name: string;
    slug: string;
    UserId: number;
    status: boolean;
    created_at: string;
    createdAt: string;
    stream_server: string | null;
    must_initialize: boolean;
    is_p2p: boolean;
    factory: string;
    p2p_login: string | null;
    p2p_pass: string | null;
    is_webrtc: boolean;
    views: number;
    views_mobile: number;
    lastShot: string;
    stream_url: string;
    webrtc_data: string;
    District: {
        id: number;
        name: string;
        City: {
            id: number;
            name: string;
            slug: string;
            State: {
                id: number;
                name: string;
                slug: string;
                Country: {
                    id: number;
                    name: string;
                    slug: string;
                }
            }
        }
    };
    Plan: {
        id: number;
        name: string;
        slug: string;
    };
    Server: string | null;
    CameraConfig: {
        id: number;
        rtsp_address: string;
        port: number;
        vip: boolean;
        sound: boolean;
        public: boolean;
        private: boolean;
        camera_type: number;
        allow_embed: boolean;
        alert_updown: boolean;
        alert_updown_interval: number;
        alert_updown_interval_online: number;
        last_offline: number | null;
        sigma_integ_last_offline: number | null;
        sigma_integ_last_online: number | null;
        last_online: number | null;
        sigma_integ_id_central: number | null;
        sigma_integ_empresa: number | null;
        sigma_integ_particao: number | null;
        sigma_integ_alert_timeout_on: number;
        sigma_integ_alert_timeout_off: number;
        sigma_integ_pending_alert_on: boolean;
        sigma_integ_auxiliar: string | null;
        ptz: boolean;
        http_address: string | null;
        camera_username: string | null;
        camera_password: string | null;
        moni_integ_central: string | null;
        moni_integ_empresa: string | null;
        moni_integ_particao: string | null;
        moni_integ_auxiliar: string | null;
        moni_integ_online: string | null;
        moni_integ_offline: string | null;
        moni_integ_last_online: number | null;
        moni_integ_last_offline: number | null;
        tracking_max_age: number;
        tracking_min_hit: number;
        tracking_min_precision: string;
        tracking_distance_threshold: string;
        neural_network_fps: number;
        neural_network_frame_width: number;
        motion_detection_fps: number;
        motion_detection_resize_to: number;
        motion_detection_color_diff_to_detect: number;
        face_recognition_fpm: number;
        fps_fallback: number;
        hls_splitter_resolution: number;
        CameraId: number;
    };
    SourceCameraConfig: string | null;
    CameraDownloads: any[];
}

export interface Stream {
    stream_url: string;
    title: string;
    thumbnail_url: string;
    status: boolean;
}

export type CameraStatuses = Record<number, boolean>;