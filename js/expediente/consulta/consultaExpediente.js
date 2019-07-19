/*
 * FUNCIONES JAVASCRIPT PARA LA CONSULTA DEL EXPEDIENTE	
 */

function busquedaDirecta(mensaje) {
	// estamos en consulta directa
	var expediente = document.getElementById('estructuraConsultaView.nroExpediente').value;

	if (expediente == "") {
		alert(mensaje);
	} else {
		muestraCarga();
		document.getElementById('estructuraConsultaView.consultaDirecta').value = true;
		document.forms[0].action = actionBusquedaDirecta;
		submitForm(document.forms[0], null, 'iAreaTrabajo');
	}
}

function busquedaPorCriterios() {
	if (verificarDatosConsultaGeneral(errorCriterio, errorProf, errorRol, errorRefEco, errorLug1)
			&& verificarDatosConsultaEspecifica(errorCriterio, errorVia, errorMatricula, familiaAuto, familiaHogar, familiaIndustrial, errorLug2, errorUbicacion)) {		
		document.getElementById('estructuraConsultaView.consultaDirecta').value = false;
		document.forms[0].action = actionBusquedaCriterios;
		// Paginación
		document.getElementById('pagina').value = 1;
		document.getElementById('criterioBusqueda').value = "General";
		// document.getElementById('criterioBusqueda').value ="Especifico";
		submitFormActionMsg(document.forms[0], document.forms[0].action, null,
				'iAreaTrabajo', null);
		// Ocultación de los parametros de consulta
		ocultarCriteriosSeleccion();
		// Muestra capa de carga
		muestraCarga();
		// Recalculo del layout
		layOutPantalla();
	}
	return false;
}


/* Función para realizar la busqueda del juzgado */
function buscarJuzgado(ruta) {
	var valor = lanzarVentana(ruta, 700, 650);
	if (valor != undefined) {
		// busqueda de juzgados
		document.getElementById('estructuraConsultaView.idJuzgado').value = valor[0];
		document.getElementById('estructuraConsultaView.nombreJuzgado').value = valor[1];
	}
}

/* Funcion para guardar/cancelar sesion modificacion del expediente */
function finalizarSesionModificacion(url, target, accionAgenda) {
	getPage(url, target);
	// agenda & menu
	menuAgenda(accionAgenda);
}

/*
 * Funcion para mostrar los criterios de busqueda para la familia correspondiente
 */
function mostrarCriteriosFamilia() {

	var idFamiliaBusqueda = document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value;

	if (idFamiliaBusqueda == familiaAuto) {
		mostrarAutos(familiaAuto);
	} else if (idFamiliaBusqueda == familiaHogar) {
		mostrarHogar(familiaHogar);
	} else if (idFamiliaBusqueda == familiaIndustrial) {
		mostrarIndustriales(familiaIndustrial);
	} else if (idFamiliaBusqueda == familiaSalud) {
		mostrarSalud(familiaSalud);
	} else if (idFamiliaBusqueda == familiaVida) {
		mostrarVida(familiaVida);
	} else if (idFamiliaBusqueda == familiaProductoCombinado) {
		mostrarProductoCombinado(familiaProductoCombinado);
	}else{
		ocultarCriteriosFamilias();
	}
}

/* Funcion para ocultar los criterios de seleccion */
function ocultarCriteriosSeleccion() {

	// criterios generales
	document.getElementById('imgcCritGenerales').title = "Expandir";
	document.getElementById('titcCritGenerales').title = "Expandir";
	showHide('cCritGenerales', false);

	// criterio localizacion
	document.getElementById('imgcCritLoca').title = "Expandir";
	document.getElementById('titcCritLoca').title = "Expandir";
	showHide('cCritLoca', false);
}

/* Función para ocultar los criterios específicos para cuando no hay familia seleccionada */
function ocultarCriteriosFamilias(){
	if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesTabla";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesTabla";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesTabla";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesTabla";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesTabla";
	
	showHide('criteriosHogar', false);
	showHide('criteriosIndustriales', false);
	showHide('criteriosAutos', false);
	showHide('criteriosSalud', false);
	showHide('tiposExp', false);
}

