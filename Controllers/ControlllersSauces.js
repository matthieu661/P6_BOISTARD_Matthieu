const saucesModel = require('../Models/models'); //
const fs = require('fs');



// POST x2
exports.createSauces = (req, res, next) => {       // enregistre la nouvelle sauce et  met à zèro les compteurs de likes et de dislikes pour cette sauce 
    const objetSauce = JSON.parse(req.body.sauce);  // 
    delete objetSauce._id;

    const sauce = new saucesModel({
        ...objetSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // ici definir les info des tableaux like et pas like [] à zero.
        //ici definir les gens qui ont liké/paslike [] vide a la création
        likes:0,
        dislikes:0,
        usersLiked:[], // a tester
        usersDisliked:[] 
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'sauce enregistrée' }))
        .catch(error => res.status(400).json({ error }));

};

exports.likeSauces = (req, res, next) => { 
    // 1 je dois trouvé la sauce == findOne
    saucesModel.findOne({ _id: req.params.id })
        .then(sauce => {
    // 2 testé si j'aime === 1 ou -1  ? (utiliser if / if /if  ? teste de cas (avec break)) // + est-ce que j'ai déja voté ? (doit recherché le tableau des likes)
            if(req.body.like === 1 && sauce.usersLiked.indexOf(req.body.userId) < 0)
             {
                sauce.usersLiked.push(req.body.userid); //fonction push dans le tableau
                sauce.likes += 1;
             } //incremente le tableau des likes
            if(req.body.like === -1 && sauce.usersDisliked.indexOf(req.body.userId)< 0)
             {
                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes += 1; 
            }  // incremente le tableau dislikes
            if(req.body.like === 1 && sauce.usersLiked.indexOf(req.body.userId) == 1 ){

            }
        .catch(error => res.status(400).json({ error }))
    // 3 le 0 == annule 
    // faut stocker ces resultats dans 2 tableaux ( fichier sauce.model.ts sur le front) --> modifier le model de sauce en tableau?? 

    // a test : default
    // https://stackoverflow.com/questions/41033839/make-mongoose-string-schema-type-default-value-as-blank-and-make-the-field-optio
    // https://mongoosejs.com/docs/2.7.x/docs/defaults.html
        // push tableau
            // : https://www.ipgirl.com/47307/poussez-les-objects-dans-le-tableau-mongo-via-la-mongoose.html
    


// PUT x1 
exports.modifySauces = (req, res, next) => {
    const objetSauce = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };          
        // modifie une sauce existante
    saucesModel.updateOne({ _id: req.params.id }, { ...objetSauce, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};
// DELETE x1
exports.deleteSauces = (req, res, next) => {
    saucesModel.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {                      // supprime une sauce
                saucesModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json({ message: 'sauce suprimée' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// GET x2
exports.getOneSauces = (req, res, next) => {                                          // récupere une sauce specified par id dans la base de données
    saucesModel.findOne({ _id: req.params.id })      // passe par "params"          
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    saucesModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));                 // récupere toutes les sauces dans la base de données
};