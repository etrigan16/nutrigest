const { Schema, model } = require('mongoose');

/**
 * Modelo Usuario
 * Representa a los nutricionistas que usan el sistema.
 */
const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    rol: {
      type: String,
      enum: ['nutricionista', 'admin'],
      default: 'nutricionista'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Usuario', usuarioSchema);
