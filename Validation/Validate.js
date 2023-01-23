const client = require("../db/config");

const validate=(data)=>{
const {name,email,password,confirmpassword} = data;
let errors=[];
if(!name || !email || !password||!confirmpassword){
  errors.push({message:"Enter Details correctly!!!"})
}
if(password.length <8){
  errors.push({message:"Password should be 6 characters length!!!"})
}
if(password!==confirmpassword){
  errors.push({message:"Passwords donot match!!!"});
}
return errors;
}

module.exports={validate};