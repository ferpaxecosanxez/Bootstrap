///////////////////////////////////////////////////////////////////////////////////////////////////////////
// DENCARGO 
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Función para el control del lugar de realizacion del encargo */
function controlRealizacionEncargo() {

	var idLugarEncargo = document.forms[0].elements['encargoView.tipoLugarEncargo.id'].options[document.forms[0].elements['encargoView.tipoLugarEncargo.id'].selectedIndex].value;
	var codigoTipoEncargo = document.getElementById('encargoView.tipoEncargoView.codigo').value;
	
	var fecEncargo = parent.document
			.getElementById('encargoView.fecRealizacionEncargo').value;
	if (fecEncargo != null && fecEncargo != "" || codigoTipoEncargo == CODIGOTIPOENCARGOFOTOPERITACION) {
		if (idLugarEncargo == LUGARHOSPITAL) {
			buscarProfesionalEncargo(actionIniciarConsultaProf, idLugarEncargo);
		}
		if (idLugarEncargo == LUGARTALLER) {
			if (codigoTipoEncargo == CODIGOTIPOENCARGOFOTOPERITACION) {
				buscarProfesionalEncargo(actionIniciarConsultaTalleresLDA,
						idLugarEncargo);
			} else {
				buscarProfesionalEncargo(actionIniciarConsultaTalleres,
						idLugarEncargo);
			}
		}
		if (idLugarEncargo == LUGAROTROSDOMICILIOS) {
			buscarPersonaSistema();
		}
		if (idLugarEncargo == LUGARJUZGADO) {
			buscarJuzgadoSistema();
		}
		if (idLugarEncargo == LUGARDOMICILIO) {
			//buscarLugarDomicilio();
		}
	} else {
		alert(messajeErrorFechaEncargo);
		document.forms[0].elements['encargoView.tipoLugarEncargo.id'].value = "";
	}
}

/* Función para seleccionar un profesional */
function buscarProfesionalEncargo(pag, idLugarEncargo) {
	var codigoTipoEncargo = document.getElementById('encargoView.tipoEncargoView.codigo').value;
	
	pag = pag + '?idLugarEncargo=' + idLugarEncargo;
	pag = pag + '&disableIdTipoProveedor=1';
	var valor = lanzarVentana(pag, 700, 650);
	if (valor != undefined) {
		var action = actionReloadUbicacionEncargo
				+ '?encargoView.tipoLugarEncargo.id='
				+ document.getElementById('encargoView.tipoLugarEncargo.id').value
				+ '&encargoView.idEntidadAsignada='
				+ document.getElementById('encargoView.idEntidadAsignada').value
				+ '&encargoView.idNivelEntidadAsignada='
				+ document.getElementById('encargoView.idNivelEntidadAsignada').value
				+ '&encargoView.proveedor.id=' + valor[0];
		if (codigoTipoEncargo == CODIGOTIPOENCARGOFOTOPERITACION) {
 			document.getElementById('encargoView.fecRealizacionEncargo').value="";
 			parent.document.getElementById('encargoView.fecRealizacionEncargo').value="";
			parent.document.getElementById('encargoView.fecRealizacionEncargo').disabled=true;
			parent.document.getElementById('btnFechaEncargo').disabled=true;
 			document.getElementById('encargoView.proveedorRela.id').value = valor[0];
		}

		retrieveURLParameterOnlyUrlPopPup(action);
	}
}

/* Función para seleccionar las personas */
function buscarPersonaSistema() {
	var valor = lanzarVentana(actionConsultaPersona, 600, 450);

	if (valor != undefined) {
		document.getElementById('encargoView.idOtraPsnEncargo').value = valor[0];
		// retrieveURLParameterPopPup(actionReloadDatosPsnOtroDomicilio,'encargosForm','encargoView.idOtraPsnEncargo','idOtraPsnEncargoAjax');
		retrieveURLParameterOnlyUrlPopPup(actionReloadDatosPsnOtroDomicilio);
	}
}

