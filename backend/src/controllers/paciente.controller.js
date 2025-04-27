const Paciente = require('../models/paciente.model');

/**
 * Crear un nuevo paciente
 */
const crearPaciente = async (req, res) => {
  try {
    // Creamos el paciente usando los datos del body
    // y asignamos el id del nutricionista que viene del token
    const nuevoPaciente = new Paciente({
      ...req.body,
      id_nutricionista: req.usuario.id
    });

    await nuevoPaciente.save();

    res.status(201).json({
      mensaje: 'Paciente creado exitosamente',
      paciente: nuevoPaciente
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
* Obtener todos los pacientes del nutricionista autenticado
*/
const obtenerPacientes = async (req, res) => {
 try {
   const pacientes = await Paciente.find({ id_nutricionista: req.usuario.id });
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
