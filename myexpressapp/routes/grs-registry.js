var express = require('express');
var router = express.Router();


//const mongoose = require('mongoose');
// mongose_promise for getting array via read request
//const mongoosePromise = Promise.promisifyAll(require('mongoose'));

/* local DB  */
//mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });
//mongoosePromise.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });


/* ATLAS Cloud DB */
//const uri = "mongodb+srv://mdb:fR998eendom@cluster0.sswh7.mongodb.net/db?retryWrites=true&w=majority";

//mongoose.connect(uri, { useNewUrlParser: true });

//mongoosePromise.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

grsRegistry = require('./models/grs-registry-sch')
grsLoggedIn = require('./models/logged-in-sch')

const readResults = [];


//create with post req
router.post('/create', function (req, res, next) {
    const mQuery = req.body
    console.log("mquery: ",req.body)
    grsRegistry.create(mQuery, function (err, mresp) {
        
        res.send({ "Message": "Ceated successfully" })
    })

})

//create login session with post req
router.post('/create/loginsession', function (req, res, next) {
    const mQuery = req.body
    console.log("mquery: ",req.body)
    grsLoggedIn.create(mQuery, function (err, mresp) {
        
        res.send({ "Message": "Ceated successfully" })
        if (err) {
            console.log("DBHIBA")
        }
    })
})





//query with post request
router.post('/query', function (req, res, next) {
    const mQuery = req.body
    grsRegistry.find(mQuery, function (err, mresp) {
        res("created")
    })

})

//update with post req
router.post('/update', function (req, res, next) {
    
    const mId = req.query._id;
    const mQuery = req.body
    const mUpdate = req.body.update;
    const mOptions = '';
    grsRegistry.findByIdAndUpdate(mId, mQuery, mOptions, function (err, mresp) {
       res.send({ "Message": "Updated successfully" })
       console.log(mQuery,mId)
       if (err) {
        console.log("MONOERR",err)
        
    }
    })
    
})





//delete with post req
router.post('/delete', function (req, res, next) {
    const mId = req.query._id;
    console.log(mId)
    grsRegistry.findByIdAndRemove(mId, function (err, mresp) {
        res.send({ "Message": "Removed HELLO successfully" })
    })



})



//query by email
router.get('/qemail', function (req, res, next) {
    const mId = req.query.email;
    console.log(mId)
    grsRegistry.find({ email: mId }, function (err, mered) {
        res.send(mered)
    })
})






// query by email
router.get('/lista/:qparam', function (req, res, next) {

    grsRegistry.find({ email: req.params.qparam }, function (err, mered) {

        res.json(mered)
    })

    // res.send(req.params.userId);

})

// query by size
router.get('/param', function (req, res, next) {

    grsRegistry.find({}, function (err, mered) {
        //console.log(mered)
        res.json(mered)
    })

    // res.send(req.params.userId);

})

// array read
router.get('/read/', function (req, res, next) {


    grsRegistry.find({}, function (err, mered) {

        res.json(mered)

    })


    /*
        const promises = grsRegistry.find({}, function(err, results) {
            results.forEach(function(element) {
                finalResults.push(element);
            });
        });

        Promise.all(promises).then(function(err, mered) {
            console.log(finalResults.slice(0, 4));
        }).res(mered);

    */

})



module.exports = router;