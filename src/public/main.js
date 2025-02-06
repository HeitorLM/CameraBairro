document.addEventListener('DOMContentLoaded', async () => {
    const videoContainer = document.getElementById('video-container');
    const sidebar = document.getElementById('sidebar');
    const selectedCameras = [];

    // Buscar lista de URLs na api do express
    const resp = await fetch('http://localhost:5000/api/cameras');

    if (resp.status === 200) {
        // Pegar json de streamURLs
        const streams = await resp.json();

        streams.forEach((data, index) => {
            const streamUrl = data.stream_url;
            const streamTitle = data.title;
            const thumbnailUrl = data.thumbnail_url;

            const cameraItem = document.createElement('div');
            cameraItem.className = 'camera-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    selectedCameras.push(index);
                    addCamera(streamUrl, streamTitle, index);
                } else {
                    const cameraIndex = selectedCameras.indexOf(index);
                    if (cameraIndex > -1) {
                        selectedCameras.splice(cameraIndex, 1);
                        removeCamera(index);
                    }
                }
            });

            const thumbnail = document.createElement('img');
            thumbnail.src = thumbnailUrl;

            const title = document.createElement('span');
            title.textContent = streamTitle;

            cameraItem.appendChild(checkbox);
            cameraItem.appendChild(thumbnail);
            cameraItem.appendChild(title);
            sidebar.appendChild(cameraItem);
        });
    } else {
        alert('Nenhuma câmera disponível');
    }

    function addCamera(streamUrl, streamTitle, index) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';
        videoWrapper.id = `video-wrapper-${index}`;

        const titleWrapper = document.createElement('div');
        titleWrapper.className = 'title-wrapper';

        const title = document.createElement('h4');
        title.textContent = streamTitle;
        titleWrapper.appendChild(title);

        // Adicionar botão de reset
        const resetButton = document.createElement('button');
        resetButton.textContent = '⟳';
        resetButton.addEventListener('click', () => {
            const video = document.getElementById(`video-${index}`);
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
        });
        titleWrapper.appendChild(resetButton);
        videoWrapper.appendChild(titleWrapper);

        const video = document.createElement('video');
        video.id = `video-${index}`;
        video.controls = true;
        video.width = 640;
        video.height = 360;

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

        videoWrapper.appendChild(video);
        videoContainer.appendChild(videoWrapper);
    }

    function removeCamera(index) {
        const videoWrapper = document.getElementById(`video-wrapper-${index}`);
        if (videoWrapper) {
            const video = videoWrapper.querySelector('video');
            if (video) {
                video.pause();
                video.src = '';
                video.load();
            }
            videoWrapper.remove();
        }
    }
});