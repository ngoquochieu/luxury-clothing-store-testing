const Items = require('../models/items');
const Users = require('../models/users');
const Cates = require('../models/categories');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class ItemsController {
    //[GET] items/:type/
    showItemsOfCate(req, res, next) {
        Items.find({ type: [req.params.type] })
            .then((items) => {
                res.render('home', {
                    title: 'Home page',
                    style: '/css/home.css',
                    script: 'home.js',
                    nav: '/css/nav.css',
                    items: multipleMongooseToObject(items),
                });
            })
            .catch(next);
    }
    //[GET] /items/:type/details/:product_code
    detailsItems(req, res, next) {
        Items.findOne({ product: req.params.product_code })
            .then((item) => {
                res.render('details_items', {
                    style: '/css/details.css',
                    item: mongooseToObject(item),
                    script: '/details.js',
                });
            })
            .catch(next);
    }
}

module.exports = new ItemsController();
