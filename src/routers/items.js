const express = require('express');
const router = express.Router();

const itemsController = require('../app/controllers/ItemsController');

router.get('/', (req, res, next) => res.send('success'))
router.get('/:type', itemsController.showItemsOfCate);

module.exports = router;
