
const { Schema } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrdersSchema = new Schema({
  orderId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports = { OrdersSchema };
