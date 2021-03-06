const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // controle le token ( à envoyer sur toute les routes)
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'user Id non valable';
        }else {
            next();
        }

    } catch (error) {
        res.status(401).json({error : error | 'requete non authentifiée !'})
    }
};
