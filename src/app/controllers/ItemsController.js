const Items = require('../models/items');
const Users = require('../models/users');
const Cates = require('../models/categories');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class ItemsController {
     showItemsOfCate (req, res, next) { 
        // Items.find({type: {$elemMatch : {'detail.color' :'GREEN' }}})
        Items.find({type: [req.params.type]})
            .then(items => {res.render('home', {
                title: 'Home page',
                style: '/css/home.css',
                script: 'home.js',
                nav: '/css/nav.css',
                items:multipleMongooseToObject(items),
            })})
            .catch(next);
    }
}

module.exports = new ItemsController();