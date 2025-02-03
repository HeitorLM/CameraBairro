// Função para quebrar a URL em 2 (mainURl e authURL)
export function splitUrl(url: string): string[] {
    const parts = url.split('/');
    const mainURL = parts.slice(0, 3).join('/');
    const authURL = parts.slice(3).join('/');
    return [mainURL, authURL];
}

// Função para carregar a URL e retornar a última linha da resposta
export async function getM3u8Url(url: string): Promise<string> {
    const response = await fetch(url);
    const text = await response.text();
    const lines = text.split('\n');
    return lines[lines.length - 1];
}
