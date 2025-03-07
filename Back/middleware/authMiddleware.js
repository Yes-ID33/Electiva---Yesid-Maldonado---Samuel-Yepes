//Esto es para hacer la autentificación de las cuentas
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).send('Usuario no autenticado');
    }
};

module.exports = authMiddleware;
