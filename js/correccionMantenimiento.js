function compruebaCombos(){
	showHide('divLoad',true);
	//combo tipo tasa
	//alert("id tipo tasa "+document.forms[0].elements('AltaCorreccionView.idTipoTasa').options[document.forms[0].elements('AltaCorreccionView.idTipoTasa').selectedIndex].value	);
	pintaPrimaFija(document.forms[0].elements('AltaCorreccionView.idTipoTasa').options[document.forms[0].elements('AltaCorreccionView.idTipoTasa').selectedIndex].value	);
	
	pintaValorMin(document.forms[0].elements('AltaCorreccionView.swPrimaMin').options[document.forms[0].elements('AltaCorreccionView.swPrimaMin').selectedIndex].value);
	showHide('divLoad',false);
	}   	
	
	  // pinta el campo oculto en funcion del valor recibido	
	function pintaValorMin(valor){
				
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
	 
	 	 // pinta el campo oculto en funcion del valor recibido	
	function pintaPrimaFija(valor){
		
		//if(document.getElementById('correccionAPrimaBase').innerHTML!=""){
		
			//alert(document.getElementById('correccionAPrimaBase').innerHTML);
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
						
		//}
	}