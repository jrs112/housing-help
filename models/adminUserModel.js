var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var adminUserSchema = mongoose.Schema({


        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        password: String,


});

// methods ======================
// generating a hash
adminUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminUserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('AdminUser', adminUserSchema);
