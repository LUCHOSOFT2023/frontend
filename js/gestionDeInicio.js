function alertaCerrarSesion() {
  Swal.fire({

    title: '¿Estas seguro que deseas cerrar sesión?',
    showDenyButton: true,
    denyButtonText: `Cancelar`,
    confirmButtonText: 'Confirmar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Se ha cerrado la sesión con exito', '', 'success')
    }
  })
}

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

function alertaCerrarSesion() {
  Swal.fire({

    title: '¿Estas seguro que deseas cerrar sesión?',
    showDenyButton: true,
    denyButtonText: `Cancelar`,
    confirmButtonText: 'Confirmar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Se ha cerrado la sesión con exito', '', 'success')
    }
  })
}

function validarActualizarContraseña() {
  // Obtén los valores de los campos de entrada
  let contrasenaAntigua = document.getElementById('contrasenaAntigua').value;
  let contrasenaNueva = document.getElementById('contrasenaNueva').value;
  let confirmarContrasena = document.getElementById('confirmarContrasena').value;

  // Verifica si alguno de los campos está vacío o no cumple con tus criterios de validación
  if (contrasenaAntigua === "" || contrasenaNueva === "" || confirmarContrasena === "") {
    // Utiliza SweetAlert para mostrar una alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos correctamente.',
    });
  } else if (contrasenaNueva.length < 8) {
    // Verifica si la contraseña nueva tiene al menos 8 caracteres
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La contraseña nueva debe tener al menos 8 caracteres.',
    });
  } else if (contrasenaNueva !== confirmarContrasena) {
    // Verifica si la contraseña nueva y la confirmación son diferentes
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La contraseña nueva y la confirmación no coinciden.',
    });
  } else {
    Swal.fire({
      title: 'Se actualizó la contraseña con éxito',
      icon: 'success',
      showCancelButton: false, // Evita que aparezca el botón "Cancelar"
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "OK"
        window.location.href = 'Inicio.html'; // Redireccionar después del clic en OK
      }
    });
  }
}
