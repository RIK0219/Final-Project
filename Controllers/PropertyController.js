const PropertyModel = require("../Model/property");
const cloudinary = require("cloudinary");
const checkUseAuth = require("../Middleware/auth");
const CategoryModel = require("../Model/category");

cloudinary.config({
  cloud_name: "dkqv3l2kh",
  api_key: "182223573185999",
  api_secret: "lXYq1Ctc8i-xuT-JoN98pE0-Y_s",
});

class PropertyController {
  static propertyinsert = async (req, res) => {
    try {
      //console.log(req.body);
      const {id} = req.body;
      const {name, price, discreption, category, address, city, state} =
        req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const result = new PropertyModel({
        name: name,
        price: price,
        discreption: discreption,
        category: category,
        address: address,
        city: city,
        state: state,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });

      res.redirect("/admin/propertyDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static propertyDelete = async (req, res) => {
    try {
      await PropertyModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/propertyDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static propertyDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {name, email, image} = req.data;
      const data = await PropertyModel.find();
      const category = await CategoryModel.find();
      //console.log(data);
      res.render("admin/property/display", {
        n: name,
        i: image,
        e: email,
        d: data,
        cat: category,
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
      const {name, email, image} = req.data;
      const data = await PropertyModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/property/view", {
        n: name,
        i: image,
        e: email,
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
      const category = await CategoryModel.find();
      const data = await PropertyModel.findById(req.params.id);
      // console.log(data);
      res.render("admin/property/edit", {
        n: name,
        i: image,
        e: email,
        d: data,
        cat: category,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static propertyUpdate = async (req, res) => {
    try {
      const {id} = req.body;
      const {name, price, discreption, category, address, city, state} =
        req.body;
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      const update = await PropertyModel.findByIdAndUpdate(req.params.id, {
        name: name,
        price: price,
        discreption: discreption,
        category: category,
        address: address,
        city: city,
        state: state,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
        user_id: id,
      });
      req.flash("success", "Course Update Successfully.");
      res.redirect("/admin/propertyDisplay");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = PropertyController;
