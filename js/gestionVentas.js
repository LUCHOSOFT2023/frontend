document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('insertBtn').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');
    let seleccionada=false

    for (let i = 1; i < rows.length; i++) {
        const checkbox = rows[i].querySelector('input[type="radio"]');
        if (checkbox.checked) {
            seleccionada=true
            const cells = rows[i].getElementsByTagName('td');
            const dataToInsert = [];
            for (let j = 1; j < cells.length; j++) {
                dataToInsert.push(cells[j].textContent);
            }

            // Aquí podrías realizar la inserción de datos en otra tabla o en cualquier otro lugar
            console.log('Insertar:', dataToInsert);
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
                title: 'Agregado exitosamente'
            })
        }
        else if(!seleccionada){
            Swal.fire({
                title: 'No has seleccionado un pedido',
                icon: 'error',
                confirmButtonColor: '#722F37'
            })
        }
    }

    document.getElementById('popup').style.display = 'none';
});
//barra de navegacion
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const rowId = row.id.toLowerCase();
        row.style.display = rowId.includes(searchTerm) ? 'table-row' : 'none';
    }
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

//boton de cancelar operación

/*document.getElementById('cancelBtn').addEventListener('click', function() {
    closePopup();
});*/

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatch = false;
        for (let j = 1; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                rowMatch = true;
                break;
            }
        }
        rows[i].style.display = rowMatch ? 'table-row' : 'none';
    }
});

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Calcula el ancho de la barra de desplazamiento y ajusta los estilos
window.addEventListener('DOMContentLoaded', () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        .scrollbar::-webkit-scrollbar {
            width: ${scrollbarWidth}px;
        }
    `;
    document.head.appendChild(scrollbarStyle);
});

//filtrar fecha movil

// Esta es la función que formatea la fecha
function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anioCompleto = fecha.getFullYear().toString();
    const anioAbreviado = anioCompleto.slice(-2);

    return `${dia}/${mes}/${anioCompleto}`;
}

// Esta es la función que ordena y actualiza la tabla
function filtrarTablaPorFecha() {
    const selectElement = document.getElementById("filtrar");
    const tabla = document.getElementById("tablaInsumos").getElementsByTagName("tbody")[0];
    const filas = Array.from(tabla.getElementsByTagName("tr"));

    selectElement.addEventListener("change", function() {
        const selectedValue = selectElement.value;

        // Función para comparar dos fechas y ordenar las filas
        function compararFechas(a, b) {
            const fechaA = new Date(a.querySelector("td:nth-child(4)").textContent);
            const fechaB = new Date(b.querySelector("td:nth-child(4)").textContent);

            if (selectedValue === "Fecha-reciente") {
                return fechaB - fechaA; // Ordenar de la más nueva a la más antigua
            } else if (selectedValue === "Fecha-antigua") {
                return fechaA - fechaB; // Ordenar de la más antigua a la más nueva
            }
        }

        // Ordenar las filas
        filas.sort(compararFechas);

        // Actualizar la tabla con las filas ordenadas
        filas.forEach(fila => {
            tabla.appendChild(fila);
        });
    });
}

// Llama a la función para que se ejecute al cargar la página
window.onload = function() {
    filtrarTablaPorFecha();
};

// Ejemplo de uso de formatearFecha
const fechaActual = new Date();
const fechaFormateada = formatearFecha(fechaActual);

//filtarr

function filtrarPorFechasSeparadas() {
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const fechaFin = new Date(document.getElementById("fechaFin").value);

    console.log("Fecha de inicio seleccionada:", fechaInicio);
    console.log("Fecha de finalización seleccionada:", fechaFin);

    // Filtra los datos de la tabla según el rango de fechas
    const filas = document.getElementById("tabla3").querySelectorAll("tbody tr");

    filas.forEach((fila) => {
        const fecha = new Date(fila.cells[3].textContent); // La columna 3 contiene la fecha
        if (fecha >= fechaInicio && fecha <= fechaFin) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}

//PDFS

function generarPDF() {
    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Obtener la tabla filtrada por fechas
    const tabla = document.getElementById("tabla3");

    // Crear un array para almacenar los datos de la tabla
    const data = [];

    // Agregar las filas de la tabla al array
    tabla.querySelectorAll("tbody tr").forEach((fila) => {
        data.push([
            fila.cells[0].textContent, // ID
            fila.cells[1].textContent, // Descripción
            fila.cells[2].textContent, // Precio
            fila.cells[3].textContent, // Fecha
            fila.cells[4].textContent, // Pedido
        ]);
    });

    // Definir las columnas para el archivo PDF
    const columns = [
        { title: "ID", dataKey: "id" },
        { title: "Descripción", dataKey: "descripcion" },
        { title: "Precio", dataKey: "precio" },
        { title: "Fecha", dataKey: "fecha" },
        { title: "Pedido", dataKey: "pedido" },
    ];

    // Crear el objeto de la tabla en el archivo PDF
    doc.autoTable({
        head: [columns],
        body: data,
    });

    // Obtener la fecha actual para el nombre del archivo PDF
    const fechaActual = new Date().toISOString().slice(0, 10);

    // Generar un nombre de archivo único
    const nombreArchivo = `reporte_${fechaActual}.pdf`;

    // Guardar el archivo PDF
    doc.save(nombreArchivo);
}

//visualizar habiliatado en la tabla
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