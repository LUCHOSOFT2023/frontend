// Esta línea indica que el código dentro de la función se ejecutará una vez que el documento HTML esté completamente cargado y listo.
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

  //cambio de estado-visualización en columna

  function cambiarEstado(icono) {
    // Obtener la celda que muestra el estado
    const celdaEstado = icono.closest("tr").querySelector(".estado");

    // Cambiar el estado y la clase del ícono de alternancia
    if (icono.classList.contains("Habilitado")) {
      icono.classList.remove("Habilitado");
      icono.classList.add("Inhabilitado");
      celdaEstado.textContent = "Inhabilitado"; // Cambiar el estado en la columna
      // Aquí puedes agregar la lógica para realizar acciones cuando se desactiva el toggle
    } else {
      icono.classList.remove("Inhabilitado");
      icono.classList.add("Habilitado");
      celdaEstado.textContent = "Habilitado"; // Cambiar el estado en la columna
      // Aquí puedes agregar la lógica para realizar acciones cuando se activa el toggle
    }
  }