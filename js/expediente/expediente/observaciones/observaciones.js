/* Funcion para añadir una observacion */
function annadirObservacion(action, msg){
	var datosOk = comprobarObservaciones();
	if(datosOk == true){
		submitFormActionMsg(document.forms[0], action, null, 'datosObservacion', null);
	} else {
		alert(msg);
	}
}

/* Funcion para modificar una observacion */
function modificarObservacion(action, msg){
	var datosOk = comprobarObservaciones();
	if(datosOk == true){
		submitFormActionMsg(document.forms[0], action, null, 'datosObservacion', null);
	} else {
		alert(msg);
	}    	   
}

/* Funcion para eliminar una observacion */
function eliminarObservacion(action, msg){
	var datosOk = comprobarObservaciones();
	if(datosOk == true){
		submitFormActionMsg(document.forms[0], action, null, 'datosObservacion', null);
	} else {
		alert(msg);
	}    	   
}

/* Funcion para comprobar q los datos son correctos*/
function comprobarObservaciones() {
	var campoObservacion = document.getElementById('txtObservacion').value;
	var datosValidos = false;
	if ((campoObservacion != "")) {
		datosValidos = true;
	}
	return datosValidos;
}

function comprobarObservacionesEliminar() {
	var campoTipoObservacion = document.forms[0].elements['idTipoObservacion'];
	var tipoObservacion = campoTipoObservacion.options[campoTipoObservacion.selectedIndex].text;
	var datosValidos = false;
	if (tipoObservacion != "") {
		datosValidos = true;
	}
	return datosValidos;
}

/* Funcion para observaciones de la poliza, SOLO CONSULTA */    
function consultaObservaciones(objObservacion){
	if(objObservacion == nivelPoliza){
		// se deshabilitan los botones  
		document.getElementById('botonAnadir').disabled = true;
		document.getElementById('botonAnadir').className="boton2Disabled";
		document.getElementById('botonModificar').disabled = true;
		document.getElementById('botonModificar').className="boton2Disabled";
		document.getElementById('botonEliminar').disabled = true;
		document.getElementById('botonEliminar').className="boton2Disabled";
		document.getElementById('botonLimpiar').disabled = true;
		document.getElementById('botonLimpiar').className="boton2Disabled";	  
		
		// se deshabilitan los campos
		document.getElementById('idTipoObservacion').disabled = true;
		document.getElementById('txtObservacion').disabled = true;
	}	  
}