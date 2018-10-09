var express = require('express');
var exphbs  = require('express-handlebars');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Joi = require('joi');
var path = require('path');

var app = express();

var indexRoute = require('./routes/index');
var booksRoutes = require('./routes/books');
var genresRoutes = require('./routes/genres');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.use(cookieParser());

// public path
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set("views", path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// connect flash
app.use(flash());

// Global variable
app.use(function (req, res, next) {
    res.locals.testVar = "tasfin";
    //res.locals.success_msg = req.flash('success_msg');
    //res.locals.error_msg = req.flash('error_msg');
    //res.locals.error = req.flash('error');
    next();
})

mongoose.connect('mongodb://localhost/nodeapp');
var db = mongoose.connection;

// set routes
app.use('/', indexRoute);
app.use('/', booksRoutes);
app.use('/', genresRoutes);

// set port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('Server started on port '+app.get('port')+'...');
});
