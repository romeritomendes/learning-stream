# Criptografia em Tempo Real (Binary Stream)

**Objetivo:** Explodir sua mente sobre o que é possível fazer com Transform Streams além de texto. Criar um "Cofre de Arquivos" que criptografa vídeos e outros binários enquanto lê, tornando-os impossíveis de abrir sem senha.

### Conceitos Aprendidos:
- **Transform Streams com dados binários**: Não apenas texto, mas Buffer/bytes
- **crypto.createCipheriv / createDecipheriv**: Módulo nativo do Node.js
- **Vetores de Inicialização (IV)**: Segurança adicional para criptografia
- **Streaming de arquivos grandes**: Processamento em tempo real

### O que fazer:
1. **Criptografar arquivos**: Ler um arquivo binário (vídeo, imagem, etc.), criptografá-lo em streaming e salvar como arquivo "quebrado"
2. **Descriptografar arquivos**: Ler o arquivo criptografado e restaurar o original
3. **Senha do usuário**: Solicitar senha via terminal (use readline ou process.argv)
4. **Fluxo**: `fs.readStream` → `Transform (criptografia)` → `fs.writeStream`

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

Para executar (implemente você mesmo!):
```bash
# Criar seu projeto TypeScript/Node.js
npm init -y
npm install --save-dev typescript tsx @types/node
# etc...

# Executar
node dist/encrypt.js input.mp4 output.enc
node dist/decrypt.js output.enc restored.mp4
```

[Voltar ao README raiz](../README.md)