/* Funcion para mostrar los criterios de busqueda para AUTOS */
function mostrarAutos() {
	if (document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value != familiaProductoCombinado){
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaAuto;
	}
	//PARA CAMBIAR UN ICONO POR OTRO
	document.getElementById('icoAutos').src = "../../img/icono_cocheSelec.png";
	document.getElementById('icoHogar').src = "../../img/icono_casa.png";
	document.getElementById('icoIndus').src = "../../img/icono_empresa.png";
	document.getElementById('icoSalud').src = "../../img/icoLesionado.png";
	document.getElementById('icoVida').src = "../../img/icono_persona.png";
	
	/*if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesSelected";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesTabla";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesTabla";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesTabla";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesTabla";*/

	showHide('criteriosHogar', false);
	showHide('criteriosIndustriales', false);
	showHide('criteriosAutos', true);
	showHide('criteriosSalud', false);
	showHide('tiposExp', false);

	if (document.getElementById('matriculaIndus') != null)
		document.getElementById('matriculaIndus').disabled = true;
	if (document.getElementById('matriculaAutos') != null)
		document.getElementById('matriculaAutos').disabled = false;

	if (document.getElementById('descRiesgoIndus') != null)
		document.getElementById('descRiesgoIndus').disabled = true;
	if (document.getElementById('descRiesgoHogar') != null)
		document.getElementById('descRiesgoHogar').disabled = true;

}

/* Funcion para mostrar los criterios de busqueda para HOGAR */
function mostrarHogar() {
	if (document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value != familiaProductoCombinado){
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaHogar;
	}
	
	//PARA CAMBIAR UN ICONO POR OTRO
	document.getElementById('icoAutos').src = "../../img/icono_coche.png";
	document.getElementById('icoHogar').src = "../../img/icono_casaSelec.png";
	document.getElementById('icoIndus').src = "../../img/icono_empresa.png";
	document.getElementById('icoSalud').src = "../../img/icoLesionado.png";
	document.getElementById('icoVida').src = "../../img/icono_persona.png";
	
	/*if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesTabla";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesSelected";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesTabla";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesTabla";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesTabla";*/

	showHide('criteriosHogar', true);
	showHide('criteriosIndustriales', false);
	showHide('criteriosAutos', false);
	showHide('criteriosSalud', false);
	showHide('tiposExp', true);

	if (document.getElementById('matriculaIndus') != null)
		document.getElementById('matriculaIndus').disabled = true;
	if (document.getElementById('matriculaAutos') != null)
		document.getElementById('matriculaAutos').disabled = true;

	if (document.getElementById('descRiesgoIndus') != null)
		document.getElementById('descRiesgoIndus').disabled = true;
	if (document.getElementById('descRiesgoHogar') != null)
		document.getElementById('descRiesgoHogar').disabled = false;

}

/* Funcion para mostrar los criterios de busqueda para INDUSTRIALES */
function mostrarIndustriales() {
	if (document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value != familiaProductoCombinado){
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaIndustrial;
	}
	
	//PARA CAMBIAR UN ICONO POR OTRO
	document.getElementById('icoAutos').src = "../../img/icono_coche.png";
	document.getElementById('icoHogar').src = "../../img/icono_casa.png";
	document.getElementById('icoIndus').src = "../../img/icono_empresaSelec.png";
	document.getElementById('icoSalud').src = "../../img/icoLesionado.png";
	document.getElementById('icoVida').src = "../../img/icono_persona.png";
	
	/*if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesTabla";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesTabla";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesSelected";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesTabla";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesTabla";*/

	showHide('criteriosHogar', false);
	showHide('criteriosIndustriales', true);
	showHide('tiposExp', true);
	showHide('criteriosAutos', false);
	showHide('criteriosSalud', false);

	if (document.getElementById('matriculaIndus') != null)
		document.getElementById('matriculaIndus').disabled = false;
	if (document.getElementById('matriculaAutos') != null)
		document.getElementById('matriculaAutos').disabled = true;

	if (document.getElementById('descRiesgoIndus') != null)
		document.getElementById('descRiesgoIndus').disabled = false;
	if (document.getElementById('descRiesgoHogar') != null)
		document.getElementById('descRiesgoHogar').disabled = true;

}

