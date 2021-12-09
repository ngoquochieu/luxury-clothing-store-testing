const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const actionController = require('../app/controllers/ActionController');

const validateCookie = require('../app/middleware/ValidateCookie');
const author = require('../app/middleware/Author')

router.route('/login')
    .get(actionController.action)
    .post(actionController.login);

router.post('/signup', actionController.signup);

router.post('/logout', actionController.logout);
module.exports = router;
