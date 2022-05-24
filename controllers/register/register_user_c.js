// importing user registeration model
import Register_User_Model from "../../models/user_registeration_m.js";
// importing bcrypt
import bcrypt from "bcrypt";

//import url modeule
import url from "url";


// for only showing signup page controller
const register_user =  (req , res)=>{
    res.status(200).render("signup", {title:"Signup" , isError:false , errorType:""});
}

  
// function for user registeration controller
const register_user_to_db = async (req, res)=>{
   
     try {
         
     // destructure user data fro req.body object
    const {user_name , user_email , user_password} = req.body;
   
    if(user_name && user_email && user_password){
        // if every filed is ok check user if already registered or not
          const isUserAlreadyExists =  await  Register_User_Model.findOne({user_email:user_email});
          if(isUserAlreadyExists){
             // User ALready Registered Show user this messaage and ask for login with creditials
             

            res.status(409).render("signup" , {title:"Signup", isError:true , errorType:"User Already Registered"});
          }else{
              // generate salt
                const salt = await bcrypt.genSalt(12);
                 // hashing password
                const hashPassword = await bcrypt.hash(user_password , salt);
              // register user to database
              const user  = Register_User_Model({
                  user_name,
                  user_email,
                  user_password:hashPassword
              })
               
              // check if user save to db
            const isUserSave = await user.save();
             if(isUserSave){
                 // if user successfull registered redirect to login 
                res.status(201).redirect( url.format({
                    pathname:"http://localhost:8000",
                    query:{
                        success:true,
                        message:"Yor are Successfully Registered ! Login Now"
                        

                    }

                }));
             }  
          }

        // if user is not registered push user to database and redirect to login page

    }else{
        // all fields required response as error
        res.status(400).render("signup" , {title:"Signup", isError:true , errorType:"All fields required"});
    }
   
        } catch (error) {
            // if any error occured show user this messsaage
            res.status(500).render("signup" , {title:"Signup", isError:true , errorType:"Unknown Error Occured"});

        }


  // end of function
}

//named export
export {register_user , register_user_to_db};