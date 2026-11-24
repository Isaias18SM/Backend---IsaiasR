const router = require('express').Router();
const c = require('../controllers/producto.controller');

router.post('/', c.crearProducto);
router.get('/', c.listarProductos);
// IMPORTANTE: esta ruta va antes de "/:id" para que "categoria" no se interprete como un ID
router.get('/categoria/:cat', c.productosPorCategoria);
router.get('/:id', c.obtenerProducto);
router.put('/:id', c.actualizarProducto);
router.delete('/:id', c.eliminarProducto);

module.exports = router;
