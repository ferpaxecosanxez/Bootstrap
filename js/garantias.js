

//*****************************************FUNCIONES UTILIZADAS PARA VALIDACIONES GENERALES********************************************


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA

function validarLimites(importe, valor, limiteSup, limiteInf){
			
	valor.style.border = "1px solid #CCCCCC";
			
	var importeCodigo = document.getElementById("importe_" + importe);
			
	var valorDec = valor.value.replace(".","").replace(",",".");
			
	//Validamos que el valor introducido sea de tipo numerico					
	//if(validarCaracter(importe, valor, importeCodigo)){
			
	//Comprobamos que se haya introducido un valor
	if(valorDec != ""){
		//Comprobamos que no exceda el limite superior
		if(limiteSup != -1){							
			if( parseFloat(valorDec) > limiteSup){
				alert("NO puede exceder en " + importe + " de: " + limiteSup);
				valor.style.border = "1px solid #FF0000";
				importeCodigo.setAttribute("abbr", "N");
				importeCodigo.setAttribute("abbrN", "N");
				return false;
			}
		}
		
		//Comprobamos que no disminuya del limite inferior	
		if(limiteInf != -1){	
			if( parseFloat(valorDec) < limiteInf){
				alert("NO puede disminuir " + importe + " de: " + limiteInf);
				//valor.focus(); 
				valor.style.border = "1px solid #FF0000";
				importeCodigo.setAttribute("abbr", "N");
				importeCodigo.setAttribute("abbrN", "N");
				return false;
			}
		}
		
		importeCodigo.setAttribute("abbr", "S");
		importeCodigo.setAttribute("abbrN", "S");
	}else{
		alert("Debe de introducir un valor");
		valor.style.border = "1px solid #FF0000";
		importeCodigo.setAttribute("abbr", "N");
		importeCodigo.setAttribute("abbrN", "N");
		return false;
	}
		
	//}
	
	//var porcentaje = document.getElementById(porcentaje);
	//var valorFactor = document.getElementById(valorFactor);
	//var total = document.getElementById(total);
	
}
		
		
//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA

function validarDatos(codigoGarantia, valor, valorTexto){
	var importeCodigo = document.getElementById(valorTexto + codigoGarantia);
	
	valor.style.border = "1px solid #CCCCCC";
			
	//Si es un combo tambine entra y comprueba que se seleccione un valor que no sea nulo
	if(valor.value=="" || valor.value==null){
		alert("Debe de introducir un valor");
		valor.style.border = "1px solid #FF0000";
		importeCodigo.setAttribute("abbr", "N");
		importeCodigo.setAttribute("abbrN", "N");
		return false;
	}else{
		valor.style.border = "1px solid #CCCCCC";
		importeCodigo.setAttribute("abbr", "S");
		importeCodigo.setAttribute("abbrN", "S");
	}
			
			
}
		
		
//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA

function seleccionCheckbox(codigoGarantiaHijo, codigoGarantia, codigoGarantiaSegundoHijo, valor){		
	var importeCodigo = document.getElementById("importe_" + codigoGarantiaHijo);
	var importeCodigoPadre = document.getElementById("importe_" + codigoGarantia);
	var codigoGarantiaSelec = "importeText_" + codigoGarantiaHijo;
	var codigoGarantiaSelecPadre = "importeText_" + codigoGarantia;
	var selecCheckbox = document.getElementById(codigoGarantiaSelec);	
	var selecCheckboxPadre = document.getElementById(codigoGarantiaSelecPadre);		
	var checkboxPadre = document.getElementById("checkbox_" + codigoGarantia);
	var checkboxPadre2 = checkboxPadre.getElementsByTagName("input");
			
	//Solo entra cuando hacemos el checked desde una segunda hija de garantias
	if(codigoGarantiaSegundoHijo!=""){
		var checkboxSegundoHijo = document.getElementById("checkbox_" + codigoGarantiaSegundoHijo);
		var checkboxSegundoHijo2 = checkboxSegundoHijo.getElementsByTagName("input");
	}
	var valorChecked = false;
	
	//Define abbrN
	var importeCodigoabbrN;
	var importeCodigoPadreabbrN;
			
	//Ponemos los checked de los checkbox a true
	//Comprobamos si es una suma padre			
	if(codigoGarantiaHijo != codigoGarantia){	
		//Comprobamos al seleccionar un hijo que se haya seleccionado el padre
		for(var i=0; i<checkboxPadre2.length; i++){
			if(checkboxPadre2.item(i).getAttribute("type") == "checkbox"){
				if(checkboxPadre2.item(i).getAttribute("checked") == false){
					checkboxPadre2.item(i).setAttribute("checked", true);
					valorChecked = true;
					//return false;
				}
			}
		}
		//Solo entra si es el checked de una segunda hija de garantias, por lo que el tercer parametro de entrada le llega
		//con el codigo de la suma padre primera
		if(codigoGarantiaSegundoHijo!=""){						
			for(var i=0; i<checkboxSegundoHijo2.length; i++){
				if(checkboxSegundoHijo2.item(i).getAttribute("type") == "checkbox"){					
					if(checkboxSegundoHijo2.item(i).getAttribute("checked") == false){
						checkboxSegundoHijo2.item(i).setAttribute("checked", true);
						valorChecked = true;
						//return false;
					}
				}						
			}
		}
	}
		
	//Ponemos los checked de los chekbox a false
	if(valorChecked == false){
		//Si es una garantia padre deshabilitamos los hijos si se deselecciona
		var elementTD = document.getElementsByTagName("td");
		var elementID;
		var elementInput;
		var elementCheckbox;
		var valor =  "checkbox_" + codigoGarantia;
		var elementText;
			
		for(var i=0; i<elementTD.length; i++){
			if(elementTD.item(i).getAttribute("codigoGarantia") == codigoGarantia){
				elementID = elementTD.item(i).getAttribute("id");				
				elementInput = document.getElementById(elementID);
				elementCheckbox = elementInput.getElementsByTagName("input");
				for(var j=0; j<elementCheckbox.length; j++){
					if(elementCheckbox.item(j).getAttribute("type") == "checkbox"){
						if(elementCheckbox.item(j).getAttribute("checked") == true){
							if(elementID != valor){							
								elementCheckbox.item(j).setAttribute("checked", false);
								propertyCheck(document.getElementById(elementCheckbox.item(j).name + "_"), elementCheckbox.item(j).checked, '1', '0');
							}
						}						
					}
				}
			}
		}
	}
	
	
				
					
	//Comprobamos si esta disables, si lo esta se pone enabled, y si esta enabled se pone disabled
	//if(selecCheckbox.getAttribute("disabled") == true){ 
	//	selecCheckbox.setAttribute("disabled", false);
	//}
	//else{
	//	selecCheckbox.setAttribute("disabled", true);
	//	importeCodigo.setAttribute("abbr", "");
	//}
}		
	
		
//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA 

//Esta funcion te permite ocultar o mostar los datos
//Recibe el valorDIV para identificar los elementos a ocultar, y el propio elemento
function seleccionCheckboxOcultar(valorDIV, valor){
	var elementDIV = document.getElementById("element_" + valorDIV);
	var elementDIVTabla = document.getElementById("cTablaScroll" + valorDIV);
				
	//Mostramos o Ocultamos los elementos de Bonificaciones y Recargos
	if(elementDIV.style.display == "block"){
		elementDIV.style.display ="none";
		elementDIVTabla.style.display ="none";
	}else{
		elementDIV.style.display ="block";
		elementDIVTabla.style.display ="block";
	}
}


//FUNCION QUE SE UTILIZA PARA VALIDAR EL CONTENIDO DE UN ELEMENTO CUANDO TIENE EL FOCO
//INVOCADA POR: DESDE JSP, validarElementosGeneral, validarElementosFranquiciasGeneral Y validarDatosLimitesGeneral
//INVOCA A: NINGUNA

//Cada elemento va a tener una variable que indicara si es valido o no,
//Se indicar? mediante "S" para indicar que es valido y "N" para indicar que no es valido y "OP" que es opcional por lo que no se valida
//Recibe el codigo del elemento, el this y el nombre del campo que se quiere validar
function validarDatosGeneral(elemento){
	//De esta manera identificamos uniquivocamnete un elemento
	//Este elemento se identifica mediante un id en su td
	var elementoPadre = elemento.parentNode;
	//Esta propiedad esta en el td
	var valido = "abbr";
	var S = "S";
	var N = "N";
	var OP = "OP"; //Campo opcional
	//Marcamos el elemento para saber que estamos en el
	elemento.style.border = "1px solid #CCCCCC";
	//Una vez situados en el elemnto validamos su contenido
	//Primero comprobamos que tenga contenido
	if(elemento.value=="" || elemento.value==null){ 
		//No tiene contenido
		//alert("Debe de introducir un valor");
		//Marcamos el elemento para saber que no es valido
		if(elementoPadre.getAttribute(valido) != OP){ //Con esto comprobamos que solo valide si el campo abbr esta a ""
			elemento.style.border = "1px solid #FF0000";
			//Establecemos la propiedad del atributo como no valido
			elementoPadre.setAttribute(valido, N);
		}
	}else{
	    //Tiene contenido, hay que comprobar que este contenido sea correcto, pero de esto se encarga el tag
		if(elementoPadre.getAttribute(valido) != OP){ //Con esto comprobamos que solo valide si el campo abbr esta a ""	
			elemento.style.border = "1px solid #CCCCCC";
			elementoPadre.setAttribute(valido, S);
		}	
	}	
	
}


//FUNCION QUE SE UTILIZA PARA VALIDAR EL CONTENIDO DE UN ELEMENTO CUANDO TIENE EL FOCO Y COMPROBAR QUE ESTA DENTRO DE LOS LIMITES
//INVOCADA POR: DESDE JSP DE SUMAS PERO NO SE UTILIZA Y DESDE JSP DE BONIFICACIONES Y RECARGOS
//INVOCA A: NINGUNA

