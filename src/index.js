require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path'); 
const route = require('./routers');
const passport = require('passport');

const app = express();
const db = require('./config/db/index');
const port = 3001;

app.use(logger('dev'));
//Connect db
db.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true,}),);

// Cookie-parser
app.use(cookieParser());
app.use(methodOverride('_method'));

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/clothing_store_dev',
    collection: 'mySessions'
  });
// Session

app.use(session({
    secret:'Quoc Hieu',
    resave:false,
    saveUninitialized:true,
    cookie: { 
        secure: false,
        httpOnly: true,
    },
    store: store,
}))

app.use(passport.initialize())
app.use(passport.session());

// app.use(bcrypt());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'util')));
app.set('views', path.join(__dirname, 'resources/views'));
//Set engine
app.engine(
    'hbs',
    handlebars({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'resources/views/layouts'),
        partialsDir: path.join(__dirname,'resources/views/partials'),
        // partialsDir: path.join(__dirname,'resources/views/management'),
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
route(app);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found'); 
    console.log("")
    err.status = 404;
    next(err);
})

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //response to client
    return res.status(status).json({
        error: {
            message: error.message,
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
