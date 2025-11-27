# Streams em "Object Mode" (ETL - Data Engineering)

**Objetivo:** Entrar no mundo dos bancos de dados e processamento massivo. Usando `objectMode: true`, streams passam de buffers/strings para objetos JavaScript. Criar um "Importador de CSV Gigante" que processa arquivos de 2GB+ linha por linha (sem carregar na memória), converte em objetos JSON, sanitiza dados e prepara para inserção simulada no banco.

### Conceitos Aprendidos:
- **`objectMode: true`**: Streams para objetos JavaScript ao invés de buffers
- **Processos ETL (Extract, Transform, Load)**: Engenharia de dados massiva
- **Transformação customizada**: Quebrar linhas, converter tipos, sanitização
- **Pipeline complexo**: Múltiplas transformations em sequência

### O que fazer:
1. **Readable**: Lê arquivo CSV cru (bytes) e quebra em linhas (cuidado com chunks que cortam linhas no meio!)
2. **Transform 1 (Buffer → Linha)**: Converte chunks de bytes em strings de linha completa
3. **Transform 2 (String → Objeto - objectMode)**: Faz split por vírgula, cria objetos `{nome, email, etc.}`
4. **Transform 3 (Sanitização)**: Formata emails (lowercase), remove espaços, valida dados
5. **Writable**: Simula INSERT no banco (console.log por enquanto)

### Exercícios Sugeridos:
- Teste com CSVs de 1GB+ (crie arquivos grandes de teste)
- Adicione validação de tipos de dados (datas, números)
- Implemente error handling para linhas malformadas
- Mida performance e uso de memória

### Dicas Técnicas:
- Use `_flush()` para processar linhas parciais no final do stream
- Configure `objectMode: true` em streams que trabalham com objetos
- Crie classes customizadas extendendo Transform
- Considere performance: batch inserts em vez de linha por linha

---

Para executar (implemente você mesmo!):
```bash
# Criar CSV de teste grande
node generate-big-csv.js > data.csv

# Executar ETL
node dist/etl.js data.csv

# Observe: objetos sendo processados linha por linha
```

Estrutura de código sugerida:
```javascript
// Transform que converte buffer para linha
class BufferToLine extends Transform {
  constructor() { super({ objectMode: false }); }
  _transform(chunk, enc, cb) { /* lógica de quebra de linha */ }
}

// Transform que converte linha para objeto
class LineToObject extends Transform {
  constructor() { super({ objectMode: true }); }
  _transform(line, enc, cb) { /* split, validação */ }
}

// Writable que simula banco
class DatabaseWriter extends Writable {
  constructor() { super({ objectMode: true }); }
  _write(obj, enc, cb) { console.log('INSERT:', obj); }
}
```

