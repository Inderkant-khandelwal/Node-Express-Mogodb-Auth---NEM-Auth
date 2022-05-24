// importing jwt
import jwt from "jsonwebtoken";
// importing User Document
import Register_User_Model from "../models/user_registeration_m.js";

// creating function
const chekIsUserLoged = async (req, res , next)=>{
  // destructuing req.cookies object
 const {userId , userName , tokenId } = req.cookies;
 
 
  // try block open
  try {
      
  // checking if user id and token id is null or not
 if(userId && tokenId){
          // if userid and token are not null
          // check if user exists in our databse from this id or not
        const isUserExists = await Register_User_Model.findById({_id:userId});
 
 if(isUserExists){
     // if user exists in our database
   // check is token expired or not or is token valid or not;
        // this will verify our token 
        // with secret key if everthing is good means jwt not expires
        jwt.verify(tokenId , process.env.JWT_KEY );
          // this will redirect to home
         res.redirect("/home?loged=true");
    
 }else{
     // if user not exists in our database
    res.locals.error = true;
    // pass the controll
    next();

 }
 
}else{
    // if token and user is  null or both null
        res.locals.error = true;
    //  pass the controll   
    next();
 }
 // end of try
} catch(e){
    // when something bad happen like jwt expires
    console.log(e);
    // pass the flow
    next();
 // end of catch 
}

// end of the main function
}


// default export this functioN
export  default chekIsUserLoged;