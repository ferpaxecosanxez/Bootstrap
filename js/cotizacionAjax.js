var actionAddCotizacion;
var actionAddRiesgo;
var actionAddRiesgoFromTab;
var actionCotizacion;
var actionSelectRiesgo;
var actionSelectMarca;
var actionSelectModelos;
var actionSelectVersion;
var actionSelectMatricula;
var actionSiguienteRiesgo;
var actionSiguienteRiesgoAgrupacion;
var actionSiguienteRiesgoPoliza;
var actionSiguienteAgrupacion;
var actionSelectPersonaRol;
var actionSelectDomicRol;
var actionActividadEmpresa;
var actionGarantiasModalidad;
var actionIniInfoEconomica;
var controlTab = true;
var siguienteActionModeloC;
var tab0="tab0_DAT";
var tab1="tab1_DAT";
var limpiar = false;	
var nifVacio;

function quitarCapasMensajes() {

	var content = "";
	var contentCotizacion = "<input type='hidden' name='cotizacionForm.estadoAddCotizacion'>";
	var contentRiesgo = "<input type='hidden' name='page' value='2'>"
									  + "<input type='hidden' name='estadoAddRiesgo'>";
	
	//ocultamos todos los mensajes de cotizacion, riesgos y resultados
	if (document.getElementById('estadoAddCotizacion')) {
		document.getElementById('estadoAddCotizacion').innerHTML = contentCotizacion;
	}
	if (document.getElementById('estadoAddRiesgo')) {
		document.getElementById('estadoAddRiesgo').innerHTML = contentRiesgo;
	}
	if (document.getElementById('showCotizacion')) {
		document.getElementById('showCotizacion').innerHTML = content;
	}
	if (document.getElementById('erroresTarificacion')) {
		document.getElementById('erroresTarificacion').innerHTML = content;
	}
	if (document.getElementById('save_ok')) {
		document.getElementById('save_ok').innerHTML = content;
	}
	if (document.getElementById('erroresCotizaDatos')) {
		document.getElementById('erroresCotizaDatos').innerHTML = content;
	}
	if (document.getElementById('noPrecio')) {
		document.getElementById('noPrecio').innerHTML = content;
	}
	if (document.getElementById('saveCotizacion')) {
		document.getElementById('saveCotizacion').innerHTML = content;
	}
	
	return true;
}

// extraido del antiguo 'quitarTodosRelojes'
function cargaDetalleInfoEconomica(codigoStr) {
	var itabContent=document.frames['iTabContent'];

	if ((itabContent != null) && (itabContent.document != null)) {
	    //enviarDatos(frames('iTabContent').document, frames('iTabContent').document.getElementById('codigoStr').value);
		if(itabContent.document.getElementById('codigoStr')!=null){
			if(codigoStr == undefined){
				codigoStr = "IED";
			}
			itabContent.document.getElementById('codigoStr').value = codigoStr;
		}
		if(itabContent.document.forms[0]!=null){
			itabContent.document.forms[0].submit();
	    	muestraCarga();
		}				
    }
}
		
function submitFormularioCotizacionMODELOA(swInfoEconomica) {
	if(swInfoEconomica == "1"){
		top.pulsado = "verPrecioRiesgo";
		comprobarDatosInfoEconomica();
		
	} else {
		//llamamos al submit del formulario de cotizacion
		muestraTarifa();
	}
	retrieveURLCotizacionMODELOA(actionAddCotizacion, ['cotizacionForm']);
}
	
function submitFormularioRiesgoMODELOA(){
	muestraCarga();
	retrieveURLCotizacionMODELOA(actionCotizacion, ['riesgoForm']);
}
	
function submitFormulariosCotizacion(origen) {
    //inicializamos el control de los tab
    controlTab = true;
    //control para habilitar los campos del formulario cuando venimos de desbloquear el formulario
    limpiar = false;
	//reseteamos el campo oculto de estado
	if(document.getElementById('estadoCotizacion')){
		document.getElementById('estadoCotizacion').value = "unsuccesfull";
	}
	if(document.getElementById('estadoAddCotizacion')){
		document.getElementById('estadoAddCotizacion').value = "unsuccesfull";
	}
		
    if (origen=='limpiar') {
  	  limpiar = true;
    }
	  
	if(origen=='Tab'){		  
	 controlTab = false;
	}
	
	//llamamos al submit del formulario de cotizacion
	muestraCarga();
	retrieveURLCotizacion(actionCotizacion, 'cotizacionForm');
}

function submitFormularioRiesgo(origen) {

//inicializamos el control de los tab
  controlTab = true;
  
  //reseteamos el campo oculto de estado
  if(document.getElementById('estadoAddRiesgo') != undefined && 
		  document.getElementById('estadoAddRiesgo') != null){
  		
	  document.getElementById('estadoAddRiesgo').value = "unsuccesfull";
  }
	
  if(origen=='Tab'){
	  if(document.getElementById('handWrite')!=null){
		  document.getElementById('handWrite').style.visibility = "visible";
	  }
  	  
	  controlTab = false;

		//llamamos al submit del formulario de riesgo
		muestraCarga();
		retrieveURLCotizacion(actionAddRiesgoFromTab, 'riesgoForm');
  }
  else {
		//llamamos al submit del formulario de riesgo
		muestraCarga();
		retrieveURLCotizacion(actionAddRiesgo, 'riesgoForm');
	}
}
				
function verPrecio() {
	if(jQuery('#swModoEdicion')){
		jQuery('#swModoEdicion').val('false');
	}
	muestraTarifa();
	//si todo ha ido bien hacemos submit de la cotizacion
	nuevaPeticionAjax(actionCotizacion, 'get', null, processStateChangeCotizacionWithoutParams, callbackError)
}

function retrieveURLCotizacionMODELOA(url, nameOfFormToPost){
	//recogemos los parametros a enviar por post
	var parametros = obtenerParametersCamposFormularios(nameOfFormToPost);
	nuevaPeticionAjax(url,"post", parametros,callbackCotizacionMODELOA, callbackError);	
}

