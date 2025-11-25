# uploadSimples

**Objetivo:** Entender uploads básicos de arquivos usando bibliotecas de terceiros.

### Conceitos Aprendidos:
- Uso do Multer para lidar com uploads multipart/form-data
- Como o Multer processa arquivos em streams internamente
- Servir arquivos estáticos com Express
- Estrutura básica de um servidor de upload

### O que faz:
- Servidor Express que recebe uploads via formulário HTML
- Usa Multer para processar arquivos enviados
- Exibe headers e informações do arquivo no console
- Servir o formulário através de `/form`

Para executar:
```bash
cd 01.uploadSimples
npm install
npm start
```
Acesse `http://localhost:4000/form` para testar o upload.

---

[Voltar ao README raiz](../README.md)
