const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const Users = new Schema ({
  _id: ObjectId,
  userPhone: String,
  password: String,
  re_password: String,
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Users', Users);