//Esta funcion se encarga de validar un dato mediante un limite superior y un limite inferior
//Recibe el propio elemento, el limite superior y el limite Inferior
function validarDatosLimitesGeneral(elemento, limiteSup, limiteInf){
	//Primero realizamos la validacion de datos general
	validarDatosGeneral(elemento);
	//Ahora validamos por limites
	//Este elemento se identifica mediante un id en su td
	var elementoPadre = elemento.parentNode;
	//Esta propiedad esta en el td
	var valido = "abbr";
	var S = "S";
	var N = "N";
	//Primero convertimos el valor a decimal, ya que de esta forma es como nos llegan los limites		
	var valorDec = elemento.value.replace(".","").replace(",",".");
	var tipoElementoValidacion = '';
	if(elemento.id != null && (elemento.id.indexOf("porcentajeTextRecar_") != -1 || elemento.id.indexOf("porcentajeTextBonif_") != -1) ){			
		tipoElementoValidacion = 'Porcentaje';
	} else {
		tipoElementoValidacion = 'Capital';
	}
	//Comprobamos que no exceda el limite superior
	if(limiteSup != -1 && limiteInf == -1){							
		if( parseFloat(valorDec) > limiteSup){
			alert(tipoElementoValidacion + " " + textoMaximo + ": " + formatearImporte(limiteSup));
			elemento.style.border = "1px solid #FF0000";
			elementoPadre.setAttribute(valido, N);
		}
	}			
	//Comprobamos que no disminuya del limite inferior	
	if(limiteInf != -1 && limiteSup == -1){	
		if( parseFloat(valorDec) < limiteInf){
			alert(tipoElementoValidacion + " " + textoMinimo + ": " + formatearImporte(limiteInf));
			//valor.focus(); 
			elemento.style.border = "1px solid #FF0000";
			elementoPadre.setAttribute(valido, N);
		}
	}
	//Comprobamos que no disminuya el limite inferior y no exceda del limite superior
	if(limiteSup != -1 && limiteInf != -1){							
		if( parseFloat(valorDec) > limiteSup || parseFloat(valorDec) < limiteInf){
			alert(tipoElementoValidacion + " " + textoMinimo + ": " + formatearImporte(limiteInf) + " y " + tipoElementoValidacion + " " + textoMaximo + ": " + formatearImporte(limiteSup));
			elemento.style.border = "1px solid #FF0000";
			elementoPadre.setAttribute(valido, N);
		}
	}
	
	//Si no se ha introducido nada se pone como no valido	
	if(elemento.value == ""){
		elemento.style.border = "1px solid #FF0000";
		//Establecemos la propiedad del atributo como no valido
		elementoPadre.setAttribute(valido, N);	
	}
	
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: formateoDecimales (general.js) y mascaraDecimal (general.js)

function formatearImporteSpan(importe){
    importe = formateoDecimales(importe,',',2,'.',11);
    importe = mascaraDecimal(importe,',','2');

    return importe;   
}


//FUNCION QUE SE UTILIZA PARA ELIMINAR EL FORMATO DE UN DATO
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA

//Esta funcion se encarga de eliminar el formato los datos
function desFormatearImporte(importe){
	importe = importe.replace(/\./g,'');
	importe = importe.replace(',','.');
	importe = Math.round(importe * 100);

	return importe; 
}


//FUNCION QUE SE UTILIZA PARA ESTABLECER EL FORMATO EN UN DATO
//INVOCADA POR: validarDatosLimitesGeneral
//INVOCA A: formateoDecimales (general.js) y mascaraDecimal (general.js)

//Esta funcion se encaraga de formatear los datos
function formatearImporte(importe){
	importe = importe.toString().replace(/\./g,',');
	importe = formateoDecimales(importe.toString(),',',2,'.',11);
	importe = mascaraDecimal(importe.toString(),',','2');

    return importe; 
}


//FUNCION QUE SE UTILIZA PARA PONER EL RECUADRO EN NEGRO AL ELEMENTO
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

function foco(elemento){
	elemento.style.border = "1px solid #000000";
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA 
		
function validarCaracter(importe, valor, importeCodigo){
	var CaractereInvalido = false;
	var numero = valor.value; 
	for (i=0; i < numero.length; i++){
		var Caractere = numero.charAt(i);
		if(Caractere != "."){
   			if (isNaN(parseInt(Caractere))) CaractereInvalido = true;
		}
	}
   	if(CaractereInvalido){
   		valor.style.border = "1px solid #FF0000";
		alert("El importe de " + importe + " debe ser num?rico");
		importeCodigo.setAttribute("abbr", "N");
		return false;			
	}
	return true;
}
		
		
//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA 

function deshabilitarCheckbox(){
	var elementosCHECKBOX = document.getElementsByTagName("input");
	var elemCheckbox = 0;
	var valorType;
			
	//Deshabilitamos lo checkbox 
	for(var i=0; i<elementosCHECKBOX.length; i++){
		valorType = elementosCHECKBOX.item(i).getAttribute("type");	
	 	if(valorType == "checkbox"){
	 		elementosCHECKBOX.item(i).setAttribute("disabled", true)
		}
	}
			
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: gestiona2
//INVOCA A: layOut_iFrame_page2 (En general.js)
			
function showHide2(pID, pBol)   {
	var obj = document.getElementsByName(pID)	
	for(var i=0; i<obj.length; i++){		
		if(obj[i].style.display == "block")
			obj[i].style.display ="none";
		else if(obj[i].style.display == "none")
			obj[i].style.display ="block";
		else 
			obj[i].style.display ="none";
	}
	layOut_iFrame_page2(parent.document.getElementById('iTabContent'));	
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE, SE UTILIZA EN SU CASO LA FUNCION gestiona (En general.js)
//INVOCADA POR: NINGUNA
//INVOCA A: showHide2

function gestiona2(pId) {
	
    showHide2(pId);  
}


//FUNCION COMPRUEBA LOS ELEMENTOS QUE DEBEN DE SER DESPLEGADOS AL CARGAR LA PAGINA
//INVOCADA POR: DESDE JSP DE GARANTIAS Y SUMAS
//INVOCA A: gestiona (En arbolTabla.js)

function comprobarDesplegado(){		
	var elementosDIV = document.getElementsByTagName("div");
	var valorClass;
	var valorCodigoGarantia;
			
	//Comprobamos si el elemento debe estar o no desplegado al inicializarse
	for(var i=0; i<elementosDIV.length; i++){
	   	valorClass = elementosDIV.item(i).getAttribute("desplegado");
	   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("codigoGarantia");
		//1 desplegado y 0 plegado
		if(valorClass == 0 && valorCodigoGarantia != null && valorCodigoGarantia != ""){
	   		gestiona(valorCodigoGarantia);
	   	}
   }
}

//FUNCION QUE COMPRUEBA SI HA SIDO CHEKEADO ALGUN ELEMENTO
//INVOCADA POR: DESDE JSP DE FRANQUICIAS DE GARANTIAS
//INVOCA A: NINGUNA
		
function comprobarCheckeados(){
	var elementosCHECKBOX = document.getElementsByTagName("input");
	var elemCheckbox = 0;
	var valorType;
			
	for(var i=0; i<elementosCHECKBOX.length; i++){
		valorType = elementosCHECKBOX.item(i).getAttribute("type");
		
	 	if(valorType == "checkbox"){
	 		if(elementosCHECKBOX.item(i).getAttribute("checked") == true){
	 			elemCheckbox++;
			}
		}
	}
				
	if(elemCheckbox == 0){
		return false;
	}else
		return true;
		
}	


//FUNCION QUE SOLO INVOCA A LA FUNCION DE VALIDACION GENERAL
//INVOCADA POR: DESDE JSP (TANTO DE LA PARTE DE INFORMACION ECONOMICA COMO DESDE BOTONES Y TABS (datosRiesgoAjax.jsp) Y ARCHIVOS JS DE PRODUCCION (En cotizacionAjax.js))
//INVOCA A: validarElementosGeneral

function enviarDatos(document, valueCodigoStr, iTabContent){
    return validarElementosGeneral(document, valueCodigoStr, iTabContent); 
	    		 
}


//FUNCION DE QUE VALIDA TODOS LOS ELEMENTOS, YA SEAN SUMAS, GARANTIAS, FRANQUICIAS, SUBLIMITES, LIMITES O BONIFICACIONES Y RECARGOS
//INVOCADA POR: enviarDatos
//INVOCA A: comprobarValidacionColorGeneral, validarDatosGeneral, layOut_iFrame_page3(En general.js) Y layOut_iFrame_page2 (En general.js)

//Esta funcion se encarga de ir comprobando cada elemento 
function validarElementosGeneral(document, valueCodigoStr, iTabContent){
    // Controlamos que todos los objetos contenidos en las jsp, de informacion economica 
    // esten fisicamente cargadas
    if(document.getElementById("codigoStr") != null){
    
	    //Se le pasa como document ya que depende de si viene de un enlace o viene del boton guardar de la cotizacion
		//Obtenemos todos los td existentes en la jsp
		var elementosTD = document.getElementsByTagName("td");
		//Establecemos el codigo de accion
		if(valueCodigoStr != "garantiaLibre")
			document.getElementById("codigoStr").value = valueCodigoStr;
				
		//Obtenemos los elementos input de cada td
		var elementosINPUT = "";
		var atributoValidoTD = "";
		var elementoPadre = "";
		//Esta propiedad esta en el td
		var valido = "abbr";
		var N = "N";
		var noValido = false;
		//Este Array contendra todos los elementos que no han sido validados
		var elementos = new Array();
		var valorElementos = 0;
		//Comprobamos si existe algun campo que no es valido
		for(var i=0; i<elementosTD.length; i++){
			//Los elementos td que no tenga id no nos valen
			if(elementosTD.item(i).getAttribute("id") != ""){
				elementosINPUT = elementosTD.item(i).getElementsByTagName("input");
				for(var j=0; j<elementosINPUT.length; j++){
					//Compruebo solo los elementos habilitados
					if((elementosINPUT.item(j).getAttribute("type") != "checkbox") && (elementosINPUT.item(j).getAttribute("type") != "hidden") && (elementosINPUT.item(j).getAttribute("type") != "button")){
						if(elementosINPUT.item(j).getAttribute("disabled") == false){
							//Compruebo solo los elementos que se muestren
							//Para poder realizar esta comprobacion, en los elementos que se muestran permanentes se les ha pueste un cisibility:visible, para que no sean inline o onherit
							if((elementosINPUT.item(j).currentStyle.getAttribute("display") == "block") || (elementosINPUT.item(j).currentStyle.getAttribute("visibility") == "visible")){
								//Comprobamos por validacion de color, para asegurarnos mejor
								if(!comprobarValidacionColorGeneral(elementosINPUT.item(j))){
									//Una vez comprobado todo esto, compruebo si es valido
									validarDatosGeneral(elementosINPUT.item(j));									
								}
								//Aqui se deberian de validar tambien los limites
								atributoValidoTD = elementosTD.item(i).getAttribute(valido);
								if(atributoValidoTD == N || atributoValidoTD == ""){
							 		//Introducimos en el Array los elementos que no han sido validados
							 		elementos[valorElementos] = elementosTD.item(i).getAttribute("id");
							 		valorElementos++;
							 		noValido = true;
							 	}   
							}
						}
					}
				}
			}				    	
		}
		
		//Comprobamos todos los select
		var elementosSELECT = "";
		for(var k=0; k<elementosTD.length; k++){
			elementosSELECT = elementosTD.item(k).getElementsByTagName("select");
			for(var l=0; l<elementosSELECT.length; l++){
				//Comprobamos que esten habilitados
				if(elementosSELECT.item(l).getAttribute("disabled") == false && elementosSELECT.item(l).currentStyle.getAttribute("visibility") != "hidden"){
					//Obtenemos el valor seleccionado de cada combo y comprobamos que se haya eleccionado alguno
					if(elementosSELECT.item(l).value == "" && elementosSELECT.item(l).parentNode.getAttribute("abbr") != "OP"){
						//Introducimos en el Array los elementos que no han sido validados
						elementos[valorElementos] = elementosSELECT.item(l).parentNode.getAttribute("id");
						valorElementos++;
						noValido = true;
					}
				}	
			}
		}	
		
		//Comprobamos todos los enlaces mediantes las imagenes
		var elementosSPAN = "";
		for(var k=0; k<elementosTD.length; k++){
			elementosSPAN = elementosTD.item(k).getElementsByTagName("span");
			for(var l=0; l<elementosSPAN.length; l++){
			    if(elementosSPAN.item(l).currentStyle.visibility == "visible"){
			    	if(elementosSPAN.item(l).className == "franquiciasLimitesSpanRoja mostrarVis"){				
						//Introducimos en el Array los elementos que no han sido validados
						elementos[valorElementos] = elementosSPAN.item(l).parentNode.getAttribute("id");
						valorElementos++;
						noValido = true;
					}
				}
			}
		}
		
		var validar = false;
		//Comprobamos todos los textarea
		var elementoTEXTAREA = document.getElementsByTagName("textarea");
		for(var l=0; l<elementoTEXTAREA.length; l++){
			//Comprobamos que esten habilitados
			if(elementoTEXTAREA.item(l).getAttribute("disabled") == false){
				//Comprobamos que esten visibles
				if(elementoTEXTAREA.item(l).style.visibility == "visible"){		  
					//Obtenemos el valor seleccionado de cada combo y comprobamos que se haya eleccionado alguno
					if((elementoTEXTAREA.item(l).value == "") || (elementoTEXTAREA.item(l).value.length>250)){
						if(elementoTEXTAREA.item(l).value.length>250){
							alert("La longitud del texto no debe de superar los 250 caracteres");
							validar = true;
						}
						if(elementoTEXTAREA.item(l).parentNode.getAttribute("abbr") != "OP")
							validar = true;											
						if(validar == true){
							//Una vez comprobado todo esto, compruebo si es valido
							validarDatosGeneral(elementoTEXTAREA.item(l));
							//Introducimos en el Array los elementos que no han sido validados
							elementos[valorElementos] = elementoTEXTAREA.item(l).parentNode.getAttribute("id");
							valorElementos++;
							noValido = true;				
						}
					}
			  	}
			}	
		}	
		
		//Comprobamos si cPantallaInfoEconomica esta a block ya que si esta a none todos los elementos que hay dentro no se muestran
		if(valueCodigoStr == "garantiaLibre" || document.getElementById("cPantallaInfoEconomica").style.display == "block"){
		
			var mensajeValidar = document.getElementById("mensajeValidar");
			
			//Inicializamos el contenido del div para que borre los datos y estos no se vayan duplicando
			mensajeValidar.innerHTML = "";
			
			//Inicializo para los casos que son distinto de garantias
			var valorCodigo = 1;
			var valor = 0;
			var valorStr = "";
			//Comprueba si todos los elementos son validos 
			if(noValido == true){		
				//alert("Debe de validar los campos seleccionados");
				for(var i=0; i<elementos.length; i++){
					//Si es una garantia debemos recoger el codigo mas adelante ya que tiene codificacion
					if(mensajeValidar.getAttribute("garantia") == "garantia"){
						valor = elementos[i].indexOf("_");		
						valorStr = elementos[i].substr(valor + 4, 1);
						if(isNaN(valorStr)) 
							valorCodigo = 4;
						else
							valorCodigo = 5;
					}
					textNode = document.createTextNode("Por favor, debe validar el campo <" + obtenerCampoValidar(document, elementos[i], "") + "> de " + obtenerCampoValidar(document, elementos[i], valorCodigo));
					elementoBR = document.createElement("BR");
					mensajeValidar.appendChild(textNode);
					mensajeValidar.appendChild(elementoBR);
				}	
				mensajeValidar.style.display = "block";
				if(iTabContent != null || iTabContent == "undefined"){		
				    layOut_iFrame_page3(iTabContent, document);
				}else{
				    layOut_iFrame_page2(parent.document.getElementById('iTabContent'));
				}
				//Se a?ade para el boton guardar de la cotizacion
				ocultaCarga();
				return false;
			}	
			else{
				if(valueCodigoStr != "garantiaLibre"){
					mensajeValidar.style.display = "none";
					if(document.getElementById('divLoad') != null) 
						showHide(document.getElementById('divLoad'),true);
					// Si existe resultado economico
					document.getElementById('cPantallaInfoEconomica').style.display = 'none';
						
					document.getElementById('pulsado').value = top.pulsado;
					if(iTabContent != null || iTabContent == "undefined"){				
						//Viene de guardar o verPrecio
						iTabContent.height = '110px';
					}else{
						//Viene de las pesta?as
						if(parent.document.getElementById('iTabContent')!=null){
							parent.document.getElementById('iTabContent').height = '110px';
						}			    	
					}
					
					var sCaracterConc = '?';
					
					var swModoEdicion = jQuery("#swModoEdicion");

					if(parent.document.forms['riesgoForm'] != undefined){
						swModoEdicion = parent.document.forms['riesgoForm'].swModoEdicion.value;
					}
					
					swModoEdicion = ((typeof swModoEdicion == 'string') && swModoEdicion == 'true') || ((typeof swModoEdicion != 'string') && swModoEdicion.val() == 'true');
					
					if(jQuery("#riesgoForm").val() != undefined || jQuery("#polRiesgoForm").val() != undefined ){
						if( swModoEdicion ){
							var action = document.forms[0].action;
							action = action + '?swModoEdicion=true';
							document.forms[0].action = action;
							sCaracterConc = '&';
						}
					}
					
					if (document.getElementById("ocultaCarga") != null) {
						if (document.forms[0].action.indexOf('ocultaCarga=false') == -1) {
							document.forms[0].action = document.forms[0].action + sCaracterConc + 'ocultaCarga=false';
							sCaracterConc = '&';
						}
					}				

					if (document.forms[0].action.indexOf('swModoEdicion') == -1) {
						document.forms[0].action = document.forms[0].action + sCaracterConc + 'swModoEdicion=' + (swModoEdicion == true?'true':'false');  
					}

					document.forms[0].submit();
			
					//Si se quiere enviar el valor pulsado como par nombre=valor en vez de como propiedad del formulario
					//Para que funcione la concatencacion en pares de nombre=valor, es necesario que el formulario este definido por post
					//en la jsp, sino si esta definido por get al pasarselo aqui se machacara el valor de get cuando se realice el submit
					//if(pulsado == "guardar" || pulsado == "verPrecio" || pulsado == "guardarRiesgo" || pulsado == "verPrecioRiesgo"){	
					//	var accion = document.forms[0].action;
					//	accion = accion + "?pulsado=" + pulsado;
					//	document.forms[0].action = accion;
					//	document.forms[0].submit();
					//}else{
					//	document.forms[0].submit();
					//}
				}
				//Se a?ade para el boton guardar de la cotizacion
				return true;
			}
		
		}else{
			ocultaCarga();
			return false;
		}
		
 	}
  	else{
		// devolvemos false a la funcion 'informacionTab' de cotizacionAjax.js
  		ocultaCarga();
		return false;
   	}
}

//OBTIENE EL NOMBRE DEL ELEMENTO A VALIDAR, EN ESTE CASO LA DESCRIPCION
//INVOCADA POR: validarElementosFranquiciasGeneral Y validarElementosGeneral
//INVOCA A: NINGUNA

//Esta funcion obtiene del id el campo y el codigo que hay que validar
function obtenerCampoValidar(document, id, codigo){
	//Obtenemos donde esta la rayita
	var valor = id.indexOf("_");
	var valor2 = valor + 1;
	var campo = "";
	//Vemos si se trata de obtener el campo o el codigo, si es el campo codigo llega a comillas sino trae un valor
	if(codigo != "")
		valor = valor + codigo;
	//Obtenemos el campo que queremos validar
	//Si se cumple una de estas condiciones es que vamos a obtener el codigo, sino, es que vamos a obtener el campo
	if(codigo != "" || codigo == 1){
		campo = id.substr(valor,id.length);
	}else{
		campo = id.substr(0,valor);
	}
	
	//Esta parte permite mostrar las descripciones a trav?s de los id introducidos en los span
	//No se hamodificado lo anterior por eso se sobreescribe la variable campo
	if(codigo != "")
		campo = id.substr(valor2,id.length);
	var elemento = document.getElementById("descripcion_" + campo);
	if(elemento != null)
    	campo = elemento.innerHTML;
	
	return campo;
		
}


//FUNCION QUE EL ELEMENTO EN QUE NOS ENCONTRAMOS SEA EL DEL CODIGO QUE QUEREMOS, A TRAVES DEL ID 
//INVOCADA POR: validarCheckboxGeneral
//INVOCA A: NINGUNA

//Esta funcion comrpueba que el elemento en el que nos encontramos sea del codigo elegido
function comprobarIdentificadorGeneral(id, codigo){
	//Comprueba si styleId contiene codigo
	var valido = 0;
	if(id.indexOf(codigo) == -1){
		return false;
	}
	else{
		//Hay que comprobar que un codigo no sea parte de otro codigo
		valido = id.indexOf(codigo) + codigo.length;
		if(id.length == valido)
			return true;
	}
		
}


//FUNCION QUE VALIDA A TRAVES DE SI EL ELEMENTO ESTA MARCADO EN ROJO
//INVOCADA POR: validarElementosFranquiciasGeneral Y validarElementosGeneral
//INVOCA A: NINGUNA

//Esta funcion comprueba que no exista ningun elemento con el recuadro en rojo de error
function comprobarValidacionColorGeneral(elemento){
	//Este elemento se identifica mediante un id en su td
	var elementoPadre = elemento.parentNode;
	var valido = "abbr";
	var N = "N";
	//comprobamos si el elemento esta marcado en rojo
	if(elemento.style.border == "#ff0000 1px solid"){
		elementoPadre.setAttribute(valido, N);
		return true;
	}else{
		return false;
	}

}


//FUNCION QUE VALIDA QUE SI SE HA INTRODUCIDO PRIMA NO SE INTRODUZCA TASA Y VICEVERSA
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion comprueba que se introduzca la tasa o la prima, para el caso de TASA_PRIMA_MANUAL
function comprobarValidacionTasaPrimaManual(codigoGarantia, elemento){
	
	var tasaText = document.getElementById("tasaText_" + codigoGarantia);
	var primaText = document.getElementById("primaText_" + codigoGarantia);
	
	if(tasaText.value != "" && primaText.value != ""){
		elemento.value = "";
		alert("Seleccione TASA o PRIMA  ");	
	}
	
	//Cuando introducimos una tasa ponemos la prima a OP
	if((tasaText.id == elemento.id) && primaText.value == ""){
		primaText.parentNode.setAttribute("abbr", "OP");
		primaText.style.border = "1px solid #CCCCCC";
	}
	//Cuando introducimos una prima ponemos la tasa a OP
	if((primaText.id == elemento.id) && tasaText.value == ""){
		tasaText.parentNode.setAttribute("abbr", "OP");
		tasaText.style.border = "1px solid #CCCCCC";
	}
	//Cuando no introducimos ninguna ponemos las dos a no validadas
	if(tasaText.value == "" && primaText.value == ""){
		primaText.parentNode.setAttribute("abbr", "N");
		tasaText.parentNode.setAttribute("abbr", "N");
		primaText.style.border = "1px solid #FF0000";
		tasaText.style.border = "1px solid #FF0000";
	}
}


//FUNCION QUE MUESTRA LAS FRANQUICIAS EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion muestra las Franquicias de las Garantias como un Div flotante 
function mostrarDIVFranquicias(elemento, descripcion, codigoGarantia, nivelGarantia, coGarantia, garantiasHashMap, listaFranquicias){
	
	if(elemento.className == "franquiciasLimitesSpanVerde mostrarVis")
		elemento.className = "franquiciasLimitesSpanHover mostrarVis";
	
	if(document.getElementById("franquiciasText_" + codigoGarantia) != null && document.getElementById("franquiciasText_" + codigoGarantia).currentStyle.visibility == "visible"){
   		document.getElementById("idDIVFranquicias").style.display = "block";
		document.getElementById("idDIVFranquicias").style.backgroundColor = "white";
		//Se establece para calcular el offSetHeight de Sumas, ya que desplaza los div
		var cSumasOffSetHeight = 0;
		if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
			cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
		}
		//alert(document.getElementById("franquicias_" + codigoGarantia).offsetTop);
		document.getElementById("idDIVFranquicias").style.top = document.getElementById("franquicias_" + codigoGarantia).offsetTop + 21 + cSumasOffSetHeight + "px";
		//alert(document.getElementById("idDIVFranquicias").style.top);
		document.getElementById("idDIVFranquicias").style.right = 12 + "px";
		retrieveURLPorPost(urlAccionFranquicias + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion,'garantiasForm',false);
	
		//Redimensionamos el iFrame para el caso de que el div rebose el iTabcontent por abajo
		//Obtenemos el alto del iTabContent y vemos si el valor offsetTop + 21 + si hay sumas + el alto del div 225 es mayor que el alto del iTabContent
		var height = 0;
		
		//Se establece para comprobar si la franquicia tiene contenido ya que el div tiene tama?o distinto
		if(document.getElementById("franquiciasText_" + codigoGarantia) != null){
			if(document.getElementById("franquiciasText_" + codigoGarantia).className != "franquiciasLimitesSpanAzul mostrarVis"){
				height = 40;				
			}else{
				if(listaFranquicias == "" || listaFranquicias == "null")//Es una Franquicia de Introducir Datos
					height = 225;
				else //Es una lista de Franquicias
					height = 283;
			}
		}
		
		if((document.getElementById("franquicias_" + codigoGarantia).offsetTop + 21 + cSumasOffSetHeight + height) > parent.document.getElementById('iTabContent').height){  
			layOut_iFrame_page4(parent.document.getElementById('iTabContent'), document.getElementById("franquicias_" + codigoGarantia).offsetTop + 21 + cSumasOffSetHeight + height - parent.document.getElementById('iTabContent').height);
		}
	}
}


//FUNCION QUE MUESTRA EL DETALLE DE LAS FRANQUICIAS EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

function cambiarEstiloInicialFranq(elemento){
	if(elemento.className == "franquiciasLimitesSpanVerde mostrarVis"){
		elemento.className = "franquiciasLimitesSpanHover mostrarVis";
	}
}

function controlContenidoFranquicia(codigoCobertura, codigoGarantia, listaFranquicias,  cSumasOffSetHeight){
	//Redimensionamos el iFrame para el caso de que el div rebose el iTabcontent por abajo
	//Obtenemos el alto del iTabContent y vemos si el valor offsetTop + 21 + si hay sumas + el alto del div 225 es mayor que el alto del iTabContent
	var height = 0;
	
	//Se establece para comprobar si la franquicia tiene contenido ya que el div tiene tama?o distinto
	if(document.getElementById("franquiciasButton_" + codigoGarantia) != null){
		if(document.getElementById("franquiciasButton_" + codigoGarantia).className != "franquiciasLimitesSpanAzul mostrarVis"){
			height = 40;
		}else{
			if(listaFranquicias == "" || listaFranquicias == "null")//Es una Franquicia de Introducir Datos
				height = 235;
			else //Es una lista de Franquicias
				height = 283;
		}
	}
	
	if((document.getElementById("franquicias_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + height) > parent.document.getElementById('iTabContent').height){  
		layOut_iFrame_page4(parent.document.getElementById('iTabContent'), document.getElementById("franquicias_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + height - parent.document.getElementById('iTabContent').height);
	}
}

function mostrarDivFranquiciasByCodigo(codigoCobertura){
	document.getElementById("idDIVFranquicias").style.display = "block";
	document.getElementById("idDIVFranquicias").style.backgroundColor = "white";
	//Se establece para calcular el offSetHeight de Sumas, ya que desplaza los div
	var cSumasOffSetHeight = 0;
	if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
		cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
	}
	document.getElementById("idDIVFranquicias").style.top = 0+"px"
	document.getElementById("idDIVFranquicias").style.right = 12 + "px";
	
	return cSumasOffSetHeight;
}

//Esta funcion muestra el Detalle de las Franquicias de las Garantias como un Div flotante 		
function mostrarDIVFranquiciasDetalle(controlVariasFranq, elemento, descripcion, codigoGarantia, codigoCobertura, nivelGarantia, coGarantia, garantiasHashMap, listaFranquicias){
	
	cambiarEstiloInicialFranq(elemento);
	
	//Comprobamos si es una Garantia o una Cobertura, si es una Garantia el codigoCobertura es igual al codigoGarantia
	if(codigoCobertura == "")
		codigoCobertura = codigoGarantia;
	
	if(document.getElementById("franquiciasButton_" + codigoCobertura) != null){
		var cSumasOffSetHeight = mostrarDivFranquiciasByCodigo(codigoCobertura);
		retrieveURLWithoutParametersSync(urlAccionFranquicias + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion + "&controlVariasFranq=" + controlVariasFranq);			
		controlContenidoFranquicia(codigoCobertura, codigoGarantia, listaFranquicias, cSumasOffSetHeight);
	}
}

//Esta funcion muestra el Detalle de las Franquicias (cuando proviene de una lista de valores) de las Garantias como un Div flotante 		
function mostrarDIVFranquiciasListaDetalle(controlVariasFranq, elemento, descripcion, codigoGarantia, codigoCobertura, nivelGarantia, coGarantia, garantiasHashMap, listaFranquicias){
	
	cambiarEstiloInicialFranq(elemento);
	
	//Comprobamos si es una Garantia o una Cobertura, si es una Garantia el codigoCobertura es igual al codigoGarantia
	if(codigoCobertura == "")
		codigoCobertura = codigoGarantia;
	
	if(document.getElementById("franquiciasButton_" + codigoCobertura) != null){
		var cSumasOffSetHeight = mostrarDivFranquiciasByCodigo(codigoCobertura);
		retrieveURLWithoutParametersSync(urlAccionFranquiciasMultiples + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion + "&controlVariasFranq=" + controlVariasFranq);			
		controlContenidoFranquicia(codigoCobertura, codigoGarantia, listaFranquicias, cSumasOffSetHeight);
	}
}

function mostrarDIVFranquiciasListaUnicaDetalle(controlVariasFranq, elemento, descripcion, codigoGarantia, codigoCobertura, nivelGarantia, coGarantia, garantiasHashMap, listaFranquicias){
	
	retrieveURLWithoutParametersSync(urlAccionFranquiciasListaUnica + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion + "&controlVariasFranq=" + controlVariasFranq);
	
	document.getElementById("idDIVFranquiciasLista").style.display = "block";
	document.getElementById("idDIVFranquiciasLista").style.backgroundColor = "white";

	var cSumasOffSetHeight = 0;
	if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
		cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
	}
	var bottom = jQuery("#idDIVFranquicias").offset().top + jQuery("#idDIVFranquicias").outerHeight(true);
	
	document.getElementById("idDIVFranquiciasLista").style.top = bottom + 10 + cSumasOffSetHeight + "px";
	document.getElementById("idDIVFranquiciasLista").style.right = 12 + "px";
	
	var height = bottom + jQuery("#idDIVFranquiciasLista").outerHeight(true);	
	
	if((bottom + jQuery("#idDIVFranquiciasLista").outerHeight(true)) > parent.document.getElementById('iTabContent').height){  
		layOut_iFrame_page4(parent.document.getElementById('iTabContent'), height - parent.document.getElementById('iTabContent').height);
	}
}



//FUNCION QUE OCULTA LAS FRANQUICIAS EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion oculta las Franquicias de las Garantias como un Div flotante		
function ocultarDIVFranquicias(elemento){
	document.getElementById("idDIVFranquicias").style.display = "none";
	layOut_iFrame_page4(parent.document.getElementById('iTabContent'), 0);
	
	if(elemento.className == "franquiciasLimitesSpanHover mostrarVis"){
		elemento.className = "franquiciasLimitesSpanVerde mostrarVis";	
	}
}

function ocultarDIVFranquiciasLista(elemento){
	document.getElementById("idDIVFranquiciasLista").style.display = "none";
	layOut_iFrame_page4(parent.document.getElementById('iTabContent'), 0);
	
	if(elemento.className == "franquiciasLimitesSpanHover mostrarVis")
		elemento.className = "franquiciasLimitesSpanVerde mostrarVis";		
}

//FUNCION QUE MUESTRA LOS LIMITES EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion muestra los Limites de las Garantias como un Div flotante 
function mostrarDIVLimites(elemento, descripcion, codigoGarantia, codigoCobertura, nivelGarantia, coGarantia, garantiasHashMap){
	
	if(elemento.className == "franquiciasLimitesSpanVerde mostrarVis")//Garantias
		elemento.className = "franquiciasLimitesSpanHover mostrarVis";
	if(elemento.className == "franquiciasLimitesSpanVerde")//Coberturas, ya que se establece con un visibility:inherit, mirar LimitesTag	
		elemento.className = "franquiciasLimitesSpanHover";
		
	//Comprobamos si es una Garantia o una Cobertura, si es una Garantia el codigoCobertura es igual al codigoGarantia
	var elemento = "";
	if(codigoCobertura == ""){//Garantia
		codigoCobertura = codigoGarantia;
		elemento = document.getElementById("limitesText_" + codigoGarantia)
	}else{//Cobertura
		elemento = document.getElementById("flechaLimites_" + codigoGarantia)
	}
	if( elemento != null && elemento.currentStyle.visibility == "visible"){
   		document.getElementById("idDIVLimites").style.display = "block";
		document.getElementById("idDIVLimites").style.backgroundColor = "white";
		//Se establece para calcular el offSetHeight de Sumas, ya que desplaza los div
		var cSumasOffSetHeight = 0;
		if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
			cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
		}
		document.getElementById("idDIVLimites").style.top = document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + "px";
		document.getElementById("idDIVLimites").style.right = 12 + "px";
		retrieveURLPorPost(urlAccionLimites + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion,'garantiasForm',false);
	
		//Redimensionamos el iFrame para el caso de que el div rebose el iTabcontent por abajo
		//Obtenemos el alto del iTabContent y vemos si el valor offsetTop + 21 + si hay sumas + el alto del div 85 es mayor que el alto del iTabContent
		var height = 0;
		
		//Se establece para comprobar si el limite tiene contenido ya que el div tiene tama?o distinto
		if(codigoCobertura == ""){//Garantia
			if(document.getElementById("limitesText_" + codigoCobertura) != null){
				if(document.getElementById("limitesText_" + codigoCobertura).className != "franquiciasLimitesSpanAzul mostrarVis"){
					height = 40;
				}else{
					height = 95;
				}
			}
		}else if(codigoCobertura != ""){//Cobertura
			if(document.getElementById("limitesTextCobertura_" + codigoCobertura) != null){
				if(document.getElementById("limitesTextCobertura_" + codigoCobertura).className != "franquiciasLimitesSpanAzul mostrarVis"){
					height = 40;
				}else{
					height = 95;
				}
			}
		}
		
		if((document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + height) > parent.document.getElementById('iTabContent').height){  
			layOut_iFrame_page4(parent.document.getElementById('iTabContent'), document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + height - parent.document.getElementById('iTabContent').height);
		}
	}
}
	

//FUNCION QUE MUESTRA EL DETALLE DE LOS LIMITES EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion muestra el Detalle de los Limites de las Garantias como un Div flotante 		
function mostrarDIVLimitesDetalle(elemento, descripcion, codigoGarantia, codigoCobertura, nivelGarantia, coGarantia, garantiasHashMap){
	
	if(elemento.className == "franquiciasLimitesSpanVerde mostrarVis")
		elemento.className = "franquiciasLimitesSpanHover mostrarVis";
	
	//Comprobamos si es una Garantia o una Cobertura, si es una Garantia el codigoCobertura es igual al codigoGarantia
	if(codigoCobertura == "")
		codigoCobertura = codigoGarantia;
	if(document.getElementById("limitesButton_" + codigoCobertura) != null){
   		document.getElementById("idDIVLimites").style.display = "block";
		document.getElementById("idDIVLimites").style.backgroundColor = "white";
		//Se establece para calcular el offSetHeight de Sumas, ya que desplaza los div
		var cSumasOffSetHeight = 0;
		if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
			cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
		}
		document.getElementById("idDIVLimites").style.top = document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + "px";
		document.getElementById("idDIVLimites").style.right = 12 + "px";
		retrieveURLWithoutParametersSync(urlAccionLimites + "?codigoGarantia=" + codigoGarantia  + "&nivelGarantia=" + nivelGarantia + "&coGarantia=" + coGarantia + "&garantiasHashMap1=" + garantiasHashMap + "&descGarantia=" + descripcion);
	
		//Redimensionamos el iFrame para el caso de que el div rebose el iTabcontent por abajo
		//Obtenemos el alto del iTabContent y vemos si el valor offsetTop + 21 + si hay sumas + el alto del div 85 es mayor que el alto del iTabContent
		var height = 0;
				
		//Se establece para comprobar si el limite tiene contenido ya que el div tiene tama?o distinto
		if(codigoCobertura == ""){//Garantia
			if(document.getElementById("limitesText_" + codigoCobertura) != null){
				if(document.getElementById("limitesText_" + codigoCobertura).className != "franquiciasLimitesSpanAzul mostrarVis"){
					height = 40;
				}else{
					height = 95;
				}
			}
		}else if(codigoCobertura != ""){//Cobertura
			if(document.getElementById("limitesTextCobertura_" + codigoCobertura) != null){
				if(document.getElementById("limitesTextCobertura_" + codigoCobertura).className != "franquiciasLimitesSpanAzul mostrarVis"){
					height = 40;
				}else{
					height = 95;
				}
			}
		}
		
		if((document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + 85) > parent.document.getElementById('iTabContent').height){  
			layOut_iFrame_page4(parent.document.getElementById('iTabContent'), document.getElementById("limites_" + codigoCobertura).offsetTop + 21 + cSumasOffSetHeight + 85 - parent.document.getElementById('iTabContent').height);
		}
	}
}

		
//FUNCION QUE OCULTA LOS LIMITES EN UN DIV FLOTANTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion oculta los Limites de las Garantias como un Div flotante		
function ocultarDIVLimites(elemento){
	document.getElementById("idDIVLimites").style.display = "none";
	layOut_iFrame_page4(parent.document.getElementById('iTabContent'), 0);
	
	if(elemento.className == "franquiciasLimitesSpanHover mostrarVis")//Garantias
		elemento.className = "franquiciasLimitesSpanVerde mostrarVis";
	if(elemento.className == "franquiciasLimitesSpanHover")//Coberturas, ya que se establece con un visibility:inherit, mirar LimitesTag	
		elemento.className = "franquiciasLimitesSpanVerde";			
}


//FUNCION QUE MUESTRA UN DIV PARA VER EL DETALLE DE LA GARANTIA
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion muestra un div que al pinchar en el se ve el detalle de la Garantia
function verDIVDetalleGarantias(codigoGarantia){
	if(document.getElementById("flechaDetalleGarantia_" + codigoGarantia).style.visibility == "visible"){
   		document.getElementById("idDIVDetalleGarantias").style.display = "block";
   		document.getElementById("idDIVDetalleGarantias").style.backgroundColor = "white";
   		
   		document.getElementById("idDIVDetalleGarantias").style.top = document.getElementById("idDetalleGarantia_" + codigoGarantia).offsetTop - 3;
		document.getElementById("idDIVDetalleGarantias").style.left = 242 + "px";
		document.getElementById("idDIVDetalleGarantias").onclick = document.getElementById("idDetalleGarantia_" + codigoGarantia).onclick;	   
	}		
}


//FUNCION QUE MUESTRA LA CABECERA FLOTANTE EN GARANTIAS
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion muestra la cabecera flotante en las Garantias
function JSFX_FloatTopDiv(elemento){
	var hTab = 25;
	var hDiv = 29;
	var diff = 0;
	var startX = 0;
	var startY = 0;
	
	if(document.getElementById("cCabTablaIzq" + elemento)!= null){
	
		function ml(id){
			var elemento = document.getElementById(id);
			
			//Height del Tab
			//top.window.frames['iAreaTrabajo'].document.getElementById("cTabs").offsetHeight
			//Height desde el Div de Informacion Economica hasta el Tab
			//document.getElementById(id).offsetHeight
			//Height de la cotizacion
			//parent.document.getElementById("cotizacionForm").offsetHeight;				
			
			elemento.sP = function(x,y){
							this.style.left=x;
							this.style.top=y;
						  }
	
		    elemento.x = startX;			    
		    elemento.y = startY;							
			
			return elemento;
		}
				
		if ((top.window.frames['iAreaTrabajo']) && (top.window.frames['iAreaTrabajo'].document)) {
			top.window.frames['iAreaTrabajo'].document.body.onscroll = function() { 
				
				if(top.window.frames['iAreaTrabajo']){
					var posicionY = top.window.frames['iAreaTrabajo'].document.body.scrollTop;			
					
					var cSumasOffSetHeight = 0;
					if(document.getElementById("cSumas") != null && (document.getElementById("cSumas") != "undefined" || document.getElementById("cSumas") != "")){
						cSumasOffSetHeight = document.getElementById("cSumas").offsetHeight + 29;
						hTab = 25;
						//cuando sale el mensaje en Sumas de que no hay elementos seleccionados
						if(document.getElementById("idElementosSeleccionadosSumas") != null && document.getElementById("cSumas").currentStyle.display == "block")
							hTab = 12;
					}			
					//Para el caso de una cotizacion de hogar
					if(parent.document.getElementById("cTabWindow").offsetTop >= 300)
						hTab = 19;			
					var divHeight = parent.document.getElementById("cTabWindow").offsetTop + hTab + cSumasOffSetHeight;
					
					//alert(parent.document.getElementById("cTabWindow").offsetTop);
					//alert(divHeight);
					//alert((posicionY % hDiv));
					if((posicionY % hDiv) == 0 && (posicionY < divHeight)){
						diff = posicionY - divHeight + hDiv - 3;		
					}
					if(diff < 0)
						diff = 0; 
					
					if(posicionY >= divHeight){
						//Comprobamos que el resto sea cero					
						if((posicionY % hDiv) != 0){
							//Restamos a la posicion del scroll el resto para centrarlo en la psicion adecuada
							posicionY = posicionY - (posicionY % hDiv);											
						}
						
						//Sumamos a la posicion del Div la propia altura para tenerlo una poscion por delante
						elementoDIV.y = posicionY - divHeight + hDiv + diff;
						elementoDIVDesc.y = posicionY - divHeight + hDiv + diff;				
					}				
					if(posicionY < divHeight){//dejamos al DIV en la posicion inicial
						elementoDIV.y = 0;
						elementoDIVDesc.y = 0;
					}
					
					elementoDIV.sP(elementoDIV.x, elementoDIV.y);
					elementoDIVDesc.sP(elementoDIVDesc.x, elementoDIVDesc.y);
				}	
			}
		}
		elementoDIV = ml("cCabTablaDcha" + elemento);
		elementoDIVDesc = ml("cCabTablaIzq" + elemento);	
	}
}

//*****************************************FUNCIONES PARA EL CHECKEO Y DESCHEKEO DE ELEMENTOS******************************************


//FUNCION PRINCIPAL INVOCADA CUANDO PULSAMOS SOBRE UN CHECK DE UN ELEMENTO Y QUE SE ENCARGA DE PONER A ENABLED O DISABLED LOS ELEMENTOS
//INVOCADA POR: seleccionCheckboxGeneral, seleccionCheckboxHijosGeneral Y selecionCheckboxHijosDesCheckedGeneral
//INVOCA A: comprobarIdentificadorGeneral 

//Esta funcion se encarga de comprobar que elementos se debe den validar cunado se seleccione
function validarCheckboxGeneral(codigo){	
	//Obtenemos todos los td existentes en la jsp
	var elementoTABLE = document.getElementById("table_" + codigo);
	var elementosTD = elementoTABLE.getElementsByTagName("td");
	//Obtenemos los elementos input de cada td
	var elementosINPUT = "";
	//Obtenemos los elementos select
	var elementosSELECT = "";
	
	for(var i=0; i<elementosTD.length; i++){
		//Los elementos td que no tenga id no nos valen
		if(elementosTD.item(i).getAttribute("id") != ""){
			if(comprobarIdentificadorGeneral(elementosTD.item(i).getAttribute("id"), codigo)){
				//Comprobamos todos los input
				elementosINPUT = elementosTD.item(i).getElementsByTagName("input");
				for(var j=0; j<elementosINPUT.length; j++){
					//Los elementos checkbox y hidden no los queremos deshabilitar
					if((elementosINPUT.item(j).getAttribute("type") != "checkbox") && (elementosINPUT.item(j).getAttribute("type") != "hidden") && (elementosINPUT.item(j).getAttribute("type") != "button")){
						//if((elementosINPUT.item(j).currentStyle.getAttribute("display") != "block") || (elementosINPUT.item(j).currentStyle.getAttribute("visibility") != "visible")){
							//Si estan habilitados los deshabilitamos y viceversa
							if(elementosINPUT.item(j).getAttribute("disabled") == true){
								elementosINPUT.item(j).setAttribute("disabled", false);
							}else{
								elementosINPUT.item(j).setAttribute("disabled", true);
								//Comprobamos si al deschekear se ha introducido algun valor, sino, se pone el recuadro con su color inicial, si tiene valor
								//Se deja el recuadro para indicar que ese valor introducido sigue sin ser correcto 
								if(elementosINPUT.item(j).value == ""){
									elementosINPUT.item(j).style.border = "1px solid #CCCCCC";
								}
							}
						//}
					}
				}
				//Comprobamos todos los select
				elementosSELECT = elementosTD.item(i).getElementsByTagName("select");
				for(var k=0; k<elementosSELECT.length; k++){
					//Si estan habilitados los deshabilitamos y viceversa
					if((elementosSELECT.item(k).currentStyle.getAttribute("display") == "inline") || (elementosSELECT.item(k).currentStyle.getAttribute("visibility") == "inherit")){
						if(elementosSELECT.item(k).getAttribute("disabled") == true)
							elementosSELECT.item(k).setAttribute("disabled", false);
						else
							elementosSELECT.item(k).setAttribute("disabled", true);
					}
				}				
			}
		}
	}
	
	//Comprobamos los enlaces de Franquicias, Limites y Garantias Libre
	//Utilizo currentStyle.getAttribute("visibility") en vez de style.visibility ya quen en el primero tengo un class y en el segundo
	//tengo definido directamente como style, por ello se accede de forma distinta
	var franquiciasEnlace = document.getElementsByName("franquiciasText_" + codigo);
	for(var l=0; l<franquiciasEnlace.length; l++){
		if(franquiciasEnlace[l].currentStyle.getAttribute("visibility") == "hidden"){			
			var className = franquiciasEnlace[l].className;
			franquiciasEnlace[l].style.visibility = "visible";
			franquiciasEnlace[l].className = className.replace("ocultaVis", "mostrarVis");	
		}
		else if(franquiciasEnlace[l].currentStyle.getAttribute("visibility") == "visible"){
			var className = franquiciasEnlace[l].className;
			franquiciasEnlace[l].style.visibility = "hidden";
			franquiciasEnlace[l].className = className.replace("mostrarVis", "ocultaVis");	
		}
	}
	
	var limitesEnlace = document.getElementsByName("limitesText_" + codigo);	
	for(var l=0; l<limitesEnlace.length; l++){
		if(limitesEnlace[l].currentStyle.getAttribute("visibility") == "hidden"){
			var className = limitesEnlace[l].className;
			limitesEnlace[l].style.visibility = "visible";
			limitesEnlace[l].className = className.replace("ocultaVis", "mostrarVis");
		}
		else if(limitesEnlace[l].currentStyle.getAttribute("visibility") == "visible"){
			var className = limitesEnlace[l].className;
			limitesEnlace[l].style.visibility = "hidden";
			limitesEnlace[l].className = className.replace("mostrarVis", "ocultaVis");
		}
	}
	var limitesFlecha = document.getElementsByName("flechaLimites_" + codigo);
	for(var l=0; l<limitesFlecha.length; l++){
		if(limitesFlecha[l].style.visibility == "hidden"){
			limitesFlecha[l].style.visibility = "visible";
		}
		else if(limitesFlecha[l].style.visibility == "visible"){
			limitesFlecha[l].style.visibility = "hidden";
		}
	}
	
	var garantiasLibreEnlace = document.getElementsByName("garantiasLibreText_" + codigo);	
	for(var l=0; l<garantiasLibreEnlace.length; l++){
		if(garantiasLibreEnlace[l].style.visibility == "hidden")
			garantiasLibreEnlace[l].style.visibility = "visible";
		else if(garantiasLibreEnlace[l].style.visibility == "visible")
			garantiasLibreEnlace[l].style.visibility = "hidden";
	}
	var garantiasLibreFlecha = document.getElementsByName("flechaGarantiasLibre_" + codigo);	
	for(var l=0; l<garantiasLibreFlecha.length; l++){
		if(garantiasLibreFlecha[l].style.visibility == "hidden")
			garantiasLibreFlecha[l].style.visibility = "visible";
		else if(garantiasLibreFlecha[l].style.visibility == "visible")
			garantiasLibreFlecha[l].style.visibility = "hidden";
	}
	
	//Comprobamos la flecha del Detalle de Garantias
	var garantiasDetalleFlecha = document.getElementsByName("flechaDetalleGarantia_" + codigo);	
	for(var l=0; l<garantiasDetalleFlecha.length; l++){
		if(garantiasDetalleFlecha[l].style.visibility == "hidden")
			garantiasDetalleFlecha[l].style.visibility = "visible";
		else if(garantiasDetalleFlecha[l].style.visibility == "visible"){
		    //Solo se pone a hidden cuando la garantia no este anulada
		    if(garantiasDetalleFlecha[l].getAttribute("garantiaAnulada") == "false"){
				garantiasDetalleFlecha[l].style.visibility = "hidden";
			}
		}
	}
	

}


//FUNCION PRINCIPAL INVOCADA CUANDO PULSAMOS SOBRE UN CHECK DE UN ELEMENTO Y QUE INVOCA A LAS DEMAS FUNCIONES
//INVOCADA POR: DESDE JSP
//INVOCA A: seleccionCheckboxHijosGeneral, selecionCheckboxHijosDesCheckedGeneral Y  validarCheckboxGeneral

//Esta funcion selecciona a los elementos padre cuando seselecciona un hijo y deselecciona los hijos al deseleccionar el padre
function seleccionCheckboxGeneral(elemento, codigoPadre, codigoHijo, codigoSegundoHijo, codigo){
	//Obtenemos el elemento padre
	var elementoPadre = document.getElementById("checkbox_" + codigoPadre);
	//Obtenemos el elemento hijo
	var elementoHijo = document.getElementById("checkbox_" + codigoHijo);
	//Obtenemos los input		
	var elementoINPUT = elementoPadre.getElementsByTagName("input");
	var elementoINPUT2 = elementoHijo.getElementsByTagName("input");
	
	//Primero comprobamos si estamos chekeando o deschekeando
	if(elemento.checked == true){
		//Estamos chekeando
		//Comprobamos si es un elemento padre
		if(codigoPadre != codigoHijo){
			//Es un elemento hijo		
			//Comprobamos al seleccionar un hijo que se haya seleccionado el padre
			if(codigoSegundoHijo == ""){
				seleccionCheckboxHijosGeneral(elementoINPUT, codigoPadre, codigoHijo);
			}
			//Caso de Garantias, es una garantia hija de segundo nivel
			if(codigoSegundoHijo != ""){
			   	seleccionCheckboxHijosGeneral(elementoINPUT2, codigoHijo, codigoSegundoHijo);
				seleccionCheckboxHijosGeneral(elementoINPUT, codigoPadre, "");			
			}
		}else{
			//Es un elemento padre
			validarCheckboxGeneral(codigoPadre);
			if(codigo == "codigoSuma"){	
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoPadre, codigo + "Hijo");
			} else {
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoPadre, codigo);
			}
		}
	}else{
		//Estamos deschekeando
		if(codigoPadre == codigoHijo){
			//Es un elemento padre
			//Como es distinto para el caso de sumas y garantias lo distingo
			if(codigo == "codigoSuma") {
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoPadre, codigo + "Hijo");
			} else{
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoPadre, codigo);
			}
			
			//validarCheckboxGeneral(codigoHijo);
			validarCheckboxGeneral(codigoPadre);
			
		}
		else if(codigoSegundoHijo == ""){
			//Es un elemento hijo
			//Como es distinto para el caso de sumas y garantias lo distingo
			if(codigo == "codigoGarantia")		
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo + "Hijo", codigoHijo, codigo + "SegundoHijo");
			else
				selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoHijo, codigo + "Hijo");
			//Deshabilitamos los elementos del hijo
			validarCheckboxGeneral(codigoHijo);
		}
		else if(codigoSegundoHijo != ""){
			//Caso de Garantias, es una garantia de segundo nivel
			validarCheckboxGeneral(codigoSegundoHijo);	
		}
			
	}			
	
}


