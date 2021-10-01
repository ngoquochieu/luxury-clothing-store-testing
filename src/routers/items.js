const express = require('express');
const router = express.Router();

const itemsController = require('../app/controllers/ItemsController');

router.get('/:type', itemsController.showItemsOfCate);
router.post('/:type/:code', itemsController.detailItem)

module.exports = router;
