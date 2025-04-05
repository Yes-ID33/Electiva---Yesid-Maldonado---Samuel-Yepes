import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './routes/routes.js';
//import RegisterController from './controllers/registerController.js';

const app = express();
const port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar middleware para servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Usar el archivo de rutas
app.use('/', htmlRoutes);

// Ruta para manejar el registro de usuarios
//app.post('/signup', (req, res) => RegisterController.register(req, res));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
