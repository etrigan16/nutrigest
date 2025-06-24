const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

// Importamos las rutas
const pacientesRoutes = require('./routes/pacientes.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');


const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000' // Cambia el puerto si tu frontend usa otro
}));
app.use(express.json());

// Rutas
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Montamos Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('NutriApp Backend funcionando 🚀');
});

module.exports = app;
