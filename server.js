require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'eventos_ocaso'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secreto_seguro',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'Front/resources')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Front/pages'));

// Ruta de registro con validación de contraseñas
app.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('El correo ya está registrado');
                }
                console.error(err);
                return res.status(500).send('Error en el servidor');
            }
            res.send('Usuario registrado con éxito');
        });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(401).send('Correo o contraseña incorrectos');
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Correo o contraseña incorrectos');
        }

        req.session.userId = user.id;
        res.send('Inicio de sesión exitoso');
    });
});

// Ruta de logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.send('Sesión cerrada con éxito');
    });
});

// Ruta para el home
app.get('/', (req, res) => {
    res.render('index');  // Asegúrate de que 'index.ejs' está en la carpeta 'front/pages'
});

// Servidor en marcha
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
