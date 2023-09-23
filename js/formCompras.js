//console.log("archivo vinculado");

const idCompra = document.querySelector("[name=idCompra]");
const nombreCompra = document.querySelector("[name=nombreCompra]");
//const  telefono = document.querySelector("[name=telefono]");
//const  direccion = document.querySelector("[name=direccion]");
const precioCompra = document.querySelector("[name=precioCompra]");
//const  password = document.querySelector("[name=password]");

const validateEmptyField = (message, e) => {
   const field = e.target;
   const fieldValue = e.target.value;
   if (fieldValue.trim().length == 0) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = message;
   } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";

   }
}


// expresiones correo


const validateNombComFormat = e => {
   const field = e.target;
   const fieldValue = e.target.value;
   const regex = new RegExp(/^[A-Za-z\s']+$/);

   if (fieldValue.trim().length > 1 && !regex.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "Ingrese un nombre valido.";

   } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";

   }
}


const validateIdCompraFormat = e => {
   const field = e.target;
   const fieldValue = e.target.value;
   const regex = new RegExp(/^[0-9]+$/);

   if (fieldValue.trim().length > 1 && !regex.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "Ingrese solo números.";

   } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";

   }
}

const validaPrecioFormat = e => {
   const field = e.target;
   const fieldValue = e.target.value;
   const regex = new RegExp(/^[0-9]+$/);

   if (fieldValue.trim().length > 1 && !regex.test(fieldValue)) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = "Ingrese solo números.";

   } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";

   }
}
//idCompra.addEventListener("input", validateIdCompraFormat);
//nombreCompra.addEventListener("input", validateNombComFormat);
//precioCompra.addEventListener("input", validaPrecioFormat);
//direccion.addEventListener("input",validateDirecFormat);
//cedula.addEventListener("input",validaCedFormat);

/*---API COMPRAS*-----------------------------------------------*/

let url = 'https://backend-d5hc.onrender.com/api/compras'



const listaCompras = async () => {
   let respuesta = ''
   let body = document.getElementById('contenidoCompras')

   // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro

   let urlAPI = url;

   //url: Es la url de la api.
   //Al deslpegarla en el servidor colocar la api del servidor
   fetch(urlAPI, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(function (data) {
         let listaCompras = data.compra //Capturar el array devuelto por la api

         // Limpia la tabla antes de agregar datos nuevos
         table.clear().draw();

         console.log(listaCompras)
         datos =
            listaCompras.map(function (compra) {//Recorrer el array
               let estado = ""
               if (compra.estado_compra == false) {
                  estado = "fas fa-toggle-off iconos toggle-icon gris"
               } else {
                  estado = "fas fa-toggle-on iconos toggle-icon"
               }
               let estado_nuevo;
               if (compra.estado_compra == true) {
                  estado_nuevo = false;
               } else {
                  estado_nuevo = true;
               }
               respuesta += `<tr><td>${compra.id_compra}</td>` +
                  `<td>${compra.nombre_compra}</td>` +
                  `<td>${compra.total_compra}</td>` +
                  `<td>${compra.fecha_compra}</td>` +
                  `<td>No disponible</td>`+
                  `<td>No disponible</td>`+
                  `<td>
                            <i onclick="window.location.href='registrarCompras.html?idCompra=${compra.id_compra}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i class="${estado}"></i>
                        </td>`+
                  `</tr>`
            })

         // Agrega los datos a la tabla y redibuja la tabla
         table.rows.add($(respuesta)).draw();
      })
}

const cambiarEstadoCompra = async (id_compra, estado_nuevo) => {

   try {

      let compra = {
         id_compra: id_compra,
         estado_compra: estado_nuevo
      }

      const response = await fetch(url, {
         method: 'PUT',
         mode: 'cors',
         body: JSON.stringify(compra),
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
               window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
            }
         });
      } else {
         alert("Error al cambiar el estado de la compra.");
      }
   } catch (error) {
      console.error("Error de red:", error);
   }
}