/* Funcion para mostrar los criterios de busqueda para SALUD */
function mostrarSalud() {
	if (document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value != familiaProductoCombinado){
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaSalud;
	}
	
	//PARA CAMBIAR UN ICONO POR OTRO
	document.getElementById('icoAutos').src = "../../img/icono_coche.png";
	document.getElementById('icoHogar').src = "../../img/icono_casa.png";
	document.getElementById('icoIndus').src = "../../img/icono_empresa.png";
	document.getElementById('icoSalud').src = "../../img/icoLesionadoSelec.png";
	document.getElementById('icoVida').src = "../../img/icono_persona.png";
	
	/*if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesTabla";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesTabla";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesTabla";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesSelected";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesTabla";*/

	showHide('criteriosHogar', false);
	showHide('criteriosIndustriales', false);
	showHide('criteriosAutos', false);
	showHide('criteriosSalud', true);
	showHide('tiposExp', false);
}

/* Funcion para mostrar los criterios de busqueda para VIDA */
function mostrarVida() {
	if (document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value != familiaProductoCombinado){
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaVida;
	}
	
	//PARA CAMBIAR UN ICONO POR OTRO
	document.getElementById('icoAutos').src = "../../img/icono_coche.png";
	document.getElementById('icoHogar').src = "../../img/icono_casa.png";
	document.getElementById('icoIndus').src = "../../img/icono_empresa.png";
	document.getElementById('icoSalud').src = "../../img/icoLesionado.png";
	document.getElementById('icoVida').src = "../../img/icono_personaSelec.png";
	
	/*if (document.getElementById('icoAutos') != null)
		document.getElementById('icoAutos').className = "bordesTabla";
	if (document.getElementById('icoHogar') != null)
		document.getElementById('icoHogar').className = "bordesTabla";
	if (document.getElementById('icoIndus') != null)
		document.getElementById('icoIndus').className = "bordesTabla";
	if (document.getElementById('icoSalud') != null)
		document.getElementById('icoSalud').className = "bordesTabla";
	if (document.getElementById('icoVida') != null)
		document.getElementById('icoVida').className = "bordesSelected";*/

	showHide('criteriosHogar', false);
	showHide('criteriosIndustriales', false);
	showHide('criteriosAutos', false);
	showHide('criteriosSalud', false);
	showHide('tiposExp', false);
}

/* Funcion para mostrar los criterios de busqueda para PRODUCTO COMBINADO */
function mostrarProductoCombinado() {
	document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = familiaProductoCombinado;
}

/* Funcion para el control de las fechas */
function controlGestionFechas(pObjeto1, pObjeto2, msg) {

	var param1 = document.getElementById(pObjeto1).value;
	var param2 = document.getElementById(pObjeto2).value;

	if (param2 != "") {
		if (param1 == "") {
			alert(msg);
			document.getElementById(pObjeto2).value = "";
		}
	}
}

/* Funcion para la validacion de las fechas */
function validacionFecha(pObjeto1, pObjeto2, msg) {
	// control fechas
	controlGestionFechas(pObjeto1, pObjeto2, msg)
}

/* Funcion para el control de las matriculas */
function controlTipoMatricula() {
	var param = document
			.getElementById('estructuraConsultaView.idTipoMatricula').value;
	if (param != "") {
		document.getElementById('estructuraConsultaView.matricula').disabled = false;
	} else {
		document.getElementById('estructuraConsultaView.matricula').value = "";
		document.getElementById('estructuraConsultaView.matricula').disabled = true;
	}
}

