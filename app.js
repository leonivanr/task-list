// Definir variables de UI
const form = document.querySelector('#formulario-tarea');
const listaTareas = document.querySelector('#lista-tareas');
const eliminarTodoBtn = document.querySelector('.borrar-tareas');
const filtro = document.querySelector('#filtro');
const ingresoTarea = document.querySelector('#ingreso-tarea');
const card = document.querySelector('.card-action');
const inicio = document.querySelectorAll('.inicio');
const emptyList = document.querySelector('#empty-list');

cargarEventos();

// Cargar todos los eventos de escucha.
function cargarEventos() {
    // Añadir tarea.
    form.addEventListener('submit', agregarTarea);
    // Eliminar tarea.
    listaTareas.addEventListener('click', eliminarTarea);
    // Eliminar todas las tareas de la lista.
    eliminarTodoBtn.addEventListener('click', eliminarTodo);
    //Filtrar tareas.
    filtro.addEventListener('keyup', filtrarTareas);
}

function agregarTarea(e) {
    //Verificamos si la entrada está vacía.
    if (ingresoTarea.value === '') {
        alert("Por favor, ingrese una tarea.");

    }
    // Crear etiqueta <li>
    const li = document.createElement('li');
    // Añadir clase 
    li.className = 'collection-item';
    // Añadir la tarea ingresada al item de la lista
    li.appendChild(document.createTextNode(ingresoTarea.value));
    // Añadir link
    const deleteIcon = document.createElement('a');
    const doneIcon = document.createElement('a');
    // Añadir clase 
    deleteIcon.className = 'eliminar-tarea secondary-content ';
    doneIcon.className = 'eliminar-tarea secondary-content';
    //Añadir icono para eliminar tarea.
    deleteIcon.innerHTML = '<i class="fa fa-trash"></i>';
    doneIcon.innerHTML = '<i class="fa fa-check"></i>';
    //Agregamos el deleteIcon al item.
    li.appendChild(deleteIcon)
    li.appendChild(doneIcon)
    // Agregamos el item a la lista.
    listaTareas.appendChild(li);
    // Borrar texto ingresado
    ingresoTarea.value = '';
    inicio[0].style.display = 'block';
    inicio[1].style.display = 'block';
    inicio[2].style.display = 'block';
    emptyList.style.display = 'none';
    //Prevenimos que se comporte como un form.
    e.preventDefault();
}

function eliminarTarea(e) {
    //Verificamos que al cliquear estemos seleccionando el item de eliminar tarea.
    if (e.target.parentElement.classList.contains('eliminar-tarea')) {
        if (confirm('Estás seguro?')) {
            // Elimina el todo el elemento <li>
            e.target.parentElement.parentElement.remove();
        }
    }
}

function eliminarTodo(e) {
    //1ra manera. 
    // listaTareas.innerHTML = '';
    //2da manera, más rapida.
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
    inicio[0].style.display = 'none';
    inicio[1].style.display = 'none';
    inicio[2].style.display = 'none';
    emptyList.style.display = 'block';
}

function filtrarTareas(e) {
    const textoIngresado = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(tarea => {
        const item = tarea.firstChild.textContent;
        if (item.toLowerCase().indexOf(textoIngresado) != -1) {
            tarea.style.display = 'block';
        } else {
            tarea.style.display = 'none';
        }
    })
}