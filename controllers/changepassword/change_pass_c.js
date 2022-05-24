// importing usermodel 
import Register_User_Model from "../../models/user_registeration_m.js";
// importing jwt
import jwt from "jsonwebtoken";
// importing bcrypt for hashing
import bcrypt from "bcrypt";
// importing url for redirection its a built in module
import url from "url";

// controller for showing page of change password
const showChangePassPage = (req , res )=>{
    res.render("changepass" , {title:"Change Password" , isError:false , errorType:""});
}


// controller for change password 
const changePass = async (req , res)=>{
   
   
    // try block start
    try {
        
   
   // destructuring getting user password and confirm password
   const {user_new_pass , user_c_pass} = req.body;
   // destructuring userid and tokenid
   const {userId, tokenId} = req.cookies;
  

    console.log(req.params);
       if(userId && tokenId && user_new_pass && user_c_pass){
             // check the id which we get from cookies is valid or not means 
     // any user belongs from that id to our database or not
     const isUserExists = await Register_User_Model.findById({_id:userId});
     if(isUserExists){
         // if user exists
         // check token
         const secret_key =  process.env.JWT_KEY;
        jwt.verify(tokenId , secret_key);
         
        // if token valid below code will run else jwt throw the error
        // now when token is ok  check password and confirm password are same or not if
        // not same throw error to client

        if(user_new_pass === user_c_pass){
          // password is ok hash the new password
           // generating salt
           const salt = await bcrypt.genSalt(12);
           // hashing password
           const hashPassword = await bcrypt.hash(user_new_pass , salt);
           // updating password
           const isPassUpdated = await Register_User_Model.findByIdAndUpdate(isUserExists._id, {$set:{user_password:hashPassword}}); 
           // checking if password has been updated  
           if(isPassUpdated){
                    // if password update
                  // first clear all cookie like userName and UserId and tokenId
                  res.clearCookie("userName");
                  res.clearCookie("userId");
                  res.clearCookie("tokenId");
                 // if passwowrd changed successfully redirect to login with message of success
               // so that user can re - login with new password that he or she has changed
                    
                  
                res.status(200).redirect( url.format({
                   pathname:"http://localhost:8000",
                   query:{
                       success:true,
                       message:"Password Changed Successfully !"
                       

                   }


               }));

               
              }else{
                  // if password not changes due to some error
                  // throw error to client
                  res.status(500).render("changepass" , {title:"Change Password" , isError:true , errorType:"Updation Failed !"});

              }
        }else{
            // password is not ok
            res.status(401).render("changepass" , {title:"Change Password" , isError:true , errorType:"Passowrd Not Matching !" });

        }
        

        

     }else{
         // throw error to client by saying this user not exists
         res.status(401).render("changepass" , {title:"Change Password" , isError:true , errorType:"User Not Exists"});

     }
}else{
    // throw error to clientby saying some fields are required
    res.status(400).render("changepass" , {title:"Change Password" , isError:true , errorType:"Some Fields are missing"});

}
  

    } catch (error) {
        // something bad happen 
        // he he he _-_
        console.log(error);
        res.status(500).render("changepass" , {title:"Change Password" , isError:true , errorType:"Unknown Error Occured OR Token Expire"});
     
    }

}

// default export 
export default showChangePassPage; 
// named export
export {changePass}