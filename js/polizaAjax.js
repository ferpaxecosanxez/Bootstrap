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
var actionIniInfoEconomica;
var actionActividadEmpresa;
var actionSelectDomicRol;
var controlTab = true;
var siguienteActionModeloC;
var tab0="tab0_DAT";
var tab1="tab1_DAT";
var actionArbol;
var actionInitRiesgo;
var infoEconomica=true;
		
function quitarCapasMensajes() {
		
	var content = "";
	var contentCotizacion = "<input type='hidden' name='mvtoPolizaForm.estadoAddCotizacion'>";
	var contentRiesgo = "<input type='hidden' name='page' value='2'>"
									  + "<input type='hidden' name='estadoAddRiesgo'>";
	
	//ocultamos todos los mensajes de poliza, riesgos y resultados
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

//extraido del antiguo 'quitarTodosRelojes'
function cargaDetalleInfoEconomica() {
	if ((document.frames['iTabContent'] != null) && (document.frames['iTabContent'].document != null)) {
	    //enviarDatos(frames('iTabContent').document, frames('iTabContent').document.getElementById('codigoStr').value);
    	frames('iTabContent').document.getElementById('codigoStr').value = "IED";
    	frames('iTabContent').document.forms[0].submit();
    	muestraCarga();
    }
}
	
function submitFormulariosCotizacion(origen) {
	//inicializamos el control de los tab
	controlTab = true;
	//reseteamos el campo oculto de estado
	document.getElementById('estadoAddCotizacion').value = "unsuccesfull";

  	if(origen=='Tab'){
	  controlTab = false;
	}

	//llamamos al submit del formulario de poliza
	muestraCarga();
	retrieveURLCotizacion(actionAddCotizacion, 'mvtoPolizaForm');
}

function submitFormularioRiesgo(origen) {
    
	//inicializamos el control de los tab
	controlTab = true;

	//reseteamos el campo oculto de estado
	document.getElementById('estadoAddRiesgo').value = "unsuccesfull";
	if(origen=='Tab'){
		controlTab = false;

		//llamamos al submit del formulario de riesgo
		muestraCarga();
		retrieveURLCotizacion(actionAddRiesgoFromTab, 'polRiesgoForm');
  } else {
	//llamamos al submit del formulario de riesgo
	muestraCarga();
	retrieveURLCotizacion(actionAddRiesgo, 'polRiesgoForm');
  }
}
		
function verPrecio() {
	muestraTarifa();
	//si todo ha ido bien hacemos submit de la poliza
	nuevaPeticionAjax(actionCotizacion, "post", null, processStateChangeCotizacionWithoutParams, callbackError);
}

function retrieveURLCotizacion(url,nameOfFormToPost) {
	//recogemos los parametros a enviar por post
	var parametros = obtenerParametersCamposFormularios([nameOfFormToPost]);	    	
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
                 
         if (request.responseText.indexOf("<input type=\"hidden\" name=\"modoPantalla\" value=\"true\">") > -1) {

				allDisabledFull(document.forms(0),true);		
        }
        
        // Funcionalidad especifica para mostras campos en la parte de la poliza
        if(document.getElementById('tomador.swDomicilioDocu') !=undefined ){
			    // domicilio de documentacion		
			    mostrarDomicilioDocum(document.getElementById('tomador.swDomicilioDocu').value);
		}
		
		if(document.getElementById('tomador.swDomicilioCobro') !=undefined ){
				// domicilio de cobro

				var sinLimpiar = document.getElementById('tomador.swDomicilioCobro').value=='1';
			    mostrarDomicilioCobro(document.getElementById('tomador.swDomicilioCobro').value, sinLimpiar);
		}
		
		if(document.getElementById('tomador.idTipoIdent') !=undefined ){		
			showDatosTomador(document.getElementById('tomador.idTipoIdent').value);		
		}
		
		if(document.getElementById('poliza.idNivelFormaPago') !=undefined ){		
			showFormaPagoRiesgo(document.getElementById('poliza.idNivelFormaPago').value);		
		}
         
        if(document.getElementById('poliza.idNivelMedioCobro') !=undefined ){		
			showMedioCobroRiesgo(document.getElementById('poliza.idNivelMedioCobro').value);		
		}
		
		if(document.getElementById('riesgoBean.datosGestion.idMedioCobro') !=undefined ){		
			funcionalidadMedioCobroRiesgo(document.getElementById('riesgoBean.datosGestion.idMedioCobro').value);		
		}
			
		if(document.getElementById('cDivOtros2') != undefined){		
			handlerBlockPoliza('cDivOtros2',false);			
		}
		
		if(document.getElementById('riesgoBean.duracion.idDuracionSeguro') != undefined){		
			ctrlDuracionRiesgo(document.getElementById('riesgoBean.duracion.idDuracionSeguro').value);			
		}
		
		comprobarRgoDecesos();
		

		//Mostramos la cortina solo cuando exista un numero de riesgo lo que nos indica que esta guardado y debe aparecer esta
		if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != ""){
			//Si el boton que hemos pulsado no es el de modificar
			if(top.pulsado != "procesar"){
				muestraCortina();
			}else{
				top.pulsado = "";
			}
        }else{
        	swFormularioHabilitado = true;
        }
        
		if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != "" ){
		      window.parent.frames[2].location = actionArbol;
		}
		presentationLogicPaisAll(document.forms['polRiesgoForm']);
      } else {
         alert("Problem with server response:\n " + request.statusText);
         muestraCortina();
      }
      
   }

} // processStateChangeSoloUnRiesgo


	/*
	 * Set as the callback method for when XmlHttpRequest State Changes
	 * used by retrieveUrl
	 */
	function processStateChangeCotizacionWithoutParams(request) {
		var saveCorrecto=true;
	   if (request.readyState == 4) { // Complete	      
	      if (request.status == 200) { // OK response    		
	      	// quitamos los relojes activos
      		ocultaCarga();
      		cargaDetalleInfoEconomica();

	    	var botonGuardar=document.getElementById('botonGuardar');
	    	var botonSiguiente=document.getElementById('botonSiguiente');
	    	var botonEditar=document.getElementById('handWrite');
	    	
	    	//Desactivamos el botón siguiente y lo habilitamos cuando Calculemos precio y devuelva una respuesta satisfactoria
	    	if (botonSiguiente != null) {
	    		botonSiguiente.disabled = true;
	    	}
      		
			spanElements = splitTextIntoSpan(request.responseText);	        
	        replaceExistingWithNewHtml(spanElements);
	        if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"unsuccesfull\">") > -1) {
		        //si hay errores muevo el foco al link de observaciones para que no se quede en la botonera y se vean los errores
		        volverArriba();
		        if (top.pulsado == "verPrecioRiesgo") {
					top.pulsado = "";
		        }
	        }
  	        else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"succesfull\">") > -1) {        
		      if (siguienteActionModeloC != null) {
		    	muestraCarga();
			    document.location.href=siguienteActionModeloC;
		      }
		      if (botonSiguiente != null) {
		    	  botonSiguiente.disabled = false;
		      }		      
		    }  
  			else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"unsuccesfull\">") > -1) {
		      //si hay errores muevo el foco al link de observaciones para que no se quede en la botonera y se vean los errores
  				saveCorrecto=false;
		        volverArriba();
		        ocultaCarga();
		        if (botonEditar != null) {
		        	document.getElementById("handWrite").style.visibility='visible';
		        	botonEditar.disabled = false;
		        }
	        }
  	        else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"succesfull\">") > -1) {
  	        	if(botonGuardar.disabled) botonGuardar.disabled=true;
  	        	if (siguienteActionModeloC != null) {
			    	muestraCarga();
				    document.location.href=siguienteActionModeloC;
			    }
			    allDisabledFull(document.forms['polRiesgoForm'],true);
		      	bloquearCamposPersonas(document.forms['polRiesgoForm']);
		      	document.getElementById("handWrite").style.visibility='visible';
  	        	if(document.getElementById('botonAltaAsegurado') != null){
	  	  			document.getElementById('botonAltaAsegurado').disabled=true;
	  	  		}
	  	  		if(document.getElementById('botonAltaAgrupacion') != null){
	  	  			document.getElementById('botonAltaAgrupacion').disabled=true;
	  	  		}
		    }
	        //if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoArbolPoliza\" value=\"succesfull\">") > -1){
	     		window.parent.frames[2].location = actionArbol;
	     	//}        	
	     	//Mostramos la cortina solo cuando exista un numero de riesgo lo que nos indica que esta guardado y debe aparecer esta
			//alert(document.getElementById("errorGrave"));
			//El hidden de errorgrave se encuentra en polizaResultado.jsp (verPrecio) y saveRiesgoPoliza.jsp (Guardar) , este ultimo a false 
			if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != ""){    	
	        	//Si el boton que hemos pulsado no es el de modificar
        		if(top.pulsado != "procesar" && document.getElementById("errorGrave") != null && document.getElementById("errorGrave").value == "false"){
        			muestraCortina();
	        	}else{
					top.pulsado = "";
				}
	        }else{
	        	swFormularioHabilitado = true;
	        }
			if (request.responseText.indexOf("<input type=\"hidden\" name=\"errorTarificacion\" value=\"succesfull\">") > -1){
				volverArriba();
	     	}else if(saveCorrecto){
	     		volverAbajo();
	     	}
	      } else {
	         alert("Problem with server response:\n " + request.statusText);
			 ocultaCarga();
			 muestraCortina();
	      }
	   }
	} // processStateChange
	
  
  /*
  * Set as the callback method for when XmlHttpRequest State Changes 
  * used by retrieveUrl
  */
  function processStateTipoRiesgo(request) {
  	//se ha completado la comunicacion
  	if (request.readyState == 4) { // Complete
      if (request.status == 200) { // OK response
        
        
        //alert("Ajax response:"+request.responseText);
        //<textarea id="contenedor" rows="35" cols="135"></textarea>
        //document.getElementById('contenedor').value=request.responseText;
        
        //Split the text response into Span elements
        spanElements = splitTextIntoSpan(request.responseText);
        replaceExistingWithNewHtml(spanElements);
        
        //preguntamos si la lista de riesgos solo contiene uno para
        //realizar la llamada a la seleccion del riesgo
        if (request.responseText.indexOf("<input type=\"hidden\" name=\"soloUnRiesgo\" value=\"true\">") > -1) {
					muestraCarga();
					//llamada a formulario de riesgo
					nuevaPeticionAjax(actionSelectRiesgo, "post", getFormAsString('polRiesgoForm'), processStateChangeSoloUnRiesgo, callbackError);
        }
        
        var botonGuardar = document.getElementById('botonGuardar');
  		//Desactivamos el botón "Guardar"
        if (botonGuardar != null) {
        	botonGuardar.disabled = !(request.responseText.indexOf("<input type=\"hidden\" name=\"swModoEdicion\" value=\"true\" id=\"swModoEdicion\">") > -1);
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
    peticionAjax(url,"post",null,callbackChangeRiesgo, callbackError);
    
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
        
		if(document.getElementById('cDivOtros2') != undefined){		
			handlerBlockPoliza('cDivOtros2',false);			
		}
		
		//Mostramos la cortina solo cuando exista un numero de riesgo lo que nos indica que esta guardado y debe aparecer esta
		if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != ""){
			//Si el boton que hemos pulsado no es el de modificar
        	if(top.pulsado != "procesar"){
				muestraCortina();
			}else{
				top.pulsado = "";
			}
		}else{
			swFormularioHabilitado = true;
		}
		
      } else {
        alert("Problem with server response:\n " + requestRiesgo.statusText);
				ocultaCarga();
				muestraCortina();
      }
    }
  }
  
  function callbackChangeRiesgo(requestRiesgo) {       
    //Split the text response into Span elements
    spanElements = splitTextIntoSpan(requestRiesgo.responseText);   
    //Use these span elements to update the page
    replaceExistingWithNewHtml(spanElements);
	if(document.getElementById('cDivOtros2') != undefined){		
		handlerBlockPoliza('cDivOtros2',false);			
	}	
	//Mostramos la cortina solo cuando exista un numero de riesgo lo que nos indica que esta guardado y debe aparecer esta
	if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != ""){
		//Si el boton que hemos pulsado no es el de modificar
    	if(top.pulsado != "procesar"){
			muestraCortina();
		}else{
			// Eliminamos la informacion economica
			quitarCapasMensajes();
		}
	}else{
		swFormularioHabilitado = true;
	}
	presentationLogicPaisAll(document.forms['polRiesgoForm']);
 	if(document.getElementById('tomador.idTipoIdent')!=null){
 		updateCodigoPostal('tomador.domicilioView');
 		// muestro los campos dependiendo si es persona fisica o juridica
 		showDatosTomador(document.getElementById('tomador.idTipoIdent').value);
 		if(document.getElementById('tomador.domicilioView.idPais')!=undefined && document.getElementById('tomador.domicilioView.idPais').value == ''){
 			var valorPais = obtenerValueComboMedianteId('tomador.domicilioView.idPais', codigoPaisCompania);
 			document.getElementById('tomador.domicilioView.idPais').value=valorPais;
 			document.getElementById('tomador.domicilioView.idPais').id=codigoPaisCompania;
 			changePaisLogicNew('tomador.domicilioView.idPais','tomador.domicilioView.idProvincia','tomador.domicilioView.localidad','tomador.domicilioView.imgBusqLocalidad','tomador.domicilioView.codPostal','tomador.domicilioView.codigoPais');               
 		}
 		if(document.getElementById('tomador.tipoDatoBancario')!=undefined && document.getElementById('tomador.tipoDatoBancario').value != ''){
 			cambiarCapaDatos(document.getElementById('tomador.tipoDatoBancario').value);
 		}		
 		disableDatosTomador(true);
 		disableDatosTomadorPoPup(true);
 		disableCamposNoModif(true);
 		ctrlDatosBanco(true);
 	}	
 	presentationLogicPaisAll(document.forms['polRiesgoForm']);
 	ocultaCarga();
  }
  
  
