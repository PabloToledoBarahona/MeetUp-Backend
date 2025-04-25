# MeetUp-Backend

Backend para la aplicación móvil **MeetUp**, desarrollada en Node.js + Express + MongoDB (Atlas) y desplegada en Render.  
Este servicio proporciona endpoints para **autenticación, creación y gestión de eventos**, y uso de plantillas predefinidas como cumpleaños o junte.

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

## Endpoints de autenticación

| Método | URL                             | Descripción                  |
|--------|----------------------------------|------------------------------|
| POST   | `/api/users/register`           | Registro de nuevo usuario   |
| POST   | `/api/users/login`              | Login, devuelve JWT         |

---

## Endpoints de eventos

| Método | URL                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| POST   | `/api/events`                      | Crear evento desde cero                |
| GET    | `/api/events`                      | Listar eventos creados por el usuario  |
| PUT    | `/api/events/:id`                  | Editar evento                          |
| DELETE | `/api/events/:id`                  | Eliminar evento                        |

---

## Endpoints de plantillas

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

---

## Headers para rutas protegidas

Para las rutas que requieren autenticación, incluir:

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
[🔗 GitHub: @PabloToledoBarahona](https://github.com/PabloToledoBarahona)

---

## 📄 Licencia

MIT
