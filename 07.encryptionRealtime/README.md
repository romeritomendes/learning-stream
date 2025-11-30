# Criptografia em Tempo Real (Binary Stream)

**Objetivo:** Explodir sua mente sobre o que é possível fazer com Transform Streams além de texto. Criar um "Cofre de Arquivos" que criptografa vídeos e outros binários enquanto lê, tornando-os impossíveis de abrir sem senha.

### Conceitos Aprendidos:
- **Transform Streams com dados binários**: Não apenas texto, mas Buffer/bytes
- **crypto.createCipheriv / createDecipheriv**: Módulo nativo do Node.js
- **Vetores de Inicialização (IV)**: Segurança adicional para criptografia
- **Streaming de arquivos grandes**: Processamento em tempo real

### O que fazer (Versão CLI Original):
1. **Criptografar arquivos**: Ler um arquivo binário (vídeo, imagem, etc.), criptografá-lo em streaming e salvar como arquivo "quebrado"
2. **Descriptografar arquivos**: Ler o arquivo criptografado e restaurar o original
3. **Senha do usuário**: Solicitar senha via terminal (use readline ou process.argv)
4. **Fluxo**: `fs.readStream` → `Transform (criptografia)` → `fs.writeStream`

### O que fazer (Versão Web API - Aplicação Real):
Para tornar este aprendizado mais prático para uso real, implemente também uma versão web que simule um "cofre online de arquivos". Isso mostra como criptografia de streams é comum em APIs servidor-side para processar uploads seguros.

1. **Configurar servidor web**:
   - Instale `express` e `multer` no projeto
   - Configure um servidor Express básico (similar a exercícios anteriores como upload simples)

2. **Rota `/encrypt` (POST)**:
   - Receber upload de arquivo via Multer
   - Pegar senha via form-data ou JSON
   - Gerar IV aleatório
   - Criar Transform stream que criptografa dados binários em tempo real
   - Preencher arquivo criptografado com IV nos primeiros 16 bytes
   - Retornar arquivo criptografado como download para o cliente

3. **Rota `/decrypt` (POST)**:
   - Receber arquivo criptografado via upload
   - Pegar senha
   - Ler primeiros 16 bytes como IV
   - Criar Transform stream para descriptografia
   - Enviar arquivo descriptografado como download

4. **Interface de teste**:
   - Crie `public/index.html` com formulários HTML simples
   - Formulário para encrypt: input file + input password
   - Formulário para decrypt: input file + input password
   - Use fetch() ou submit form para testar as APIs

5. **Dicas de implementação**:
   - Use `crypto.createCipheriv('aes-256-cbc', senha, iv)` para criptografia
   - Para downloads: `res.setHeader('Content-Type', 'application/octet-stream')` e pipe o stream de saída
   - Teste com vídeos grandes para ver streams trabalhando

6. **Tratamento de Erros**:
   - **Erro senha incorreta (descriptografia)**: Crypto lança erro quando IV/chave inválidos. Capture no `transformStream.on('error', ...)` e retorne resposta HTTP 400 ao cliente
   - **Arquivo corrompido mesclado**: Verificar se primeiros 16 bytes são IV válido (Buffer.length >=16) antes de criar decipher
   - **Validação frontend**: Min length senha (ex: 8 chars), regex para强度; retornar mensagens claras ex "Senha deve ter pelo menos 8 caracteres"
   - **Time-outs de upload**: Multer pode timeout; configure `req.setTimeout()` ou início de pipe em event 'started'
   - **Limpeza temp failure**: Warning apenas, pois file já processado; log para Solo monitore

Esta versão web beneficia aplicações reais como:
- Upload seguro de arquivos confidenciais
- Compartilhamento temporário de conteúdo protegido
- APIs de backup com criptografia client-side/server-side

### Exercícios Sugeridos:
- Teste com vídeos MP4
- Experimente diferentes algoritmos de criptografia
- Meça performance com arquivos grandes
- Compare tamanho antes/depois

### Dicas Técnicas:
- Use `crypto.randomBytes(16)` para gerar IV aleatório
- Armazene o IV junto com o arquivo criptografado (nos primeiros 16 bytes)
- Para descriptografar, extraia o IV primeiro antes de processar o stream

---

---

## Implementação Completa

Se já implementou, o projeto inclui:

### Arquivos Implementados:
- **`src/BO/cripter.ts`**: Classe `Encryptor` com métodos `encryptStream(password)` e `decryptStream(password)` retornando Transform streams AES-256-CBC
- **`src/index-cli.ts`**: CLI para encrypt/decrypt files com argumentos (`-c` encrypt, `-d` decrypt)
- **`src/index.ts`**: Servidor Express com rotas `/encrypt` e `/decrypt` via Multer (form-data)
- **`public/index.html`**: Interface web básica (forms para upload + senha)
- **`package.json`**: Configurado com dependências Express, Multer, CORS
- **`tsconfig.json`**: TypeScript configurado para JS ES modules

### Setup & Dependências:
```bash
# Instalar tudo (baseado no package.json)
npm install
```

### Executar CLI (via src/index-cli.ts):
```bash
# Garantir que orig/ e dest/ existem
mkdir -p orig dest

# Encrypt:arquivo .txc —, exemplo
npx tsx src/index-cli.ts -c orig/test.txt

# Output: dest/test.txt.enc

# Decrypt: 
npx tsx src/index-cli.ts -d dest/test.txt.enc

# Output: dest/test.txt original
```

### Executar Web API (via src/index.ts):
```bash
# Servidor na porta 4000
npx tsx src/index.ts
# ou npm run dev (se configurado no package.json)

# Abra http://localhost:3000/public/index.html
# Upload file + senha → download encrypted/decrypted
```

### Pré-requisitos para Teste:
- Files de teste em `orig/` (CLI) ou upload via browser
- Creez `tmp/` para temporários do Multer (já auto-limpado)
- Porta 4000 livre (configure PORT se quiser)

### Debugging Commum:
- **Erro AES**: Senha incorreta na descriptografia? Output mexido
- **Memory**: Arquivo > 50MB crasha (áumente limits no Multer)
- **Temp cleanup**: Falha ao remover arquivo temp? Apenas warning, OK
- **Streams**: Primeiro chunk descrypt deve ter ≥16 bytes + dados

---

Para executar (implemente você mesmo!):

**Dependências base (CLI e Web):**
```bash
# Criar seu projeto TypeScript/Node.js
npm init -y
npm install --save-dev typescript tsx @types/node
```

**Dependências adicionais (apenas para versão web):**
```bash
npm install express multer
npm install --save-dev @types/express @types/multer
```

**Executar CLI:**
```bash
node dist/encrypt.js input.mp4 output.enc
node dist/decrypt.js output.enc restored.mp4
```

**Executar Web API:**
```bash
# Implemente primeiro o servidor em src/index.ts
npm run dev  # ou tsx src/index.ts
# Abra http://localhost:3000 no navegador
# Teste via formulários HTML ou API direta (curl, fetch, etc.)
```

[Voltar ao README raiz](../README.md)
