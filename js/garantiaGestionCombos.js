/** garantiaGestionCombos.js **/
function inicializaEstructuraCombos(){
		//valor de capa 0,1,2 dependiendo de la pesta?a a lta que hayamos llamado.	
		//0 capa de primaBase
		//1 capa de correccionFranquicia
		//2 capa de correccionPrimaBase	
		showHide('divLoad',true);
		var capa = 0;
		if (document.getElementById('tab0').className=='activeTab') capa=0;
		if (document.getElementById('tab1').className=='activeTab') capa=1;	
		var valorFranquicia=document.forms[0].elements('AltaGarantiaView.swCorrecFranq').options[document.forms[0].elements('AltaGarantiaView.swCorrecFranq').selectedIndex].value;
		var valorPrimaMinima=document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value;
		var valorTasa;
		
		if (document.forms[0].elements('AltaGarantiaView.idTipoTasa').options !== undefined && document.forms[0].elements('AltaGarantiaView.idTipoTasa').options != null) {
			valorTasa = document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value;
		} else {
			if (capa === 0) {
				// No estamos en la pestanya de Franquicia y la select de tipo de tasa ha cambiado
				select = document.forms[0].elements('tipoTasaSelectId');
				
				for (i=0; i<select.length;i++) {
					if (select[i].selected) {
						document.forms[0].elements('AltaGarantiaView.idTipoTasa').value = select[i].value; 
						break;
					}
				}
				
				valorTasa = document.forms[0].elements('AltaGarantiaView.idTipoTasa').value;
			}
		}
    
		inicializarTasaFranqPrimaCapa(valorTasa,valorPrimaMinima,valorFranquicia);		  
	    pintaCorrFranqui(valorFranquicia);	
	    showHide('divLoad',false);
}
// pinta el campo oculto en funcion del valor recibido	
function pintaCorrFranqui(valor){
	switch(valor){		
		case "0": // no
			showHide('pestanaCorrFranqui',false);
			correcionFranquicia.className='oculta';
			primaBase.className='';
			break;
		case "1": // si
			showHide('pestanaCorrFranqui',true);
			break;				
		default:}
}

function inicializarTasaFranqPrimaCapa(valorTasa, valorPrimaMinima, valorFranquicia) {
	inicializarTasaPrimaCapa(valorTasa, valorPrimaMinima, valorFranquicia);
	inicializarTasaFranqCapa(valorFranquicia)
}

function inicializarTasaPrimaCapa(valorTasa, valorPrimaMinima) {
	if (jQuery('#primaBase').children().length > 0) {
		// TITULOS DE LA MATRIZ DE TASAS
		var numprimbasetexto=document.getElementById('numdeTasText').value;	
		var tasa = "valorTasaTexto0";					
		var primaFija = "valorPrimaFijaTexto0";	
		var primaMinima = "valorMinTexto0";
		var primaMaxima = "valorMaxTexto0";
		
		for (var i=0; i<=numprimbasetexto-1; i++) { 					
			// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
			tasa = "valorTasaTexto"+i;					
			primaFija = "valorPrimaFijaTexto"+i;	
			primaMinima = "valorMinTexto"+i;
			primaMaxima = "valorMaxTexto"+i;
			
			if (valorPrimaMinima=="0") {
				showHide(primaMinima,false);
				showHide(primaMaxima,false);}
			else {
				showHide(primaMinima,true);
				showHide(primaMaxima,true);
			}
			
			switch (valorTasa) {		
				case "1": // no
					showHide(primaFija,false);
					showHide(tasa,true);
					break;
				case "2": // no
					showHide(primaFija,false);
					showHide(tasa,true);
					break;
				case "3": // no
					showHide(primaFija,false);
					showHide(tasa,true);
					break;
				case "4": // si
					showHide(primaFija,true);
					showHide(tasa,false);
					break;
				case "5": // si
					showHide(primaFija,true);
					showHide(tasa,true);				
					break;	
				default:
			}
		}	
		
		
		// VALORES DE LA MATRIZ DE TASAS
		var numprimbase=document.getElementById('numdeTas').value;
		var controlarPrimaFija = false;
		
		if ($("span.primaFija").length > 0) {
			controlarPrimaFija = true;
		}
		
		for (var i=0;i<=numprimbase-1;i++) { 					
			// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
			tasa = "valorTasa"+i;					
			primaFija = "valorPrimaFija"+i;
			primaFijaTd = "valorPrimaFija" + i + "_td";
			primaMinima = "valorMin"+i;
			primaMinimaTd = "valorMin" + i + "_td";
			primaMaxima = "valorMax"+i;
			
			if (valorPrimaMinima=="0") {
				showHide(primaMinima,false);
				showHide(primaMinimaTd,false);
				showHide(primaMaxima,false);
			} else {
				showHide(primaMinima,true);
				showHide(primaMinimaTd,true);
				showHide(primaMaxima,true);
			}

			switch (valorTasa) {		
				case "1": // no
					showHide(primaFija,false);
					showHide(primaFijaTd,false);
					showHide(tasa,true);
					
					break;
				case "2": // no
					showHide(primaFija,false);
					showHide(primaFijaTd,false);
					showHide(tasa,true);
					
					break;
				case "3": // no
					showHide(primaFija,false);
					showHide(primaFijaTd,false);
					showHide(tasa,true);
					
					break;
				case "4": // si
					showHide(primaFija,true);
					showHide(primaFijaTd,false);
					showHide(tasa,false);
					
					break;
				case "5": // si
					showHide(primaFija,true);
					showHide(tasa,true);
					
					if (controlarPrimaFija) {
						showHide(primaFija,false);
						showHide(primaFijaTd,true);
					}
					
					break;	
				default:
			}
		}
	
		if (controlarPrimaFija && valorTasa == 5) {
			$("span.primaFija").find("input[name $= 'primaFija']").each(function() {
				// Le cambiamos el identificador para que el valor
				// de la prima minima que coja el action sea el de la celda
				$(this).attr("id", $(this).attr("id") + "_changeme");
				$(this).attr("name", $(this).attr("name") + "_changeme");
			});
		} else if (controlarPrimaFija) {
			$("span.primaFija").find("input[name $= 'primaFija_changeme']").each(function() {
				// Le cambiamos el identificador para que el valor
				// de la prima minima que coja el action sea el del span
				$(this).attr("id", $(this).attr("id").replace("_changeme", ""));
				$(this).attr("name", $(this).attr("name").replace("_changeme", ""));
			});
		}
	}
}

