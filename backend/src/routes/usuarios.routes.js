const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuario.controller');

/** 
     @swagger
    * /api/usuarios/register:
    *   post:
    *     summary: Registra un nuevo usuario
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               nombre:
    *                 type: string
    *                 description: Nombre del usuario
    *               email:
    *                 type: string
    *                 description: Correo electrónico del usuario
    *               password:
    *                 type: string
    *                 description: Contraseña del usuario
    */
// Ruta para registrar un usuario
router.post('/register', registrarUsuario);

/**
    @swagger
    * /api/usuarios/login:
    *   post:
    *     summary: Inicia sesión un usuario
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               email:
    *                 type: string
    *                 description: Correo electrónico del usuario
    *               password:
    *                 type: string
    *                 description: Contraseña del usuario
    */
// Login
router.post('/login', loginUsuario);

module.exports = router;
