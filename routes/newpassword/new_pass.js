// import express from express framework
import express from "express";
// making router 
const router = express.Router();
// importing controller
import { newpass ,  renderNewPassPage} from "../../controllers/newpassword/new_pass_c.js";
// importing middleware
import redirect_user_to_home_if_loggedin  from "../../middleware/check_is_user_logged.js";

// this  for handling new password pafe
 router.get("/new-password/:id/:token" , redirect_user_to_home_if_loggedin , renderNewPassPage);
// this for handling new password form
 router.post("/new-password/:id/:token" , newpass);

// default export
export default router;