const mongoose = require('mongoose');
const bcryptjs = require('bcrypt-js');

// Utilisateur schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.getUserById = function(id, callback) {
    User.findById(id, callback);
}

UserSchema.statics.getUserByUserName = function(username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
}

UserSchema.statics.getUsers = () => {
    return User.find({}, '-password');
}

UserSchema.statics.addUser = function(newUser, callback) {
    User.getUserByUserName(newUser.username, (err, user) => {
        if (err) return callback({msg: "There was an error on getting the user"});
        if (user) {
            let error = {msg: "Username is already in use"};
            return callback(error);
        }else {
            bcryptjs.genSalt

        }
    })
}