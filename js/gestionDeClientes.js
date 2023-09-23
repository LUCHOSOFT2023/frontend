let url = 'https://api-luchosoft.onrender.com/api/clientes'


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

const listarClientes = async (busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidoClientes')

    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?id_cliente=${encodeURIComponent(busqueda)}`;
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
            let listaClientes = data.cliente //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            console.log(listaClientes)
            datos =
                listaClientes.map(function (cliente) {//Recorrer el array
                    let estado = ""
                    let frecuente = ""
                    if (cliente.estado_cliente == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    if (cliente.cliente_frecuente == true) {
                        frecuente = "fa-solid fa-user-plus iconosRojos"
                    } else {
                        frecuente = "fa-solid fa-user-minus gris"
                    }
                    let estado_nuevo;
                    let cliente_frec_nuevo;
                    if (cliente.estado_cliente == true) {
                        estado_nuevo = false;
                    }else {
                        estado_nuevo = true;
                    }
                    if (cliente.cliente_frecuente == true){
                        cliente_frec_nuevo = false;
                    }else {
                        cliente_frec_nuevo = true;
                    }
                    respuesta += `<tr><td>${cliente.id_cliente}</td>` +
                        `<td>${cliente.nombre_cliente}</td>` +
                        `<td>${cliente.telefono_cliente}</td>` +
                        `<td>${cliente.direccion_cliente}</td>` +
                        `<td>
                            <i onclick="window.location.href='ModificarCliente.html?id_cliente=${cliente.id_cliente}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoCliente('${cliente.id_cliente}', '${estado_nuevo}')" class="${estado}"></i>
                            <i onclick="cambiarEstadoClienteFrecuente('${cliente.id_cliente}', '${cliente_frec_nuevo}')" class="${frecuente}"></i>
                            <i onclick="eliminarCliente('${cliente.id_cliente}')" class="fas fa-trash iconosRojos"></i>
                        </td>`+
                        `</tr>`
                })

            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const registrarCliente = async () => {
    let _id = document.getElementById('id_cliente').value
    let _nombre = document.getElementById('nombre_cliente').value
    let _telefono = document.getElementById('telefono_cliente').value
    let _direccion = document.getElementById('direccion_cliente').value

    let cliente = {
        id_cliente: _id,
        nombre_cliente: _nombre,
        telefono_cliente: _telefono,
        direccion_cliente: _direccion
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(cliente),//Convertir el objeto _usuario  a un JSON
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
                        window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
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
                        window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}

// En clienteFunciones.js

function consultarClientes(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?id_cliente=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let cliente = data.cliente[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('id_cliente').value = cliente.id_cliente;
            document.getElementById('nombre_cliente').value = cliente.nombre_cliente;
            document.getElementById('telefono_cliente').value = cliente.telefono_cliente;
            document.getElementById('direccion_cliente').value = cliente.direccion_cliente;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del cliente:', error);
        });
}

const actualizarCliente = async () => {
    let id_cliente = document.getElementById('id_cliente').value
    let _nombre = document.getElementById('nombre_cliente').value
    let _telefono = document.getElementById('telefono_cliente').value
    let _direccion = document.getElementById('direccion_cliente').value

    let cliente = {
        id_cliente: id_cliente,
        nombre_cliente: _nombre,
        telefono_cliente: _telefono,
        direccion_cliente: _direccion
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(cliente),//Convertir el objeto _usuario  a un JSON
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
                    window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
                }
            });
        })
}

const cambiarEstadoCliente = async (id_cliente, estado_nuevo) => {
    
    try {

        let cliente = {
            id_cliente: id_cliente,
            estado_cliente: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(cliente),
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
                    window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado del cliente.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

const cambiarEstadoClienteFrecuente = async (id_cliente, estado_nuevo) => {
    
    try {

        let cliente = {
            id_cliente: id_cliente,
            cliente_frecuente: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (response.ok) {
            const json = await response.json();
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'iconosRojos' // Clase CSS personalizada para el botón "OK"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado del cliente.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}


function validarCamposAgregar() {
    // Obtén los valores de los campos de entrada
    const idCliente = document.getElementById("id_cliente").value;
    const nombreCliente = document.getElementById("nombre_cliente").value;
    const telefonoCliente = document.getElementById("telefono_cliente").value;
    const direccionCliente = document.getElementById("direccion_cliente").value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if (idCliente.trim() === "" || nombreCliente.trim() === "" || telefonoCliente.trim() === "" || direccionCliente.trim() === "") {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        registrarCliente();
    }
}

function validarCamposModificar() {
    // Obtén los valores de los campos de entrada
    const idCliente = document.getElementById("id_cliente").value;
    const nombreCliente = document.getElementById("nombre_cliente").value;
    const telefonoCliente = document.getElementById("telefono_cliente").value;
    const direccionCliente = document.getElementById("direccion_cliente").value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if (idCliente.trim() === "" || nombreCliente.trim() === "" || telefonoCliente.trim() === "" || direccionCliente.trim() === "") {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        actualizarCliente();
    }
}

const eliminarCliente = async (id_cliente) => {

    fetch(`${url}?id_cliente=${id_cliente}`, {
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
                        window.location.href = 'Clientes.html'; // Redireccionar después del clic en OK
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
