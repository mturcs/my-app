const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

const Tank = mongoose.model('Book1', { Name: String, Size: String });

const fruit = new Tank();


// or


/*
Tank.create({ Name: 'meggy', Size: 'small' }, function(err, res) {
    if (err) throw err;
    // saved!
    console.log(res.Name)
    mongoose.disconnect()

})
*/

/*
Tank.create({ Name: 'saláta', Size: 'small' }, function(err, res) {
    if (err) throw err;
    // saved!
    console.log(res)
    mongoose.disconnect()

})
*/

/*
const options = '';
const query = { Name: 'zöld dio' };
Tank.findOneAndUpdate(query, { Name: 'egres' }, options, function(err, res) {
    console.log(res);
    mongoose.disconnect();
})
*/

/*
Tank.deleteOne({ Name: 'egres' }, function(err, res) {
    console.log(res)
    mongoose.disconnect()
})
*/

Tank.find({ Size: 'small' }, function(err, res) {
    console.log(res)
    mongoose.disconnect()
})


console.log("hello")