import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import htmlRoutes from './routes/routes.js'; // Importar las rutas HTML

const app = express();
const port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar middleware para servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Usar el archivo de rutas
app.use('/', htmlRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
