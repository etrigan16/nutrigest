const { Schema, model } = require('mongoose');

/**
 * Modelo Paciente
 * Representa a cada paciente que atiende un nutricionista.
 */
const pacienteSchema = new Schema(
  {
    id_nutricionista: { 
      type: Schema.Types.ObjectId, 
      ref: 'Usuario', 
      required: true 
    },
    nombre: { 
      type: String, 
      required: true, 
      minlength: 3, 
      maxlength: 100 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex de email válido
    },
    edad: { 
      type: Number, 
      min: 0, 
      max: 120 
    },
    peso_inicial: { 
      type: Number, 
      min: 0 
    },
    objetivos: [{
      type: String
    }],
    adjuntos: [{
      type: String
    }],
    creado_en: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true // Crea automáticamente createdAt y updatedAt
  }
);

// Exportamos el modelo
module.exports = model('Paciente', pacienteSchema);
