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

### Próximos Projetos Avançados (Transform Streams)

7. **Criptografia em Tempo Real (Binary Stream)** - O poder dos Transform Streams brilha com dados binários. Ao invés de substituir texto, vamos transformar bytes legíveis em dados criptografados, como em túneis VPN/SSH. Usando `crypto.createCipheriv` e `crypto.createDecipheriv` com vetores de inicialização (IV), criaremos um "Cofre de Arquivos" que criptografa vídeos e outros binários enquanto lê, tornando-os impossíveis de abrir sem a senha.
#TODO

8. **Compactação "On-the-fly" (Gzip)** - Servidores não salvam arquivos .zip, mas compactam streams em tempo real como o browser mostra em `Content-Encoding: gzip`. Usando `zlib.createGzip()`, vamos adicionar uma camada de compressão aos nossos servidores HTTP existentes, reduzindo drasticamente o tamanho dos dados transferidos na rede (transfer size vs resource size no Network tab).
#TODO

9. **Streams em "Object Mode" (ETL - Data Engineering)** - Saindo do mundo de arquivos e entrando em bancos de dados. Com `objectMode: true`, streams podem processar objetos JavaScript. Criaremos um "Importador de CSV Gigante" que lê CSVs de 2GB+ linha por linha (sem carregar na memória), converte em objetos JSON, sanitiza dados (formatação de emails, limpeza) e prepara para salvar em bancos simulados.
#TODO

10. **Transformação de Mídia (Hex Dumper - Bônus)** - Para visualização, manipularemos estruturas de arquivos binários criando um comando similar ao `hexdump` do Linux. Transformaremos cada byte em valores hexadecimais (255 → FF) e formatarão a saída para legibilidade (16 bytes por linha), analisando arquivos como imagens via terminal.
#TODO

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

### Conceitos Avançados (Transform Streams)

Ao avançar para os próximos projetos, você explorará conceitos mais sofisticados:

7. **Transform Streams**: Como uma esteira industrial - dados entram, são modificados e saem transformados (não apenas texto, mas dados binários e objetos)
8. **Streams Binários**: Trabalhar com Buffer e bytes (criptografia, compressão, manipulação de mídia)
9. **Object Mode**: Configurar `objectMode: true` para processar objetos JavaScript ao invés de buffers/strings
10. **Processos ETL**: Extract, Transform, Load - pipelining para processamento de dados massivos (CSV, bancos de dados)
11. **Implementação Customizada**: Métodos `_transform()` e `_flush()` para criar suas próprias transformações
12. **Aplicações Avançadas**: VPN/SSH tunnels (criptografia), compactação web (gzip), engenharia de dados, visualização hexadecimal

Cada projeto constrói sobre o anterior, proporcionando uma compreensão gradual dos streams em Node.js.
