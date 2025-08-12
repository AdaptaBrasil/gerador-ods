/**
 * ImageLoader - Utilitário para carregamento de imagens
 * Gerencia o carregamento assíncrono de múltiplas imagens
 */

class ImageLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Carrega múltiplas imagens em paralelo
     * @param {Array<string>} paths - Array de caminhos das imagens
     * @returns {Promise<Array<HTMLImageElement>>} Promessa com array de imagens
     */
    async loadImages(paths) {
        const promises = paths.map(path => this.loadImage(path));
        return Promise.all(promises);
    }

    /**
     * Carrega uma única imagem
     * @param {string} src - Caminho da imagem
     * @returns {Promise<HTMLImageElement>} Promessa com a imagem carregada
     */
    loadImage(src) {
        // Verificar cache
        if (this.cache.has(src)) {
            return Promise.resolve(this.cache.get(src));
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                // Adicionar ao cache
                this.cache.set(src, img);
                resolve(img);
            };
            
            img.onerror = () => {
                reject(new Error(`Não foi possível carregar a imagem: ${src}`));
            };
            
            img.src = src;
        });
    }

    /**
     * Pré-carrega imagens para melhor performance
     * @param {Array<string>} paths - Array de caminhos das imagens
     */
    async preloadImages(paths) {
        try {
            await this.loadImages(paths);
            console.log(`${paths.length} imagens pré-carregadas com sucesso`);
        } catch (error) {
            console.error('Erro ao pré-carregar imagens:', error);
        }
    }

    /**
     * Limpa o cache de imagens
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Retorna o tamanho do cache
     * @returns {number} Número de imagens em cache
     */
    getCacheSize() {
        return this.cache.size;
    }
}

export default ImageLoader;