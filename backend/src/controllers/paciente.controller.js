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


/**
 * Obtener un paciente específico del nutricionista autenticado
 */
const obtenerPacientePorId = async (req, res) => {
  try {
    const paciente = await Paciente.findOne({
      _id: req.params.id,
      id_nutricionista: req.usuario.id
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json(paciente);
  } catch (error) {
    console.error('Error obteniendo paciente:', error.message);
    res.status(500).json({
      error: 'Error al obtener paciente'
    });
  }
};

/**
 * Actualizar un paciente específico
 */
const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findOne({
      _id: req.params.id,
      id_nutricionista: req.usuario.id
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Actualizamos solo los campos enviados
    Object.assign(paciente, req.body);

    await paciente.save();

    res.status(200).json({
      mensaje: 'Paciente actualizado exitosamente',
      paciente
    });
  } catch (error) {
    console.error('Error actualizando paciente:', error.message);
    res.status(500).json({
      error: 'Error al actualizar paciente'
    });
  }
};

/**
 * Eliminar un paciente específico
 */
const eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findOneAndDelete({
      _id: req.params.id,
      id_nutricionista: req.usuario.id
    });

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json({ mensaje: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando paciente:', error.message);
    res.status(500).json({
      error: 'Error al eliminar paciente'
    });
  }
};

module.exports = {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente
};



