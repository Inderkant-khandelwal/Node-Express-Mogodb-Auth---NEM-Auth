// importing mongoose package for making connection between mongodb and express
import mongoose from "mongoose";
// making schema defining
// here we are assigning mongoose schmea in (register_user_schema) constant
const register_user_schema = mongoose.Schema({
    // here user name is database {key} which have some validation 
    // i.e user_name will accept only (String) and it is required filed 
    // means you have to given some value only string and (trim) means we are removing white space 
    // which is extra
    // now rest of the field you can easily understand
   user_name:{type:String , required:true , trim:true },
   user_email:{type:String , required:true , trim:true , lowercase:true},
   user_password:{type:String , required:true}, 
   dor:{type:Date , default:Date.now},
   otpSignature:{
       otp_value:{type:Number,default:""},
       is_otp_expires:{type:Boolean,default:null},
       otp_status:{type:String,default:"unknown"}
       
   },
   email_verified:{type:Boolean , default:false}
});
 
// here we are returning instance of mongoose model which is responsible for 
// CRUD operation of the collectioN
const Register_User_Model = mongoose.model("UserRegisteration" , register_user_schema);
// here we simply returing the Model instance so that we can use it where we need to 
// do task like CRUD
// if you having some problem to understanding this code
// please visit my linked in profile
// i will help you Asap below is my profile link
//https://www.linkedin.com/in/inderkant/ 
export default Register_User_Model;
