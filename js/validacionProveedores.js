function validacionpro(){
    let id= document.getElementById('id_proveedor').value;
    let nombre= document.getElementById('nombre_proveedor').value;
    let direccion= document.getElementById('direccion_proveedor').value;
    let telefono= document.getElementById('telefono_proveedor').value;
    
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;
    

 if (nombre==="" || direccion==="" || telefono==="" || id==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

    
 } 
 else if (!caracteres.test(nombre)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

 }
 else if (nombre=="Cachuchax" || nombre=="Donde el cucho" || nombre=="Serresiete" || nombre=="LeidyLegumbres" || nombre=="MariaVerde" || nombre=="ArleyKnives" || nombre=="JuandaTech" || nombre=="Julicerámicas" || nombre=="RatiStunner" || nombre=="Ohiggins"){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Este proveedor ya existe en el registro, por favor, ingrese uno diferente.',
        timer: 5000
        
    });

 } else {
    Swal.fire({
        icon: 'success',
        title: 'Proveedor registrado con éxito',
        text: '',
        timer: 3000
        
        
    }).then(() => {

        window.location.href = 'gestionProveedores.html'; 
    });
    ;
 } 

}


function validacionacpro(){
    let id_actu= document.getElementById('id_proveedor_actu').value;
    let nombre_actu= document.getElementById('nombre_proveedor_actu').value;
    let direccion_actu= document.getElementById('direccion_proveedor_actu').value;
    let telefono_actu= document.getElementById('telefono_proveedor_actu').value;
    
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;
    

 if (nombre_actu==="" || direccion_actu==="" || telefono_actu==="" || id_actu==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

    
 } 
 else if (!caracteres.test(nombre_actu)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

 }
 else {
    Swal.fire({
        icon: 'success',
        title: 'Proveedor actualizado con éxito',
        text: '',
        timer: 3000
        
        
    }).then(() => {

        window.location.href = 'gestionProveedores.html'; 
    });
    ;
 } 

}