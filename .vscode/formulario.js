//console.log("archivo vinculado");

const  cedula = document.querySelector("[name=cedula]");
const  nombre = document.querySelector("[name=nombre]");
const  telefono = document.querySelector("[name=telefono]");
const  direccion = document.querySelector("[name=direccion]");
const  correo = document.querySelector("[name=correo]");
const  password = document.querySelector("[name=password]");

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


const validateNombFormat = e =>{
   const field = e.target;
   const fieldValue= e.target.value;
   const regex= new RegExp (/^[A-Za-z\s']+$/);
  
   if(fieldValue.trim().length >1 && !regex.test(fieldValue)){
     field.classList.add("invalid");
     field.nextElementSibling.classList.add ("error");
     field.nextElementSibling.innerText ="Ingrese un nombre valido.";
  
  }else{
     field.classList.remove("invalid");
     field.nextElementSibling.classList.remove("error");
     field.nextElementSibling.innerText = "";
   
  }
}


const validateTelFormat = e =>{
   const field = e.target;
   const fieldValue= e.target.value;
   const regex= new RegExp (/^[0-9]+$/);
  
   if(fieldValue.trim().length >1 && !regex.test(fieldValue)){
     field.classList.add("invalid");
     field.nextElementSibling.classList.add ("error");
     field.nextElementSibling.innerText ="Ingrese solo números.";
  
  }else{
     field.classList.remove("invalid");
     field.nextElementSibling.classList.remove("error");
     field.nextElementSibling.innerText = "";
   
  }
}

const validateDirecFormat = e =>{
   const field = e.target;
   const fieldValue= e.target.value;
   const regex= new RegExp (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s,.'-]+$/);
  
   if(fieldValue.trim().length >4 && !regex.test(fieldValue)){
     field.classList.add("invalid");
     field.nextElementSibling.classList.add ("error");
     field.nextElementSibling.innerText ="Ingrese una dirección valido.";
  
  }else{
     field.classList.remove("invalid");
     field.nextElementSibling.classList.remove("error");
     field.nextElementSibling.innerText = "";
   
  }
}
const validaCedFormat = e =>{
   const field = e.target;
   const fieldValue= e.target.value;
   const regex= new RegExp (/^[0-9]+$/);
  
   if(fieldValue.trim().length >1 && !regex.test(fieldValue)){
     field.classList.add("invalid");
     field.nextElementSibling.classList.add ("error");
     field.nextElementSibling.innerText ="Ingrese solo números.";
  
  }else{
     field.classList.remove("invalid");
     field.nextElementSibling.classList.remove("error");
     field.nextElementSibling.innerText = "";
   
  }
}
correo.addEventListener("input",validateEmailFormat);
nombre.addEventListener("input",validateNombFormat);
telefono.addEventListener("input",validateTelFormat);
direccion.addEventListener("input",validateDirecFormat);
cedula.addEventListener("input",validaCedFormat);

