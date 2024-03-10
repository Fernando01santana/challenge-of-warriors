# Projeto

O presente projeto é composto por duas frentes:

## Front-end: VueJs

O front-end é escrito em VueJs e oferece uma interface amigável e responsiva para interação com o sistema.

## Back-end: NestJs, Redis e MongoDB

O back-end é construído com tecnologias como NestJs, Redis e MongoDB, fornecendo a lógica de negócios e gerenciando os dados.

### Bibliotecas Utilizadas

- **Ioredis:** Utilizado para manipular as informações no Redis.
- **Prisma:** ORM utilizado para realizar operações no banco de dados escolhido.
- **Class-validator:** Utilizada para validar os campos enviados presentes nos DTOs definidos.

### Virtualização

O back-end faz uso do Docker para a construção do container com Redis.

### Variáveis de Ambiente

Certifique-se de configurar corretamente as variáveis de ambiente:

- **DATABASE_URL:** Informe a URL de conexão com o cluster do MongoDB.
- **REDIS_PASSWORD:** Senha utilizada para conexão com o Redis.
- **REDIS_HOST:** Host/endereço necessário para conexão com o banco de dados Redis.
- **REDIS_USERNAME:** Usuário necessário para autenticação com o banco de dados Redis.
- **REDIS_PORT:** Porta necessária para conexão e autenticação com o banco de dados Redis.

### Mais sobre o Projeto

#### Arquitetura Aplicada

A arquitetura é modularizada, pensando em uma estrutura futura de microserviços. Essa abordagem visa separar a lógica de todos os módulos, facilitando o gerenciamento das squads e demandas.

#### TDD (Test-Driven Development)

O TDD é aplicado em quase todos os arquivos, buscando uma porcentagem mínima de 80%. Essa prática contribui para a qualidade do código, identificação precoce de problemas e manutenibilidade do sistema.

### Como executar ?

Na pasta front-end encontrara um redme contendo informacoes mais detalhadas sobre a sua construcao, em resumo execute os comandos a baixo:
```
$ npm install
$ npm run serve
```

Na pasta back-end encontrara um redme contendo informacoes mais detalhadas sobre a sua construcao, em resumo execute os comandos a baixo:
```
$ npm install
$ npx prisma generate
$ npm run prisma db push
$ npm run start:dev
```
### Imagens do projeto:
![Tela inicial](https://github.com/Fernando01santana/challenge-of-warriors/tree/master/images_project#:~:text=..-,1.png,-doc%3A%20upload%20images)
