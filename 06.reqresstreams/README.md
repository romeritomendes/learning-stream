# reqresstreams

**Objetivo:** Explorar como requests e responses HTTP são streams no Node.js.

### Importante:
Este projeto expande o conhecimento adquirido nos projetos 01 (uploadSimples), 03 (streamVideo) e 04 (uploadStreamBody), onde aprendemos o uso básico de req como readable stream (via req.pipe() para storage) e res como writable stream (via originFile.pipe(res) para transmissão). Aqui, avançamos para manipulação direta de streams HTTP, transformações em tempo real, integração com outros streams e aplicações bidirecionais.

### Conceitos Aprendidos:
- Request (req) como readable stream
- Response (res) como writable stream
- Manipulação direta de streams HTTP
- Pipeline de streams entre client e server

### O que fará:
- Demonstrações de como req.pipe() e res.end() funcionam
- Exemplos de transformação de dados em tempo real
- Integração com outros streams do sistema
- Processamento de corpos multipart com múltiplos campos usando streams

### Implementações:
- **`/pipe`** (Demonstração 1): Transformação básica – recebe dados via `req.pipe()`, transforma texto para maiúsculo usando Transform stream e retorna via `res`.
- **`/transform`** (Demonstração 2): Compressão em tempo real – recebe dados binários, aplica compressão gzip usando `Zlib.createGzip()` e retorna arquivo .gz comprimido.
- **`/merge`** (Demonstração 3): Integração com streams – recebe dados via `req.pipe()` e os anexa a um arquivo existente usando `fs.createWriteStream`.
- **`/multi`** (Demonstração 4): Processamento multipart – recebe `multipart/form-data` com campos de texto e arquivos, processa usando `busboy` e streams, salva arquivos em disco e loga campos.

---

[Voltar ao README raiz](../README.md)
