const express = require('express');
const router = express.Router();
const { crearPaciente, obtenerPacientes, obtenerPacientePorId, actualizarPaciente, eliminarPaciente } = require('../controllers/paciente.controller');
const authMiddleware = require('../middleware/authMiddleware');

/** 
 * @swagger
 * /api/pacientes: 
 *  post:
 *    summary: Crea un nuevo paciente
 *   security:
 *      - bearerAuth: []
 *   requestBody:
 *     required: true
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *       properties:
 *        nombre:
 *         type: string
 *        description: Nombre del paciente
 *        example: Juan Pérez
 *       email:
 *        type: string
 *       description: Correo electrónico del paciente
 */
// Ruta para crear un paciente (protegida)
router.post('/', authMiddleware, crearPaciente);


/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Lista todos los pacientes del nutricionista autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/', authMiddleware, obtenerPacientes);


/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente específico del nutricionista autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del paciente a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente encontrado
 */
// Ruta para obtener todos los pacientes (protegida también)
router.get('/', authMiddleware, obtenerPacientes);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente específico del nutricionista autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del paciente a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente encontrado
 */
// Obtener un paciente específico
router.get('/:id', authMiddleware, obtenerPacientePorId);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Actualiza un paciente específico del nutricionista autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del paciente a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado
 */
// Actualizar un paciente específico
router.put('/:id', authMiddleware, actualizarPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Elimina un paciente específico del nutricionista autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del paciente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente eliminado
 */
// Eliminar un paciente específico
router.delete('/:id', authMiddleware, eliminarPaciente);

module.exports = router;
