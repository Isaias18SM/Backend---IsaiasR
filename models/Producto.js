const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
  precio: { type: Number, required: [true, 'El precio es obligatorio'], min: 0 },
  categoria: { type: String, required: [true, 'La categoría es obligatoria'], trim: true },
  stock: { type: Number, default: 0, min: 0 },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', ProductoSchema);
