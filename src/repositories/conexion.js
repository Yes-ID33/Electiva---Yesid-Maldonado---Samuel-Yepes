import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Ajusta según tu configuración en XAMPP
    database: 'eventos_ocaso',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Conexión exitosa a la base de datos:', rows[0].result);
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error.message);
    }
};

testConnection();

// Métodos de la base de datos para usuarios
const db = {
    // Buscar usuario por email
    async findByEmail(email) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error al buscar usuario por email:', error.message);
            throw error;
        }
    },

    // Crear un nuevo usuario
    async createUser(name, email, hashedPassword) {
        try {
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            return result;
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
            throw error;
        }
    },

    // Ejecutar consulta directa (para casos especiales)
    async query(sql, params) {
        try {
            const [result] = await pool.query(sql, params);
            return result;
        } catch (error) {
            console.error('Error en consulta SQL:', error.message);
            throw error;
        }
    }
};

export default db;