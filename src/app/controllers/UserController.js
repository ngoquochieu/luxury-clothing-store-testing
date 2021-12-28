const Items = require('../models/items');
const User = require('../models/users');
const Carts = require('../models/carts');

const {multipleMongooseToObject} = require('../../util/mongoose');
 const  profile = (req, res, next) => {
        res.json({
            user:req.cookies.user,
        })
    }

const getCart = async (req, res, next) => {
    const { user } = req.cookies;

    // const userInfo = await User.findById(user._id);
    const cart = await Carts.findOne(user.owner);
    const items = await Items.find({...cart.items});

    res.status(200).render('cart',{
        layout:'user/cart',
        items: multipleMongooseToObject(items),
        user,
    })
}

module.exports = {
    profile,
    getCart,
}