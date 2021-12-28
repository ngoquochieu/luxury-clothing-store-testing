const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

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
    status: {
        type:Boolean,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref:'Carts',
    }
    }, {
        timestamps:true,
});

Users.pre('save', async function(next) {
    try {
        const salt = bcrypt.genSalt(10);

        const newPassword = bcrypt.hash(this.password, salt);
        this.password = newPassword;
    
        next();
    } catch (error) {
        next(error);
    }
});

Users.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error;
    }
}

module.exports = mongoose.model('Users', Users);
