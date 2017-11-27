$("#panel").panel();
$("#panel").enhanceWithin();
$("#btnIngresar").click(agregarTarea);
$("#btnMostrarTareas").click(mostrarTareasLista);
$("#btnEliminar").click(recivoDemostrarDetalleTarea);

var miDetalle1;

/*
 * Listar Tareas.
 */

function mostrarTareas() {

    $("#pTareaAgregadaLista").empty();
    $("#txtTareaNombre").val("");
    $("#txtTareaDescripcion").val("");

    $.ajax({
        url: "https://gestortareaserver.herokuapp.com/gestiontareas",
        method: "GET",
        dataType: 'json',
        data: {

        },
        success: mostrarTareas1, mostrarMensaje,
        error: mostrarError
    });


}

function mostrarTareasLista() {

    $.ajax({
        url: "https://gestortareaserver.herokuapp.com/gestiontareas",
        method: "GET",
        dataType: 'json',
        data: {

        },
        success: mostrarTareasListar, mostrarMensaje,
        error: mostrarError
    });


}

function mostrarTareas1(misDatos) {

    $("#pTareaAgregadaAgregar").empty();

    console.log("Estoy en mostrarTareas1");

    for (var i = 0; i < misDatos.length; i++) {

        $("#pTareaAgregadaAgregar").append("<h2 data-id='" + misDatos[i]._id + "'> " + misDatos[i].nombre + "</h2><hr>");

        console.log(misDatos[i]._id);
        console.log(misDatos[i].nombre);
    }
    console.log("Estoy en mostrarTareas1 despues del for");

    $("#pTareaAgregadaAgregar h2").click(detalleTarea);
    $(":mobile-pagecontainer").pagecontainer("change", "#pAgregarTarea");

}

function mostrarTareasListar(misDatos) {

    $("#pTareaAgregadaLista").empty();

    console.log("Estoy en mostrarTareasListar");

    for (var i = 0; i < misDatos.length; i++) {

        $("#pTareaAgregadaLista").append("<h2 data-id='" + misDatos[i]._id + "'> " + misDatos[i].nombre + "</h2><hr>");

        console.log(misDatos[i]._id);
        console.log(misDatos[i].nombre);
    }
    console.log("Estoy en mostrarTareasLista despues del for");

    $("#pTareaAgregadaLista h2").click(detalleTarea);
    $(":mobile-pagecontainer").pagecontainer("change", "#pListarTareas");

}

function detalleTarea() {
    var miId = $(this).attr("data-id");

    console.log("detalleTarea id de la tarea: " + miId);

    $.ajax({
        url: "https://gestortareaserver.herokuapp.com/gestiontareas/" + miId,
        method: "GET",
        dataType: "json",
        success: mostrarDetalleTarea,
        error: mostrarError

    });

}


function mostrarDetalleTarea(miDetalle) {


    $("#pTareaDetallada").empty();

    console.log("mostrarDetalleTarea : " + miDetalle._id);
    console.log("mostrarDetalleTarea : " + miDetalle.nombre);
    console.log("mostrarDetalleTarea : " + miDetalle.descripcion);

    $("#pTareaDetallada").append("<h2 data-id='" + miDetalle._id + "'> " + miDetalle.nombre + "</h2>"
            + miDetalle.descripcion + "<hr>");

    $(":mobile-pagecontainer").pagecontainer("change", "#pListarTareasDetalladas");

    console.log("Estoy en mostrarDetalleTarea");

    miDetalle1 = miDetalle;

    console.log("miDetalle1: " + miDetalle1._id);
}



/*
 * Agregar Tarea.
 */

function agregarTarea() {


    if ($("#txtTareaNombre").val && $("#txtTareaDescripcion").val !== "") {

        $.ajax({
            url: "https://gestortareaserver.herokuapp.com/gestiontareas",
            method: "POST",
            dataType: 'json',
            data: {
                nombreTarea: $("#txtTareaNombre").val(),
                descripcionTarea: $("#txtTareaDescripcion").val()
            },
            success: mostrarTareas, mostrarMensaje,
            error: mostrarError
        });


    }

}


/*
 * Modificar Tarea.
 */
function modificarTarea() {

}


/*
 * Eliminar Tarea.
 */


function recivoDemostrarDetalleTarea() {


    console.log("Estoy en recivoDemostrarDetalleTarea esto es lo que tengo : " + miDetalle1._id);


    $("#btnEliminar").on({

        click: eliminarTarea(miDetalle1._id)

    });

}


function eliminarTarea(miDetalleelim) {


    console.log("Este es el id en eliminarTarea: " + miDetalleelim);

    $.ajax({
        url: "https://gestortareaserver.herokuapp.com/gestiontareas/" + miDetalleelim,
        method: "DELETE",
        dataType: 'json',
        data: {

        },
        success: mostrarTareasLista,
        error: mostrarError
    });
}

/*
 * Mensajes que se muestran por consola o en un alert.
 */
function mostrarMensaje() {
    alert("Estoy en success de agregar tarea");
}

function mostrarMensajeElim() {
    alert("Tarea eliminada");
}

function mostrarError(_e) {

    console.log(_e);
}