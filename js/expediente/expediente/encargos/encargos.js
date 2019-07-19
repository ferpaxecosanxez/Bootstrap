// ///////////////////////////////////////////////////////////////////////////////////////////////////
// ALTAENCARGOS 
// ///////////////////////////////////////////////////////////////////////////////////////////////////

/* Gestion pestanna datos entidad */
function pestannaEntidad(tab) {
	var validoPrueba = validarPestannaEncargo();
	if (validoPrueba) {
		selectTab = changeTabIframe(tab, actionIniciarDatosEntidad,
				window.frames['iTabContent'].document.forms[0], null,
				'iTabContent');
	}
}

/* Gestion pestanna datos profesional */
function pestannaProfesional(tab) {
	var validoPrueba = validarPestannaEncargo();
	if (validoPrueba) {
		selectTab = changeTabIframe(tab, actionIniciarDatosProfAsignado,
				window.frames['iTabContent'].document.forms[0], null,
				'iTabContent');
	}
}

/* Validaciones al cambiar de pestañas */
function validarPestannaEncargo() {
	if (selectTab == "tab0_DAT") {
		var idNivelEntidad = window.frames['iTabContent'].document
				.getElementById('encargoView.nivelExpedienteEntidad.id').value;
		var idObjetoEntidad = window.frames['iTabContent'].document
				.getElementById('idEntidad').value;
		var idTipoEncargo = window.frames['iTabContent'].document
				.getElementById('encargoView.tipoEncargo.id').value;
		var idLugarEncargo = window.frames['iTabContent'].document
				.getElementById('encargoView.tipoLugarEncargo.id').value;

		if (idTipoEncargo == "") {
			alert(messajeValidacionTipoEncargo);
			return false;
		}

		if (idNivelEntidad == "") {
			alert(messajeValidacionNivelEntidad);
			return false;
		}

		if (idObjetoEntidad == "") {
			alert(messajeValidacionObjetoEntidad);
			return false;
		}

		if (idLugarEncargo == "") {
			alert(messajeValidacionLugarRealizacionEncargo);
			return false;
		} else {
			if (idLugarEncargo == tipoLugarJuzgado) {
				var idJuzgadoEncargo = window.frames['iTabContent'].document
						.getElementById('encargoView.juzgado.id').value;
				if (idJuzgadoEncargo == "") {
					alert(messajeValidacionLugarRealizacionEncargo);
					return false;
				}
			} else if ((idLugarEncargo == tipoLugarHospital)
					|| (idLugarEncargo == tipoLugarTaller)) {
				var idProveedor = window.frames['iTabContent'].document
						.getElementById('encargoView.proveedor.id').value;
				if (idProveedor == "") {
					alert(messajeValidacionLugarRealizacionEncargo);
					return false;
				}
			}
		}
	}
	return true;
}

// FINALTA ENCARGOS
// //////////////////////////////////////////////////////////////////////////////////////////////////

// ENCARGOPROFESIONALCONSULTA
// ////////////////////////////////////////////////////////////////////////
/* Consulta datos encargo */
function enlaceEncargoProf(id) {

	if (swApertura == valorNo) {
		window.returnValue = [ id, "consulta" ];
		window.close();
	} else {
		var pag = actionInicializarEncargo;
		pag = pag + "?encargoView.id=" + id;
		// abrimos la ventana de encargos a profesionales
		var valor = lanzarVentana(pag, 800, 620);
		// se recarga la pagina de consulta al volver de la modal del alta de
		// encargo
		consultarDependencias(document
				.getElementById('encargoView.swEncargoDepediente'));
	}
}

/* Funcion para crear un nuevo encargo */
function nuevoEncargoProf() {
	var pag = actionInicializarEncargo;
	pag = pag + '?encargoView.idNivelEntidadOrdenante='+idNivelEntidadOrdenante;
	pag = pag + '&encargoView.idEntidadOrdenante='+idEntidadOrdenante;
	var valor = lanzarVentana(pag, 800, 780);
	// se recarga la pagina de consulta
	consultarDependencias(document
			.getElementById('encargoView.swEncargoDepediente'));
}

