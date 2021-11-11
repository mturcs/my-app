// File: ./models/grs-registry-sch.js

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const grsRegistrySchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    loginCount: Number,
    address: String,
    zip: Number,
    telNo: Number,
    registrationDate: Date,
    custId: Number,
    pwd: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('grsRegistry', grsRegistrySchema);
export { grsRegistrySchema }