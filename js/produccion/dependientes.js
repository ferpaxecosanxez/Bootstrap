
// Funcion que evalua si existen campos en el formulario de los cuales dependa el campo donde se situa la funcion

function evalDependientes() {
	try{
		//alert(arguments[0].options[arguments[0].selectedIndex].value);
		for (x = 1; x < arguments.length; x++) {
			cadena = arguments[x];
			//alert(cadena)
			sPredef = document.getElementById("riesgoBean.riesgoPredef."
					+ cadena);
			sCaracAlfa = document.getElementById("riesgoBean.listaCaracteristicas."
					+ cadena + ".valorAlfa");
			sCaracFecha = document
					.getElementById("riesgoBean.listaCaracteristicas."
							+ cadena + ".valorFecha");
			sCaracImporte = document
					.getElementById("riesgoBean.listaCaracteristicas."
							+ cadena + ".valorImporte");
			sCaracNum = document.getElementById("riesgoBean.listaCaracteristicas."
					+ cadena + ".valorNum");
	
			if (sPredef) {
				if(evalDependencia(cadena)){
					showHideOculta(sPredef, true);
					muestraSpan_Img(cadena, true);
				}else{
					showHideOculta(sPredef, false);
					muestraSpan_Img(cadena, false);
					eliminaValor(sPredef);
				}
			} else if (sCaracAlfa) {
				if(evalDependencia(cadena)){
					showHideOculta(sCaracAlfa, true);
					muestraSpan_Img(cadena, true);
				}else{
					showHideOculta(sCaracAlfa, false);
					muestraSpan_Img(cadena, false);
					eliminaValor(sCaracAlfa);
				}
			} else if (sCaracFecha) {
				if(evalDependencia(cadena)){
					showHideOculta(sCaracFecha, true);
					muestraSpan_Img(cadena, true);
				}else{
					showHideOculta(sCaracFecha, false);
					muestraSpan_Img(cadena, false);
					eliminaValor(sCaracFecha);
				}
			} else if (sCaracImporte) {
				if(evalDependencia(cadena)){
					showHideOculta(sCaracImporte, true);
					muestraSpan_Img(cadena, true);
				}else{
					showHideOculta(sCaracImporte, false);
					muestraSpan_Img(cadena, false);
					eliminaValor(sCaracImporte);
				}
			} else if (sCaracNum) {
				if(evalDependencia(cadena)){
					showHideOculta(sCaracNum, true);
					muestraSpan_Img(cadena, true);
				}else{
					showHideOculta(sCaracNum, false);
					muestraSpan_Img(cadena, false);
					eliminaValor(sCaracNum);
				}
			}
		}
	} catch(e)  {
        alert("Error caracteristicas dependientes, revise la parametrizacion " + e);
        return;
    }
}

function eliminaValor(nombrecampo){
  	  switch(nombrecampo.type){
  	  
	    	  case "text":
	    		  nombrecampo.value = "";
	              break;
	          case "textarea":
	        	  nombrecampo.value = "";
	              break;
	          case "checkbox":
	              nombrecampo.checked = false;
	              break;
	          case "select-one":
	               nombrecampo.selectedIndex = 0;
	               break;
	          case "hidden":
	               nombrecampo.value = "";
	               break;
	          case "radio":
	      		  cnombrecampo.checked = false;
	      		  break;
  	  }
}

function muestraSpan_Img(nombreCaracteristica, muestraCaracteristica){
	span_name = "span_" + nombreCaracteristica;
	img_name = "image_" + nombreCaracteristica;
	
	showHideOculta(span_name, muestraCaracteristica);
	showHideOculta(img_name, muestraCaracteristica);
}

//Funcion que evalua si para un campo dado las dependencias existentes se cumplen para  mostrarlo o no

function evalDependencia(nombre) {
	var arrayDependencias;
	var arrayValores;
	
	eval("arrayDependencias = array_" + nombre);
	//alert("arr" + arrayDependencias);
	eval("arrayValores = array_" + nombre + "_valor");
	//alert("arr" + arrayValores);
	bValido = false;
	var contadorElementosValidos = 0;

	for (i = 0; i < arrayDependencias.length; i++) {
		if(bValido){
			bValido = false;
		}
		
		sPredefAux = document.getElementById("riesgoBean.riesgoPredef."
				+ arrayDependencias[i]);
		sCaracAlfaAux = document.getElementById("riesgoBean.listaCaracteristicas."
				+ arrayDependencias[i] + ".valorAlfa");
		sCaracFechaAux = document
				.getElementById("riesgoBean.listaCaracteristicas."
						+ arrayDependencias[i] + ".valorFecha");
		sCaracImporteAux = document
				.getElementById("riesgoBean.listaCaracteristicas."
						+ arrayDependencias[i] + ".valorImporte");
		sCaracNumAux = document.getElementById("riesgoBean.listaCaracteristicas."
				+ arrayDependencias[i] + ".valorNum");
		//alert(arrayValores.length)
		for(j = 0; j < arrayValores[i].length; j++){
			//alert(i+"---"+j+"***"+arrayValores[i][j]+"---"+arrayValores[i]);
			if (sPredefAux) {
				//alert(sPredefAux.options[sPredefAux.selectedIndex].value);
				if(sPredefAux.options[sPredefAux.selectedIndex].value == arrayValores[i][j]){
					bValido = true;
					//alert(bValido);
					break;
				}
			} else if (sCaracAlfaAux) {
				if(sCaracAlfaAux.options[sCaracAlfaAux.selectedIndex].value == arrayValores[i][j]){
					bValido = true;
					break;
				}
			} else if (sCaracFechaAux) {
				if(sCaracFechaAux.options[sCaracFechaAux.selectedIndex].value == arrayValores[i][j]){
					bValido = true;
					break;
				}
			} else if (sCaracImporteAux) {
				if(sCaracImporteAux.options[sCaracImporteAux.selectedIndex].value == arrayValores[i][j]){
					bValido = true;
					break;
				}
			} else if (sCaracNumAux) {
				if(sCaracNumAux.options[sCaracNumAux.selectedIndex].value == arrayValores[i][j]){
					bValido = true;
					break;
				}
			}
		}
		
		if(bValido) contadorElementosValidos++;
	}
	
	bValido = false;
	if(arrayDependencias.length==contadorElementosValidos)bValido = true;
	
	//alert("valido"+bValido)
	return bValido;
}