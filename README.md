# 🎮 LevelUp Gamer — Proyecto Fullstack (Spring Boot + React + Vite)

Aplicación web fullstack para un **e-commerce gamer**, donde los usuarios pueden:

- Registrarse e iniciar sesión.
- Navegar un catálogo de productos con stock real.
- Agregar productos al carrito y simular compras.
- Visualizar su historial de compras en el perfil.
- (Rol ADMIN) Administrar usuarios, roles y revisar compras.

Este proyecto forma parte de la **Situación Evaluativa** de la asignatura de desarrollo web fullstack.

---

## 🧱 Arquitectura del Proyecto
El repositorio contiene **dos aplicaciones** separadas, comunicadas mediante **API REST**:

LevelUp-Gamer/
├── levelup/ # Backend (Spring Boot)
└── levelup-Frontend/ # Frontend (React + Vite)

## 🛠 Tecnologías Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Security + JWT
- Spring Data JPA
- MySQL (Laragon)
- Maven
- Swagger / OpenAPI
- IntelliJ IDEA

### Frontend
- React + Vite
- JavaScript / JSX
- Fetch API
- CSS externo
- localStorage (sesión)
- Hooks personalizados (`useLogin`, `useCarrito`, `usePerfil`, `useAdmin`)

### Testing (Frontend)
- Vitest
- Testing Library
- jsdom
- Reporte de cobertura (coverage)

---

## 🗄 Base de Datos (Laragon + MySQL)

1. Inicia Laragon y asegúrate de tener MySQL corriendo.
2. Crea la base de datos:

```sql
CREATE DATABASE levelup_db;

📌 Al iniciar el backend se ejecuta un DataLoader que:

Inserta productos iniciales (con stock)

Inserta un usuario admin si no existe:

Email: admin@levelup.cl
Password: admin123
Rol: ADMIN

✔ Restricción de acceso por rol en frontend y backend

✔ Carrito con control de stock y registro de compras
```
---
## 🔌 Backend (Spring Boot)
✅ Características

API REST con CRUD para usuarios, productos y compras.

Autenticación con JWT.

Roles: ADMIN / USUARIO.

Separación por capas:

Controller

Service

Repository

Security

📄 Swagger / OpenAPI

Según tu configuración, normalmente queda disponible en:
```sql
http://localhost:8080/swagger-ui.html
```
---
## 💻 Frontend (React + Vite)
✅ Características

Vistas separadas (pages) y componentes reutilizables.

Manejo de sesión con localStorage.

Consumo de la API REST del backend.

Restricción de rutas según rol.
---
## ▶️ Cómo ejecutar el proyecto
1) Ejecutar Backend

Abrir la carpeta levelup/ en IntelliJ IDEA.

Verificar que el application.properties apunte a MySQL.

Ejecutar Spring Boot.

2) Ejecutar Frontend

Abrir terminal en levelup-Frontend/:
```sql
cd levelup-Frontend
npm install
npm run dev
```
Vite se ejecuta por defecto en:
```sql
http://localhost:5173
```
---
## 🧪 Pruebas Unitarias Frontend

Se implementó un proceso de testeo con pruebas unitarias para:

Componentes React (render y eventos).

Hooks (lógica de negocio).

Servicios (respuestas OK / error / excepciones).

Manipulación del DOM con Testing Library

Ejecutar pruebas
```sql
npm run test
```
Ejecutar cobertura
```sql
npm run coverage
```
---
🔐 Seguridad (Autenticación y Autorización)

Login con JWT.

Token almacenado en localStorage.

Protección de rutas por rol.

Restricciones en frontend y backend.

Cierre de sesión eliminando token/usuario.

✅ Estado actual del proyecto

 Backend conectado a MySQL (Laragon)

 API REST con CRUD para usuarios, productos y compras

 Documentación Swagger disponible

 Autenticación con JWT y roles (ADMIN / USUARIO)

 Sesión persistente en el frontend (localStorage)

 Restricción de acceso por rol (frontend y backend)

 Carrito con control de stock y registro de compras

 Pruebas unitarias en frontend con cobertura alta



