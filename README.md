# File Streaming Learning Project

Este repositório contém exemplos passo-a-passo para entender como funciona o streaming de arquivos em Node.js. Cada projeto apresenta um conceito fundamental, progredindo de uploads simples até técnicas avançadas de streaming.

Os projetos seguem uma ordem lógica para construir o conhecimento:

## Projetos

1. [01.uploadSimples](./01.uploadSimples/README.md) - Entender uploads básicos de arquivos usando bibliotecas de terceiros.
2. [02.copyFile](./02.copyFile/README.md) - Aprender a usar streams do Node.js para copiar arquivos eficientemente.
3. [03.streamVideo](./03.streamVideo/README.md) - Entender como transmitir streaming de mídia (vídeos) para o frontend.
4. [04.uploadStreamBody](./04.uploadStreamBody/README.md) - Aprender a fazer upload diretamente através de streams, sem intermediários.
5. [05.videoRange](./05.videoRange/README.md) - Entender como implementar streaming de vídeo com suporte a range requests.
6. [06.reqresstreams](./06.reqresstreams/README.md) - Explorar como requests e responses HTTP são streams no Node.js.

Consulte o README.md de cada projeto para informações detalhadas sobre conceitos, implementação e instruções de execução.

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
