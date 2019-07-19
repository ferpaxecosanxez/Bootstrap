function callAjax(){
	swDatosEconomicos = jQuery(":input[name='AltaTarifaView.swDatEco']");
	
	if(swDatosEconomicos.val() == '0'){
		showHide('datosEconDiv',false);
		primaMinima = jQuery(":input[name='listaDatosEconView[0].primaMinima']");
		primaMaxima = jQuery(":input[name='listaDatosEconView[0].primaMaxima']");
		if(primaMinima){
			primaMinima.val("");
		}
		if(primaMaxima){
			primaMaxima.val("");
		}
		retrieveURLPorPost(URLDE + '?false=true','cattarifaForm',false);
	}else{
		showHide('datosEconDiv',true);
		retrieveURLPorPost(URLDE + '?init=true','cattarifaForm',false);
	}

}