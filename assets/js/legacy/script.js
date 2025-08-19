// Configuração inicial
const config = {
    imageFormat: 'svg',
    availableImages: 17
};

// Elementos do DOM
const elements = {
    imageNumbers: document.getElementById('imageNumbers'),
    imagesPerRow: document.getElementById('imagesPerRow'),
    imageSize: document.getElementById('imageSize'),
    spacing: document.getElementById('spacing'),
    backgroundType: document.getElementById('backgroundType'),
    backgroundColor: document.getElementById('backgroundColor'),
    backgroundOpacity: document.getElementById('backgroundOpacity'),
    opacityValue: document.getElementById('opacityValue'),
    colorPickerGroup: document.getElementById('colorPickerGroup'),
    generateBtn: document.getElementById('generateBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    clearBtn: document.getElementById('clearBtn'),
    previewArea: document.getElementById('previewArea'),
    canvas: document.getElementById('canvas'),
    availableImages: document.getElementById('availableImages')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    displayAvailableImages();
    setupEventListeners();
});

// Exibir miniaturas das imagens disponíveis
function displayAvailableImages() {
    const container = elements.availableImages;
    container.innerHTML = '';
    
    for (let i = 1; i <= config.availableImages; i++) {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb-container';
        thumbContainer.title = `Imagem ${i}`;
        
        const img = document.createElement('img');
        img.src = `assets/images/ods/${i}.svg`;
        img.alt = `ODS ${i}`;
        
        const number = document.createElement('span');
        number.className = 'thumb-number';
        number.textContent = i;
        
        thumbContainer.appendChild(img);
        thumbContainer.appendChild(number);
        
        // Adicionar ao clicar na miniatura
        thumbContainer.addEventListener('click', () => {
            addImageToList(i);
        });
        
        container.appendChild(thumbContainer);
    }
}

// Adicionar imagem à lista de entrada
function addImageToList(imageNumber) {
    const currentValue = elements.imageNumbers.value.trim();
    if (currentValue) {
        elements.imageNumbers.value = currentValue + ',' + imageNumber;
    } else {
        elements.imageNumbers.value = imageNumber;
    }
    
    // Destacar brevemente o campo de texto
    elements.imageNumbers.style.borderColor = '#2dce89';
    setTimeout(() => {
        elements.imageNumbers.style.borderColor = '';
    }, 500);
}

// Configurar event listeners
function setupEventListeners() {
    elements.generateBtn.addEventListener('click', generateMosaic);
    elements.downloadBtn.addEventListener('click', downloadMosaic);
    elements.clearBtn.addEventListener('click', clearAll);
    
    // Permitir gerar com Enter no textarea
    elements.imageNumbers.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateMosaic();
        }
    });
    
    // Controlar visibilidade do seletor de cor
    elements.backgroundType.addEventListener('change', (e) => {
        if (e.target.value === 'transparent') {
            elements.colorPickerGroup.style.display = 'none';
        } else {
            elements.colorPickerGroup.style.display = 'block';
        }
    });
    
    // Atualizar valor da opacidade
    elements.backgroundOpacity.addEventListener('input', (e) => {
        elements.opacityValue.textContent = e.target.value + '%';
    });
}

