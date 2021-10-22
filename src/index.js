const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const route = require('./routers');
const app = express();
const db = require('./config/db/index');
const port = 3000;

//Connect db
db.connect();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Cookie-parser
app.use(cookieParser());

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/clothing_store_dev',
    collection: 'mySessions'
  });
// Session
app.use(session({
    secret:'Quoc Hieu',
    resave:false,
    saveUninitialized:false,
    store: store,
}))
// app.use(bcrypt());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'util')));
app.set('views', path.join(__dirname, 'resources/views'));
//Set engine
app.engine(
    'hbs',
    handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
        },
    }),
);
app.set('view engine', 'hbs');
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
