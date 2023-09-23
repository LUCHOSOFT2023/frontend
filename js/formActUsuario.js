//console.log("archivo vinculado");

const  cedula = document.querySelector("[name=cedula]");
const  nombre = document.querySelector("[name=nombre]");
const  telefono = document.querySelector("[name=telefono]");
const  direccion = document.querySelector("[name=direccion]");
const  correo = document.querySelector("[name=correo]");

const validateEmptyField = (message,e) =>{
  const field = e.target;
  const fieldValue = e.target.value;
  if(fieldValue.trim().length == 0){
     field.classList.add("invalid");
     field.nextElementSibling.classList.add ("error");
      field.nextElementSibling.innerText = message;
  }else{
   field.classList.remove("invalid");
   field.nextElementSibling.classList.remove("error");
   field.nextElementSibling.innerText = "";

}
}


// expresiones correo

const validateEmailFormat = e =>{
 const field = e.target;
 const fieldValue = e.target.value;
 const regex= new RegExp (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

 if(fieldValue.trim().length >5 && !regex.test(fieldValue)){
   field.classList.add("invalid");
   field.nextElementSibling.classList.add ("error");
   field.nextElementSibling.innerText ="Ingrese un correo valido";

}else{
   field.classList.remove("invalid");
   field.nextElementSibling.classList.remove("error");
   field.nextElementSibling.innerText = "";
 
}
}
cedula.addEventListener("blur",(e) => validateEmptyField("Ingrese numero de identificación.",e));
nombre.addEventListener("blur",(e) => validateEmptyField("Nombre requerido.", e));
telefono.addEventListener("blur",(e) => validateEmptyField("Número teléfonico requerido.",e));
correo.addEventListener("blur",(e)=> validateEmptyField("Correo requrido.",e));
direccion.addEventListener("blur",(e)=> validateEmptyField("Dirección requerida.",e));

correo.addEventListener("input",validateEmailFormat);


