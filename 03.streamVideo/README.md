# streamVideo

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

*Observação: Certifique-se de que o vídeo Sintel.mp4 esteja em ../00.resources/videos/ (exemplo: baixe de http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4)*

Para executar:
```bash
cd 03.streamVideo
npm install
npm start
```
Acesse `http://localhost:4000` para testar o streaming de vídeo.

---

[Voltar ao README raiz](../README.md)
