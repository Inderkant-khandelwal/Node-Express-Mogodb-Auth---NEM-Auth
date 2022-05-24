// importing moongoose from moongoose package
import mongoose from "mongoose";

// writing function async function for connection database
// this function accept two parameter 
//first is Databse Url and second is Database Name
// you can find in db.env.file on the root directory 
// of this project
const Connect_Db = async (DATABASE_URL, DB_NAME) => {
   try {
      // i know you are thinking that what is the options means
      // so its a part of mongoose or i can say mongodb
      // i am sharing a link where you can read this in details 
      // if you dont understand this please search this options 
      // like that what is useNewUrlParser etc
      // medium link
      //https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1

      const OPTIONS = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         dbName: DB_NAME
      }
      await mongoose.connect(DATABASE_URL, OPTIONS);
      // if connection is successfull made show message 
      // remove all console.log() when deployed to client server

      console.log("SuccessFully Connected");
   } catch (e) {
      // if somehow our connectin is not made see console what is the error
      // make sure you remove all console while deploying your app to real 
      // World
      console.log(e);
   }
}

// exporting connection so that we can call this conection at where ever we need it
// but for this project i have use this at the top level in the index file 
// check index.js file at the root directory 
export default Connect_Db;