function submit(form) {
	submitForm(form,null,'iAreaTrabajo');
}

function irDetalle(form, path, id){
	form.action = path;
	jQuery('#idCodigoImagen').val(id);
	form.submit();
}

function limpiarConsultaForm(form, evitarCampos) {
	limpiar(form, null);
}

function anular(form, path){
	form.action = path;
	form.submit();
}

function rehabilitar(form, path){
	form.action = path;
	form.submit();
}

function irDetalle(form, path, id){
	form.action = path;
	jQuery('#idCodigoImagen').val(id);
	form.submit();
}

function irModificar(form){
	form.submit();
}

function visualizarImagen(tipo, path) {
	if (tipo == "anverso")
		path += "?tipo=anverso";
	else
		path += "?tipo=reverso";
		
	window.open(path,'', 'center=yes,height=255,width=250,toolbar=no,directories=no,status=no, menubar=no,scrollbars=no,resizable=no,modal=yes');
}

function defectoSeleccionado() {
	return document.getElementById('imagenTarjSanitariaView.swImagenDefecto').value == 1;
}