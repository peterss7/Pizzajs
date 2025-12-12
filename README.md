my-project/ 
    backend/
        package.json
        tsconfig.json
        src/
            server.ts
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

# react stuff
```text
npm install @mui/material @mui/system @emotion/react @emotion/styled

```