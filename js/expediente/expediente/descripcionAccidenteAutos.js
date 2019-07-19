/* Funcion para abrir la ventana emergente de busqueda de poliza*/
function busquedaJuzgado(){
    var url = accionBusquedaJuzgado;
    muestraCarga();
  	var valor = lanzarVentana(url,700,550);
    ocultaCarga();

   	if (valor != null){
   		// Recuperamos para el formulario los datos que nos llegan desde el
		// popup de selección de póliza
   		document.getElementById('sntroRgoAutoView.juzgado.id').value = valor[0];
   		document.getElementById('sntroRgoAutoView.juzgado.nombre').value = valor[1];
   	}
}

function nroNaturalezasBloque1(){
	var contador=0;
	if(document.getElementById('sntroRgoAutoView.swRoturaLuna').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swIncendio').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swDanosRobo').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swRoboTotal').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swConsorciable').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swVandalismo').checked){
		contador++;
	}
	if(document.getElementById('sntroRgoAutoView.swAsistencia').checked){
		contador++;
	}
	return contador;
}

/* Funcion para habilitar el campo DAA */
function habilitaDAA(){
	if(document.getElementById('sntroRgoAutoView.numVehiculoContrario') && 
	   parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value) == 1 && 
	   document.getElementById('sntroRgoAutoView.idExDaa') != ""){
		
        document.getElementById('sntroRgoAutoView.swDaa').disabled = false;
	}else if (document.getElementById('sntroRgoAutoView.numVehiculoContrario') && 
			parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value) > 1 && 
			document.getElementById('sntroRgoAutoView.idExDaa') != ""){
		
		var numVehCont = parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value);
		var numVehContAnulado = 0;
		if (document.getElementById('sntroRgoAutoView.numVehiculoContrarioAnulado')) {
			numVehContAnulado = parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrarioAnulado').value);
		}
		if ((numVehCont - numVehContAnulado) > 1 || (numVehCont - numVehContAnulado) < 1){
			if (document.getElementById('sntroRgoAutoView.swDaa')) {
				document.getElementById('sntroRgoAutoView.swDaa').disabled = true;
		        seleccionarCombos('sntroRgoAutoView.swDaa','NO',document.forms[0]);
			}
	       
		} else if ((numVehCont - numVehContAnulado) == 1){
			if (document.getElementById('sntroRgoAutoView.swDaa')) {
				document.getElementById('sntroRgoAutoView.swDaa').disabled = false;
			}
		}
	}else{
		if (document.getElementById('sntroRgoAutoView.swDaa')) {
	        document.getElementById('sntroRgoAutoView.swDaa').disabled = true;
	        seleccionarCombos('sntroRgoAutoView.swDaa','NO',document.forms[0]);
		}
        
	} 
	habilitaFirmadaDAA();
}

function habilitaFirmadaDAA(){
	if (document.getElementById('sntroRgoAutoView.swDaaFirmada')) {
		if(document.getElementById('sntroRgoAutoView.swDaa') && document.getElementById('sntroRgoAutoView.swDaa').value == valorSi){
			document.getElementById('sntroRgoAutoView.swDaaFirmada').disabled = false;
		}else{
			document.getElementById('sntroRgoAutoView.swDaaFirmada').disabled = true;
			document.getElementById('sntroRgoAutoView.swDaaFirmada').checked = false;
			cambiaValorFirmadaDAA();
		}
	}
}

function cambiaValorFirmadaDAA(){
	if (document.getElementById('sntroRgoAutoView.swDaaFirmada')) {
		if (document.getElementById('sntroRgoAutoView.swDaaFirmada').checked == false){
			document.getElementById('sntroRgoAutoView.swDaaFirmada').value = valorNo;
		}else{
			document.getElementById('sntroRgoAutoView.swDaaFirmada').value = valorSi;
		}
	}
}

