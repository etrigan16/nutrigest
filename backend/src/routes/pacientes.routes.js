const express = require('express');
const router = express.Router();
const { crearPaciente, obtenerPacientes } = require('../controllers/paciente.controller');

// Ruta para crear un paciente
router.post('/', crearPaciente);

// Ruta para obtener todos los pacientes
router.get('/', obtenerPacientes);

module.exports = router;
