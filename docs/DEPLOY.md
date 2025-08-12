# 🚀 Deploy no GitHub Pages - Guia Completo

## Passo a Passo para Publicar

### 1. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New"** ou **"+"** → **"New repository"**
3. Configure:
   - **Repository name**: `gerador-ods`
   - **Description**: "Gerador de Mosaico com os Objetivos de Desenvolvimento Sustentável da ONU"
   - **Public** (obrigatório para GitHub Pages gratuito)
   - **NÃO** inicialize com README (já temos)

### 2. Enviar Código para o GitHub

No terminal/cmd, dentro da pasta do projeto:

```bash
# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Gerador de Mosaico ODS v1.0.0"

# Adicionar o repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/flameuss/gerador-ods.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No GitHub, vá em **Settings** (Configurações) do repositório
2. Role até **Pages** na barra lateral esquerda
3. Em **Source**, selecione:
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Clique em **Save**

### 4. Aguardar Deploy

- O GitHub levará 2-10 minutos para publicar
- A URL será: `https://flameuss.github.io/gerador-ods/`
- Você verá um ✅ verde quando estiver pronto

## 📝 Checklist Pré-Deploy

Antes de fazer o deploy, verifique:

- [ ] Todas as imagens ODS (1-17) estão em `assets/images/ods/`
- [ ] O arquivo `index.html` está na raiz
- [ ] Os caminhos de arquivos estão corretos (relativos)
- [ ] Testou localmente e funciona
- [ ] Substituiu "seu-usuario" no README pelos seus dados

## 🔄 Atualizações Futuras

Para atualizar o site após mudanças:

```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "Adiciona nova funcionalidade X"

# Enviar para GitHub
git push origin main
```

O GitHub Pages atualizará automaticamente em alguns minutos.

## 🐛 Solução de Problemas

### Site não aparece após 10 minutos

1. Verifique em **Settings** → **Pages** se está ativado
2. Veja se aparece a URL do site
3. Verifique o **Actions** tab por erros de build

### Erro 404

1. Certifique-se que `index.html` está na raiz
2. Aguarde mais alguns minutos
3. Limpe o cache do navegador (Ctrl+F5)

### Imagens não carregam

1. Verifique se o caminho está correto: `assets/images/ods/`
2. Nomes de arquivo são case-sensitive no GitHub
3. Certifique-se que commitou as imagens

### JavaScript não funciona

1. Abra o Console do navegador (F12)
2. Verifique por erros
3. Caminhos devem ser relativos, não absolutos

## 🎯 URLs Importantes

Após o deploy, você terá:

- **Site ao vivo**: `https://SEU-USUARIO.github.io/gerador-ods/`
- **Repositório**: `https://github.com/SEU-USUARIO/gerador-ods`
- **Status do deploy**: `https://github.com/SEU-USUARIO/gerador-ods/deployments`

## 📊 Monitoramento

O GitHub fornece insights básicos:

1. Vá em **Insights** no repositório
2. **Traffic** mostra visitantes
3. **Actions** mostra status dos deploys

## 🎨 Personalizações

### Domínio customizado (opcional)

1. Compre um domínio
2. Em **Settings** → **Pages** → **Custom domain**
3. Adicione seu domínio
4. Configure DNS seguindo as instruções

### Adicionar Analytics (opcional)

No `index.html`, antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Compartilhando

Após o deploy, compartilhe:

- Link direto: `https://SEU-USUARIO.github.io/gerador-ods/`
- Badge no README: `[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://SEU-USUARIO.github.io/gerador-ods/)`
- Redes sociais com preview automático (meta tags já configuradas)

## 📞 Suporte

- [Documentação GitHub Pages](https://docs.github.com/pages)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
- Issues do projeto: `https://github.com/SEU-USUARIO/gerador-ods/issues`

---

**Pronto!** O projeto está configurado para o usuário `flameuss`.