/* Función para seleccionar las personas */
function buscarJuzgadoSistema() {
	var valor = lanzarVentana(actionConsultaJuzgado, 700, 650);

	if (valor != undefined) {
		var action = actionReloadUbicacionEncargo
				+ '?encargoView.tipoLugarEncargo.id='
				+ document.getElementById('encargoView.tipoLugarEncargo.id').value
				+ '&encargoView.idEntidadAsignada='
				+ document.getElementById('encargoView.idEntidadAsignada').value
				+ '&encargoView.idNivelEntidadAsignada='
				+ document.getElementById('encargoView.idNivelEntidadAsignada').value
				+ '&encargoView.juzgado.id=' + valor[0];
		retrieveURLParameterOnlyUrlPopPup(action);
	}
}

/* Funcion para recarga datos ubicacion */
function reloadUbicacionEncargo() {
	var idLugarEncargo = document
			.getElementById('encargoView.tipoLugarEncargo.id').value;
	var idNivelEntidad = document
			.getElementById('encargoView.idNivelEntidadAsignada').value;
	var idEntidad = document.getElementById('encargoView.idEntidadAsignada').value;
	var fecEncargo = parent.document
			.getElementById('encargoView.fecRealizacionEncargo').value;

	if (idLugarEncargo == LUGARDOMICILIO) {
		if (fecEncargo != null && fecEncargo != "") {
			if (idNivelEntidad == "" || idEntidad == "") {
				alert(messajeErrorDomicilioObjetoEntidadNula);
				document.getElementById('encargoView.tipoLugarEncargo.id').value = "";
			} else {
				if (idNivelEntidad != idNivelPerjudicadoVehiculo
						&& idNivelEntidad != idNivelPerjudicadoPersona
						&& idNivelEntidad != idNivelPerjudicado) {
					alert(messajeErrorDomicilioObjetoEntidadIncoherente);
					document.getElementById('encargoView.tipoLugarEncargo.id').value = "";
				} else {
					idLugarEncargoAjax = document
							.getElementById('encargoView.tipoLugarEncargo.id').value;
					var action = actionReloadUbicacionEncargo
							+ '?encargoView.tipoLugarEncargo.id='
							+ document
									.getElementById('encargoView.tipoLugarEncargo.id').value
							+ '&encargoView.idEntidadAsignada='
							+ document
									.getElementById('encargoView.idEntidadAsignada').value
							+ '&encargoView.idNivelEntidadAsignada='
							+ document
									.getElementById('encargoView.idNivelEntidadAsignada').value;
					retrieveURLParameterOnlyUrlPopPup(action);
				}
			}
		} else {
			alert(messajeErrorFechaEncargo);
			document.getElementById('encargoView.tipoLugarEncargo.id').value = "";
		}
	} else if (idLugarEncargo == LUGARACCIDENTE) {
		var action = actionReloadUbicacionEncargo
				+ '?encargoView.tipoLugarEncargo.id='
				+ document.getElementById('encargoView.tipoLugarEncargo.id').value
				+ '&encargoView.idEntidadAsignada='
				+ document.getElementById('encargoView.idEntidadAsignada').value
				+ '&encargoView.idNivelEntidadAsignada='
				+ document.getElementById('encargoView.idNivelEntidadAsignada').value;
		retrieveURLParameterOnlyUrlPopPup(action);
	} else {
		var action = actionReloadUbicacionEncargo
				+ '?encargoView.tipoLugarEncargo.id='
				+ document.getElementById('encargoView.tipoLugarEncargo.id').value;
		retrieveURLParameterOnlyUrlPopPup(action);
	}
}