//FUNCION QUE SE ENCARGA DE PONER A CHEKEADO EL ELEMENTO Y LLAMAR A LA FUNCION validarCheckboxGeneral
//INVOCADA POR: seleccionCheckboxGeneral
//INVOCA A: validarCheckboxGeneral

//Este metodo es el activa o desactiva un elemento que seleccionamos y se encarga de invocar a la funcion para deshabilitar o habilitar los elementos
function seleccionCheckboxHijosGeneral(elementoINPUT, codigoPadre, codigoHijo){
    for(var i=0; i<elementoINPUT.length; i++){
		if(elementoINPUT.item(i).getAttribute("type") == "checkbox"){
			//Comprobamos si el elemento padre esta chekeado 
			if(elementoINPUT.item(i).getAttribute("checked") == false){
				//Seleccionamos el elemento padre
				elementoINPUT.item(i).setAttribute("checked", true);
				//Activamos los elementos del elemento padre
				validarCheckboxGeneral(codigoPadre);							
			}
			//Activamos los elementos del elemento hijo
			if(codigoHijo != "")
				validarCheckboxGeneral(codigoHijo);				
		}						
	}
}


//FUNCION QUE SE ENCARGA DE PONER A DESCHEKEADO EL ELEMENTO Y SUS HIJOS
//INVOCADA POR: seleccionCheckboxGeneral
//INVOCA A: validarCheckboxGeneral

