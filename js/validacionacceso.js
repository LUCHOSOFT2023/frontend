
function validacionacceso(){

    let correox= document.getElementById('correoacceso').value;
    let correo = correox.toLowerCase();
    let contrasena = document.getElementById('contrasenaacceso').value
    
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;
    

if (correo==="" || contrasena==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

    
} else if (!caracteres.test(correo) || contrasena===""){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

} else if (correo==="arley@gmail.com" && contrasena==="123"){

    Swal.fire({
        icon: 'success',
        title: 'Bienvenido a LuchoSoft',
        text: '',
        timer: 3000
        
        
    }).then(() => {

        window.location.href = 'Inicio.html'; // Cambia 'otra_pagina.html' por la URL de la página a la que deseas redirigir al usuario.
    });
    ;
} else if (correo==="arley@gmail.com" && contrasena!="123"){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseña incorrecta',
        timer: 3000
        
        
    });
} else {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no registrado',
            timer: 3000
            
            
        })
    } 
}
function validacionrecpw() {

    let correox= document.getElementById('correoacceso').value;
    let correo = correox.toLowerCase();
    let contrasena = document.getElementById('contrasenaacceso').value
    let contrasena2 = document.getElementById('contrasenaacceso2').value
    
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;
    


    if (correo==="" || contrasena==="") {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            timer: 3000
        });
    
        
    } else if (!caracteres.test(correo)){
    
        Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: 'Por favor, ingrese caracteres válidos.',
            timer: 10000
            
        });
    
    }
   else if (correo==="arley@gmail.com" && contrasena!=contrasena2){
    
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas tienen que ser iguales.',
            timer: 3000
            
            
        });

} else {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario no registrado',
        timer: 3000
        
        
    })
}  
if (correo==="arley@gmail.com" && contrasena===contrasena2){
    
    Swal.fire({
        icon: 'info',
        title: 'Revisa tu correo electrónico',
        text: 'Te hemos enviado un mensaje para validar que eres tú.',
        timer: 10000
        
        
    });
}  
}