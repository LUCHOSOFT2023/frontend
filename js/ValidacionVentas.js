document.addEventListener("DOMContentLoaded", function() {
  const fechaInput = document.getElementById("FechaVenta");
  const fechaActual = new Date().toISOString().split("T")[0];
  fechaInput.min = fechaActual;
});

const CancelarV=()=>{
  Swal.fire({
    title: 'Salir sin guardar',
    text: "¿Quieres cancelar el registro?",
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

const Agregar=()=>{
  var fecha=document.getElementById("FechaVenta").value
  var id=document.getElementById("IdVenta").value
  const rows = dataTable.getElementsByTagName('tr');
  let seleccionada=false
  for (let i = 1; i < rows.length; i++) {
      const checkbox = rows[i].querySelector('input[type="radio"]');
      if(id==0){
        Swal.fire({
          title:'Error',
          text:'Aun no se agregado una identificación',
          confirmButtonColor: '#722F37',
          icon: 'error'
        })
      }
      else if(fecha==""){
          Swal.fire({
              title:'Error',
              text:'Aun no se agregado una fecha',
              confirmButtonColor: '#722F37',
              icon: 'error'
            })
      }else if(checkbox.checked){
          seleccionada=true
          Swal.fire({
            icon: 'success',
            title: 'Guardado exitosamente',
            confirmButtonColor: '#722F37',
          }).then(() => {
              // Redireccionar a una ruta específica
              window.location.href = 'Ventas.html';
            });
      }else if(!seleccionada){
          Swal.fire({
              title: 'Sin elección',
              text: "Necesitas agregar un pedido",
              confirmButtonColor: '#722F37',
              icon: 'warning'
          })
      }
  }

}

function Cancelar(){
  Swal.fire({
      title: 'Salir sin guardar',
      text: "¿Quieres cancelar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#722F37',
      cancelButtonColor: '#E12424',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = 'Ventas.html';
      }
    })
}