/* Funcion para habilitar la compania contraria */
function habilitaCiaContraria(bSetValueColisionDirecta){
	
	if(document.getElementById('sntroRgoAutoView.numVehiculoContrario') && parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value) == 1)
	{
		habilitarCmbColisionDirecta(true, bSetValueColisionDirecta);
	}else if (document.getElementById('sntroRgoAutoView.numVehiculoContrario') && parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value) > 1){
		
		var numVehCont = parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrario').value);
		var numVehContAnulado = 0;
		if (document.getElementById('sntroRgoAutoView.numVehiculoContrarioAnulado')) {
			numVehContAnulado = parseInt(document.getElementById('sntroRgoAutoView.numVehiculoContrarioAnulado').value);
		}
		
		if ((numVehCont - numVehContAnulado) > 1 || (numVehCont - numVehContAnulado)< 1){
			habilitarCmbColisionDirecta(false, bSetValueColisionDirecta);
	    }else if ((numVehCont - numVehContAnulado) == 1){
			habilitarCmbColisionDirecta(true, bSetValueColisionDirecta);
		}
	}else{
		habilitarCmbColisionDirecta(false, bSetValueColisionDirecta);
    }
}

function habilitarCmbColisionDirecta(bEstado, bSetValueColisionDirecta){
	if (bEstado == true)
	{
		document.getElementById('sntroRgoAutoView.swColisionDirecta').disabled = false;
        if (document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_COLISVEHICS ||
        		document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_APARCAM ||
        		document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_PROVIS ||
        		document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_ALRECOGER)
    	{
        	if (bSetValueColisionDirecta)
    		{
        		//Indicamos que existe colisión directa automaticamente siempre 
        		document.getElementById('sntroRgoAutoView.swColisionDirecta').value = 1;
        		document.getElementById('sntroRgoAutoView.swColisionDirecta').selectedIndex = 1;
    		}
        	
    	}else{
    		
    		if (bSetValueColisionDirecta)
    		{
        		//Indicamos que existe colisión directa automaticamente siempre 
        		document.getElementById('sntroRgoAutoView.swColisionDirecta').value = 0;
        		document.getElementById('sntroRgoAutoView.swColisionDirecta').selectedIndex = 0;
    		}
    	}
	}
	else 
	{
		document.getElementById('sntroRgoAutoView.swColisionDirecta').disabled = true;
		if (bSetValueColisionDirecta)
		{
    		//Indicamos que existe colisión directa automaticamente siempre 
    		document.getElementById('sntroRgoAutoView.swColisionDirecta').value = 0;
    		document.getElementById('sntroRgoAutoView.swColisionDirecta').selectedIndex = 0;
		}
	}
}

