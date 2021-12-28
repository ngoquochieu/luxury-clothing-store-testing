const mongoose = require('mongoose');

const { Schema } = mongoose;

const Carts = new Schema({
    total: {
        type: Number,
    },

    items: [{
        type: Schema.Types.ObjectId,
        ref:'Items',
    }],

    owner: {
        type: Schema.Types.ObjectId,
        ref:'Users',
   }
   
});
module.exports =  mongoose.model('Carts', Carts);

