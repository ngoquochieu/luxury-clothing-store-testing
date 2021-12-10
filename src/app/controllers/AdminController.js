const Users = require('../models/users');
const Items = require('../models/items');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

// Split file name img 
const split_file_img = require('../../util/split_file_img');
class AdminController {
    /* ----------------------- Dashboard ------------------- */
    //[GET] /admin/dashboard
    async dashboard(req, res, next) {

        const users = await Users.find({role: 'user'});
        const staffs = await Users.find({role: 'staff'});
        const items = await Items.find();

        const { admin } = req.cookies;
        res.render('dashboard/db', {
            layout:'manager',
            admin,
            users: users.length,
            staffs: staffs.length,
            items: items.length,
        })
    }
    /* ----------------------- Dashboard ------------------- */
    /* ----------------------- Authentication ------------------- */
    //[GET] /admin/
    async loginPage(req, res, next) {
        res.render('dashboard/db_login', {
            style: '/css/admin/login.css',
            // script: '//abc/login.js',
        });
    }
    //[POST] /admin/login
    async login(req, res, next) {
        const {username, password} = req.body;
        let admin = await Admin.findOne({username});
        if(!admin) {
            return res.redirect('/admin');
        }
        const isMatch = (password === admin.password);
        if(!isMatch) {
            return res.redirect('/admin');
        }
        res.cookie('admin', admin);
        req.session.isAuth = true;
        res.redirect('/admin/dashboard');
    }
    /* ----------------------- Authentication ------------------- */

     /* ----------------------- Users ------------------- */
    //[GET] /admin/users
    async getUser(req, res, next) {
        const { admin, add, deleted } = req.cookies;
        let users = await Users.find();          
        res.render('dashboard/db_content', {
            layout:'manager',
            users:multipleMongooseToObject(users),
            admin,
            add,
            deleted,
        });
    }
    //[GET] admin/users/add
    getAddUser(req, res, next) {
        const { admin, add } = req.cookies;

        res.render('dashboard/users/db_add_users', {
            layout:'manager', 
            style:'/css/admin/add_users.css',
            admin,
        })
    }
    //[POST] admin/users/add
    async addUser(req, res, next) {
        const {fullname, userPhone, password, address, date_of_birth, role} = req.body;
        const hashedPsw = await bcrypt.hash(password, 12);
        let newUser;
        let user = await Users.findOne({userPhone});
        if(user) {return res.redirect('/admin/users/add')};

        if(req.hasOwnProperty('file')) { 

            const fileName = req.file.path; 
            const newFileName = split_file_img(fileName);
            newUser = await new Users({fullname, userPhone, password:hashedPsw, address, date_of_birth, role, status:true, img:newFileName});

        } else {

            newUser = await new Users({fullname, userPhone, password:hashedPsw, address, date_of_birth, role, status:true});
            
        }
        await newUser.save(err => {
            if(err){
                res.json({"errMessage" : err});
            }
            else {
                res.cookie('add', {success:"true"}, {maxAge: 4000})
                res.redirect('/admin/users'); 
            }
        });  
    }
    //[GET] admin/users/:id
    async editUser (req, res, next) {
        const { admin, update } = req.cookies;
        let user = await Users.findById({_id: req.value.id});
    
        res.render('dashboard/users/db_edit_user', {

            layout:'manager',
            user: mongooseToObject(user),
            style:'/css/admin/edit_user.css',
            admin,
            update,
                
        })
    }
    
    //[PUT] admin/user/:id
    async updateUser(req, res, next) {
        let isUpdate;
        if(req.hasOwnProperty('file')) {
            const fileName = req.file.path;
            const newFileName = split_file_img(fileName);
            isUpdate = await Users.findByIdAndUpdate(req.params.id, {... req.body, img:newFileName });             
        } else {
            isUpdate = await Users.findByIdAndUpdate(req.params.id, {... req.body});
        }

        res.cookie('update', {success:"true"}, {maxAge: 1000 * 4})
        return isUpdate && res.redirect(`/admin/users/${req.params.id}`);
    }

    //[DELETE] /users/delete/:id
    async deleteUser(req, res, next) {
        const isDeleted = await Users.deleteOne({_id: req.params.id});
        if(isDeleted) {
            res.cookie('deleted', {success:"true"}, {maxAge: 1000 * 4});
            res.redirect(`/admin/users`);
        }
    }
    /* ----------------------- Users ------------------- */

    /* -------------------- Items ---------------- */
    //[GET] admin/products
    async getItems(req, res, next) {
        const { admin, add, deleted } = req.cookies;
        let items = await Items.find() || [];
        res.render('dashboard/db_content', {
            layout:'manager',
            items : multipleMongooseToObject(items),
            admin,
            add,
            deleted,
        })
    }

    //[GET] /admin/products/edit/:product_code
    async editItem(req, res, next) {
        const { admin } = req.cookies;
        
        const item = await Items.findOne({'details.product_code':req.params.product_code});

        if(item) res.render('dashboard/products/db_edit_product', {
            admin,
            layout:'manager',
            item: mongooseToObject(item),
            style:'/css/admin/edit_user.css',
        })
    }

     //[PUT] /products/edit/:id 
    async updateItems(req, res, next) {
        const {name, price, color, code} = req.body;
        const { product_code } = req.params;
        let newItem;
                    
        const files_name = req.files;
        const newFilesName = files_name.map(file => {return split_file_img(file.path)});
        const img = newFilesName[0];
        if(newFilesName.length != 0) {
            newItem = await Items.findOneAndUpdate(
                {'details.product_code':product_code},{$set: {
                    name, price, 'details.color':color, 'details.product_code':code,img,  'details.img_details':newFilesName,
            }});
        }else {
            newItem = await Items.findOneAndUpdate(
                {'details.product_code':product_code}, {$set:{
                    name, price, 'details.color':color, 'details.product_code':code,
            }});
        }
                
        res.cookie('update', {success:"true"}, {maxAge: 1000 * 4})
        return newItem && res.redirect(`/admin/products/edit/${product_code}`)
     }

    //[GET] admin/products/add
    async getAddProduct(req, res, next) {
        const { admin } = req.cookies;
        
        res.render('dashboard/products/db_add_product', {
            layout:'manager', 
            style:'/css/admin/add_products.css',
            admin,
        })
    }

    //[POST] admin/products/add
    async addProduct(req, res, next) {
        const {name, size, price, quantity, color, brand, product_code, model_wears, model_height, main, type} =req.body;
        
        const files_name = req.files;
        const newFilesName = files_name.map(file => {return split_file_img(file.path)});
        const img = newFilesName[0];
            
        const newItem = await new Items({
            name,
            type,
            size,
            price,
            status:true,
            'details.brand': brand,
            'details.quantity':quantity,
            'details.color':color,
            'details.product_code':product_code,
            'details.size_fit.model_wears':model_wears,
            'details.size_fit.model_height':model_height,
            'details.main':main,
            img,
            'details.img_details':newFilesName
        })

        newItem.save(err => {
            if(err) {
                console.log(err)
            } else {
                res.cookie('add', {success:"true"}, {maxAge: 1000 * 4})
                res.redirect('/admin/products');
            }
        })
    } 
    //[DELETE] admin/products/delete/:id
    async deleteItem(req, res, next) {
        const item = await Items.deleteOne({_id:req.params.id});
        if(item) {
             res.cookie('deleted', {success:"true"}, {maxAge: 1000 * 4})
            res.redirect('/admin/products')
        }
    }
    
}
module.exports = new AdminController();