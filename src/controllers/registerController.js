import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import db from '../repositories/conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RegisterController {
    async register(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        // Validación de los datos ingresados
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden');
        }

        try {
            // Verificar si el email ya existe
            const existingUser = await db.findByEmail(email);
            if (existingUser) {
                return res.status(400).send('El correo ya está registrado');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Inserción del nuevo usuario en la base de datos
            await db.createUser(name, email, hashedPassword);
            
            // Redirigir al usuario a la página de inicio de sesión después de un registro exitoso
            res.redirect('/login.html');
            
        } catch (error) {
            console.error('Error en el servidor:', error.message);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('El correo ya está registrado');
            }
            res.status(500).send('Error en el servidor');
        }
    }

    getRegisterPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    }
}

export default new RegisterController();