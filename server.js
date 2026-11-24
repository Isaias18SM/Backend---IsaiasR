require('dotenv').config();
const app = require('./app');
const conectarBD = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  if (!process.env.JWT_SECRET) {
    console.error('❌ Falta JWT_SECRET en el archivo .env');
    process.exit(1);
  }
  await conectarBD();
  app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
})();
