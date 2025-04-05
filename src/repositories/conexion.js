import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Ajusta según tu configuración en XAMPP
    database: 'eventos_ocaso', // Cambia por el nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result'); // Consulta sencilla para probar conexión
        console.log('Conexión exitosa a la base de datos:', rows[0].result); // Debería imprimir 2
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error.message);
    }
};

testConnection(); // Llama a la función para verificar conexión

export default pool;
