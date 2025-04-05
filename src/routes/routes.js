import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Ruta para la página principal
router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../views', 'index.html'));
});

// Ruta para la página de inicio de sesión
router.get('/login.html', (req, res) => {
    res.sendFile(join(__dirname, '../views', 'login.html'));
});

// Ruta para la página de registro
router.get('/register.html', (req, res) => {
    res.sendFile(join(__dirname, '../views', 'register.html'));
});

// Ruta para la página de servicios
router.get('/servicios.html', (req, res) => {
    res.sendFile(join(__dirname, '../views', 'servicios.html'));
});

// Ruta para la página de reservas
router.get('/reservas.html', (req, res) => {
    res.sendFile(join(__dirname, '../views', 'reservas.html'));
});

export default router;
