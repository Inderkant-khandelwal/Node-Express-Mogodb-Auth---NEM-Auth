// import user model
import Register_User_Model from "../../models/user_registeration_m.js";

// import jwt from jwt module
import jwt from "jsonwebtoken";

// import transporter 
import {transport} from "../../gloabl/mail_transporter.js";



// controller for forgot password page shown
const forgot_password = (req, res)=>{
   res.status(200).render("forgot-password" , {title:"Forgot Password" , isError:false , errorType:"" , isLinkSentSuccessfully:false});
}



    
// controller for reset link
const sendResetLink = async (req , res)=>{
   

   try {
     // destructure user email form req.body Object
     const {user_email} = req.body;
     // check if email is not null 
     if(user_email){
        // if email is there check that is email exists in our database or not
        // if not show error to user that email not exists or User not found
        // ask for create a new account 

        const isUserExists = await Register_User_Model.findOne({user_email});
         if(isUserExists){
            // user exists generate token and send a link on user email
             const secret_key = isUserExists._id + process.env.JWT_KEY;
             const token = jwt.sign({userId:isUserExists._id} , secret_key , {expiresIn:'15m'})
             const link = `http://127.0.0.1:8000/auth/new-password/${isUserExists._id}/${token}`;
             console.log(link);
            
             let info = await transport.sendMail({
                from : process.env.Email_Id,
                to:isUserExists.user_email,
                subject:"Panda News - Password Reset Link",
                html:`<a href=${link}>Reset Passoword Click This Link</a>`
            })
                
                 res.status(200).render("forgot-password" , {title:"Forgot Password" , isError:false, errorType:"" , isLinkSentSuccessfully:true});

            
    

         }else{
           // user not exists send error to client
           res.status(401).render("forgot-password" , {title:"Forgot Password" , isError:true , errorType:"User Not Found ! Create Account" , isLinkSentSuccessfully:false});
 
        }
     }else{
         // throw client error message that email is required for reset link
        res.status(400).render("forgot-password" , {title:"Forgot Password" , isError:true , errorType:"E-mail is Required !" , isLinkSentSuccessfully:false});
 
     }    

   } catch (error) {

      // something bad happen what you think isnt't it _-_
       console.log(error);
    res.status(500).render("forgot-password" , {title:"Forgot Password" , isError:true , errorType:"Unknown Error Occured" , isLinkSentSuccessfully:false});

   }
}

// named export
export  {forgot_password , sendResetLink};