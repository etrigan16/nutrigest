const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

/**
 * Registrar un nuevo usuario (nutricionista)
 */
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar que no exista ya el usuario
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    console.error('Error registrando usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al registrar usuario' });
  }
};

const jwt = require('jsonwebtoken');

/**
 * Login de usuario
 */
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que el usuario exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: 'Email o contraseña inválidos.' });
    }

    // Verificar password
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ error: 'Email o contraseña inválidos.' });
    }

    // Generar Token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      mensaje: 'Login exitoso',
      token
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
