# 🚀 Instruções de Deploy - @flameuss

## Comandos para executar agora:

```bash
# 1. Navegue até a pasta do projeto
cd C:\laragon\www\gerador-ods

# 2. Inicialize o Git (se ainda não fez)
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o commit inicial
git commit -m "Initial commit - Gerador de Mosaico ODS v1.0.1"

# 5. Configure o branch principal
git branch -M main

# 6. Adicione o repositório remoto
git remote add origin https://github.com/flameuss/gerador-ods.git

# 7. Faça o push para o GitHub
git push -u origin main
```

## ✅ Após o push, ative o GitHub Pages:

1. Acesse: https://github.com/flameuss/gerador-ods
2. Clique em **Settings** (⚙️ Configurações)
3. Role até **Pages** no menu lateral
4. Em **Source**, selecione:
   - **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Clique em **Save**

## 🌐 Seu site estará disponível em:

**https://flameuss.github.io/gerador-ods/**

(Aguarde 2-10 minutos após ativar o GitHub Pages)

## 📊 Status do Deploy:

Você pode verificar o status em:
- https://github.com/flameuss/gerador-ods/actions
- https://github.com/flameuss/gerador-ods/deployments

## 🆘 Troubleshooting:

### Se der erro de "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/flameuss/gerador-ods.git
```

### Se der erro de permissão:
```bash
# Configure suas credenciais
git config --global user.name "flameuss"
git config --global user.email "seu-email@example.com"
```

### Se o repositório já existir com conteúdo:
```bash
# Force o push (CUIDADO: sobrescreve o remoto)
git push -u origin main --force
```

## ✨ Próximos Passos:

1. ✅ Teste o site ao vivo
2. ✅ Compartilhe o link: https://flameuss.github.io/gerador-ods/
3. ✅ Adicione uma estrela ⭐ no repositório
4. ✅ Considere adicionar um README badge personalizado

## 📝 Para futuras atualizações:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O GitHub Pages atualizará automaticamente!

---

**Boa sorte com o deploy! 🎉**