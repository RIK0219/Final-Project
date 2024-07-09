const mongoose = require("mongoose")

const BookPropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    propertyName: {
      type: String,
      require: true,
    },
    bhk: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
  },
  {timestamps: true}
);

const BookPropertyModel = mongoose.model("bookproperty", BookPropertySchema)
module.exports = BookPropertyModel
