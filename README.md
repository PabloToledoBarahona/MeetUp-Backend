# MeetUp-Backend

Backend para la aplicación móvil **MeetUp**, desarrollada en Node.js + Express + MongoDB (Atlas) y desplegada en Render.  
Este servicio proporciona endpoints para **autenticación, gestión de eventos, colaboradores, invitados (RSVP), tareas, finanzas y cronograma de actividades**.

---

## URL en producción

```
https://meetup-backend-nsxu.onrender.com
```

---

## Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- TypeScript
- JSON Web Tokens (JWT)
- Render (hosting)
- Postman (para pruebas)

---

## Módulos disponibles y endpoints

### 1. Usuarios (Auth)

- `POST /api/users/register` → Registro de nuevo usuario
- `POST /api/users/login` → Login con JWT
- `GET /api/users/me` → Obtener perfil autenticado
- `GET /api/users` → Listar todos los usuarios

---

### 2. Eventos

- `POST /api/events` → Crear evento
- `GET /api/events` → Listar eventos del usuario
- `GET /api/events/:id` → Obtener evento por ID
- `PUT /api/events/:id` → Editar evento
- `DELETE /api/events/:id` → Eliminar evento
- `PATCH /api/events/:id/cancel` → Cancelar evento
- `PATCH /api/events/:id/uncancel` → Reactivar evento cancelado
- `GET /api/events/for-guest/:guestId` → Obtener evento por invitado
- `PATCH /api/events/:id/collaborators/add` → Agregar colaborador
- `PATCH /api/events/:id/collaborators/remove` → Eliminar colaborador

---

### 3. Gestión de Invitados

- `POST /api/guests` → Crear invitado
- `GET /api/guests/event/:eventId` → Obtener invitados por evento
- `PUT /api/guests/:id` → Actualizar invitado
- `DELETE /api/guests/:id` → Eliminar invitado
- `POST /api/guests/:eventId/send-invitations` → Enviar invitaciones masivas
- `POST /api/guests/:eventId/send-reminders` → Enviar recordatorios
- `GET /api/guests/confirm/:guestId/attending` → Confirmar asistencia
- `GET /api/guests/confirm/:guestId/not_attending` → Rechazar asistencia

---

### 4. Cronograma de Actividades

- `POST /api/activities` → Crear actividad
- `GET /api/activities/event/:eventId` → Listar actividades por evento
- `PUT /api/activities/:activityId` → Actualizar actividad
- `DELETE /api/activities/:activityId` → Eliminar actividad

Validaciones:
- No debe haber superposición de horarios
- Hora de inicio debe ser antes de la hora de fin

---

### 5. Tareas (Checklist)

- `POST /api/tasks` → Crear tarea
- `GET /api/tasks/event/:eventId` → Listar tareas de un evento
- `PUT /api/tasks/:taskId` → Actualizar tarea
- `DELETE /api/tasks/:taskId` → Eliminar tarea
- `PATCH /api/tasks/:taskId/assign` → Asignar colaborador a tarea
- `PATCH /api/tasks/:taskId/status` → Cambiar estado de tarea

---

## Headers requeridos

Para acceder a rutas protegidas:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Despliegue

- El proyecto está desplegado en Render desde rama `master`
- Para ejecutar localmente:
  ```bash
  npm install
  npm run dev
  ```

---

## Autor

Pablo Toledo – Backend Developer  
GitHub: [@PabloToledoBarahona](https://github.com/PabloToledoBarahona)