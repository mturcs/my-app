var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

const MyModel = mongoose.model('book', new Schema({ name: String }));
// Works
MyModel.findOne({ name: 'xcvxc' }, function(err, res) {
    console.log(res)
    mongoose.connection.close()
});










/*
 const { MongoClient } = require("mongodb");
 // Connection URI
 const uri = "mongodb://localhost:27017/";
 // Create a new MongoClient
 const client = new MongoClient(uri);
 async function run() {
     try {
         // Connect the client to the server
         await client.connect();
         // Establish and verify connection
         await client.db("db").command({ ping: 1 });
         console.log("Connected successfully to server");
     } finally {
         // Ensures that the client will close when you finish/error
         await client.close();
     }
 }
 run().catch(console.dir);
*/
/*
 //Import the mongoose module
 var mongoose = require('mongoose');

 //Set up default mongoose connection
 var mongoDB = "mongodb://localhost:27017/db";
 mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

 //Get the default connection
 var db = mongoose.connection;

 //Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/