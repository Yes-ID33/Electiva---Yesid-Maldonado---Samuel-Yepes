import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import db from '../repositories/conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let usuarioActualId = null; // Variable global para almacenar el ID del usuario autenticado

class LoginController {
    // Manejar el login de usuarios
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        try {
            const user = await db.findByEmail(email);

            if (!user) {
                return res.status(401).send('Correo o contraseña incorrectos');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Correo o contraseña incorrectos');
            }

            // Guardar el ID del usuario en la variable global
            usuarioActualId = user.id;

            // Redirigir al usuario a index.html después de iniciar sesión
            res.redirect('/');
            
        } catch (error) {
            console.error('Error en el servidor:', error.message);
            res.status(500).send('Error en el servidor');
        }
    }

    // Obtener el ID del usuario autenticado
    getUsuarioActual() {
        return usuarioActualId;
    }

    // Renderizar la página de inicio de sesión
    getLoginPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
}

export default new LoginController();
