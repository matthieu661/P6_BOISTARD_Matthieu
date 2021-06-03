const mongoose = require('mongoose');

const modelSauce = mongoose.Schema({ 
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true}, 
    heat: { type: Number, required: true}, 
    likes: { type: Number, default: 0, require: true},             
    dislikes: { type: Number, default: 0, require: true},         
    usersLiked: { type: Array, default:[], require: true},        
    usersDisliked: { type: Array, default:[], require: true},     
}) ; 

module.exports = mongoose.model('saucesModel', modelSauce);
