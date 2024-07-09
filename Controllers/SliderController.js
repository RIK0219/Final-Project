const SliderModel = require("../Model/slider")
const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "dtxgg3d3o",
  api_key: "119619854754151",
  api_secret: "Gde5wBQXa30w6ppfTRa5oCbeE1Q",
});

class SliderController {
  static Sliderinsert = async (req, res) => {
    try {
      //console.log(req.body);
      const {id} = req.body;
      const {caption} = req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const result = new SliderModel({
        caption: caption,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/sliderDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static sliderDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {name, email, image} = req.data;
      const slidedata = await SliderModel.find().sort({name: -1});
      //   console.log(data);
      res.render("admin/slider/display", {
        n: name,
        i: image,
        // e: email,
        cd: slidedata,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static sliderview = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const {name, email, image} = req.data;
      const slidedata = await SliderModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/slider/view", {
        n: name,
        i: image,
        // e: email,
        cd: slidedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static slideredit = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const {name, email, image} = req.data;
      const slidedata = await SliderModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/slider/edit", {
        n: name,
        i: image,
        e: email,
        cd: slidedata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // static sliderUpdate = async (req, res) => {
  //   try {
  //     const {id} = req.body;
  //     const {caption} = req.body;
  //     const file = req.files.image;
  //     //image upload cloudinary
  //     const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
  //       folder: "userprofile",
  //     });
  //     const update = await SliderModel.findByIdAndUpdate(req.params.id, {
  //       caption: caption,
  //       image: {
  //         public_id: imageUpload.public_id,
  //         url: imageUpload.secure_url,
  //       },
  //       user_id: id,
  //     });
  //     console.log(update);
  //     req.flash("success", "Course Update Successfully.");
  //     res.redirect("/admin/sliderDisplay");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  static sliderUpdate = async (req, res) => {
    try {
      const {id} = req.body;
      const {caption} = req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const update = await SliderModel.findByIdAndUpdate(req.params.id, {
        caption: caption,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id: id,
      });
      req.flash("success", "Slider Update Successfully.");
      res.redirect("/admin/sliderDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static sliderDelete = async (req, res) => {
    try {
      await SliderModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/sliderDisplay");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = SliderController