/* Funcion para el control del los profesionales */
function controlProfesionales() {

	var idProfesional = document
			.getElementById('estructuraConsultaView.idTipoProveedor').value;
	if (idProfesional != "") {

		// se deshabilita el idRol
		document.getElementById('estructuraConsultaView.idRolSntro').disabled = true;
		document.getElementById('estructuraConsultaView.idRolSntro').value = "";
	} else {
		document.getElementById('estructuraConsultaView.idRolSntro').disabled = false;
	}
	controlRolSntro();
}

/* Funcion para el control del los campos nombre y apellidos mediante el rol */
function controlRolSntro() {

	var idRolSntro = document
			.getElementById('estructuraConsultaView.idRolSntro').value;
	if (idRolSntro != "") {

		// se habilitan los campos
		controlDatosPersonalesFigura(false);
	} else {
		controlDatosPersonalesFigura(true);
	}
}

/* Funcion para la busqueda de una figura del sistema */
function seleccionFiguraSistema(actionPsn, actionProf) {

	var valor;
	var idProfesional = document
			.getElementById('estructuraConsultaView.idTipoProveedor').value;

	if (idProfesional != "") {
		actionProf = actionProf + '?idTipoProveedor=' + idProfesional;
		actionProf = actionProf + '&idComboProf=' + idProfesional;
		actionProf = actionProf
				+ "&idTipoIdentificacion="
				+ document
						.getElementById('estructuraConsultaView.idTipoIdentificacion').value;
		actionProf = actionProf
				+ "&numeroIdentificacion="
				+ document
						.getElementById('estructuraConsultaView.numeroIdentificacion').value;
		valor = lanzarVentana(actionProf, 700, 650);
	} else {
		valor = lanzarVentana(actionPsn, 600, 450);
	}

	if (valor != undefined) {
		if (idProfesional != "") {
			document.getElementById('estructuraConsultaView.idProveedor').value = valor[0];
			document.getElementById('estructuraConsultaView.idPersona').value = "";
		} else {
			document.getElementById('estructuraConsultaView.idPersona').value = valor[0];
			document.getElementById('estructuraConsultaView.idProveedor').value = "";
		}
	}

	return valor;
}

/* Funcion para deshabilitar/habilitar los campos de datos personales */
function controlDatosIdentificacionFigura(flag) {
	document.getElementById('estructuraConsultaView.idTipoIdentificacion').disabled = flag;
	document.getElementById('estructuraConsultaView.numeroIdentificacion').disabled = flag;
}

/* Funcion para deshabilitar/habilitar los campos de datos personales */
function controlDatosPersonalesFigura(flag) {
	document.getElementById('estructuraConsultaView.nombre').disabled = flag;
	document.getElementById('estructuraConsultaView.apellido1').disabled = flag;
	document.getElementById('estructuraConsultaView.apellido2').disabled = flag;
}

/* Funcion para control tipo identificacion */
function controlTipoIdentificacion() {
	var idTipoIdentificacion = document
			.getElementById('estructuraConsultaView.idTipoIdentificacion').value;
	var numeroIdent = document
			.getElementById('estructuraConsultaView.numeroIdentificacion').value;

	if ((idTipoIdentificacion != "") && (numeroIdent != "")) {
		controlDatosIdentificacionFigura(true);
		controlDatosPersonalesFigura(true);
	} else {
		controlDatosIdentificacionFigura(false);
		controlRolSntro();
	}
}

/* Funcion para la verificacion del formulario de consulta */
function verificarDatosConsultaGeneral(errorCrit, errorProf, errorRol,
		errorRef, errorLug1) {
	return comprobarDatosConsultaGeneral(errorProf, errorRol, errorRef,
			errorLug1);
}

/* Funcion para validar los datos Si son correctos, se envia el formulario */

