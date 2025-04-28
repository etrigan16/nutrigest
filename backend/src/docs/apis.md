# 📚 NutriGest API - Documentación

## ✨ Descripción general
API RESTful para la gestión de nutricionistas y pacientes.  
Construida con Node.js, Express, MongoDB y protegida mediante autenticación JWT.

## 🛡️ Autenticación de usuarios

- **POST** `/api/usuarios/register`
  - Crear un nuevo usuario (nutricionista).
  
- **POST** `/api/usuarios/login`
  - Iniciar sesión. Devuelve un Token JWT.

## 🏥 Gestión de Pacientes (Requiere Token en Header Authorization)

- **POST** `/api/pacientes`
  - Crear un nuevo paciente.

- **GET** `/api/pacientes`
  - Listar todos los pacientes asociados al nutricionista autenticado.

- **GET** `/api/pacientes/:id`
  - Obtener los detalles de un paciente específico.

- **PUT** `/api/pacientes/:id`
  - Actualizar los datos de un paciente.

- **DELETE** `/api/pacientes/:id`
  - Eliminar un paciente.

## 🚀 Acceso a Documentación Interactiva

> Para probar todos los endpoints de manera visual e interactiva, accedé a:

http://localhost:3000/api-docs


(La documentación fue generada usando Swagger UI).

## 🔒 Seguridad

- Todos los endpoints de pacientes requieren un **Token JWT** válido en el Header:
  
Authorization: Bearer {token}

- El token expira en 1 hora.

---