function retrieveURLParameter_1(property, lit, categoria){
	retrieveURLParameter(actionSelectMarca + '?marca='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.marca"].value +'&categoria='+categoria , 'polRiesgoForm', property, lit);
}
function retrieveURLParameter_2(property, lit){
	retrieveURLParameter(actionSelectModelos +'?marca='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.marca"].value, 'polRiesgoForm' , property, lit);
}
function getRiesgoPredefVEHI(){
	top.pulsado="procesar";
	nuevaPeticionAjax(actionSelectVersion + '?marca='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.marca"].value +'&modelo_vehi='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.modelo"].value+'&codvehic='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.codvehic"].value, "post", null, processStateChangeRiesgo, callbackError);
}
function getRiesgoPredefVEHIByCodvehic(categoria,mensajeError){
	
	if(document.polRiesgoForm.elements["codVehicDirecto"].value !=null && document.polRiesgoForm.elements["codVehicDirecto"].value !=''){
		top.pulsado="procesar";		
		nuevaPeticionAjax(actionSelectVehiDirecto + '?codvehic='+trim(document.polRiesgoForm.elements["codVehicDirecto"].value)+'&categoria='+categoria, "post", null, processStateChangeRiesgo, callbackError);
	}else{
		alert(mensajeError);
		ocultaCarga();
   }
}
function retrieveURLParameter_matricula(property, lit,campo, modificarSinco){
	retrieveURLParameter(actionSelectMatricula + '?validaMatricula='+document.polRiesgoForm.elements[property].value+'&campo='+campo+'&modificarSinco='+modificarSinco, 'polRiesgoForm', property, lit);
}
function retrieveURLParameter_matriculaRmq(property, lit, campo, modificarSinco){
	retrieveURLParameter(actionSelectMatricula + '?validaMatricula='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.matrrmq"].value+'&campo='+campo+'&modificarSinco='+modificarSinco, 'polRiesgoForm', property, lit);
}
function seleccionRiesgo() {
	retrieveURLSelectRiesgo(actionSelectRiesgo, 'riesgoCotizableSelected', 'codigoRiesgoCotizableSelected');
}
function retrieveURLParameter_personaTomador(form, property, lit) {
    retrieveURLParameter(actionSelectPersonaTomador + '?idPersona='+document.mvtoPolizaForm.elements["poliza.cotizaTomador.idPersona"].value+"&clasePersona=tomador" , form, property, lit);
}
function retrieveURLParameterDef_personaTomador(llamadaCambio, params) {
	retrieveURLParameterCompleto(actionSelectPersonaTomador + '?idPersona='+document.mvtoPolizaForm.elements["cotizacion.cotizaTomador.idPersona"].value+"&clasePersona=tomador", llamadaCambio, params);
}

function retrieveURLParameter_personaRol(url,idPersona, subClave){
    nuevaPeticionAjax(url+'?idPersona='+idPersona+'&clasePersona=rol&subClave='+subClave, 'get', null, processStateChangeRol, callbackError);
}
function retrieveURLParameterDef_personaRol(url,idPersona, subClave, llamadaCambio, params){
    retrieveURLParameterCompleto(url+'?idPersona='+idPersona+'clasePersona=rol&subClave='+subClave, llamadaCambio, params);
}
function retrieveURLParameter_datosDomicRol(idPersona, subClave, domicilioSelec,telefonoSelec,emailSelec, clave){       
    nuevaPeticionAjax(actionSelectDomicRol+'?idPersona='+idPersona+'&clasePersona=rol&subClave='+subClave+'&domicilioSelec='+domicilioSelec+'&telefonoSelec='+telefonoSelec+'&emailSelec='+emailSelec+'&clave='+clave, 'get', null, processStateChangeRol, callbackError);
}
function retrieveURLParameterDef_datosDomicRol(idPersona, subClave, domicilioSelec, telefonoSelec, emailSelec, clave, llamadaCambio, params){
    retrieveURLParameterCompleto(actionSelectDomicRol+'?idPersona='+idPersona+'&clasePersona=rol&subClave='+subClave+'&domicilioSelec='+domicilioSelec+'&telefonoSelec='+telefonoSelec+'&emailSelec='+emailSelec+'&clave='+clave, llamadaCambio, params);
}
function actividadCNAE(property, lit){
	retrieveURLParameter(actionActividadEmpresa +'?actvprod='+document.polRiesgoForm.elements["riesgoBean.riesgoPredef.actvprod"].value, 'polRiesgoForm', property, lit);
}

//Funcion controladora para el tab de 'informacion economica' en el riesgo
function informacionTab(doc,str,elemento,numRiesgo){

	var idTipoModo = document.getElementById('poliza.datosGenerales.idModoMvtoPoliza').value;
	
	//Si estamos en una consulta bloqueamos los campos
	if(numRiesgo && numRiesgo.innerText!="")
		idTipoModo='0'
			
	if(idTipoModo != null && idTipoModo != '' && idTipoModo == '0'){
		allDisabledFull(document.forms(0),true);
	}
// Si existe resultado economico entonces cargamos la información en detalle
	if(document.getElementById('resultadoOK')){
		str='IED';
		// Si no, en modo edicion
	}else{
		str='G';
	}
	 
	if(enviarDatos(doc,str,elemento)){
		top.plegarAmbos();
		enviarDatosPestanna(tab0);
		muestraCarga();
		retrieveURLSelectRiesgo(actionSelectRiesgo, 'riesgoCotizableSelected', 'codigoRiesgoCotizableSelected');
	 }
}


function processStateCambiaTab() { 
  	//se ha completado la comunicacion
  	if (request.readyState == 4) { // Complete
      if (request.status == 200) { // OK response
        
        //alert(request.responseText);
        if(document.getElementById('iTabContent') != null){
      	
      		frames('iTabContent').document.getElementById('codigoStr').value = "IED";	    	
	     	frames('iTabContent').document.forms[0].submit();            			
			enviarDatosPestanna(tab1);
      	}
        
        //Split the text response into Span elements
        spanElements = splitTextIntoSpan(request.responseText);
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
	         if(tipoIdentificador!="1"){
	        	 document.getElementById("riesgoBean.listaRolesPersona." + subClave + ".idTipoIdent").disabled=false;
	         }
	         if(subClave == "propietario_1" || subClave == "asegurado_1"|| subClave == "beneficiario_1" || subClave == "asegurmult_1"){	         
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


/** Callbacks **/

function callbackCotizacion(request){	
	   // Obtenemos los elementos dentro de los span
	   spanElements = splitTextIntoSpan(request.responseText);
	   // Reemplazamos esos elementos en el dom existente
	   replaceExistingWithNewHtml(spanElements);       
 		ocultaCarga();
	    // Si al añadir la poliza el estado es insatisfactorio
	    if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"unsuccesfull\">") > -1) {    
	    	disableEnableSelectRiesgo(false);
	      //si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
	    	volverArriba();
	    }
	    // Si al añadir la poliza el estado es satisfactorio
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddCotizacion\" value=\"succesfull\">") > -1) {			        
			    //si el modelo de poliza es A o B llamamos a la validacion del riesgo
	        if (request.responseText.indexOf("<input type=\"hidden\" name=\"swModelo\" value=\"C\">") == -1) {
				//reseteamos el campo oculto de estado
				document.forms['polRiesgoForm'].elements('estadoAddRiesgo').value = "unsuccesfull";		        	        	
				muestraCarga();
				if (!controlTab) {
					submitFormularioRiesgo('Tab');
				}
				else {
					retrieveURLCotizacion(actionAddRiesgo, 'polRiesgoForm');
				}
			}
		    else {
		    	muestraCarga();
				//si todo ha ido bien hacemos submit de la poliza
				retrieveURLCotizacion(actionCotizacion, 'mvtoPolizaForm');
				disableEnableSelectRiesgo(true);
		    }			    		    						
	    }
	    // Si al añadir el riesgo el estado es insatisfactorio
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddRiesgo\" value=\"unsuccesfull\">") > -1) {			
	        // Cuando venimos del cambio de pestania el controlTab fue inicializado a false	
			if (controlTab) {
				if(document.getElementById('iTabContent') != null){
	  				frames('iTabContent').document.getElementById('codigoStr').value = "IED";	    	
	    			frames('iTabContent').document.forms[0].submit();
				}
			}  			      	
			//Si existe informacion de recibo a nivel de riesgo, es necesario habilitar los campos:
			disableDatosTomador(false);
			disableCamposPagadorRiesgo(false);
			disableDomicilioTomador(false);
			disableEnableSelectRiesgo(false);
	      	bloquearCamposPersonas(document.forms['polRiesgoForm']);
	      	presentationLogicPaisAll(document.forms['polRiesgoForm']);
	      	//si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
	      	volverArriba();
	    }
	    // Si al añadir el riesgo el estado es satisfactorio
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoAddRiesgo\" value=\"succesfull\">") > -1) {
	    	// Cuando venimos del cambio de pestania el controlTab fue inicializado a false
			if(controlTab){
	 		    muestraCarga();
			 	//si todo ha ido bien hacemos submit de la cotizacion
				nuevaPeticionAjax(actionCotizacion, "post", null, processStateChangeCotizacionWithoutParams, callbackError);
			}
			else {
				if(document.getElementById('botonPrecio') != null)
					document.getElementById('botonPrecio').disabled=false;					
				//Cuando cambiamos de pestana
				//Si esta el boton anular y esta deshabilitado, quiere decir que hemos anulado y tenemos que deshabilitar el verPrecio
				if(document.getElementById("botonAnular") != null && document.getElementById("botonAnular").disabled == true)	
					document.getElementById('botonPrecio').disabled=true;
				if(document.getElementById('idTipoMovimientoPoliza').value == 16 )	
					if(document.getElementById('botonPrecio') != null) document.getElementById('botonPrecio').disabled=true;
										
				top.plegarAmbos();
				
				if(document.getElementById('iTabContent') == null){
					retrieveURLWithoutParametersSync(actionIniInfoEconomica);
				}
				else{
					frames('iTabContent').document.getElementById('codigoStr').value = "IED";	    	
	            	frames('iTabContent').document.forms[0].submit();
	            }
				enviarDatosPestanna(tab1);
				muestraCarga();
			}	
			disableEnableSelectRiesgo(true);
	    }
	    // Si el estado del riesgo es insatisfactorio
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"unsuccesfull\">") > -1) {
			ocultaCarga();
   		    if(selectTab == tab1){
   		    	codigoStr = "G"; 
   		    } else {
   		    	codigoStr = "IED";
   		    }
   		    cargaDetalleInfoEconomica(codigoStr);
			//si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
			bloquearCamposPersonas(document.forms['polRiesgoForm']);
			presentationLogicPaisAll(document.forms['polRiesgoForm']);
			disableEnableSelectRiesgo(false);
		    // Muevo el foco para que se vean los errores
			volverArriba();
			if(selectTab != tab1){
				selectTab = tab0;
			}
	    }
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoRiesgo\" value=\"succesfull\">") > -1) {
	    	disableEnableSelectRiesgo(true);
	    }
	    // Si el estado de la poliza es insatisfactorio
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"unsuccesfull\">") > -1) {
			ocultaCarga();
			disableEnableSelectRiesgo(false);
			//si hay errores muevo el foco al link de usuario para que no se quede en la botonera y se vean los errores
			volverArriba();
	    }
	    else if (request.responseText.indexOf("<input type=\"hidden\" name=\"estadoCotizacion\" value=\"succesfull\">") > -1) {
	    	disableEnableSelectRiesgo(true);
	    }
	    //Si estamos en la informacion economica haciendo el cambio de pesta?a del riesgo hacia esta no sacamos la cortina
	    if(controlTab){	        
	        //Mostramos la cortina solo cuando exista un numero de riesgo lo que nos indica que esta guardado y debe aparecer esta
			if(document.getElementById("num_riesgoAjax").firstChild.innerHTML != ""){
	    		//Si el boton que hemos pulsado no es el de modificar
	    		if(top.pulsado != "procesar" && document.getElementById("errorGrave") != null && document.getElementById("errorGrave").value == "false"){
	    			muestraCortina();
	    		}
	        }else{
	        	swFormularioHabilitado = true;
	        }	        
		}
}

function disableEnableSelectRiesgo(estado) {
	jQuery('#riesgoCotizableSelected').attr('disabled', estado);
}

function callbackError(request){
	alert("Problema con la respuesta del servidor:\n " + request.statusText);
	ocultaCarga();
	muestraCortina();
}
