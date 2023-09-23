function validacionprod(){
    let id= document.getElementById('id_producto').value;
    let nombre= document.getElementById('nombre_producto').value;
    let descripcion= document.getElementById('descripcion_producto').value;
    let precio= document.getElementById('precio_producto').value;
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;

    let selectElement = document.getElementById('categoria_producto').value;
    

 if (nombre==="" || precio==="" || id==="") {

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
 else if (nombre=="Zanahoria" || nombre=="Arroz" || nombre=="Aguacate" || nombre=="Salsa de tomate" || nombre=="Salsa rosada" || nombre=="Salsa BBQ" || nombre=="Pollo" || nombre=="Carne" || nombre=="Papa" || nombre=="Coca-cola"){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Este producto ya existe en el registro, por favor, ingrese uno diferente.',
        timer: 5000
        
    });

 }
 else if (selectElement == 0){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, elija una categoría.',
        timer: 3000
    });
}
 else{
    Swal.fire({
        icon: 'success',
        title: 'Producto registrado con éxito',
        text: '',
        timer: 3000
        
        
    }).then(() => {
    
        window.location.href = 'gestionProductos.html'; 
    });
    ;
 }
 

}


function validacionacprod(){
    let id_actu= document.getElementById('id_producto_actu').value;
    let nombre_actu= document.getElementById('nombre_producto_actu').value;
    let descripcion_actu= document.getElementById('descripcion_producto_actu').value;
    let precio_actu= document.getElementById('precio_producto_actu').value;
    let caracteres = /^[a-zA-Z0-9_@.-ñÑ]+$/;
    
    let selectElement = document.getElementById('categoria_producto').value;


 if (nombre_actu==="" || descripcion_actu==="" || precio_actu==="" || id_actu==="") {

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
 else if (selectElement == 0){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, elija una categoría.',
        timer: 3000
    });
}

 else {
    Swal.fire({
        icon: 'success',
        title: 'Producto actualizado con éxito',
        text: '',
        timer: 3000
        
        
    }).then(() => {

        window.location.href = 'gestionProductos.html'; 
    });
    ;
 } 

}

function cargarImagen(){
    let src = document.getElementById('imagen_insumo').value

    if (src === ""){
        src = "https://png.pngtree.com/png-clipart/20190705/original/pngtree-gallery-vector-icon-png-image_4279768.jpg"
    }

    document.getElementById('imagen_i').src = src
}

// Obtén una referencia al elemento <select> y al botón


    const selectedIndex = selectElement.selectedIndex;
    
   
    