/* Consulta acciones legales dependientes */
function consultarDependencias(pObjeto) {
	if (pObjeto.checked) {
		// se realiza la consulta
		submitForm(document.forms[0], null, null);
	} else {
		var action = actionConsultaEncargoProf;
		document.forms(0).action = action;
		// se realiza la consulta
		submitForm(document.forms[0], null, null);
	}
}

function cerrarEncargoConsulta() {
	window.returnValue = res;
	window.close();
}

// FIN ENCARGOPROFESIONALCONSULTA
// //////////////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// DPROFESIONAL
// ///////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * Función para abrir la ventana de profesional Relación Encargos una vez q los
 * datos han sido validados
 */
function comprobacionDatos() {
	if (profesionalSelec == 0) {
		alert(messajeSeleccionarProf);
	} else {
		submitForm(document.forms[1]);
	}
}

/* Función que muestra el detalle del profesional seleccionado */
function mostrarDetalle(pag, profBus, idProvAmbito) {
	if (idProveedor != "") {
		var pag = actionAbrirDetalleProfesional;
		pag = pag + "?idProveedor=" + idProveedor + "&idProveedorAmbito="
				+ idProveedorAmbito;
		var valor = lanzarVentana(pag, 700, 800);
	} else {
		alert(messajeErrorDetalle);
	}
}

/* Función que muestra la consulta de encargos por años */
function consultarEncargos() {
	if (idProveedor != "") {
		var pag = actionIniConsultaRelacionEncargosProf + '?idProveedor='
				+ idProveedor;
		var valor = lanzarVentana(pag, 650, 400);

		if (valor != undefined) {
			document.getElementById('numEncargos').value = valor[0];
		}
	} else {
		alert(messajeErrorEncargos);
	}
}

/* Función para seleccionar un profesional */
function buscarProfesional() {
	var pag = actionIniConsultaProf;
	pag = pag + "?idTipoProveedor="
			+ document.getElementById('encargoView.tipoProveedor.id').value;
	pag = pag + '&idLugarEncargo=';
	pag = pag + '&apelsRazon='
			+ document.getElementById('encargoView.nombreProveedor').value;
	pag = pag + '&disableIdTipoProveedor=1';
	pag = pag
			+ '&localidadSel='
			+ document
					.getElementById('encargoView.proveedorAmbitoRela.idLocalidad.descripcion').value
	pag = pag
			+ '&codPostalAmbito='
			+ document
					.getElementById('encargoView.proveedorAmbitoRela.codPostal.codPostal').value;
	pag = pag
			+ '&localidadAmbito='
			+ document
					.getElementById('encargoView.proveedorAmbitoRela.idLocalidad.descripcion').value;
	pag = pag
			+ '&idProvinciaAmbito='
			+ document
					.getElementById('encargoView.proveedorAmbitoRela.provincia.id').value;
	var valor = lanzarVentana(pag, 700, 650);
	if (valor != undefined) {
		document.getElementById('encargoView.tipoProveedor.id').value = valor[2];

		// se recarga la pantalla con los datos del proveedor seleccionado
		var action = actionReloadProfesional;
		action = action + "?encargoView.proveedorRela.id=" + valor[0]
				+ "&encargoView.proveedorAmbitoRela.id=" + valor[1];
		document.forms[0].action = action;
		submitFormActionMsg(document.forms[0], action, null, 'iTabContent',
				null);
	}
}

/* Función para habilitar/deshabilitar las imagenes */
function mostrarOcultarImgs(flag) {
	if (flag == true) {
		document.forms[0].imgBusqLocalidad.disabled = true;
		document.forms[0].imgBusqLocalidadAmbito.disabled = true;
	} else {
		document.forms[0].imgBusqLocalidad.disabled = false;
		document.forms[0].imgBusqLocalidadAmbito.disabled = false;
	}
}

