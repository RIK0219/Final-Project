const categoryModel = require("../Model/category")
const cloudinary = require("cloudinary");
const checkUseAuth = require("../Middleware/auth");

cloudinary.config({
  cloud_name: "dtxgg3d3o",
  api_key: "119619854754151",
  api_secret: "Gde5wBQXa30w6ppfTRa5oCbeE1Q",
});

class CategoryController {
  static categoryinsert = async (req, res) => {
    try {
      //console.log(req.body);
      const {id} = req.body;
      const {name} = req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const result = new categoryModel({
        name: name,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/categoryDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static categoryDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {name,email, image} = req.data;
      const data = await categoryModel.find().sort({name:-1})
    //   console.log(data);
      res.render("admin/category/display", {
        n: name,
        i: image,
        // e: email,
        d: data,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static propertyview = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const {name,email, image} = req.data;
      const data = await categoryModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/category/view", {
        n: name,
        i: image,
        // e: email,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static propertyedit = async (req, res) => {
    try {
      // console.log(req.params.id)  // To get id from view button
      // console.log (req.body)
      const {name, email, image} = req.data;
      const data = await categoryModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/category/edit", {
        n: name,
        i: image,
        e: email,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static propertyUpdate = async (req, res) => {
    try {
      const {id} = req.body;
      const {name} = req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const update = await categoryModel.findByIdAndUpdate(req.params.id, {
        name: name,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id: id,
      });
      req.flash("success", "Course Update Successfully.");
      res.redirect("/admin/categorydisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static propertyDelete = async (req, res) => {
    try {
      await categoryModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/categorydisplay");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CategoryController