function comprobarDatosConsultaGeneral(errorProf, errorRol, errorRef, errorLug1) {

	var correcto = true;
	var msg = "";

	if (document.forms(0).SWEXPDEFINITIVO[1].checked) {
		document.getElementById('estructuraConsultaView.swExpDefinitivo').value = 1;
	} else {
		document.getElementById('estructuraConsultaView.swExpDefinitivo').value = 0;
	}

	var idProfesional = document
			.getElementById('estructuraConsultaView.idTipoProveedor').value;
	var idRolSntro = document
			.getElementById('estructuraConsultaView.idRolSntro').value;
	var idTipoIdentificacion = document
			.getElementById('estructuraConsultaView.idTipoIdentificacion').value;
	var nroIdentificacion = document
			.getElementById('estructuraConsultaView.numeroIdentificacion').value;
	var nombre = document.getElementById('estructuraConsultaView.nombre').value;
	var idRefEconomica = document
			.getElementById('estructuraConsultaView.idRefEconomica').value;
	var refEconomica = document
			.getElementById('estructuraConsultaView.refEconomica').value;
	var idLugarEncargo = document
			.getElementById('estructuraConsultaView.idLugarEncargo').value;
	var lugarEncargo = document
			.getElementById('estructuraConsultaView.lugarEncargo').value;

	// si se ha seleccionado un rol, deber? informar el nombre

	if (idRolSntro != "") {
		if (nombre == "") {
			correcto = false;
			document.getElementById('estructuraConsultaView.nombre').disabled = false;
			document.getElementById('estructuraConsultaView.nombre').focus();
			msg = msg + errorRol + '\n';
		}
	}

	// si se ha seleccionado un profesional, deber? informarse el doc ident y el
	// nro de ident
	if (idProfesional != "") {
		if ((idTipoIdentificacion == "") || (nroIdentificacion == "")) {
			correcto = false;
			document.getElementById(
					'estructuraConsultaView.idTipoIdentificacion').focus();
			msg = msg + errorProf + '\n';
		}
	}

	// si se ha seleccionado una referencia economica, deber? informarse la
	// referencia
	if (idRefEconomica != "") {
		if (refEconomica == "" || refEconomica == null) {
			correcto = false;
			document.getElementById('estructuraConsultaView.refEconomica')
					.focus();
			msg = msg + errorRef + '\n';
		}
	}

	// si se ha seleccionado un lugar de Encargo en el combo, deber? informarse
	// tambien la caja de texto
	if (idLugarEncargo != "") {
		if (lugarEncargo == "" || lugarEncargo == null) {
			correcto = false;
			document.getElementById('estructuraConsultaView.lugarEncargo')
					.focus();
			msg = msg + errorLug1 + '\n';
		}
	}

	if (!correcto) {
		alert(msg);
	}
	return correcto;
}

/* Funcion para la verificacion del formulario de consulta */
function verificarDatosConsultaEspecifica(errorCrit, errorVia, errorMatricula,
		familiaAuto, familiaHogar, familiaIndustrial, errorLug2, errorUbicacion) {
	return comprobarDatosConsultaEspecifica(errorVia, errorMatricula,
			familiaAuto, familiaHogar, familiaIndustrial, errorLug2,
			errorUbicacion);
}

/* Funcion para validar los datos Si son correctos, se envia el formulario */

function comprobarDatosConsultaEspecifica(errorVia, errorMatricula,
		familiaAuto, familiaHogar, familiaIndustrial, errorLug2, errorUbicacion) {

	var correcto = true;
	var msg = "";
	var idFamilia = document
			.getElementById('estructuraConsultaView.idFamiliaBusqueda').value;

	if (document.forms(0).SWEXPDEFINITIVO[1].checked) {
		document.getElementById('estructuraConsultaView.swExpDefinitivo').value = 1;
	} else {
		document.getElementById('estructuraConsultaView.swExpDefinitivo').value = 0;
	}

	var idTipoVia = document.getElementById('idTipoVia').value;
	var idVia = document.getElementById('idVia').value;
	var idTipoMatricula = document
			.getElementById('estructuraConsultaView.idTipoMatricula').value;
	var matricula = document.getElementById('matriculaAutos').value;
	var lugar = "";

	// Hay varias instacias de matricula dependiendo de la familia
	var listaE = document.getElementsByName('estructuraConsultaView.matricula');
	for ( var i = 0; i < listaE.length; i++) {
		listaE[i].value = document
				.getElementById('estructuraConsultaView.matricula').value;
	}

	// Hay varias instacias de lugarOcurrencia dependiendo de la familia
	var listaE = document
			.getElementsByName('estructuraConsultaView.lugarOcurrencia');
	for ( var i = 0; i < listaE.length; i++) {
		listaE[i].value = lugar;
	}

	if ((idTipoVia != "" && idVia == "") || (idTipoVia == "" && idVia != "")) {
		correcto = false;
		document.getElementById('idTipoVia').focus();
		msg = msg + errorVia + '\n';
	}

	// Si se selecciona el tipo de matricula debe rellenarse la matricula
	if (idTipoMatricula != "") {
		if (matricula == "") {
			correcto = false;
			document.getElementById('estructuraConsultaView.matricula').focus();
			msg = msg + errorMatricula + '\n';
		}
	}

	if (!correcto) {
		alert(msg);
	}
	return correcto;
}