function retrieveURLCotizacion(url,nameOfFormToPost) {
	//recogemos los parametros a enviar por post
	retrieveURLVariosForms(url,[nameOfFormToPost]);
}

function retrieveURLVariosForms(url,nameOfFormsToPost) {
	//recogemos los parametros a enviar por post
	var parametros = obtenerParametersCamposFormularios(nameOfFormsToPost);
	nuevaPeticionAjax(url,"post", parametros,callbackCotizacion, callbackError);
}
  
function retrieveURLTipoRiesgo(url, tipoRiesgo) {
	nuevaPeticionAjax(url, "post", "&nivelRiesgo=" + tipoRiesgo, processStateTipoRiesgo, callbackError);
}
	  
/*
 * Set as the callback method for when XmlHttpRequest State Changes
 * used by retrieveUrl
 */
function processStateChangeSoloUnRiesgo(request) {
   if (request.readyState == 4) { // Complete
      if (request.status == 200) { // OK response
         if (debugAjax) {
            alert(document.getElementById('txtDebugAjax'));
            if (document.getElementById('txtDebugAjax') != null) {
               document.getElementById('txtDebugAjax').value = document.getElementById('txtDebugAjax').value + request.responseText;
            } else {
               alert('processStateChangeSoloUnRiesgo: respuesta: ' + request.responseText);
            }
         }
         // Split the text response into Span elements
         spanElements = splitTextIntoSpan(request.responseText);
         // Use these span elements to update the page
         replaceExistingWithNewHtml(spanElements);        
         ocultaCarga(); 

         comprobarRgoDecesos();
         
         if (bDeshabilitarCampos) {
        	 deshabilitaCampos();
        	 bDeshabilitarCampos = false;
         }
         // Si existe el botón limpiar tomador estamos en modelo A o B
         if(jQuery("#tomador\\.btLimpiar").val()!=undefined){
        	// Obtenemos los botones recoger datos y los asignamos a la variable global
             botonesRecogerDatosTomador=jQuery('input[name="recogeDatosTomador"]').get();
             // Aplicamos la lógica de presentación de los botones
             habilitaBotonRecogerDatosTomador();
             // Habilitamos el boton limpiar del tomador
             jQuery("#tomador\\.btLimpiar").attr("disabled",false);
         }         
         presentationLogicPaisAll(document.forms['riesgoForm']);
      } else {
         alert("Problema con la respuesta del servidor:\n " + request.statusText);
      }
   }

} // processStateChangeSoloUnRiesgo


  // OJO!!!
  // 
  // este callback se ejecuta después de addCotizacion; si estadoAddCotizacion
  // es successfull entonces se llama a showCotizacion
  function callbackCotizacionMODELOA(request) {
	  
	  var linkUsuario=document.getElementById("linkUsuario");
	  var modeloCotizacion=document.getElementById('modeloCotizacion');
	  var formularioCotizacion=document.forms['cotizacionForm'];
	  var formularioRiesgo=document.forms['riesgoForm'];
	  
	  if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"succesfull\">") > -1) {		  
		  retrieveURLCotizacionMODELOA(actionCotizacion, ['riesgoForm']);	
		  
	  }else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"unsuccesfull\">") > -1) {		  
		  spanElements = splitTextIntoSpan(request.responseText);
		  replaceExistingWithNewHtml(spanElements);
		  allDisabledFull(formularioCotizacion,false);
		  //allDisabledFull(formularioRiesgo,false);
		  logicaPresentacionTomador(modeloCotizacion);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }
		 ocultaCarga();
		  // Muevo el foco para que se vean los errores
		  volverArriba();
	  }else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddRiesgo\" value=\"unsuccesfull\">") > -1) {
		  // Cuando venimos del cambio de pestania el controlTab fue inicializado a false
		  spanElements = splitTextIntoSpan(request.responseText);
		  replaceExistingWithNewHtml(spanElements);
		  allDisabledFull(formularioCotizacion,false);
		  //allDisabledFull(formularioRiesgo,false);
		  bloquearCamposPersonas(formularioRiesgo);
		  logicaPresentacionTomador(modeloCotizacion);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }
		 ocultaCarga();
		  // Muevo el foco para que se vean los errores
		  volverArriba();
	  }else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"succesfull\">") > -1) {		
		  //Use these span elements to update the page
		  spanElements = splitTextIntoSpan(request.responseText);
		  replaceExistingWithNewHtml(spanElements);
		  allDisabledFull(formularioCotizacion,true);
		  allDisabledFull(formularioRiesgo,true);
		  document.getElementById('botonGuardar').disabled=true;
		  document.getElementById('botonEliminar').disabled=false;	
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="inline";
		 }
		 ocultaCarga();
	  }else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"unsuccesfull\">") > -1) {		  
		  spanElements = splitTextIntoSpan(request.responseText);
		  replaceExistingWithNewHtml(spanElements);
		  allDisabledFull(formularioCotizacion,false);
		  logicaPresentacionTomador(modeloCotizacion);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }
		 ocultaCarga();
		  // Muevo el foco para que se vean los errores
		  volverArriba();
	}
	  
	// En cualquier caso se comprueban si los datos del tomador son precargados o no
	compruebaDatosPrecargados();
  }
  
  function callbackCotizacion(request) {
	  
	  // Obtenemos los elementos necesarios
	  var formularioCotizacion=document.forms['cotizacionForm'];
	  var formularioRiesgo=document.forms['riesgoForm'];
	  var botonGuardar=document.getElementById('botonGuardar');
	  var botonEliminar=document.getElementById('botonEliminar');
	  var botonPrecio=document.getElementById('botonPrecio');
	  var linkUsuario=document.getElementById("linkUsuario");
	  var iTabContent=document.getElementById('iTabContent');
	  var modeloCotizacion=document.getElementById('modeloCotizacion');
	  
	  //Use these span elements to update the page
	  spanElements = splitTextIntoSpan(request.responseText);
	  replaceExistingWithNewHtml(spanElements);

	  // Si el estado es insatisfactorio al salvar la cotización
	  if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"unsuccesfull\">") > -1) {
		  cargaMapaCamposPrecargados(formularioRiesgo);
		  allDisabledFull(formularioCotizacion,false);
		  allDisabledFull(formularioRiesgo,false);
		  bloquearCamposPersonas(formularioRiesgo);
		  logicaPresentacionTomador(modeloCotizacion);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }
		  // Muevo el foco para que se vean los errores
		  volverArriba();
		  ocultaCarga();
	  }
	  // Si el estado es satisfactorio al salvar la cotización
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"succesfull\">") > -1) {
		  //si el modelo de cotizacion es A o B llamamos a la validacion del riesgo
		  if (request.responseText.indexOf("<input type=\"hidden\" name=\"swModelo\" value=\"C\">") == -1) {
			  //reseteamos el campo oculto de estado
			  formularioRiesgo.elements('estadoAddRiesgo').value = "unsuccesfull";	    	        	
			  muestraCarga();
			  //llamada a formulario de riesgo
			  if (!controlTab) {
				  submitFormularioRiesgo('Tab');
			  }
			  else {
				  retrieveURLCotizacion(actionAddRiesgo, 'riesgoForm');
			  }
		  }
		  else {
			  muestraCarga();
			  //si todo ha ido bien hacemos submit de la cotizacion
			  retrieveURLCotizacion(actionCotizacion, 'cotizacionForm');
			  cargaMapaCamposPrecargados(formularioRiesgo);
			  allDisabledFull(formularioRiesgo,true);
		  }		  
		  allDisabledFull(formularioCotizacion,true);
	  }
	  // Si el estado es insatisfactorio al salvar desde la pantalla riesgo
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddRiesgo\" value=\"unsuccesfull\">") > -1) {
		  if(controlTab) {
			  if(iTabContent != null){
				  iTabContent.document.getElementById('codigoStr').value = "IED";	    	
				  iTabContent.document.forms[0].submit();
			  }
		  }
		  cargaMapaCamposPrecargados(formularioRiesgo);
		  allDisabledFull(formularioCotizacion,false);
		  allDisabledFull(formularioRiesgo,false);
		  bloquearCamposPersonas(formularioRiesgo);
		  logicaPresentacionTomador(modeloCotizacion);
		  presentationLogicPaisAll(formularioRiesgo);
		  // Activamos el botón guardar
		  botonGuardar.disabled=true;
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }	  
		 actividadCNAE('riesgoBean.riesgoPredef.actvprod', 'actvprod');
		  // Muevo el foco para que se vean los errores
		  volverArriba();
		  ocultaCarga();
	  }
	  // Si el estado es satisfactorio al salvar el riesgo
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddRiesgo\" value=\"succesfull\">") > -1) {	
		  if(controlTab){
			  //si todo ha ido bien hacemos submit de la cotizacion
			  nuevaPeticionAjax(actionCotizacion, 'get', null, processStateChangeCotizacionWithoutParams, callbackError)
			  muestraCarga();
		  }
		  else {		
			  if(botonPrecio != null) {
				  if(selectTab == tab1){
					  botonPrecio.disabled=true;
				  } else {
					  botonPrecio.disabled=false;
				  }
			  }	
			  top.plegarAmbos();

			  retrieveURLWithoutParametersSync(actionIniInfoEconomica);

			  if(iTabContent!=null){
				  if(iTabContent.document.getElementById('codigoStr')!=null){
					  iTabContent.document.getElementById('codigoStr').value = "IED";
					  iTabContent.document.forms[0].submit();
				  }	
			  }		  
			  enviarDatosPestanna(tab1);
			  muestraCarga();
		  }
		  cargaMapaCamposPrecargados(formularioRiesgo);
		  allDisabledFull(formularioCotizacion,true);
		  allDisabledFull(formularioRiesgo,true);
		  bloquearCamposPersonas(formularioRiesgo);
	  }
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"unsuccesfull\">") > -1) {
		  ocultaCarga();
		  if(selectTab == tab1){
			  codigoStr = "G"; 
		  } else {
			  codigoStr = "IED";
		  }
			  cargaDetalleInfoEconomica(codigoStr);
		  cargaMapaCamposPrecargados(formularioRiesgo);
		  allDisabledFull(formularioCotizacion,false);
		  allDisabledFull(formularioRiesgo,false);
		  bloquearCamposPersonas(formularioRiesgo);
		  presentationLogicPaisAll(formularioRiesgo);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		 }
		  // Muevo el foco para que se vean los errores
		  volverArriba();
		  
		  //Si hay errores, ponemos el flag siguienteGrabar=true; Habilitamos el botón de editar si existe
		  siguienteGrabar=true;
		  if (document.getElementById("handWrite")) {
			  document.getElementById("handWrite").style.visibility='visible';
		  }
		  if(selectTab != tab1){
			  selectTab = tab0;
		  }
		  
		  //Activamos el botón Guardar porque ha habido errores
		  if (botonGuardar != null) {
			  botonGuardar.disabled = false;
		  }
	  }
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"succesfull\">") > -1) {
		  allDisabledFull(formularioCotizacion,true);
		  allDisabledFull(formularioRiesgo,true);
	  }
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"unsuccesfull\">") > -1) {
		  // Si es el modelo B y se ha pinchado en Ver Precio activamos el boton Guardar y Eliminar
		  if (modeloCotizacion.value == 'B') {
			  botonGuardar.disabled=true;
			  botonEliminar.disabled=false;
		  }
		  ocultaCarga();
		  allDisabledFull(formularioCotizacion,false);
		  allDisabledFull(formularioRiesgo,false);
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="none";
		  }
		  // Muevo el foco para que se vean los errores
		  volverArriba();
	  }
	  else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"succesfull\">") > -1) {
		  allDisabledFull(formularioCotizacion,true);
		  allDisabledFull(formularioRiesgo,true);		  
		  // Si es el modelo B y se ha pinchado en Ver Precio activamos el boton Guardar y Eliminar
		  if ((modeloCotizacion.value == 'B') || (modeloCotizacion.value == 'A')) {
			  botonGuardar.disabled=true;
			  botonEliminar.disabled=false;
		  }
		  
		  if(document.getElementById("botonDuplicar") != undefined){
			  document.getElementById("botonDuplicar").style.display="inline";
		 }	
		 if (request.responseText.indexOf("<input type=\"hidden\" name=\"errorTarificacion\" value=\"unsuccesfull\">") > -1){
	        volverArriba();
	        ocultaCarga();
		 } 
		 cargaDetalleInfoEconomica();
	  }
	  
	  // En cualquier caso se comprueban si los datos del tomador son precargados o no
	  compruebaDatosPrecargados();
  }
  
  function logicaPresentacionTomador(modeloCotizacion){
	  if(modeloCotizacion!=null){
		  if((modeloCotizacion.value == 'B') || (modeloCotizacion.value == 'A')){
			  // Comprobamos datos precargados
			  compruebaDatosPrecargados();
			  // Si hemos pulsado sobre el botón modificar
			  if(top.pulsado == 'procesar'){
				  if(jQuery("#cotizacionForm").val()!=undefined){
						// Habilitamos el boton limpiar
						jQuery("#tomador\\.btLimpiar").attr("disabled",false);
					}
			  }else{			
				  // Habilitamos el botón modificar
				  jQuery("#handWrite").css("visibility", 'visible');
			  }  
			  habilitaBotonRecogerDatosTomador();
		  }
	  }
  }
  
  
  
	/*
	 * Set as the callback method for when XmlHttpRequest State Changes
	 * used by retrieveUrl
	 */
	function processStateChangeCotizacionWithoutParams(request) {
	   if (request.readyState == 4) { // Complete	   
	      if (request.status == 200) { // OK response    	  
	    	var botonGuardar=document.getElementById('botonGuardar');
	    	var botonSiguiente=document.getElementById('botonSiguiente');
	    	
	    	//Desactivamos el botón siguiente y lo habilitamos cuando Calculemos precio y devuelva una respuesta satisfactoria
	    	if (botonSiguiente != null) {
	    		botonSiguiente.disabled = true;
	    	}
	    	
	    	var linkUsuario=document.getElementById("linkUsuario");
	    	var formularioRiesgo=document.forms['riesgoForm'];
	    	var formularioCotizacion=document.forms['cotizacionForm'];	
	        //Use these span elements to update the page
      		spanElements = splitTextIntoSpan(request.responseText);
	        replaceExistingWithNewHtml(spanElements);        
  		  	ocultaCarga();
	        var modeloCotizacion=document.getElementById('modeloCotizacion');  		
	        if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"unsuccesfull\">") > -1) {
	        	logicaPresentacionTomador(modeloCotizacion);
	  		  	cargaMapaCamposPrecargados(formularioRiesgo);
	  		  	allDisabledFull(formularioCotizacion,false);
	  		  	allDisabledFull(formularioRiesgo,false);
	  		  	bloquearCamposPersonas(formularioRiesgo);
	  		  	if(document.getElementById("botonDuplicar") != undefined){
				  document.getElementById("botonDuplicar").style.display="none";
	  		  	}
	        	//si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
	  		  	volverArriba();
	        }
  	      	else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"succesfull\">") > -1) {
		        if (siguienteActionModeloC != null) {
			        document.location.href=siguienteActionModeloC;
			        muestraCarga();
		        }
		    	if (botonSiguiente != null) {
		    		botonSiguiente.disabled = false;
		    	}
		    }  
  			else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"unsuccesfull\">") > -1) {
  				logicaPresentacionTomador(modeloCotizacion);
	  		  	cargaMapaCamposPrecargados(formularioRiesgo);
	  		  	allDisabledFull(formularioCotizacion,false);
	  		  	allDisabledFull(formularioRiesgo,false);
	  		  	bloquearCamposPersonas(formularioRiesgo);
	  		  	if(document.getElementById("botonDuplicar") != undefined){
				  document.getElementById("botonDuplicar").style.display="none";
	  		  	}
	  		  	siguienteGrabar=true;
  				//si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
	  		  	volverArriba();
	        }
  	        else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"succesfull\">") > -1) { 
		        
  	        	if(botonGuardar.disabled) botonGuardar.disabled=true;
  	        	
  	        	if (siguienteActionModeloC != null) {
			        document.location.href=siguienteActionModeloC;
			        muestraCarga();
		        }
		     }    	        
	        if (request.responseText.indexOf("<input type=\"hidden\" name=\"errorTarificacion\" value=\"succesfull\">") > -1){
	        	volverArriba();
	     	}else{
	     		volverAbajo();
	     		//Recargamos el arbol del riesgo
	    		if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != "" ){
	  		      window.parent.frames[2].location = arbol;
	    		}	     		
	     	}     
  		  	cargaDetalleInfoEconomica();
	      } else {
	         alert("Problem with server response:\n " + request.statusText);
	      }
	   }
	} // processStateChangeCotizacionWithoutParams
	
  
	/*
  * Set as the callback method for when XmlHttpRequest State Changes 
  * used by retrieveUrl
  */
  function processStateTipoRiesgo(request) {
    //se ha completado la comunicacion
  	if (request.readyState == 4) { // Complete
       if (request.status == 200) { // OK response
        
        //alert("Ajax response:"+request.responseText);
        //<textarea id="txtDebugAjax" rows="35" cols="135"></textarea>
        //document.getElementById('contenedorCotizacion').value=request.responseText;
        //Split the text response into Span elements
 		  spanElements = splitTextIntoSpan(request.responseText);
        replaceExistingWithNewHtml(spanElements);
        
        //preguntamos si la lista de riesgos solo contiene uno para
        //realizar la llamada a la seleccion del riesgo
        if (request.responseText.indexOf("<input type=\"hidden\" name=\"soloUnRiesgo\" value=\"true\">") > -1) {
        			muestraCarga();
					//llamada a formulario de riesgo
					nuevaPeticionAjax(actionSelectRiesgo, "post", getFormAsString('riesgoForm'), processStateChangeSoloUnRiesgo, callbackError);
        }
        
        //Existe script por tanto se que existe un riesgo seleccionado y ejecuto las funciones para cargar el riesgo
        if (request.responseText.indexOf("<input type=\"hidden\" name=\"script\" value=\"true\" />") > -1) {
        	datosBeanCalculo('riesgoCotizableSelected', 'codigoRiesgoCotizableSelected');
			muestraCarga();
			seleccionRiesgo();
        }
        
      }
    }
 		
 		
  }
  
	/**
   * Get the contents of the URL via an Ajax call
   * url - to get content from (e.g. /struts-ajax/sampleajax.do?ask=COMMAND_NAME_1) 
   * nodeToOverWrite - when callback is made
   * nameOfFormToPost - which form values will be posted up to the server as part 
   *					of the request (can be null)
   */
  function retrieveURLSelectRiesgo(url,nameIdSelect,nameCodSelect) {
    
    //get the (form based) params to push up as part of the get request
    if (url.indexOf("?") > -1) {
	    url=url+"&"+getSelectAsStringRiesgo(nameIdSelect, nameCodSelect);
    }
    else {
    	url=url+"?"+getSelectAsStringRiesgo(nameIdSelect, nameCodSelect);
    }
    if(jQuery("#cambioRiesgo").val()){
    	url+="&cambioRiesgo=" + jQuery("#cambioRiesgo").val();
    }
    peticionAjax(url,"post",null,callbackChangeRiesgo,callbackError);
    
  }
  
  
 /**
  * obetenemos el parametro correspondiente al formulario pasado
	*
  * @param formName to encode
  * @return string with encoded form values , beings with &
  */ 
 function getSelectAsStringRiesgo(idParameter, codParameter){
 	
 	//Setup the return String
 	returnString ="";
 	
  	//Get the form values
 	var idElement=document.getElementById(idParameter);
 	
 	//loop through the array , building up the url
 	//in the form /strutsaction.do&name=value
 	
 	//we escape (encode) each value
 	if(idElement.options != 'undefined' && idElement.options != null && idElement.selectedIndex != 'undefined' && idElement.selectedIndex != null ){
 		returnString=idElement.name+"="+escape(idElement.options[idElement.selectedIndex].value);
 	}else{
 		returnString=idElement.name+"="+escape(idElement.value);
 	}
	if (codParameter != null) {
		returnString=returnString+"&"+codParameter+"="+escape(document.getElementById(codParameter).value);
	}
 	//return the values
 	return returnString; 
 }
 
 
 /**
  * Set as the callback method for when XmlHttpRequest State Changes 
  * used by retrieveUrl
  */
  function processStateChangeRiesgo(requestRiesgo) {
  
	  if (requestRiesgo.readyState == 4) { // Complete
      if (requestRiesgo.status == 200) { // OK response
   
    	  //Split the text response into Span elements
    	  spanElements = splitTextIntoSpan(requestRiesgo.responseText);

    	  //Use these span elements to update the page
    	  replaceExistingWithNewHtml(spanElements);
        
    	  ocultaCarga();
        
      } else {
    	  alert("Problem with server response:\n " + requestRiesgo.statusText);
    	  ocultaCarga();
      }
    }
  }
  
  function callbackChangeRiesgo(requestRiesgo) {
	  //Split the text response into Span elements
      spanElements = splitTextIntoSpan(requestRiesgo.responseText);    
      //Use these span elements to update the page
      replaceExistingWithNewHtml(spanElements);       
      ocultaCarga();
      // Obtenemos los botones recoger datos y los asignamos a la variable global
      botonesRecogerDatosTomador=jQuery('input[name="recogeDatosTomador"]').get();
      // Aplicamos la lógica de presentación de los botones
      habilitaBotonRecogerDatosTomador();
      // Habilitamos el boton limpiar del tomador
      jQuery("#tomador\\.btLimpiar").attr("disabled",false);
      presentationLogicPaisAll(document.forms['riesgoForm']);
  }
  
