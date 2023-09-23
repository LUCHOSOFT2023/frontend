function Agregar1(){
    var nombre=document.getElementById("NombreCategoria").value

    if(nombre==""){
        Swal.fire({
            title:'Error',
            text:'Aun no se agregado una categoría',
            confirmButtonColor: '#722F37',
            icon: 'error'
        })
    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Guardado exitosamente'
        }).then(() => {
            // Redireccionar a una ruta específica
            window.location.href = 'CategoriaInsumos.html';
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
            window.location.href = 'CategoriaInsumos.html';
        }
    })
}

function Agregar(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })
        Toast.fire({
        icon: 'success',
        title: 'Se ha actualizado correctamente'
    }).then(() => {
        // Redireccionar a una ruta específica
        window.location.href = 'CategoriaInsumos.html';
    });
}