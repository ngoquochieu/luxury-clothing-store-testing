const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');
const itemsController = require('../app/controllers/ItemsController')

router.get('/:type', itemsController.showItemsOfCate);
router.get('/', homeController.index);

module.exports = router;
