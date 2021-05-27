const saucesModel = require('../Models/models'); //
const fs = require('fs');



// POST x4
exports.createSauces = (req, res, next) => {       // enregistre la nouvelle sauce et  met à zèro les compteurs de likes et de dislikes pour cette sauce 
    const objetSauce = JSON.parse(req.body.sauce);  // 
    delete objetSauce._id;

    const sauce = new saucesModel({
        ...objetSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // ici definir les info des tableaux like et pas like [] à zero.
        //ici definir les gens qui ont liké/paslike [] vide a la création
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'sauce enregistrée' }))
        .catch(error => res.status(400).json({ error }));

};

// exports.likeSauces = (req, res, next) => { 

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