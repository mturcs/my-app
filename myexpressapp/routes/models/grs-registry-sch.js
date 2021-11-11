// File: ./models/grs-registry-sch.js

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const grsRegistrySchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    zip: Number,
    address: String,
    telNo: Number,
    registrationDate: Date,
    custId: String,
    pwd: String,
    loginCount: Number,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('grsRegistry', grsRegistrySchema);