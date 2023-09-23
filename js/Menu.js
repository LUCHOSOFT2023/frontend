$(document).ready(function() {
      $('.module-heading').click(function() {
      // Eliminar la clase 'selected' de todos los encabezados de módulo
      $('.module-heading').not(this).removeClass('selected');
      // Agregar o quitar la clase 'selected' al encabezado de módulo actual
      $(this).toggleClass('selected');
      // Mostrar u ocultar las opciones del módulo actual
      $(this).siblings('.options').toggleClass('active');
      $('.options').not($(this).siblings('.options')).removeClass('active');
    });
  
    $('.options li').click(function(event) {
      // Evitar que el clic en una opción propague hacia el encabezado del módulo
      event.stopPropagation();
      // Eliminar la clase 'selected' de todas las opciones
      $('.options li').not(this).removeClass('selected');
      // Agregar la clase 'selected' a la opción actual
      $(this).toggleClass('selected');
    });
  
    // Cuando se haga clic en cualquier parte del documento, remover la clase 'selected'
    $(document).click(function(event) {
      if (!$(event.target).closest('.module-heading, .options li').length) {
        $('.module-heading, .options li').removeClass('selected');
        // Eliminar la clase 'selected' de todos los encabezados de módulo
        $('.module-heading').not(this).removeClass('selected');
        // Agregar o quitar la clase 'selected' al encabezado de módulo actual
        $(this).toggleClass('selected');
        // Mostrar u ocultar las opciones del módulo actual
        $(this).siblings('.options').toggleClass('active');
        $('.options').not($(this).siblings('.options')).removeClass('active');
        }
    });
  });

  $('.usuario-link').click(function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    window.location.href = window.location.href; // Volver a la misma página
  });

  
  