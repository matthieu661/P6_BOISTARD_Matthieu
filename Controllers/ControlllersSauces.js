const saucesModel = require('../Models/models'); //
const fs = require('fs');
const noSql = require('./Secure');



// POST x2
exports.createSauces = (req, res, next) => {      // enregistre la nouvelle sauce et  met à zèro les compteurs de likes et de dislikes pour cette sauce 

    const objetSauce = JSON.parse(req.body.sauce);  // 
    // securise l 'input des caractéres speciaux ( il faut parser l'objet pour pouvoir appliquer la fonction dessus)
    if (noSql.ValideString(objetSauce.name) && noSql.ValideString(objetSauce.manufacturer) && noSql.ValideString(objetSauce.description) && noSql.ValideString(objetSauce.mainPepper)) {
        delete objetSauce._id;
        console.log(req.body.sauce);

        const sauce = new saucesModel({
            ...objetSauce,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            // ici definir les info des tableaux like et pas like [] à zero.
            //ici definir les gens qui ont liké/paslike [] vide a la création
            likes: 0,
            dislikes: 0,
            usersLiked: [], // a tester
            usersDisliked: []
        });

        sauce.save()
            .then(() => res.status(201).json({ message: 'sauce enregistrée' }))
            .catch(error => res.status(400).json({ error }));
    } else {

        return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
    }
};

exports.likeSauce = (req, res, next) => {
    // le tableau des like est dans le modelsauce donc je dois update la sauce pour sauvegarder le compteur de like
    //( dans model la valeur est 0?? utile ??( oui si pas de middleware pour prevoir le cas ""))
    // sans updateOne, la fonction ne sauvegardera pas dans la BD le like ::: ! 
    //si 1
    if (req.body.like === 0) {
        saucesModel.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.find(user => user === req.body.userId)) {
                    saucesModel.updateOne({ _id: req.params.id }, {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    })
                        .then(() => { res.status(201).json({ message: "vote enregistré." }); })
                        .catch((error) => { res.status(400).json({ error }); });
    
                } else if (sauce.usersDisliked.find(user => user === req.body.userId)) { 
                    saucesModel.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    })
                        .then(() => { res.status(201).json({ message: "vote enregistré." }); })
                        .catch((error) => { res.status(400).json({ error }); });
                }
    
            })
            .catch((error) => { res.status(404).json({ error }); });
    }
    else if(req.body.like != 0) {
        if(req.body.like > 0) {
            saucesModel.updateOne({ _id: req.params.id }, {            
                $inc: { likes: 1 },                                 
                $push: { usersLiked: req.body.userId }             
              })
                .then(() => { res.status(201).json({ message: "vote enregistré." }); })
                .catch((error) => { res.status(400).json({ error }); }); 
        }else if(req.body.like < 0) {
            saucesModel.updateOne({ _id: req.params.id }, {               
                $inc: { dislikes: 1 },                                
                $push: { usersDisliked: req.body.userId }             
              })
                .then(() => { res.status(201).json({ message: "vote enregistré." }); }) 
                .catch((error) => { res.status(400).json({ error }); }); 
        }
        
    }
}

// 3 le 0 == annule 
// 3-1 de vert à neutre
//3-2 de red a neutre
// faut stocker ces resultats dans 2 tableaux ( fichier sauce.model.ts sur le front) --> modifier le model de sauce en tableau?? 

// a test : default
// https://stackoverflow.com/questions/41033839/make-mongoose-string-schema-type-default-value-as-blank-and-make-the-field-optio
// https://mongoosejs.com/docs/2.7.x/docs/defaults.html
// push tableau operator : 
// : https://www.ipgirl.com/47307/poussez-les-objects-dans-le-tableau-mongo-via-la-mongoose.html



// PUT x1 
exports.modifySauces = (req, res, next) => {

    const objetSauce = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    if (noSql.ValideString(objetSauce.name) && noSql.ValideString(objetSauce.manufacturer) && noSql.ValideString(objetSauce.description) && noSql.ValideString(objetSauce.mainPepper)) {
        // modifie une sauce existante
        saucesModel.updateOne({ _id: req.params.id }, { ...objetSauce, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    } else {

        return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
    }
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
    //sauceModel.remove({})// pour delete tout
    saucesModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));                 // récupere toutes les sauces dans la base de données
};