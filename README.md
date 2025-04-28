# MeetUp-Backend

Backend para la aplicación móvil **MeetUp**, desarrollada en Node.js + Express + MongoDB (Atlas) y desplegada en Render.  
Este servicio proporciona endpoints para **autenticación, creación y gestión de eventos**, uso de **plantillas de eventos**, **gestión de invitados (RSVP)**, **checklist de tareas**, **control financiero** y **cronograma de actividades**.

---

## URL en producción

```
https://meetup-backend-nsxu.onrender.com
```

---

## Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- JSON Web Tokens (JWT)
- TypeScript
- Render (despliegue)

---

## Estructura del proyecto

```
src/
├── config/            # Conexión a MongoDB
├── controllers/       # Lógica de cada ruta
├── middlewares/       # Autenticación (JWT)
├── models/            # Esquemas de Mongoose
├── routes/            # Endpoints agrupados
├── services/          # Lógica de negocio
└── index.ts           # Entry point principal
```

---

## Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/PabloToledoBarahona/MeetUp-Backend.git
   cd MeetUp-Backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear archivo `.env` en la raíz:

   ```env
   MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/meetup?retryWrites=true&w=majority
   JWT_SECRET=claveSegura123
   PORT=3000
   TELEGRAM_BOT_TOKEN=<tu_token_de_bot> (opcional si se usa envío de mensajes Telegram)
   ```

4. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

5. Compilar para producción:
   ```bash
   npm run build
   ```

6. Iniciar servidor compilado:
   ```bash
   npm start
   ```

---

## Endpoints principales

### Autenticación

| Método | URL                             | Descripción                  |
|--------|----------------------------------|------------------------------|
| POST   | `/api/users/register`            | Registro de nuevo usuario   |
| POST   | `/api/users/login`               | Login, devuelve JWT         |
| GET    | `/api/users/me`                  | Obtener información del usuario autenticado |

### Eventos

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/events`                      | Crear evento desde cero (con o sin imagen) |
| GET    | `/api/events`                      | Listar eventos creados por el usuario  |
| GET    | `/api/events/:id`                  | Obtener evento específico por ID       |
| PUT    | `/api/events/:id`                  | Editar evento (puede actualizar imagen) |
| DELETE | `/api/events/:id`                  | Eliminar evento                        |
| PATCH  | `/api/events/:id/cancel`            | Cancelar evento sin eliminarlo         |

**Notas:**
- El campo `endTime` es opcional al crear un evento.
- Se puede incluir un campo `imageUrl` con la URL pública de la imagen del evento.

**Ejemplo body para crear evento:**

```json
{
  "name": "Fiesta de Bienvenida",
  "description": "Reunión informal",
  "location": "Club Social",
  "category": "Reunión",
  "startTime": "2025-07-01T18:00:00.000Z",
  "imageUrl": "https://storage.googleapis.com/bucket-imagenes/evento-bienvenida.jpg"
}
```

### Plantillas de eventos

| Método | URL                                      | Descripción                            |
|--------|-------------------------------------------|----------------------------------------|
| GET    | `/api/events/templates/birthday`          | Obtener plantilla para cumpleaños       |
| GET    | `/api/events/templates/junte`             | Obtener plantilla para juntes           |
| POST   | `/api/events/from-template`              | Crear evento usando plantilla + overrides |

**Ejemplo body para `/from-template`:**

```json
{
  "type": "birthday",
  "overrides": {
    "name": "Cumple de Juan",
    "startTime": "2025-06-10T17:00:00",
    "endTime": "2025-06-10T21:00:00",
    "location": "Casa"
  }
}
```

### Gestión de invitados (RSVP)

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/invitations/import`          | Importar invitados manualmente         |
| PATCH  | `/api/invitations/:id/confirm`      | Confirmar asistencia                  |
| GET    | `/api/invitations/event/:eventId`   | Listar invitados de un evento          |

### Tareas (Checklist)

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/tasks`                       | Crear tarea                            |
| GET    | `/api/tasks/event/:eventId`         | Listar tareas por evento               |
| PUT    | `/api/tasks/:taskId`                | Actualizar tarea                       |
| DELETE | `/api/tasks/:taskId`                | Eliminar tarea                         |
| PATCH  | `/api/tasks/:taskId/assign`         | Asignar ayudante a una tarea            |
| PATCH  | `/api/tasks/:taskId/status`         | Cambiar estado de la tarea             |

### Finanzas

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/expenses`                    | Registrar gasto                        |
| GET    | `/api/expenses/event/:eventId`     | Listar gastos por evento               |
| DELETE | `/api/expenses/:expenseId`         | Eliminar gasto                         |
| GET    | `/api/expenses/summary/:eventId`    | Consultar resumen financiero           |

### Cronograma de actividades

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/activities`                  | Crear actividad en el evento           |
| GET    | `/api/activities/event/:eventId`   | Listar actividades cronológicas        |
| PUT    | `/api/activities/:activityId`      | Editar actividad                       |
| DELETE | `/api/activities/:activityId`      | Eliminar actividad                     |

---

## Headers para rutas protegidas

Para todas las rutas protegidas, incluir el header:

```
Authorization: Bearer <TOKEN_JWT>
```

---

## Despliegue en Render

Este proyecto está desplegado automáticamente desde la rama `master` en [Render](https://render.com).

Build y start:
```bash
npm install && npm run build
npm start
```

---

## Autor

Pablo Toledo  
Desarrollador Backend – 2025  
GitHub: [@PabloToledoBarahona](https://github.com/PabloToledoBarahona)

---

## Licencia

MIT
