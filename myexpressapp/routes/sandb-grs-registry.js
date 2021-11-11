var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

/* const mongoose = require('mongoose'); */
mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });



const grsRegistry = require('./models/grs-registry-sch')


/* testing mongoose find all */
const finalResults = [];


/*
grsRegistry.find({}, function(err, person) {
    if (err) return err;

    console.log(person);
});
*/


var promises = grsRegistry.find({}, function (err, results) {
    results.forEach(function (element) {
        finalResults.push(element);
    });
});

Promise.all(promises).then(function () {
    console.log(finalResults.slice(0, 4));
}).error(console.error);






//console.log(grsRegistry.find().all())