/**
 * View - Interface do usuário e manipulação do DOM
 * Responsável pela apresentação e interação com o usuário
 */

class MosaicView {
    constructor() {
        this.elements = this.cacheElements();
        this.initializeView();
    }

    /**
     * Armazena referências aos elementos do DOM
     * @returns {Object} Elementos do DOM
     */
    cacheElements() {
        return {
            // Inputs
            imageNumbers: document.getElementById('imageNumbers'),
            imagesPerRow: document.getElementById('imagesPerRow'),
            imageSize: document.getElementById('imageSize'),
            spacing: document.getElementById('spacing'),
            backgroundType: document.getElementById('backgroundType'),
            backgroundColor: document.getElementById('backgroundColor'),
            backgroundOpacity: document.getElementById('backgroundOpacity'),
            opacityValue: document.getElementById('opacityValue'),
            colorPickerGroup: document.getElementById('colorPickerGroup'),
            
            // Buttons
            generateBtn: document.getElementById('generateBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            clearBtn: document.getElementById('clearBtn'),
            
            // Display areas
            previewArea: document.getElementById('previewArea'),
            canvas: document.getElementById('canvas'),
            availableImages: document.getElementById('availableImages')
        };
    }

    /**
     * Inicializa a view com estado padrão
     */
    initializeView() {
        this.hideDownloadButton();
        this.updateOpacityDisplay(100);
    }

    /**
     * Exibe as miniaturas das imagens disponíveis
     * @param {number} totalImages - Total de imagens disponíveis
     * @param {string} imagePath - Caminho base das imagens
     * @param {Function} onClickCallback - Callback ao clicar na miniatura
     */
    displayAvailableImages(totalImages, imagePath, onClickCallback) {
        const container = this.elements.availableImages;
        container.innerHTML = '';
        
        for (let i = 1; i <= totalImages; i++) {
            const thumbContainer = this.createThumbnail(i, imagePath, onClickCallback);
            container.appendChild(thumbContainer);
        }
    }

    /**
     * Cria uma miniatura clicável
     * @param {number} imageNumber - Número da imagem
     * @param {string} imagePath - Caminho base das imagens
     * @param {Function} onClickCallback - Callback ao clicar
     * @returns {HTMLElement} Elemento da miniatura
     */
    createThumbnail(imageNumber, imagePath, onClickCallback) {
        const container = document.createElement('div');
        container.className = 'thumb-container';
        container.title = `Imagem ${imageNumber}`;
        
        const img = document.createElement('img');
        img.src = `${imagePath}${imageNumber}.png`;
        img.alt = `ODS ${imageNumber}`;
        
        const number = document.createElement('span');
        number.className = 'thumb-number';
        number.textContent = imageNumber;
        
        container.appendChild(img);
        container.appendChild(number);
        
        container.addEventListener('click', () => onClickCallback(imageNumber));
        
        return container;
    }

    /**
     * Adiciona número à lista de imagens
     * @param {number} imageNumber - Número da imagem
     */
    addImageToInput(imageNumber) {
        const currentValue = this.elements.imageNumbers.value.trim();
        this.elements.imageNumbers.value = currentValue 
            ? `${currentValue},${imageNumber}` 
            : imageNumber.toString();
        
        this.highlightInput(this.elements.imageNumbers);
    }

    /**
     * Destaca um input temporariamente
     * @param {HTMLElement} element - Elemento a destacar
     */
    highlightInput(element) {
        element.style.borderColor = '#2dce89';
        setTimeout(() => {
            element.style.borderColor = '';
        }, 500);
    }

    /**
     * Obtém as configurações do formulário
     * @returns {Object} Configurações atuais
     */
    getFormSettings() {
        return {
            imageNumbers: this.elements.imageNumbers.value,
            imagesPerRow: parseInt(this.elements.imagesPerRow.value),
            imageSize: parseInt(this.elements.imageSize.value),
            spacing: parseInt(this.elements.spacing.value),
            backgroundType: this.elements.backgroundType.value,
            backgroundColor: this.elements.backgroundColor.value,
            backgroundOpacity: parseInt(this.elements.backgroundOpacity.value) / 100
        };
    }

    /**
     * Mostra/oculta o seletor de cor baseado no tipo de fundo
     * @param {boolean} show - Se deve mostrar o seletor
     */
    toggleColorPicker(show) {
        this.elements.colorPickerGroup.style.display = show ? 'block' : 'none';
    }

    /**
     * Atualiza o display de opacidade
     * @param {number} value - Valor da opacidade (0-100)
     */
    updateOpacityDisplay(value) {
        this.elements.opacityValue.textContent = `${value}%`;
    }

    /**
     * Exibe indicador de carregamento
     */
    showLoading() {
        this.elements.previewArea.innerHTML = `
            <div style="text-align: center;">
                <div class="loading"></div>
                <p style="margin-top: 10px; color: #6c757d;">Gerando mosaico...</p>
            </div>
        `;
    }

    /**
     * Exibe o mosaico gerado
     * @param {string} dataUrl - URL da imagem em base64
     * @param {boolean} isTransparent - Se o fundo é transparente
     */
    displayMosaic(dataUrl, isTransparent) {
        const img = new Image();
        img.src = dataUrl;
        
        this.elements.previewArea.innerHTML = '';
        
        if (isTransparent) {
            this.elements.previewArea.classList.add('preview-checkerboard');
        } else {
            this.elements.previewArea.classList.remove('preview-checkerboard');
        }
        
        this.elements.previewArea.appendChild(img);
        this.showDownloadButton();
    }

    /**
     * Limpa a área de preview
     */
    clearPreview() {
        this.elements.previewArea.innerHTML = 
            '<p class="placeholder">O mosaico aparecerá aqui após clicar em "Gerar Mosaico"</p>';
        this.elements.previewArea.classList.remove('preview-checkerboard');
        this.hideDownloadButton();
    }

    /**
     * Limpa todos os campos do formulário
     */
    clearForm() {
        this.elements.imageNumbers.value = '';
        this.clearPreview();
        this.removeAllMessages();
    }

    /**
     * Exibe mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        this.removeAllMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.elements.generateBtn.parentElement.appendChild(errorDiv);
    }

    /**
     * Exibe mensagem de sucesso
     * @param {string} message - Mensagem de sucesso
     */
    showSuccess(message) {
        this.removeAllMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        this.elements.generateBtn.parentElement.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 3000);
    }

    /**
     * Remove todas as mensagens de feedback
     */
    removeAllMessages() {
        document.querySelectorAll('.error-message, .success-message')
            .forEach(el => el.remove());
    }

    /**
     * Mostra o botão de download
     */
    showDownloadButton() {
        this.elements.downloadBtn.style.display = 'inline-flex';
    }

    /**
     * Oculta o botão de download
     */
    hideDownloadButton() {
        this.elements.downloadBtn.style.display = 'none';
    }

    /**
     * Retorna o canvas para renderização
     * @returns {HTMLCanvasElement} Elemento canvas
     */
    getCanvas() {
        return this.elements.canvas;
    }

    /**
     * Registra event listener
     * @param {string} elementKey - Chave do elemento
     * @param {string} event - Nome do evento
     * @param {Function} handler - Função handler
     */
    on(elementKey, event, handler) {
        if (this.elements[elementKey]) {
            this.elements[elementKey].addEventListener(event, handler);
        }
    }
}

export default MosaicView;