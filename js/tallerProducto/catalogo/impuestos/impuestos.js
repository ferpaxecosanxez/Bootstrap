function cargaValorDefecto() {
	var idImpuestoEfectivo = jQuery('[name="impuestosEfec.id"]').val();
	
	jQuery('[name="fechaOld"] > option').each(function() {
		if (jQuery(this).val() == idImpuestoEfectivo) {
			jQuery(this).attr('selected', true);
			
			jQuery('[name="impuestosEfec.fecEfecto"]').val(jQuery(this).text());
		}
	    
	});
}