//este metodo es el que se encarga de descheckear quellos elementos chekeados y habilita o deshabilita los elementos
function selecionCheckboxHijosDesCheckedGeneral(elemento, codigo, codigoPadre, codigoElemento){
	//Si es una suma padre deshabilitamos los hijos si se deselecciona
	var elementoDIV = document.getElementById("div_flotaIzquierda");
	elementoINPUT = elementoDIV.getElementsByTagName("input");
	var elementoID;
	
	for(var i=0; i<elementoINPUT.length; i++){
		//Obtenemos solo los elementos checkbox
		if(elementoINPUT.item(i).getAttribute("type") == "checkbox"){
			//Obtenemos solo aquellos elementos que pertenezcan al elemento padre seleccionado
			if(elementoINPUT.item(i).parentNode.getAttribute(codigo) == codigoPadre){
				//Comprobamos que si se selecciona el elemento padre el primero, este no se deseleccione
				if(elementoINPUT.item(i).parentNode.getAttribute("id") != elemento.parentNode.getAttribute("id")){
					var idCheckBox = elementoINPUT.item(i).getAttribute("name").substr(0, elementoINPUT.item(i).getAttribute("name").lastIndexOf("\."));
					var padre = idCheckBox.substr(0, idCheckBox.lastIndexOf("\.")) + ".chekeadoGarantias_";
					if(elementoINPUT.item(i).getAttribute("checked") == true && elementoINPUT.item(i).getAttribute("disabled") == false){	
						if (document.getElementById(padre).value == 0) {
							//	Establecemos el checked a false para cada elemento
							elementoINPUT.item(i).setAttribute("checked", false);
							
							//Deshabilitamos los elementos para cada uno de los hijos
							//Obtengo el id de cada elemento que tenemos
							elementoID = elementoINPUT.item(i).parentNode.getAttribute("id");					
							//el id esta formado por checkbox_ + codigo, yo lo que obtengo es ese codigo mediante el substr
							validarCheckboxGeneral(elementoID.substr(9,elementoID.length));
						}
						
						propertyCheck(document.getElementById(elementoINPUT.item(i).name + "_"), elementoINPUT.item(i).checked, '1', '0');						
					} else if(elementoINPUT.item(i).getAttribute("checked") == false && elementoINPUT.item(i).getAttribute("disabled") == false){
						if (document.getElementById(padre).value == 1) {
							elementoINPUT.item(i).setAttribute("checked", true);	
							//Deshabilitamos los elementos para cada uno de los hijos
							//Obtengo el id de cada elemento que tenemos
							elementoID = elementoINPUT.item(i).parentNode.getAttribute("id");					
							//el id esta formado por checkbox_ + codigo, yo lo que obtengo es ese codigo mediante el substr
							validarCheckboxGeneral(elementoID.substr(9,elementoID.length));
						}
						
						propertyCheck(document.getElementById(elementoINPUT.item(i).name + "_"), elementoINPUT.item(i).checked, '1', '0');						
					}
				}
			}
		}		
	}
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion se encaraga de poner chekeadas las garantias incluidas
function selecionGarantiasIncluidas(listaIncluidas){

	var elemento = "";
	for(l=0; l<listaIncluidas.length; l++){	
		elemento = document.getElementById("checkbox_" + listaIncluidas[l]);
		elemento.firstChild.setAttribute("checked", true);
		validarCheckboxGeneral(listaIncluidas[l]);
		elemento.setAttribute("disabled", true);
	}
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Esta funcion se encarga de poner a deschekeado las garantias excluidas
function selecionGarantiasExcluidas(listaExcluidas){

	var elemento = "";
	for(k=0; k<listaExcluidas.length; k++){
		elemento = document.getElementById("checkbox_" + listaExcluidas[k]);
		elemento.firstChild.setAttribute("checked", false);
		validarCheckboxGeneral(listaExcluidas[k]);
		elemento.setAttribute("disabled", true);
	}
}

//FUNCION QUE SE ENCARGA DE MOSTRAR UN ALERT CON LAS GARANTIAS INCLUIDAS Y EXCLUIDAS
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA

//Este metodo se encarga de mostrar por pantalla quellas garantias que han sido Incluidas y Excluidas
function selecionGarantiasIncluidasExcluidas(listaIncluidas, listaExcluidas, elemento){

	var mensajeGarantias = "";
	
	if(elemento.checked == true){
		//Garantias Incluidas
		if(listaIncluidas != ""){
			for(l=0; l<listaIncluidas.length; l++){	
				if(l==0){
					mensajeGarantias = "Debe contratar las garant\u00EDas:   \n";				
				}
				mensajeGarantias = mensajeGarantias + "    ->  " + listaIncluidas[l] + "     \n";
				
			}
			if(listaExcluidas != "")
				mensajeGarantias = mensajeGarantias + "\n";
		}
		//Garantias Excluidas
		if(listaExcluidas != ""){
			for(k=0; k<listaExcluidas.length; k++){
				if(k==0){
					mensajeGarantias = mensajeGarantias + "Garant\u00EDas incompatibles:   \n";				
				}
				mensajeGarantias = mensajeGarantias + "    ->  " + listaExcluidas[k] + "     \n";
			}
		}
		//Mostramos el mensaje con las Garantias Incluidas y Excluidas
		//alert(mensajeGarantias);
	}
}


//*****************************************FUNCIONES PARA VALIDACIONES DE FRANQUICIAS**************************************************


//FUNCION QUE ESTABLECE LA DESCRIPCION DE UN COMBO EN UN HIDDEN PARA LUEGO MOSTRARLO EN EL DETALLE
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA 

//Esta funcion establece en un hidden la descripcion del combo seleccionado
//Recibe en hidden el parametro hidden y el propio elemento 
function setValoresDescripcionCombo(hidden, elemento){
	//Obtenemos el texto seleccionado en el combo
	var value = elemento.options[elemento.selectedIndex].text;
	//Establecemos el valor de la descripcion en el campo hidden para poder mostrar en el detalle la descripcion del combo
	document.getElementById(hidden).value = value;
				
} 


//FUNCION QUE INICIALIZA LOS DATOS DE LOS CAMPOS AL MOVERNOS POR EL COMBO
//INVOCADA POR: muestraValor Y muestraValorFranquicias
//INVOCA A: NINGUNA 

function inicializarDatosFranquicias(codigoFranquicia){
	//Definimos los id de los elementos necesarios para habiliat o deshabiliar los elementos y ponerlos a en blanco
	var importeText = document.getElementById("importeText_" + codigoFranquicia); 
	var porcentajeText = document.getElementById("porcentajeText_" + codigoFranquicia); 
	var limiteSupText = document.getElementById("limiteSupText_" + codigoFranquicia); 
	var limiteInfText = document.getElementById("limiteInfText_" + codigoFranquicia); 
	var textoText = document.getElementById("textoText_" + codigoFranquicia); 
	var periodoText = document.getElementById("periodoText_" + codigoFranquicia); 
	var selectCarencia = document.getElementById("selectCarencia_" + codigoFranquicia); 
	var descripcionTipoCarencia = document.getElementById("descripcionTipoCarencia_" + codigoFranquicia);
		
	//inicializamos el contenido de los input
	importeText.value = ""; porcentajeText.value = ""; 
	limiteSupText.value = "";  
	limiteInfText.value = "";  
	textoText.value = "";  
	periodoText.value = ""; 
	if(selectCarencia != null){ 
		selectCarencia.selectedIndex = 0; 
		descripcionTipoCarencia.value = ""; 
	}
	
	//Ponemos el color del borde por defecto
	importeText.style.border = "1px solid #CCCCCC"; 
	porcentajeText.style.border = "1px solid #CCCCCC"; 
	limiteSupText.style.border = "1px solid #CCCCCC"; 
	limiteInfText.style.border = "1px solid #CCCCCC"; 
	textoText.style.border = "1px solid #CCCCCC"; 
	periodoText.style.border = "1px solid #CCCCCC";
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: NINGUNA 
		
function mostrarDetalleFranquicias(codigoFranquicia){
	franquiciasButton = document.getElementById("franquiciasButton_" + codigoFranquicia);
	if(franquiciasButton.style.display == 'none')
		franquiciasButton.style.display = 'block';
}


//FUNCION QUE NO SE UTILIZA ACTUALMENTE
//INVOCADA POR: NINGUNA
//INVOCA A: muestraValor 

function validarDatosFranquicias(codigoFranquicia, valor, valorTexto){
	var importeCodigo = document.getElementById(valorTexto + codigoFranquicia);
		
	valor.style.border = "1px solid #CCCCCC";
			
	//Si es un combo tambine entra y comprueba que se seleccione un valor que no sea nulo
	if(valor.value=="" || valor.value==null){
		//Es un combo y esta en blano por lo que hay que ocultar los elementos
		if(valorTexto == "select_"){
			muestraValor(codigoFranquicia, 0);
		}
			
		alert("Debe de introducir un valor");
		valor.style.border = "1px solid #FF0000";
		importeCodigo.setAttribute("abbr", "N");
		importeCodigo.setAttribute("abbrN", "N");
		return false;
	}else{
		valor.style.border = "1px solid #CCCCCC";
		importeCodigo.setAttribute("abbr", "S");
		importeCodigo.setAttribute("abbrN", "S");
	}
		
	
}
		

//FUNCION QUE MUESTRA Y OCULTA LOS CAMPOS EN EL CASO DE LOS ELEMENTOS ESTEN EN PARALELO, OCULTA TANTO CABECERAS COMO ELEMENTOS
//INVOCADA POR: DESDE JSP
//INVOCA A: showHide (En general.js) Y inicializarDatosFranquicias 
		
function muestraValor(codigoFranquicia, valor, inicializar){
	//codigoFranquicia: es el codigo del elemento
	//valor: es el this
	if(valor=="")
		valor='0';			
	
	var mensajeValidar = document.getElementById("mensajeValidar");
	
	//Se establece para dar obligatoriedad solo al campo texto cuando se selecciona texto libre
	//En el caso en que es paralelo accedo al tr y luego mediante firstChild al td que contiene el abbr
	var texto = document.getElementById("texto_" + codigoFranquicia);
	
	//Oculto el mensaje de validacion cada vez que cambio un valor en el combo ya que los datos se inicializan
	mensajeValidar.style.display = "none";
		
	//Para el caso del combo de Tipo Carencia tengo que ocultar tanto el td como el propio elemento por eso tiene un selectCaren y un selectCarencia
	
	//Switch que depende del valor seleccionado en le combo
	switch(valor){
		//true muestra y false no muestra
		case '0':
				//No muestra nada
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,false); showHide('limiteSuperior_' + codigoFranquicia,false); showHide('limiteInferior_' + codigoFranquicia,false); showHide('texto_' + codigoFranquicia,false); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,false); showHide('limiteSuperiorTitle_' + codigoFranquicia,false); showHide('limiteInferiorTitle_' + codigoFranquicia,false); showHide('textoTitle_' + codigoFranquicia,false); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);					
				
				texto.firstChild.abbr = "OP";
														
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		case '1'://es un ImporteFijo
				//Muestra importe y periodo
				showHide('importe_' + codigoFranquicia,true); showHide('porcentaje_' + codigoFranquicia,false); showHide('limiteSuperior_' + codigoFranquicia,false); showHide('limiteInferior_' + codigoFranquicia,false); showHide('texto_' + codigoFranquicia,true); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,true); showHide('porcentajeTitle_' + codigoFranquicia,false); showHide('limiteSuperiorTitle_' + codigoFranquicia,false); showHide('limiteInferiorTitle_' + codigoFranquicia,false); showHide('textoTitle_' + codigoFranquicia,true); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);			 				
				
				texto.firstChild.abbr = "OP";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
			
		case '2'://es un Siniestro
				//Muestra procentaje, periodo y limites
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,true); showHide('limiteSuperior_' + codigoFranquicia,true); showHide('limiteInferior_' + codigoFranquicia,true); showHide('texto_' + codigoFranquicia,true); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,true); showHide('limiteSuperiorTitle_' + codigoFranquicia,true); showHide('limiteInferiorTitle_' + codigoFranquicia,true); showHide('textoTitle_' + codigoFranquicia,true); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);	
				
				texto.firstChild.abbr = "OP";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
						
		case '3'://es un capital
				//Muestra porcentaje, periodo y limites
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,true); showHide('limiteSuperior_' + codigoFranquicia,true); showHide('limiteInferior_' + codigoFranquicia,true); showHide('texto_' + codigoFranquicia,true); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,true); showHide('limiteSuperiorTitle_' + codigoFranquicia,true); showHide('limiteInferiorTitle_' + codigoFranquicia,true); showHide('textoTitle_' + codigoFranquicia,true); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);	
				
				texto.firstChild.abbr = "OP";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		case '4'://es un Periodo de Carencia
				//Muestra periodo, limites y texto
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,false); showHide('limiteSuperior_' + codigoFranquicia,false); showHide('limiteInferior_' + codigoFranquicia,false); showHide('texto_' + codigoFranquicia,true); showHide('periodo_' + codigoFranquicia,true); showHide('selectCaren_' + codigoFranquicia,true); showHide('selectCarencia_' + codigoFranquicia,true);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,false); showHide('limiteSuperiorTitle_' + codigoFranquicia,false); showHide('limiteInferiorTitle_' + codigoFranquicia,false); showHide('textoTitle_' + codigoFranquicia,true); showHide('periodoTitle_' + codigoFranquicia,true); showHide('carenciaTitle_' + codigoFranquicia,true);	
				
				texto.firstChild.abbr = "OP";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		case '5':// es Libre
				//Muestra periodo, limites y texto
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,false); showHide('limiteSuperior_' + codigoFranquicia,false); showHide('limiteInferior_' + codigoFranquicia,false); showHide('texto_' + codigoFranquicia,true); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,false); showHide('limiteSuperiorTitle_' + codigoFranquicia,false); showHide('limiteInferiorTitle_' + codigoFranquicia,false); showHide('textoTitle_' + codigoFranquicia,true); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);	
				
				texto.firstChild.abbr = "";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		default://es en blanco
				//No muestra nada
				showHide('importe_' + codigoFranquicia,false); showHide('porcentaje_' + codigoFranquicia,false); showHide('limiteSuperior_' + codigoFranquicia,false); showHide('limiteInferior_' + codigoFranquicia,false); showHide('texto_' + codigoFranquicia,false); showHide('periodo_' + codigoFranquicia,false); showHide('selectCaren_' + codigoFranquicia,false); showHide('selectCarencia_' + codigoFranquicia,false);
				showHide('importeTitle_' + codigoFranquicia,false); showHide('porcentajeTitle_' + codigoFranquicia,false); showHide('limiteSuperiorTitle_' + codigoFranquicia,false); showHide('limiteInferiorTitle_' + codigoFranquicia,false); showHide('textoTitle_' + codigoFranquicia,false); showHide('periodoTitle_' + codigoFranquicia,false); showHide('carenciaTitle_' + codigoFranquicia,false);	
				
				texto.firstChild.abbr = "OP";
				
				//Inicializamos los datos
				if(inicializar!='false')
					inicializarDatosFranquicias(codigoFranquicia);
				break;
	}
}


