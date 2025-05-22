import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import db from './repositories/conexion.js';
import htmlRoutes from './routes/routes.js';
import RegisterController from './controllers/registerController.js';
import LoginController from './controllers/loginController.js';
import reservaController from './controllers/reservaController.js';
import historialController from './controllers/historialController.js';

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
app.post('/submit-event', (req, res) => reservaController.reservarEvento(req, res));
app.post('/update-event', (req, res) => reservaController.actualizarEvento(req, res));
app.delete('/delete-event', (req, res) => reservaController.eliminarEvento(req, res));

//ruta para cargar todos los eventos de un usuario
app.get('/mis-eventos', async (req, res) => {
    try {
        let userId = LoginController.getUsuarioActual();

        if (!userId) {
            return res.status(401).json({ error: "No hay usuario autenticado." });
        }

        let eventos = await db.query("SELECT * FROM reservaciones WHERE idUsuario = ?", [userId]);
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ error: "Error en el servidor." });
    }
});

//ruta para cargar los datos de un evento específico para hacerle cambios y actualizarlo
app.get('/evento/:idEvento', async (req, res) => {
    try {
        let userId = LoginController.getUsuarioActual();
        if (!userId) {
            return res.status(401).json({ error: "No hay usuario autenticado." });
        }

        const { idEvento } = req.params;
        let evento = await db.query("SELECT * FROM reservaciones WHERE idEvento = ? AND idUsuario = ?", [idEvento, userId]);

        if (!evento.length) {
            return res.status(404).json({ error: "Evento no encontrado." });
        }

        res.json(evento[0]); // ✅ Devuelve el primer resultado correctamente
    } catch (error) {
        console.error("Error al obtener evento:", error);
        res.status(500).json({ error: "Error en el servidor." });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});