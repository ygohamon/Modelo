const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({error: 'Não foi providenciado nenhum Token!!!'});

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({error: 'Error de Token!!!'})

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token Mal Formatado!!!'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token invalid'})

        req.userId = decoded.id;
        return next();
    })
}