/* Funcion para la exportacion de los datos */
function exportacionDatos(mime, sAccion) {

	var actionOld = document.forms[0].action;
	document.forms[0].exportacion.value = "1";
	document.forms[0].office.value = mime;
	document.forms[0].target = "_blank";
	document.forms[0].action = sAccion;
	document.forms[0].submit();
	document.forms[0].exportacion.value = "0";
	document.forms[0].target = "_self";
	document.forms[0].action = actionOld;
	document.forms[0].office.value = "";
}

/* Funci?n para seleccionar un profesional */
function buscarProfesionalEncargo(pag, idLugarEncargo) {

	pag = pag + '?idLugarEncargo=' + idLugarEncargo;
	pag = pag + '&disableIdTipoProveedor=1';
	var valor = lanzarVentana(pag, 700, 650);
	if (valor != undefined) {

		// datos profesional seleccionado
		document.getElementById('estructuraConsultaView.idProfesionalEncargo').value = valor[0];
		document.getElementById('estructuraConsultaView.lugarEncargo').value = valor[3];
	}
}

/* Funci?n para seleccionar las personas */
function buscarPersonaSistema(pag) {

	var valor = lanzarVentana(pag, 600, 450);
	if (valor != undefined) {

		// datos persona seleccionado
		document.getElementById('estructuraConsultaView.idOtraPsnEncargo').value = valor[0];
		document.getElementById('estructuraConsultaView.lugarEncargo').value = valor[2];
	}
}

/* Funci?n para seleccionar las personas */
function buscarJuzgadoSistema(pag) {

	var valor = lanzarVentana(pag, 700, 650);
	if (valor != undefined) {

		// datos juzgado seleccionado
		document.getElementById('estructuraConsultaView.idJuzgadoEncargo').value = valor[0];
		document.getElementById('estructuraConsultaView.lugarEncargo').value = valor[1];
	}
}

/* Funcion para limpiar los datos del lugar encargo */
function cleanLugarEncargo() {

	document.getElementById('estructuraConsultaView.idProfesionalEncargo').value = null;
	document.getElementById('estructuraConsultaView.idOtraPsnEncargo').value = null;
	document.getElementById('estructuraConsultaView.idJuzgadoEncargo').value = null;
	document.getElementById('estructuraConsultaView.lugarEncargo').value = "";
}

/* Metodo que al detectar que se pulsa la tecla ENTER lanza la busqueda directa */
function pulsarEnter() {
	if (window.event.keyCode == 13) {
		document.getElementById("estructuraConsultaView.nroExpediente")
				.onblur();
		document.getElementById("botonsiguiente").onclick();
	}
}

/* Funcion que limpia los combos de una lista pasando el nombre de los elementos a limpiar como array de strings*/
function limpiarCamposLista(elementos){
	for(var i= 0;i < elementos.length; i++){
		if (document.getElementById(elementos[i]) != null){
			document.getElementById(elementos[i]).value = "";
		}
  }
}