function retrieveURLParameter_1(property, lit, categoria){
	retrieveURLParameter(actionSelectMarca + '?marca='+document.riesgoForm.elements["riesgoBean.riesgoPredef.marca"].value +'&categoria='+categoria , 'riesgoForm', property, lit);
}



function retrieveURLParameter_2(property, lit){
	retrieveURLParameter(actionSelectModelos +'?marca='+document.riesgoForm.elements["riesgoBean.riesgoPredef.marca"].value, 'riesgoForm', property, lit);
}
function getRiesgoPredefVEHI(){
	nuevaPeticionAjax(actionSelectVersion + '?marca='+document.riesgoForm.elements["riesgoBean.riesgoPredef.marca"].value +'&modelo_vehi='+document.riesgoForm.elements["riesgoBean.riesgoPredef.modelo"].value+'&codvehic='+document.riesgoForm.elements["riesgoBean.riesgoPredef.codvehic"].value, "post", null, processStateChangeRiesgo, callbackError);
}
function retrieveURLParameter_matricula(property, lit, campo, modificarSinco){
	retrieveURLParameter(actionSelectMatricula + '?validaMatricula='+document.riesgoForm.elements["riesgoBean.riesgoPredef.matricula"].value+'&campo='+campo+'&modificarSinco='+modificarSinco, 'riesgoForm', property, lit);
}
function retrieveURLParameter_matriculaRmq(property, lit, campo, modificarSinco){
	retrieveURLParameter(actionSelectMatricula + '?validaMatricula='+document.riesgoForm.elements["riesgoBean.riesgoPredef.matrrmq"].value+'&campo='+campo+'&modificarSinco='+modificarSinco, 'riesgoForm', property, lit);
}
function seleccionRiesgo() {
	retrieveURLSelectRiesgo(actionSelectRiesgo, 'riesgoCotizableSelected', 'codigoRiesgoCotizableSelected');
}
function retrieveURLParameter_personaTomador(form, property, lit) {
    retrieveURLParameter(actionSelectPersonaTomador + '?idPersona='+document.cotizacionForm.elements["cotizacion.cotizaTomador.idPersona"].value+"&clasePersona=tomador" , form, property, lit);
}
function retrieveURLParameterDef_personaTomador(llamadaCambio, params) {
	retrieveURLParameterCompleto(actionSelectPersonaTomador + '?idPersona='+document.cotizacionForm.elements["cotizacion.cotizaTomador.idPersona"].value+"&clasePersona=tomador", llamadaCambio, params);
}
function retrieveURLParameter_personaRol(url,idPersona, subClave){
    retrieveURLWithoutParameters(url+'?idPersona='+idPersona+'clasePersona=rol&subClave='+subClave, false);
}
function retrieveURLParameterDef_personaRol(url,idPersona, subClave, llamadaCambio, params){
    retrieveURLParameterCompleto(url+'?idPersona='+idPersona+'clasePersona=rol&subClave='+subClave, llamadaCambio, params);
}

