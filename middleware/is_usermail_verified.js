// importing user model 
import Register_User_Model from "../models/user_registeration_m.js";

// creating function for user mail varified or not
// so that user dont need to provide otp for every login
const isUserMailVerified = async  (req , res , next)=>{
  // destructuring req.cookies object  
  const {userId} = req.cookies;
       
    // checking if userId is not null
      if(userId){
        // try block start
        try {
            
          // checking if user exists or not
        const isUserExists = await Register_User_Model.findById({_id:userId});
          if(isUserExists){
            // if user exists
              //cheking if user email verified or not
              if(isUserExists.email_verified){
                // removing otpToken from client machine
                res.clearCookie("otpToken");
                // passing the controll  
                next();
                 


              }else{
                
                // if email is not verified delete all cookie while logged in
                res.clearCookie("userId");
                res.clearCookie("userName");
                res.clearCookie("tokenId");
                // redirect to user login and ask to re-login so that he / she can 
                // receieve the OTP
                res.redirect("/?user_not_verified=true");
              }
              
          }else{
            // if user not exists 
            // clear the all cookie
            res.clearCookie("userId");
            res.clearCookie("userName");
            res.clearCookie("tokenId");
            // redirect user to login 
            res.redirect("/?user_not_found=true");
          }
        } catch (error) {
          // when some bad heppen 
            res.clearCookie("userId");
            res.clearCookie("userName");
            res.clearCookie("tokenId");
            console.log(error);
            // redirect user to login
            res.redirect("/?user_not_found_Error_try=true");
            
        }
      }else{
           // if user id is not correct
           // redirect user to home 
         res.redirect("/?user_not_found=true");
      }
}

// default export 
export default isUserMailVerified;