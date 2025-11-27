# Compactação "On-the-fly" (Gzip)

**Objetivo:** Entender como servidores web não salvam arquivos .zip, mas compactam streams em tempo real. Quando o browser recebe HTML e vê `Content-Encoding: gzip` no header, significa que o servidor compactou o stream antes de enviar. Usando `zlib.createGzip()`, reduziremos drasticamente o tamanho transferido (transfer size) vs recurso original (resource size).

### Conceitos Aprendidos:
- **zlib.createGzip()**: Transform Stream que compacta dados
- **Content-Encoding: gzip**: Header HTTP para indicar compressão
- **Middleware de compressão**: Integração com expressões/servers
- **Eficiência de rede**: Como compactação reduz tráfego HTTP

### O que fazer:
1. **Pegar um servidor existente** (do projeto 3 ou 6) e adicionar compressão
2. **Inserir zlib.createGzip()** antes do `res.pipe()` no response
3. **Adicionar header** `res.setHeader('Content-Encoding', 'gzip')`
4. **Observar no navegador**: Network tab mostra transfer size << resource size

### Exercícios Sugeridos:
- Compare tamanho dos dados antes/depois da compressão
- Teste com arquivos grandes (imagens, vídeos, CSVs)
- Mida impacto no tempo de carregamento
- Implemente compressão condicional só para tipos específicos

### Dicas Técnicas:
- Não compactar arquivos já comprimidos (imagens JPEG, vídeos MP4)
- Use `zlib.createGunzip()` para descompactar se necessário
- Considere `zlib.createDeflate()` para compressão deflate (raramente usado hoje)
- Teste com diferentes nível de compressão se suportado

---

Para executar (implemente você mesmo!):
```bash
# Usar ou criar um servidor similar aos projetos 03 ou 06
npm init -y
npm install express @types/express typescript tsx
# etc...

# Adicionar ao seu server existente:
// Antes do pipe para response
const gzipStream = zlib.createGzip();
readable.pipe(gzipStream).pipe(res);

# Header obrigatório
res.setHeader('Content-Encoding', 'gzip');
res.setHeader('Content-Type', 'text/html'); // ou outro tipo
```

[Voltar ao README raiz](../README.md)
