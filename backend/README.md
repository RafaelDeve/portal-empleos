# API - Portal de Empleos

Esta API permite a usuarios y empresas registrarse, gestionar vacantes y aplicar a ofertas de trabajo.  
Todos los endpoints usan JSON como formato de entrada/salida y requieren el header:  
`Content-Type: application/json`

---

## 🔐 Autenticación

### `POST /auth/loginUser.php`
- **Descripción**: Iniciar sesión como usuario normal
- **Body requerido**:
```json
{
  "user": "usuario123",
  "password": "****"
}
```
- **Respuesta exitosa**:
```json
{
  "message": "Login exitoso",
  "user": { "id": 1, "user": "usuario123", "email": "correo@example.com" }
}
```

---

### `POST /auth/loginCompany.php`
- **Descripción**: Iniciar sesión como empresa
- **Body requerido**:
```json
{
  "user": "empresa01",
  "password": "****"
}
```

---

## 👤 Usuarios

### `POST /user/saveUser.php`
- **Descripción**: Registro de usuario normal
- **Body requerido**:
```json
{
  "user": "usuario123",
  "email": "correo@example.com",
  "password": "****"
}
```

---

## 🏢 Empresas

### `POST /company/saveCompany.php`
- **Descripción**: Registro de empresa
- **Body requerido**:
```json
{
  "user": "empresa01",
  "email": "empresa@example.com",
  "address": "Calle #1",
  "password": "****"
}
```

---

## 📋 Vacantes

### `POST /company/saveJob.php`
- **Descripción**: Crear una nueva vacante
- **Body requerido**:
```json
{
  "title": "Desarrollador PHP",
  "schedule": "Tiempo completo",
  "min_salary": 25000,
  "max_salary": 40000,
  "company_name": "Tech SA",
  "company_location": "Santo Domingo",
  "company_id": 1
}
```

---

### `PUT /company/updateJob.php`
- **Descripción**: Actualizar vacante existente
- **Body requerido**: igual al de creación + `"id"`

---

### `DELETE /company/deleteJob.php`
- **Descripción**: Eliminar vacante
- **Body requerido**:
```json
{ "id": 7 }
```

---

### `GET /company/getAllJobs.php`
- **Descripción**: Obtener todas las vacantes

---

### `GET /company/getJobById.php?id=7`
- **Descripción**: Obtener vacante por ID

---

### `GET /company/getJobDetails.php?id=7`
- **Descripción**: Obtener vacante + detalles + total de aplicaciones

---

### `POST /company/saveJobDetails.php`
- **Descripción**: Guardar descripción extendida de vacante
- **Body requerido**:
```json
{
  "job_id": 7,
  "description": "Detalles del cargo...",
  "requirements": "Requisitos...",
  "benefits": "Beneficios...",
  "publication_date": "2025-04-23"
}
```

---

### `POST /company/getCompanyJobs.php`
- **Descripción**: Listar vacantes de una empresa
- **Body requerido**:
```json
{ "company_id": 1 }
```

---

## 🧾 Aplicaciones

### `POST /auth/apply.php`
- **Descripción**: Aplicar a una vacante
- **Body requerido**:
```json
{ "user_id": 2, "job_id": 7 }
```

---

### `POST /auth/checkApplication.php`
- **Descripción**: Verificar si un usuario ya aplicó
- **Body requerido**:
```json
{ "user_id": 2, "job_id": 7 }
```

---

### `POST /auth/getApplicationWithCv.php`
- **Descripción**: Obtener CVs de todos los usuarios que aplicaron a una vacante
- **Body requerido**:
```json
{ "job_id": 7 }
```

---

## ⚠️ Errores comunes
Todas las respuestas de error siguen este formato:
```json
{
  "error": "Descripción del error",
  "details": "Mensaje técnico (solo en modo debug)"
}
```