// importing express from express;
import express from "express";
// making router 
const router = express.Router();
// importing controller
import {home} from "../../controllers/home/home_c.js";
// importing middleware
import { chekIsUserValid , decision } from "../../middleware/check_auth.js";
// importing middleware
import isUserMailVerified from "../../middleware/is_usermail_verified.js";

// for handling home route
router.get("/home",  chekIsUserValid, decision, isUserMailVerified , home);

//default export router
export default router;