function retrieveURLParameter_domicRol(idPersona, subClave, domicilioSelec, clave){
    retrieveURLWithoutParameters(actionSelectDomicRol+'?idPersona='+idPersona+'clasePersona=rol&subClave='+subClave+'&domicilioSelec='+domicilioSelec+'&clave='+clave);
}

function retrieveURLParameter_datosDomicRol(idPersona, subClave, domicilioSelec,telefonoSelec,emailSelec, clave){       
	retrieveURLWithoutParameters(actionSelectDomicRol+'?idPersona='+idPersona+'&clasePersona=rol&subClave='+subClave+'&domicilioSelec='+domicilioSelec+'&telefonoSelec='+telefonoSelec+'&emailSelec='+emailSelec+'&clave='+clave, false);
}

function retrieveURLParameterDef_datosDomicRol(idPersona, subClave, domicilioSelec, telefonoSelec, emailSelec, clave, llamadaCambio, params){
    retrieveURLParameterCompleto(actionSelectDomicRol+'?idPersona='+idPersona+'&clasePersona=rol&subClave='+subClave+'&domicilioSelec='+domicilioSelec+'&telefonoSelec='+telefonoSelec+'&emailSelec='+emailSelec+'&clave='+clave, llamadaCambio, params);
}

function actividadCNAE(property, lit){
	if(document.riesgoForm.elements["riesgoBean.riesgoPredef.actvprod"] != undefined){
		retrieveURLParameter(actionActividadEmpresa +'?actvprod='+document.riesgoForm.elements["riesgoBean.riesgoPredef.actvprod"].value, 'riesgoForm', property, lit);
	}
}


