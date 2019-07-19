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
	if (document.getElementById("sntroRgoDecesosView.swTramitadorAutomatico").value == "0"){
		if (document.getElementById("sntroRgoDecesosView.tramitador.id")){
			if (document.getElementById("sntroRgoDecesosView.tramitador.id").value != ""){
				return true;
			}else{
				alert(msgSeleccionaTramitador);
				document.getElementById("sntroRgoDecesosView.tramitador.id").focus();
				return false;
			}
		}
	}
	return true;
}

function uncheckSwCtaTomardorInicial(chequear){
	document.getElementById("ctaBancoTomador").checked = chequear;
}

function activarDesactivarMotivoRechazo(){
  if (document.getElementById('sntroRgoDecesosView.idRechazado').value != ''){
    document.getElementById('sntroRgoDecesosView.motivoRechazado').disabled = "";
  }else{
    document.getElementById('sntroRgoDecesosView.motivoRechazado').value = "";
    document.getElementById('sntroRgoDecesosView.motivoRechazado').disabled = "true";
  }
}

function recargaDeclarante(){
	var direccion = accionRecargarDeclarante;
	direccion = direccion + "?sntroRgoDecesosView.tipoDeclarante.id=" + document.getElementById('sntroRgoDecesosView.tipoDeclarante.id').value;
	retrieveURLWithoutParametersSync(direccion);	
	ocultaSegunDeclarante();
	operacionesOnLoadFigura();
}

function ocultaSegunDeclarante(){
    var idTipoDeclarante = document.getElementById('sntroRgoDecesosView.tipoDeclarante.id').value;
    if(idTipoDeclarante == 9 || idTipoDeclarante == 10){
  	  // juzgado
  		document.getElementById('imgBusqPersona').style.display = 'none';
    	document.getElementById('imgBusqJuzgado').style.display = 'none';
    	document.getElementById('imgBusqAseguradora').style.display = 'none';
  	}
    else if(idTipoDeclarante == 3){
	  // juzgado
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = '';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
	}else if(idTipoDeclarante == 1){
	  // aseguradora contraria
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = '';
	}else {
	  // persona
		document.getElementById('imgBusqPersona').style.display = '';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
	}
	
	if (idTipoDeclarante == 1 || idTipoDeclarante == 3 || idTipoDeclarante == 9 || idTipoDeclarante == 10){
  		document.getElementById('figuraFormView.tipoIdent.id').value = 1;
	}else{
  		document.getElementById('figuraFormView.tipoIdent.id').value = 2;
	}
}

function controlGestionEspecial() {
	  
  if(document.getElementById('sntroRgoDecesosView.swGestionEspecial').value == valorSi){
     document.getElementById('sntroRgoDecesosView.motGestionEsp.id').disabled = false;
  }
  
  else{
     document.getElementById('sntroRgoDecesosView.motGestionEsp.id').disabled = true;
     document.getElementById('sntroRgoDecesosView.motGestionEsp.id').value = "";
  }
}

jQuery(document).ready(function() {
	var idTipoDeclarante = document.getElementById('sntroRgoDecesosView.tipoDeclarante.id').value;
	if (idTipoDeclarante == ''){
		jQuery('span#declarante').html('');
	}
});