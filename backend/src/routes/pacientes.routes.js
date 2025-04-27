const express = require('express');
const router = express.Router();
const { crearPaciente, obtenerPacientes, obtenerPacientePorId, actualizarPaciente, eliminarPaciente } = require('../controllers/paciente.controller');
const authMiddleware = require('../middleware/authMiddleware');


// Ruta para crear un paciente (protegida)
router.post('/', authMiddleware, crearPaciente);

// Ruta para obtener todos los pacientes (protegida también)
router.get('/', authMiddleware, obtenerPacientes);

// Obtener un paciente específico
router.get('/:id', authMiddleware, obtenerPacientePorId);

// Actualizar un paciente específico
router.put('/:id', authMiddleware, actualizarPaciente);

// Eliminar un paciente específico
router.delete('/:id', authMiddleware, eliminarPaciente);

module.exports = router;
