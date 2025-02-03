const fs = require('fs');
const m3u8stream = require('m3u8stream')

import CameraService from './cameras';

// Função para quebrar a URL em 2 (mainURl e authURL)
function splitUrl(url: string): string[] {
    const parts = url.split('/');
    const mainURL = parts.slice(0, 3).join('/');
    const authURL = parts.slice(3).join('/');
    return [mainURL, authURL];
}

// Função para carregar a URL e retornar a última linha da resposta
async function getM3u8Url(url: string): Promise<string> {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n');
    return lines[lines.length - 1];
}

const start = async () => {
    // Pega info das cameras
    const cameraService = new CameraService('/Users/HeitorLM/Downloads/cameras.json');
    const camURL = cameraService.getCameraStreamURLById(809818);

    if (camURL) {
        const [mainURL, authURL] = splitUrl(camURL);

        // Faz download da info da camera URL e imprime a última linha (endereço do .m3u8 + token hls_ctx)
        const m3u8Url = await getM3u8Url(`${mainURL}/${authURL}`);
        console.log(m3u8Url);

        // Extrai nome do arquivo m3u8 da URL
        const fileName = m3u8Url.split('/').pop();

        // Utiliza a lib m3u8stream para baixar o vídeo
        const stream = m3u8stream(`${mainURL}${m3u8Url}`);
        stream.pipe(fs.createWriteStream(`${fileName}.mp4`));

        // Eventos para monitorar o progresso
        stream.on('progress', (segment: any, totalSegments: number, downloadedSegments: number) => {
            console.log(`Baixando segmento ${downloadedSegments}/${totalSegments}: ${segment}`);
        });

        stream.on('error', (err: any) => {
            console.error('Erro ao baixar o vídeo:', err);
        });

        stream.on('end', () => {
            console.log('Download completo.');
        });
    }
}

start();