/* Funcion para la recarga del medio envio en funcion del tipo de envio */
function recargaTipoEncargo() {
	var idTipoEncargo = document.getElementById('encargoView.tipoEncargoView.id').value;
	if (idTipoEncargo != "") {
		if (document.forms[0]['encargoView.idNivelEntidadAsignada'] != undefined)
			document.forms[0]['encargoView.idNivelEntidadAsignada'].selectedIndex = 0;
		if (document.forms[0]['encargoView.idEntidad'] != undefined)
			document.forms[0]['encargoView.idEntidad'].selectedIndex = 0;
		var action = actionReloadTipoEncargo;
		action = action + '?idTipoEncargoAjax='
				+ document.getElementById('encargoView.tipoEncargoView.id').value;
		retrieveURLParameterOnlyUrlPopPup(action);
	} else {
		clearOptionsFast(document.getElementById('encargoView.idNivelEntidadAsignada'));
		clearOptionsFast(document.getElementById('encargoView.idEntidadAsignada'));
		clearOptionsFast(document.getElementById('encargoView.claveSalida.id'));
		clearOptionsFast(document.getElementById('encargoView.motivoEncargo.id'));
		clearOptionsFast(document.getElementById('encargoView.medioEnvioEncargo.id'));
		controlLimpiarDomicilioObjeto(false);
		reloadUbicacionEncargo();
	}
}

/* Funcion para la recarga del combo de Entidades por Nivel de la Entidad */
function recargaEntidad() {
	var idTipoEncargo = document
	.getElementById('encargoView.tipoEncargoView.id').value;
	var idNivelEntidad = document
			.getElementById('encargoView.idNivelEntidadAsignada').value;
	var idExExpediente = document
			.getElementById('encargoView.siniestroView.id').value;
	var ctlNmod = document.getElementById('encargoView.siniestroView.ctlNmod').value;
	if (idTipoEncargo != "" && idNivelEntidad != "") {
		// Se valida
		var action = actionReloadEntidades + '?idNivelEntidadAjax='
				+ idNivelEntidad;
		action = action + '&idExExpedienteAjax=' + idExExpediente;
		action = action + '&ctlNmodAjax=' + ctlNmod;
		retrieveURLParameterOnlyUrlPopPup(action);
	} else {
		clearOptionsFast(document.getElementById('encargoView.idEntidadAsignada'));
	}
	controlLimpiarDomicilioObjeto(true);
}

function clearOptionsFast(pCombo) {
	var selectObj = pCombo;
	var selectParentNode = selectObj.parentNode;
	var newSelectObj = selectObj.cloneNode(false);
	selectParentNode.replaceChild(newSelectObj, selectObj);
	newSelectObj.selectedIndex = 0;
	return newSelectObj;
}

/* Funcion para la recarga el literal de usuario Tramitador */
function recargaTramitador() {

	var idNivelEntidad = document
			.getElementById('encargoView.idNivelEntidadAsignada').value;
	var idEntidad = document.getElementById('encargoView.idEntidadAsignada').value;

	if (idNivelEntidad != "") {
		// Se valida
		var action = actionReloadTramitador + '?idNivelEntidadAjax='
				+ idNivelEntidad;
		action = action + '&idEntidadAjax=' + idEntidad;
		retrieveURLParameterOnlyUrlPopPup(action);
	}
}

function controlLimpiarDomicilioObjeto(bForzarLimpiado) {
	var idEntidad = document.getElementById('encargoView.idEntidadAsignada').value;
	var lugarEncargo = document.getElementById('encargoView.tipoLugarEncargo.id').value;
	if (bForzarLimpiado) {
		document.getElementById('encargoView.idEntidadAsignada').value = "";
	}
	if ((bForzarLimpiado || idEntidad == "") && lugarEncargo == LUGARDOMICILIO) {
		document.getElementById('encargoView.tipoLugarEncargo.id').value = "";
	}
	
}

/* Funcion para el control del boton limpiar */
function controlLimpiar() {
	document.forms[0]['encargoView.proveedor.id'].value = "";
	document.forms[0]['encargoView.juzgado.id'].value = "";
	if (document.forms[0]['encargoView.tipoEncargoView.codigo'].value != CODIGOTIPOENCARGOFOTOPERITACION) { // no borrar este campos si es fotoperitacion (se queda en taller)
		parent.document.getElementById('encargoView.fecRealizacionEncargo').disabled=false;
		parent.document.getElementById('btnFechaEncargo').disabled=false;
		document.forms[0]['encargoView.tipoLugarEncargo.id'].selectedIndex = 0;
	}
	reloadUbicacionEncargo();
}

