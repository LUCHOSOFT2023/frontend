document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('insertBtn').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const checkbox = rows[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const cells = rows[i].getElementsByTagName('td');
            const dataToInsert = [];
            for (let j = 1; j < cells.length; j++) {
                dataToInsert.push(cells[j].textContent);
            }

            // Aquí podrías realizar la inserción de datos en otra tabla o en cualquier otro lugar
            console.log('Insertar:', dataToInsert);
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

document.getElementById('cancelBtn').addEventListener('click', function() {
    closePopup();
});

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
















document.getElementById('openPopupBtnAAA').addEventListener('click', function() {
    document.getElementById('popupAAA').style.display = 'block';
});

document.getElementById('insertBtnAAA').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const checkbox = rows[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const cells = rows[i].getElementsByTagName('td');
            const dataToInsert = [];
            for (let j = 1; j < cells.length; j++) {
                dataToInsert.push(cells[j].textContent);
            }

            // Aquí podrías realizar la inserción de datos en otra tabla o en cualquier otro lugar
            console.log('Insertar:', dataToInsert);
        }
    }

    document.getElementById('popupAAA').style.display = 'none';
});
//barra de navegacion
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

//boton de cancelar operación

document.getElementById('cancelBtnAAA').addEventListener('click', function() {
    closePopupAAA();
});

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

function closePopupAAA() {
    document.getElementById('popupAAA').style.display = 'none';
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


$(".iClienteFrecuente").click(function () {
    $(this).toggleClass("fa-user-plus fa-user-minus");
    $(this).toggleClass("gris");
});



function seleccionarFila(checkbox) {
    var fila = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
        fila.classList.add('selected');
    } else {
        fila.classList.remove('selected');
    }

    // Deseleccionar otras filas
    var checkboxes = document.getElementsByName('seleccion');
    checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = false;
            cb.parentNode.parentNode.classList.remove('selected');
        }
    });
}




//VALIDACION


const registrar = async()=>{

    

    let idpedido= document.getElementById('idpedido').value;
    let preciopedido = document.getElementById('preciopedido').value
    let fechapedido= document.getElementById('fechapedido').value;
    let descpedido = document.getElementById('descpedido').value
    
    let caracteres = /^[a-zA-Z0-9_.-ñÑ' 'áéíóúÁÉÍÓÚ,]+$/;
    

if (idpedido==="" || preciopedido==="" || fechapedido==="" || descpedido==="") {

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        timer: 3000
    });

} else if (!caracteres.test(descpedido)){

    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese caracteres válidos.',
        timer: 3000
        
    });

}

else {

Swal.fire({
    icon: 'success',
    title: 'El pedido ha sido registrado',
    timer: 4000}).then(() => {window.location.href='pedidos.html'});}}

    

