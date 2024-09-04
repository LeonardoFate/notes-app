

# Full Stack Project – Create A Notes App Using React and Node.js

Notes-App es una aplicación para gestionar y almacenar notas, desarrollada con una arquitectura de frontend 
y backend separados, utilizando tecnologías modernas como React y Node.js.

Tecnologías Utilizadas
Frontend
 
 * React: Biblioteca de JavaScript para la construcción de interfaces de usuario.
 * TypeScript: Superset de JavaScript que proporciona tipado estático.
 * HTML5 y CSS3: Para la estructura y estilos del frontend.

Backend
 
 * Node.js: Entorno de ejecución de JavaScript en el lado del servidor.
 * TypeScript: Utilizado también en el servidor para garantizar la robustez del código.
 * MongoDB: Base de datos NoSQL para almacenar las notas.
 * Mongoose: ODM para la interacción con MongoDB.

Características
 * Crear, editar y eliminar notas.
 * Frontend construido con React y TypeScript.
 * Backend eficiente con Express y Node.js.
 * Almacenamiento de notas en MongoDB.

### 1. Clona el repositorio
```bash
git clone https://github.com/LeonardoFate/notes-app.git
cd notes-app
```
### 2. Instalación de dependencias del frontend:
```bash
cd notes-app
npm install
```

### 3. Instalación de dependencias del backend:
```bash
cd notes-app-server
npm install
```

# Uso

#### 1. Configura las variables de entorno creando un archivo .env en el backend. Ejemplo de archivo .env:

```bash
MONGO_URI=mongodb:"Conexion a tu base de datos MDB"
PORT=3001
```
#### 2. Inicia el servidor backend:

```bash
cd notes-app-server
npm run start:dev
```
#### 3. Inicia el servidor frontend:
```bash
cd ../notes-app
npm start
```

### Abre el navegador en http://localhost:3000 para utilizar la aplicación.


