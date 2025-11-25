# uploadStreamBody

**Objetivo:** Aprender a fazer upload diretamente através de streams, sem intermediários.

### Conceitos Aprendidos:
- Streaming direto do corpo da requisição HTTP
- Uso de `req.pipe()` para redirecionar streams
- Upload sem bibliotecas como Multer
- Diferença entre formulários tradicionais e streaming direto

### O que faz:
- Recebe arquivos através de POST direto (não multipart)
- Usa JavaScript no frontend para enviar apenas o arquivo como body
- Redireciona o stream da requisição diretamente para disco
- Demonstra eficiência para arquivos grandes

Para executar:
```bash
cd 04.uploadStreamBody
npm install
npm start
```
Acesse `http://localhost:4000` para testar o upload via fetch.

---

[Voltar ao README raiz](../README.md)
