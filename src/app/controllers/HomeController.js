const Items = require('../models/items');

const { multipleMongooseToObject } = require('../../util/mongoose');
class HomeController {
    index(req, res, next) {
        
        req.session.userid={name:"quochieu"};
        console.log(req.session.userid)
        // req.session.isAuth = true;
        const { user } = req.cookies; 
        Items
            .find()
            .then((items) => {
                res.render('home', {

                    title: 'Home page',
                    style: '/css/home.css',
                    script: 'home.js',
                    nav: '/css/nav.css',
                    header_css:'/css/header.css',
                    header_js:'/header.js',
                    items: multipleMongooseToObject(items),
                    user,

                });
            })
            .catch(next);
    }
}

module.exports = new HomeController();
