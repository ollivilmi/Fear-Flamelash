const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader === 'undefined') {
        res.sendStatus(403);
        return;
    }

    const token = bearerHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.auth = auth;
            next();
        }
    });
}

module.exports = verifyToken;