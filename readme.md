# Ejercicio N°2 API con Express y SQL, Conductores y Automóviles

# Descripción
 El objetivo de este ejercicio es aplicar los contenidos del modulo 6  mediante  de la integración Node.js y Express a una base de datos PostgreSQL.
 De estya forma se exponen endpoints REST que consulten y combinan la información. 
 Tambien, incluye un Front-End simple para que consumir los servicios.

 # Tecnologias
 - Node.js.
 - Express.
 - Postgres SQL.
 - HTML5 , CSS3 (para el Front-end)
 
 # Estructura del Proyecto
 ![Estructura del proyecto](https://github.com/AlvarezF7/M6-2-api-express-automoviles/blob/main/public/img/Estructura_proyecto.png).


 # Funcionalidades
 - Diseño Responsive adaptable a pantallas pequeñas.
 - Endpoints REST para:
   - GET/conductores → Listar todos los conductores.
   - GET/automoviles → Listar todos los automóviles.
   - GET/conductoressinauto?edad=XX → Conductores menores a edad sin automóvil.
   - GET/solitos → Conductores sin auto y automóviles sin conductor.
   - GET/auto → Buscar autos por patente o iniciopatente y sus conductores.

 # Capturas del Proyecto
 - Vista de un Iphone
 - ![iphone](https://github.com/AlvarezF7/M6-2-api-express-automoviles/blob/main/public/img/dimension-iphone.png).
 - Vista de un Ipad mini
 - ![ipad](https://github.com/AlvarezF7/M6-2-api-express-automoviles/blob/main/public/img/ipad-mini.png).

 # Instruciones para ejecutar el proyecto
 
 1. Clonar el proyecto.
 2. Instalar dependendecias con el comando **"npm install"**.
 3. Crear la base de datos en PostgreSQL.
    **"CREATE DATABASE m6_automoviles_conductores;"**
 4. Ejecuta el script **m6_automoviles_conductores.sql**
 5. Configura las variables de entorno en el archivo **.env_ejemplo**.
 6. Inicia el servidor con el comando **"npm start"**.
 7. Abre el Front-End en la ruta http://localhost:3000.
 8. Corre en la terminal **"node index.js"**.

# Ver Proyecto
  proximamente
  
 # Notas
 - Las credenciales de conexión no se suben al repositorio por seguridad.
 - El archivo .env.example sirve como guía para que cada usuario configure su propia conexión.
 - El archivo database.sql contiene solo la estructura de la base y datos de prueba, no incluye usuarios ni contraseñas.
 - Se utilizaron índices y relaciones en la base de datos para mejorar el rendimiento y mantener la integridad de los datos.



 # Autor
 - Fernanda Álvarez F. para programa FullStack JavaScript Sence.
