let listaTareas = [];
let mensajeError = document.getElementById("mensajeError");
let lista = document.getElementById("lista");

const CompararFechas = (fechaSeleccionada) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaSeleccionada);
    fecha.setHours(0, 0, 0, 0);
    return hoy.getTime() < fecha.getTime();
}

const FechaHoy = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    return `${año}-${mes}-${dia}T${horas}:${minutos}`;
}

function Tarea(texto, fechaFin) {
    this.texto = texto;
    this.fechaFin = fechaFin;
    this.fechaCreacion = FechaHoy();
    this.estaCompleto = false;
    this.fechaCompletado = null;
    this.tiempoTranscurrido = null;
}

const AgregarTarea = (e) => {
    e.preventDefault();
    let nombreTarea = document.getElementById("nombreTarea").value;
    let fechaFinal = document.getElementById("fechaFinal").value;
    if (HayNombre(nombreTarea) && FechaPosterior(fechaFinal)) {
        const todo = new Tarea(nombreTarea, fechaFinal);
        listaTareas.push(todo);
        renderizarListaTareas();
        document.getElementById("agregar").reset();
        mensajeError.innerText = "";
    } else if (!HayNombre(nombreTarea)) {
        mensajeError.innerText = "Se debe poner un nombre a la tarea";
    } else {
        mensajeError.innerText = "Se debe poner una fecha posterior a la actual";
    }
}

const BorrarTarea = (index) => {
    listaTareas.splice(index, 1);
    renderizarListaTareas();
}

const renderizarListaTareas = () => {
    lista.innerHTML = "";
    listaTareas.forEach((tarea, index) => {
        lista.innerHTML += `
            <li class="tarea">
                <input type="checkbox" id="checkbox-${index}" ${tarea.estaCompleto ? 'checked' : ''} onclick="CambioDeSeleccion(${index})">
                <p id="texto-${index}" style="text-decoration: ${tarea.estaCompleto ? 'line-through' : 'none'}">${tarea.texto}</p>
                <p id="fecha-${index}">Creada el ${tarea.fechaCreacion} - Completar antes del ${tarea.fechaFin}</p>
                <button class="boton-borrar" onclick="BorrarTarea(${index})">Borrar</button>
                <p id="completado-${index}">${tarea.estaCompleto ? `Completada en ${tarea.tiempoTranscurrido}` : ''}</p>
            </li>
        `;
    });
}

const HayNombre = (nombre) => {
    return nombre !== "";
}

const FechaPosterior = (fecha) => {
    return CompararFechas(fecha);
}

const CambioDeSeleccion = (index) => {
    const textoTarea = document.getElementById(`texto-${index}`);
    const checkbox = document.getElementById(`checkbox-${index}`);
    const textoFecha = document.getElementById(`fecha-${index}`);
    const completadoTexto = document.getElementById(`completado-${index}`);
    const fechaFin = listaTareas[index].fechaFin;
    
    if (checkbox.checked) {
        textoTarea.style.textDecoration = 'line-through';
        if (!CompararFechas(fechaFin)) {
            textoFecha.style.color = 'red';
        } else {
            textoFecha.style.color = 'green';
        }
        
        const tarea = listaTareas[index];
        tarea.estaCompleto = true;
        tarea.fechaCompletado = new Date();
        tarea.tiempoTranscurrido = calcularTiempoTranscurrido(tarea.fechaCreacion, tarea.fechaCompletado);
        completadoTexto.innerText = `Completada en ${tarea.tiempoTranscurrido}`;
    } else {
        textoTarea.style.textDecoration = 'none';
        textoFecha.style.color = 'initial';
        completadoTexto.innerText = '';
        listaTareas[index].estaCompleto = false;
    }
}

const calcularTiempoTranscurrido = (fechaCreacion, fechaCompletado) => {
    const fechaCreacionDate = new Date(fechaCreacion);
    const diferencia = fechaCompletado - fechaCreacionDate;
    const horas = Math.floor(diferencia / 3600000);
    const minutos = Math.floor((diferencia % 3600000) / 60000);
    return `${horas} horas y ${minutos} minutos`;
}

const VerTodoMasRapido = () => {
    const tareaMasRapida = listaTareas.filter(tarea => tarea.estaCompleto).sort((a, b) => a.tiempoTranscurrido - b.tiempoTranscurrido)[0];
    
    if (tareaMasRapida) {
        alert(`El TODO completado más rápido fue: "${tareaMasRapida.texto}" en ${tareaMasRapida.tiempoTranscurrido}`);
    } else {
        alert("No hay tareas completadas aún.");
    }
}