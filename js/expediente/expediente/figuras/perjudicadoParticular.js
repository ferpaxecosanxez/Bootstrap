 /* Funcion para mostrar los campos referentes a los abogados */
function mostrarDatosAbogado(familia){
	var indice = document.getElementById('perjudicadoView.swPrepAbogado').selectedIndex;
	var valor = document.getElementById('perjudicadoView.swPrepAbogado').options[indice].value;
	var mostrar = false;
	
	if (valor == valorSi){
		mostrar=true;
	}
	if (familia=='autos'){
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

/* Funcion para mostrar el arbol */
function mostrarArbolExpediente(idExpediente){
	// se recarga el iframe oculto para que a su vez recarge el arbol
	var pag = "<html:rewrite action='/monitorExpediente/pintarArbol' />";
	pag = pag + '?idExpediente=' + idExpediente;
	top.window.frames['iAgenda'].location = pag; 
}

/* Funcion para cargar los datos del asegurado en el formulario */
function cargarAsegurado(valor){
  if (valor == valorSi){
	retrieveURLWithoutParametersSync(actionAsegurado);
    operacionesOnLoadFigura();
  } else if (valor == valorNo){
    limpiarDatosFormulario(document.forms(0));
  }
  controlBloqueCompaniaAbogadosContrarios();
}

/* funcion para ocultar comañía / abogados contrarios */
function controlBloqueCompaniaAbogadosContrarios() {
	showHide('capaNoAutos', document.getElementById('perjudicadoView.swAsegurado').value==valorNo);
	if (document.getElementById('perjudicadoView.swAsegurado').value == valorSi) {
    	perjudicadoParticularForm['perjudicadoView.aseguradora.id'].selectedIndex = 0;
    	perjudicadoParticularForm['perjudicadoView.aseguradora.id'].onchange();
    	perjudicadoParticularForm['perjudicadoView.aseguradoraNombre'].value = "";
    	perjudicadoParticularForm['perjudicadoView.contrarioPoliza'].value = "";
    	perjudicadoParticularForm['perjudicadoView.contrarioRefExp'].value = "";
    	perjudicadoParticularForm['perjudicadoView.swPrepAbogado'].selectedIndex = 0;
    	perjudicadoParticularForm['perjudicadoView.swPrepAbogado'].onchange();
    	perjudicadoParticularForm['perjudicadoView.nombreAbogado'].value = "";
    	perjudicadoParticularForm['perjudicadoView.tfnoAbogado'].value = "";
    	perjudicadoParticularForm['perjudicadoView.emailAbogado'].value = "";
		if (perjudicadoParticularForm['perjudicadoView.tramitador.id'] != null) {
			perjudicadoParticularForm['perjudicadoView.tramitador.id'].selectedIndex = 0;
		}
	}
}

function mostrarOcultarChecksYRadiosPerjudicado(mostrar){
	if(mostrar == false){
		document.getElementById('perjudicadoView.swConsorciable').checked = false;
		document.getElementById('perjudicadoView.swUrgente').checked = false;
		document.getElementsByName('perjudicadoView.swSiniestroParcial')[0].checked = false;
		document.getElementsByName('perjudicadoView.swSiniestroParcial')[1].value = "0";
		document.getElementsByName('perjudicadoView.swSiniestroTotal')[0].checked = false;
		document.getElementsByName('perjudicadoView.swSiniestroTotal')[1].value = "0";
		perjudicadoParticularForm['perjudicadoView.swSiniestros'].value = "0";
	}
	showHide('siniestroTotal', mostrar);
	showHide('consorciable', mostrar);
	showHide('urgente', mostrar);
	showHide('siniestroParcial', mostrar);
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

function controlChecksPerjudicado(){
	if(document.getElementById('perjudicadoView.swAsegurado') != null){
		if(document.getElementById('perjudicadoView.swAsegurado').value == valorSi){
			mostrarOcultarChecksYRadiosPerjudicado(true);
		} else {
			mostrarOcultarChecksYRadiosPerjudicado(false);
		}
	}
}

/* Funcion para enviar los datos */
function grabar(operacion){
  	
  handlerBlock('cPerjudicado','expandir', true);
  var pag = document.forms(0).action;
  document.getElementById('operacionApertura').value=operacion;
  // continuar con la apertura  
  if (document.getElementById('figuraFormView.razonSocial') != null){		
		document.getElementById('figuraFormView.razonSocial').disabled = false;
  }  
  
  if (operacion=='anterior'){
	muestraCarga();
	document.forms(0).action = actionBotonAnterior;
	document.forms(0).submit();
  } else {
  	document.forms(0).action = accionGrabar;
	if(validaTramitador()){		
	    muestraCarga();
	    submitForm(document.forms(0),null,'iAreaTrabajo');
	}	
  }  
}

function swCiaDisabled(value){
	if (value == ""){
		showHide('textoOtraAseg',true);
		showHide('nombreOtraAseg',true);
	}  else {
		document.getElementById('perjudicadoView.aseguradoraNombre').value = "";
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
		document.getElementById('perjudicadoView.nombreAbogado').value = "";
		document.getElementById('perjudicadoView.tfnoAbogado').value = "";
		document.getElementById('perjudicadoView.emailAbogado').value = "";
		showHide('textoNombre',false);
		showHide('nombreAbogado',false);
		showHide('datosAbogado',false);
	}
}

function controlCheckTiposDannos() {
	if (document.getElementsByName('perjudicadoView.swDanosMobiliarioIndemnizacion')[0].checked) {
 		document.getElementById('perjudicadoView.swSiniestroParcial').checked = false;
		document.getElementById('perjudicadoView.swSiniestroTotal').checked = false;
		document.getElementById('perjudicadoView.swSiniestros').value = "0";
	}
}

function controlCheckTipologia(poCheck) {
	if (poCheck.name == "perjudicadoView.swSiniestroTotal" && poCheck.checked) {
		document.getElementById('perjudicadoView.swSiniestroParcial').checked = false;
		document.getElementById('perjudicadoView.swSiniestros').value = "1";
		document.getElementsByName('perjudicadoView.swDanosMobiliarioIndemnizacion')[0].checked = false;
		document.getElementsByName('perjudicadoView.swDanosMobiliarioIndemnizacion')[1].value = "0";
	} else if (poCheck.name == "perjudicadoView.swSiniestroParcial" && poCheck.checked) {
		document.getElementById('perjudicadoView.swSiniestroTotal').checked = false;
		document.getElementById('perjudicadoView.swSiniestros').value = "2"; 			
		document.getElementsByName('perjudicadoView.swDanosMobiliarioIndemnizacion')[0].checked = false;
		document.getElementsByName('perjudicadoView.swDanosMobiliarioIndemnizacion')[1].value = "0";
	} else {
		document.getElementById('perjudicadoView.swSiniestros').value = "0"; 			
	}

	document.getElementsByName('perjudicadoView.swUrgente')[0].checked = false;
	document.getElementsByName('perjudicadoView.swUrgente')[1].value = "0";
	document.getElementsByName('perjudicadoView.swConsorciable')[0].checked = false;
	document.getElementsByName('perjudicadoView.swConsorciable')[1].value = "0";
}

function mostrarMotivos(){
	var estado = document.getElementById("perjudicadoView.estadoPerjudicado.id").value;
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

function flagTrue(valor){ //
}

/*Función que valida si swTramitadorautomatico = no, que hayas introducido un tramitador */
function validaTramitador(){
	if (document.getElementById('perjudicadoView.swAsegurado').value==valorNo){
		if (document.getElementById("perjudicadoView.swTramitadorAutomatico").value == "0"){
			if (document.getElementById("perjudicadoView.tramitador.id")){
				if (document.getElementById("perjudicadoView.tramitador.id").value != ""){
					return true;
				}else{
					alert(msgSeleccionaTramitador);
					document.getElementById("perjudicadoView.tramitador.id").focus();
					return false;
				}
			}
		}
	}
	return true;
}