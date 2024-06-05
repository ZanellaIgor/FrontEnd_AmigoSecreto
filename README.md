# Amigo Secreto - Sistema de Sorteio Dinâmico

Projeto desenvolvido durante o curso da B7Web. Com um Front-End desenvolvido em Next.js, e um Backend Utilizando nodeJs com Prisma.
O sistema permite o cadastro de eventos de sorteio, que podem ser separados por grupos, ou não e também o cadastro de participantes com cpf para identificação, após isso, é possível realizar o sorteio, e após a geração do evento, é possível enviar o link para cada participante que devem digitar seu CPF para ter acesso à pessoa que tiraram no Amigo Secreto.

### Tecnologias Utilizadas no Front-End

-ReactJs
-NextJs
-Typescript
-TailwindCSS

## Primeiros Passos

Para iniciar, execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

**OBS: Para executar este projeto completamente, é necessário baixar também o projeto Backend da aplicação, responsável pelo CRUD no banco de dados.**
**Você pode baixar o projeto na área de repositórios do meu portfólio.**

**OBS²: Para fazer o login é necessário informar a data atual, por exemplo, no dia 31/12/2025 deve ser digitado "31122025".**

## Saiba Mais

Para dúvidas sobre o nextJs consulte a documentação.

- [Next.js Documentation](https://nextjs.org/docs) - conheça os recursos e APIs do Next.js.
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js.

## ⏭️ Próximos passos

Os proximos passos para o projeto seria a utilização de cache, para melhorar o desempenho da aplicação, e evitar consultas desnecessárias.
