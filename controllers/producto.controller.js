const mongoose = require('mongoose');
const Producto = require('../models/Producto');

const idValido = (id) => mongoose.isValidObjectId(id);

// 1. POST /api/productos
exports.crearProducto = async (req, res, next) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json({ ok: true, data: producto });
  } catch (error) { next(error); }
};

// 2. GET /api/productos
exports.listarProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find().sort({ fechaCreacion: -1 });
    res.json({ ok: true, total: productos.length, data: productos });
  } catch (error) { next(error); }
};

// 3. GET /api/productos/:id
exports.obtenerProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ ok: false, mensaje: 'ID no válido' });
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    res.json({ ok: true, data: producto });
  } catch (error) { next(error); }
};

// 4. PUT /api/productos/:id
exports.actualizarProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ ok: false, mensaje: 'ID no válido' });
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    res.json({ ok: true, data: producto });
  } catch (error) { next(error); }
};

// 5. DELETE /api/productos/:id
exports.eliminarProducto = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ ok: false, mensaje: 'ID no válido' });
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    res.json({ ok: true, mensaje: 'Producto eliminado correctamente', data: producto });
  } catch (error) { next(error); }
};

// 6. GET /api/productos/categoria/:cat
exports.productosPorCategoria = async (req, res, next) => {
  try {
    const cat = req.params.cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const productos = await Producto.find({ categoria: new RegExp(`^${cat}$`, 'i') });
    res.json({ ok: true, categoria: req.params.cat, total: productos.length, data: productos });
  } catch (error) { next(error); }
};
