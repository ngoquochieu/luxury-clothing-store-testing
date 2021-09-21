const Items = require('../models/items');
const Users = require('../models/users');
class HomeController {
    index(req, res, next) {

       res.render('home', {
           title : 'Home page',
           style: 'home.css',
           script: 'home.js',
           nav: 'nav.css',
       });
        // Users.find()
        //     .then(items => res.json(items))
        //     .catch(next);
    }
}

module.exports = new HomeController;