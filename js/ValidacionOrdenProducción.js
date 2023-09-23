console.log("Archivo vinculado")
document.addEventListener("DOMContentLoaded", function() {
    const fechaInput = document.getElementById("FechaOrden");
    const fechaActual = new Date().toISOString().split("T")[0];
    fechaInput.min = fechaActual;
});



const Agregar=()=>{
  var cantidad = document.getElementById("cantidad").value
  var eleccion= document.getElementById("eleccion").value

  if(cantidad =="" || eleccion==""){
    Swal.fire({
      title: 'Sin elección',
      text: "Necesitas agregar una cantidad y seleccionar un insumo",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }else if(cantidad==0){
    Swal.fire({
      title: 'Error',
      text: "Necesitas agregar una cantidad",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }
}

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

function Registrar(){
  var fecha=document.getElementById("FechaOrden").value
  var cantidad = document.getElementById("cantidad").value
  var eleccion= document.getElementById("eleccion").value
  var id=document.getElementById("IdOrdenProd").value
  if(id==0){
    Swal.fire({
      title:'Error',
      text:'Aun no se agregado una Indentificación',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }
  else if (fecha==""){
    Swal.fire({
      title:'Error',
      text:'Aun no se agregado una fecha',
      confirmButtonColor: '#722F37',
      icon: 'error'
    })
  }else if( cantidad =="" || eleccion==""){
    Swal.fire({
      title: 'Sin elección',
      text: "Necesitas agregar una cantidad y/o seleccionar un insumo",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }
  else{
    Swal.fire({
      icon: 'success',
      title: 'Guardado exitosamente',
      confirmButtonColor: '#722F37',
    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'OrdenProduccion.html';
    });
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
          window.location.href = 'OrdenProduccion.html';
      }
    })
}


  
  