function controlGarantiasSeguro (){
	var denuncia = false;
	habilitarElemento('sntroRgoAutoView.swDenunciaRobo', true);
	document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = false;
	showHide("tdRoturaLunas", false);
	showHide("tdNameRecuperado", false);
	showHide("tdRecuperado", false);
	showHide("tdPartesName", false);
	showHide("tdPartes", false);
	// solo se activan las garantias de la poliza
	if(swGaranLunas == valorNo){
		//document.getElementById('sntroRgoAutoView.swRoturaLuna').disabled = true;
        habilitarElemento('sntroRgoAutoView.swRoturaLuna', false);
        if (document.getElementById('sntroRgoAutoView.tipoRoturaLunas.id')) {
        	document.getElementById('sntroRgoAutoView.tipoRoturaLunas.id').value = 0;
        }
	}
	if(swGaranIncendio == valorNo){
		//document.getElementById('sntroRgoAutoView.swIncendio').disabled = true;
		habilitarElemento('sntroRgoAutoView.swIncendio', false);
		denuncia = true;
	}
	if(swRoboParcial == valorNo){
        //document.getElementById('sntroRgoAutoView.swDanosRobo').disabled = true;
        habilitarElemento('sntroRgoAutoView.swDanosRobo', false);
        denuncia = true;
	}
	if(swRoboTotal == valorNo){
        //document.getElementById('sntroRgoAutoView.swRoboTotal').disabled = true;
        habilitarElemento('sntroRgoAutoView.swRoboTotal', false);
        if (document.getElementById('sntroRgoAutoView.swRecuperado')) {
        	document.getElementById('sntroRgoAutoView.swRecuperado').value = 0;
        }
        denuncia = true;
	}
	if(swDannosPropios == valorNo){
		//document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario').disabled = true;
		habilitarElemento('sntroRgoAutoView.swDanosPropiosConContrario', false);
        //document.getElementById('sntroRgoAutoView.numPartes').disabled = true;
        habilitarElemento('sntroRgoAutoView.numPartes', false);
	}
	if(swDannosPropSinContr == valorNo){
        //document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').disabled = true;
        habilitarElemento('sntroRgoAutoView.swDanosPropiosSinConCulpa', false);
	}
	if(swDannosAparcamiento == valorNo){// Aparcamiento
        //document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').disabled = true;
        habilitarElemento('sntroRgoAutoView.swDanosPropiosSinConNoCulpa', false);
	}
	//Comentado, la naturaleza consorciable está asociado a la garantía RC
	/*if(swConsorciable == valorNo){
        document.getElementById('sntroRgoAutoView.swConsorciable').disabled = true;
	}*/
	if(swVandalismo == valorNo){
        //document.getElementById('sntroRgoAutoView.swVandalismo').disabled = true;
        habilitarElemento('sntroRgoAutoView.swVandalismo', false);
        denuncia = true;
	}
	if (swAsistencia == valorNo){
		//document.getElementById('sntroRgoAutoView.swAsistencia').disabled = true;
		habilitarElemento('sntroRgoAutoView.swAsistencia', false);
	}
	if (denuncia){
		//document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = false;
		habilitarElemento('sntroRgoAutoView.swDenunciaRobo', true);
	}
}

function controlDenuncia(){
	document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = false;
//	if(document.getElementById('sntroRgoAutoView.swIncendio').checked ||
//	   document.getElementById('sntroRgoAutoView.swDanosRobo').checked ||
//	   document.getElementById('sntroRgoAutoView.swRoboTotal').checked ||
//	   document.getElementById('sntroRgoAutoView.swVandalismo').checked){
//		document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = false;
//	} else {
//		document.getElementById('sntroRgoAutoView.swDenunciaRobo').value = 0;
//		document.getElementById('sntroRgoAutoView.swDenunciaRobo').selectedIndex = 0;
//		document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = true;
//	}
}
  
function comprobarNumeroImplicados(){  

	/*
	var nvehic = 0;
	var nfallec = 0;
	var nlesion = 0;
	var npeaton = 0;
	
	if (document.getElementById('sntroRgoAutoView.numVehiculoContrario')) {
		nvehic=document.getElementById('sntroRgoAutoView.numVehiculoContrario').value;
	}
	if (document.getElementById('sntroRgoAutoView.numFallecido')) {
		nfallec=document.getElementById('sntroRgoAutoView.numFallecido').value;
	}
	if (document.getElementById('sntroRgoAutoView.numLesionNoPeaton')) {
		nlesion=document.getElementById('sntroRgoAutoView.numLesionNoPeaton').value;
	}
	if (document.getElementById('sntroRgoAutoView.numLesionPeaton')) {
		npeaton=document.getElementById('sntroRgoAutoView.numLesionPeaton').value;
	}
	if (nvehic < numVehiculosCont || nfallec < numFallecid || nlesion < numLesionad 
        || npeaton < numPeaton){
        if (nvehic < numVehiculosCont){
        	alert(errorNumVehiculos);
        	if (document.getElementById('sntroRgoAutoView.numVehiculoContrario')) {
        		document.getElementById('sntroRgoAutoView.numVehiculoContrario').value = numVehiculosCont;
        	}
        }
        if (nfallec < numFallecid){
        	alert(errorNumFallecidos);
        	if (document.getElementById('sntroRgoAutoView.numFallecido')) {
        		document.getElementById('sntroRgoAutoView.numFallecido').value = numFallecid;
        	}
        }
        if (nlesion < numLesionad){
        	alert(errorNumLesionados);
        	if (document.getElementById('sntroRgoAutoView.numLesionNoPeaton')) {
        		document.getElementById('sntroRgoAutoView.numLesionNoPeaton').value = numLesionad;
        	}
        }
        if (npeaton < numPeaton){
        	alert(errorNumPeatones);
        	if (document.getElementById('sntroRgoAutoView.numLesionPeaton')) {
        		document.getElementById('sntroRgoAutoView.numLesionPeaton').value = numPeaton;
        	}
        }
        return false;
	}else{
        return true;
	}*/
	return true;
}

