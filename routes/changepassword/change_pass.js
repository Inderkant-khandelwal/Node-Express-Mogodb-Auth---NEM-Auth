// import express from epxress package
// you can think express is a instance
import express from "express";
// making router object to handle request 
const router = express.Router();
// importing checkIsUserValid , decision middleware
// this is name import the name should be same
// as the function name 
// in case of export default
// no same name is required 


import {chekIsUserValid , decision} from "../../middleware/check_auth.js";
// importing show  showChangePasswordPageController , and changePass controller
import showChangePasswordPageController , {changePass} from "../../controllers/changepassword/change_pass_c.js";
// importing isUserMailVerified middleware
import isUserMailVerified from "../../middleware/is_usermail_verified.js";

// for showing page change password
router.get("/change-password" ,  chekIsUserValid , decision , isUserMailVerified , showChangePasswordPageController);
// when handling change password form
router.put("/change-password" ,  chekIsUserValid , decision , changePass);

// default exporting router
export default router;