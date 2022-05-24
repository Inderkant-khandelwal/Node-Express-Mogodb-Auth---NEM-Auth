// importing user model
import Register_User_Model from "../../models/user_registeration_m.js";
// now import jwt 
import jwt from "jsonwebtoken";


// controller for showing otp page
const  showOtpPage = (req , res)=>{
    res.status(200).render("otp" , {title:"OTP" , isError:false , errorType:""});

}

// controller for verify otp
const verifyOtpFromDb = async (req , res)=>{
  // first get otp from req.body object
  const {user_otp} = req.body;
  // now get cookie from client with the help of req.cookies object
  const {userId , otpToken} = req.cookies;



  
  // first check userId and otpToken and user_otp is have value or not

    if(userId && otpToken && user_otp){
      // we have user Id and otp token and user otp we can move furthur 

        // now get user from db
        try {
            
             
            const isUserExists = await Register_User_Model.findById({_id:userId});
            if(isUserExists){
                
                    // if user exists
                    // second check jwt otp token 
                    // note we are verifying otp token not user token 
                    // you can have multile try catch block in a statement for specific error
                    // stack overflow - link  https://stackoverflow.com/questions/3239906/multiple-try-catch-or-one
                  
                    try {
                        
                        // verify jwt 
                        const secret_key = isUserExists._id + process.env.JWT_KEY;
                        jwt.verify(otpToken , secret_key);
                        // if token is not expires check user given otp and db otp from db
                        // note you can also hash the otp its all up to u but
                       
                        if(user_otp == isUserExists.otpSignature.otp_value){
                            // if otp match update otp status and redirect user to home
                            const isStatusUpdated = await Register_User_Model.findByIdAndUpdate({_id:userId} , {$set:{"otpSignature.otp_value":1,"otpSignature.is_otp_expires":true , "otpSignature.otp_status": "used" , "email_verified":true} , new:true})
                            // clear otpToken from cookie 
                            res.clearCookie("otpToken");
                              
                            // redirect to user home if otp match
                             return res.status(200).redirect("/home?login=true");

                        }else{
                          // if OTP not match
                          return  res.status(401).render("otp" , {title:"OTP" , isError:true , errorType:"OTP Not Match"});

                        }
                        
                           


                    } catch (error) {
                         console.log(error);
                        // when jwt expires throw error to client that OTP expires
                        // updateotp status to db
                         const isOtpStatusUpdated  = await Register_User_Model.findByIdAndUpdate({_id:userId},  {$set:{"otpSignature.otp_value":0,"otpSignature.is_otp_expires":true , "otpSignature.otp_status": "expire"} ,new:true})
                          if(isOtpStatusUpdated){
                            res.status(500).render("otp" , {title:"OTP" , isError:true , errorType:"Token Expires !"});
                        }

                        res.status(500).render("otp" , {title:"OTP" , isError:true , errorType:"Token Expires !"});

                    }
                    


            }else{
                // user does not exists
                res.status(401).render("otp" , {title:"OTP" , isError:true , errorType:"User Not Found !"});
                console.log("missing filed end");
            }

        } catch (error) {
           
             // something bad happen pls make a Tea and sit and find the erros 
            console.log(error);
            res.status(500).render("otp" , {title:"OTP" , isError:true, errorType:"User Not Found Server Error !"});

        }

    }else{
       // if userId , otpToken , user Otp all of are null or any one of them
         res.status(400).render("otp" , {title:"OTP" , isError:true , errorType:"Missing Field"});
         console.log("missing filed end");
    }
    
    
  
 
 
 

// end of main controller
}

// default export
export default showOtpPage;
//named export
export {verifyOtpFromDb};