const express = require("express");
const app = express();
const port = 4000;
const web = require("./Routes/web");
const connectdb = require("./Db/connectdb")
const cookieParser = require("cookie-parser");
require('dotenv').config();

//token get
app.use(cookieParser())

//image upload
const fileUpload = require('express-fileupload')
//temptiles uploaders
app.use(fileUpload({useTempFiles:true}))
//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash')

//messages
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000},
    resave: false,
    saveUnintialized: true,
}));

//flash message
app.use(flash());


//connectdb
connectdb();

//data get
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//ejs set html ke liye
app.set("view engine", "ejs");

//for static files
app.use(express.static("public"));

//router load
app.use("/", web);

app.listen(port, () => {
  console.log(`Server start localhost ${port}`);
});
