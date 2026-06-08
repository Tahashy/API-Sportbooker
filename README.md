Hemos levantado un servidor Node.js local que simula una base de datos real. Esto le permite al Frontend conectarse inmediatamente sin tener que esperar a que se desarrolle una base de datos compleja, acelerando el desarrollo de la aplicación.

Características implementadas:
Tipos de Datos Exactos: Se crearon las interfaces TypeScript exactas solicitadas en la guía (Usuario, Proveedor, Espacio, Reserva, etc.).
Endpoints Completos: Se programaron todos los endpoints requeridos.
Simulación Inteligente:
Al hacer un POST (como crear una reserva o espacio), la API genera IDs automáticamente y devuelve el objeto estructurado correctamente.
Al hacer login (POST /api/auth/login), se devuelve un token de sesión simulado.
> [!TIP]
El servidor está corriendo en la URL base: http://localhost:3000

 probar cualquiera de estas rutas 

Espacios: GET http://localhost:3000/api/espacios
Proveedores: GET http://localhost:3000/api/proveedores
Reservas: POST http://localhost:3000/api/reservas 
Login: POST http://localhost:3000/api/auth/login 

