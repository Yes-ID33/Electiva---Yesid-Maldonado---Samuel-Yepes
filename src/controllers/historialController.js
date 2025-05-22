import path from 'path';
import { fileURLToPath } from 'url';
import db from '../repositories/conexion.js';
import LoginController from './loginController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HistorialController {
    async obtenerEventosUsuario(req, res) {
        try {
            const userId = LoginController.getUsuarioActual();

            if (!userId) {
                return res.status(401).json({ error: "No hay usuario autenticado." });
            }

            const eventos = await db.query("SELECT * FROM reservaciones WHERE idUsuario = ?", [userId]);

            res.json(eventos);
        } catch (error) {
            console.error("Error al obtener eventos:", error.message);
            res.status(500).json({ error: "Error en el servidor." });
        }
    }

    getHistorialPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/historial.html'));
    }
}

export default new HistorialController();