//FUNCION QUE MUESTRA Y OCULTA LOS CAMPOS EN EL CASO DE LOS ELEMENTOS ESTEN EN SERIE
//INVOCADA POR: DESDE JSP
//INVOCA A: showHideVis (En general.js) Y inicializarDatosFranquicias 
		
function muestraValorFranquicias(codigoFranquicia, valor){
	//codigoFranquicia: es el codigo del elemento
	//valor: es el this
	//Se establece para dar obligatoriedad solo al campo texto cuando se selecciona texto libre 
	var texto = document.getElementById("texto_" + codigoFranquicia);
	var checkbox = document.getElementById("checkbox_" + codigoFranquicia);			
						
	//Switch que depende del valor seleccionado en le combo
	switch(valor){
		//true muestra y false no muestra
		case '0':
				//No muestra nada
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,false); showHideVis('limiteSupText_' + codigoFranquicia,false); showHideVis('limiteInfText_' + codigoFranquicia,false); showHideVis('textoText_' + codigoFranquicia,false); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
				
				texto.abbr = "OP";
				checkbox.firstChild.checked = false;
																
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		case '1'://es un ImporteFijo
				//Muestra importe y texto
				showHideVis('importeText_' + codigoFranquicia,true); showHideVis('porcentajeText_' + codigoFranquicia,false); showHideVis('limiteSupText_' + codigoFranquicia,false); showHideVis('limiteInfText_' + codigoFranquicia,false); showHideVis('textoText_' + codigoFranquicia,true); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
								
				texto.abbr = "OP";				
				checkbox.firstChild.checked = true;
																
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
				
		case '2'://es un Siniestro
				//Muestra procentaje, texto y limites
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,true); showHideVis('limiteSupText_' + codigoFranquicia,true); showHideVis('limiteInfText_' + codigoFranquicia,true); showHideVis('textoText_' + codigoFranquicia,true); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
				
				texto.abbr = "OP";
				checkbox.firstChild.checked = true;
										
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
			
		case '3'://es un capital
				//Muestra porcentaje, texto y limites
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,true); showHideVis('limiteSupText_' + codigoFranquicia,true); showHideVis('limiteInfText_' + codigoFranquicia,true); showHideVis('textoText_' + codigoFranquicia,true); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
				
				texto.abbr = "OP";
				checkbox.firstChild.checked = true;
										
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
						
		case '4'://es un Periodo de Carencia
				//Muestra periodo, combo y texto
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,false); showHideVis('limiteSupText_' + codigoFranquicia,false); showHideVis('limiteInfText_' + codigoFranquicia,false); showHideVis('textoText_' + codigoFranquicia,true); showHideVis('periodoText_' + codigoFranquicia,true); showHideVis('selectCarencia_' + codigoFranquicia,true);
				
				texto.abbr = "OP";
				checkbox.firstChild.checked = true;
										
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
			
		case '5':// es Libre
				//Muestra texto
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,false); showHideVis('limiteSupText_' + codigoFranquicia,false); showHideVis('limiteInfText_' + codigoFranquicia,false); showHideVis('textoText_' + codigoFranquicia,true); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
				
				texto.abbr = "";
				checkbox.firstChild.checked = true;
											
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
			
		default://es en blanco
				//No muestra nada
				showHideVis('importeText_' + codigoFranquicia,false); showHideVis('porcentajeText_' + codigoFranquicia,false); showHideVis('limiteSupText_' + codigoFranquicia,false); showHideVis('limiteInfText_' + codigoFranquicia,false); showHideVis('textoText_' + codigoFranquicia,false); showHideVis('periodoText_' + codigoFranquicia,false); showHideVis('selectCarencia_' + codigoFranquicia,false);
				
				texto.abbr = "OP";
				checkbox.firstChild.checked = false;
											
				//Inicializamos los datos
				inicializarDatosFranquicias(codigoFranquicia);
				break;
		}
}	
	

