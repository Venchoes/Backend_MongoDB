# Como Verificar Tasks no MongoDB Local (Docker)

## Problema Identificado
As **tasks não estavam sendo salvas no MongoDB local** porque o modelo `Task` não implementava Dual Sync (apenas o modelo `User` tinha).

## Solução Implementada
✅ Adicionado Dual Sync completo no modelo Task:
- `createTask` → salva no Atlas E no Local
- `updateTaskPut` → atualiza no Atlas E no Local
- `updateTaskPatch` → atualiza no Atlas E no Local
- `deleteTask` → remove do Atlas E do Local

## Como Visualizar as Tasks

### Opção 1: Via Mongo Express (Interface Web)
1. Acesse: http://localhost:8081
2. Credenciais (conforme docker-compose.yml):
   - User: definido em `ME_CONFIG_BASICAUTH_USERNAME`
   - Pass: definido em `ME_CONFIG_BASICAUTH_PASSWORD`
3. Selecione o banco `my-database`
4. Clique na coleção `tasks`

### Opção 2: Via Terminal (mongosh)

**Listar todas as tasks:**
```bash
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.find().pretty()"
```

**Contar tasks:**
```bash
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.countDocuments()"
```

**Buscar tasks de um usuário específico:**
```bash
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.find({user: ObjectId('SEU_USER_ID_AQUI')}).pretty()"
```

**Verificar estrutura de uma task:**
```bash
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.findOne()"
```

## Testando o Dual Sync

1. **Reinicie o servidor** (para carregar o código atualizado):
```bash
npm run dev
```

2. **Crie uma nova task** via Postman:
```
POST http://localhost:3000/tasks
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Testar Dual Sync",
  "description": "Verificar se salva no Atlas e Local",
  "status": "todo",
  "priority": "high"
}
```

3. **Verifique no MongoDB Local**:
```bash
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.find().pretty()"
```

4. **Verifique no Atlas**:
- Acesse MongoDB Atlas > Collections > my-database > tasks

## Logs para Diagnóstico

Os logs indicarão se o Dual Sync está funcionando:
```
[TASK] Task criada no Atlas para user=...
[TASK] Dual Sync ativo, salvando no MongoDB Local...
[TASK] ✅ Task salva no MongoDB Local: ...
```

Se algo falhar, você verá:
```
[TASK] ❌ Falha ao salvar task no MongoDB Local: ...
```

## Troubleshooting

**Se as tasks não aparecerem no Local:**
1. Confirme que `MONGODB_DUAL_SYNC=true` no `.env`
2. Verifique se o MongoDB Local está rodando: `docker compose ps`
3. Confira os logs do servidor para mensagens de erro
4. Teste a conexão: `docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin`

**Se quiser limpar as tasks antigas (que foram criadas antes do Dual Sync):**
```bash
# No Local
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin my-database --eval "db.tasks.deleteMany({})"

# No Atlas (via mongosh ou interface web)
```
