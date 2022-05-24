// importing express from express package
import express from "express";
// making router
const router = express.Router();
// importing middleware
import { chekIsUserValid , decision}from "../../middleware/check_auth.js";
// importing controller
import  showOtpPage , {verifyOtpFromDb} from  "../../controllers/otp/otp.js";
// importing middleware
import preventUserToShowOtpPageWhenLoggedIn from "../../middleware/prevent_otp_page.js";

// for showing page and others middleware
router.get("/verify-otp" ,  chekIsUserValid , decision ,  preventUserToShowOtpPageWhenLoggedIn , showOtpPage);
// verifying otp form handle request
router.post("/verify-otp" ,  chekIsUserValid , decision , verifyOtpFromDb);

// default export router
export default router;