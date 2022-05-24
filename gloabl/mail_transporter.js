// importing dotenv package for using (.env) file variable called unvironment variable
import dotenv from "dotenv";
// calling .config function for so that we can use the varibale of (.env) file
dotenv.config();
// importing nodemailer for creatin traansporter for sending mail
import nodemailer from "nodemailer";

// nodemailer is the package and its opensource and which is
// availabel for sending email easily by doing some configuration
// nodemailer have (createTransport) function 
// which takes key value pair 
// if you want to know more for this package 
// go to their official documentatioN
//https://nodemailer.com/

// this is the first approach if this doesn't work
// check secong approach

// const transport = nodemailer.createTransport({
//      host:process.env.HOST,
//      port:process.env.E_PORT,
//      secure:false, 
//      auth:{
//        user:process.env.Email_Id,
//        pass:process.env.Email_Pass 
//    },tls:{
//        rejectUnauthorized:false
//    } 
// })

// second approach

var transport = nodemailer.createTransport({
    service: process.env.HOST,
    port: process.env.PORT,
    secure: false, // use SSL
    auth: {
        user: process.env.Email_Id,
        pass: process.env.Email_Pass
    }
});



export {transport};

