const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const userController = require('../app/controllers/UserController');

router.route('/profile')
    .get(userController.profile);
    
router.route('/cart')
    .get(userController.getCart);

module.exports = router;