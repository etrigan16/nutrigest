const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuario.controller');

// Ruta para registrar un usuario
router.post('/register', registrarUsuario);

// Login
router.post('/login', loginUsuario);

module.exports = router;
