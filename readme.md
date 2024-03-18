# Brain Agriculture

Olá, esta api tem como objetivo gerenciar produtores rurais e expor uma rota para que sejam criados dashboards.


## Passos Iniciais

Realize o clone desse repositório

    git clone git@github.com:ItaloLeandro02/brain-agriculture.git

 Realize a instalação das dependências


    npm i

 Crie um arquivo .env


    echo "PORT=5050" >> .env
    echo "POSTGRES_URL=postgres://postgres:12345@localhost" >> .env
    echo "POSTGRES_URL_TEST=postgres://postgres@localhost:5555" >> .env

Rode o comando para buildar e subir à aplicação por meio do docker

    npm run up

## Executando Testes

> **Obs:** Por conta da biblioteca **@shelf/jest-postgres** pode ser que os testes exibam um erro ao serem executados. Basta rodarem os testes novamente que serão executados com sucesso. Pode ser solicitado a senha root antes da execução dos testes a mesma deve ser informada para que os testes continuem. Caso seja exibida constantemente uma mensagem de erro, basta acessar o arquivo **jest-postgres-config.js** e alterar os parâmetros **includeInstallation** e **debugMode** para true. Todos esses pontos podem ser encontrados na [página da biblioteca](https://github.com/shelfio/jest-postgres)

Geral com coverage

    npm run test:ci

Testes unitários

    npm run test:unit

Testes de integração

    npm run test:integration

## Ferramentas utilizadas
 - Express
 - Knexjs
 - Swagger
 - Eslint
 - In-Memory Postgres
 - Husky
 - Lint-Staged
 - Supertest
 - Faker
 - Coveralls
 - Jest
 - Docker
 - Module-Alias
 - CPF CNPJ Validator
