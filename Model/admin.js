const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    googleID: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    token: {
      type: String,
    },
  },
  {timestamps: true}
);
const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;