//Funcion controladora para el tab de 'informacion economica' en el riesgo
function informacionTab(doc,str,elemento){
 if(enviarDatos(doc,str,elemento)){
   top.plegarAmbos();
   enviarDatosPestanna(tab0);
   muestraCarga();
 }
}


function processStateCambiaTab(request) { 
  	//se ha completado la comunicacion
  	if (request.readyState == 4) { // Complete
      if (request.status == 200) { // OK response
        
        if(document.getElementById('iTabContent') != null){
      	
      		frames('iTabContent').document.getElementById('codigoStr').value = "IED";	    	
	     	frames('iTabContent').document.forms[0].submit();            			
			enviarDatosPestanna(tab1);
      	}
        
        //Split the text response into Span elements
        spanElements = replaceExistingWithNewHtml(request.responseText);
        replaceExistingWithNewHtml(spanElements);
         
      }
    }
}

function processStateChangeRol(req) {
	if (req.readyState == 4) { // Complete
		if (req.status == 200) { // OK response
			if (debugAjax) {
				alert(document.getElementById('txtDebugAjax'));
				if (document.getElementById('txtDebugAjax') != null) {
					document.getElementById('txtDebugAjax').value = document.getElementById('txtDebugAjax').value + req.responseText;
				} else {
					alert('processStateChange: respuesta: ' + req.responseText);
				}
			}
			// Split the text response into Span elements
			spanElements = splitTextIntoSpan(req.responseText);
			// Use these span elements to update the page
			replaceExistingWithNewHtml(spanElements);
			if(document.getElementById('clave').value != undefined){
				var subClave = document.getElementById('clave').value;
				var tipoIdentificador = "";
				if(document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent") != null ||
						document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value != undefined){
					tipoIdentificador = document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").value;
				}
				if(subClave == "propietario_1" || subClave == "asegurado_1" 
					|| subClave == "beneficiario_1" || subClave == "asegurmult_1"){
					if(tipoIdentificador=="1"){
						showHide("trNomApe"+subClave, false);
						showHide("trRS"+subClave, true);
					}else if(tipoIdentificador=="" || tipoIdentificador == null){
						showHide("trNomApe"+subClave, true);
						showHide("trRS"+subClave, false);
					}else if(tipoIdentificador!="1" && tipoIdentificador!= null){
						showHide("trNomApe"+subClave, true);
						showHide("trRS"+subClave, false);
					}
				}
			}
			comprobarRgoDecesos();
		} else {
			alert("Problem with server response:\n " + req.statusText);
		}
	}
} // processStateChange

