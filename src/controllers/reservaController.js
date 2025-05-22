import path from 'path';
import { fileURLToPath } from 'url';
import db from '../repositories/conexion.js';
import LoginController from './loginController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReservaController {
    // Insertar nueva reservación
    async reservarEvento(req, res) {
        const { tipoEvento, direccion, fecha, hora, invitados, vestimenta } = req.body;
        const userId = LoginController.getUsuarioActual();

        if (!userId) {
            return res.status(401).send('Debes iniciar sesión para reservar un evento.');
        }
        console.log("Datos recibidos en el servidor:", req.body);

        try {
            await db.query(
                "INSERT INTO reservaciones (idUsuario, tipoEvento, direccion, fechaEvento, horaEvento, cantInvitados, codigoVestimenta) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [userId, tipoEvento, direccion, fecha, hora, invitados, vestimenta]
            );

            res.status(201).send('Reserva creada exitosamente.');
        } catch (error) {
            console.error("Error al registrar la reserva:", error.message);
            res.status(500).send("Error en el servidor.");
        }
    }

    // Actualizar reservación
    async actualizarEvento(req, res) {
        const { idEvento, tipoEvento, direccion, fecha, hora, invitados, vestimenta } = req.body;
        const userId = LoginController.getUsuarioActual();

        if (!userId) {
            return res.status(401).send('Debes iniciar sesión para modificar un evento.');
        }

        try {
            await db.query(
                "UPDATE reservaciones SET tipoEvento = ?, direccion = ?, fechaEvento = ?, horaEvento = ?, cantInvitados = ?, codigoVestimenta = ? WHERE idEvento = ? AND idUsuario = ?",
                [tipoEvento, direccion, fecha, hora, invitados, vestimenta, idEvento, userId]
            );

            res.status(200).send('Reserva actualizada exitosamente.');
        } catch (error) {
            console.error("Error al actualizar la reserva:", error.message);
            res.status(500).send("Error en el servidor.");
        }
    }

    // Eliminar reservación
    async eliminarEvento(req, res) {
        const { idEvento } = req.body;
        const userId = LoginController.getUsuarioActual();

        if (!userId) {
            return res.status(401).send('Debes iniciar sesión para cancelar un evento.');
        }

        try {
            await db.query("DELETE FROM reservaciones WHERE idEvento = ? AND idUsuario = ?", [idEvento, userId]);

            res.status(200).send('Reserva eliminada exitosamente.');
        } catch (error) {
            console.error("Error al eliminar la reserva:", error.message);
            res.status(500).send("Error en el servidor.");
        }
    }

    getReservasPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/reservas.html'));
    }
}

export default new ReservaController();
