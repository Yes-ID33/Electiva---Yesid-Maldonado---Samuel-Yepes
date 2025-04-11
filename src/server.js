import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './routes/routes.js';
import RegisterController from './controllers/registerController.js';
import LoginController from './controllers/loginController.js';

const app = express();
const port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar middleware para procesar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar middleware para servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Usar el archivo de rutas para páginas HTML
app.use('/', htmlRoutes);

// Rutas para procesar formularios
app.post('/signup', (req, res) => RegisterController.register(req, res));
app.post('/login', (req, res) => LoginController.login(req, res));

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});