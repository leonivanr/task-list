//TODO
// Persistencia.
// Filtro Completados. 


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
    $('.inicio[0]').hide();
    $('.inicio[1]').hide();
    $('.inicio[2]').hide();
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
}

function agregarTarea(e) {
    // validate(ingresoTarea.value)
    //Verificamos si la entrada está vacía.
    if (ingresoTarea.value.length < 2) {
        alert("Por favor, ingrese una tarea.");
    } else {
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
        // Borrar texto ingresado
        ingresoTarea.value = '';
        inicio[0].style.display = 'block';
        inicio[1].style.display = 'block';
        inicio[2].style.display = 'block';
        $('#empty-list').slideUp(600);
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
        }
    }
    // TODO clausula si no hay ningun elemento.
}

function completarTarea(e) {
    if (e.target.parentElement.classList.contains('completar-tarea')) {
        if (confirm('Estás seguro?')) {
            // Elimina el todo el elemento <li>
            e.target.parentElement.parentElement.style.backgroundColor = '#a5d6a7';
            e.target.parentElement.parentElement.style.textDecoration = 'line-through';
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
    $('#empty-list').slideDown(500);
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

function validate(object) {
    console.log(object);

    let hasLength = object.attr('data-length') !== null;
    let lenAttr = parseInt(object.attr('data-length'));
    let len = object[0].value.length;

    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
        if (object.hasClass('validate')) {
            object.removeClass('valid');
            object.removeClass('invalid');
        }
    } else {
        if (object.hasClass('validate')) {
            // Check for character counter attributes
            if (
                (object.is(':valid') && hasLength && len <= lenAttr) ||
                (object.is(':valid') && !hasLength)
            ) {
                object.removeClass('invalid');
                object.addClass('valid');
            } else {
                object.removeClass('valid');
                object.addClass('invalid');
            }
        }
    }
};