const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

// 10. GET /api/reportes/estadisticas
exports.estadisticas = async (req, res, next) => {
  try {
    const [resumen, porCategoria, totalUsuarios] = await Promise.all([
      Producto.aggregate([
        {
          $group: {
            _id: null,
            totalProductos: { $sum: 1 },
            stockTotal: { $sum: '$stock' },
            precioPromedio: { $avg: '$precio' },
            precioMaximo: { $max: '$precio' },
            precioMinimo: { $min: '$precio' },
            valorInventario: { $sum: { $multiply: ['$precio', '$stock'] } }
          }
        },
        { $project: { _id: 0 } }
      ]),
      Producto.aggregate([
        {
          $group: {
            _id: '$categoria',
            cantidad: { $sum: 1 },
            stock: { $sum: '$stock' },
            precioPromedio: { $avg: '$precio' }
          }
        },
        { $project: { _id: 0, categoria: '$_id', cantidad: 1, stock: 1, precioPromedio: 1 } },
        { $sort: { cantidad: -1 } }
      ]),
      Usuario.countDocuments()
    ]);

    res.json({
      ok: true,
      data: {
        productos: resumen[0] || { totalProductos: 0, stockTotal: 0, valorInventario: 0 },
        porCategoria,
        totalUsuarios
      }
    });
  } catch (error) { next(error); }
};
