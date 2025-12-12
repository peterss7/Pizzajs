my-project/ 
    backend/       
        db/
            db.ts
            init.sql
        scripts/
            init-db.mjs 
        src/
            routes/
            server.ts
        .env
        package.json
        tsconfig.json
    frontend/
        package.json
        index.html
        tsconfig.json
        tsconfig.app.json
        vite.config.ts
        src/
            main.tsx
            App.tsx

# Handy
```text
curl -Method POST http://localhost:3000/api/accounts `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"Peter","email":"peter@test.com","password":"secret123"}'
```

## Postgres Setup
DATABASE_URL=postgres://annex:YOURPASS@localhost:5432/pizzajs
-- as postgres superuser:
CREATE ROLE myuser WITH LOGIN PASSWORD 'PW';
ALTER ROLE myuser CREATEDB;
CREATE DATABASE pizzajs OWNER myuser;

npm script
"db:init": "node ./scripts/init-db.mjs"


# react stuff
```text
npm install @mui/material @mui/system @emotion/react @emotion/styled

```