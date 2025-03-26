import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './routes/htmlRoutes.js'; // Importar las rutas HTML

const app = express();
const port = 8080;

// Obtener el directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

// Usar el archivo de rutas HTML
app.use('/', htmlRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
