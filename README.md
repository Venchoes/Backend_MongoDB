# Backend_MongoDB

Backend completo em Node.js (TypeScript) + Express + MongoDB com autenticação JWT, seguindo arquitetura de camadas.

## 📋 Funcionalidades

### Rotas Públicas
- **POST /register** - Cadastro de usuário com validações (nome, e-mail, senha)
- **POST /login** - Autenticação e geração de token JWT

### Rotas Protegidas
- **GET /protected** - Acesso autorizado apenas com token JWT válido

## 🏗️ Arquitetura

```
src/
├── controllers/    # Lógica de requisição/resposta
├── services/       # Regras de negócio
├── models/         # Schemas do MongoDB (Mongoose)
├── routes/         # Definição de rotas
├── middlewares/    # Auth, validação, error handling
├── database/       # Conexão com MongoDB
├── utils/          # Logs, JWT, exceções
├── types/          # Interfaces TypeScript
└── config/         # Configurações de ambiente
```

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js v14+
- MongoDB local ou MongoDB Atlas

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Venchoes/Backend_MongoDB.git
cd Backend_MongoDB/Backend_MongoDB

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

### Configuração do .env

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET=sua_chave_secreta_super_segura
NODE_ENV=development
```

### Executar

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

A API estará disponível em `http://localhost:3000`

## 📦 Testando os Endpoints

### Importar no Insomnia/Postman

1. Abra o Insomnia
2. Application → Preferences → Data → Import Data
3. Selecione o arquivo `requests/requests.yaml`
4. Ajuste a variável `base_url` no ambiente

### Exemplos de Requisição

**Cadastro**
```bash
POST /register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "SenhaSegura123!"
}
```

**Login**
```bash
POST /login
Content-Type: application/json

{
  "email": "joao.silva@example.com",
  "password": "SenhaSegura123!"
}
```

**Acesso Protegido**
```bash
GET /protected
Authorization: Bearer <seu_token_jwt>
```

## 📝 Status HTTP e Respostas

### Cadastro (/register)
- ✅ **201** - Usuário criado com sucesso
- ❌ **409** - E-mail já existente
- ❌ **422** - Dados inválidos (nome, e-mail ou senha)

### Login (/login)
- ✅ **200** - Login bem-sucedido (retorna token)
- ❌ **400** - Requisição mal formatada
- ❌ **401** - Senha incorreta
- ❌ **404** - Usuário não encontrado

### Rota Protegida (/protected)
- ✅ **200** - Acesso autorizado
- ❌ **401** - Token não fornecido ou inválido

## 🔒 Segurança

- Senhas hashadas com `bcrypt` (salt rounds: 10)
- Tokens JWT com expiração de 1 hora
- Validação de e-mail e senha (tamanho mínimo, formato)
- Middleware de autenticação para rotas protegidas
- Error handling centralizado

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **winston** - Logging
- **express-validator** - Validação de entrada

## 📊 Logs

Logs são salvos em:
- `combined.log` - Todos os logs
- `error.log` - Apenas erros
- Console - Logs em tempo real (desenvolvimento)

## 🌐 Deploy

### MongoDB Atlas (Produção)
1. Crie um cluster no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Obtenha a connection string
3. Atualize `MONGODB_URI` no ambiente de produção

### Vercel/Render
Configure as variáveis de ambiente no painel da plataforma:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

## 📄 Licença

ISC
