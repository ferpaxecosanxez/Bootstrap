/* Funcion para informar q la psn sntro ha fallecido */
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

/* Función que habilita o deshabilita el combo relacionado con en función de lo que se elija en la 
  condición del lesionado */
function deshabilitarComboVehiculo(idPeaton, idCondAseg, idOcupAseg, idCondVehCont, idOcupCont){ 

	var idComboCondicion = document.getElementById('perjudicadoPersonaView.condicionLesionado.id').value;
	var hiddenIdRelacionVehiculo = document.getElementById('idRelacionVehiculo');
	var selectPerjudicadoVehiculoView = document.getElementById('perjudicadoVehiculoView.id');

	if (idComboCondicion == idPeaton){
		selectPerjudicadoVehiculoView.disabled = true;
		selectPerjudicadoVehiculoView.value = "";
		hiddenIdRelacionVehiculo.value = "";
		limpiarDatosFormulario(document.forms(0));
	} else {
		selectPerjudicadoVehiculoView.disabled = false;
		if (idComboCondicion == idCondAseg || idComboCondicion == idOcupAseg) {
			retrieveURLWithoutParametersSync(actionConductorAsegurado+"?perjudicadoPersonaView.condicionLesionado.id="+idComboCondicion); 
			operacionesOnLoadFigura();
			selectPerjudicadoVehiculoView.selectedIndex = 1;
			selectPerjudicadoVehiculoView.disabled = true;
			if (idComboCondicion == idOcupAseg){
				limpiarDatosFormulario(document.forms(0));
			}
		} else if (idComboCondicion == idCondVehCont || idComboCondicion == idOcupCont) {
			if (selectPerjudicadoVehiculoView.options.lenght == 2){
				selectPerjudicadoVehiculoView.selectedIndex = 2;
				selectPerjudicadoVehiculoView.disabled = true;
			}
			retrieveURLWithoutParametersSync(actionConductorContrario+"?perjudicadoPersonaView.condicionLesionado.id="+idComboCondicion);
			operacionesOnLoadFigura();
			if (idComboCondicion == idOcupCont){
				limpiarDatosFormulario(document.forms(0));
			}
		}
		if (idComboCondicion == ''){
			selectPerjudicadoVehiculoView.value = "";
			hiddenIdRelacionVehiculo.value = "";
		}
	}
}

/* Función que carga los datos de un conductor contrario*/
function cargarConductorContrario(idCondVehCont, select){
	var indiceVehiculo = select.selectedIndex;
	var valor = (document.getElementById('perjudicadoVehiculoView.id')).options[indiceVehiculo].value;
	var indice = document.getElementById('perjudicadoPersonaView.condicionLesionado.id').selectedIndex;
	var condicion = document.getElementById('perjudicadoPersonaView.condicionLesionado.id').options[indice].value;		

	if (condicion == idCondVehCont){
		retrieveURLWithoutParametersSync(actionConductorContrario + "?idRelacionVehiculo=" + valor); 
		operacionesOnLoadFigura();
		document.getElementById('perjudicadoVehiculoView.id').options[indiceVehiculo].selected = true;
	}
}

function cambiarFallecido(){
	/* ReadOnly o diabled*/
	var swFallecido = document.getElementById('swFallecido');
	if (swFallecido != null && swFallecido != undefined){
		if (swFallecido.value == 1){
			if (document.getElementById('fechaFallecimiento')!= null){					
				document.getElementById('fechaFallecimiento').disabled = false;
			}
			if (document.getElementById('fechaFallecimientoValor')!= null){
				document.getElementById('fechaFallecimientoValor').disabled = false;
			}
			if (document.getElementById('fechaFallecimientoImagen')!= null){
				document.getElementById('fechaFallecimientoImagen').disabled = false;
			}
			if (document.getElementById('tipoIncapacidadValor')!= null){
				document.getElementById('tipoIncapacidadValor').value = '';
			}
			if (document.getElementById('estadoIncapacidadValor')!= null){
				document.getElementById('estadoIncapacidadValor').value = '';
			}
			if (document.getElementById('tipoIncapacidadCombo')!= null){
				document.getElementById('tipoIncapacidadCombo').selectedIndex = 0;
			}
			if (document.getElementById('tipoIncapacidadCombo')!= null){
				document.getElementById('tipoIncapacidadCombo').disabled = true;
			}
			if (document.getElementById('estadoIncapacidadCombo')!= null){
				document.getElementById('estadoIncapacidadCombo').selectedIndex = 0;
			}
			if (document.getElementById('estadoIncapacidadCombo')!= null){
				document.getElementById('estadoIncapacidadCombo').disabled = true;
			}
		}else{		  		
			if (document.getElementById('fechaFallecimiento') != null){
				document.getElementById('fechaFallecimiento').value = '';
				document.getElementById('fechaFallecimiento').disabled = true;
			}
			if (document.getElementById('fechaFallecimientoValor') != null){
				document.getElementById('fechaFallecimientoValor').disabled = true;
			}
			if (document.getElementById('fechaFallecimientoImagen') != null){
				document.getElementById('fechaFallecimientoImagen').disabled = true;
			}
			if (document.getElementById('tipoIncapacidadCombo') != null){
				document.getElementById('tipoIncapacidadCombo').disabled = false;
			}
			if (document.getElementById('estadoIncapacidadCombo') != null){
				document.getElementById('estadoIncapacidadCombo').disabled = false;
			}
		}
	}
}

