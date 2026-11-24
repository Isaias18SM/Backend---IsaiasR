const router = require('express').Router();
const c = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

router.post('/registro', c.registrarUsuario);
router.post('/login', c.loginUsuario);
router.get('/', auth, c.listarUsuarios);

module.exports = router;