function validaNaturalezas(campo){
	var contadorNroNaturalezasBloque1=nroNaturalezasBloque1();
	if(contadorNroNaturalezasBloque1>1){
         alert(errorOtraNaturalezaSeleccionada);
         campo.checked=false;
         campo.onclick();
    }return true;
}

function deshabilitaRoboTotal(){
	if(document.getElementById('sntroRgoAutoView.swRoboTotal') &&
	   document.getElementById('sntroRgoAutoView.swRoboTotal').checked &&
	   document.getElementById('sntroRgoAutoView.numVehiculoContrario') && 
	   document.getElementById('sntroRgoAutoView.numVehiculoContrario').value != '0'){
		if (document.getElementById('sntroRgoAutoView.causaSntro.id')) {
			document.getElementById('sntroRgoAutoView.causaSntro.id').value = 0;
			document.getElementById('sntroRgoAutoView.causaSntro.id').selectedIndex = 0;
		}
		
		if (document.getElementById('sntroRgoAutoView.swRoboTotal')) {
			document.getElementById('sntroRgoAutoView.swRoboTotal').checked = false;
			document.getElementById('sntroRgoAutoView.swRoboTotal').value = 0;
		}
		
        if (document.getElementById('sntroRgoAutoView.swRecuperado')) {
        	document.getElementById('sntroRgoAutoView.swRecuperado').value = 0;
        }
        
        if (document.getElementById('sntroRgoAutoView.swDenunciaRobo')) {
	        document.getElementById('sntroRgoAutoView.swDenunciaRobo').value = 0;
			document.getElementById('sntroRgoAutoView.swDenunciaRobo').selectedIndex = 0;
			//document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = true;
			document.getElementById('sntroRgoAutoView.swDenunciaRobo').disabled = false;
        }
		showHide("tdRecuperado", false);
		showHide("tdNameRecuperado", false);
	}
}

function handlerAllBlocksP(pObj, pName) {
	var expandir = (pObj.title.substr(0,3) == "Exp")? true : false;
	var imgSrc = (expandir)? rutaImg + "botContraerTodos.png" : rutaImg + "botExpandirTodos.png";
	changeIcon(pObj.id, imgSrc);
	var bloques = document.getElementsByTagName('div');
	for(var i = 0; i < bloques.length; i++) {
		if (bloques[i].name != undefined && bloques[i].name == "bloque"){
			handlerBlock(bloques[i].id.substr(3));
		}
	}
}

/* Funcion para el control de la gestion especial */
function controlGestionEspecial(){
  if(document.getElementById('sntroRgoAutoView.swGestionEspecial').value == valorSi){
     document.getElementById('sntroRgoAutoView.motGestionEsp.id').disabled = false;
  }else{
     document.getElementById('sntroRgoAutoView.motGestionEsp.id').disabled = true;
     document.getElementById('sntroRgoAutoView.motGestionEsp.id').value = "";
  }
}

function recargaDeclarante(){
	var direccion = accionRecargarDeclarante;
	direccion = direccion + "?sntroRgoAutoView.tipoDeclarante.id=" + document.getElementById('sntroRgoAutoView.tipoDeclarante.id').value;
	retrieveURLWithoutParametersSync(direccion);	
	ocultaSegunDeclarante();
	operacionesOnLoadFigura();
}

