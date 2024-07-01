const jwt = require('jsonwebtoken');
const secret = 'mysecret'; // Use um segredo mais seguro e armazene-o em uma variável de ambiente

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        console.log('Token error');
        return res.status(401).json({ message: 'Token error' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        console.log('Token malformatted');
        return res.status(401).json({ message: 'Token malformatted' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log('Token invalid');
            return res.status(401).json({ message: 'Token invalid' });
        }

        console.log('Token valid', decoded);
        req.userId = decoded.userId;
        return next();
    });
};

module.exports = auth;
