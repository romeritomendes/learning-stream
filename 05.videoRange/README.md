# videoRange

**Objetivo:** Entender como implementar streaming de vídeo com suporte a range requests para permitir seek, pause e resume no player.

### Conceitos Aprendidos:
- Range requests HTTP e headers como `Range` e `Content-Range`
- Transmissão parcial de arquivos para players de vídeo
- Controle de buffer e otimização de bandwidth
- Pausar e retomar downloads automaticamente

### O que faz:
- Serve arquivos estáticos para a página HTML
- Servidor que responde a requests com `Range` header usando chunks de 1MB (configurável via constante CHUNK_SIZE)
- Transmite apenas as partes solicitadas do vídeo
- Suporte a seek forward/backward no player
- Demonstra pause/resume dinâmico do streaming
- Página HTML com player de vídeo tocando o stream

*Observação: Certifique-se de que o vídeo Sintel.mp4 esteja em ../00.resources/videos/ (exemplo: baixe de http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4)*

Para executar:
```bash
cd 05.videoRange
npm install
npm start
```
Acesse `http://localhost:4000` para testar o streaming de vídeo com range requests.

---

[Voltar ao README raiz](../README.md)
