/**
 * CanvasRenderer - Utilitário para renderização no canvas
 * Gerencia toda a lógica de desenho no canvas
 */

class CanvasRenderer {
    constructor() {
        this.context = null;
    }

    /**
     * Renderiza o mosaico completo no canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {Object} config - Configurações de renderização
     */
    renderMosaic(canvas, config) {
        const { images, dimensions, settings, hexToRgba } = config;
        
        // Configurar canvas
        this.setupCanvas(canvas, dimensions);
        
        // Aplicar fundo
        this.applyBackground(canvas, settings, hexToRgba);
        
        // Desenhar imagens
        this.drawImages(canvas, images, settings);
    }

    /**
     * Configura as dimensões do canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {Object} dimensions - Dimensões do canvas
     */
    setupCanvas(canvas, dimensions) {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        this.context = canvas.getContext('2d');
        
        // Configurar qualidade de renderização
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = 'high';
    }

    /**
     * Aplica o fundo no canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {Object} settings - Configurações do mosaico
     * @param {Function} hexToRgba - Função para converter hex para rgba
     */
    applyBackground(canvas, settings, hexToRgba) {
        const ctx = this.context;
        
        // Limpar canvas (importante para transparência)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Aplicar fundo se não for transparente
        if (settings.backgroundType !== 'transparent') {
            const rgbaColor = hexToRgba(settings.backgroundColor, settings.backgroundOpacity);
            ctx.fillStyle = rgbaColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    /**
     * Desenha as imagens no canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {Array<HTMLImageElement>} images - Array de imagens
     * @param {Object} settings - Configurações do mosaico
     */
    drawImages(canvas, images, settings) {
        const ctx = this.context;
        const { imageSize, spacing, imagesPerRow } = settings;
        
        images.forEach((img, index) => {
            const position = this.calculateImagePosition(index, {
                imageSize,
                spacing,
                imagesPerRow
            });
            
            // Aplicar sombra apenas se houver espaçamento
            if (spacing > 0) {
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
            }
            
            // Desenhar imagem
            ctx.drawImage(img, position.x, position.y, imageSize, imageSize);
            
            // Resetar sombra se foi aplicada
            if (spacing > 0) {
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
        });
    }

    /**
     * Calcula a posição de uma imagem no grid
     * @param {number} index - Índice da imagem
     * @param {Object} config - Configurações do grid
     * @returns {Object} Posição x, y
     */
    calculateImagePosition(index, config) {
        const { imageSize, spacing, imagesPerRow } = config;
        const row = Math.floor(index / imagesPerRow);
        const col = index % imagesPerRow;
        
        return {
            x: col * (imageSize + spacing),
            y: row * (imageSize + spacing)
        };
    }

    /**
     * Aplica filtro ao canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {string} filterType - Tipo de filtro
     */
    applyFilter(canvas, filterType) {
        const ctx = canvas.getContext('2d');
        
        switch(filterType) {
            case 'blur':
                ctx.filter = 'blur(2px)';
                break;
            case 'grayscale':
                ctx.filter = 'grayscale(100%)';
                break;
            case 'sepia':
                ctx.filter = 'sepia(100%)';
                break;
            case 'brightness':
                ctx.filter = 'brightness(120%)';
                break;
            default:
                ctx.filter = 'none';
        }
    }

    /**
     * Limpa o canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     */
    clearCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Exporta o canvas como blob
     * @param {HTMLCanvasElement} canvas - Elemento canvas
     * @param {string} format - Formato da imagem
     * @param {number} quality - Qualidade (0-1)
     * @returns {Promise<Blob>} Blob da imagem
     */
    exportAsBlob(canvas, format = 'image/png', quality = 1) {
        return new Promise((resolve) => {
            canvas.toBlob(resolve, format, quality);
        });
    }
}

export default CanvasRenderer;