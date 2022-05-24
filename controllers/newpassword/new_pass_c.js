// importing user model
import Register_User_Model from "../../models/user_registeration_m.js";
// importing jwt
import jwt from "jsonwebtoken";
// importing bcrypt
import bcrypt from "bcrypt";
//importing url
import url from "url";

// controller for showing new password controller
const renderNewPassPage = (req , res)=>{
    const formUrl = `/auth/new-password/${req.params.id}/${req.params.token}`;
   res.status(200).render("newpass" , {title:"New passowrd" , isError:false , errorType:"" , url:formUrl});
}

// contrller for new password form
const newpass = async (req , res)=>{
    // making url for sending to page so that when page will submit 
    // use this url into the form - action attribute
    const formUrl = `/auth/new-password/${req.params.id}/${req.params.token}`;

    // try block start
    try {
        
   
   // getting destructuring user password and confirm password
   const {user_new_pass , user_c_pass} = req.body;

   // getting and destructuring req.params object
   const {id , token} = req.params;
  

    console.log(req.params);
       if(id && token){
            // check the id which we get from url is valid or not means 
     // any user belongs from that id to our database or not
     const isUserExists = await Register_User_Model.findById({_id:id});
     if(isUserExists){
         // if user exists
         // check token
         const secret_key = isUserExists._id + process.env.JWT_KEY;
        jwt.verify(token , secret_key);
         
        // if token below code will run else jwt throw the error
        // now when token is ok  check password and confirm password are same or not if
        // not same throw error to client

        if(user_new_pass === user_c_pass){
          // password is ok hash the new password
           // generating salt
           const salt = await bcrypt.genSalt(12);
           // hashing password
           const hasPassword = await bcrypt.hash(user_new_pass , salt);
           
           const isPassUpdated = await Register_User_Model.findByIdAndUpdate(isUserExists._id, {$set:{user_password:hasPassword}}); 
              if(isPassUpdated){
                 // if passwowrd updated successfully redirect to login with message of success
                 res.status(200).redirect( url.format({
                   pathname:"http://localhost:8000",
                   query:{
                       success:true,
                       message:"Password Update Successfully !"
                       

                   }

               }));
              }else{
                  // if password not updated due to some error
                  // throw error to client
                  res.status(500).render("newpass" , {title:"New passowrd" , isError:true , errorType:"Updation Failed !" , url:formUrl });

              }
        }else{
            // password is not ok
            res.status(401).render("newpass" , {title:"New passowrd" , isError:true , errorType:"Passowrd Not Matching !"  , url:formUrl });

        }
        

        

     }else{
         // throw error to client by saying this user not exists
         res.status(401).render("newpass" , {title:"New passowrd" , isError:true , errorType:"User Not Exists" , url:formUrl});

     }
 }else{
     // throw error to client that id and token is required
    res.status(400).render("newpass" , {title:"New passowrd" , isError:true , errorType:"User Id and Token Not Found" , url:formUrl});

 }
    

    } catch (error) {
        // something really bad happen its your time to explore
        // the errors Go and Defeat Errors
        console.log(error);
        res.status(500).render("newpass" , {title:"New passowrd" , isError:true , errorType:"Unknown Error Occured OR Token Expire" , url:formUrl});
     
    }

}

// named export
export {newpass , renderNewPassPage};