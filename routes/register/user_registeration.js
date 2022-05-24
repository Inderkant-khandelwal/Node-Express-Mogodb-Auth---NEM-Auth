// importing express from express package
import express from "express";
//making router
const router = express.Router();
// importing controllers
import {  register_user , register_user_to_db} from "../../controllers/register/register_user_c.js";
// importing middlewares
import redirect_user_to_home_if_loggedin  from "../../middleware/check_is_user_logged.js";


//handling register page 
router.get("/register",  redirect_user_to_home_if_loggedin ,  register_user );
// handling sign up form
router.post("/register" , register_user_to_db);

// default export;
export default router;

