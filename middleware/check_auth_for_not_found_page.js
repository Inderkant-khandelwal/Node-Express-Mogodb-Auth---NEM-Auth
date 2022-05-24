// importing jsonwebtoken for token 
import jwt from "jsonwebtoken";
// importing User Model
import Register_User_Model from "../models/user_registeration_m.js";


// creating function for detecting that if user Logged or Not
const chekIsUserLoged = async (req, res , next)=>{
  
    // destructuring cookies 
 const {userId , userName , tokenId } = req.cookies;

 
  // try block start
  try {
      
  // check that userId and tokenId is not null 
 if(userId && tokenId){
         // check if user exists in our database from the id which we have received as (userId)
        const isUserExists = await Register_User_Model.findById({_id:userId});
   
 if(isUserExists){
   // if user exists now
    // check is token expired or not or is token valid or not;
    
         // this will check if token expired or not 
        jwt.verify(tokenId , process.env.JWT_KEY );
         
        // res.locals is global object so we are assigning message variable to that
        // so that we can use it globally 

        res.locals.message = true // for logged user
        // when everything is done good 
        // just redirect control to next middleware what ever it is
         
         next();
    
 }else{
     // if user is not exists
    res.locals.message = false 
    // redirect controll to next middleware
    next();
 }
 
}else{
    // if userId or Token or both are null in that case
     res.locals.message = false 
    // redirect controll to next middleware to the same router or path
     next();
 }
} catch(e){
    // when jwt expires it will throw error here
    // or another error here

    res.locals.message = false 

    // redirect controll to another middleware
    next();
  
}


}


// exporting default this function so that anyone can use this inside the whole app 
// where ever they want 
export  default chekIsUserLoged;