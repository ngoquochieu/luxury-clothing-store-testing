const Items = require('../models/items');
const Users = require('../models/users');
const {multipleMongooseToObject} = require('../../util/mongoose');
class HomeController {
    index(req, res, next) {
        Items.find()
            .then(items => {
                res.render('home', {
                    title: 'Home page',
                    style: 'home.css',
                    script: 'home.js',
                    nav: 'nav.css',
                    items:multipleMongooseToObject(items),
                });
            })
            .catch(next);
    }
}

module.exports = new HomeController();
