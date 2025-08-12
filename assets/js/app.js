/**
 * App - Ponto de entrada principal da aplicação
 * Inicializa o controller e gerencia o ciclo de vida da aplicação
 */

import MosaicController from './controllers/MosaicController.js';

class App {
    constructor() {
        this.controller = null;
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        // Aguardar DOM carregar completamente
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    /**
     * Inicia a aplicação
     */
    start() {
        try {
            // Inicializar controller principal
            this.controller = new MosaicController();
            
            // Registrar aplicação globalmente para debug (opcional)
            window.mosaicApp = this;
            
            console.log('✅ Aplicação Gerador de Mosaico ODS iniciada com sucesso!');
            this.logInfo();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
            this.showInitError();
        }
    }

    /**
     * Exibe informações da aplicação no console
     */
    logInfo() {
        console.log('%c🎨 Gerador de Mosaico ODS', 
            'color: #5e72e4; font-size: 20px; font-weight: bold;');
        console.log('%cVersão: 1.0.0 | Estrutura MVC', 
            'color: #825ee4; font-size: 12px;');
        console.log('%cAtalhos: Ctrl+G (Gerar) | Ctrl+D (Download) | Ctrl+L (Limpar)', 
            'color: #2dce89; font-size: 12px;');
    }

    /**
     * Exibe erro de inicialização na interface
     */
    showInitError() {
        const errorHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #f8d7da;
                color: #721c24;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #f5c6cb;
                max-width: 400px;
                text-align: center;
                z-index: 9999;
            ">
                <h3>❌ Erro ao inicializar aplicação</h3>
                <p>Por favor, recarregue a página ou verifique o console para mais detalhes.</p>
                <button onclick="location.reload()" style="
                    margin-top: 10px;
                    padding: 8px 16px;
                    background: #721c24;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                ">Recarregar Página</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', errorHTML);
    }

    /**
     * Obtém a versão da aplicação
     * @returns {string} Versão da aplicação
     */
    getVersion() {
        return '1.0.0';
    }

    /**
     * Obtém o controller principal
     * @returns {MosaicController} Controller da aplicação
     */
    getController() {
        return this.controller;
    }
}

// Criar e inicializar aplicação
const app = new App();
app.init();

export default app;