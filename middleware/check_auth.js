// importing jwt
import jwt from "jsonwebtoken";
// importing User Model
import Register_User_Model from "../models/user_registeration_m.js";

// for checking is user vaild 
// you might be confused that i same code written 
// but wait it means still you haven't understand the 
// code please have Tea or Coffee and carefully read the code

const chekIsUserValid = async (req, res , next)=>{
// destructing data  
 const {userId , userName , tokenId } = req.cookies;
 
 
 // try block oepn
  try {
      
  // check if userId and tokenId is not null
 if(userId && tokenId){
               // check if user exists with the same id
        const isUserExists = await Register_User_Model.findById({_id:userId});
    
 if(isUserExists){
    // if user exists
   // check is token expired or not or is token valid or not;
       jwt.verify(tokenId , process.env.JWT_KEY );
        // when successfully verified
        // redirect commnd to the next router
         next();
    

 }else{
     // when user dont exists in our database
    res.locals.error = true;
    // pass control to another middleware
    next();
 }
 

}else{
    // if userId and tokenId are null or any one of
    res.locals.error = true;
    // pass controll to the next middleware
    next();
 }
} catch(e){
    // when some bad happen in that like jwt expires
    res.locals.error = true;
    // pass the command to next middleware
    next();
}


}

// decision time this function is totally based on the above function 
// i hope you ll understand the concept now
const decision =(req , res , next)=>{
    // destructure the res.locals object
    const {error} = res.locals;
    // if error true
    if(error){
        res.redirect("/?error=true");
    
    }else{
        // user is valid and jwt also valid 
        // padd the commadnd the to the next middleware
        next();
    }

}
// Named export these two functions will be used as in path route
// Har Har Mahadev
export  {chekIsUserValid , decision};