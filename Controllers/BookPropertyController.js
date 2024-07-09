const BookPropertyModel = require("../Model/bookproperty");
const checkUseAuth = require("../Middleware/auth");
const nodemailer = require("nodemailer");

class BookProperty {
  static InsertProperty = async (req, res) => {
    try {
      const {name, email, address, mobile, propertyName, bhk, price, id} =
        req.body;
      //console.log(id);
      const result = new BookPropertyModel({
        name: name,
        email: email,
        address: address,
        phone: mobile,
        propertyName: propertyName,
        bhk: bhk,
        price: price,
      });
      await result.save();
      this.sendEmail(name, email, propertyName, bhk, price);
      req.flash("success", "Property Booked Successfully");
      res.redirect(`/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  static propertyDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {name, email, image} = req.data;
      // const data = await PropertyModel.find();
      // const category = await CategoryModel.find();
      const BPD = await BookPropertyModel.find();
      //console.log(data);
      res.render("admin/bookedproperty", {
        n: name,
        i: image,
        e: email,
        // d: data,
        // cat: category,
        bp: BPD,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteproperty = async (req, res) => {
    try {
      await BookPropertyModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/BookedPropertyDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static sendEmail = async (name, email, propertyName, bhk, price) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "amannarwariya216@gmail.com",
        pass: "kmclbmxfxzhfoakj",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Property Book", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ",Your Property " +
        propertyName +
        "of" +
        bhk +
        "of Rs." +
        price +
        ",has been booked successfully",
    });
  };
}

module.exports = BookProperty;
