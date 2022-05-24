// importing express from express package
import express from "express";

// making express instance 
const app = express();

// importing dotenv so that we can use (.env) file variable
import dotenv from "dotenv";

// destructuring and importing  join from path built in module in node.js
import {join} from "path";


// importing home listen callback
import  main_Home_App_Listen_CallBack from "./indexFileFunctions/index_app_listen_callback.js";

// importing log_in_router from routes/login/- folder
// why are we doing this - becoz we have created our 
// routes using built in middleware i.e 
// express.Router() so our index.js file express instance 
// is not aware of this so we have to bind this routes 
// to the app instance so that our express instance always 
// aware that yes i ihave something to show 
// when a user request for a route 
// if no route match
// we handling the unknown routes by two ways
// first when person is login and second when person is not login
// i hope this will help you 

import userLoginRouter from "./routes/login/login_route.js";

// importting register router 
import userRegisterRouter  from "./routes/register/user_registeration.js";

// importting forgot passowrd router 
import userForgotPasswordRouter  from "./routes/forgotpassword/forgot_pass.js";

// import home router
import homeRouter from "./routes/home/home_route.js";

// import new Pass router
import newPassRouter from "./routes/newpassword/new_pass.js";

// importing otp router
import otpRouter from "./routes/emailotp/email_otp.js";

// importing change password controller
import changePasswordRouter from "./routes/changepassword/change_pass.js";

//importing database connection file
import Connect_Db from "./db/db_connection.js";

// importing cookie parser 
// this is the middleware that help us to 
// convert the cookie in object 
// so that we can use it 
// if you want to know more about this package or introduction
// tutorials point guide
//https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
//officail guide 
//https://www.npmjs.com/package/cookie-parser

import cookieParser from "cookie-parser";

// import middleware for not found detection
// this is our custom middle ware 
// first it check that is user logged in or not
// if user not logged in it will show 
// different now found page 
// else it will show another not founc page
// i am trying my best to explaing you each line of code
import  show_not_found_page_after_checking_accordingly from "./middleware/check_auth_for_not_found_page.js";


// calling config function from dotenv package for avilabiltiy of environments variable
dotenv.config();

// Getting PORT From Environment
const PORT = process.env.PORT || 8000;

// Getting database url form enviroment
const DATABASE_URL = process.env.DATABASE_URL;

// getting database name form enviroment
const DATABASE_NAME = process.env.DATABASE_Name;



// calling databse connection function
Connect_Db(DATABASE_URL , DATABASE_NAME)


// using cookie parser for all routes
app.use(cookieParser());

// setting path for static files folder
// we are setting this path for using the static file
// like css files , js files , images , video , font etc
app.use(express.static(join(process.cwd(), "public")));



// using express json middleware for parsing json from client
// means it convet json into javascript object
// for more info visit:
// GeeksForGeeks
//https://www.geeksforgeeks.org/express-js-express-json-function/
app.use(express.json());



// it parses incoming requests with urlencoded payloads 
app.use(express.urlencoded({extended:false}));

// setting template folder // not necessary if views folder are same as views
// first parameter will ramain ("views") and if you template engine folder is also ("views")
// in that case you can omit or i can say no need to write app.set("views", "view");
// but if you template file is somewhere fall in the project so simple 
// you can use it like that and that time it compulsory that you should mention
// this or set the view folder like this
// app.set("views" , path.join(__dirname , "/yourdirectory"));

app.set("views" , "views");


// setting app engine 
// you are telling express app that i am using ejs template and please
// we are registering this under you
app.set("view engine" , "ejs");


// using userLoginRouter as a  app lever middleware
app.use("/" , userLoginRouter);

// using userRegisterRouter as a app level middleware
app.use("/auth" , userRegisterRouter);

// using userForgotrPasswordRouter as a app  middleware
app.use("/auth" ,  userForgotPasswordRouter);

// using home Router as app level amiddleware
app.use("/" , homeRouter);

// new pass router as a app level middleware
app.use("/auth" , newPassRouter);

// change pass router as a pp level middleware
app.use("/auth" ,  changePasswordRouter);

// otp router as a app level middleware
app.use("/auth" , otpRouter);

// for all unknow router
app.get("*" ,  show_not_found_page_after_checking_accordingly ,  (req , res)=>{
   
    const msg = res.locals.message;
    if(msg){
      
        // show not found page for logged user
        res.status(404).sendFile(join(process.cwd(), "./public", "not_found_when_logged.html"));
     
    }else{
        // show not found page for not logged user
        res.status(404).render("not_found_when_not_logged");


    }
})


// Listening for coneection 
app.listen(PORT , main_Home_App_Listen_CallBack(PORT));

// Hi i am Inderkant A Full Stack Developer 
// kneen to learn Basic to Advanced Technoloy
// you can reached me out on linked in
// i will definately answer you 
// https://www.linkedin.com/in/inderkant/
