/**
 * Controller - Coordena Model e View
 * Responsável pela lógica de controle e orquestração
 */

import MosaicModel from '../models/MosaicModel.js';
import MosaicView from '../views/MosaicView.js';
import ImageLoader from '../utils/ImageLoader.js';
import CanvasRenderer from '../utils/CanvasRenderer.js';

class MosaicController {
    constructor() {
        this.model = new MosaicModel();
        this.view = new MosaicView();
        this.imageLoader = new ImageLoader();
        this.canvasRenderer = new CanvasRenderer();
        
        this.init();
    }

    /**
     * Inicializa o controller e configura event listeners
     */
    init() {
        this.setupEventListeners();
        this.displayAvailableImages();
        this.setupKeyboardShortcuts();
    }

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Botões principais
        this.view.on('generateBtn', 'click', () => this.generateMosaic());
        this.view.on('downloadBtn', 'click', () => this.downloadMosaic());
        this.view.on('clearBtn', 'click', () => this.clearAll());
        
        // Controle de tipo de fundo
        this.view.on('backgroundType', 'change', (e) => {
            this.view.toggleColorPicker(e.target.value !== 'transparent');
        });
        
        // Controle de opacidade
        this.view.on('backgroundOpacity', 'input', (e) => {
            this.view.updateOpacityDisplay(e.target.value);
        });
        
        // Enter no textarea para gerar
        this.view.on('imageNumbers', 'keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateMosaic();
            }
        });
    }

    /**
     * Configura atalhos de teclado globais
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'g':
                        e.preventDefault();
                        this.generateMosaic();
                        break;
                    case 'd':
                        if (this.model.currentMosaic.canvas) {
                            e.preventDefault();
                            this.downloadMosaic();
                        }
                        break;
                    case 'l':
                        e.preventDefault();
                        this.clearAll();
                        break;
                }
            }
        });
    }

    /**
     * Exibe as imagens disponíveis
     */
    displayAvailableImages() {
        this.view.displayAvailableImages(
            this.model.config.availableImages,
            this.model.config.imagePath,
            (imageNumber) => this.view.addImageToInput(imageNumber)
        );
    }

    /**
     * Gera o mosaico com as configurações atuais
     */
    async generateMosaic() {
        try {
            this.view.removeAllMessages();
            
            // Obter configurações do formulário
            const settings = this.view.getFormSettings();
            
            // Validar e processar números das imagens
            const imageNumbers = this.model.parseImageNumbers(settings.imageNumbers);
            if (imageNumbers.length === 0) {
                throw new Error('Por favor, insira pelo menos um número de imagem válido.');
            }
            
            // Validar configurações
            this.model.validateSettings(settings);
            
            // Mostrar loading
            this.view.showLoading();
            
            // Carregar imagens
            const imagePaths = imageNumbers.map(num => this.model.getImagePath(num));
            const images = await this.imageLoader.loadImages(imagePaths);
            
            // Calcular dimensões
            const dimensions = this.model.calculateCanvasDimensions(
                images.length, 
                settings
            );
            
            // Renderizar mosaico
            const canvas = this.view.getCanvas();
            this.canvasRenderer.renderMosaic(canvas, {
                images,
                dimensions,
                settings,
                hexToRgba: this.model.hexToRgba.bind(this.model)
            });
            
            // Salvar dados do mosaico
            this.model.saveMosaicData(canvas, settings);
            
            // Exibir resultado
            const dataUrl = canvas.toDataURL('image/png');
            const isTransparent = settings.backgroundType === 'transparent';
            this.view.displayMosaic(dataUrl, isTransparent);
            
            this.view.showSuccess('Mosaico gerado com sucesso!');
            
        } catch (error) {
            console.error('Erro ao gerar mosaico:', error);
            this.view.showError(`Erro ao gerar o mosaico: ${error.message}`);
        }
    }

    /**
     * Faz download do mosaico gerado
     */
    downloadMosaic() {
        if (!this.model.currentMosaic.canvas) {
            this.view.showError('Nenhum mosaico para baixar. Gere um mosaico primeiro.');
            return;
        }
        
        const canvas = this.model.currentMosaic.canvas;
        const isTransparent = this.model.currentMosaic.settings.backgroundType === 'transparent';
        const fileName = this.model.generateFileName(isTransparent);
        
        // Criar link de download
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        this.view.showSuccess('Download iniciado! Formato: PNG com suporte a transparência.');
    }

    /**
     * Limpa tudo e reseta o aplicativo
     */
    clearAll() {
        this.view.clearForm();
        this.model.currentMosaic = {
            images: [],
            settings: null,
            canvas: null
        };
    }

    /**
     * Carrega exemplo pré-definido
     * @param {string} type - Tipo de exemplo
     */
    loadExample(type) {
        const examples = {
            all: {
                numbers: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17',
                perRow: 6
            },
            allInline: {
                numbers: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17',
                perRow: 17,
                spacing: 0
            },
            grid3x3: {
                numbers: '1,2,3,4,5,6,7,8,9',
                perRow: 3
            },
            horizontal: {
                numbers: '1,2,3,4,5',
                perRow: 5
            },
            compact: {
                numbers: '1,2,3,4,5,6,7,8,9,10,11,12',
                perRow: 4,
                spacing: 0
            }
        };
        
        if (examples[type]) {
            this.view.elements.imageNumbers.value = examples[type].numbers;
            this.view.elements.imagesPerRow.value = examples[type].perRow;
            
            if (examples[type].spacing !== undefined) {
                this.view.elements.spacing.value = examples[type].spacing;
            }
            
            this.view.highlightInput(this.view.elements.imageNumbers);
        }
    }
}

export default MosaicController;