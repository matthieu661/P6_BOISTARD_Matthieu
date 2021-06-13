const saucesModel = require('../Models/models');
const noSql = require('./Secure');
const fs = require('fs'); 
const path = require('path');
var sanitize = require('mongo-sanitize');
 
// The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.
//var clean = sanitize(req.params.username);
 
/*Users.findOne({ name: clean }, function(err, doc) {
  // ...
});*/

exports.createSauces = (req, res, next) => { 
    let test = (req.body); 
    console.log(JSON.stringify(test))
    const objetSauce = JSON.parse(req.body.sauce);
    
     
        
        delete objetSauce._id;
        //console.log(req.body.sauce);
        const sauce = new saucesModel({
            ...objetSauce,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [], // a tester
            usersDisliked: []
        });
        
        sauce.save()
            .then(() => res.status(201).json({ message: 'sauce enregistrée' }))
            .catch(error => res.status(400).json({ error }));
    
     
};

exports.likeSauce = (req, res, next) => {
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

exports.modifySauces = (req, res, next) => {

    const objetSauce = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              // rennomer l'image ! 
        } : { ...req.body };
        console.log(objetSauce)
    if (noSql.ValideString(objetSauce.name) && noSql.ValideString(objetSauce.manufacturer) && noSql.ValideString(objetSauce.description) && noSql.ValideString(objetSauce.mainPepper)) {
        // modifie une sauce existante
        saucesModel.updateOne({ _id: req.params.id }, { ...objetSauce, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    } else {

        return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
    }
};

exports.deleteSauces = (req, res, next) => {
    saucesModel.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {                   
                saucesModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json({ message: 'sauce suprimée' })) 
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauces = (req, res, next) => {                                         
    saucesModel.findOne({ _id: req.params.id })              
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {

    saucesModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));                 
};