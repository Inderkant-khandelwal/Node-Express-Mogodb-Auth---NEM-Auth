//importing express from express framework
import express from "express";
// making router
const router = express.Router();

// importing controller
import {forgot_password, sendResetLink} from "../../controllers/forgotpassword/forgot_password_c.js";
// importing middleware
import redirect_user_to_home_if_loggedin  from "../../middleware/check_is_user_logged.js";


// for handling the reset password page 
router.get("/reset-password" , redirect_user_to_home_if_loggedin , forgot_password);
// for handling reset passoword form
router.post("/reset-password" , sendResetLink)

// default export router
export default router;