/* Funcion para mostrar los campos referentes a los abogados */
function mostrarDatosAbogado(){
	var indice = document.getElementById('perjudicadoPersonaView.swReprAbogado').selectedIndex;
	var valor = document.getElementById('perjudicadoPersonaView.swReprAbogado').options[indice].value;
	var mostrar = false;

	if (valor == 1){
		mostrar=true;
	}

	if (document.getElementById('familiaAutos').value==familiaProdAutos){
		if (mostrar==true){
			showHide('cTNAbogado',true);
			showHide('cNAbogado',true);
			showHide('cTTAbogado',true);
			showHide('cTAbogado',true);
		}else{
			showHide('cTNAbogado',false);
			showHide('cNAbogado',false);
			showHide('cTTAbogado',false);
			showHide('cTAbogado',false);
		}
	}else {
		if (mostrar==true){
			showHide('noAutosTNAbogado',true);
			showHide('noAutosNAbogado',true);
			showHide('noAutosTTAbogado',true);
			showHide('noAutosTAbogado',true);
		}else {
			showHide('noAutosTNAbogado',false);
			showHide('noAutosNAbogado',false);
			showHide('noAutosTTAbogado',false);
			showHide('noAutosTAbogado',false);
		}
	}
}

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
	var validado = validaForm(document.forms(0),validatePerjudicadoPersonaParticularForm,'iAreaTrabajo');
	if(validado){
		muestraCarga();
		submitForm(document.forms(0),null,'iAreaTrabajo');
	}      
}

/* Funcion para enviar los datos */
function enviarDatos(operacion){
	if (document.getElementById('perjudicadoPersonaView.condicionLesionado.id') != null){		
		document.getElementById('perjudicadoPersonaView.condicionLesionado.id').disabled = false;
	}
	handlerBlock('figuraPerjudicadoPersona','expandir', true);
	var pag = document.forms(0).action;
	document.getElementById('operacionApertura').value=operacion;

	if (document.getElementById('perjudicadoVehiculoView.id')!=null){
		var indiceVehiculo = document.getElementById('perjudicadoVehiculoView.id').selectedIndex;

		if (indiceVehiculo != -1){
			var valor = document.getElementById('perjudicadoVehiculoView.id').options[indiceVehiculo].value;
		} else {
			var valor = "";
		}
		document.getElementById('idRelacionVehiculo').value = valor; 
	}

	// continuar con la apertura
	document.forms(0).action = pag;
	if (document.getElementById('figuraFormView.nombre') != null){		
		document.getElementById('figuraFormView.nombre').disabled = false;
	}
	
	if (operacion=='anterior'){
		muestraCarga();
		document.forms(0).action = actionBotonAnterior;
		document.forms(0).submit();
	} else {
		var validado = validaForm(document.forms(0),validatePerjudicadoPersonaParticularForm,'iAreaTrabajo');
		if(validado && validaTramitador()){
			muestraCarga();
			submitForm(document.forms(0),null,'iAreaTrabajo');
		}
	}	        
}

function cambiosPeaton(){
	if (swPeaton == valorSi){
		document.getElementById('perjudicadoPersonaView.condicionLesionado.id').value = idPeaton;
		document.getElementById('perjudicadoPersonaView.condicionLesionado.id').disabled = true;
		//La siguiente linea ya no es necesaria, la jsp no pinta este elemento si se trata de un peaton
		//document.getElementById('perjudicadoVehiculoView.id').disabled = true;
	}
}

function ocultarMostrarEnlaces(){	
	if (idObjeto != null && idObjeto > 0){
		document.getElementById('barraOperaciones').style.display = 'block';
		document.getElementById('barraEnlaces').style.display = 'block';
	} else {
		document.getElementById('barraOperaciones').style.display = 'none';
		document.getElementById('barraEnlaces').style.display = 'none';
	}
}

function swCiaDisabled(value){
	if (value == ""){
		showHide('textoOtraAseg',true);
		showHide('nombreOtraAseg',true);
	}  else {
		document.getElementById('perjudicadoPersonaView.aseguradoraNombre').value = "";
		showHide('textoOtraAseg',false);
		showHide('nombreOtraAseg',false);
	}
}
	
function ocultarMostrarAbogado(value){
	if (value == "1"){
		showHide('textoNombre',true);
		showHide('nombreAbogado',true);
		showHide('datosAbogado',true);
	}  else {
		document.getElementById('perjudicadoPersonaView.nombreAbogado').value = "";
		document.getElementById('perjudicadoPersonaView.tlfnAbogado').value = "";
		document.getElementById('perjudicadoPersonaView.emailAbogado').value = "";
		showHide('textoNombre',false);
		showHide('nombreAbogado',false);
		showHide('datosAbogado',false);
	}
}

function ocultarMostrarTipoLesionado(value){
	if (value == valorNo){
		showHide('tipoLesionado',true);
	}  else {
		document.getElementById('perjudicadoPersonaView.tipoLesionado.id').value = "";
		showHide('tipoLesionado',false);
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
    retrieveURLParameterSync(actionReloadEstadoMotivo,'perjudicadoPersonaParticularForm','perjudicadoPersonaView.estadoObjeto.id','estadoObjetoAjax'); 
}

function mostrarMotivos(){
	var estado = document.getElementById("perjudicadoPersonaView.estadoObjeto.id").value;
	if(estado == abierto){
		document.getElementById('columnaMotivo').style.display = 'none';
		document.getElementById('motFinal').style.display = 'none';
		document.getElementById('motReaper').style.display = 'none';
	}else if(estado == cerrado || estado == anulado){
        document.getElementById('columnaMotivo').style.display = 'block';
        document.getElementById('motFinal').style.display = 'block';
        document.getElementById('motReaper').style.display = 'none';
	}else if(estado == reaperturado){
		document.getElementById('columnaMotivo').style.display = 'block';
		document.getElementById('motFinal').style.display = 'none';
		document.getElementById('motReaper').style.display = 'block';
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
