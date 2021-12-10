const express = require('express');
const multer  = require('multer');
// const router = express.Router();
const router = require('express-promise-router')();

const path = require('path');
const {validateParam, schemas} = require('../app/helpers/routerHelpers');

const adminController = require('../app/controllers/AdminController');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join (__dirname, "../public/img/user_info"));
        // cb(null)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname);
    },
});
const fileStorageEngine_items = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join (__dirname, "../public/img/items"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname);
    },
});
const upload = multer({ storage:fileStorageEngine });
const upload_items = multer({ storage:fileStorageEngine_items });



/* Authentication */
router.route('/')
    .get(adminController.loginPage)
    .post(adminController.login);
/* Authentication */

/* Dashboard */
router.get('/dashboard', adminController.dashboard);
/* Dashboard */

/* Products */
router.route('/products')
    .get(adminController.getItems);

router.route('/products/edit/:product_code')
    .get(adminController.editItem)
    .put(upload_items.array('product', 12),  adminController.updateItems);

router.route('/products/add')  
    .get(adminController.getAddProduct)
    .post(upload_items.array('products', 12), adminController.addProduct);

router.route('/products/delete/:id')
    .delete(adminController.deleteItem);
/* Products */

/* Users */
router.route('/users')
    .get(adminController.getUser);

router.route('/users/add')
    .get(adminController.getAddUser)
    .post(upload.single('avatar') , adminController.addUser);

router.route('/users/:id')
    .get(validateParam(schemas.idSchema, 'id'), adminController.editUser)
    .put(upload.single('avatar'), adminController.updateUser);


router.route('/users/delete/:id')
    .delete(adminController.deleteUser);
/* Users */

module.exports = router;