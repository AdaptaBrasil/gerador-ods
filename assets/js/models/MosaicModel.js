/**
 * Model - Gerenciamento de dados do mosaico
 * Responsável pela lógica de negócio e manipulação de dados
 */

class MosaicModel {
    constructor() {
        this.config = {
            imageFormat: 'png',
            availableImages: 17,
            imagePath: 'assets/images/ods/',
            defaultImageSize: 200,
            defaultSpacing: 10,
            defaultImagesPerRow: 3
        };
        
        this.currentMosaic = {
            images: [],
            settings: null,
            canvas: null
        };
    }

    /**
     * Valida e processa os números das imagens inseridos
     * @param {string} input - String com números separados por vírgula
     * @returns {Array} Array de números válidos
     */
    parseImageNumbers(input) {
        if (!input || input.trim() === '') return [];
        
        const numbers = input.split(',')
            .map(n => parseInt(n.trim()))
            .filter(n => !isNaN(n) && n >= 1 && n <= this.config.availableImages);
        
        // Remove duplicatas mantendo a ordem
        return [...new Set(numbers)];
    }

    /**
     * Valida as configurações do mosaico
     * @param {Object} settings - Configurações do mosaico
     * @returns {boolean} True se válido
     */
    validateSettings(settings) {
        const requiredFields = ['imagesPerRow', 'imageSize', 'spacing'];
        
        for (let field of requiredFields) {
            if (settings[field] === undefined || settings[field] === null) {
                throw new Error(`Configuração inválida: ${field}`);
            }
            
            // Permite spacing = 0, mas não valores negativos
            if (settings[field] < 0) {
                throw new Error(`${field} não pode ser negativo`);
            }
        }
        
        if (settings.imageSize < 50 || settings.imageSize > 500) {
            throw new Error('Tamanho da imagem deve estar entre 50 e 500 pixels');
        }
        
        if (settings.spacing > 50) {
            throw new Error('Espaçamento não pode ser maior que 50 pixels');
        }
        
        if (settings.imagesPerRow < 1 || settings.imagesPerRow > 17) {
            throw new Error('Número de imagens por linha deve estar entre 1 e 17');
        }
        
        return true;
    }

    /**
     * Calcula as dimensões do canvas baseado nas configurações
     * @param {number} imageCount - Quantidade de imagens
     * @param {Object} settings - Configurações do mosaico
     * @returns {Object} Dimensões do canvas
     */
    calculateCanvasDimensions(imageCount, settings) {
        const rows = Math.ceil(imageCount / settings.imagesPerRow);
        const cols = Math.min(settings.imagesPerRow, imageCount);
        
        // Cálculo correto considerando espaçamento 0
        const spacingWidth = settings.spacing * Math.max(0, cols - 1);
        const spacingHeight = settings.spacing * Math.max(0, rows - 1);
        
        return {
            width: (settings.imageSize * cols) + spacingWidth,
            height: (settings.imageSize * rows) + spacingHeight,
            rows: rows,
            cols: cols
        };
    }

    /**
     * Converte cor hexadecimal para RGBA
     * @param {string} hex - Cor em hexadecimal
     * @param {number} opacity - Opacidade (0-1)
     * @returns {string} String RGBA
     */
    hexToRgba(hex, opacity = 1) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    /**
     * Gera nome único para o arquivo
     * @param {boolean} isTransparent - Se o fundo é transparente
     * @returns {string} Nome do arquivo
     */
    generateFileName(isTransparent = false) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const suffix = isTransparent ? '-transparente' : '';
        return `mosaico-ods${suffix}-${timestamp}.png`;
    }

    /**
     * Armazena o canvas gerado
     * @param {HTMLCanvasElement} canvas - Canvas com o mosaico
     * @param {Object} settings - Configurações usadas
     */
    saveMosaicData(canvas, settings) {
        this.currentMosaic.canvas = canvas;
        this.currentMosaic.settings = settings;
        this.currentMosaic.timestamp = new Date();
    }

    /**
     * Retorna o caminho completo da imagem
     * @param {number} imageNumber - Número da imagem
     * @returns {string} Caminho da imagem
     */
    getImagePath(imageNumber) {
        return `${this.config.imagePath}${imageNumber}.${this.config.imageFormat}`;
    }

    /**
     * Retorna as configurações padrão
     * @returns {Object} Configurações padrão
     */
    getDefaultSettings() {
        return {
            imageSize: this.config.defaultImageSize,
            spacing: this.config.defaultSpacing,
            imagesPerRow: this.config.defaultImagesPerRow,
            backgroundType: 'color',
            backgroundColor: '#ffffff',
            backgroundOpacity: 1
        };
    }
}

export default MosaicModel;