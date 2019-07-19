function copiaDescripcionUnidadTramo() {
	jQuery('#comisionValorGaranView\\.unidadTramosComisionView\\.descripcion').val(jQuery('#comisionValorGaranView\\.unidadTramosComisionView\\.codigo option:selected').text());
}

function setComboUnidad(indice) {
	jQuery('#comisionValorGaranView\\.unidadTramosComisionView\\.id').val(jQuery("#unidadTramo"+indice).val());
}