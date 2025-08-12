# Arquitetura MVC - Gerador de Mosaico ODS

## 📐 Visão Geral

Este documento descreve a arquitetura Model-View-Controller (MVC) implementada no projeto Gerador de Mosaico ODS.

## 🎯 Princípios de Design

1. **Separação de Responsabilidades**: Cada camada tem uma responsabilidade única e bem definida
2. **Baixo Acoplamento**: Componentes são independentes e se comunicam através de interfaces
3. **Alta Coesão**: Código relacionado está agrupado logicamente
4. **Modularidade**: Sistema dividido em módulos ES6 reutilizáveis
5. **Escalabilidade**: Fácil adicionar novas funcionalidades

## 🏗️ Camadas da Arquitetura

### 1. Model Layer (`/assets/js/models/`)

**Responsabilidades:**
- Lógica de negócio
- Validação de dados
- Processamento de informações
- Gerenciamento de estado

**Componente Principal:**
```javascript
MosaicModel.js
├── parseImageNumbers()      // Processa entrada do usuário
├── validateSettings()        // Valida configurações
├── calculateCanvasDimensions() // Calcula dimensões
├── hexToRgba()              // Converte cores
└── generateFileName()       // Gera nomes únicos
```

### 2. View Layer (`/assets/js/views/`)

**Responsabilidades:**
- Manipulação do DOM
- Renderização de UI
- Captura de eventos
- Feedback visual

**Componente Principal:**
```javascript
MosaicView.js
├── cacheElements()          // Armazena referências DOM
├── displayAvailableImages()  // Mostra miniaturas
├── getFormSettings()        // Obtém dados do form
├── showLoading()            // Estados de loading
├── displayMosaic()          // Exibe resultado
└── showError/Success()      // Mensagens de feedback
```

### 3. Controller Layer (`/assets/js/controllers/`)

**Responsabilidades:**
- Coordenação Model-View
- Processamento de eventos
- Orquestração de fluxo
- Gerenciamento de estado

**Componente Principal:**
```javascript
MosaicController.js
├── init()                   // Inicialização
├── setupEventListeners()    // Configura eventos
├── generateMosaic()         // Processo principal
├── downloadMosaic()         // Exportação
└── clearAll()              // Reset do estado
```

## 🔄 Fluxo de Dados

```
User → View → Controller → Model
                ↓            ↓
              View ← Controller
                ↓
              User
```

### Exemplo: Geração de Mosaico

1. **Usuário** clica em "Gerar Mosaico"
2. **View** captura evento e notifica Controller
3. **Controller** obtém dados do formulário via View
4. **Controller** solicita validação ao Model
5. **Model** valida e processa dados
6. **Controller** coordena renderização
7. **View** atualiza interface com resultado

## 🧩 Módulos Utilitários (`/assets/js/utils/`)

### ImageLoader.js
```javascript
class ImageLoader {
    loadImages()     // Carrega múltiplas imagens
    loadImage()      // Carrega uma imagem
    preloadImages()  // Pré-carregamento
    clearCache()     // Limpa cache
}
```

**Características:**
- Cache de imagens
- Carregamento assíncrono
- Tratamento de erros
- Promise-based API

### CanvasRenderer.js
```javascript
class CanvasRenderer {
    renderMosaic()   // Renderiza mosaico completo
    setupCanvas()    // Configura dimensões
    applyBackground() // Aplica fundo
    drawImages()     // Desenha imagens
}
```

**Características:**
- Renderização otimizada
- Suporte a transparência
- Aplicação de filtros
- Export em múltiplos formatos

## 📦 Estrutura de Módulos ES6

```javascript
// Importação
import MosaicModel from './models/MosaicModel.js';
import MosaicView from './views/MosaicView.js';

// Exportação
export default MosaicController;
```

**Benefícios:**
- Carregamento sob demanda
- Escopo isolado
- Melhor organização
- Tree-shaking ready

## 🔌 Pontos de Extensão

### Adicionar Nova Funcionalidade

1. **Model**: Adicione método de processamento
```javascript
// MosaicModel.js
applyWatermark(canvas, text) {
    // Lógica de watermark
}
```

2. **View**: Adicione elemento UI
```javascript
// MosaicView.js
addWatermarkInput() {
    // Criar input de watermark
}
```

3. **Controller**: Conecte Model e View
```javascript
// MosaicController.js
handleWatermark() {
    const text = this.view.getWatermarkText();
    this.model.applyWatermark(canvas, text);
}
```

## 🎨 Padrões de Design Utilizados

### 1. Module Pattern
- Encapsulamento via ES6 modules
- Namespace isolation

### 2. Observer Pattern (Implícito)
- Event listeners para comunicação
- Desacoplamento de componentes

### 3. Facade Pattern
- Controller como fachada simplificada
- API unificada para operações complexas

### 4. Strategy Pattern
- Diferentes estratégias de renderização
- Background types (color/transparent)

## 🚀 Performance

### Otimizações Implementadas

1. **Cache de Imagens**
   - Evita recarregamento
   - Map para O(1) lookup

2. **Lazy Loading**
   - Módulos carregados sob demanda
   - Reduz tempo inicial

3. **Event Delegation**
   - Menos listeners
   - Melhor performance

4. **Canvas Optimization**
   - imageSmoothingQuality
   - Batch rendering

## 🔒 Segurança

### Práticas Implementadas

1. **Validação de Entrada**
   - Sanitização de números
   - Limites de tamanho

2. **CSP Ready**
   - Sem inline scripts
   - Módulos externos

3. **XSS Prevention**
   - textContent vs innerHTML
   - Escape de dados

## 📊 Métricas

### Complexidade
- **Ciclomática**: Baixa (< 10 por método)
- **Cognitiva**: Média-baixa
- **Acoplamento**: Baixo

### Manutenibilidade
- **Linhas por arquivo**: < 300
- **Métodos por classe**: < 20
- **Parâmetros por método**: < 4

## 🔄 Ciclo de Vida

```
1. App.init()
   ├── 2. Controller.constructor()
   │   ├── 3. Model.constructor()
   │   ├── 4. View.constructor()
   │   └── 5. Utils initialization
   └── 6. Event listeners setup
       └── 7. Ready for user interaction
```

## 📚 Recursos Adicionais

- [MDN - MVC Pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

*Última atualização: Janeiro 2025*