function ocultaSegunDeclarante(){
    var idTipoDeclarante = document.getElementById('sntroRgoAutoView.tipoDeclarante.id').value;
    if(idTipoDeclarante == 9 || idTipoDeclarante == 10){
       // bomberos
    	document.getElementById('imgBusqPersona').style.display = 'none';
      	document.getElementById('imgBusqJuzgado').style.display = 'none';
      	document.getElementById('imgBusqAseguradora').style.display = 'none';
    	
    }else if(idTipoDeclarante == 3 || idTipoDeclarante == 9 || idTipoDeclarante == 10){
	  // juzgado
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = '';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
	}else if(idTipoDeclarante == 1){
	  // aseguradora contraria
		document.getElementById('imgBusqPersona').style.display = 'none';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = '';
	}else {
	  // persona
		document.getElementById('imgBusqPersona').style.display = '';
  		document.getElementById('imgBusqJuzgado').style.display = 'none';
  		document.getElementById('imgBusqAseguradora').style.display = 'none';
	}
	
	if (idTipoDeclarante == 1 || idTipoDeclarante == 3 || idTipoDeclarante == 9 || idTipoDeclarante == 10){
  		document.getElementById('figuraFormView.tipoIdent.id').value = 1;
	}else{
  		document.getElementById('figuraFormView.tipoIdent.id').value = 2;
	}
}

/* Funcion para mostrar el arbol */
function mostrarArbolExpediente(){
  // se recarga el iframe oculto para que a su vez recarge el arbol
  top.window.frames['iAgenda'].location = accionPintarArbol; 
}

function comprobarDatos(){
  if (comprobarNumeroImplicados()){
    return validateRiesgoAutoSntroForm(document.forms(0));
  }else{
    return false;
  }      
}

function modificar(){
  document.forms(0).action = accionGrabar;
  muestraCarga();
  submitForm(document.forms(0),null,'iAreaTrabajo');
}

function iniciarDAA(){
	if(document.getElementById('sntroRgoAutoView.swDaa') && document.getElementById('sntroRgoAutoView.swDaa').value == valorSi){
	  muestraCarga();
	  var valor = lanzarVentana(accionIniciarDAA,750,640);
	  ocultaCarga();
	  if (document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id')) {
		  document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id').value = valor;
		  document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id').readOnly = true;
	  }
	} else {
		if (document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id')) {
			document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id').readOnly = false;
			document.getElementById('sntroRgoAutoView.tipoCulpabilidad.id').value = null;
		}
	}	
}

function cambiarNumKmBis(objeto){
  if (objeto && (objeto.value == valorSi)){
    if (document.getElementById('sntroRgoAutoView.siniestroDireccionView.numero')) {
    	document.getElementById('sntroRgoAutoView.siniestroDireccionView.numero').value = '';
    }
    if (document.getElementById('numero')) {
    	document.getElementById('numero').className = 'oculta';
    }
    if (document.getElementById('kilometro')) {
    	document.getElementById('kilometro').className = '';
    }
  }else{
    if (document.getElementById('sntroRgoAutoView.siniestroDireccionView.kilometro')) {
    	document.getElementById('sntroRgoAutoView.siniestroDireccionView.kilometro').value = '';
    }
    if (document.getElementById('numero')) {
    	document.getElementById('numero').className = '';
    }
    if (document.getElementById('kilometro')) {
    	document.getElementById('kilometro').className = 'oculta';
    }
  }
}
  
function ocultaLunas (objeto){
	if (objeto && objeto.checked){
		showHide("tdRoturaLunas", true);
	}else{
		showHide("tdRoturaLunas", false);
	}
}

function ocultaRecuperado (objeto){
	if (objeto && objeto.checked){
		showHide("tdNameRecuperado", true);
		showHide("tdRecuperado", true);
	}else{
		showHide("tdNameRecuperado", false);
		showHide("tdRecuperado", false);
	}
}

