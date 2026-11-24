const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    // El rol no se acepta desde el body (evita que alguien se registre como admin)
    const usuario = await Usuario.create({ nombre, email, password });
    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente',
      data: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) { next(error); }
};

// 8. POST /api/usuarios/login
exports.loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, mensaje: 'Email y contraseña son obligatorios' });
    }
    const usuario = await Usuario.findOne({ email: email.toLowerCase() }).select('+password');
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );
    res.json({
      ok: true,
      mensaje: 'Autenticación exitosa',
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) { next(error); }
};

// 9. GET /api/usuarios  (requiere token)
exports.listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().sort({ fechaCreacion: -1 });
    res.json({ ok: true, total: usuarios.length, data: usuarios });
  } catch (error) { next(error); }
};
