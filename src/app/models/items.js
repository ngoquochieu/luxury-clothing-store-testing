const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const Items = new Schema ({
  _id: ObjectId,
  name: String,
  price: Number,
  img : String,
  description: String,
  detail: [
              {
                quantity : Number,
		            img_detail : Array,
		            size : Array,
		            color : String,
              }
  ],
  status: Boolean,
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Items', Items);