

 readNameFromCookie();

function hideErrorMessage(serversignupError , clientsignupError , whenRegisSucMH = ""){
//    const serverErrorElement = document.getElementById("signupError");
//    const clientErrorElement =  document.getElementById("clientsignupError");
    if(serversignupError){
        serversignupError.style.display = "none";
    }
    if(clientsignupError){
        clientsignupError.style.display = "none";
    }
   if( whenRegisSucMH != ""){
    whenRegisSucMH.style.display = "none";
   } 
} 

// signup page basic validation 
function checkingAllInputField( clientError , inputs ){
    
     function clientErrorEle(text){
        
        // const errorEle = document.getElementById("clientsignupError");
        clientError.style.display = "block";
        clientError.innerHTML = text;
        clientError.style.color = "red";
        
        throw Error;
      
       
     }
     // gettin all inputs as array
    // const inputs = document.querySelectorAll("input.s-c");
    
    try {
        // looping on inputs so that we can check if inputs pass our validation or not
        // if not show error

        //loop start
        inputs.forEach((ele)=>{
            const name = ele.getAttribute("name");
        
           
              if(name === "user_name"){
                if(ele.value.trim().length < 2){
                    clientErrorEle("Valid User Name Required ! More than 2 digits");
                    
                 }
              
                  
              }else if(name === "user_email"){
                if(!ele.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                    clientErrorEle("Valid Email Id Required !");
                    
                 }
                
              }else if(name === "user_password"){
    
                if(ele.value.trim().length <= 5){
                    clientErrorEle("Valid Password Required ! More than 5 digits");
                   
                }
              }


             
             //loop end
            });

     // try end       
    } catch (error) {
        console.log(error);

    } // end of catch 

     if(inputs[2]){
        if(inputs[0].value.length > 2 && inputs[2].value.length > 5 && inputs[1].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            const submitButton = document.getElementById("submitButton");
            submitButton.setAttribute("type" , "submit");
        }
     }else if(inputs[1]){
        if(inputs[1].value.length > 2  && inputs[0].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            const submitButton = document.getElementById("submitButton");
            submitButton.setAttribute("type" , "submit");
        }
     }else{
        if(inputs[0].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            const submitButton = document.getElementById("submitButton");
            submitButton.setAttribute("type" , "submit");
        }
     }
  
    
       
   // end main function 
}





// ********** New Passowrd  Page Validation Start *************//




function hideErrorMessageOfNewPassPage(serversignupError , clientsignupError){
    //    const serverErrorElement = document.getElementById("signupError");
    //    const clientErrorElement =  document.getElementById("clientsignupError");
        if(serversignupError){
            serversignupError.style.display = "none";
        }
        if(clientsignupError){
            clientsignupError.style.display = "none";
           
        }
       
    } 


  function validateNewPassPageInputs (newPassEle , confirmPassEle , clientErrorEle){
    const newval = newPassEle.value;
    const confval = confirmPassEle.value;

    if(newval && confval){
        if(newval === confval){
            if(newval.length <= 5){
                clientErrorEle.style.display="block";
                clientErrorEle.innerHTML = "Min: 5 digit Or Max 5 digits required";
                clientsignupError.style.color = "red";
            }else if(confval.length <= 5){
                clientErrorEle.style.display="block";
                clientErrorEle.innerHTML = "Min: 5 digit Or Max 5 digits required";
                clientsignupError.style.color = "red";
            }else{
                const submitButton = document.getElementById("newPassSubmitButton");
                  submitButton.setAttribute("type" , "submit");
            }

        } else{
             clientErrorEle.style.display="block";
             clientErrorEle.innerHTML = "Password Not Matching";
             clientsignupError.style.color = "red";
        }
        
      }else{
        clientErrorEle.style.display="block";
        clientErrorEle.innerHTML = "All Fields Are Required!";
        clientsignupError.style.color = "red";
      }  
  }  
// ---------- New Passowrd  Page  Validation End --------------//

// show side bar
const showSideBar = ()=>{
   const drawer = document.getElementById("side-drawer-con");
   const cover = document.getElementById("cover");
  
   drawer.style.left ="0";
   cover.style.left ="0";
   drawer.style.transition = "all 0.5s";
   cover.style.transition = "all 0.3s";
   const body = document.getElementById("body");
   body.style.overflowY = "hidden";
   window.scrollTo(0,0);
  
}

// hide side bar

const hideSidebar = ()=>{
    const drawer = document.getElementById("side-drawer-con");
    const cover = document.getElementById("cover");
    const body = document.getElementById("body");
    body.style.overflowY = "scroll";
    drawer.style.left ="-320px";
    cover.style.left ="-100vw";
    cover.style.transition = "all 0.3s";
    drawer.style.transition = "all 0.5s";
   
  

 }

 const logoutUser = ()=>{
    
    document.cookie = 'userId=;maxAge=-10;'; 
    document.cookie = 'tokenId=;maxAge=-10;';  
    document.cookie = 'userName=;maxAge=-10;';  
    // console.log(document.cookie);
   
    location.href="/";
    
}
function readNameFromCookie(){
    // getting element where logged user name will show
    let whereUserNameShow = document.getElementById("user-name-dynamic");
    // getting all cookie
    const allCookie = document.cookie;
    console.log(allCookie);
    // break cookie where (;) and convert to array  by default this function 
    // automatically convirt this
    const splitCookie = allCookie.split(";");
     // again split cookie where (=) and get index value from [1] index
    const userName = splitCookie[1].split("=")[1];
    console.log(userName);
    if(userName){
        // setting name if name is there in cookie
        whereUserNameShow.innerHTML= userName;
    }else{
        // setting default name if name is not there
        whereUserNameShow.innerHTML= "Hello Guest";
    }
}
     
// otp validation
function  checkOtpValidation (){

    const  clientErrorEle = document.getElementById("clientError");
    const  input = document.querySelector(".otp-input");
    const regexForOtp = /^[0-9]{6}$/;
    
    
     if(regexForOtp.test(input.value)){
        //  get otp button and set type = submit for submitting the form
        const otpButton = document.querySelector(".otpButton");
        otpButton.setAttribute("type" , "submit");
     }else{
        clientErrorEle.style.display="block";
        clientErrorEle.innerHTML = "Valid OTP required 6 digits !";
        clientErrorEle.style.color = "red";
     }
  
}
