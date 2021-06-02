 // TEST FONCTION LIKE ===> en test
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