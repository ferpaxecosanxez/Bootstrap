
/* Funcion para mostrar el arbol */
function mostrarArbolExpediente(){
  // se recarga el iframe oculto para que a su vez recarge el arbol
  top.window.frames['iAgenda'].location = accionPintarArbol; 
}

function enviarDatos(boton){
  if (comprobarDatos() && validaTramitador()){
    document.getElementById('operacionApertura').value = boton;    
    document.forms[0].action=accionGrabar;
    muestraCarga();
    document.forms[0].submit();       
  }
}

function comprobarDatos(){
  return validaForm(document.forms(0),validateRiesgoParticularSntroForm,'iAreaTrabajo');
}  

function activarDesactivarMotivoRechazo(){
  if (document.getElementById('sntroRgoIndusView.idRechazado').value != ''){
    document.getElementById('sntroRgoIndusView.motivoRechazado').disabled = "";
  }else{
    document.getElementById('sntroRgoIndusView.motivoRechazado').value = "";
    document.getElementById('sntroRgoIndusView.motivoRechazado').disabled = "true";
  }
}

function recargaDeclarante(){
  var direccion = accionRecargarDeclarante;
  direccion = direccion + "?sntroRgoIndusView.tipoDeclarante.id=" + document.getElementById('sntroRgoIndusView.tipoDeclarante.id').value;
  retrieveURLWithoutParametersSync(direccion);  
  ocultaSegunDeclarante();
  operacionesOnLoadFigura();
}

function modificar(accion, operacion){
  if (validaTramitador()){
	  document.forms(0).action = accion;
	  if (operacion != null) {
		    document.getElementById('operacionApertura').value = operacion;    
	  }
	  muestraCarga();
	  submitForm(document.forms(0),null,'iAreaTrabajo');
  }
}

function ocultaSegunDeclarante(){
    var idTipoDeclarante = document.getElementById('sntroRgoIndusView.tipoDeclarante.id').value;
    if(idTipoDeclarante == 9 || idTipoDeclarante == 10){
    	// bomberos
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
  		document.getElementById('figuraFormView.tipoIdent.id').value = 1;
    }else if(idTipoDeclarante == 3 ){
	  // juzgado
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = '';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
  		document.getElementById('figuraFormView.tipoIdent.id').value = 1;
	}else if(idTipoDeclarante == 1){
	  // aseguradora contraria
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = '';
  		document.getElementById('figuraFormView.tipoIdent.id').value = 1;
	}else {
	  // persona	
		document.getElementById('imgBusqPersona').style.display = '';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
	}
}

/* Funcion para el control de la gestion especial */
function controlGestionEspecial(){
  if(document.getElementById('sntroRgoIndusView.swGestionEspecial').value == valorSi){
     document.getElementById('sntroRgoIndusView.motGestionEsp.id').disabled = false;
  }else{
     document.getElementById('sntroRgoIndusView.motGestionEsp.id').disabled = true;
     document.getElementById('sntroRgoIndusView.motGestionEsp.id').value = "";
  }
}

/*Función que valida si swTramitadorautomatico = no, que hayas introducido un tramitador */
function validaTramitador(){
	if (document.getElementById("sntroRgoIndusView.swTramitadorAutomatico").value == "0"){
		if (document.getElementById("sntroRgoIndusView.tramitador.id")){
			if (document.getElementById("sntroRgoIndusView.tramitador.id").value != ""){
				return true;
			}else{
				alert(msgSeleccionaTramitador);
				document.getElementById("sntroRgoIndusView.tramitador.id").focus();
				return false;
			}
		}
	}
	return true;
}