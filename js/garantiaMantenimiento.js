var numtottram=0;
var PrimaBaseOCorrecionFranquicia=1; // en caso de ser primebase es 1 sino es correcciones
	    
function busquedaCalculo(pag)
	{
	  var valor = lanzarVentana(pag,600,400);
	  if(valor != undefined) {
		//alert("_____________");
		setValue("AltaGarantiaView.idCalculo",valor[2])            
		setValue("calculoDescripcion",valor[1])
		setValue("calculoCodigo", valor[0])
		//alert(valor[0] + "??" + valor[1] + "??" + valor[2]);
	  }
	} 
	
	function goCorreccionesF(o) {
		box = document.forms[0].idTipoTasa;
		destination = box.options[box.selectedIndex].value;
		if (destination==1){ alert(box.options[box.selectedIndex].value);o.className='tab';}
		else{ alert(box.options[box.selectedIndex].value);o.className='oculta';}
	}

function compruebaCombos(){
		var valorFranq=document.forms[0].elements('AltaGarantiaView.swCorrecFranq').options[document.forms[0].elements('AltaGarantiaView.swCorrecFranq').selectedIndex].value;
		//alert("recien entrado valor combo fran="+valorFranq);
		showHide('divLoad',true);
	if(PrimaBaseOCorrecionFranquicia==1){
		//combo prima minima
		//alert(" PRIMA swPrima min"+document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value)
		pintaValorMin(document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value);
		//combo tipo tasa
		//alert(" PRIMA id tipo tasa "+document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value	);
		pintaPrimaFija(document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value);
	}
	if(PrimaBaseOCorrecionFranquicia==2){
		//combo prima minima
		//alert(" FRANQUI swPrima min"+document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value)
		//pintaValorMinFranquicia(document.forms[0].elements('AltaGarantiaView.swPrimaMin').options[document.forms[0].elements('AltaGarantiaView.swPrimaMin').selectedIndex].value);
		//combo tipo tasa
		//alert("FRANQUI id tipo tasa "+document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value	);
		pintaPrimaFijaFranquicia(document.forms[0].elements('AltaGarantiaView.idTipoTasa').options[document.forms[0].elements('AltaGarantiaView.idTipoTasa').selectedIndex].value);
		
	}	
	pintaCorrFranqui(document.forms[0].elements('AltaGarantiaView.swCorrecFranq').options[document.forms[0].elements('AltaGarantiaView.swCorrecFranq').selectedIndex].value	);
	showHide('divLoad',false);
}


	function busquedaFranquicia(pag)
	{	
		var valor = lanzarVentana(pag,600,400);
		if(valor != undefined) 
	  	{
	  		setValue("codigoFranquicia",valor[0]);
	  		setValue("AltaGarantiaView.idFranquicia",valor[2]);	 
		}
	}	
	 

	document.onreadystatechange = function(){
	 		if(document.readyState=="complete"){
	 
			top.plegar('cMenuArea');
	    	top.plegar('cAgenda');
	   }
	
	}
	
	 // pinta el campo oculto en funcion del valor recibido	
	function pintaCorrFranqui(valor){
		//alert("pintaCorrFranqui");
		switch(valor){
		
			case "0": // no
				showHide('pestanaCorrFranqui',false);
				correcionFranquicia.className='oculta';
				primaBase.className='';
				break;
			case "1": // si
				showHide('pestanaCorrFranqui',true);
				break;
				
			default:
						
		}
	}
	

	
				 // pinta el campo oculto en funcion del valor recibido	
	function pintaValorMin(valor){
		//alert(document.getElementById('primaBase').innerHTML);
		if(document.getElementById('primaBase').innerHTML!=""){	
		
		var valorMinOculta="valorMin"+0;
					
		numtottas=document.getElementById('numdeTasText').value;
		//alert(numtottas);
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorMinOculta="valorMinTexto"+i;
						
				switch(valor){
		
					case "0": // no
						//alert(valorMinOculta);
						showHide(valorMinOculta,false);
					break;
			
				case "1": // si
					//alert(valorMinOculta);
					showHide(valorMinOculta,true);
				break;
				
			default:}		
		}	
					        
		numtottas=document.getElementById('numdeTas').value;
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorMinOculta="valorMin"+i;
						
				switch(valor){
		
					case "0": // no
						//alert(valorMinOculta);
						showHide(valorMinOculta,false);
					break;
			
				case "1": // si
					//alert(valorMinOculta);
					showHide(valorMinOculta,true);
				break;
				
			default:}		
		}	

		}
	} 

	 
	 	 // pinta el campo oculto en funcion del valor recibido	
	function pintaPrimaFija(valor){
		
		if(document.getElementById('primaBase').innerHTML!=""){
		
			//alert(document.getElementById('primaBase').innerHTML);
		var valorTasaOculta="valorTasa"+0;
		var valorPrimaFijaOculta="valorPrimaFija"+0;
			
			
		numtottas=document.getElementById('numdeTasText').value;
		//alert(numtottas);
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorPrimaFijaOculta="valorPrimaFijaTexto"+i;
				valorTasaOculta="valorTasaTexto"+i;
		switch(valor){
		
			case "1": // no
					showHide(valorPrimaFijaOculta,false);
					showHide(valorTasaOculta,true);
				break;
			case "2": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "3": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "4": // si
				showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,false);
				break;
			case "5": // si
				showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,true);
				break;	
			default:
			}
		}	
		
			numtottas=document.getElementById('numdeTas').value;
			//alert(numtottas);
			for (var i=0;i<=numtottas-1;i++) { 
				
				valorPrimaFijaOculta="valorPrimaFija"+i;
				valorTasaOculta="valorTasa"+i;
		switch(valor){
		
			case "1": // no	
					showHide(valorPrimaFijaOculta,false);
					showHide(valorTasaOculta,true);
				break;
			case "2": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "3": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "4": // si
				showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,false);
				break;
			case "5": // si
				showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,true);
				break;	
			default:
			}
		}	
						
		}
	}
	
		 // pinta el campo oculto en funcion del valor recibido	
	function pintaValorMinFranquicia(valor){
		//alert(document.getElementById('correcionFranquicia').innerHTML);
		if(document.getElementById('correcionFranquicia').innerHTML!=""){	
		
		var valorMinOculta="valorMinFran"+0;
					
		numtottas=document.getElementById('numdeTasTextFran').value;
		//alert(numtottas);
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorMinOculta="valorMinTextoFran"+i;
						
				switch(valor){
		
					case "0": // no
						//alert(valorMinOculta);
						showHide(valorMinOculta,false);
					break;
			
				case "1": // si
					//alert(valorMinOculta);
					showHide(valorMinOculta,true);
				break;
				
			default:}		
		}	
					        
		numtottas=document.getElementById('numdeTasFran').value;
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorMinOculta="valorMinFran"+i;
						
				switch(valor){
		
					case "0": // no
						//alert(valorMinOculta);
						showHide(valorMinOculta,false);
					break;
			
				case "1": // si
					//alert(valorMinOculta);
					showHide(valorMinOculta,true);
				break;
				
			default:}		
		}	

		}
	} 

	 
	 	 // pinta el campo oculto en funcion del valor recibido	
	function pintaPrimaFijaFranquicia(valor){
		
		if(document.getElementById('correcionFranquicia').innerHTML!=""){
		
			//alert(document.getElementById('correcionFranquicia').innerHTML);
		var valorTasaOculta="valorTasaFran"+0;
		var valorPrimaFijaOculta="valorPrimaFijaFran"+0;
			
			
		numtottas=document.getElementById('numdeTasTextFran').value;
		//alert(numtottas);
		for (var i=0;i<=numtottas-1;i++) { 
				
				valorPrimaFijaOculta="valorPrimaFijaTextoFran"+i;
				valorTasaOculta="valorTasaTextoFran"+i;
		switch(valor){
		
			case "1": // no
					showHide(valorPrimaFijaOculta,false);
					showHide(valorTasaOculta,true);
				break;
			case "2": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "3": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			//case "4": // si
			//	showHide(valorPrimaFijaOculta,true);
			//	showHide(valorTasaOculta,false);
			//	break;
			case "5": // si
				//showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,true);
				break;	
			default:
			}
		}	
		
			numtottas=document.getElementById('numdeTasFran').value;
			//alert(numtottas);
			for (var i=0;i<=numtottas-1;i++) { 
				
				valorPrimaFijaOculta="valorPrimaFijaFran"+i;
				valorTasaOculta="valorTasaFran"+i;
		switch(valor){
		
			case "1": // no	
					showHide(valorPrimaFijaOculta,false);
					showHide(valorTasaOculta,true);
				break;
			case "2": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			case "3": // no
				showHide(valorPrimaFijaOculta,false);
				showHide(valorTasaOculta,true);
				break;
			//case "4": // si
			//	showHide(valorPrimaFijaOculta,true);
			//	showHide(valorTasaOculta,false);
			//	break;
			case "5": // si
			//	showHide(valorPrimaFijaOculta,true);
				showHide(valorTasaOculta,true);
				break;	
			default:
			}
		}	
						
		}
	}
	
