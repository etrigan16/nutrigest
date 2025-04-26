const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos las rutas
const pacientesRoutes = require('./routes/pacientes.routes');
const usuariosRoutes = require('./routes/usuarios.routes');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('NutriApp Backend funcionando 🚀');
});

module.exports = app;
