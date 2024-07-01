const jwt = require('jsonwebtoken');
const secret = 'mysecret'; // Use um segredo mais seguro e armazene-o em uma variável de ambiente

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Token error' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token malformatted' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }

        req.userId = decoded.userId;
        return next();
    });
};

module.exports = auth;
