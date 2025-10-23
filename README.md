# Backend_MongoDB - Task Manager API

#video do youtube: https://www.youtube.com/watch?v=8roSmcjYvPM

Backend completo em Node.js (TypeScript) + Express + MongoDB com autenticação JWT e gerenciamento de tarefas, seguindo arquitetura de camadas.

## 📋 Funcionalidades

### Rotas Públicas
- **POST /api/auth/register** - Cadastro de usuário com validações
- **POST /api/auth/login** - Autenticação e geração de token JWT

### Rotas Protegidas (Requerem JWT)
- **GET /api/protected** - Rota de teste protegida

### CRUD de Tarefas (Requer JWT)
- **POST /api/tasks** - Cria uma nova tarefa
- **GET /api/tasks** - Lista todas as tarefas do usuário autenticado
- **GET /api/tasks?status=pending** - Lista tarefas filtradas por status
- **GET /api/tasks?priority=high** - Lista tarefas filtradas por prioridade
- **GET /api/tasks?search=palavra** - Busca tarefas por texto
- **GET /api/tasks/:id** - Retorna detalhes de uma tarefa
- **PUT /api/tasks/:id** - Atualiza todos os dados de uma tarefa
- **PATCH /api/tasks/:id** - Atualiza parcialmente uma tarefa
- **DELETE /api/tasks/:id** - Remove uma tarefa

## 🏗️ Arquitetura

```
api/
├── controllers/    # Lógica de requisição/resposta
│   ├── auth.controller.ts
│   ├── task.controller.ts
│   └── protected.controller.ts
├── services/       # Regras de negócio
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── task.service.ts
├── models/         # Schemas do MongoDB (Mongoose)
│   ├── user.model.ts
│   └── task.model.ts
├── routes/         # Definição de rotas
│   ├── auth.routes.ts
│   ├── task.routes.ts
│   └── protected.routes.ts
├── middlewares/    # Auth, validação, error handling
│   ├── auth.middleware.ts
│   ├── taskValidation.middleware.ts
│   ├── validation.middleware.ts
│   └── errorHandler.middleware.ts
├── database/       # Conexão com MongoDB
│   └── connection.database.ts
├── utils/          # Logs, JWT, exceções
│   ├── logger.util.ts
│   ├── jwt.util.ts
│   └── exceptions.util.ts
├── types/          # Interfaces TypeScript
│   ├── index.ts
│   └── task.types.ts
└── config/         # Configurações de ambiente
    └── env.config.ts
```

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js v14+
- MongoDB local ou MongoDB Atlas

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Venchoes/Backend_MongoDB.git
cd Backend_MongoDB

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

### Configuração do .env

```env
PORT=3000
MONGODB_URI_LOCAL=mongodb://root:example@localhost:27017/my-database?authSource=admin
MONGODB_URI_ATLAS=sua_connection_string_do_atlas
MONGODB_DUAL_SYNC=false
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

### Importar no Insomnia

1. Abra o Insomnia
2. Application → Preferences → Data → Import Data
3. Selecione o arquivo `requests/requests.yaml`
4. Configure as variáveis de ambiente:
   - `base_url`: http://localhost:3000/api
   - `token`: (será preenchido após login)
   - `task_id`: (será preenchido após criar tarefa)

### Fluxo de Teste Completo

1. **Registrar usuário** → Pegue o `token` da resposta
2. **Login** → Atualize o `token` no ambiente
3. **Criar tarefa** → Pegue o `_id` da resposta
4. **Atualizar `task_id`** no ambiente
5. **Testar todas as operações CRUD**

## 📝 Exemplos de Requisições

### Criar Tarefa
```bash
POST /api/tasks
Authorization: Bearer <seu_token>
Content-Type: application/json

{
  "title": "Implementar autenticação",
  "description": "Adicionar middleware de JWT",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2025-10-30T23:59:59Z"
}
```

### Listar Tarefas com Filtros
```bash
GET /api/tasks?status=pending&priority=high&search=projeto
Authorization: Bearer <seu_token>
```

### Atualizar Parcialmente
```bash
PATCH /api/tasks/:id
Authorization: Bearer <seu_token>
Content-Type: application/json

{
  "status": "completed"
}
```

## 🔒 Segurança

- ✅ Senhas hashadas com `bcrypt`
- ✅ Tokens JWT com expiração de 1 hora
- ✅ Validação de entrada de dados
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Isolamento de dados por usuário (cada usuário vê apenas suas tarefas)
- ✅ Proteção contra acesso não autorizado (403)
- ✅ Validação de ObjectIds do MongoDB
- ✅ Error handling centralizado

## 📊 Status HTTP

### Tasks
- **201** - Tarefa criada com sucesso
- **200** - Operação bem-sucedida
- **204** - Tarefa deletada com sucesso
- **400** - Dados inválidos
- **401** - Token não fornecido ou inválido
- **403** - Acesso negado (tarefa de outro usuário)
- **404** - Tarefa não encontrada
- **422** - Erro de validação
- **500** - Erro interno do servidor

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **winston** - Logging
- **express-validator** - Validação de entrada

## 🎯 Funcionalidades Implementadas

### MVP Completo
- ✅ CRUD completo de tarefas
- ✅ Autenticação JWT
- ✅ Filtros de busca (status, priority, search)
- ✅ Isolamento de dados por usuário
- ✅ Validação de dados
- ✅ Logs de operações e erros
- ✅ Error handling robusto
- ✅ Documentação completa

### Recursos Adicionais
- ✅ Suporte a PUT e PATCH
- ✅ Múltiplos filtros simultâneos
- ✅ Busca por texto em título e descrição
- ✅ Validação de datas ISO 8601
- ✅ Health check endpoint
- ✅ Timestamps automáticos
- ✅ Índices no MongoDB para performance

## 📄 Licença

ISC

---

**Desenvolvido por:** [Seu Nome]  
**Repositório:** https://github.com/Venchoes/Backend_MongoDB  
**Deploy:** [Link da aplicação hospedada]
