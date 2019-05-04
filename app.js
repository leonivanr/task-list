// Definir variables de UI
const form = document.querySelector('#formulario-tarea');
const listaTareas = document.querySelector('#lista-tareas');
const borrarTodoBtn = document.querySelector('.borrar-tareas');
const filtro = document.querySelector('#filtro');
const ingresoTarea = document.querySelector('#ingreso-tarea');


cargarEventos();

// Cargar todos los eventos de escucha.
function cargarEventos() {
    // Añadir tarea.
    form.addEventListener('submit', agregarTareas);
}

function agregarTareas(e) {
    //Verificamos si la entrada está vacía.
    if (ingresoTarea.value === '') {
        alert("Por favor, ingrese una tarea.")
    }
    // Crear etiqueta <li>
    const li = document.createElement('li');
    // Añadir clase 
    li.className = 'collection-item';
    // Añadir la tarea ingresada al item de la lista
    li.appendChild(document.createTextNode(ingresoTarea.value));
    // Añadir link
    const link = document.createElement('a');
    // Añadir clase 
    link.className = 'eliminar-tarea secondary-content';
    //Añadir icono para eliminar tarea.
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Agregamos el item a la lista.
    listaTareas.appendChild(li);
    // Borrar texto ingresado
    ingresoTarea.value = '';
    e.preventDefault();
}