/* Funcion que se llama al finalizar la carga de la pagina dProfesional.jsp */
function onLoadPaginaDProfesional() {
	// TODOS LOS CAMPOS DE LECTURA
	deshabiltarAllForm(document.forms(0));

	// se permite la escritura en nombre y localidad
	if (idProveedor == "") {
		document.getElementById('encargoView.nombreProveedor').disabled = false;
		document
				.getElementById('encargoView.proveedorAmbitoRela.idLocalidad.descripcion').disabled = false;
	}

	// se deshabilitan los enlaces de las imagenes
	mostrarOcultarImgs(true);

	if (swConsulta == valorSi) {

		if ((swAsignarProf == valorSi) || (swTramitador == valorSi)) {
			if ((swModificacion == valorSi) && (idClavesSalida == '6')
					&& (swTipoModificacion == idModSalida)) {
				pestannaProfesionalModoConsulta(false);
			} else {
				// se deshabilitan todos los campos
				pestannaProfesionalModoConsulta(true);
			}
		} else {
			// se deshabilitan todos los campos
			pestannaProfesionalModoConsulta(true);
		}
	} else {
		// se comprueba si el lugar es otros domicilios para obtener el codigo
		// postal
		if (idLugarEncargo == LUGAROTROSDOMICILIOS) {
			document.getElementById('encargoView.proveedorAmbitoRela.codPostal').value = codPostal;
			document
					.getElementById('encargoView.proveedorAmbitoRela.idLocalidad.descripcion').value = localidad;
			document.getElementById('encargoView.proveedorAmbitoRela.provincia.id').value = idProvincia;
		}
	}
}

function limpiarCampos() {
	if (document.forms[0]['encargoView.proveedorRela.id'] != null)
		document.forms[0]['encargoView.proveedorRela.id'].value = '';
	if (document.forms[0]['encargoView.proveedorAmbitoRela.id'] != null)
		document.forms[0]['encargoView.proveedorAmbitoRela.id'].value = '';
	if (document.forms[0]['encargoView.proveedorRela.tipoIdentificador.id'] != null)
		document.forms[0]['encargoView.proveedorRela.tipoIdentificador.id'].selectedIndex = 0;
	if (document.forms[0]['encargoView.proveedorRela.personaFisica.tipoIdentificador.id'] != null)
		document.forms[0]['encargoView.proveedorRela.personaFisica.tipoIdentificador.id'].selectedIndex = 0;
	if (document.forms[0]['encargoView.proveedorRela.personaJuridica.tipoIdentificador.id'] != null)
		document.forms[0]['encargoView.proveedorRela.personaJuridica.tipoIdentificador.id'].selectedIndex = 0;
	if (document.forms[0]['encargoView.proveedorRela.docIdent'] != null)
		document.forms[0]['encargoView.proveedorRela.docIdent'].value = '';
	if (document.forms[0]['encargoView.proveedorRela.personaFisica.docIdent'] != null)
		document.forms[0]['encargoView.proveedorRela.personaFisica.docIdent'].value = '';
	if (document.forms[0]['encargoView.proveedorRela.personaJuridica.docIdent'] != null)
		document.forms[0]['encargoView.proveedorRela.personaJuridica.docIdent'].value = '';
	document.forms[0]['encargoView.nombreProveedor'].value = '';
	document.forms[0]['encargoView.proveedorRela.domicilioDefecto.localidad'].value = '';
	document.forms[0]['encargoView.proveedorRela.domicilioDefecto.provincia.id'].value = '';
	document.forms[0]['encargoView.numEncargosProveedor'].value = '';
	document.forms[0]['encargoView.numEncargosNoCerradosProveedor'].value = '';
	document.forms[0]['encargoView.proveedorAmbitoRela.provincia.id'].value = '';
	document.forms[0]['encargoView.proveedorAmbitoRela.idLocalidad.descripcion'].value = '';
	document.forms[0]['encargoView.proveedorAmbitoRela.codPostal.codPostal'].value = '';
}
// FIN DPROFESIONAL.JSP
// //////////////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// DGESTORINTERNO.JSP
// ///////////////////////////////////////////////////////////////////////////////////////////////////

/* Funcion que se llama al finalizar la carga de la pagina dGestorInterno.jsp */
function onLoadPaginaDGestorInterno() {
	if (swModificacion == "0" && swOpModificar == "1") {
		document.forms[0].btLupa.disabled = true;
		document.forms[0].btLimpiarProf.disabled = true;
	}
}

// FIN DGESTORINTERNO.JSP
// //////////////////////////////////////////////////////////////////////////////////////////////////