// Função principal: Gerar Mosaico
async function generateMosaic() {
    try {
        // Limpar mensagens anteriores
        removeMessages();
        
        // Obter e validar entrada
        const imageNumbers = parseImageNumbers();
        if (imageNumbers.length === 0) {
            showError('Por favor, insira pelo menos um número de imagem válido.');
            return;
        }
        
        // Obter configurações
        const imagesPerRow = parseInt(elements.imagesPerRow.value);
        const imageSize = parseInt(elements.imageSize.value);
        const spacing = parseInt(elements.spacing.value);
        const backgroundType = elements.backgroundType.value;
        const backgroundColor = elements.backgroundColor.value;
        const backgroundOpacity = parseInt(elements.backgroundOpacity.value) / 100;
        
        // Mostrar loading
        showLoading();
        
        // Carregar todas as imagens
        const images = await loadImages(imageNumbers);
        
        // Calcular dimensões do canvas
        const rows = Math.ceil(images.length / imagesPerRow);
        const canvasWidth = (imageSize * Math.min(imagesPerRow, images.length)) + 
                          (spacing * (Math.min(imagesPerRow, images.length) - 1));
        const canvasHeight = (imageSize * rows) + (spacing * (rows - 1));
        
        // Configurar canvas
        const canvas = elements.canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Limpar canvas (importante para transparência)
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Preencher fundo se não for transparente
        if (backgroundType !== 'transparent') {
            // Converter cor hex para rgba com opacidade
            const r = parseInt(backgroundColor.substr(1, 2), 16);
            const g = parseInt(backgroundColor.substr(3, 2), 16);
            const b = parseInt(backgroundColor.substr(5, 2), 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${backgroundOpacity})`;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
        
        // Desenhar imagens no mosaico
        images.forEach((img, index) => {
            const row = Math.floor(index / imagesPerRow);
            const col = index % imagesPerRow;
            const x = col * (imageSize + spacing);
            const y = row * (imageSize + spacing);
            
            ctx.drawImage(img, x, y, imageSize, imageSize);
        });
        
        // Exibir resultado
        displayResult(canvas);
        showSuccess('Mosaico gerado com sucesso!');
        
    } catch (error) {
        console.error('Erro ao gerar mosaico:', error);
        showError('Erro ao gerar o mosaico: ' + error.message);
    }
}

// Parse dos números das imagens
function parseImageNumbers() {
    const input = elements.imageNumbers.value.trim();
    if (!input) return [];
    
    const numbers = input.split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n) && n >= 1 && n <= config.availableImages);
    
    // Remover duplicatas mantendo a ordem
    return [...new Set(numbers)];
}

// Carregar imagens
function loadImages(imageNumbers) {
    return Promise.all(imageNumbers.map(num => loadImage(`assets/images/ods/${num}.svg`)));
}

// Carregar uma imagem
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Não foi possível carregar a imagem: ${src}`));
        img.src = src;
    });
}

// Exibir resultado
function displayResult(canvas) {
    // Criar imagem a partir do canvas
    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    
    // Limpar área de preview e adicionar imagem
    elements.previewArea.innerHTML = '';
    
    // Adicionar classe checkerboard se o fundo for transparente
    if (elements.backgroundType.value === 'transparent') {
        elements.previewArea.classList.add('preview-checkerboard');
    } else {
        elements.previewArea.classList.remove('preview-checkerboard');
    }
    
    elements.previewArea.appendChild(img);
    
    // Mostrar botão de download
    elements.downloadBtn.style.display = 'inline-flex';
}

// Download do mosaico
function downloadMosaic() {
    const canvas = elements.canvas;
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const transparentSuffix = elements.backgroundType.value === 'transparent' ? '-transparente' : '';
    link.download = `mosaico-ods${transparentSuffix}-${timestamp}.png`;
    
    // Garantir que o download seja em PNG com suporte a transparência
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showSuccess('Download iniciado! Formato: PNG com suporte a transparência.');
}

// Limpar tudo
function clearAll() {
    elements.imageNumbers.value = '';
    elements.previewArea.innerHTML = '<p class="placeholder">O mosaico aparecerá aqui após clicar em "Gerar Mosaico"</p>';
    elements.previewArea.classList.remove('preview-checkerboard');
    elements.downloadBtn.style.display = 'none';
    removeMessages();
}

// Mostrar loading
function showLoading() {
    elements.previewArea.innerHTML = `
        <div style="text-align: center;">
            <div class="loading"></div>
            <p style="margin-top: 10px; color: #6c757d;">Gerando mosaico...</p>
        </div>
    `;
}

// Mostrar mensagem de erro
function showError(message) {
    removeMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    elements.generateBtn.parentElement.appendChild(errorDiv);
}

// Mostrar mensagem de sucesso
function showSuccess(message) {
    removeMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    elements.generateBtn.parentElement.appendChild(successDiv);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 3000);
}

// Remover mensagens
function removeMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
}

// Exemplos de uso rápido
function loadExample(type) {
    switch(type) {
        case 'all':
            elements.imageNumbers.value = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17';
            elements.imagesPerRow.value = '6';
            break;
        case 'grid3x3':
            elements.imageNumbers.value = '1,2,3,4,5,6,7,8,9';
            elements.imagesPerRow.value = '3';
            break;
        case 'horizontal':
            elements.imageNumbers.value = '1,2,3,4,5';
            elements.imagesPerRow.value = '5';
            break;
    }
}

// Adicionar alguns atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Ctrl+G para gerar
    if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        generateMosaic();
    }
    // Ctrl+D para download
    if (e.ctrlKey && e.key === 'd' && elements.downloadBtn.style.display !== 'none') {
        e.preventDefault();
        downloadMosaic();
    }
    // Ctrl+L para limpar
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearAll();
    }
});