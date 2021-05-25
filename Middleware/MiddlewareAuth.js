const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // recupere le token aprés avoir enlever la chaine 1 (0) avant l'espace 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId != userId ) {
            throw ' Invalid user ID'
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('invalid Token !')
        });
    }
};