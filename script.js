let listaTareas = [];
const mensajeError = document.getElementById("mensajeError").value;
const lista = document.getElementById("lista");

const FechaHoy = () => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    return hoy;
}

const Tarea = (texto, fechaFin) => {
    this.texto = texto;
    this.fechaFin = fechaFin.toDateString();
    this.fechaCreacion = FechaHoy().toDateString();
}

const AgregarTarea = (e) => {
    console.log("Se ingresó a AT");
    const nombreTarea = document.getElementById("nombreTarea").value;
    const fechaFinal = document.getElementById("fechaFinal").value;
    if(HayNombre(nombreTarea) && FechaPosterior(fechaFinal))
    {
        console.log("Hay ambas");
        listaTareas.push(Tarea(nombreTarea, fechaFinal));
        listaTareas.forEach(tarea => {
            console.log("Foreach");
            lista.innerHTML += `<p>${tarea.texto}</p>`;
            lista.innerHTML += `<p>${tarea.fechaFin}</p>`;
        });
    }
    else if (!HayNombre(nombreTarea))
    {
        console.log("No hay nombre");
        e.PreventDefault();
        mensajeError.innerText = "Se debe poner un nombre a la tarea";
    }
    else
    {
        console.log("No hay fecha correcta");
        e.PreventDefault();
        mensajeError.innerText = "Se debe poner una fecha posterior a la actual";
    }
}

const HayNombre = (nombre) => {
    if(nombre !== undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
}

const FechaPosterior = (fecha) =>{
    if(fecha.toDateString() > FechaHoy().toDateString())
    {
        return true;
    }
    else
    {
        return false;
    }
}