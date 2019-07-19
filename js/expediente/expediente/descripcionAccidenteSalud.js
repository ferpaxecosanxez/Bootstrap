/* Funcion para mostrar el arbol */
function mostrarArbolExpediente(){
  // se recarga el iframe oculto para que a su vez recarge el arbol
  top.window.frames['iAgenda'].location = accionPintarArbol; 
}

function enviarDatos(boton){ 
  var validado = true; // validaForm(document.forms(0),validateRiesgoParticularSntroForm,'iAreaTrabajo');

  if(validado){ // && validaTramitador()){
    document.getElementById('operacionApertura').value = boton;    
    document.forms[0].action=accionGrabar;
    muestraCarga();
    document.forms[0].submit();       
  }
}

function modificar(accion, operacion){
  document.forms(0).action = accion;
  if (operacion != null) {
    document.getElementById('operacionApertura').value = operacion;    
  }
  muestraCarga();
  submitForm(document.forms(0),null,'iAreaTrabajo');
}

/*Función que valida si swTramitadorautomatico = no, que hayas introducido un tramitador */
function validaTramitador(){
	if (document.getElementById("sntroRgoSaludView.swTramitadorAutomatico").value == "0"){
		if (document.getElementById("sntroRgoSaludView.tramitador.id")){
			if (document.getElementById("sntroRgoSaludView.tramitador.id").value != ""){
				return true;
			}else{
				alert(msgSeleccionaTramitador);
				document.getElementById("sntroRgoSaludView.tramitador.id").focus();
				return false;
			}
		}
	}
	return true;
}

function mostrarOcultarOtroPerceptor(chequeado){
	if(!chequeado){
		document.getElementById("filaOtraCuenta1").className = "";
		document.getElementById("filaOtraCuenta2").className = "";
		document.getElementById("cuentaTomadorIBAN").disabled = "true";
		document.getElementById("cuentaTomadorCCC").disabled = "true";
	} else {
		document.getElementById("filaOtraCuenta1").className = "oculta";
		document.getElementById("filaOtraCuenta2").className = "oculta";
		document.getElementById("cuentaTomadorIBAN").disabled = "";
		document.getElementById("cuentaTomadorCCC").disabled = "";
		vaciarCamposOtroPerceptor();
	}
}

function vaciarCamposOtroPerceptor(){
	setValue('idPersonaPerceptor', '');
	setValue('nombreOtroPerceptor', '');
	setValue('docIdentOtroPerceptor', '');
	
	setValue('idCtaBancoPerceptor', '');
	setValue('codIbanOtroPerceptor', '');
	setValue('codBancoOtroPerceptor', '');
	setValue('codSucursalOtroPerceptor', '');
	setValue('ctaDigitoOtroPerceptor', '');
	setValue('ctaBancoOtroPerceptor', '');
}

function uncheckSwCtaTomardorInicial(chequear){
	document.getElementById("ctaBancoTomador").checked = chequear;
}

function abrePopupAsegurado(forward, funcionCallback, w, h){
	if (funcionCallback == undefined){
    	window.parentCallback = function(valor) {
    		//alert(valor);
    	};
	}else{
		window.parentCallback = funcionCallback;
	}
	
	var valor = lanzarVentana(forward, w!=undefined?w:1000, h!=undefined?h:600, null, window.parentCallback);
	
	if(valor!=undefined && valor!=null) {
		window.parentCallback(valor);
	}
}

function abrePopupBuscaAsegurado(){
	var url = '/etica/expediente/perjudicadoReembolso/mnto/buscaAsegurado.do';
	
	var numPoliza =jQuery('input[id="numPoliza"]').val();
	
	url+='?numPoliza='+numPoliza;
	abrePopupAsegurado(url, callbackPopupBuscaAsegurado, 1000, 400);
}

function callbackPopupBuscaAsegurado(valor){
	if (valor!=undefined){
		if (valor!=null){
			if (valor.length==14){
				// idPolMaestro, idRgoMaestro, idPersona, numPoliza, numTarjeta, nombre, docIdent, idTipoIdent,
				// idCtaBanco, codIban, codBanco, codSucursal, ctaDigito, ctaBanco
				if (valor[0]!='' && valor[1]!=''){
					setValue('idPersonaPerceptor', valor[2]);
					setValue('nombreOtroPerceptor', valor[5]);
					setValue('docIdentOtroPerceptor', valor[6]);
					
					setValue('idCtaBancoPerceptor', valor[8]);
					setValue('codIbanOtroPerceptor', valor[9]);
					setValue('codBancoOtroPerceptor', valor[10]);
					setValue('codSucursalOtroPerceptor', valor[11]);
					setValue('ctaDigitoOtroPerceptor', valor[12]);
					setValue('ctaBancoOtroPerceptor', valor[13]);
					
				}
			}
		}
	}
}

function abrePopupPreexistencias(forward, funcionCallback, w, h){
	if (funcionCallback == undefined){
    	window.parentCallback = function(valor) {
    		//alert(valor);
    	};
	}else{
		window.parentCallback = funcionCallback;
	}
	
	var valor = lanzarVentana(forward, w!=undefined?w:1000, h!=undefined?h:600, null, window.parentCallback);
	if(valor!=undefined && valor!=null) {
		window.parentCallback(valor);
	}
}

jQuery(document).ready(function() {
	var check = document.getElementById('swCtaTomador');
	mostrarOcultarOtroPerceptor(check.checked);
	cargaHayPreexistenciasExclusiones();
	comprobarDivisa(document.getElementById("idDivisa").value);
});