const express = require("express");
const FrontController = require("../Controllers/FrontController");
const route = express.Router();
const AdminController = require("../Controllers/AdminController");
const PropertyController = require("../Controllers/PropertyController");
const CategoryController = require("../Controllers/CategoryController");
const BookProperty = require("../Controllers/BookPropertyController");
const AppointmentController = require("../Controllers/AppointmentController");
const SliderController = require("../Controllers/SliderController")
const checkUseAuth = require("../Middleware/auth");

// google login
const passport = require('passport')
const Passport= require("../passport")

route.use(passport.initialize());
route.use(passport.session());

// route.get("/GoogleLoadAuth", AdminController.GoogleLoadAuth)
//Auth
route.get('/auth/google', passport.authenticate('google', {scope:['email','profile']}))
// Auth Callback 
route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/admin/dashboard",
    failureRedirect: "http://localhost:4000/login",
  })
);

// Success 
route.get('/success' , AdminController.successGoogleLogin); 

// failure 
route.get('/failure' , AdminController.failureGoogleLogin);

//router
//FrontController
route.get("/", FrontController.index);
route.get("/about", FrontController.about);
route.get("/aboutreadmore", FrontController.aboutreadmore);
route.get("/contact", FrontController.contact);
route.get("/property", FrontController.property);
route.get("/details/:id", FrontController.details);
route.get("/registration", FrontController.registration);
route.post("/verifyLogin", FrontController.veryLogin);
//insert user
route.post("/insertuser", FrontController.insertuser);
//peroperty search
route.get("/propertySearch", FrontController.propertySearch);
route.get("/area", FrontController.propertyArea);
route.get("/bhk/:id", FrontController.propertybhk);

// admin part
route.get("/login", AdminController.login);
route.get("/logout", AdminController.Logout);
// route.get("/forgotPassword", FrontController.forgotPassword)


// Forget Password
route.post("/forget_password", FrontController.forgetPasswordVerify)
route.get("/reset_password", FrontController.reset_password)
route.post("/reset-Password1", FrontController.reset_password1)

route.get("/admin/dashboard", checkUseAuth, AdminController.dashboard);
route.get("/profile", checkUseAuth, AdminController.profile);
// admin/propertycontroler
// route.get("/admin/propertydisplay", PropertyController.display);
route.post( "/admin/propertyinsert", checkUseAuth, PropertyController.propertyinsert
);
route.get(
  "/admin/propertyDisplay", checkUseAuth, PropertyController.propertyDisplay
);
route.get( "/admin/property/view/:id", checkUseAuth, PropertyController.propertyview
);
route.get( "/admin/property/edit/:id", checkUseAuth,PropertyController.propertyedit
);
route.post( "/admin/propertyUpdate/:id", checkUseAuth, PropertyController.propertyUpdate
);
route.get( "/admin/property/delete/:id", checkUseAuth, PropertyController.propertyDelete
);
route.post("/admin/updateProfile", checkUseAuth, AdminController.updateProfile);
route.post("/admin/changePassword", checkUseAuth, AdminController.changePassword);

// admin/categorycontroller
route.post( "/admin/categoryinsert", checkUseAuth, CategoryController.categoryinsert
);
route.get( "/admin/categoryDisplay", checkUseAuth, CategoryController.categoryDisplay
);
route.get( "/admin/category/view/:id", checkUseAuth, CategoryController.propertyview
);
route.get( "/admin/category/edit/:id", checkUseAuth, CategoryController.propertyedit
);
route.post( "/admin/categoryUpdate/:id", checkUseAuth, CategoryController.propertyUpdate
);
route.get( "/admin/category/delete/:id", checkUseAuth, CategoryController.propertyDelete
);

// admin/bookproperty
route.post("/admin/bookproperty",checkUseAuth, BookProperty.InsertProperty);
route.get("/admin/BookedPropertyDisplay", checkUseAuth,BookProperty.propertyDisplay);
route.get("/admin/Bookproperty/delete/:id", checkUseAuth, BookProperty.deleteproperty);

// Appointment Controller
route.post("/bookappointment", AppointmentController.Fixappointment);
route.get("/admin/Appointmentdisplay",checkUseAuth,AppointmentController.AppointmentDisplay);

//Slider Controller
route.post("/admin/sliderinsert",checkUseAuth, SliderController.Sliderinsert)
route.get("/admin/sliderDisplay",checkUseAuth, SliderController.sliderDisplay)
route.get("/admin/slider/view/:id", checkUseAuth, SliderController.sliderview)
route.get("/admin/slider/edit/:id", checkUseAuth, SliderController.slideredit)
route.post("/admin/sliderUpdate/:id", checkUseAuth, SliderController.sliderUpdate)
route.get("/admin/slider/delete/:id", checkUseAuth, SliderController.sliderDelete)
module.exports = route;
