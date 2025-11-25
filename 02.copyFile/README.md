# copyFile

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

[Voltar ao README raiz](../README.md)