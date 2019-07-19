

function cambiarCapa(select, abierto, cerrado, anulado, reaperturado){
	var indice=select.selectedIndex;
	var valor=select.options[indice].value;

	if (valor == cerrado || valor == anulado){
		showHide('motFinal', true);
		showHide('motReaper', false);
	}else if (valor == abierto || valor == reaperturado){
		showHide('motFinal', false);
		showHide('motReaper', true);
	}
}


function modificarPerjudicadoPersona(){
	document.forms(0).action = actionModificarPerjudicadoPersona;	
	submitForm(document.forms(0),null,'iAreaTrabajo');		
}

function guardarModificacion(){
	if (document.getElementById('perjudicadoPersonaView.condicionLesionado.id') != null){		
		document.getElementById('perjudicadoPersonaView.condicionLesionado.id').disabled = false;
	}
	handlerBlock('figuraPerjudicadoPersona','expandir', true);
	document.forms(0).action = actionGrabar;
	if (document.getElementById('figuraFormView.nombre') != null){		
		document.getElementById('figuraFormView.nombre').disabled = false;
	}	    
	var validado = validaForm(document.forms(0),validatePerjudicadoDecesosForm,'iAreaTrabajo');
	if(validado){
		muestraCarga();
		submitForm(document.forms(0),null,'iAreaTrabajo');
	}      
}

/* Funcion para enviar los datos */
function enviarDatos(operacion){
	
	var pag = document.forms(0).action;
	document.getElementById('operacionApertura').value=operacion;

	// continuar con la apertura	
	if (document.getElementById('figuraFormView.nombre') != null){		
		document.getElementById('figuraFormView.nombre').disabled = false;
	}
	
	if (operacion=='anterior'){
		muestraCarga();
		document.forms(0).action = actionBotonAnterior;
		document.forms(0).submit();
    } else {		
		document.forms(0).action = pag;
  		var validado = validaForm(document.forms(0),validatePerjudicadoDecesosForm,'iAreaTrabajo');
  		if(validado && validaTramitador()){
  			muestraCarga();
  			submitForm(document.forms(0),null,'iAreaTrabajo');
  		}          
    }
	
}


/* Funcion para cargar los datos del asegurado en el formulario */
function cargarAsegurado(valor){
  if (valor == valorSi){
	retrieveURLWithoutParametersSync(actionAsegurado);
    operacionesOnLoadFigura();
  } else if (valor == valorNo){
    limpiarDatosFormulario(document.forms(0));
  }
}

function reloadEstadoMotivo(){   
    retrieveURLParameterSync(actionReloadEstadoMotivo,'perjudicadoDecesosForm','perjudicadoPersonaView.estadoObjeto.id','estadoObjetoAjax'); 
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


function haFallecido(msjFallecido){
	// se actualizan los datos 
	var fecNacimiento = document.getElementById('figuraFormView.fecNacimiento').value;
	var fecMuerte = document.getElementById('perjudicadoPersonaView.fecFallecimiento').value;
	var continuar = true;

	if (fecNacimiento!=''){
		if (compararFechas(fecNacimiento,fecMuerte,0)>0){
			continuar=false;
			document.getElementById('perjudicadoPersonaView.fecFallecimiento').value='';
			alert(msjFallecido);
		}
	}
}