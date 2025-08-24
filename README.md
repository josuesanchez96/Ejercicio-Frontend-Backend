## Formulario web que envía datos a un backend en Fastify (Node.js), los valida y los guarda en PostgreSQL. Se incluyen migraciones para versionar el esquema.

### Tecnologías
- Backend: Node.js + Fastify (JavaScript)
- DB: PostgreSQL
- ORM/Migraciones: node-pg-migrate
- Contenedores: Docker + Docker Compose
- Frontend: HTML + Bootstrap + JS

### Variables de entorno
### Raíz (.env): usadas por Docker Compose (Postgres)
POSTGRES_USER=postgres  
POSTGRES_PASSWORD=contraseña  
POSTGRES_DB=BD  
POSTGRES_PORT=5432  

### Backend (fastify-api/.env): usadas por la API:
PORT=3000  
PGHOST=db  
PGPORT=5432  
PGUSER=postgres  
PGPASSWORD=contraseña  
PGDATABASE=bd 

### Cómo correr todo con docker
### 1) construir y levantar
docker compose up -d --build

### 2) estado y logs
docker compose ps
docker compose logs -f db
docker compose logs -f api

## Documentación básica del API
Base URL: http://localhost:3000/api

### POST /messages
Guarda un mensje

### Body (JSON):
{  
  "name": "Josue",  
  "email": "josue@gmail.com",  
  "message": "Hola , me llamo Josue !"  
}  

### Validación:
- name: string, min 2, max 100
- email: string con formato email, max 200
- message: string, min 5, max 1000

### Migraciones (node-pg-migrate)
Permiten versionar el esquema con pasos up/down. Historial en la tabla pgmigrations.

#### Aplicar desde el host (CMD):
set DATABASE_URL=postgres://postgres:contraseña@localhost:5432/bd  
npx --yes node-pg-migrate up -m .\fastify-api\migrations -d DATABASE_URL  

#### Dentro del contenedor api:
docker compose exec api sh -lc \  
 'DATABASE_URL="postgres://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE" \  
  npx --yes node-pg-migrate up -m ./migrations -d DATABASE_URL'   

#### Crear nueva migración: 
npx --yes node-pg-migrate create add_index_on_messages_email -m ./fastify-api/migrations  

### Tabla principal (SQL)
  
CREATE TABLE IF NOT EXISTS messages (  
  id SERIAL PRIMARY KEY,  
  name VARCHAR(100) NOT NULL,  
  email VARCHAR(200) NOT NULL,  
  message TEXT NOT NULL  
);  
  
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);  