//FUNCION QUE COMPRUEBA QUE SOLO SE CHECKEA UN UNICO ELEMENTO
//INVOCADA POR: DESDE JSP
//INVOCA A: NINGUNA 

//Esta funcion comprueba los elementos chekeados, dejando solo chekeado el elemento que hemos seleccionado en ese momento
function comprobarChekeadosGeneral(value, idCheckbox){
	
	var elementoINPUT = document.getElementsByTagName("input");
	var elementoCHECKBOX;
	var tdCheckbox = "checkbox_" +  idCheckbox;
	
	for(var i=0; i<elementoINPUT.length; i++){
		if(elementoINPUT.item(i).getAttribute("type") == "checkbox"){
			elementoCHECKBOX = elementoINPUT.item(i);
			if(elementoCHECKBOX.checked){
				if(elementoCHECKBOX.parentNode.getAttribute("id") != tdCheckbox){
					elementoCHECKBOX.checked = false;					
					propertyCheck(document.getElementById(elementoCHECKBOX.name + "_"), elementoCHECKBOX.checked, '1', '0');	
				}
			}
		}		
	}

}


//FUNCION DE QUE VALIDA CUANDO SE PULSA EL BOTON DE ACEPTAR EN LA VENTANA DE GARANTIAS DE FRANQUICIAS
//INVOCADA POR: DESDE JSP
//INVOCA A: validarDatosGeneral Y comprobarValidacionColorGeneral

