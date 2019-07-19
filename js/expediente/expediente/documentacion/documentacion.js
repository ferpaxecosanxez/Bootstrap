function limpiarFormularioDocumentacionExp(){
	limpiar(document.forms[0],camposNoTocar);
	limpiarCombo('idTipoTramite');
	limpiarCombo('idNaturalezas');
}

function asignarValorIdTipoTramite(){
	idTipoTramiteAjax = jQuery(":input[id='idTipoTramiteAjax']").val();
}