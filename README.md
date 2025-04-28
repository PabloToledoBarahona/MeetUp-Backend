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

## Instalación local

1. Clonar y acceder al repositorio:
```bash
git clone https://github.com/PabloToledoBarahona/MeetUp-Backend.git
cd MeetUp-Backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear el archivo `.env`:
```env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/meetup?retryWrites=true&w=majority
JWT_SECRET=claveSuperSecreta
PORT=3000
```

4. Correr en desarrollo:
```bash
npm run dev
```

5. Compilar:
```bash
npm run build
```

6. Iniciar compilado:
```bash
npm start
```

---

## Endpoints principales

### 1. Autenticación

| Método | URL                  | Descripción                         |
|--------|-----------------------|-------------------------------------|
| POST   | `/api/users/register`  | Registro de nuevo usuario          |
| POST   | `/api/users/login`     | Login, devuelve token JWT          |
| GET    | `/api/users/me`        | Obtener perfil del usuario         |

**Ejemplo registro:**
```json
{
  "name": "Pablo Toledo",
  "email": "pablo@example.com",
  "password": "claveSegura123"
}
```

**Ejemplo respuesta login:**
```json
{
  "token": "jwt-token-generado"
}
```

**Ejemplo perfil:**
```json
{
  "_id": "6630abc12345def67890",
  "name": "Pablo Toledo",
  "email": "pablo@example.com"
}
```

---

### 2. Eventos

| Método | URL                               | Descripción                       |
|--------|------------------------------------|-----------------------------------|
| POST   | `/api/events`                      | Crear evento desde cero          |
| GET    | `/api/events`                      | Listar eventos del usuario       |
| GET    | `/api/events/:id`                  | Obtener evento específico        |
| PUT    | `/api/events/:id`                  | Editar evento                    |
| DELETE | `/api/events/:id`                  | Eliminar evento                  |
| PATCH  | `/api/events/:id/cancel`            | Cancelar evento                  |

**Notas:**
- El campo `endTime` es opcional.
- Se puede incluir `imageUrl` como URL pública de imagen.

**Ejemplo creación evento:**
```json
{
  "name": "Cumpleaños de Juan",
  "location": "Club Social",
  "category": "Cumpleaños",
  "startTime": "2025-06-10T17:00:00Z",
  "imageUrl": "https://example.com/foto.jpg"
}
```

**Ejemplo respuesta evento:**
```json
{
  "_id": "6645abcd1234ef567890",
  "name": "Cumpleaños de Juan",
  "location": "Club Social",
  "startTime": "2025-06-10T17:00:00.000Z",
  "imageUrl": "https://example.com/foto.jpg",
  "createdBy": "userId",
  "isCancelled": false
}
```

---

### 3. Plantillas de eventos

| Método | URL                                 | Descripción                               |
|--------|-------------------------------------|-------------------------------------------|
| GET    | `/api/events/templates/birthday`    | Obtener plantilla para cumpleaños        |
| GET    | `/api/events/templates/junte`       | Obtener plantilla para juntes             |
| POST   | `/api/events/from-template`         | Crear evento usando una plantilla        |

**Ejemplo creación desde plantilla:**
```json
{
  "type": "birthday",
  "overrides": {
    "name": "Cumple Juan",
    "startTime": "2025-06-10T17:00:00Z",
    "location": "Casa de Juan"
  }
}
```

**Ejemplo respuesta:**
```json
{
  "success": true,
  "message": "Evento creado desde plantilla",
  "data": {
    "_id": "6645bcd1234567abcdef",
    "name": "Cumple Juan",
    "startTime": "2025-06-10T17:00:00.000Z",
    "category": "Cumpleaños"
  }
}
```

---

### 4. Gestión de invitados (RSVP)

| Método | URL                                  | Descripción                         |
|--------|--------------------------------------|-------------------------------------|
| POST   | `/api/invitations/import`            | Importar lista de invitados         |
| PATCH  | `/api/invitations/:id/confirm`        | Confirmar asistencia                |
| GET    | `/api/invitations/event/:eventId`     | Listar invitados de un evento       |

**Ejemplo importar invitados:**
```json
{
  "eventId": "6645abcd1234ef567890",
  "contacts": [
    {
      "name": "Ana Pérez",
      "email": "ana@example.com",
      "phone": "59170000111"
    },
    {
      "name": "Carlos Gómez",
      "email": "carlos@example.com",
      "phone": "59170000222"
    }
  ]
}
```

**Ejemplo respuesta invitados:**
```json
[
  {
    "_id": "6646aaaa1234bbbb5678",
    "event": "6645abcd1234ef567890",
    "name": "Ana Pérez",
    "email": "ana@example.com",
    "phone": "59170000111",
    "status": "pending"
  },
  {
    "_id": "6646aaab1234bbbb5678",
    "event": "6645abcd1234ef567890",
    "name": "Carlos Gómez",
    "email": "carlos@example.com",
    "phone": "59170000222",
    "status": "pending"
  }
]
```

---

### 5. Checklist de tareas

| Método | URL                                  | Descripción                          |
|--------|--------------------------------------|--------------------------------------|
| POST   | `/api/tasks`                         | Crear nueva tarea                    |
| GET    | `/api/tasks/event/:eventId`           | Listar tareas de un evento           |
| PUT    | `/api/tasks/:taskId`                  | Actualizar tarea                     |
| DELETE | `/api/tasks/:taskId`                  | Eliminar tarea                       |
| PATCH  | `/api/tasks/:taskId/assign`           | Asignar ayudante a tarea             |
| PATCH  | `/api/tasks/:taskId/status`           | Cambiar estado de la tarea           |

**Ejemplo creación tarea:**
```json
{
  "event": "6645abcd1234ef567890",
  "title": "Comprar bebidas",
  "description": "Compra de bebidas para 50 personas"
}
```

**Ejemplo respuesta listar tareas:**
```json
[
  {
    "_id": "6647abcd5678ef123456",
    "title": "Comprar bebidas",
    "status": "pending",
    "event": "6645abcd1234ef567890"
  }
]
```

---

### 6. Finanzas (Presupuesto y Gastos)

| Método | URL                                  | Descripción                          |
|--------|--------------------------------------|--------------------------------------|
| POST   | `/api/expenses`                      | Registrar gasto                      |
| GET    | `/api/expenses/event/:eventId`       | Listar gastos de un evento           |
| DELETE | `/api/expenses/:expenseId`           | Eliminar gasto                       |
| GET    | `/api/expenses/summary/:eventId`     | Consultar resumen financiero         |

**Ejemplo registrar gasto:**
```json
{
  "event": "6645abcd1234ef567890",
  "amount": 200,
  "category": "Catering",
  "description": "Pago a empresa de catering"
}
```

**Ejemplo resumen financiero:**
```json
{
  "budget": 1000,
  "totalExpenses": 300,
  "percentageUsed": 30
}
```

---

### 7. Cronograma de actividades

| Método | URL                                  | Descripción                          |
|--------|--------------------------------------|--------------------------------------|
| POST   | `/api/activities`                    | Crear nueva actividad                |
| GET    | `/api/activities/event/:eventId`     | Listar actividades cronológicas      |
| PUT    | `/api/activities/:activityId`        | Actualizar actividad                 |
| DELETE | `/api/activities/:activityId`        | Eliminar actividad                   |

**Ejemplo creación actividad:**
```json
{
  "event": "6645abcd1234ef567890",
  "name": "Ceremonia de Apertura",
  "startTime": "2025-07-01T08:00:00.000Z",
  "endTime": "2025-07-01T09:00:00.000Z",
  "location": "Salón Principal"
}
```

**Ejemplo respuesta listar actividades:**
```json
[
  {
    "_id": "6648abcdef1234567890",
    "name": "Ceremonia de Apertura",
    "startTime": "2025-07-01T08:00:00.000Z",
    "endTime": "2025-07-01T09:00:00.000Z",
    "location": "Salón Principal"
  }
]
```
---

## Headers para rutas protegidas

Para todas las rutas protegidas, incluir el siguiente header:

```
Authorization: Bearer <TOKEN_JWT>
```
---

## Despliegue en Render

Este proyecto está desplegado automáticamente desde la rama `master` en [Render](https://render.com).

Build y Start:
```bash
npm install
npm run build
npm start
```

---

## Autor

Pablo Toledo  
Desarrollador Backend – 2025  
GitHub: [@PabloToledoBarahona](https://github.com/PabloToledoBarahona)

---

## Licencia

MIT License
