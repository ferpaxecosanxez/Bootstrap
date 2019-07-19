function inicializaDatosCombos(){
		var valorFranquicia=document.forms[0].elements('AltaGarantiaView.swCorrecFranq').options[document.forms[0].elements('AltaGarantiaView.swCorrecFranq').selectedIndex].value;
		var valorPrimaMinima=document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value;
		var valorTasa;
		
		if ( document.forms[0].elements('AltaGarantiaView.idTipoTasa').options !== undefined && document.forms[0].elements('AltaGarantiaView.idTipoTasa').options != null ) {
			valorTasa = document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value;
		} else {
			valorTasa = document.getElementById("AltaGarantiaView.idTipoTasa").value;
			select = document.forms[0].elements('tipoTasaSelectId');
			
			for (i=0; i<select.length;i++) {
				if (select[i].value === valorTasa.value) {
					select[i].selected = true;
					break;
				}
			}
		}
		
		showHide('divLoad',true);
	    inicializarTasaFranqPrima(valorTasa,valorPrimaMinima,valorFranquicia);	
	    showHide('divLoad',false);	    	
}

function inicializarTasaFranqPrima(valorTasa,valorPrimaMinima,valorFranquicia){
	var numprimbase=document.getElementById('numdeTas').value;	
	for (var i=0;i<=numprimbase-1;i++) { 					
		// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
		var tasa = "listaFactorPBTasaView["+i+"].tasa";					
		var primaFija = "listaFactorPBTasaView["+i+"].primaFija";	
		var primaMinima = "listaFactorPBTasaView["+i+"].primaMinima";
		if (valorPrimaMinima=="0") setValue(primaMinima,"0");	
		switch(valorTasa){		
			case "1": // no
				setValue(primaFija,"0");
				break;
			case "2": // no
				setValue(primaFija,"0");
				break;
			case "3": // no
				setValue(primaFija,"0");
				break;
			case "4": // si
				setValue(tasa,"0");	
				break;
			case "5": // si
				break;	
			default:}				
	}	
	if(valorFranquicia=="1" && document.getElementById('numdeTasFran')!=null){
		var numFranquicia=document.getElementById('numdeTasFran').value;
		for (var i=0;i<=numFranquicia-1;i++) { 					
			// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
			var tasa = "listaFactorCFTasaView["+i+"].tasa";					
			var primaFija = "listaFactorCFTasaView["+i+"].primaFija";	
			var primaMinima = "listaFactorCFTasaView["+i+"].primaMinima";
			
			//if (valorPrimaMinima=="0") setValue(primaMinima,"0");	
			setValue(primaMinima,"0");
			switch(valorTasa){		
				case "1": // no
					setValue(primaFija,"0");
					break;
				case "2": // no
					setValue(primaFija,"0");
					break;
				case "3": // no
					setValue(primaFija,"0");
					break;
				case "4": // si
					setValue(tasa,"0");	
					break;
				case "5": // si
					break;	
				default:}				
		}		
	}
}

function inicializarTasaFranqPrima(valorTasa, valorPrimaMinima, valorFranquicia) {
	inicializarTasaPrima(valorTasa, valorPrimaMinima);
	inicializarTasaFranq(valorTasa, valorFranquicia)
}

function inicializarTasaPrima(valorTasa, valorPrimaMinima) {
	var numprimbase=document.getElementById('numdeTas').value;	
	
	for (var i=0;i<=numprimbase-1;i++) { 					
		// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
		var tasa = "listaFactorPBTasaView["+i+"].tasa";					
		var primaFija = "listaFactorPBTasaView["+i+"].primaFija";	
		var primaMinima = "listaFactorPBTasaView["+i+"].primaMinima";
		
		if (valorPrimaMinima=="0")
			setValue(primaMinima,"0");	
		
		switch(valorTasa) {		
			case "1": // no
				setValue(primaFija,"0");
				break;
			case "2": // no
				setValue(primaFija,"0");
				break;
			case "3": // no
				setValue(primaFija,"0");
				break;
			case "4": // si
				setValue(tasa,"0");	
				break;
			case "5": // si
				break;	
			default:
		}				
	}
}

function inicializarTasaFranq(valorTasa, valorFranquicia) {
	if(valorFranquicia=="1" && document.getElementById('numdeTasFran')!=null){
		var numFranquicia=document.getElementById('numdeTasFran').value;
		for (var i=0;i<=numFranquicia-1;i++) { 					
			// lo primero es generar los tres posibles valores tasa, prima minima, prima base.					
			var primaFija = "listaFactorCFTasaView["+i+"].primaFija";	
			var primaMinima = "listaFactorCFTasaView["+i+"].primaMinima";
			setValue(primaFija,"0");
			setValue(primaMinima,"0");
		}		
	}
}

/***************** correcciones a prima base ************************/
function inicializaDatosCombosCorreccion(){
		var valorPrimaMinimaCorrec=document.forms[0].elements('AltaCorreccionView.swPrimaMin').options[document.forms[0].elements('AltaCorreccionView.swPrimaMin').selectedIndex].value;
		var valorTasaCorrec=document.forms[0].elements('AltaCorreccionView.idTipoTasa').options[document.forms[0].elements('AltaCorreccionView.idTipoTasa').selectedIndex].value;
	    inicializarTasaFranqPrimaCorreccion(valorTasaCorrec,valorPrimaMinimaCorrec);		    	
}
function inicializarTasaFranqPrimaCorreccion(valorTasa,valorPrimaMinima){
	var numprimbaseCorrec=document.getElementById('numdeTas').value;//numdeTas
	for (var i=0;i<=numprimbaseCorrec-1;i++) { 					
		// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
		var tasa = "listaFactorCPTasaView["+i+"].tasa";					
		var primaFija = "listaFactorCPTasaView["+i+"].primaFija";	
		var primaMinima = "listaFactorCPTasaView["+i+"].primaMinima";
		if (valorPrimaMinima=="0") setValue(primaMinima,"0");	
		switch(valorTasa){		
			case "1": // no
				setValue(primaFija,"0");;
				break;
			case "2": // no
				setValue(primaFija,"0");
				break;
			case "3": // no
				setValue(primaFija,"0");
				break;
			case "4": // si
				setValue(tasa,"0");	
				break;
			case "5": // si
				break;	
			default:}				
	}	
}