function seleccionarModalidadFPago(modCon, idFormaPago, idModCon){
	document.getElementById('selectModalidad').value = modCon;
	document.getElementById('formaPagoHidden').value = idFormaPago;

	if(document.getElementById('botonSiguiente')){
		document.getElementById('botonSiguiente').disabled = false;
	}
	if(document.getElementById('botonAltaAsegurado')){
		document.getElementById('botonAltaAsegurado').disabled = false;
	}
	if(document.getElementById('botonAnterior')){
		document.getElementById('botonAnterior').disabled = false;
	}
	if(document.getElementById('botonAltaAgrupacion')){
		document.getElementById('botonAltaAgrupacion').disabled = false;
	}
}

function callbackError(request){
	alert("Problema con la respuesta del servidor:\n " + request.statusText);
	ocultaCarga();
	allDisabledFull(document.forms(0),false);
}

function botonMano(object, action){
	if(jQuery('#swModoEdicion')){
		jQuery('#swModoEdicion').val('true');
	}
	var modeloCotizacion=jQuery('#modeloCotizacion');
	object.style.visibility='hidden';
	actionCotizacion = action;
	quitarCapasMensajes();
	if(selectTab == "tab1_DAT"){
		top.pulsado = 'procesar';
		// Comprobamos los datos economicos
		comprobarDatosInfoEconomica();
	}
	habilitaCampos();
	if(jQuery("#riesgoForm").val()!=undefined){
		bloquearCamposPersonas(document.forms['riesgoForm']);
		disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF);
		presentationLogicPaisAll(document.forms['riesgoForm']);
		disableInputsBonifRecarSegunCheckbox();
	}
	comprobarRgoDecesos();
	habilitaBoton(true);
	if(jQuery("#cotizacionForm").val()!=undefined){		
		// Comprobamos campos precargados del tomador
		compruebaDatosPrecargados();
		// Habilitamos el boton limpiar
		jQuery("#tomador\\.btLimpiar").attr("disabled",false);
		// Habilitamos la lupa del tomador
		jQuery("#imgBusqPersona").attr("disabled",false);
		// Si el modelo A o B aplicamos logica de presentación para los botones recoger datos del tomador
		if(modeloCotizacion.val()!=undefined){
			if(modeloCotizacion.val()=='A' || modeloCotizacion.val()=='B'){
				// Aplicamos la logica de presentación para el botón recoger datos del tomador
				disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF);
			}
		}
	}
	controlPermisosCotizacion();
	
	//Cuando pulsamos en el botón para editar, habilitamos el botón "Guardar"
	if (jQuery("#botonGuardar")) {
		jQuery("#botonGuardar").attr("disabled", false);
	}
	
}

