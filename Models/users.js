const mongoose = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({ 
    email : {type: 'string', required : true, unique : true}, // email unique seulement
    password : {type: 'string', required : true}
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);