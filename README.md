eventos-ocaso/
│
├── backend/                  # Carpeta para el backend (Node.js)
│   ├── config/               # Configuración de la base de datos y otros ajustes
│   │   └── db.js             # Configuración de la conexión a MySQL
│   ├── controllers/          # Lógica de controladores (funciones para manejar rutas)
│   │   ├── authController.js # Controlador para login y registro
│   │   ├── reservaController.js # Controlador para las reservas
│   │   └── historialController.js # Controlador para el historial
│   ├── models/               # Modelos de base de datos (MySQL)
│   │   ├── user.js           # Modelo para los usuarios
│   │   ├── evento.js         # Modelo para los eventos
│   │   └── reserva.js        # Modelo para las reservas
│   ├── routes/               # Rutas del servidor
│   │   ├── authRoutes.js     # Rutas para login y registro
│   │   ├── reservaRoutes.js  # Rutas para hacer reservas
│   │   └── historialRoutes.js# Rutas para historial
│   ├── server.js             # Archivo principal de servidor
│   └── middleware/           # Middleware para autenticación, validación, etc.
│       └── authMiddleware.js # Middleware para verificar si el usuario está autenticado
│
├── frontend/                 # Carpeta para el front-end (HTML, CSS, JS)
│   ├── assets/               # Archivos estáticos (imágenes, iconos, fuentes, etc.)
│   ├── css/                  # Archivos CSS
│   │   └── loginregister.css # Estilos únicos para estas dos páginas
|   |   └── styles.css        # Estilos globales
│   ├── js/                   # Archivos JavaScript
│   │   └── app.js            # Funciones y lógica en JS
│   ├── pages/                # Páginas HTML
│   │   ├── index.html        # Página principal
│   │   ├── login.html        # Página de login
│   │   ├── register.html     # Página de registro
│   │   ├── servicios.html    # Página con la descripción de servicios
│   │   ├── reservas.html     # Página de reserva de eventos
│   │   └── historial.html    # Página de historial de eventos
│   ├── partials/             # Componentes reutilizables (cabecera, pie de página)
│       ├── header.html       # Cabecera del sitio
│       └── footer.html       # Pie de página del sitio
│
├── .gitignore                # Archivos que no deben ser versionados
├── package.json              # Dependencias del proyecto y configuración de npm
└── README.md                 # Descripción del proyecto

loginregister.css:
/* Estilo general para la página */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Contenedor principal */
.container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 20px;
}

/* Título del formulario */
h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

/* Estilo para el formulario */
form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Estilo para los labels */
label {
    font-size: 16px;
    color: #555;
    margin: 0 7px; /* Márgenes simétricos a ambos lados */
    padding: 5px 0;
}

/* Estilo para los inputs */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="datetime-local"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    margin: 0 10px; /* Aseguramos que los inputs se alineen simétricamente */
}

/* Botón de envío */
button[type="submit"] {
    background-color: #007BFF;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

/* Estilo para el enlace de registro */
a {
    color: #007BFF;
    text-decoration: none;
    text-align: center;
}

a:hover {
    text-decoration: underline;
}

/* Media Queries para responsividad */
@media (max-width: 768px) {
    .container {
        padding: 20px;
    }

    h1 {
        font-size: 22px;
    }

    label {
        font-size: 14px;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="date"],
    input[type="datetime-local"] {
        font-size: 14px;
    }

    button[type="submit"] {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 15px;
    }

    h1 {
        font-size: 20px;
    }

    label {
        font-size: 13px;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="date"],
    input[type="datetime-local"] {
        font-size: 13px;
    }

    button[type="submit"] {
        font-size: 13px;
        padding: 8px;
    }
}


los labels siguen estando hasta el final a la derecha del container y solo cambió el espaciado del lado izquierdo, como arreglarlo?

adicionalmente importa de una vez el header en el login y en el register, en el resto de archivos si es mejor importar header y footer, en estos solo el header.

adicionalmente crea el header, una línea de color morado claro con una parte más oscura, a la izquierda a la mitad un espacio para poner el logo de la compañía (una imagen que luego va a estar en assets) y un menú de navegación, a todas las otras páginas, inicio, eventos, reservas e historial, así en ese orden. pero que en estos archivos si no hay usuario loggeado aparezca en el footer que para continuar es necesario iniciar sesión, y que cuando si haya usuario loggeado este mensaje del footer desaparezca y aparezca la info de contacto de la compañía (también debe de aparecer cuando el usuario no esté loggeado, pero quiero hacer énfasis en que tan necesaria es la cuenta)