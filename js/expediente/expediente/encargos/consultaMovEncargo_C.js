///////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSULTAMOVENCARGO_C.JSP 
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Gestion pestanna datos encargos */
function pestannaEncargoConsulta(tab) {
	selectTab = changeTabIframe(tab, accionDatosEncargoConsulta,
			window.frames['iTabContent'].document.forms[0], null, null);
}

/* Gestion pestanna datos entidad */
function pestannaEntidad(tab) {
	selectTab = changeTabIframe(tab, accionDatosEntidadConsulta,
			window.frames['iTabContent'].document.forms[0], null, null);
}

/* Gestion pestanna datos profesional */
function pestannaProfesional(tab) {
	selectTab = changeTabIframe(tab, accionDatosProfesionalConsulta,
			window.frames['iTabContent'].document.forms[0], null, null);
}

/* Gestion pestanna datos valoracion */
function pestannaValoracion(tab) {
	selectTab = changeTabIframe(tab, accionDatosValoracionConsulta,
			window.frames['iTabContent'].document.forms[0], null, null);
}

/* Gestion pestanna datos honorarios */
function pestannaHonorario(tab) {
	selectTab = changeTabIframe(tab, accionDatosHonorariosConsulta,
			window.frames['iTabContent'].document.forms[0], null, null);
}

// FINAL CONSULTAMOVENCARGO_C.JSP
// //////////////////////////////////////////////////////////////////////////////////////////////////