function controlPermisosCotizacion(){
	//Control de permisos de usuario
	
	//Controlamos que el usuario tenga permisos para modificar el recargo de fraccionamiento.
	var obj = $('riesgoBean.swRecargoFraccPago');
	if (obj && (obj.tienePermiso != undefined) ) {
		if (obj.tienePermiso) {
			obj.disabled = false;
		} else {
			obj.disabled = true;
		}
	}
}

function botonManoRefactor(object, action, formName){
	if(jQuery('#swModoEdicion')){
		jQuery('#swModoEdicion').val('true');
	}
	top.pulsado = 'procesar';
	object.style.visibility='hidden';
	actionCotizacion = action;
	quitarCapasMensajes();
	// Si estamos en la pestana Informacion Economica
	if(selectTab == "tab1_DAT"){
		// Comprobamos los datos economicos
		comprobarDatosInfoEconomica();
	}
	habilitaCampos();
	if(jQuery("#riesgoForm").val()!=undefined){
		bloquearCamposPersonas(document.forms['riesgoForm']);
		disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF);
		presentationLogicPaisAll(document.forms['riesgoForm']);
		disableInputsBonifRecarSegunCheckbox();
	}
}

function habilitaBoton(param){
	if(document.getElementById('botonSiguiente'))
		document.getElementById('botonSiguiente').disabled=param;
	
	if(document.getElementById('botonAltaAsegurado'))
		document.getElementById('botonAltaAsegurado').disabled=param;
}

function pasoTomadorRol(subClave){

	
	var idPersonaTomador = jQuery('#idPersonaTomador').val();
	
	// Si no esta cargada la informacion, buscamos en la propiedad origen
	if(idPersonaTomador == undefined || idPersonaTomador == null || idPersonaTomador == ''){
		idPersonaTomador = document.getElementById("cotizacion.cotizaTomador.idPersona").value;
	}
	
	// Si los datos de tomador no tienen figura en el sistema se copian los datos por javascript
	if(idPersonaTomador == undefined || idPersonaTomador == null || idPersonaTomador == ''){		
		copiaTomador(subClave);
		if (document.getElementById("trNomApe"+subClave) != null) { 
			document.getElementById("trNomApe"+subClave).className = "muestra"; 
		}
		//comprobamos el valor del tipo de documento, si es pasaporte o nie se activará el div 'camposCarnet'
		mostrarDatosCarnet(document.getElementById("riesgoBean.listaRolesPersona." +subClave+".idTipoIdent").value);   
	}else{
		// modificado contenido posterior ya que esta funcion es asincrona, asi que lo que hubiera despues de esta llamada ajax debe retrasarse hasta el callback
		nuevaPeticionAjax(actionRecargarTomador+"?clave="+subClave, 'get', null, function(request){processStateChangeRol(request);disableDatosPersona(true, subClave); if (document.getElementById("trNomApe"+subClave) != null) { document.getElementById("trNomApe"+subClave).className = "muestra"; } mostrarDatosCarnet(document.getElementById("riesgoBean.listaRolesPersona." +subClave+".idTipoIdent").value);presentationLogicPais(subClave);}, callbackError);
	}

}