/* Funcion para posicionar de forma correcta el tooltip de tipo encargo */
function mostrarTooltipTipoEncargo(pObjeto) {

	if (pObjeto.selectedIndex != -1 && pObjeto.value != "") {
		MostrarTooltipPosicionado(pObjeto, 'tooltip1');
		document.getElementById('tooltip1').style.top = pObjeto.offsetTop
				- pObjeto.offsetHeight + "px";
	}
}

/*
 * Funcion para posicionar de forma correcta el tooltip en la parte de abajo del
 * combo clave
 */
function mostrarTooltipClaveAbajo(pObjeto) {
	if (pObjeto.value != "") {
		MostrarTooltipPosicionado(pObjeto, 'tooltip2');
		document.getElementById('tooltip2').style.top = pObjeto.offsetTop
		+ pObjeto.offsetHeight + "px";
	}
}

/*
 * Funcion que inicia la busqueda de talleres en linea directa
 */
 function buscarCita(){
	var action = actionInicializaCitas;
	var idProfesional = document.getElementById('encargoView.proveedor.id').value;
    action = action + "?mesSeleccionado=&anioSeleccionado=&idTallerSeleccionado=" + idProfesional;
	action = action + "&tipoServicio=" + TIPOENCARGOFOTOPERITACION;

	var valor = lanzarVentana(action,500,200);
	
 	if(valor != null && valor != undefined){
		// rellenamos la fecha deencargo
 		if(parent.document.getElementById('encargoView.fecRealizacionEncargo')){
 			parent.document.getElementById('encargoView.fecRealizacionEncargo').value=valor;
 			setValue('encargoView.fecRealizacionEncargo',valor);
 		}
 		document.getElementById('encargoView.fecMovimiento').value=valor;
 		
		// rellenamos la fecha limite si no existe
		if (document.getElementById("encargoView.fecLimiteEncargo") != undefined &&
			document.getElementById("encargoView.fecLimiteEncargo").value == "") {
			document.getElementById("encargoView.fecLimiteEncargo").value = aumentaDiasFecha(valor,document.getElementById("encargoView.maxNumDiasEncargo").value);					
		} 
 	}
 }

/* Funcion que se llama al finalizar la carga de la pagina dEncargo.jsp */
function onLoadPaginaDEncargo() {
	var idProfesional = document.getElementById('encargoView.proveedor.id').value;
    
	if (idEncargo != "") {
		seleccionarCombosIndice('encargoView.tipoEncargoView.id', idEncargo,
				document.forms(0));
	}
	if (idProfesional != "") {
		// deshabilitar imagenes
		document.getElementById('imgBusqLocalidad').disabled = true;
	} else {
		document.getElementById('imgBusqLocalidad').disabled = false;
	}

	// control psn
	if (idJuzgado == "") {
		// pnsFisicaJuridicaEncargo(document.getElementById('idTipoIdentificacionEncargo').value);
	}

	if (swConsulta == valorSi) {
		// se deshabilitan todos los campos
		pestannaEncargoModoConsulta();

		// se habilita el campo observaciones y el importe estimacion
		if (swModoModificacion == valorSi) {
			document.getElementById('encargoView.observacion').disabled = false;
			document.getElementById('encargoView.estimacionEncargo').disabled = false;
			document.getElementById('encargoView.claveSalida.id').disabled = false;
			document.getElementById('encargoView.motivoEncargo.id').disabled = false;
		}
	} else {
		// si la familia es de autos, se deshabilita Compromiso Pago
		if (idFamilia == idFamiliaAutos) {
			document.getElementById('encargoView.swCompromisoPago').disabled = false;
		}
	}
	
	// Parte de la fotoperitacion
	if (altaCita == 'false'){
		if(confirm(texto)){
            document.forms[0].action = actionGuardarEncargoProfesional;
            submitForm(document.forms[0],null,null); 
    	} else {
    		window.close();
    	}
	}
}

// FINAL DENCARGO
// //////////////////////////////////////////////////////////////////////////////////////////////////
