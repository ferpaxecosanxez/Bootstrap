// ENCARGO PROFESIONAL ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
 /* Gestion pestanna datos encargos */
  function pestannaEncargo(tab){
	var action = actionActualizarDatosEncargoPerito;
	action = action +"?tipoProf="+idTipoProf;
	action = action +"&idEstadoEncargo="+window.frames['iTabContent'].document.getElementById('encargoView.estadoEncargo.id');
	selectTab = changeTabIframe(tab,action,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
	muestraCarga();
  }
  
  /* Gestion pestanna datos entidad */
  function pestannaEntidad(tab){
    if(window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id')!=undefined) {
       window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id').disabled = false;
    }
  	var validoPrueba = validarPestannaEncargoPrueba()	

  	if(validoPrueba){
        var action = actionActualizarDatosEntidad;
	    selectTab = changeTabIframe(tab,action,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
		muestraCarga();
	}
  }
 
  /* Gestion pestanna datos profesional */
  function pestannaProfesional(tab){
    if(window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id')!=undefined)
      window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id').disabled = false;
  	var validoPrueba = validarPestannaEncargoPrueba();	

  	if(validoPrueba){
        var action = actionActualizarDatosProfesional;
        var idMedioEnvioEncargoHTML = window.frames['iTabContent'].document.getElementById('encargoView.medioEnvioEncargo.id');
		var idMedioEnvioEncargo = idMedioEnvioEncargoHTML.options[idMedioEnvioEncargoHTML.options.selectedIndex].value;
        action += '?encargoView.medioEnvioEncargo.id=' + idMedioEnvioEncargo;
	    selectTab = changeTabIframe(tab,action,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
		muestraCarga();
	}
  }
  
   /* Gestion pestanna datos actividad */
  function pestannaActividad(tab){
    var action = actionActualizarDatosActividad;
    selectTab = changeTabIframe(tab,action,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
	muestraCarga();
  }
  
  /* Gestion pestanna datos honorarios */
  function pestannaHonorarios(tab){
    var action = actionActualizarDatosHonorarios;
    selectTab = changeTabIframe(tab,action,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
	muestraCarga();
  }
  
  /* Envio datos */
  function comprobacionDatos(){
    if(document.getElementById('encargoView.fecRealizacionEncargo').value==""){
        alert(messageErrorFechaEncargoVacia);
    } else if (window.frames['iTabContent'].document.getElementById('encargoView.claveSalida.id').value==""){
    	alert(mensajeErrorIdClaveComunicacionVacia);
    } else {
      var validoPrueba = validarPestannaEncargoPrueba();
      
      if(validoPrueba){
        if(window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id')!=undefined)
	      window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacionEncargo.tipoVia.id').disabled = false;
	    if(window.frames['iTabContent'].document.getElementById('encargoView.proveedor.id')!=undefined)  
	      window.frames['iTabContent'].document.getElementById('encargoView.proveedor.id').disabled = false;
	    
	    if (esFotoperitacion) {
	    	enviarDatosEncargo(accionGdoFp, accionProf, messageErrorProfesional);
	    } else {
	    	enviarDatosEncargo(accionGdo, accionProf, messageErrorProfesional);
	    }
      }
    }
  }   
  
  /* Funcion para verificar fecha encargo */
  function verificarFechaEncargo(){
    var fecha = document.getElementById('encargoView.fecRealizacionEncargo').value;
    //if(selectTab=="tab0_DAT"){
      document.getElementById('encargoView.fecRealizacionEncargo').value = fecha;
    //}
    
    if(fecha != "" && fecha != fecRealizacionEncargo){ // simular onchange ya que no funciona bien
      // se valida
      var action = actionComprobarFechaEncargo+'?fechaEncargoAjax='+fecha;
      retrieveURLParameterOnlyUrlPopPup(action);             
    }
  }  
  
  /* Funcion para validar la pestana de encargo */
  function validarPestannaEncargoPrueba(){
	if(selectTab=="tab0_DAT"){
  	  var idNivelEntidad =  window.frames['iTabContent'].document.getElementById('encargoView.idNivelEntidadAsignada').value;
  	  var idObjetoEntidad =  window.frames['iTabContent'].document.getElementById('encargoView.idEntidadAsignada').value;
  	  var idTipoEncargo = window.frames['iTabContent'].document.getElementById('encargoView.tipoEncargoView.id').value;
  	  var idLugarEncargo = window.frames['iTabContent'].document.getElementById('encargoView.tipoLugarEncargo.id').value;
  	  var checks = window.frames['iTabContent'].document.getElementsByName('check');
  	  
  	  if (idTipoEncargo == ""){
 			  alert(messajeValidacionTipoEncargo);
 			  return false;
 	  }	
  	
  	  if(idNivelEntidad == ""){
 			  alert(messajeValidacionNivelEntidad);
 			  return false;
 	  }
 	
 	  if(idObjetoEntidad == ""){
 			  alert(messajeValidacionObjetoEntidad);
 			  return false;
 	  }
 	  
 	  if(idNivelEntidad == "8"){
 		  var algunCheckMarcado = false;
 		  for (var i=0; i<checks.length; i++){
 			  if(checks[i].checked){
 				 algunCheckMarcado = true;
 			  }
 		  }
 		  if (!algunCheckMarcado){
 			  alert(messajeValidacionNivelEntidad);
 			  return false;
 		  }
 	  }
 	  
 	  if(idLugarEncargo == ""){
 			  alert(messajeValidacionLugarRealizacionEncargo);
 			  return false;
 	  }else{ 	  
 	    if(idLugarEncargo == LUGARJUZGADO){
 	      var idJuzgadoEncargo = window.frames['iTabContent'].document.getElementById('encargoView.juzgado.id').value;
 	      if(idJuzgadoEncargo == ""){
 	        alert(messajeValidacionLugarRealizacionEncargo);
 		    return false;
 	      }
 	    } else if((idLugarEncargo == LUGARHOSPITAL)||
 	             (idLugarEncargo == LUGARTALLER)){
 	        var idAmbitoEncargo = window.frames['iTabContent'].document.getElementById('encargoView.proveedor.id').value;
 	        if(idAmbitoEncargo == ""){
 	        alert(messajeValidacionLugarRealizacionEncargo);
 		    return false;
 	      }
 	    }
 	  }
 	}
 	return true;		
  }

// FIN ENCARGO PROFESIONAL 
// //////////////////////////////////////////////////////////////////////////////////////////////////
