# Transformação de Mídia (Hex Dumper - Bônus)

**Objetivo:** Análise visual de arquivos binários. Criar um comando no terminal similar ao `hexdump` do Linux. Para cada chunk binário recebido, converter cada byte em seu valor hexadecimal (255 → FF) e formatar a saída para legibilidade (16 bytes por linha). Útil para analisar arquivos BMP, JPEG, ou qualquer binário.

### Conceitos Aprendidos:
- **Manipulação de bytes e buffers**: Trabalhar com dados binários puros
- **Formatação hexadecimal**: Conversão byte → hex e apresentação organizada
- **Visualização de estrutura**: Analisar headers e estruturas de arquivo
- **Stream customizado**: Implementar Transform do zero

### O que fazer:
1. **Ler arquivos binários** via fs.createReadStream
2. **Transform customizado**: Extender Transform class e implementar `_transform` e `_flush`
3. **Converter para hex**: Cada byte → valor hexadecimal com padding (00-FF)
4. **Formatar saída**: 16 bytes por linha, semelhante ao hexdump

### Exercícios Sugeridos:
- Compare saída com `hexdump -C arquivo.jpg`
- Analise headers de arquivos BMP, JPEG, PNG
- Adicione representação ASCII ao lado dos hex values
- Mostre offsets (endereços) das linhas

### Dicas Técnicas:
- Use `chunk.map(byte => byte.toString(16).padStart(2, '0'))`
- Implemente `_flush()` para bytes restantes não múltiplos de 16
- Considere performance com arquivos muito grandes
- Exiba em stdout ou arquivo

---

Para executar (implemente você mesmo!):
```bash
# Similar ao comando hexdump
node dist/hexdump.js imagem.png

# Saída exemplo:
/*
00000000: 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52  .PNG........IHDR
00000010: 00 00 00 80 00 00 00 80 08 02 00 00 00 4b 7b 4e  ............K{N
00000020: c0 00 00 00 46 49 44 41 54 78 9c ec dd 07 7c 14  ....FIDATx...|.
// etc...
*/
```

Estrutura sugerida:
```javascript
class HexDumper extends Transform {
  constructor() {
    super({ readableObjectMode: false, writableObjectMode: false });
    this.offset = 0;
  }

  _transform(chunk, encoding, callback) {
    // Converter chunk para array de bytes
    // Agrupar em linhas de 16 bytes
    // Formatar hex + representação ASCII
    // Incrementar offset
  }
}

// Uso:
fs.createReadStream('arquivo.jpg')
  .pipe(new HexDumper())
  .pipe(process.stdout);
```

[Voltar ao README raiz](../README.md)
