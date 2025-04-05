import path from 'path';
import bcrypt from 'bcrypt';
import db from '../repositories/conexion.js';

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

            res.status(200).send('Inicio de sesión exitoso');
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    }

    // Renderizar la página de inicio de sesión
    getLoginPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }

}

export default new LoginController();