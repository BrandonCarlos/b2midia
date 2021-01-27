<p align="center">
    <img src="/assets/imagemb2.PNG" alt="Logo">
</p>

<p align="center">
  <a href="#bookmark-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#open_file_folder-iniciando">Iniciando</a>
</p>

## :bookmark: Sobre

O projeto **B2 Mídia** é um marketplace, servindo de intermediário entre cliente e vendedor, como Mercado Livre, Amazon, etc.

## :rocket: Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [Express](https://expressjs.com/pt-br/)
- [JavaScript](https://www.javascript.com/)
- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Nodemon](https://nodemon.io/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [PostgreSQL](https://www.postgresql.org/)

Outras bibliotecas usadas no desenvolvimento do projeto.

<blockquote>bcryptjs, faker, method-override, browser-sync, npm-run-alll</blockquote>

## :open_file_folder: Iniciando

1. Clonar o repositório:
`git clone https://github.com/BrandonCarlos/b2midia`

2. Entrar no diretório:
`cd b2midia`

3. Instalar as dependências:
`npm install`

4. Configurar o PostgreSQL:
```
user: "user-name",
password: "",
host:"localhost",
port: 5432,
database: "database-name"
```

5. Rodar as queries do arquivo database.sql no PostgreSQL:
`database.sql`

6. Iniciar o projeto:
`npm start`

7. Popular o bd com novos produtos e usuários (opcional):
`node seed.js`

8. Esqueceu a senha? graças ao mailer.js dependência que nos auxilia na troca de senha
``` 
https://mailtrap.io/inboxes
Add Inbox - teste 
Config - Integrations - NodeJS - NodeMailer
Copiar "User" e "Pass"
No VsCode ir no arquivo Mailer.js
E Substituir no "User" e "Pass"
Pronto pode solicitar a senha novamente

```

##

