const Paciente = require('../models/paciente.model');

/**
 * Crear un nuevo paciente
 */
const crearPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json({
      mensaje: 'Paciente creado exitosamente',
      paciente
    });
  } catch (error) {
    console.error('Error creando paciente:', error.message);
    res.status(400).json({
      error: 'Error al crear paciente',
      detalles: error.message
    });
  }
};

/**
 * Obtener todos los pacientes
 */
const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Error obteniendo pacientes:', error.message);
    res.status(500).json({
      error: 'Error al obtener pacientes'
    });
  }
};

module.exports = {
  crearPaciente,
  obtenerPacientes
};