function ocultaPartes (objeto){
	
	if (objeto && objeto.checked){
		showHide("tdPartesName", true);
		showHide("tdPartes", true);
	}else{
		showHide("tdPartesName", false);
		showHide("tdPartes", false);
	}
}

function deshabilitaNaturalezas(valor){
	
	habilitarElemento('sntroRgoAutoView.swRoturaLuna', !valor);
	habilitarElemento('sntroRgoAutoView.swIncendio', !valor);
	habilitarElemento('sntroRgoAutoView.swRoboTotal', !valor);
	habilitarElemento('sntroRgoAutoView.swDanosRobo', !valor);
	habilitarElemento('sntroRgoAutoView.swDanosPropiosConContrario', !valor);
	habilitarElemento('sntroRgoAutoView.swDanosPropiosSinConCulpa', !valor);
	habilitarElemento('sntroRgoAutoView.swDanosPropiosSinConNoCulpa', !valor);
	habilitarElemento('sntroRgoAutoView.swConsorciable', !valor);
	habilitarElemento('sntroRgoAutoView.swVandalismo', !valor);
	habilitarElemento('sntroRgoAutoView.swAsistencia', !valor);
	
	/*document.getElementById('sntroRgoAutoView.swRoturaLuna').disabled = valor;
	document.getElementById('sntroRgoAutoView.swIncendio').disabled = valor;
	document.getElementById('sntroRgoAutoView.swRoboTotal').disabled = valor;
	document.getElementById('sntroRgoAutoView.swDanosRobo').disabled = valor;
	document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario').disabled = valor;
	document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').disabled = valor;
	document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').disabled = valor;
	document.getElementById('sntroRgoAutoView.swConsorciable').disabled = valor;
	document.getElementById('sntroRgoAutoView.swVandalismo').disabled = valor;
	document.getElementById('sntroRgoAutoView.swAsistencia').disabled = valor;
	*/
}