function consultarCompra(busqueda) {
   let urlAPI = url;
   // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
   if (busqueda) {
      urlAPI += `?id_compra=${encodeURIComponent(busqueda)}`;
   }

   fetch(urlAPI, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json())
      .then(function (data) {
         let compra = data.compra[0]; // Suponiendo que obtienes una sola compra

         // Llenar los campos del formulario con los datos del cliente
         document.getElementById('id_compra').value = compra.id_compra;
         document.getElementById('nombre_compra').src = compra.nombre_compra;
         document.getElementById('total_compra').src = compra.precio_compra;
         document.getElementById('fecha-Compra').value = compra.fecha_compra;
      })
      .catch(function (error) {
         console.error('Error al obtener el detalle compra:', error);
      });
}

function validarCamposModificar() {
   // Obtén los valores de los campos de entrada
   let id_compra = document.getElementById('id-compra').value;
   let nombre_compra = document.getElementById('nombre-compra').value;
   let total_compra = document.getElementById('total_Compra').value;
   let fecha_compra = document.getElementById('fecha_compra').value;


   // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
   if (id_compra === "" || nombre_compra === "" || total_compra === ""  || fecha_compra === "0") {
      // Utiliza SweetAlert para mostrar una alerta de error
      Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Por favor, completa todos los campos correctamente.',
      });
   } else {
      // Todos los campos son válidos, llama a la función agregarCliente
      actualizarCompra();
   }
}

function validarCamposAgregar() {
   // Obtén los valores de los campos de entrada
   let id_compra = document.getElementById('id_compra').value;
   let nombre_compra = document.getElementById('nombre_compra').value;
   let precio_compra = document.getElementById('total_compra').value;
   let fecha_compra = document.getElementById('fecha_compra').value;

   // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
   if (id_compra === "" || nombre_compra === "" || precio_compra === "0" ||fecha_compra === "0") {
      // Utiliza SweetAlert para mostrar una alerta de error
      Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Por favor, completa todos los campos correctamente.',
      });
   } else {
      // Todos los campos son válidos, llama a la función agregarCliente
      registrarCompra();
   }
}

const registrarCompra = async () => {
   let id_compra = document.getElementById('id_compra').value;
   let nombre_compra = document.getElementById('nombre_compra').value;
   let total_compra = document.getElementById('total_compra').value;
   let fecha_compra = document.getElementById('fecha_compra').value;

   let compra = {
      id_compra: id_compra,
      nombre_compra: nombre_compra,
      precio_compra: total_compra,
      fecha_compra: fecha_compra,
   }

   fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(compra),//Convertir el objeto _usuario  a un JSON
      headers: { "Content-type": "application/json; charset=UTF-8" }
   })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(json => {
         //alert(json.msg)//Mensaje que retorna la API
         console.log(json)
         if (json.msg == "Inserción exitosa") {
            Swal.fire({
               title: json.msg,
               icon: 'success',
               showCancelButton: false, // Evita que aparezca el botón "Cancelar"
               confirmButtonText: 'OK',
            }).then((result) => {
               if (result.isConfirmed) {
                  // El usuario hizo clic en "OK"
                  window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
               }
            });
         } else {
            Swal.fire({
               title: json.msg,
               icon: 'error',
               showCancelButton: false, // Evita que aparezca el botón "Cancelar"
               confirmButtonText: 'OK',
            }).then((result) => {
               if (result.isConfirmed) {
                  // El usuario hizo clic en "OK"
                  window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
               }
            });
         }
      })
}

const actualizarCompra = async () => {
   let id_compra = document.getElementById('idCompra').value;
   let nombre_compra = document.getElementById('nombreCompra').value;
   let precio_compra = document.getElementById('precioCompra').value;
   let fecha_compra = document.getElementById('fechaCompra').value;

   let compra = {
      id_compra: id_compra,
      nombre_compra: nombre_compra,
      precioCompra: precio_compra,
      fecha_compra: fecha_compra,

   }

   fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(compra),//Convertir el objeto _usuario  a un JSON
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
               window.location.href = 'gestionCompras.html'; // Redireccionar después del clic en OK
            }
         });
      })
}