function inicializarTasaFranqCapa(valorFranquicia) {
	if (document.getElementById('correcionFranquicia').innerHTML != "") {
		if (valorFranquicia=="1") {
			var numFranquiciatexto=document.getElementById('numdeTasTextFran').value;
			var tasa = "valorTasaTextoFran0";					
			var primaFija = "valorPrimaFijaTextoFran0";	
			var primaMinima = "valorMinTextoFran0";					
			
			for (var i=0; i<=numFranquiciatexto-1; i++) { 					
				// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
				tasa = "valorTasaTextoFran"+i;					
				primaFija = "valorPrimaFijaTextoFran"+i;	
				primaMinima = "valorMinTextoFran"+i;
				
				showHide(tasa, true);
				showHide(primaFija, false);
				showHide(primaMinima,false);
			}		
			
			var numFranquicia=document.getElementById('numdeTasFran').value;
			tasa = "valorTasaFran0";					
			primaFija = "valorPrimaFijaFran0";	
			primaMinima = "valorMinFran0";					
			
			for (var i=0; i<=numFranquicia-1; i++) { 					
				// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
				tasa = "valorTasaFran"+i;					
				primaFija = "valorPrimaFijaFran"+i;	
				primaMinima = "valorMinFran"+i;
				
				showHide(tasa, true);
				showHide(primaFija, false);
				showHide(primaMinima,false);
			}					
		} else {
			if (document.getElementById('correccionFranquicia')!=null)
				document.getElementById('correccionFranquicia').innerHTML="";
		}
	}
}

// Habilita/Deshabilita la select de tipo de tasa en funcion
// de la capa (pestanya) seleccionada
// En el caso de que la pestanya seleccionada sea la de franquicia
// el valor seleccionado es tipo de tasa porcentaje
function tratarSelectTipoTasa(capa) {
	var select = document.getElementById("tipoTasaSelectId");
	var tipoTasaAnterior = document.getElementById("AltaGarantiaView.idTipoTasa").value;
	
	switch(capa) {
		case 0: // Prima base
			select.disabled = false;
			select.title = "";
			
			for (i=0; i<select.length;i++) {
				if (select[i].value === tipoTasaAnterior) {
					select[i].selected = true;
				} else {
					select[i].selected = false;
				}
			}				
			
			break;
		case 1: // Correccion Franquicia
			select.disabled = true;
			select.title = primaFijaObligatoriaMsg;

			for (i=0; i<select.length;i++) {
				if (select[i].selected) {
					tipoTasaAnterior = select[i].value;
					break;
				}
			}
			
			select[2].selected = true; // 2 es el id del tipo de tasa porcentaje
			break;
		default:
			select.disabled = false;
			select.title = "";
			
			for (i=0; i<select.length;i++) {
				if (select[i].value === tipoTasaAnterior) {
					select[i].selected = true;
				} else {
					select[i].selected = false;
				}
			}
	}
}