function automatismoComboCausas(objeto){
	
	if (document.getElementById('sntroRgoAutoView.swRoturaLuna')) {
		document.getElementById('sntroRgoAutoView.swRoturaLuna').checked = false;
		document.getElementById('sntroRgoAutoView.swRoturaLuna').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swIncendio')) {
		document.getElementById('sntroRgoAutoView.swIncendio').checked = false;
		document.getElementById('sntroRgoAutoView.swIncendio').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swRoboTotal')) {
		document.getElementById('sntroRgoAutoView.swRoboTotal').checked = false;
		document.getElementById('sntroRgoAutoView.swRoboTotal').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swDanosRobo')) {	
		document.getElementById('sntroRgoAutoView.swDanosRobo').checked = false;
		document.getElementById('sntroRgoAutoView.swDanosRobo').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario')) {
		document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario').checked = false;
		document.getElementById('sntroRgoAutoView.swDanosPropiosConContrario').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa')) {
		document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').checked = false;
		document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa')) {
		document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').checked = false;
		document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swConsorciable')) {
		document.getElementById('sntroRgoAutoView.swConsorciable').checked = false;
		document.getElementById('sntroRgoAutoView.swConsorciable').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swVandalismo')) {
		document.getElementById('sntroRgoAutoView.swVandalismo').checked = false;
		document.getElementById('sntroRgoAutoView.swVandalismo').onclick();
	}
	if (document.getElementById('sntroRgoAutoView.swAsistencia')) {
		document.getElementById('sntroRgoAutoView.swAsistencia').checked = false;
		document.getElementById('sntroRgoAutoView.swAsistencia').onclick();
	}

	if (objeto && objeto.value != CAUSA_STRO_COLISVEHICS) { // Mantis 10374: para esta causa no asumir este valro por defecto
		document.getElementById('sntroRgoAutoView.swPerjuNoVehiculos').value = 0;
		document.getElementById('sntroRgoAutoView.swPerjuNoVehiculos').selectedIndex = 0;
	}
	
	showHide("tdRoturaLunas", false);
	showHide("tdNameRecuperado", false);
	showHide("tdRecuperado", false);
	showHide("tdPartesName", false);
	showHide("tdPartes", false);
	
	//Si se habilitan las garantias, se perdería la validación de control de garantías lanzada inicialmente, y que 
	//habilita solo las naturalezas permitidas según garantía, de ahí que se vuelva a lanzar el control
	deshabilitaNaturalezas(false);
	controlGarantiasSeguro();
	
	if (objeto) {
		if (objeto.value == CAUSA_STRO_ROTLUNA) {
			if (!document.getElementById('sntroRgoAutoView.swRoturaLuna').disabled){
				document.getElementById('sntroRgoAutoView.swRoturaLuna').checked = true;
				document.getElementById('sntroRgoAutoView.swRoturaLuna').onclick();
			}else{
				alert(msgGaranLunas);
			}
		} else if (objeto.value == CAUSA_STRO_INCENDIV) {
			if (!document.getElementById('sntroRgoAutoView.swIncendio').disabled){
				document.getElementById('sntroRgoAutoView.swIncendio').checked = true;
				document.getElementById('sntroRgoAutoView.swIncendio').onclick();
			}else{
				alert(msgGaranIncendio);
			}
		} else if (objeto.value == CAUSA_STRO_COLISOBJE) {
				//Indicamos que existe contrario no vehiculo
				document.getElementById('sntroRgoAutoView.swPerjuNoVehiculos').value = 1;
				document.getElementById('sntroRgoAutoView.swPerjuNoVehiculos').selectedIndex = 1;
				
		} else if (objeto.value == CAUSA_STRO_ROBOVEHI) {
			if (!document.getElementById('sntroRgoAutoView.swRoboTotal').disabled){
				document.getElementById('sntroRgoAutoView.numVehiculoContrario').value = '0';
				document.getElementById('sntroRgoAutoView.swRoboTotal').checked = true;
				document.getElementById('sntroRgoAutoView.swRoboTotal').onclick();
			}else{
				alert(msgGaranRobo);
			}
		} else if (objeto.value == CAUSA_STRO_ROBOPAR) {
			if (!document.getElementById('sntroRgoAutoView.swDanosRobo').disabled){
				document.getElementById('sntroRgoAutoView.swDanosRobo').checked = true;
				document.getElementById('sntroRgoAutoView.swDanosRobo').onclick();
			}else{
				alert(msgGaranRobo);
			}
		} else if (objeto.value == CAUSA_STRO_CIRCULASINV) {
			if (!document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').disabled){
				document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').checked = true;
				document.getElementById('sntroRgoAutoView.swDanosPropiosSinConCulpa').onclick();
			}else{
				alert(msgGaranDanosPropios);
			}
		} else if (objeto.value == CAUSA_STRO_APARCAM) {
			if (!document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').disabled){
				document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').checked = true;
				document.getElementById('sntroRgoAutoView.swDanosPropiosSinConNoCulpa').onclick();
			}else{
				alert(msgGaranDanosPropios);
			}
		} else if (objeto.value == CAUSA_STRO_ATROPELLO || objeto.value == CAUSA_STRO_DESPCARGA || objeto.value == CAUSA_STRO_COLISVEHICS) {
			deshabilitaNaturalezas(true);
		} else if (objeto.value == CAUSA_STRO_ASISTVEHI){
			if (!document.getElementById('sntroRgoAutoView.swAsistencia').disabled){
				document.getElementById('sntroRgoAutoView.swAsistencia').checked = true;
				document.getElementById('sntroRgoAutoView.swAsistencia').onclick();
			}else{
				alert(msgGaranAsistenciaViaje);
			}
		}
	}
	habilitaCiaContraria(true);
}

function controlDeshabilitarNaturalezas()
{
	if (document.getElementById('sntroRgoAutoView.causaSntro.id')) {
		if (document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_ATROPELLO 
			|| document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_DESPCARGA
			|| document.getElementById('sntroRgoAutoView.causaSntro.id').value == CAUSA_STRO_COLISVEHICS)
		{
			deshabilitaNaturalezas(true);
		}
	}
}
