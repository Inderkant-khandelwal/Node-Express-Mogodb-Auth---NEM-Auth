// importing user model
import Register_User_Model from "../models/user_registeration_m.js";

// function naem describe the our intention agree ?
// please visite my linked in profile
//https://www.linkedin.com/in/inderkant/
const preventUserToShowOtpPageWhenLoggedIn = async  (req , res , next)=>{
  // destructure req.cookie object 
  const {userId} = req.cookies;
    
     // if userId is null or not
      if(userId){
        // opening try block
        try {
            
          // is user exists 
        const isUserExists = await Register_User_Model.findById({_id:userId});
        // checking if user exists  
        if(isUserExists){
          // if user exists
              // check is email verified
              if(isUserExists.email_verified){
                   // redirect user to user home when user logged 
                   // and by doing this user will not abel to see otp page
                   // while logged in
                  res.redirect("/home?logged=true&access_denied_for_otp_page=true");
                 


              }else{
                // if user not verified pass the flow to next middleware 
                next();
              }
              
          }else{
            // if user not exists clear all cookie
            res.clearCookie("userId");
            res.clearCookie("userName");
            res.clearCookie("tokenId");
            // redirect user to login
            res.redirect("/?user_not_found=true");
          }
        } catch (error) {
          // when some bad happen 
          // clear all cookie
            res.clearCookie("userId");
            res.clearCookie("userName");
            res.clearCookie("tokenId");
            console.log(error);
            // redirect user to login
            res.redirect("/?user_not_found_Error_try=true");
            
        }
      }else{
          // when user id null redirect user to login 
          // ask user no cheating just kidding _-_
          // my linkedin profile 
          // please visite once 
          // https://www.linkedin.com/in/inderkant/
         res.redirect("/?user_not_found=true");
      }
}
// defaukt export this function or i can say middleware
export default preventUserToShowOtpPageWhenLoggedIn;