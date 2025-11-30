# Custom Storage Multer com Processamento Realtime

**Objetivo:** Criar um custom storage para Multer que faz upload e processamento simultâneo de arquivos XLSX/CSV grandes. O mesmo sistema que armazena no bucket AWS também insere os dados linha por linha no banco de dados.

### Conceitos Aprendidos:
- **Custom Multer Storage**: Implementar `multer.StorageEngine`
- **Streams com arquivos grandes**: Processamento em tempo real de XLSX/CSV
- **AWS S3**: Armazenamento de arquivos via streams
- **Inserção em DB linha a linha**: Evitar carregar tudo na memória
- **Token JWT ou similar**: Controle de sessão/autenticação

### O que fazer:

1. **Configurar projeto web**:
   - Instalar `express`, `multer`, `multer-s3`, `xlsx`, `csv-parser`
   - Para DB, usar `@types/pg` ou `mongoose` (escolha one)
   - Dependências AWS: `aws-sdk` ou `@aws-sdk/client-s3`

2. **Criar servidor Express básico**:
   - Rota `POST /upload` para processar o arquivo
   - Campo `file` para XLSX/CSV
   - Campo `tableName` ou similar para escolher tabela DB

3. **Implementar Multer Custom Storage**:
   - Criar classe que extende `multer.StorageEngine`
   - Método `_handleFile`: Recebe stream do arquivo, faz duas coisas:
     - **Branch 1**: Pipe para stream que processa linhas e insere na DB
     - **Branch 2**: Pipe para S3 via `multer-s3` ou stream direto

4. **Processamento de XLSX/CSV**:
   - Para XLSX: Usar workbook.streams (requetes) para stream de linhas
   - Para CSV: `csv-parser` já é streaming
   - Para cada linha, validar e inserir na DB (em batch ou uma por uma)

5. **Armazenamento no S3**:
   - Upload paralelo via stream
   - Retornar URL do arquivo após upload sucesso

6. **Interface de teste**:
   - `public/index.html` com formulário
   - Input file, select para tipo (XLSX/CSV), input table name
   - Após upload, mostrar URL do S3 e quantidade de linhas inseridas

7. **Requisitos avançados**:
   - Validação de dados (schemaless ou typed)
   - Tratamento de erros (linha inválida, DB falha)
   - Progress indicator no frontend (WebSockets ou polling)

### Dependências sugeridas:
- Express, Multer, Multer-S3 ou AWS SDK
- XLSX library (planilha streams), csv-parser
- DB driver (pg para Postgres, mysql2 para MySQL)
- Dotenv para config AWS

### Como executar:
```bash
npm init -y
npm install express multer multer-s3 aws-sdk xlsx csv-parser dotenv # etc
npm run dev # implementar o servidor primeiro
```

### Dicas Técnicas:
- Use streams para tudo: arquivo não carrega na memória
- Para duplex stream custom: implementar proper pipe handling
- AWS S3: configure bucket público ou use signed URLs
- DB: use transações para atomicidade (multiple inserts)
- Teste com arquivos grandes (100k+ linhas)

Benefícios no mundo real: Importações bulk de dados empresariais, evitando overload de memória e downtime quando DB fica offline durante upload.
