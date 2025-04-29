#  NutriGest

Sistema de gestión integral para nutricionistas.  
Permite administrar pacientes, crear planes nutricionales, controlar agenda clínica y compartir contenido educativo.

---

##  Funcionalidades principales

- 🧑‍⚕️ Gestión de pacientes (registro, ficha, medidas)
- 📋 Creación de planes nutricionales personalizados
- 📅 Agenda clínica (vista diaria, semanal, mensual)
- 🚨 Alertas clínicas inteligentes
- 📚 Módulo educativo (infografías y publicaciones)
- 🔐 Autenticación de usuarios con JWT

---

##  Tecnologías utilizadas

| Layer        | Tecnología                 |
|--------------|----------------------------|
| Frontend     | React + Vite (planificado) |
| Backend      | Node.js + Express.js       |
| Base de datos| MongoDB Atlas              |
| Autenticación| JWT                        |
| Documentación API | Swagger UI            |

---

##  Estructura del proyecto

```bash
nitrigest/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── docs/                # Documentación técnica
│   │   └── ...
│   └── server.js
├── frontend/                   # (a definir)
├── docs/                       # (opcional para usuarios finales)
└── README.md
```

## Instalacion y Ejecucion local

Requisitos:
- Node.js
- MongoDB Atlas (o local)

```bash
Pasos:

# 1. Clonar el proyecto
git clone https://github.com/etrigan16/nutrigest.git

# 2. Backend
cd backend
npm install
npm run dev

# 3. Configurar variables de entorno
.env
PORT=3000
MONGO_URI=mongodb+srv://...

```

## Documentacion de la API

Disponible via Swagger UI:

```bash
GET /api-docs
```

## Contribuciones

Este proyecto esta en desarrllo.
¡Contribuciones, ideas o feedback son bienvenidos!

guillermofernandez16@gmail.com

## Licencia

MIT © 2025 Guillermo Fernandez
