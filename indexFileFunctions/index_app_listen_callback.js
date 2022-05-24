// here we have defined fat arrow function and assign to a constant called ( main_Home_App_Listen_CallBack)
// this is the function which we have passed into app.listen() in index.js file
// for listening the if server connected to port
// Note this function is taking (PORT) as parameter

const main_Home_App_Listen_CallBack = (PORT)=>{
    console.log("Your Server is Running on the " + PORT);
}

// here we are exporting this function so that we can use this in index.js file
export default  main_Home_App_Listen_CallBack;