/* Funcion que limpia los valores de la sección de Localización por Criterios Especificos de Producto */
function limpiarCriteriosEspecificos(){
	var elementos = ['estructuraConsultaView.idProducto'
	,'estructuraConsultaView.idEstadoExpediente'
	,'estructuraConsultaView.idProductoAuto'
	,'estructuraConsultaView.idTipoMatricula'
	,'estructuraConsultaView.idTipoTramite'
	,'matriculaIndus'
	,'matriculaAutos'
	,'estructuraConsultaView.nroCertificado'
	,'estructuraConsultaView.idTramiteAuto'
	,'estructuraConsultaView.idNaturAuto'
	,'descRiesgoIndus'
	,'descRiesgoHogar'
	,'estructuraConsultaView.idProductoHogar'
	,'estructuraConsultaView.idTramiteHogar'
	,'estructuraConsultaView.idNaturHogar'
	,'estructuraConsultaView.idProductoIndus'
	,'estructuraConsultaView.idCausaStro'
	,'estructuraConsultaView.idTipoDannio'
	,'estructuraConsultaView.idNcCuadroReembolso'
	,'estructuraConsultaView.tarjetaSanitaria']; 
	limpiarCamposLista(elementos);
}

/* Funcion que limpia los valores de la sección de Localización por Criterios Especificos de Producto */
function limpiarCriteriosHitosReclam(){
	selecNinguno('estructuraConsultaView.lstIdHitoMulti');
	selecNinguno('estructuraConsultaView.lstIdReclam');
	var elementos = ['estructuraConsultaView.tipoConsulta'
	,'estructuraConsultaView.idHitoProveedor'
	,'estructuraConsultaView.nroExpedienteHito'
	,'estructuraConsultaView.fecDesdeHito'
	,'estructuraConsultaView.fecHastaHito'	
	,'estructuraConsultaView.refReclam'
	,'estructuraConsultaView.estadoReclam']; 
	limpiarCamposLista(elementos);	
}

function selecTodos(obj) {
	elem=document.getElementById(obj).options;
	for(i=0;i<elem.length;i++){
		elem[i].selected=true;
	}	
}

function selecNinguno(obj) {
	elem=document.getElementById(obj).options;
	for(i=0;i<elem.length;i++){
		elem[i].selected=false;
	}	
}

function busquedaProducto() {
	var url = accionBusquedaProducto
			+ "?idEstadoProd=1&filtroAcceso=1"
//			+ "&famProductos="
//			+ document
//					.getElementById('estructuraConsultaView.idFamiliaBusqueda').value
			+ "&codProdTec="
			+ document.getElementById('estructuraConsultaView.codProducto').value
//			+ "&descripcion="
//			+ document.getElementById('estructuraConsultaView.descProducto').value;
	muestraCarga();
	var valor = lanzarVentana(url, 700, 550);
	ocultaCarga();

	if (valor != null) {
		document.getElementById('estructuraConsultaView.idProducto').value = valor[0];
		document.getElementById('estructuraConsultaView.codProducto').value = valor[1];
		document.getElementById('estructuraConsultaView.descProducto').value = valor[2];
		document.getElementById('estructuraConsultaView.idFamiliaBusqueda').value = valor[6];
		mostrarCriteriosFamilia()
	} else {
		document.getElementById('estructuraConsultaView.idProducto').value = '';
		document.getElementById('estructuraConsultaView.codProducto').value = '';
		document.getElementById('estructuraConsultaView.descProducto').value = '';
	}
}

/* Funcion para mostrar las naturalezas */
function mostrarNaturalezas(idFamiliaProd, form, idTipoTramite, idTramiteAjax){

  var criterioSel = document.getElementById(idFamiliaProd).value;
  var action = actionAjax + '?idFamiliaBusquedaAjax='+ document.getElementById(idFamiliaProd).value;  
  
  // se recargan las naturalezas mediante ajax  
  if(criterioSel == criterioAutos){
    retrieveURLParameter(action,form,idTipoTramite,idTramiteAjax); 
  } 
  else if(criterioSel == criterioHogar){
	  retrieveURLParameter(action,form,idTipoTramite,idTramiteAjax); 
  } 

  
}

/* FIN FUNCIONES JAVASCRIPT PARA LA CONSULTA DEL EXPEDIENTE */