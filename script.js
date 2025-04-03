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
    return `${año}-${mes}-${dia}`;
}

function Tarea(texto, fechaFin) {
    this.texto = texto;
    this.fechaFin = fechaFin;
    this.fechaCreacion = FechaHoy();
    this.estaCompleto = false;
}

const AgregarTarea = (e) => {
    e.preventDefault();
    console.log("Se ingresó a AT");
    let nombreTarea = document.getElementById("nombreTarea").value;
    let fechaFinal = document.getElementById("fechaFinal").value;
    if(HayNombre(nombreTarea) && FechaPosterior(fechaFinal))
    {
        console.log("Hay ambas");
        const todo = new Tarea(nombreTarea, fechaFinal);
        listaTareas.push(todo);
        lista.innerHTML = "";
        listaTareas.forEach((tarea, index) => {
            lista.innerHTML += `<input type="checkbox" id="checkbox-${index}" onclick="CambioDeSeleccion(${index})">`;
            lista.innerHTML += `<p id="texto-${index}">${tarea.texto}</p>`;
            lista.innerHTML += `<p id="fecha-${index}">Creada el ${tarea.fechaCreacion} - Completar antes del ${tarea.fechaFin}</p>`;
        });
        document.getElementById("agregar").reset();
    }
    else if (!HayNombre(nombreTarea))
    {
        console.log("No hay nombre");
        mensajeError.innerText = "Se debe poner un nombre a la tarea";
    }
    else
    {
        console.log("No hay fecha correcta");
        mensajeError.innerText = "Se debe poner una fecha posterior a la actual";
    }
}

const HayNombre = (nombre) => {
    if(nombre !== "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

const FechaPosterior = (fecha) =>{
    if(CompararFechas(fecha))
    {
        return true;
    }
    else
    {
        return false;
    }
}


const CambioDeSeleccion = (index) => {
    const textoTarea = document.getElementById(`texto-${index}`);
    const checkbox = document.getElementById(`checkbox-${index}`);
    const textoFecha = document.getElementById(`fecha-${index}`);
    const fechaFin = listaTareas[index].fechaFin;
    
    if(checkbox.checked) {
        textoTarea.style.textDecoration = 'line-through';
        if(!CompararFechas(fechaFin))
        {
            textoFecha.style.color = 'red';
        }
    } else {
        textoTarea.style.textDecoration = 'none';
    }
}