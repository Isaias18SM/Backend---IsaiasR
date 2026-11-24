const router = require('express').Router();
const c = require('../controllers/reporte.controller');

router.get('/estadisticas', c.estadisticas);

module.exports = router;
