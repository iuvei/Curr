var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    admin: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    email: {type: String, unique: true},
    password: String,
    username: String,
    photo: {type: String, default: ''},
    info: {type: String, default: ''},
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
