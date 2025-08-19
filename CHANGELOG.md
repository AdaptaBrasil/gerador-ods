# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-08-19

### 🔄 Changed
- **BREAKING**: Migração das imagens ODS de PNG para SVG
  - Todas as 17 imagens dos ODS agora usam formato SVG para melhor qualidade e performance
  - Atualizado `MosaicModel.js`: `imageFormat: 'png'` → `imageFormat: 'svg'`
  - Atualizado `MosaicView.js`: URLs das miniaturas agora apontam para arquivos SVG
  - Atualizado `script.js` (legacy): compatibilidade com SVG mantida
  - Arquivos PNG movidos para pasta `assets/images/ods-old/` como backup

### 🏠 Repository
- Migração do repositório `flameuss/gerador-ods` → `AdaptaBrasil/gerador-ods`
- Atualização de todos os links e referências no README.md
- Atualização das URLs de demo para GitHub Pages do AdaptaBrasil

### 🐛 Fixed
- Correção do caminho das imagens no arquivo legacy
- Correção da referência Open Graph para logo existente
- Mantido logo PNG no cabeçalho para compatibilidade

### 📦 Assets
- ✅ Mantidas 17 imagens SVG dos ODS (1.svg a 17.svg)
- ✅ Backup das imagens PNG originais em `ods-old/`
- ✅ Logo Adapta Brasil mantido em PNG
- ✅ Favicon mantido em PNG

## [1.0.2] - 2025-01-XX

### ✨ Added
- Suporte completo para imagens por linha (1-17)
- Funcionalidade de espaçamento 0px para mosaicos compactos
- Melhorias na documentação do README

### 🔧 Fixed
- Validação de configurações aprimorada
- Cálculo correto de dimensões sem espaçamento

## [1.0.1] - 2025-01-XX

### ✨ Added
- Implementação da arquitetura MVC
- Sistema de cache para imagens
- Atalhos de teclado (Ctrl+G, Ctrl+D, Ctrl+L)

### 🎨 Improved
- Interface responsiva
- Feedback visual aprimorado
- Performance de renderização

## [1.0.0] - 2025-01-XX

### 🎉 Initial Release
- ✅ Gerador de mosaico ODS funcional
- ✅ Suporte a 17 imagens ODS
- ✅ Configuração de layout flexível
- ✅ Export em PNG com transparência
- ✅ Interface moderna e responsiva
- ✅ Documentação completa

---

## Formato das Mudanças

### Tipos de Mudança
- `Added` - Nova funcionalidade
- `Changed` - Mudança em funcionalidade existente
- `Deprecated` - Funcionalidade será removida em breve
- `Removed` - Funcionalidade removida
- `Fixed` - Correção de bugs
- `Security` - Correções de segurança

### Emojis Utilizados
- 🎉 Initial Release / Major milestone
- ✨ Added (nova funcionalidade)
- 🔄 Changed (mudança)
- 🐛 Fixed (correção)
- 🔥 Removed (remoção)
- 📦 Assets (recursos/arquivos)
- 🎨 Improved (melhorias)
- 🏠 Repository (repositório)
- 🔧 Technical (técnico)
