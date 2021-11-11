// File: ./models/logged-in-sch.js

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const loggedInSchema = new Schema({
    cust_id: String,
    logged_in_time: Number,
    session_id: String,
    logged_in: Boolean
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('grsloggedIn', loggedInSchema);