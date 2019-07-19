/* Funcion para mostrar el arbol */
function mostrarArbolExpediente(){
  // se recarga el iframe oculto para que a su vez recarge el arbol
  top.window.frames['iAgenda'].location = accionPintarArbol; 
}

function enviarDatos(boton, accion){ 
  var validado = true; // validaForm(document.forms(0),validateRiesgoParticularSntroForm,'iAreaTrabajo');
  if(validado){ // && validaTramitador()){
    document.getElementById('operacionApertura').value = boton;    
    document.forms[0].action=accion;
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
	if (document.getElementById("sntroRgoIndustrialView.swTramitadorAutomatico").value == "0"){
		if (document.getElementById("sntroRgoIndustrialView.tramitador.id")){
			if (document.getElementById("sntroRgoIndustrialView.tramitador.id").value != ""){
				return true;
			}else{
				alert(msgSeleccionaTramitador);
				document.getElementById("sntroRgoIndustrialView.tramitador.id").focus();
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
  if (document.getElementById('sntroRgoIndustrialView.idRechazado').value != ''){
    document.getElementById('sntroRgoIndustrialView.motivoRechazado').disabled = "";
  }else{
    document.getElementById('sntroRgoIndustrialView.motivoRechazado').value = "";
    document.getElementById('sntroRgoIndustrialView.motivoRechazado').disabled = "true";
  }
}

function recargaDeclarante(){
	var direccion = accionRecargarDeclarante;
	direccion = direccion + "?sntroRgoIndustrialView.tipoDeclarante.id=" + document.getElementById('sntroRgoIndustrialView.tipoDeclarante.id').value;
	retrieveURLWithoutParametersSync(direccion);	
	ocultaSegunDeclarante();
	operacionesOnLoadFigura();
}

function ocultaSegunDeclarante(){
    var idTipoDeclarante = document.getElementById('sntroRgoIndustrialView.tipoDeclarante.id').value;
    if(idTipoDeclarante == 9 || idTipoDeclarante == 10){
    	  // juzgado
    	document.getElementById('imgBusqPersona').style.display = 'none';
      	document.getElementById('imgBusqJuzgado').style.display = 'none';
      	document.getElementById('imgBusqAseguradora').style.display = 'none';
    	
    }else if(idTipoDeclarante == 3 ){
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

function cambiarColorActividad(idActividadOcurrencia){
	
 	if(idActividadOcurrencia == idMutualidadesCompanias){
 		document.getElementById('idActividadOcurrencia').style.backgroundColor = '#FF0000';
 		document.getElementById('avisoActividadOcurrencia').className = 'aviso';
 	} else {
 		document.getElementById('idActividadOcurrencia').style.backgroundColor = '';
 		document.getElementById('avisoActividadOcurrencia').className = 'oculta';
 	}
 }

function mostrarAvisoActividad(swEquidad) {
	
	if(swEquidad == 1){
		document.getElementById('avisoActividadOcurrencia').className = 'aviso';
	} else {
		document.getElementById('avisoActividadOcurrencia').className = 'oculta';
	}
}
jQuery(document).ready(function() {
	if (document.getElementById('sntroRgoIndustrialView.tipoDeclarante.id') != null) {
		var idTipoDeclarante = document.getElementById('sntroRgoIndustrialView.tipoDeclarante.id').value;
		if (idTipoDeclarante == ''){
			jQuery('span#declarante').html('');
		}
	}
});