function copiaTomador(subClave){
	
	
	// Obtenemos todos los campos de ese rol buscando por su subclave y limpiamos sus valores
	jQuery("[name*='"+subClave+"']").each(
		function(index){
			if(jQuery(this).attr("name").indexOf("idTipoVia") ==-1 && jQuery(this).attr("name").indexOf("idPais") ==-1){
				jQuery(this).val("");
			}
		}
	);	

	jQuery("[name*='"+subClave+"']").each(
			function(index){
				var nCampo = jQuery(this).attr("name").substring(jQuery(this).attr("name").lastIndexOf('.')+1); 
				
				//Se copian los datos del tomador y se deshabilita el campo
				if(document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.' + nCampo) && jQuery('#cotizacion\\.cotizaTomador\\.'+nCampo).val()){
					document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.' + nCampo).value = jQuery('#cotizacion\\.cotizaTomador\\.'+nCampo).val();					
					document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.' + nCampo).disabled=true;					
				}
				//Se copian los datos del domicilioView si tiene y se deshabilita el campo
				if(document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.domicilioView' + '.' + nCampo) && jQuery('#cotizacion\\.cotizaTomador\\.domicilioView\\.'+nCampo).val()){
					document.getElementById('riesgoBean.listaRolesPersona.' + subClave +'.domicilioView' + '.' + nCampo).value = jQuery('#cotizacion\\.cotizaTomador\\.domicilioView\\.'+nCampo).val();					
					document.getElementById('riesgoBean.listaRolesPersona.' + subClave +'.domicilioView' + '.' + nCampo).disabled=true;
				}												
				
			}
		);	
	document.getElementById('riesgoBean.listaRolesPersona.' + subClave + '.btLimpiar').disabled=false;
	//Se habilita el boton para limpiar el domicilio
	document.getElementById('btLimpiarDomic').disabled=false;
	
}

function botonManoCotiza(object){
	if(jQuery('#swModoEdicion')){
		jQuery('#swModoEdicion').val('true');
	}
	var modeloCotizacion=jQuery('#modeloCotizacion');
	top.pulsado = 'procesar';
	object.style.visibility='hidden';
	habilitaCampos();
	if(jQuery("#riesgoForm").val()!=undefined){
		bloquearCamposPersonas(document.forms['riesgoForm']);
		habilitaBoton(true);
		disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF);
		presentationLogicPaisAll(document.forms['riesgoForm']);
		filtrarColegios();
		disableInputsBonifRecarSegunCheckbox();
	}
	if(jQuery("#cotizacionForm").val()!=undefined){		
		// Comprobamos campos precargados del tomador
		compruebaDatosPrecargados();
		// Habilitamos el boton limpiar
		jQuery("#tomador\\.btLimpiar").attr("disabled",false);
		// Habilitamos la lupa del tomador
		jQuery("#imgBusqPersona").attr("disabled",false);
		// Si el modelo A o B aplicamos logica de presentación para los botones recoger datos del tomador
		if(modeloCotizacion.val()!=undefined){
			if(modeloCotizacion.val()=='A' || modeloCotizacion.val()=='B'){
				// Aplicamos la logica de presentación para el botón recoger datos del tomador
				disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF);
				jQuery("#botonPrecio").attr("disabled", false);
			}
		}
	}
	
	//Cuando pulsamos en el botón para editar, habilitamos el botón "Guardar"
	if (jQuery("#botonGuardar")) {
		jQuery("#botonGuardar").attr("disabled", false);
	}
	
	if(selectTab == "tab1_DAT"){
		// Comprobamos los datos economicos
		comprobarDatosInfoEconomica();
	}
}

function getPageRehabilitar(action,msg){
	if (window.confirm(msg)) { 
		getPage(action,'iAreaTrabajo');
	}
}

function botonContratarModelosAB(idTipoNumeracion, urlNumeracion){
	var bContratar = true;
	if (idTipoNumeracion == 1) { // MANUAL
		var retorno = lanzarVentana(urlNumeracion, 350, 150);
		if (retorno == null) {
			bContratar = false;
		}
	}
	return bContratar;
}

function llamaAjaxTienePermisoRechazarCotiz(url){
		var ajax = new Ajax.Request( url, { method:"post", onComplete: muestraRechazarCotiz});
}

function muestraRechazarCotiz(resp){
	if(document.getElementById("botonRechazar") !=undefined){
		if(resp.responseText!=null && resp.responseText == 'true'){
			document.getElementById("botonRechazar").style.visibility = "visible";
			
		}else{
			document.getElementById("botonRechazar").style.visibility = "hidden";
			
		}
	}	
}

function llamaAjaxTienePermisosRehabilitarCotiz(url){
	var ajax = new Ajax.Request( url, { method:"post", onComplete: muestraRehabilitarCotiz });
}

function muestraRehabilitarCotiz(resp){
	if(document.getElementById("botonRehabilitar")!=undefined){
		if(resp.responseText!=null && resp.responseText == 'true'){
			document.getElementById("botonRehabilitar").style.visibility = "visible";
			
		}else{
			document.getElementById("botonRehabilitar").style.visibility = "hidden";
			
		}
	}
}

function rehabilitarCotizacion(msg){
	if (window.confirm(msg)) { 
		submitForm(document.forms[0],null,'iAreaTrabajo');
	}
}
	
function filtrarColegios(){
	if(jQuery('input[name="filtroColegios"]').val()!=undefined){
		var filtroColegio = jQuery('input[name="filtroColegios"]').val();
		cargaColegiosProfesionales(actionSelectColegioProf+'?filtroColegios='+filtroColegio, 'riesgoForm');
	}
}

function asignarMediadorModeloA(idMediador, codMediador, descMediador){
	jQuery("input[name='cotizacion.cotizaMediador.idMediador']").val(idMediador);
	jQuery("input[name='cotizacion.cotizaMediador.codMediador']").val(codMediador);
	jQuery("input[name='cotizacion.cotizaMediador.descMediador']").val(descMediador);
}

function permiteTodasModalidades(select) {
	//bug#CORE23. No permitimos seleccionar 'TODAS LAS MODALIDADES' en productos que permitan más de 1 riesgo
	if ((swMasRiesgos != null) && (swMasRiesgos == 1) && (select.options[select.selectedIndex].id == 'TODAS')){
		//Si se selecciona porque es un valor por defecto, no devolvemos error y ponemos el selectedIndex = -1
		//en el combo para que se tenga que seleccionar a mano.
		if (select.oldSelectedIndex == undefined || (select.oldSelectedIndex == select.selectedIndex)) {
			select.oldSelectedIndex = undefined;
			select.selectedIndex = -1;
			return true;
		} else {
			return false;
		}
	}
	select.oldSelectedIndex = select.selectedIndex;	
	return true;
}

function setOldValueSelect(select) {
	select.oldSelectedIndex = select.selectedIndex; 
}
