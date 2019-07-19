// ///////////////////////////////////////////////////////////////////////////////////////////////////
// DGESTORINTERNO.JSP
// ///////////////////////////////////////////////////////////////////////////////////////////////////

/*Funcion para la busqueda de usuarios tramitadores: ventana emergente de consulta tramitador*/
function buscarTramitador(codTramitador,nomTramitador,idTramitador){
	  
	  var codigoTramitador = document.getElementById(codTramitador).value;	 	  
  	  var nombreTramitador = document.getElementById(nomTramitador).value;	  
	  var identificadorTramitador = document.getElementById(idTramitador).value;	
	  var pag;
	  
	  pag = '<html:rewrite action="/consultaTramitador/consulta/inicializar"/>';  
	  pag= pag+"?codTramitador="+codigoTramitador+"&nombreTramitador="+nombreTramitador;
    
	  // alert("pag=" + pag);
	  var valor = lanzarVentana(pag,600,400);
	  if(valor != undefined) 
	  {
		if(codigoTramitador != null)		
			setValue(codTramitador, valor[0]);	
		if(nombreTramitador != null)		
			setValue(nomTramitador, valor[1]);	
		if(identificadorTramitador != null)		
			setValue(idTramitador, valor[2]);	

	  // se recarga la pantalla con los datos del proveedor seleccionado
      //var action = '<html:rewrite action="/apertura/profesionales/reloadTramitador"/>';
      //action = action +"?idTram="+valor[2];
      //document.forms[0].action = action;
      //submitFormActionMsg(document.forms[0],action,null,'iTabContent',null);						  
  }
}
	
function limpiarCampos(){
  document.forms[0]['idTipoIdentificacion'].selectedIndex=0;
  document.forms[0]['numeroIdentificacion'].value='';
  document.forms[0]['idTramitador'].value='';
  document.forms[0]['codTramitador'].value='';
  document.forms[0]['desTramitador'].value='';
  document.forms[0]['nombre'].value='';
  document.forms[0]['ubicacionAmbito.localidad'].value='';
  document.forms[0]['ubicacionAmbito.provincia.id'].selectedIndex=0;
  document.forms[0]['telefono1.telefono'].value='';
  document.forms[0]['telefono2.telefono'].value='';
  document.forms[0]['telefono3.telefono'].value='';
}

/* Funcion que se llama al finalizar la carga de la pagina dGestorInterno.jsp */
function onLoadPaginaDGestorInterno() {
	if (swModificacion == "0" && swOpModificar == "1") {
		document.forms[0].btLupa.disabled = true;
		document.forms[0].btLimpiarProf.disabled = true;
	}
}

// FIN DGESTORINTERNO.JSP
// //////////////////////////////////////////////////////////////////////////////////////////////////
