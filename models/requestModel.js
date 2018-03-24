var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var requestSchema = mongoose.Schema({


        createdBy: String,
        firstName: String,
        lastName: String,
        email: String,
        homeAddress: String,
        homeCity: String,
        homeState: String,
        homeZip: Number,
        occupation: Array,
        income: Number,
        housingCost: Number,
        amountNeeded: Number,
        housingLink: String,
        story: String



});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Request', requestSchema);
