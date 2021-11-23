var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* Local DB */
//mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

/* ATLAS Cloud DB */
const uri = "mongodb+srv://mdb:fR998eendom@cluster0.sswh7.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });





const Tank = mongoose.model('Book1', { Name: String, Size: String });






/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('root');
});

router.get('/cool', function(req, res, next) {
    res.send('You are so COOL');
});

router.get('/about', function(req, res, next) {
    res.send('About this wiki');
})



//create with post req
router.post('/create', function(req, res, next) {
    const mQuery = req.body
    Tank.create(mQuery, function(err, mresp) {
        res.send({ "Message": "Ceated successfully" })
    })

})

//query with post request
router.post('/query', function(req, res, next) {
    const mQuery = req.body
    Tank.find(mQuery, function(err, mresp) {
        res("created")
    })

})

//update with post req
router.post('/update', function(req, res, next) {
    const mQuery = req.body.query;
    const mUpdate = req.body.update;
    const mOptions = '';

    Tank.findByIdAndUpdate(mQuery, mUpdate, mOptions, function(err, mresp) {

        res.send({ "Message": "Updated successfully" })
    })

})

//delete with post req
router.post('/delete', function(req, res, next) {
    const mQuery = req.body
    Tank.findByIdAndRemove(mQuery, function(err, mresp) {
        res.send({ "Message": "Updated successfully" })
    })

})




// query by size
router.get('/lista/:qparam', function(req, res, next) {

    Tank.find({ Size: req.params.qparam }, function(err, mered) {

        res.json(mered[0].Name)
    })

    // res.send(req.params.userId);

})

// query by size
router.get('/param', function(req, res, next) {

    Tank.find(req.query, function(err, mered) {

        res.json(mered)
    })

    // res.send(req.params.userId);

})




module.exports = router;