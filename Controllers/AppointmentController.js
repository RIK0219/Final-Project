const AppointmentModel = require("../Model/appointment");
const nodemailer = require("nodemailer")

class AppointmentController {
  static Fixappointment = async (req, res) => {
    try {
      //console.log(req.body);
      const {id} = req.body;
      const {name, email, mobile, date} = req.body;

      const result = new AppointmentModel({
        name: name,
        email: email,
        phone: mobile,
        date: date,
      });
      await result.save();
      req.flash("success", "Appointment fixed Successfully. Please check your mail.");
      this.sendEmail(name,email,date)
      res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
  };
  static AppointmentDisplay = async (req, res) => {
    try {
      //console.log (req.body)
      const {image} = req.data;
      const {name, email, phone, date} = req.data;
      const data = await AppointmentModel.find().sort({name: -1});

      //console.log(data);
      res.render("admin/appointment", {
        n: name,
        e: email,
        p: phone,
        dt: date,
        d: data,
        i: image,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static sendEmail = async (name, email,date) => {
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
        ",Your Appointment is fixed on " +
        date 
    });
  };
}

module.exports = AppointmentController;