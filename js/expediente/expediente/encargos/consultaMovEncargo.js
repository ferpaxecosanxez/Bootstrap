///////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSULTAMOVENCARGO.JSP 
///////////////////////////////////////////////////////////////////////////////////////////////////////////

  function consultarExpediente() {
  	accionConsultaExpediente = accionConsultaExpediente + '?nroExpediente=' + numExpediente;
  	lanzarVentana(accionConsultaExpediente,800,500);
  }
 
  /* Gestion pestanna datos encargos */
  function pestannaEncargo(tab){
    if(selectTab == "tab2_DAT"){
      modificacionesDatosProfesional();
    } 
    if(selectTab == "tab3_DAT"){
    	if(validarDatosValoracion() == false){
    		return false;
    	}
    	modificacionesDatosValoracion();
    }
    if(selectTab == "tab4_DAT"){
     	if(swCategoriaEncargoAutomatico == valorNo){
	    	if(validarDatosFactura() == false){
	    		return false;
	    	}
	    }
    	modificacionesDatosHonorarios();
    }
	selectTab = changeTabIframe(tab,accionDatosEncargo,window.frames['iTabContent'].document.forms[0],null,'iTabContent');
	muestraCarga();
  }
  
  /* Gestion pestanna datos entidad */
  function pestannaEntidad(tab){
    if(selectTab == "tab0_DAT"){
    	modificacionesDatosEncargo();
    }
    if(selectTab == "tab2_DAT"){
       modificacionesDatosProfesional();
    }
    if(selectTab == "tab3_DAT"){
    	if(validarDatosValoracion() == false){
    		return false;
    	}
    	modificacionesDatosValoracion();
    } 
    if(selectTab == "tab4_DAT"){
     	if(swCategoriaEncargoAutomatico == valorNo){
	    	if(validarDatosFactura() == false){
	    		return false;
	    	}
	    }
    	modificacionesDatosHonorarios();
    }
    selectTab = changeTabIframe(tab,accionActualizarDatosEntidad,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	muestraCarga();
  }
 
  /* Gestion pestanna datos profesional */
  function pestannaProfesional(tab){
     if(selectTab == "tab0_DAT"){
     	modificacionesDatosEncargo();
     }
     if(selectTab == "tab3_DAT"){
    	if(validarDatosValoracion() == false){
    		return false;
    	}
    	modificacionesDatosValoracion();
     }
     if(selectTab == "tab4_DAT"){
     	if(swCategoriaEncargoAutomatico == valorNo){
	    	if(validarDatosFactura() == false){
	    		return false;
	    	}
	    }
    	modificacionesDatosHonorarios();
    }
	 selectTab = changeTabIframe(tab,accionDatosProfesional,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	 muestraCarga();
  }
  
  /* Gestion pestanna datos valoracion */
  function pestannaValoracion(tab){
     if(selectTab == "tab0_DAT"){
     	modificacionesDatosEncargo();
     }
     if(selectTab == "tab2_DAT"){
       modificacionesDatosProfesional();
     } 
     
     if(selectTab == "tab4_DAT"){
     	if(swCategoriaEncargoAutomatico == valorNo){
	    	if(validarDatosFactura() == false){
	    		return false;
	    	}
	    	modificacionesDatosHonorarios();
	    }
    }
	 selectTab = changeTabIframe(tab,accionDatosValoracion,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	 muestraCarga();
  }
  
  /* Gestion pestanna datos honorarios */
  function pestannaHonorario(tab){
     if(selectTab == "tab0_DAT"){
     	modificacionesDatosEncargo();
     }
     if(selectTab == "tab3_DAT"){
    	if(validarDatosValoracion() == false){
    		return false;
    	}
    	modificacionesDatosValoracion();
     }
     if(selectTab == "tab2_DAT"){
       modificacionesDatosProfesional();
     } 
	 selectTab = changeTabIframe(tab,accionDatosHonorarios,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	 muestraCarga();
  }
  
  /* Gestion pestanna datos Control del Riesgo */
  function pestannaCtrlRiesgo(tab){
	if(selectTab == "tab0_DAT"){
    	modificacionesDatosEncargo();
    }
    if(selectTab == "tab2_DAT"){
       modificacionesDatosProfesional();
    }
    if(selectTab == "tab3_DAT"){
    	if(validarDatosValoracion() == false){
    		return false;
    	}
    	modificacionesDatosValoracion();
    } 
    if(selectTab == "tab4_DAT"){
     	if(swCategoriaEncargoAutomatico == valorNo){
	    	if(validarDatosFactura() == false){
	    		return false;
	    	}
	    }
    	modificacionesDatosHonorarios();
    }
    selectTab = changeTabIframe(tab,accionDatosCtrlRiesgo,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	muestraCarga();
  }
  
  /* Gestion pestanna datos Control del Riesgo */
  function pestannaEncargoBaremo(tab){
	  if(selectTab == "tab0_DAT"){
		  modificacionesDatosEncargo();
	  }
	  if(selectTab == "tab2_DAT"){
		  modificacionesDatosProfesional();
	  }
	  if(selectTab == "tab3_DAT"){
		  if(validarDatosValoracion() == false){
			  return false;
		  }
		  modificacionesDatosValoracion();
	  } 
	  if(selectTab == "tab4_DAT"){
		  if(swCategoriaEncargoAutomatico == valorNo){
			  if(validarDatosFactura() == false){
				  return false;
			  }
		  }
		  modificacionesDatosHonorarios();
	  }
	  selectTab = changeTabIframe(tab,accionDatosEncargoBaremo,window.frames['iTabContent'].document.forms[0],null,null/* 'iTabContent' */);
	  muestraCarga();
  }
  
  /* Funcion para modificar un encargo */
  function modificacionEncargo(tipo){
     accionModificarEncargo = accionModificarEncargo + "?swTipoModificacion=" + tipo;
     muestraCarga();
     submitFormActionMsg(document.forms(0),accionModificarEncargo, null,'iAreaTrabajo',null);
  }  
  
  
  /* Funcion para guardar los datos cambiados del encargo */
  function modificacionesDatosEncargo(){
    document.getElementById('encargoView.proveedor.id').value = window.frames['iTabContent'].document.getElementById('encargoView.proveedor.id').value;
    document.getElementById('encargoView.claveSalida.id').value = window.frames['iTabContent'].document.getElementById('encargoView.claveSalida.id').value;
	document.getElementById('encargoView.motivoEncargo.id').value = window.frames['iTabContent'].document.getElementById('encargoView.motivoEncargo.id').value;
    document.getElementById('encargoView.tipoLugarEncargo.id').value = window.frames['iTabContent'].document.getElementById('encargoView.tipoLugarEncargo.id').value;
	document.getElementById('encargoView.estimacionEncargo').value = window.frames['iTabContent'].document.getElementById('encargoView.estimacionEncargo').value;
    document.getElementById('encargoView.observacion').value = window.frames['iTabContent'].document.getElementById('encargoView.observacion').value;
    document.getElementById('encargoView.swCompromisoPago').value = window.frames['iTabContent'].document.getElementById('encargoView.swCompromisoPago').value;
    document.getElementById('encargoView.fecLimiteEncargo').value = window.frames['iTabContent'].document.getElementById('encargoView.fecLimiteEncargo').value;
    document.getElementById('encargoView.fecMovimiento').value = window.frames['iTabContent'].document.getElementById('encargoView.fecMovimiento').value;
    document.getElementById('encargoView.nombreCompletoDatosUbicacionEncargo').value = window.frames['iTabContent'].document.getElementById('encargoView.nombreCompletoDatosUbicacionEncargo').value;
    document.getElementById('encargoView.datosUbicacion.tipoVia.id').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.tipoVia.id').value;
    document.getElementById('encargoView.datosUbicacion.via').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.via').value;
    document.getElementById('encargoView.datosUbicacion.numeroVia').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.numeroVia').value;
    document.getElementById('encargoView.datosUbicacion.bloque').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.bloque').value;
    document.getElementById('encargoView.datosUbicacion.piso').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.piso').value;
    document.getElementById('encargoView.datosUbicacion.puerta').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.puerta').value;
    document.getElementById('encargoView.datosUbicacion.pais.id').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.pais.id').value;
    document.getElementById('encargoView.datosUbicacion.codPostal').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.codPostal').value;
    document.getElementById('encargoView.datosUbicacion.localidad').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.localidad').value;
    document.getElementById('encargoView.datosUbicacion.provincia.id').value = window.frames['iTabContent'].document.getElementById('encargoView.datosUbicacion.provincia.id').value;
    document.getElementById('encargoView.telefonoEncargo1.telefono').value = window.frames['iTabContent'].document.getElementById('encargoView.telefonoEncargo1.telefono').value;
    document.getElementById('encargoView.telefonoEncargo2.telefono').value = window.frames['iTabContent'].document.getElementById('encargoView.telefonoEncargo2.telefono').value;
    document.getElementById('encargoView.telefonoEncargo3.telefono').value = window.frames['iTabContent'].document.getElementById('encargoView.telefonoEncargo3.telefono').value;
    document.getElementById('encargoView.textoLibre1').value = window.frames['iTabContent'].document.getElementById('encargoView.textoLibre1').value;
    document.getElementById('encargoView.textoLibre2').value = window.frames['iTabContent'].document.getElementById('encargoView.textoLibre2').value;
  }
  
  /* Funcion para guardar los datos cambiados del profesional */
  function modificacionesDatosProfesional(){
	document.getElementById('encargoView.proveedorRela.id').value = window.frames['iTabContent'].document.getElementById('encargoView.proveedorRela.id').value;
	document.getElementById('encargoView.proveedorAmbitoRela.id').value = window.frames['iTabContent'].document.getElementById('encargoView.proveedorAmbitoRela.id').value;
  }  

  /* Funcion para guardar los datos cambiados de valoracion */
  function modificacionesDatosValoracion(){
	if (esPeritacion) { // encargo fotoperitacion / peritacion presencial
		document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').value;
	} else {  // encargo general
		document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.fecMovimiento').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.fecMovimiento').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.fechaValoracion').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.fechaValoracion').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.importeAvance').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importeAvance').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.textoCorto').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.textoCorto').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.observacionesActividades').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.observacionesActividades').value;
	}
  }  
  
  /* Funcion para guardar los datos cambiados de honorarios */
  function modificacionesDatosHonorarios(){
	if (esPeritacion) { // encargo fotoperitacion / peritacion presencial
		//
	} else {  // encargo general
		document.getElementById('encargoView.encargoEntradaGeneralView.numeroFactura').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.numeroFactura').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.fechaFactura').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.fechaFactura').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.honorarios').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.honorarios').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.total').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.total').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.dietas').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.dietas').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIrpf').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIrpf').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.importeRetencion').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importeRetencion').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.fotos').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.fotos').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIva').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIva').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.importeIva').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importeIva').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.kilometraje').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.kilometraje').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.hoteles').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.hoteles').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.importe').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importe').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.otros').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.otros').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.provisionFondos').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.provisionFondos').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.totalGastos').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.totalGastos').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.devolucionProvisionFondos').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.devolucionProvisionFondos').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.gastosProcurador').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.gastosProcurador').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.gastosJudiciales').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.gastosJudiciales').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.importeLiquido').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importeLiquido').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.suplidos').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.suplidos').value;
		document.getElementById('encargoView.encargoEntradaGeneralView.observacionesHonorarios').value = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.observacionesHonorarios').value;
	}
  }
  
  /* Funcion para guadar los datos */
  function guardarDatosModificacion(){
	  var action = '';
      if(selectTab == "tab0_DAT"){
		  modificacionesDatosEncargo();
	  }else if(selectTab == "tab2_DAT"){
         modificacionesDatosProfesional();
      }else if(selectTab == "tab3_DAT"){
		  if(validarDatosValoracion() == false){
			  return false;
		  }
		  modificacionesDatosValoracion();
	  }else if(selectTab == "tab4_DAT"){
		  if(swCategoriaEncargoAutomatico == valorNo && validarDatosFactura() == false){
			  return false;
		  }
		  modificacionesDatosHonorarios();
	  }

	  // guardo la fecha
	  var fecha = document.getElementById('encargoView.fecRealizacionEncargo').value;
	  window.frames['iTabContent'].document.getElementById('encargoView.fecRealizacionEncargo').value = fecha;
	  
	  var tipoEncargo = window.frames['iTabContent'].document.getElementById('encargoView.tipoEncargoView.id').value;
	  
	  var confirmado = valorNo;
	  if (esFotoperitacion && swMovimientoEntrada != valorSi){
		  action = accionModificacionFotoperitacion;
		  if (mostrarMensajeFechaCitaSobrepasada == valorSi){
			  confirmado = confirm(mensajeFechaCitaSobrepasada);
		  }
	  } else {
		  confirmado = valorSi;
		  action = accionGuardarModificaciones;
	  }
	  
	  if (confirmado == valorSi){
		  muestraCarga();
		  submitFormActionMsg(document.forms(0),action, null,'iAreaTrabajo',null);
	  }
  }

  function validarDatosFactura(){
  	
  	var datosCorrectos = true;
  	
  	if(selectTab == "tab4_DAT"){
  		var disabledNumFactura = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.numeroFactura').disabled;

	  	if(document.getElementById('encargoView.swModoModificacion').value=='1' &&
		  		swCategoriaEncargoAutomatico == valorNo &&
		  		disabledNumFactura == false){
	  		
	  		var numeroFactura = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.numeroFactura').value;
	  		var fechaFactura = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.fechaFactura').value;
	  		var importeLiquido = parseFloat(window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.importeLiquido').value);
	  		
	  		if(numeroFactura == ""){
	  			alert(errorNumeroFacturaObligatorio);
	  			datosCorrectos = false;
	  		}else if(fechaFactura == ""){
	  			alert(errorFechaFacturaObligatoria);
	  			datosCorrectos = false;
	  		}else if(importeLiquido == 0){
	  			alert(errorImporteLiquido);
	  			datosCorrectos = false;
	  		}
		}
  	}
  	
  	return datosCorrectos;
  }
  
  function validarDatosValoracion(){
	if(swModoModificacion == valorSi &&
    	swMovimientoEntrada == valorSi ){
	  	var idClaveComunicacion = window.frames['iTabContent'].document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').value;
	  	if(idClaveComunicacion == ""){
	  		alert(mensajeErrorIdClaveComunicacionVacia);
	  		return false;
	  	}
	}
	return true;
  } 

/* Funcion que se llama al finalizar la carga de la pagina consultaMovEncargo */
function onLoadPaginaConsultaMovEncargo() {
	if (top.agendaPlegado) {
		// Para mostrar la Agenda
		top.plegar('cAgenda');
	}
	// se recarga el arbol totalmente bloqueado
	top.frames[2].location = arbol;
	// se oculta la sabana gris
	ocultaCarga();
	layOutPantalla();
}

// FINAL CONSULTAMOVENCARGO.JSP
// //////////////////////////////////////////////////////////////////////////////////////////////////