/* Metodo que valida que una cadena sea numerica y con valor mayor que cero */
function validarNumeroMayorCero(sNumero) {
	var result = false;
	var sNumeroAux = sNumero.replace(",","."); // Sustituimos el separador decimal de etica por el separador decimal de javascript

	if ( sNumeroAux !== "" && parseFloat(sNumeroAux) !== "NaN" ) {
		var numero = parseFloat(sNumeroAux);
		result = Boolean(numero > 0.0);
	}

	return result;
}
	
function submitea(action, flagLavadora) {
	// variable que contiene el valor del combo de tipo de tasa
	var comboTipoTasa = document.getElementById('AltaGarantiaView.idTipoTasa').value;
	// variable que contiene en valor del conmbo prima minima
	var comboPrimaMin = document.getElementById('AltaGarantiaView.swPrimaMin').value; 
	var retorno=true;
	var pruebalo="";
	var tasa=false;
	var primMin=false;
	var primFij=false;
	var boni=false;
	
	if ( comboTipoTasa === undefined || comboTipoTasa === null || comboTipoTasa === "0" ) {
		retorno = false;
	}

	// if de carga DE PRIMABASE
	if(document.getElementById('primaBase').innerHTML!="") {
		// 1? if
		if (comboTipoTasa!="") {
			//2? if
			if (comboTipoTasa!="0" ){
				var numeroDeTasas=document.getElementById('numdeTas').value;
				
				//if de tasa
				if ((comboTipoTasa=="1") || (comboTipoTasa=="2") || (comboTipoTasa=="3") || (comboTipoTasa=="5")){
					// 1? for 
					for (var indice=0; indice < numeroDeTasas ; indice++) {
						pruebalo = document.getElementById("listaFactorPBTasaView["+indice+"].tasa");
				 	
						// En Valores de Prima Base, debe permitir grabar con valores a cero, independientemente del tipo de tasa
/*
						if ( ( pruebalo !== null ) && ( pruebalo !== undefined ) && !validarNumeroMayorCero(pruebalo.value) ) {
							tasa=true;
							retorno=false;
						}
*/
					}
					// fin 1? for
				}
				//fin if de tasa
				
				//if de primFij
				if ((comboTipoTasa=="4") || (comboTipoTasa=="5")){
					// 2? for 
					for (var indice=0; indice < numeroDeTasas ; indice++){
						pruebalo=document.getElementById("listaFactorPBTasaView["+indice+"].primaFija");
					
						// En Valores de Prima Base, debe permitir grabar con valores a cero, independientemente del tipo de tasa
/*
						if ( ( pruebalo !== null ) && ( pruebalo !== undefined ) && !validarNumeroMayorCero(pruebalo.value) ) {
							primFij =true;
							retorno=false;
						}
*/
					}
					// fin 2? for
				}
				//fin if de ptimafij
				
				//if de primFij
				if (comboPrimaMin=="1") {
					// 2? for 
					for (var indice=0; indice < numeroDeTasas ; indice++){
						pruebalo=document.getElementById("listaFactorPBTasaView["+indice+"].primaMinima");
					
						// En Valores de Prima Base, debe permitir grabar con valores a cero, independientemente del tipo de tasa
/*
						if ( ( pruebalo !== null ) && ( pruebalo !== undefined ) && !validarNumeroMayorCero(pruebalo.value) ) {
							primMin =true;
							retorno=false;
						}
*/
					}
					// fin 2? for
				}
				//fin if de ptimafij
			}
			// fin 2? if
		}
	 //fin 1? if
	}
	// if de carga de frankicia
	
	// if de carga
	if((document.getElementById('correcionFranquicia').innerHTML!="") && (document.forms[0].elements('AltaGarantiaView.swCorrecFranq').options[document.forms[0].elements('AltaGarantiaView.swCorrecFranq').selectedIndex].value=="1")){
	// 1? if
	if (comboTipoTasa!="") {
		//2? if
		if (comboTipoTasa!="0" ){
			var numeroDeTasas=document.getElementById('numdeTasFran').value;
			
			//if de tasa
			if ((comboTipoTasa=="1") || (comboTipoTasa=="2") || (comboTipoTasa=="3") || (comboTipoTasa=="5")){
				// 1? for 
				for (var indice=0; indice < numeroDeTasas ; indice++) {
					pruebalo = document.getElementById("listaFactorCFTasaView["+indice+"].tasa");
				 	
					if ( ( pruebalo !== null ) && ( pruebalo !== undefined ) && (pruebalo.value == "") ) {
							boni=true;
							retorno=false;
						}
					}
				// fin 1? for
			}
			//fin if de tasa			
		}
		// fin 2? if
	}
	 //fin 1? if
	}
	// if de carga
	 	
	if (retorno) {
		if ( ( action === undefined ) || ( action === null ) ) {
			var admiteCorrecciones = document.getElementById('AltaGarantiaView.swCorreccion').value;
			var admiteCorreccionesFranquicia = document.getElementById('AltaGarantiaView.swCorrecFranq').value;
			var mensajeConfirmacion = altaJs;
			
			if ((admiteCorrecciones == 0) && tieneCorrecciones) {
				mensajeConfirmacion = eliminarCorreccionesMsg + mensajeConfirmacion; 
			}
			
			if ((admiteCorreccionesFranquicia == 0) && tieneCorreccionesFranquicia) {
				mensajeConfirmacion = eliminarCorreccionesFranquiciaMsg + mensajeConfirmacion; 
			}
 
			submitFormMsgLavadora(document.forms[0], validateGarantiatarifaForm, 'iAreaTrabajo', mensajeConfirmacion, flagLavadora);
		} else {
			submitFormActionMsgLavadora(document.forms[0], action, validateGarantiatarifaForm, 'iAreaTrabajo', altaJs, null, flagLavadora);
		}
	}
	else {
		if (comboTipoTasa=="0")  {
			alert(error9);
		}
		else {
			var cadena=" "+error1+" ";
			if (boni==true){cadena=cadena+bonificacionJs;}	
			
			// En Valores de Prima Base, debe permitir grabar con valores a cero, independientemente del tipo de tasa
			//if (tasa==true){cadena=cadena+tasaJs;}
			//if (primFij==true){cadena=cadena+primaFijJs;}	
			//if (primMin==true){cadena=cadena+primaMinJs;}
			
			alert(cadena);
		}
	}
}
 //plegar Menu y Agenda
function plegaAmbos(){	 		 		 
		if((document.getElementById('primaBase').innerHTML).innerText!=""){
			top.plegar('cMenuArea');
	    	top.plegar('cAgenda');
	    } 	   			
	}