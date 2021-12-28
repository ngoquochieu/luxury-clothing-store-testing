const express = require('express');
const router = require('express-promise-router')();

const author = require('../app/middleware/Author');

const itemsController = require('../app/controllers/ItemsController');

router.route('/:type/details/:product_code')
    .get( itemsController.detailsItems)
    .post(itemsController.addToCarts)
    
router.route('/:type')
    .get(itemsController.showItemsOfCate);

module.exports = router;
