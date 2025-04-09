# CMPC Libros

Este es un proyecto de gestión de libros con funcionalidades de alta, edición, eliminación suave (soft delete), y filtros avanzados. El sistema está compuesto por un backend desarrollado con **NestJS** y un frontend en **React** con **Redux Toolkit** para la gestión del estado global.

## Tecnologías Backend

- **NestJS**: Framework para Node.js basado en TypeScript.
- **Sequelize**: ORM para interactuar con la base de datos (PostgreSQL).
- **Swagger**: Para documentar y probar los endpoints de la API.
- **JWT**: Autenticación y autorización basada en JSON Web Tokens.

## Tecnologías Frontend

- **React**: Librería para la construcción de interfaces de usuario.
- **Redux Toolkit**: Para la gestión del estado global de la aplicación.
- **Tailwind CSS**: Framework de CSS para diseño y estilo rápido.
- **Vite**: Herramienta de construcción de frontend.

## Estructura del Proyecto

```text
.
├── backend
│   ├── src
│   └── Dockerfile
├── frontend
│   ├── src
│   ├── public
│   └── Dockerfile
├── .env
├── docker-compose.yml
└── README.md
```

## Requerimientos

Asegúrate de tener instalados los siguientes componentes:

- **Docker** y **Docker Compose** para el manejo de contenedores.

## Instalación y configuración

### 1. Clona este repositorio

```bash
git clone <url_del_repositorio>
cd cmpc-libros
```

### 2. Configura los contenedores con Docker

Para levantar el proyecto y sus dependencias con Docker, corre el siguiente comando:

```bash
docker-compose up --build
```

Esto descargará las imágenes necesarias y levantará los servicios de Frontend, Backend y Base de datos en contenedores separados.

### 3. Accede a la aplicación

- El Frontend estará disponible en [http://localhost:5173/](http://localhost:5173/).
- El Backend estará corriendo en [http://localhost:3000/](http://localhost:3000/) (o el puerto que configures en tu archivo Docker).

## Funcionalidades Backend

- Autenticación: Implementación de login mediante JWT.
- CRUD de Libros: Alta, baja, edición y consulta de libros con soporte para eliminación lógica (soft delete).
- Filtrado y búsqueda avanzada: Filtrado por autor, editorial, género, y disponibilidad.
- Exportación de datos en formato CSV.

## Funcionalidades Frontend

- Login de autenticación: Para gestionar el acceso de los usuarios.
- Vista de Libros: Visualización de libros con filtros, paginación y búsqueda en tiempo real.
- Formulario de alta de libros: Creación de nuevos libros con validación de formulario.

## Docker

Este proyecto usa Docker para la creación de contenedores y facilitar la ejecución de la aplicación en cualquier entorno.

- Docker Compose: Se utiliza para orquestar los servicios de Frontend, Backend y Base de datos.
- Entorno de desarrollo: Los servicios se levantan mediante Docker Compose y están configurados para entornos de desarrollo.

### Comandos útiles

- Levantar contenedores y construir los servicios:

```bash
docker-compose down && docker-compose up --build
```

- Detener los contenedores:

```bash
docker-compose down
```

## Documentación de la API

La API del Backend está documentada utilizando **Swagger**. Accede a la documentación en:

- [http://localhost:3000/api](http://localhost:3000/api) (si es que usas el puerto por defecto)

## Testing Backend

```txt
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   89.51 |    35.48 |    71.6 |   90.78 |                   
 src                       |     100 |      100 |     100 |     100 |                   
  app.controller.ts        |     100 |      100 |     100 |     100 |                   
  app.service.ts           |     100 |      100 |     100 |     100 |                   
 src/auth                  |     100 |    33.33 |     100 |     100 |                   
  auth.controller.ts       |     100 |      100 |     100 |     100 |                   
  auth.service.ts          |     100 |        0 |     100 |     100 | 8                 
  jwt-auth.guard.ts        |     100 |      100 |     100 |     100 |                   
  jwt.strategy.ts          |     100 |       50 |     100 |     100 | 11                
 src/autor                 |     100 |      100 |     100 |     100 |                   
  autor.controller.ts      |     100 |      100 |     100 |     100 |                   
  autor.service.ts         |     100 |      100 |     100 |     100 |                   
 src/autor/dto             |     100 |      100 |     100 |     100 |                   
  create-autor.dto.ts      |     100 |      100 |     100 |     100 |                   
  update-autor.dto.ts      |     100 |      100 |     100 |     100 |                   
 src/autor/entities        |    87.5 |      100 |       0 |   83.33 |                   
  autor.entity.ts          |    87.5 |      100 |       0 |   83.33 | 12                
 src/config                |     100 |      100 |     100 |     100 |                   
  joi-validation-schema.ts |     100 |      100 |     100 |     100 |                   
 src/editorial             |     100 |      100 |     100 |     100 |                   
  editorial.controller.ts  |     100 |      100 |     100 |     100 |                   
  editorial.service.ts     |     100 |      100 |     100 |     100 |                   
 src/editorial/dto         |     100 |      100 |     100 |     100 |                   
  create-editorial.dto.ts  |     100 |      100 |     100 |     100 |                   
  update-editorial.dto.ts  |     100 |      100 |     100 |     100 |                   
 src/editorial/entities    |    87.5 |      100 |       0 |   83.33 |                   
  editorial.entity.ts      |    87.5 |      100 |       0 |   83.33 | 12                
 src/genero                |     100 |      100 |     100 |     100 |                   
  genero.controller.ts     |     100 |      100 |     100 |     100 |                   
  genero.service.ts        |     100 |      100 |     100 |     100 |                   
 src/genero/dto            |     100 |      100 |     100 |     100 |                   
  create-genero.dto.ts     |     100 |      100 |     100 |     100 |                   
  update-genero.dto.ts     |     100 |      100 |     100 |     100 |                   
 src/genero/entities       |    87.5 |      100 |       0 |   83.33 |                   
  genero.entity.ts         |    87.5 |      100 |       0 |   83.33 | 9                 
 src/libro                 |   83.95 |    46.66 |   86.66 |   88.73 |                   
  libro.controller.ts      |   84.21 |      100 |      75 |   83.33 | 50-53,145-148     
  libro.service.ts         |   83.72 |    38.46 |     100 |   94.28 | 69-70             
 src/libro/dto             |   65.11 |        0 |       0 |   71.79 |                   
  create-libro.dto.ts      |   70.58 |        0 |       0 |   70.58 | 22,33,43,53,63    
  find-libro.dto.ts        |   56.52 |      100 |       0 |   68.42 | 14,20,26,35,55,66 
  update-libro.dto.ts      |     100 |      100 |     100 |     100 |                   
 src/libro/entities        |      75 |      100 |       0 |   72.72 |                   
  libro.entity.ts          |      75 |      100 |       0 |   72.72 | 28,32,35,39,42,46 
 src/mocks                 |     100 |      100 |     100 |     100 |                   
  mockRepository.ts        |     100 |      100 |     100 |     100 |                   
---------------------------|---------|----------|---------|---------|-------------------

Test Suites: 13 passed, 13 total
Tests:       67 passed, 67 total
Snapshots:   0 total
Time:        24.624 s
```

## Testing Frontend
