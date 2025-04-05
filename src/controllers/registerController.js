import path from 'path';
import bcrypt from 'bcrypt';
import db from '../repositories/conexion'; // Importación del archivo de conexión

// Función para manejar los errores de la base de datos
const handleDatabaseError = (err, res) => {
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('El correo ya está registrado');
    }
    console.error('Error en la base de datos:', err.message);
    return res.status(500).send('Error en el servidor');
};

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
            const hashedPassword = await bcrypt.hash(password, 10);

            // Inserción del nuevo usuario en la base de datos
            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        return handleDatabaseError(err, res); // Usar la función para gestionar errores
                    }
                    res.status(201).send('Usuario registrado con éxito');
                }
            );
        } catch (error) {
            console.error('Error en el servidor:', error.message);
            res.status(500).send('Error en el servidor');
        }
    }

    getRegisterPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/register.html'));
    }
}

export default new RegisterController();