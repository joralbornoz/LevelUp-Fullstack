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

El repositorio contiene **dos carpetas principales**:

- `levelup/` → **Backend**  
  - Spring Boot + Spring Security + JWT  
  - MySQL (usando Laragon como entorno de base de datos)
  - Swagger/OpenAPI para documentación de la API

- `levelup-Frontend/` → **Frontend**  
  - React + Vite  
  - Gestión de sesión con `localStorage`
  - Consumo de la API REST del backend

---

## 🛠 Tecnologías Utilizadas

### Backend
- **Java 17** (o la versión que uses)
- **Spring Boot**
  - Spring Web
  - Spring Security (JWT)
  - Spring Data JPA
- **MySQL** (ejecutado mediante **Laragon**)
- **Maven**
- **IntelliJ IDEA** como IDE principal
- **Swagger / OpenAPI** para documentar la API

### Frontend
- **React** con **Vite**
- **JavaScript / JSX**
- **Fetch API** para consumir el backend
- Manejo de estado de sesión con `localStorage`
- Hooks personalizados: `useCarrito`, `useProductos`, `usePerfil`, `useAdmin`

---

## 🗄 Base de Datos (Laragon + MySQL)

1. Asegúrate de que **Laragon esté levantado** y MySQL corriendo.
2. Crea la base de datos:

   ```sql
   CREATE DATABASE levelup_db
3. Al iniciar el backend, se ejecuta un DataLoader que:

- **Inserta productos iniciales (con stock)**
- **Inserta el usuario admin si no existe, por ejemplo:**
- **Email: admin@levelup.cl**
- **Password: admin123**
- **Rol: ADMIN**    

## 💻 Cómo ejecutar el Frontend (React + Vite)
- **Abrir una terminal en la carpeta:**
  ```bash
  cd levelup-Frontend
  ```
- **Instalar dependencias:**
  ```bash
  npm install
  ```
- **Levantar el proyecto en modo desarrollo:**
  ```bash
  npm run dev
  ```
- **Vite se ejecuta por defecto en:**
  ```text
  http://localhost:5173
  ```
- **Asegúrate de que el backend esté corriendo antes de probar la app completa.**

## ✅ Estado actual del proyecto

✔ Backend conectado a MySQL (Laragon)

✔ API REST con CRUD para usuarios, productos y compras

✔ Documentación con Swagger disponible

✔ Autenticación con JWT y roles (ADMIN / USUARIO)

✔ Sesión persistente en el frontend

✔ Restricción de acceso por rol en frontend y backend

✔ Carrito con control de stock y registro de compras