//Esta funcion tiene el mismo funcionamiento que que la de validarElementosGeneral pero con la diferencia que esta se adapta a la
//Estructura de elementos uno debajo del otro formada por varios tr, a diferencia de la anterior que muestra los elementos en serie
function validarElementosFranquiciasGeneral(){
	//Obtenemos todos los td existentes en la jsp
	var elementosTR = document.getElementsByTagName("tr");
	//Obtenemos los elementos input de cada td
	var elementosINPUT = "";
	var atributoValidoTD = "";
	var elementoPadre = "";
	//Esta propiedad esta en el td
	var valido = "abbr";
	var N = "N";
	var noValido = false;
	//Este Array contendra todos los elementos que no han sido validados
	var elementos = new Array();
	var valorElementos = 0;
	//Comprobamos si existe algun campo que no es valido
	for(var i=0; i<elementosTR.length; i++){
		//Los elementos td que no tenga id no nos valen
		if(elementosTR.item(i).getAttribute("id") != ""){
			elementosINPUT = elementosTR.item(i).getElementsByTagName("input");
			for(var j=0; j<elementosINPUT.length; j++){
				//Compruebo solo los elementos habilitados
				if((elementosINPUT.item(j).getAttribute("type") != "checkbox") && (elementosINPUT.item(j).getAttribute("type") != "hidden") && (elementosINPUT.item(j).getAttribute("type") != "button")){
					if(elementosINPUT.item(j).getAttribute("disabled") == false){
						//Compruebo solo los elementos que se muestren
						//Para poder realizar esta comprobacion, en los elementos que se muestran permanentes se les ha pueste un cisibility:visible, para que no sean inline o onherit
						if((elementosTR.item(i).currentStyle.getAttribute("display") == "block") || (elementosTR.item(i).currentStyle.getAttribute("visibility") == "visible")){
							//Comprobamos por validacion de color, para asegurarnos mejor
							if(!comprobarValidacionColorGeneral(elementosINPUT.item(j))){
								//Una vez comprobado todo esto, compruebo si es valido
								validarDatosGeneral(elementosINPUT.item(j));
							}
							//Aqui se deberian de validar tambien los limites
							//Compruebo que el elemento abbr del td que contiene el tr esta a S o N 
							atributoValidoTD = elementosTR.item(i).firstChild.getAttribute(valido);
							if(atributoValidoTD == N || atributoValidoTD == ""){
						 		//Introducimos en el Array los elementos que no han sido validados
						 		elementos[valorElementos] = elementosTR.item(i).getAttribute("id");
						 		valorElementos++;
						 		noValido = true;
						 	}   
						}
					}
				}
			}
		}				    	
	}
	
	//Comprobamos todos los select
	var elementosSELECT = "";
	for(var k=0; k<elementosTR.length; k++){
		elementosSELECT = elementosTR.item(k).getElementsByTagName("select");
		for(var l=0; l<elementosSELECT.length; l++){
			//Comprobamos que esten habilitados
			if(elementosSELECT.item(l).getAttribute("disabled") == false){
				//Comprobamos que esten visibles
				if(elementosSELECT.item(l).parentNode.parentNode.style.display == "block"){
					//Obtenemos el valor seleccionado de cada combo y comprobamos que se haya eleccionado alguno
					if(elementosSELECT.item(l).value == ""){
						//Introducimos en el Array los elementos que no han sido validados
						elementos[valorElementos] = elementosSELECT.item(l).parentNode.parentNode.getAttribute("id");
						valorElementos++;
						noValido = true;
					}
			  	}
			}	
		}
	}	
	
	var validar = false;
	//Comprobamos todos los textarea
	var elementoTEXTAREA = document.getElementsByTagName("textarea");
	for(var l=0; l<elementoTEXTAREA.length; l++){
		//Comprobamos que esten habilitados
		if(elementoTEXTAREA.item(l).getAttribute("disabled") == false){
			//Comprobamos que esten visibles
			if(elementoTEXTAREA.item(l).parentNode.parentNode.currentStyle.display == "block"){		  
				//Obtenemos el valor seleccionado de cada combo y comprobamos que se haya eleccionado alguno
				if((elementoTEXTAREA.item(l).value == "") || (elementoTEXTAREA.item(l).value.length>250)){
					if(elementoTEXTAREA.item(l).value.length>250){
						alert("La longitud del texto no debe de superar los 250 caracteres");
						validar = true;
					}
					if(elementoTEXTAREA.item(l).parentNode.getAttribute("abbr") != "OP")
						validar = true;											
					if(validar == true){
						//Una vez comprobado todo esto, compruebo si es valido
						validarDatosGeneral(elementoTEXTAREA.item(l));
						//Introducimos en el Array los elementos que no han sido validados
						elementos[valorElementos] = elementoTEXTAREA.item(l).parentNode.parentNode.getAttribute("id");
						valorElementos++;
						noValido = true;				
					}
				}
		  	}
		}	
	}
		
	var mensajeValidar = document.getElementById("mensajeValidar");
	var valor = 0;
	var valorStr = "";
	var valorCodigo = 0;
	
	//Inicializamos el contenido del div para que borre los datos y estos no se vayan duplicando
	mensajeValidar.innerHTML = "";
	
	//Comprueba si todos los elementos son validos 
	if(noValido == true){		
		//alert("Debe de validar los campos seleccionados");
		for(var i=0; i<elementos.length; i++){
			valor = elementos[i].indexOf("_");		
			valorStr = elementos[i].substr(valor + 4, 1);
			if(isNaN(valorStr)) 
				valorCodigo = 4;
			else
				valorCodigo = 5;
		
			textNode = document.createTextNode("Por favor, debe validar el campo <" + obtenerCampoValidar(document, elementos[i], "") + "> de " + obtenerCampoValidar(document, elementos[i], valorCodigo));
			elementoBR = document.createElement("BR");
			mensajeValidar.appendChild(textNode);
			mensajeValidar.appendChild(elementoBR);
		}
		mensajeValidar.style.display = "block";
		return false;
	}	
	else{
		mensajeValidar.style.display = "none";
		document.forms[0].submit();
		return true;
	}
}



//*****************************************FUNCIONES PARA VALIDACIONES DE LIMITES******************************************************

//SE ESTAN UTILIZANDO FUNCIONES DE FRANQUICIAS PARA VALIDAR EN PARALELO COMO ES validarElementosFranquiciasGeneral EN LOS LIMITES DE
//LAS GARANTIAS

function inicializacionFranquicia(codigoFranquicia, idTipoFranquicia, trCheckBox, initDatos){
	if(initDatos){
		if(trCheckBox.firstChild.checked){
			if(document.getElementById(idTipoFranquicia) != null && document.getElementById(idTipoFranquicia).value == ""){
				document.getElementById(idTipoFranquicia).value = 1;
				muestraValorFranquicias(codigoFranquicia, '1');
			}
		} else {
			document.getElementById(idTipoFranquicia).value = "";
			muestraValorFranquicias(codigoFranquicia, '0');
		}
	}
	propertyCheck(document.getElementById("franquiciasHashMap(" + codigoFranquicia + ").chekeadoFranquicias_"), trCheckBox.firstChild.checked, '1', '0');
	setValoresDescripcionCombo("franquiciasHashMap(" + codigoFranquicia + ").descripcionTipoFranquicia",document.getElementById(idTipoFranquicia));
}

