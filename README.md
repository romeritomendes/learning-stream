# File Streaming Learning Project

Este repositório contém exemplos passo-a-passo para entender como funciona o streaming de arquivos em Node.js. Cada projeto apresenta um conceito fundamental, progredindo de uploads simples até técnicas avançadas de streaming.

Os projetos seguem uma ordem lógica para construir o conhecimento:

## 01. uploadSimples
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

## 02. copyFile
**Objetivo:** Aprender a usar streams do Node.js para copiar arquivos eficientemente.

### Conceitos Aprendidos:
- `fs.createReadStream()` para ler arquivos em chunks
- `fs.createWriteStream()` para escrever dados em fluxo
- Evento `'data'` dos streams
- Método `.pipe()` para conectar streams
- Vantagens de streams para arquivos grandes (não carrega tudo na memória)

### O que faz:
- Lê um arquivo da pasta `origin` em streams
- Escreve para a pasta `destination`
- Conta e exibe o números de bytes copiados
- Demonstra o fluxo de dados através de `.pipe()`

*Observação: Crie as pastas `origin` e `destination` e coloque um arquivo na pasta `origin` para testar a cópia em streams.*

Para executar:
```bash
cd 02.copyFile
npm install
npm start
```

---

## 03. streamVideo
**Objetivo:** Entender como transmitir streaming de mídia (vídeos) para o frontend.

### Conceitos Aprendidos:
- Streaming de arquivos binários grandes
- Transmissão eficiente de conteúdo multimídia
- Headers apropriados para streaming (Content-Type)
- Servir streams diretamente para o navegador

### O que faz:
- Serve arquivos estáticos para a página HTML
- Endpoint `/video` que lê e transmite vídeo MP4 em streams
- Página simples com player de vídeo HTML5 tocando o stream
- Demonstra transmissão básica de mídia sem carregar o vídeo inteiro na memória

*Observação: Crie a pasta `videos` e coloque um arquivo MP4 (exemplo: baixe Sintel.mp4 de http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4)*

Para executar:
```bash
cd 03.streamVideo
npm install
npm start
```
Acesse `http://localhost:4000` para testar o streaming de vídeo.

---

## 04. uploadStreamBody
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

## Conceitos Gerais sobre Streaming

Após explorar todos os projetos, você terá compreendido:

1. **Eficiência de Memória**: Streams processam dados em pedaços, não carregando tudo na memória
2. **Pipeline de Streams**: Como encadear streams com `.pipe()`
3. **Eventos de Stream**: `'data'`, `'end'`, `'error'`
4. **Streams HTTP**: Request e response como streams
5. **Uso em Uploads**: Diferenças entre métodos tradicionais vs streaming
6. **Aplicações Reais**: Arquivos grandes, vídeo, dados em tempo real

Cada projeto constrói sobre o anterior, proporcionando uma compreensão gradual dos streams em Node.js.
