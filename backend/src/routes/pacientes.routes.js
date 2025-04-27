const express = require('express');
const router = express.Router();
const { crearPaciente, obtenerPacientes } = require('../controllers/paciente.controller');
const authMiddleware = require('../middleware/authMiddleware');


// Ruta para crear un paciente (protegida)
router.post('/', authMiddleware, crearPaciente);

// Ruta para obtener todos los pacientes (protegida también)
router.get('/', authMiddleware, obtenerPacientes);

module.exports = router;
