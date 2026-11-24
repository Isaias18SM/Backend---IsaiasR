# Backend Express + MongoDB (Mongoose) — SENA ADSO · Clase 9

API REST con 10 endpoints, arquitectura en capas (rutas → controladores → modelos).

## Puesta en marcha
```bash
npm install
cp .env.example .env     # en Windows: copy .env.example .env
# edita .env con tu MONGO_URI y JWT_SECRET
npm run dev
```

## Endpoints
| # | Método | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | POST | /api/productos | Crear producto |
| 2 | GET | /api/productos | Listar productos |
| 3 | GET | /api/productos/:id | Detalle por ID |
| 4 | PUT | /api/productos/:id | Actualizar |
| 5 | DELETE | /api/productos/:id | Eliminar |
| 6 | GET | /api/productos/categoria/:cat | Filtrar por categoría |
| 7 | POST | /api/usuarios/registro | Registrar usuario |
| 8 | POST | /api/usuarios/login | Login (devuelve JWT) |
| 9 | GET | /api/usuarios | Listar usuarios (Bearer token) |
| 10 | GET | /api/reportes/estadisticas | Agregaciones |

Pruebas: importa `postman/API-Express-MongoDB.postman_collection.json` en Postman / Thunder Client y ejecútala en orden.
