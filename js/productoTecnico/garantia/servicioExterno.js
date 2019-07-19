function bloqueaMovimientosNotificar(obj) {
	if (obj.checked == true) {
		
		document.getElementById('garantiaView.prodGaranProveView.swEnviarAltas').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swEnviarBajas').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swEnviarModif').checked = false;
		
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifAlta').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifBaja').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifSuplo').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifRenova').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifAnula').checked = false;
		document.getElementById('garantiaView.prodGaranProveView.swMovsNotifRehabil').checked = false;

		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swEnviarAltas_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swEnviarBajas_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swEnviarModif_'), false, 1, 0);
		
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifAlta_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifBaja_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifSuplo_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifRenova_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifAnula_'), false, 1, 0);
		propertyCheck(document.getElementById('garantiaView.prodGaranProveView.swMovsNotifRehabil_'), false, 1, 0);
		
		jQuery('#mvtoNotif').hide();
		jQuery('#mvtoNotif2').hide();
		
	}
	else {
		jQuery('#mvtoNotif').show();
		jQuery('#mvtoNotif2').show();
	}
}

function compruebaEnvioCartera(obj) {
	if (obj.checked == true) {
		if (document.getElementById('garantiaView.prodGaranProveView.swEnviarCartera').checked == true) {
			obj.checked = false;
			propertyCheck(document.getElementById(obj.name + "_"), false, 1, 0);
			return false;
		}
	}
}