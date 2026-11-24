const notFound = (req, res) => {
  res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errores = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ ok: false, mensaje: 'Error de validación', errores });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ ok: false, mensaje: `Valor no válido para "${err.path}"` });
  }
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0];
    return res.status(409).json({ ok: false, mensaje: `Ya existe un registro con ese ${campo}` });
  }
  console.error(err);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
};

module.exports = { notFound, errorHandler };
