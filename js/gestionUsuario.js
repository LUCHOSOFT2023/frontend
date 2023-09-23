$(document).ready(function () {
    $(".toggle-icon").click(function () {
        var $toggleIcon = $(this);
        var currentState = $toggleIcon.attr("data-state");

        if (currentState === "on") {
            $toggleIcon.removeClass("bi-toggle2-on").addClass("bi-toggle2-off");
            $toggleIcon.attr("data-state", "off");
            $(this).toggleClass("gris");
        } else {
            $toggleIcon.removeClass("bi-toggle2-off").addClass("bi-toggle2-on");
            $toggleIcon.attr("data-state", "on");
            $(this).toggleClass("gris");
        }
    });

    $(".iClienteFrecuente").click(function () {
        $(this).toggleClass("fa-user-plus fa-user-minus");
        $(this).toggleClass("gris");
    });

    
});
/*-------API USUARIO-----*/

let url = 'https://backend-d5hc.onrender.com/api/usuarios'

function seleccionarImagen() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            console.log("Imagen seleccionada:", selectedImage);
        }
    });

    input.click();
}

const listarUsuarios = async (busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidoUsuarios')

    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?id_usuario=${encodeURIComponent(busqueda)}`;
    }

    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(function (data) {
            let listarUsuarios = data.usuario //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            console.log(listarUsuarios)
            datos =
            listarUsuarios.map(function (usuario) {//Recorrer el array
                    let estado = ""
                    if (usuario.estado_usuario == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    let estado_nuevo;
                    if (usuario.estado_ == true) {
                        estado_nuevo = false;
                    } else {
                        estado_nuevo = true;
                    }
                    respuesta += `<tr><td>${usuario.id_usuario}</td>` +
                        `<td><img src="${usuario.imagen_usuario}" height="100px" width="100px"></td>` +
                        `<td>${usuario.nombre_usuario}</td>` +
                        `<td>${usuario.telefono_usuario}</td>` +
                        `<td>${usuario.direccion_usuario}</td>` +
                        `<td>${usuario.estado_usuario}</td>` +
                        `<td>$No disponible</td>` +
                        `<td>
                            <i onclick="window.location.href='ModificarUsuario.html?id_usuario=${usuario.id_usuario}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoUsuario('${usuario.id_usuario}', '${estado_nuevo}')" class="${estado}"></i>
                            <i onclick="eliminarUsuario('${usuario.id_usuario}')" class="fas fa-trash iconosRojos"></i>
                        </td>`+
                        `</tr>`
                })
            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const cambiarEstadoUsuario = async (id_usuario, estado_nuevo) => {

    try {

        let usuario = {
            id_usuario: id_usuario,
            estado_usuario: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (response.ok) {
            const json = await response.json();
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado del usuario.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

function consultarUsuario(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?id_usuario=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let usuario = data.usuario[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('id_usuario').value = usuario.id_usuario;
            document.getElementById('imagen_usuario').src = usuario.imagen_usuario;
            document.getElementById('nombre_usuario').value = usuario.nombre_usuario;
            document.getElementById('telefono_usuario').value = usuario.telefono_usuario;
            document.getElementById('direccion_usuario').value = usuario.direccion_usuario;
            document.getElementById('estado_usuario').value = usuario.estado_usuario;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del usuario:', error);
        });
}

function validarCamposModificar() {
    // Obtén los valores de los campos de entrada
    let id_usuario = document.getElementById('id_usuario').value;
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let nombre_usuario = document.getElementById('nombre_usuario').value;
    let telefono_usuario = document.getElementById('telefono_usuario').value;
    let direccion_usuario = document.getElementById('direccion_usuario').value;
    let estado_usuario = document.getElementById('estado_usuario').value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if ( id_usuario === "" || imagen_usuario === "0" || nombre_usuario === "0" || telefono_usuario === "0" || direccion_usuario === "0" || estado_usuario) {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        actualizarUsuario();
    }
}

function validarCamposAgregar() {
    // Obtén los valores de los campos de entrada
    let id_usuario = document.getElementById('id_usuario').value;
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let nombre_usuario = document.getElementById('nombre_usuario').value;
    let telefono_usuario = document.getElementById('telefono_usuario').value;
    let direccion_usuario = document.getElementById('direccion_usuario').value;
    let estado_usuario = document.getElementById('estado_usuario').value;


    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if ( id_usuario === "" || imagen_usuario === "" || nombre_usuario === "0" || telefono_usuario === "0"|| direccion_usuario==="0"|| estado_usuario) {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        registrarInsumo();
    }
}

const registrarInsumo = async () => {
    let id_usuario = document.getElementById('id_usuario').value;
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let nombre_usuario = document.getElementById('nombre_usuario').value;
    let telefono_usuario = document.getElementById('telefono_usuario').value;
    let direccion_usuario = document.getElementById('direccion_usuario').value;
    let estado_usuario = document.getElementById('estado_usuario').value;


    let insumo = {
        id_insumo: id_insumo,
        imagen_insumo: imagen_insumo,
        nombre_insumo: nombre_insumo,
        tipo_stock_insumo: tipo_stock_insumo,
        stock_insumo: 0,
        categoria_insumo: categoria_insumo
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(insumo),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg=="Inserción exitosa") {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                    }
                });
            }else{
                Swal.fire({
                    title: json.msg,
                    icon: 'error',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}

const actualizarUsuario = async () => {
    let id_usuario = document.getElementById('id_usuario').value
    let imagen_usuario = document.getElementById('imagen_usuario').value;
    let nombre_usuario = document.getElementById('nombre_usuario').value;
    let telefono_usuario = document.getElementById('telefono_usuario').value;
    let direccion_usuario = document.getElementById('direccion_usuario').value;
    let estado_usuario = document.getElementById('estado_usuario').value;


    let usuario = {
        id_usuario: id_usuario,
        imagen_usuario: imagen_usuario,
        nombre_usuario: nombre_usuario,
        telefono_usuario: telefono_usuario,
        direccion_usuario: direccion_usuario,
        estado_usuario:estado_usuario,
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
                }
            });
        })
}

function cargarImagen(){
    let src = document.getElementById('imagen_usuario').value

    if (src === ""){
        src = "https://png.pngtree.com/png-clipart/20190705/original/pngtree-gallery-vector-icon-png-image_4279768.jpg"
    }

    document.getElementById('imagen_usuario').src = src
}

const eliminarUsuario = async (id_usuario) => {

    fetch(`${url}?id_insumo=${id_usuario}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg=="La eliminación se efectuó exitosamente") {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                    }
                });
            }else{
                Swal.fire({
                    title: json.msg,
                    icon: 'error',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'gestionUsuario.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })


}
