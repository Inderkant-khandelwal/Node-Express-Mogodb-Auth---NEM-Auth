// importing express from express package
import express from "express";

// using express router middle ware
const router = express.Router();

// importing log_in_controller 
import {log_in_controller , login_user} from "../../controllers/login/log_in_c.js";
// importing middleware
import redirect_user_to_home_if_loggedin  from "../../middleware/check_is_user_logged.js";

// for showing login page 
router.get("/" , redirect_user_to_home_if_loggedin , log_in_controller);
// for handling login form
router.post("/" , login_user);


// default export
export default router;

