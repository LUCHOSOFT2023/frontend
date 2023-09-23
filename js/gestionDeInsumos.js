let url = 'https://api-luchosoft.onrender.com/api/insumos'

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

const listarInsumos = async (busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidoInsumos')

    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?id_insumo=${encodeURIComponent(busqueda)}`;
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
            let listaInsumos = data.insumo //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            console.log(listaInsumos)
            datos =
                listaInsumos.map(function (insumo) {//Recorrer el array
                    let estado = ""
                    if (insumo.estado_insumo == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    let estado_nuevo;
                    if (insumo.estado_insumo == true) {
                        estado_nuevo = false;
                    } else {
                        estado_nuevo = true;
                    }
                    respuesta += `<tr><td>${insumo.id_insumo}</td>` +
                        `<td><img src="${insumo.imagen_insumo}" height="100px" width="100px"></td>` +
                        `<td>${insumo.nombre_insumo}</td>` +
                        `<td>${insumo.tipo_stock_insumo}</td>` +
                        `<td>${insumo.stock_insumo}</td>` +
                        `<td>${insumo.categoria_insumo}</td>` +
                        `<td>
                            <i onclick="window.location.href='ModificarInsumo.html?id_insumo=${insumo.id_insumo}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoInsumo('${insumo.id_insumo}', '${estado_nuevo}')" class="${estado}"></i>
                            <i onclick="eliminarInsumo('${insumo.id_insumo}')" class="fas fa-trash iconosRojos"></i>
                        </td>`+
                        `</tr>`
                })
            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const cambiarEstadoInsumo = async (id_insumo, estado_nuevo) => {

    try {

        let insumo = {
            id_insumo: id_insumo,
            estado_insumo: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(insumo),
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
            alert("Error al cambiar el estado del cliente.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}

function consultarInsumo(busqueda) {
    let urlAPI = url;
    // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
    if (busqueda) {
        urlAPI += `?id_insumo=${encodeURIComponent(busqueda)}`;
    }

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let insumo = data.insumo[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('id_insumo').value = insumo.id_insumo;
            document.getElementById('imagen_i').src = insumo.imagen_insumo;
            document.getElementById('imagen_insumo').value = insumo.imagen_insumo;
            document.getElementById('nombre_insumo').value = insumo.nombre_insumo;
            document.getElementById('tipo_stock_insumo').value = insumo.tipo_stock_insumo;
            document.getElementById('categoria_insumo').value = insumo.categoria_insumo;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del cliente:', error);
        });
}

function validarCamposModificar() {
    // Obtén los valores de los campos de entrada
    let id_insumo = document.getElementById('id_insumo').value;
    let imagen_insumo = document.getElementById('imagen_insumo').value;
    let nombre_insumo = document.getElementById('nombre_insumo').value;
    let tipo_stock_insumo = document.getElementById('tipo_stock_insumo').value;
    let categoria_insumo = document.getElementById('categoria_insumo').value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if ( id_insumo === "" || imagen_insumo === "" || nombre_insumo === "" || tipo_stock_insumo === "0" || categoria_insumo === "0") {
        // Utiliza SweetAlert para mostrar una alerta de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos correctamente.',
        });
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        actualizarInsumo();
    }
}

function validarCamposAgregar() {
    // Obtén los valores de los campos de entrada
    let id_insumo = document.getElementById('id_insumo').value;
    let imagen_insumo = document.getElementById('imagen_insumo').value;
    let nombre_insumo = document.getElementById('nombre_insumo').value;
    let tipo_stock_insumo = document.getElementById('tipo_stock_insumo').value;
    let categoria_insumo = document.getElementById('categoria_insumo').value;

    // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
    if ( id_insumo === "" || nombre_insumo === "" || tipo_stock_insumo === "0" || categoria_insumo === "0") {
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
    let id_insumo = document.getElementById('id_insumo').value;
    let imagen_insumo = document.getElementById('imagen_insumo').value;
    let nombre_insumo = document.getElementById('nombre_insumo').value
    let tipo_stock_insumo = document.getElementById('tipo_stock_insumo').value
    let categoria_insumo = document.getElementById('categoria_insumo').value

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

const actualizarInsumo = async () => {
    let id_insumo = document.getElementById('id_insumo').value
    let imagen_insumo = document.getElementById('imagen_insumo').value;
    let nombre_insumo = document.getElementById('nombre_insumo').value
    let tipo_stock_insumo = document.getElementById('tipo_stock_insumo').value
    let categoria_insumo = document.getElementById('categoria_insumo').value

    let insumo = {
        id_insumo: id_insumo,
        imagen_insumo: imagen_insumo,
        nombre_insumo: nombre_insumo,
        tipo_stock_insumo: tipo_stock_insumo,
        categoria_insumo: categoria_insumo
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(insumo),//Convertir el objeto _usuario  a un JSON
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
                    window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                }
            });
        })
}

function cargarImagen(){
    let src = document.getElementById('imagen_insumo').value

    if (src === ""){
        src = "https://png.pngtree.com/png-clipart/20190705/original/pngtree-gallery-vector-icon-png-image_4279768.jpg"
    }

    document.getElementById('imagen_i').src = src
}

const eliminarInsumo = async (id_insumo) => {

    fetch(`${url}?id_insumo=${id_insumo}`, {
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
                        window.location.href = 'Insumos.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })


}