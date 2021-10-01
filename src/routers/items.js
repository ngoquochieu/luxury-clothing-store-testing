const express = require('express');
const router = express.Router();

const itemsController = require('../app/controllers/ItemsController');

router.get('/:type', itemsController.showItemsOfCate);
router.post('/:type/details', itemsController.detailsItems);

module.exports = router;
