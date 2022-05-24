// import user model 
import  Register_User_Model from "../../models/user_registeration_m.js";
// import bcrypt 
import bcrypt from "bcrypt";

// import jwt from jsonweb token
import jwt from "jsonwebtoken";

// import url module
import url from "url";

// import otp generator package for otp generating
import otp from "otp-generator";

// import transporter
import {transport} from "../../gloabl/mail_transporter.js";


// this controller only for showing ui i.e login page
const log_in_controller = (req , res , next)=>{
     // req.query from register function
     
     if(req.query){
        res.status(200).render("login" , {title:"Login" , isError:false , errorType:"" , isRegisterSuccess:req.query});
     }else{
        res.status(200).render("login" , {title:"Login" , isError:false , errorType:"" , isRegisterSuccess:false});

     }
    
}


// login controller for making user login is credentials match
const login_user = async (req , res , next)=>{

   
  
   try { // begining of try block
        // getting user data from req.body object and destructureing it
    const {user_email , user_password} = req.body;
     
    // now check if user_email and user_password is empty or not if empty throw error 
    // to client that all fields are required
    if(user_email && user_password){
        // if email and password hava data now check that the user which 
        //provide email to us  exists or not in our databse if it exists then
        // check user password if it match then  genearte JWT token and send it to client 
        // so that in future we came to know that the client has token and is valid user
        // email does not match throw error to client and ask for signup 
        // if password not match ask for client for reset password 
        
         const isUserExists = await  Register_User_Model.findOne({user_email});
         if(isUserExists){
         

            // User is Exists Now Comparing password
            // getting user hashed password
            const userHashPassword = isUserExists.user_password;
            // is password match
            const isPasswordMatch = await  bcrypt.compare(user_password , userHashPassword);
            if(isPasswordMatch){
              // now user password also match generate jwt and send to client and also set as cookie
              const jwt_key_data = process.env.JWT_KEY  
              const token  = jwt.sign({user_id:isUserExists._id} , jwt_key_data , {expiresIn:'1h'});
              
              
                
                // setting data to cookie 
                // please while you developing web for real world
                // do encryption of all of these cookies there are lots of 
                // packages in npm use them accroding to your need 
                // for saving time i am ommitting this but you have to use
              
                res.cookie("userId" , isUserExists._id , {maxAge:1000 * 60 *60 * 24 * 90}); // for three  month cookie
                res.cookie("userName", isUserExists.user_name , {maxAge:1000 * 60 *60 * 24 * 30}); // expire token in one month
                res.cookie("tokenId", token , {maxAge:1000 * 60 *60 * 24 * 30}); // expire token in one month
                
                // check if user already verified their email then redirect to home 
                // else  redirect him / her to otp page

                 if(isUserExists.email_verified){
                      // user email verified no need to send otp 
                      // redirect to home
                      res.status(200).redirect("/home?login=true&emal_verified=true");
  
                 }else{ 
               // we have genearte OTP 
                const otpToSend =  otp.generate(6,{upperCaseAlphabets:false ,lowerCaseAlphabets:false, specialChars:false});
                const otp_stage = "sent";
                // save otp to database
               const isOtpUpdated = await Register_User_Model.findByIdAndUpdate({_id:isUserExists._id} , {$set:{"otpSignature.otp_value":otpToSend,"otpSignature.otp_status": otp_stage} ,new:true}); 
                console.log(isOtpUpdated);
               if(isOtpUpdated){
                      // generate otp token 
                      const token_sec = isUserExists._id + process.env.JWT_KEY;
                      const otpToken = jwt.sign({userId:isUserExists._id} , token_sec , {expiresIn:'15m'});
                      res.cookie("otpToken" , otpToken);



                       // send OTP to client mail
                    let info = await transport.sendMail({
                        from : process.env.Email_Id,
                        to:isUserExists.user_email,
                        subject:"Panda News -Your OTP will Expires in 15 min",
                        html:`<h1>${isUserExists.user_name} Your OTP is ${otpToSend}</h1>`
                    });

                    if(info){
                        res.status(200).redirect(url.format({
                            pathname:"/auth/verify-otp",
                            query:{
                                otp_sent:true,
                               
                            }
                        }))
                    }else{
                          // throw error to client by saying to that user otp error
                    res.status(200).render("login" , res.render("login" , {title:"Login" , isError:true , errorType:"OTP Mail Error Occured" , isRegisterSuccess:false}));
  
                    }
                   
                  }else{
                      // throw error to client by saying to that user otp updation error
                    res.status(500).render("login" , res.render("login" , {title:"Login" , isError:true , errorType:"OTP Error Occured" , isRegisterSuccess:false}));

                  }

              
                   
                }

            }else{
                // password not match ask user for re-enter passowrd OR create new password
                res.status(401).render("login" , res.render("login" , {title:"Login" , isError:true , errorType:"Credentials Not Match!" , isRegisterSuccess:false}));

            }  

         }else{
             // User does not exists throw error to client
             res.status(401).render("login" , res.render("login" , {title:"Login" , isError:true , errorType:"User Not Found !" , isRegisterSuccess:false}));

         } 


      }else{
        // email or passowrd both or anyone of are null ask client o full fill all details
        res.status(400).render("login" , res.render("login" , {title:"Login" , isError:true , errorType:"All Fields Are Required!" , isRegisterSuccess:false}));

      }

   } catch (error) {

    // something bad happen make a Tea or Coffee expolre it 
       res.status(500).render("login" , res.render("login" , {title:"Login" , isError:false , errorType:"Unknown Error Occured!" , isRegisterSuccess:false}));
   } // end of catch block
   
// end of main function
}  

//named export
export {log_in_controller , login_user}