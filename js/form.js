
let registro = []


const agregar = () => {
  var cedula = document.getElementById('cedula').value
  var nombre = document.getElementById('nombre').value
  var telefono = document.getElementById('telefono').value
  var direccion = document.getElementById('direccion').value
  var correo = document.getElementById('correo').value
  var contraseña = document.getElementById('password').value
  var rol = document.getElementById('categoria_producto').value


  if (cedula == "" || nombre == "" || telefono == "" || direccion == "" || correo == "" || contraseña == ""||rol=="") {
    Swal.fire({
      title: 'Error campos vacios',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }
  else {
    registro.push({
      cedula: document.getElementById('cedula').value,
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      correo: document.getElementById('correo').value,
      contraseña: document.getElementById('password').value,
      rol:document.getElementById('categoria_producto').value


    })

    //alert('Registrado')
    Swal.fire({
      title: ' Usuario Registrado exitosamente',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'success'

    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'gestionUsuario.html';
    });
  }
}



//actualizar Usuario
let actualizar = []

const modificar = () => {
  var nombre = document.getElementById('nombre').value
  var telefono = document.getElementById('telefono').value
  var direccion = document.getElementById('direccion').value
  var correo = document.getElementById('correo').value


  if (nombre == "" || telefono == "" || direccion == "" || correo == "") {
    Swal.fire({
      title: 'Error campos vacios',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }
  else {
    registro.push({
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      correo: document.getElementById('correo').value,


    })

    //alert('Registrado')
    Swal.fire({
      title: ' Usuario actualizado exitosamente',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'success'

    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'gestionUsuario.html';
    });
  }


}

/// registrar compras

let registroCompra = []

const registroCom = () => {
  var idCompra = document.getElementById('idCompra').value
  var nombreCompra = document.getElementById('nombreCompra').value
  var precioCompra = document.getElementById('precioCompra').value
  var fechaCompra = document.getElementById('fechaCompra').value
  




  if (idCompra ==="" || nombreCompra === "" || precioCompra === ""||fechaCompra==="") {
    Swal.fire({
      title: 'Error campos vacios',
      timer:1000,
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  } 
  else {
    registroCompra.push({
      idCompra: document.getElementById('idCompra').value,
      nombreCompra: document.getElementById('nombreCompra').value,
      precioCompra: document.getElementById('precioCompra').value,
      fechaCompra: document.getElementById('fechaCompra').value,


    })

    //alert('Registrado')
    Swal.fire({
      title: ' Registro exitoso',
      text: "¡Información registrada Correctamente!",
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'success'

    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'gestionCompras.html';
    });
  }


}

const CancelarCompra = () => {
  Swal.fire({
    title: 'Cancelar',
    text: "¿Desea cancelar el registro?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#722F37',
    cancelButtonColor: '#E12424',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      closePopup();
    }
  })
}

//Actualizar categoria Productos

let categoria = []

const Productos = () => {
  var InsertNombre = document.getElementById('agregarNombre').value
  if (InsertNombre == "") {
    Swal.fire({
      title: 'Error campos vacios',
      text: "Ingrese nombre",
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }
  else {
    categoria.push({
      InsertNombre: document.getElementById('agregarNombre').value,


    })

    //alert('Registrado')
    Swal.fire({
      title: 'Registro exito',
      text: "¡Categoria actualizada correctamente¡",
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'success'

    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'categoriaProductos.html';
    });
  }


}

//Registrar categoria productos
let RegistrarProduc = []

const RegistProduc = () => {
  var AgregarNombre = document.getElementById('agregarNombre').value

  if (AgregarNombre == "") {
    Swal.fire({
      title: 'Error campos vacios',
      text: "Ingrese nombre",
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }
  else {
    RegistrarProduc.push({
      AgregarNombre: document.getElementById('agregarNombre').value,


    })

    //alert('Registrado')
    Swal.fire({
      title: 'Registro exito',
      text: "¡Categoria registrada correctamente¡",
      width: 600,
      padding: '3em',
      confirmButtonColor: '#722F37',
      icon: 'success'

    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'categoriaProductos.html';
    });
  }


}
