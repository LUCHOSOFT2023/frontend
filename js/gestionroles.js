$(document).ready(function() {
    $(".toggle-icon").click(function() {
      var $toggleIcon = $(this);
      var currentState = $toggleIcon.attr("data-state");


      if (currentState === "on") {
        $toggleIcon.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        $toggleIcon.attr("data-state", "off");
      } else {
        $toggleIcon.removeClass("fa-toggle-off").addClass("fa-toggle-on");
        $toggleIcon.attr("data-state", "on");
      }
    });
  });

//const url = 'https://backendapi-2t9z.onrender.com/api/usuarios'
const url = 'https://rolesxd.onrender.com/api/usuario'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenidotabla')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.permisos //Capturar el array devuelto por la api
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta +=

            `<tr>
            <td>${usuario.idrol}</td>`+
            `<td>${usuario.nombrerol}</td>`+
            `<td>${usuario.descrol}</td>`+
            `<td>${usuario.permisosrol}</td>`+
            `<td>                                <i class="fa-solid fa-pen-to-square iconosRojos" onclick="window.location.href='ActualizarRoles.html'"></i>
            <i class="fas fa-toggle-on toggle-icon "></i></td>`+

            `</tr>`
            body.innerHTML = respuesta
        })
    })
}
const registrar = async()=>{

    

    let idrol= document.getElementById('idrol').value;
    let nombrerol = document.getElementById('nombrerol').value
    let descrol = document.getElementById('descrol').value
    
    let caracteres = /^[a-zA-Z0-9_.-ñÑ' 'áéíóúÁÉÍÓÚ]+$/;
    

if (idrol==="" || nombrerol==="" || descrol==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

} else if (!caracteres.test(nombrerol) || !caracteres.test(descrol)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

}

else {

    let _idrol = document.getElementById('idrol').value;
    let _nombrerol = document.getElementById('nombrerol').value;
    let _descrol = document.getElementById('descrol').value;
        let usuario = {
            idrol:_idrol,
            nombrerol: _nombrerol,
            descrol:_descrol,
            permisosrol: "Ventas, Pedidos"
        }

        fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if(json.msg){
                Swal.fire({
                    icon: 'success',
                    title: 'El rol se ha registrado',
                    timer: 4000
                    
                    
                }).then(() => {
                    window.location.href='gestionroles.html'

                })
                ;
            }
        })
    }


}

    
  
// const editar= (usuario)=>{
//     document.getElementById('nombre').value = ''
//     document.getElementById('pass').value = ''
//     document.getElementById('rol').value = ''
//     document.getElementById('estado').value = ''

//     document.getElementById('nombre').value = usuario.nombre
//     document.getElementById('pass').value = usuario.pass
//     document.getElementById('rol').value = usuario.rol
//     document.getElementById('estado').value = usuario.estado
// }

// const actualizar = async()=>{
//     let _nombre = document.getElementById('nombre').value
//     let _pass = document.getElementById('pass').value
//     let _confirmPass = document.getElementById('confirmPass').value
//     let _rol = document.getElementById('rol').value
//     let _estado = document.getElementById('estado').value
//      if((_pass.length>0 && _confirmPass.length>0) && (_pass == _confirmPass)){
//         let usuario = {
//             nombre:_nombre,
//             password:_pass,
//             rol:_rol,
//             estado:_estado
//         }

//         fetch(url,  {
//             method: 'PUT',
//             mode: 'cors',
//             body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
//             headers: {"Content-type": "application/json; charset=UTF-8"}
//         })
//         .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
//         .then(json => {
//             alert(json.msg)//Mensaje que retorna la API
//         })
//     }
//     else{
//         alert('El password y la confirmación del password no coinciden. Favor corregir.')
//     }
// }

// const eliminar = (id) =>{
//     if(confirm('¿Está seguro de realizar la eliminación') == true){

//            let usuario = {
//                 _id: id
//             }
//            fetch(url,  {
//                 method: 'DELETE',
//                 mode: 'cors',
//                 body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
//                 headers: {"Content-type": "application/json; charset=UTF-8"}
//             })
//             .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
//             .then(json => {
//                 alert(json.msg)//Mensaje que retorna la API
//             }) 
//     }
// }

// if(document.querySelector('#btnRegistrar')){
//     document.querySelector('#btnRegistrar')
//     .addEventListener('click',registrar)
// }

// if(document.querySelector('#btnActualizar')){
//     document.querySelector('#btnActualizar')
// .addEventListener('click',actualizar)
// }

