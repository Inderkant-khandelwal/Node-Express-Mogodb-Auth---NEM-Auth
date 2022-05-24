
// controller for shwoing home page
const home = (req , res)=>{
   res.status(200).render("dashboard" , {title:'Dashboard'});

}

// named export
export {home}