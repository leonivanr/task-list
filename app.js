
// Definir variables de UI
const form = document.querySelector('#formulario-tarea');
const listaTareas = document.querySelector('#lista-tareas');
const eliminarTodoBtn = document.querySelector('.borrar-tareas');
const filtro = document.querySelector('#filtro');
const ingresoTarea = document.querySelector('#ingreso-tarea');
const card = document.querySelector('.card-action');
const inicio = document.querySelectorAll('.inicio');
const emptyList = document.querySelector('#empty-list');
const date = document.querySelector('#date');
let today = new Date();
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
}

cargarEventos();

// Cargar todos los eventos de escucha.
function cargarEventos() {
    date.innerHTML = today.toLocaleDateString('es-AR', options).toUpperCase();
    // Añadir tarea.
    form.addEventListener('submit', agregarTarea);
    // Eliminar tarea.
    listaTareas.addEventListener('click', eliminarTarea);
    // Eliminar tarea.
    listaTareas.addEventListener('click', completarTarea);
    // Eliminar todas las tareas de la lista.
    eliminarTodoBtn.addEventListener('click', eliminarTodo);
    //Filtrar tareas.
    filtro.addEventListener('keyup', filtrarTareas);
    // Muestro las tareas si están guardadas en la sesión.
    document.addEventListener('DOMContentLoaded', mostrarTareas);
}

function agregarTarea(e) {

    //Verificamos si la entrada está vacía.
    if (ingresoTarea.value.length < 1) {
        alert("Por favor, ingrese una tarea.");
        return;
    } else {
        $('#empty-list').slideUp(350);
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
        doneIcon.className = 'completar-tarea secondary-content';
        //Añadir icono para eliminar tarea.
        deleteIcon.innerHTML = '<i class="fa fa-trash"></i>';
        doneIcon.innerHTML = '<i class="fa fa-check"></i>';
        //Agregamos el deleteIcon al item.
        li.appendChild(deleteIcon)
        li.appendChild(doneIcon)
        // Agregamos el item a la lista.
        listaTareas.appendChild(li);
        // Guardar en la memoria.
        guardarTareaEnLaSesion(ingresoTarea.value);
        // Borrar texto ingresado
        ingresoTarea.value = '';

        //Mostrar boton borrar.
        inicio[0].style.display = 'block';
        inicio[1].style.display = 'block';
        inicio[2].style.display = 'block';

        //Prevenimos que se comporte como un form.
        e.preventDefault();
    }
}

function eliminarTarea(e) {
    //Verificamos que al cliquear estemos seleccionando el item de eliminar tarea.
    if (e.target.parentElement.classList.contains('eliminar-tarea')) {
        if (confirm('Estás seguro?')) {
            // Elimina el todo el elemento <li>
            e.target.parentElement.parentElement.remove();
            // Elimina de la sesion.
            eliminarTareaDeSesion(e.target.parentElement.parentElement);

        }
    }
    // TODO clausula si no hay ningun elemento.
}

function completarTarea(e) {
    if (e.target.parentElement.classList.contains('completar-tarea')) {
        // Elimina el todo el elemento <li>
        e.target.parentElement.parentElement.style.backgroundColor = '#a5d6a7';
        e.target.parentElement.parentElement.style.textDecoration = 'line-through';

    }
}

function eliminarTodo(e) {

    //2da manera, más rapida.
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
    inicio[0].style.display = 'none';
    inicio[1].style.display = 'none';
    inicio[2].style.display = 'none';
    $('#empty-list').slideDown(350);
    eliminarTodoDeSesion();
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

function guardarTareaEnLaSesion(tarea) {
    let tareas;
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function mostrarTareas() {
    let tareas;
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
        $('#empty-list').slideUp(350);
            //Mostrar boton borrar.
    inicio[0].style.display = 'block';
    inicio[1].style.display = 'block';
    inicio[2].style.display = 'block';
    }

    tareas.forEach(tarea => {
        // Crear etiqueta <li>
        const li = document.createElement('li');
        // Añadir clase 
        li.className = 'collection-item';
        // Añadir la tarea ingresada al item de la lista
        li.appendChild(document.createTextNode(tarea));
        // Añadir link
        const deleteIcon = document.createElement('a');
        const doneIcon = document.createElement('a');
        // Añadir clase 
        deleteIcon.className = 'eliminar-tarea secondary-content ';
        doneIcon.className = 'completar-tarea secondary-content';
        //Añadir icono para eliminar tarea.
        deleteIcon.innerHTML = '<i class="fa fa-trash"></i>';
        doneIcon.innerHTML = '<i class="fa fa-check"></i>';
        //Agregamos el deleteIcon al item.
        li.appendChild(deleteIcon)
        li.appendChild(doneIcon)
        // Agregamos el item a la lista.
        listaTareas.appendChild(li);
    })

}

function eliminarTareaDeSesion(tareaItem) {
    let tareas;
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    tareas.forEach((tarea, index) => {
        if (tareaItem.textContent === tarea) {
            tareas.splice(index, 1);

        }
    })
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eliminarTodoDeSesion(){
    localStorage.clear();
}