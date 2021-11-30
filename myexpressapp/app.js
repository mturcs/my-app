var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var grsRegistryRouter = require('./routes/grs-registry');
var cors = require('cors');
var app = express();

/* local DB  */
//mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });
//mongoosePromise.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });


/* ATLAS Cloud DB */
const uri = "mongodb+srv://mdb:fR998eendom@cluster0.sswh7.mongodb.net/db?retryWrites=true&w=majority";

var mongoDB = process.env.MONGODB_URI || uri;

mongoose.connect(mongoDB, { useNewUrlParser: true });

// this is to enable cors on server side
//https://stackoverflow.com/questions/51640206/angular-client-enable-cors
app.use(cors());

console.log("CORS ENABLED")
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/about', usersRouter);
app.use('/app', grsRegistryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.send('HIBA HIBA');
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.header('Access-Control-Allow-Origin', 'http://localhost:3000/create');
    app.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    app.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    app.header('Access-Control-Allow-Credentials', true);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
*/
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next();
});




module.exports = app;