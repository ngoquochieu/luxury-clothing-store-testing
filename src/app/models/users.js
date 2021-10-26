const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    userPhone: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    fullname: {
        type: String,
    },
    address: {
        type: String,
    },
    date_of_birth : {
        type:String,
    },
    img: {
        type:String,
    },
    role: {
        type:String,
    },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', Users);
