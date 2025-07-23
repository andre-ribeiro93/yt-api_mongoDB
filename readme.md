# yt-api_mongoDB

## API do projeto yt-project_int.mongoDB

Inicialmente desenvolvida com banco de dados relacional (SQL), a API foi refatorada para utilizar MongoDB (NoSQL), visando maior flexibilidade escalabilidade e facilidade de hospedagem remota. Agora, a aplicação está pronta para ser executada e consumida fora da máquina local.


## 📦 Tecnologias utilizadas

  - Node.js

  - Express

  - MongoDB + Mongoose

  - dotenv

  - cors

  - bcrypt

  - jsonwebtoken


## ⚙️ Requisitos

Antes de começar, certifique-se de ter os seguintes recursos instalados em sua máquina:

  - Node.js

  - MongoDB (local ou Atlas)

  - npm


## 🚀 Instalação

1. Clone o repositório:

  git clone https://github.com/andre-ribeiro93/yt-api_mongoDB.git
  cd yt-api

2. Instale as dependências:

  npm install

3. Configure o arquivo .env:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

  SECRET=<your_secret_key_here>
  PORT=3333
  HOST_NAME=<your_database_username>
  HOST_PASSWORD=<your_database_password>
  HOST_CLUSTER=<your_mongodb_cluster>
  HOST_DATABASE=<your_database_name>
  MONGO_DB_PARAMS=retryWrites=true&w=majority


## ▶️ Executando a API

  npm run dev

O servidor será iniciado em: http://localhost:3333


## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Após o login, um token é gerado e deve ser enviado nas requisições protegidas através do header:

Authorization: Bearer <seu_token>


## 📡 Exemplos de Rotas
Usuário

  - POST /api/user/sign-up – Cadastro de novo usuário

  - POST /api/user/sign-in – Login do usuário e geração de token

  - GET /api/user/get-user – Retorna os dados do usuário autenticado

Vídeos

  - POST /api/videos/create-video – Upload/criação de novo vídeo (protegida)

  - GET /api/videos/get-videos – Lista os vídeos do usuário autenticado (protegida)

  - GET /api/videos/search – Busca vídeos públicos por palavra-chave (não autenticada)

  - DELETE /api/videos/delete-video/:video_id – Deleta um vídeo específico (protegida)


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.