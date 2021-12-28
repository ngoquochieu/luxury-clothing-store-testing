const Items = require('../models/items');
const User = require('../models/users');
const Carts = require('../models/carts');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class ItemsController {
    //[GET] items/:type/
    showItemsOfCate(req, res, next) {
        const { user } = req.cookies;
        Items
            .find({ type: [req.params.type] })
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
    //[GET] /items/:type/details/:product_code
    async detailsItems(req, res, next) {
        const { user } = req.cookies;
        const item = await Items.findOne({'details.product_code': req.params.product_code })
          
        if(item) {
            res.render('details_items', {
                style: '/css/details.css',
                item: mongooseToObject(item),
                script: '/details.js',
                header_css:'/css/header.css',
                header_js:'/header.js',
                user,
            });
            
        }
                
    }
     //[POST] /items/:type/details/:product_code
     async addToCarts(req, res, next) {
         const { sizes } = req.body;
         const { user } = req.cookies;

         const userInfo = await User.findById(user._id);
         const item = await Items.findOne({'details.product_code': req.params.product_code});
         
        const userCart = await Carts.findById(userInfo.cart);

        //  cart.owner = userInfo;
        userCart.items.push(item._id);

         await userCart.save();
         res.redirect("/");
     }
}

module.exports = new ItemsController();
