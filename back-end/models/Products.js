const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {type: Array, required: false},
  name: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  quantity: {type: Number, required: false}   
});

module.exports = mongoose.model("products", productSchema);