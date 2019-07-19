/* Funcion para enviar los datos */
function enviarDatos(operacion){
	var validado = true; // validaForm(document.forms(0),validatePerjudicadoPersonaForm,'iAreaTrabajo');
	if(validado && validaTramitador()){
		document.getElementById('operacionApertura').value=operacion;
		muestraCarga();
		submitForm(document.forms(0),null,'iAreaTrabajo');
	}        
}

/*Función que valida si swTramitadorautomatico = no, que hayas introducido un tramitador */
function validaTramitador(){
	if (document.getElementById("perjudicadoPersonaView.swTramitadorAutomatico").value == "0"){
		if (document.getElementById("perjudicadoPersonaView.tramitador.id")){
			if (document.getElementById("perjudicadoPersonaView.tramitador.id").value != ""){
				return true;
			}else{
				alert(msgSeleccionaTramitador);
				document.getElementById("perjudicadoPersonaView.tramitador.id").focus();
				return false;
			}
		}
	}
	return true;
}

function validarActosMedicos(){
	if(hayActosMedicos){
		if (confirm(msgComenzarVal)){
			document.forms[0].action = actionValidarActosMedicos;
			enviarDatos('');
		}
	}else{
		alert(msgSinActos);
	}
}

function desvalidarActosMedicos(){
	if(hayActosMedicos){
		document.forms[0].action = actionDesvalidarActosMedicos;
		enviarDatos('');
	} 
}

function aceptarTodo(){
	document.forms[0].action = actionAceptarTodo;
	muestraCarga();
	submitForm(perjudicadoPersonaReembolsoForm,null,null);
}

function rechazarTodo(){
	document.forms[0].action = actionRechazarTodo;
	muestraCarga();
	submitForm(perjudicadoPersonaReembolsoForm,null,null);
}

function pedirEvaluacionMedica(){
	var valor = lanzarVentana(actionPopupPedirEvaluacion, 570, 200);
	if(valor != null && valor[0] != ''){
		document.forms[0].action = actionPedirEvaluacionMedica;
		setValue('idEvaluador', valor[0]);
		setValue('codEvaluador', valor[1]);
		setValue('desEvaluador', valor[2]);
		setValuePForm('observacionEval', valor[3], 'perjudicadoPersonaReembolsoForm');
		enviarDatos('');
	}
}

function terminarEvaluacionMedica(){
	if (confirm(msgFinalizarApertura)){
		document.forms[0].action = actionTerminarEvaluacionMedica;
		enviarDatos('');
	}
}

function finalizarApertura(){
	if(hayActosMedicos){
		if(hayImporteReembolso){
			if (confirm(msgFinalizarApertura)){
				enviarDatos('siguiente');
			}
		}else{
			if (confirm(msgFinalizarAperturaSinImporte)){
				enviarDatos('siguiente');
			}
		}
	}else{
		alert(msgSinActos);
	}
}