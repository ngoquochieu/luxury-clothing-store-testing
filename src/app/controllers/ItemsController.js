const Items = require('../models/items');
const Users = require('../models/users');
const Cates = require('../models/categories');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class ItemsController {
     showItemsOfCate (req, res, next) {       
        Cates.findOne({name:req.params.type})
            .then(cate => {
                return cate.items;               
            })
            .then(items => {
                return Items.find({_id:[...items]}); // Chỗ này ảo ma canada vcl , Code mà éo ngờ nó run đc
            })
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
