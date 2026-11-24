const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, mensaje: 'API Express + MongoDB funcionando' }));

app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/reportes', require('./routes/reporte.routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
