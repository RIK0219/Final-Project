const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
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
    role:{
      type: String,

    }
},{ timestamps: true })

const SliderModel = mongoose.model("slider", SliderSchema)

module.exports =SliderModel