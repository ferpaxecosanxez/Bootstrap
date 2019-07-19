/**
 * Ajax.js
 *
 * Collection of Scripts to allow in page communication from browser to (struts) server
 * ie can reload part instead of full page
 *
 * How to use
 * ==========
 * 1) Call retrieveURL from the relevant event on the HTML page (e.g. onclick)
 * 2) Pass the url to contact (e.g. Struts Action) and the name of the HTML form to post
 * 3) When the server responds ...
 *     - the script loops through the response , looking for <span id="name">newContent</span>
 *        - each <span> tag in the *existing* document will be replaced with newContent
 *
 * Como depurar
 * ============
 * 1) Establecer el valor de la variable debugAjax a valor true.
 * 2) Todos los m?todos mostrar?n un alert con el valor del objeto m?s importante
 *    del mismo.
 * 3) Opcionalmente se puede hacer que el contenido de la respuesta se muestre en una
 *    caja de texto, ya que en un alert a veces no se muestra todo bien.
 *    Se debe incluir la siguiente entrada HTML en la pagina:
 *        <textarea id="txtDebugAjax" rows="35" cols="80"></textarea>
 *
 *
 * NOTE: <span id="name"> is case sensitive. Name *must* follow the first quote mark and end in a quote
 *     Everything after the first '>' mark until </span> is considered content.
 *     Empty Sections should be in the format <span id="name"></span>
 */

// global variables
var req;
var which;
// Flag para la depuracion de los m?todos de Ajax
var debugAjax = false;

/**
 * Get the contents of the URL via an Ajax call
 *
 * @param url - to get content from
 * @param nameOfFormToPost - which form values will be posted up to the server as part
 *                           of the request (can be null)
 */
function retrieveURL(url, nameOfFormToPost) {
   retrieveURL(url, nameOfFormToPost, true);
}

/**
 * Get the contents of the URL via an Ajax call
 * por post en vez de por get
 *
 * @param url - to get content from
 * @param nameOfFormToPost - which form values will be posted up to the server as part
 *                           of the request (can be null)
 * @param asyncFlag - true call made asynchronously, false call synchronously
 */
function retrieveURLPorPost(url, nameOfFormToPost, asyncFlag) {
	//recogemos los parametros a enviar por post
	var formAsString = getFormAsString(nameOfFormToPost);
	//Do the Ajax call
	if (window.XMLHttpRequest) { // Non-IE browsers
		req = new XMLHttpRequest();
		req.onreadystatechange = processStateChange;
		try {
			req.open("POST", url, asyncFlag); //was get
		} catch (e) {
			alert("Problem Communicating with Server\n"+e);
			ocultaCarga();
		}
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//  para evitar el warning sobre parámetros inválidos
		if (formAsString.indexOf("?") == -1) {
				formAsString = "?x=" + formAsString;
		}
		req.send(formAsString);
	}
	else if (window.ActiveXObject) { // IE
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = processStateChange;
			req.open("POST", url, asyncFlag);
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			// jgomez: para evitar el warning sobre parámetros inválidos
			if (formAsString.indexOf("?") == -1) {
				formAsString = "?x=" + formAsString;
			}
			req.send(formAsString);
		}
	}
}
/**
 * Get the contents of the URL via an Ajax call
 *
 * @param url - to get content from
 * @param nameOfFormToPost - which form values will be posted up to the server as part
 *                           of the request (can be null)
 * @param asyncFlag - true call made asynchronously, false call synchronously
 */
function retrieveURL(url, nameOfFormToPost, asyncFlag) {
   // get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&" + getFormAsString(nameOfFormToPost);
   } else {
     url = url + "?" + getFormAsString(nameOfFormToPost);
   }
   if (debugAjax) {
      alert('retriveURL: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, asyncFlag); //was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }

      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {

         req.onreadystatechange = processStateChange;
         req.open("GET", url, asyncFlag);
         req.send();
      }
   }
}

/**
 * Get the contents of the URL via an Ajax call
 * url - to get content from (e.g. /struts-ajax/sampleajax.do?ask=COMMAND_NAME_1)
 * nodeToOverWrite - when callback is made
 * nameOfFormToPost - which form values will be posted up to the server as part
 *              of the request (can be null)
 */
function retrieveURLSelect(url,nameIdSelect,nameCodSelect) {
   //get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&" + getSelectAsString(nameIdSelect, nameCodSelect);
   } else {
      url = url + "?" + getSelectAsString(nameIdSelect, nameCodSelect);
   }

   if (debugAjax) {
      alert('retriveURLSelect: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, true); //was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, true);
         req.send();
      }
   }
}

/**
 * Recibimos los modelos en funcion de la marca seleccionada
 *
 * url - Url de invocacion
 * nameOfFormToPost - Nombre del formulario de envio de datos
 * findParameter - Nombre del parametro a buscar para su envio
 * sendParameter - Nombrel del parametro a utilizar para el envio de la peticion
 */
function retrieveURLParameter(url, nameOfFormToPost, findParameter, sendParameter) {

	
   // get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   } else {
      url = url + "?" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   }

   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, true);
         req.send();
      }
   }
} // retrieveURLParameter

/**
 * Recibimos los modelos en funcion de la marca seleccionada
 *
 * url - Url de invocacion
 * nameOfFormToPost - Nombre del formulario de envio de datos
 * findParameter - Nombre del parametro a buscar para su envio
 * sendParameter - Nombrel del parametro a utilizar para el envio de la peticion
 */
function retrieveURLParameterSync(url, nameOfFormToPost, findParameter, sendParameter) {

	
   // get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   } else {
      url = url + "?" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   }

   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, false); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, false);
         req.send();
      }
   }
} // retrieveURLParameterSync


/**
 * Envio de una petici?n con una lista de parametros
 *
 * url - Url de invocacion
 * nameOfFormToPost - Nombre del formulario de envio de datos
 * findParameters - Array de nombres de parametros a buscar
 * sendParameters - Array de nombres de parametros a enviar
 */
function retrieveURLParameters(url, nameOfFormToPost, findParameters, sendParameters) {
   // get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&";
   } else {
      url = url + "?";
   }

   // Recorrido de la collecion de parametros a buscar
   for (var i = 0; i < findParameters.length; i++) {
      // Concatenacion de cada parametro
      url = url + getParameterFormAsString(nameOfFormToPost, findParameters[i], sendParameters[i]);
   }

   if (debugAjax) {
      alert('retriveURLParameters: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n" + e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, true);
         req.send();
      }
   }
} // retrieveURLParameters


/**
 * Envio de una petici?n con una lista de parametros
 *
 * url - Url de invocacion
 * nameOfFormToPost - Nombre del formulario de envio de datos
 * findParameters - Array de nombres de parametros a buscar
 * sendParameters - Array de nombres de parametros a enviar
 */
function retrieveURLWithoutParameters(url) {
   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n" + e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, true);
         req.send();
      }
   }
} // retrieveURLParameters

function retrieveURLWithoutParametersSync(url) {
   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("POST", url, false); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n" + e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("POST", url, false);
		 req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         req.send();
      }
   }
} // retrieveURLParameters

function retrieveURLWithoutParametersRecogerDatosTomador(url) {
	   // Do the Ajax call
	   if (window.XMLHttpRequest) { // Non-IE browsers
	      req = new XMLHttpRequest();
	      req.onreadystatechange = callbackTomador;
	      try {
	         req.open("GET", url, true); // was get
	      } catch (e) {
	         alert("Problem Communicating with Server\n" + e);
	      }
	      req.send(null);
	   } else if (window.ActiveXObject) { // IE
	      req = new ActiveXObject("Microsoft.XMLHTTP");
	      if (req) {
	         req.onreadystatechange = processStateChange;
	         req.open("GET", url, true);
	         req.send();
	      }
	   }
	} // retrieveURLParameters

function callbackTomador(){
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

    		//setValue('tomador.idPersona',valor[0]);
    		//retrieveURLPorPost(actionTomador,document.forms(0).name,false);
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

	         
	         
	      } else {
	         alert("Problem with server response:\n " + req.statusText);
	      }
	   }
}

function callbackTomadorPoliza(response){
    spanElements = splitTextIntoSpan(response.responseText);
    replaceExistingWithNewHtml(spanElements);
	updateCodigoPostal('tomador.domicilioView');
	presentationLogicTomador();
}

function presentationLogicTomador(){
	updateCodigoPostal('tomador.domicilioView');
	// muestro los campos dependiendo si es persona fisica o juridica
	showDatosTomador(document.getElementById('tomador.idTipoIdent').value);
	if(document.getElementById('tomador.domicilioView.idPais')!=undefined && document.getElementById('tomador.domicilioView.idPais').value == ''){
		var valorPais = obtenerValueComboMedianteId('tomador.domicilioView.idPais', codigoPaisCompania);
		document.getElementById('tomador.domicilioView.idPais').value=valorPais;
		document.getElementById('tomador.domicilioView.idPais').id=codigoPaisCompania;		               
	}	
	if(document.getElementById('tomador.tipoDatoBancario')!=undefined && document.getElementById('tomador.tipoDatoBancario').value != ''){
		cambiarCapaDatos(document.getElementById('tomador.tipoDatoBancario').value);
	}
	var disabled=true;
	if(jQuery("#idPersona").val()==''){
		disabled=false;
		document.getElementById('btLimpiarDomicCobro').value = 'Limpiar';
   	}
	disableDatosTomador(disabled);
	disableDatosTomadorPoPup(disabled);
	disableCamposNoModif(disabled);
	ctrlDatosBanco(disabled);
	changePaisLogicNew('tomador.domicilioView.idPais','tomador.domicilioView.idProvincia','tomador.domicilioView.localidad','tomador.domicilioView.imgBusqLocalidad','tomador.domicilioView.codPostal','tomador.domicilioView.codigoPais',true);
	agregaAtributoPrecarga('tomador');
	var idMovimientoPoliza=document.getElementById('idTipoMovimientoPoliza');
	if(null!=idMovimientoPoliza && idMovimientoPoliza.value!=movimientoNP){
		jQuery("#tomador\\.btLimpiar").prop("disabled",true);
	}
}


/*
 * Set as the callback method for when XmlHttpRequest State Changes
 * used by retrieveUrl
 */
function processStateChange() {
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
      } else {
         alert("Problem with server response:\n " + req.statusText);
      }
   } 
} // processStateChange

/**
 * gets the contents of the form as a URL encoded String
 * suitable for appending to a url
 * @param formName to encode
 * @return string with encoded form values , beings with &
 */
function getFormAsString(formName) {
   // Setup the return String
   returnString = "";

   // Get the form values
   formElements = document.forms[formName].elements;

   // loop through the array , building up the url
   // in the form /strutsaction.do&name=value
   for (var i = formElements.length - 1; i >= 0; --i) {
      // we encode with encodeURIComponent (include special characters) each value
      if (formElements[i].name != null && formElements[i].name !="" ) {
    	  returnString = returnString + "&" + encodeURIComponent(formElements[i].name)+"="+encodeURIComponent(formElements[i].value);
      }
   }

   if (debugAjax) {
      alert('getFormAsString: variable returnString: ' + returnString);
   }

   // return the values
   return returnString;
}

/**
 * obetenemos el parametro correspondiente al formulario pasado
 *
 * @param formName to encode
 * @param findParameter Nombre del parametro a buscar
 * @param sendParameter Nombre del parametro a enviar
 *
 * @return string with encoded form values , beings with &
 */
function getParameterFormAsString(formName, findParameter, sendParameter) {
   // Setup the return String
   returnString ="";

   // Get the form values
   formElements = document.forms[formName].elements;

   // loop through the array , building up the url
   // in the form /strutsaction.do&name=value
   for (var i = formElements.length-1; i>=0; --i) {
      // we encode with encodeURIComponent (include special characters) each value
      if (formElements[i].name == findParameter) {
    	  returnString = returnString + "&" + sendParameter + "=" + encodeURIComponent(formElements[i].value);
      }
   }

   if (debugAjax) {
      alert('getParameterFormAsString: variable returnString: ' + returnString);
   }

   // return the values
   return returnString;
}

/**
 * obetenemos el parametro correspondiente al formulario pasado
 *
 * @param formName to encode
 * @return string with encoded form values , beings with &
 */
function getSelectAsString(idParameter, codParameter){
   // Setup the return String
   returnString ="";

   // Get the form values
   var idElement = document.getElementById(idParameter);

   // we encode with encodeURIComponent (include special characters) each value
   returnString = idElement.name + "=" + encodeURIComponent(idElement.options[idElement.selectedIndex].value);   
   if (codParameter != null) {
	   returnString = returnString + "&" + codParameter + "=" + encodeURIComponent(document.getElementById(codParameter).value);
   }

   if (debugAjax) {
      alert('getSelectAsString: variable returnString: ' + returnString);
   }

   // return the values
   return returnString;
}


/**
 * Splits the text into <span> elements
 * @param the text to be parsed
 * @return array of <span> elements - this array can contain nulls
 */
function splitTextIntoSpan(textToSplit){
   // Split the document
   returnElements = textToSplit.split("</ajax_region>");

   // Process each of the elements
   for (var i = returnElements.length - 1; i >= 0; --i) {
      // Remove everything before the 1st span
      spanPos = returnElements[i].indexOf("<ajax_region");

      // if we find a match , take out everything before the span
      if (spanPos > 0) {
         subString = returnElements[i].substring(spanPos);
         returnElements[i]=subString;
      }
   }

   return returnElements;
}

/*
 * Replace html elements in the existing (ie viewable document)
 * with new elements (from the ajax requested document)
 * WHERE they have the same name AND are <span> elements
 * @param newTextElements (output of splitTextIntoSpan)
 *               in the format <span id=name>texttoupdate
 */
function replaceExistingWithNewHtml(newTextElements){

	//loop through newTextElements
	var stringjsPost = '';
	for ( var i=newTextElements.length-1; i>=0; --i ){
		//check that this begins with <span
		if(newTextElements[i].indexOf("<ajax_region")>-1){
			//get the name - between the 1st and 2nd quote mark
			startNamePos=newTextElements[i].indexOf('"')+1;
			endNamePos=newTextElements[i].indexOf('"',startNamePos);
			var name=newTextElements[i].substring(startNamePos,endNamePos);
			//get the content - everything after the first > mark
			startContentPos=newTextElements[i].indexOf('>')+1;
			content=newTextElements[i].substring(startContentPos);

            //check that this element exists in the document
            if(document.getElementById(name)){
            	stringeliminar = "";
            	var lastPos = 0;
            	while (content.indexOf("<ajax_script>",lastPos)>-1){
            		lastPos = content.indexOf("<ajax_script>", lastPos);
                	stringjs = content.substring(lastPos,content.indexOf("</ajax_script>",lastPos));
                	stringeliminar = stringjs + "</ajax_script>";
             	   
                	stringjs = stringjs.replace("<ajax_script>","");
                	//alert(stringjs)
                	eval(stringjs);
	                
					if(stringeliminar!="")
						content = content.replace(stringeliminar,"");
            	}
            	
            	lastPos = 0;
            	while (content.indexOf("<ajax_post_script>",lastPos)>-1){
            		lastPos = content.indexOf("<ajax_post_script>", lastPos);
                	stringjs = content.substring(lastPos,content.indexOf("</ajax_post_script>",lastPos));
                	stringeliminar = stringjs + "</ajax_post_script>";
             	   
                	stringjs = stringjs.replace("<ajax_post_script>","");
                	stringjsPost += stringjs;
	                
					if(stringeliminar!="")
						content = content.replace(stringeliminar,"");
            	}
            	
            	document.getElementById(name).innerHTML = content;
            }
		}
	}
	if (stringjsPost!=''){
		eval(stringjsPost);
	}
}

/**
 * Get the contents of the URL via an Ajax call
 *
 * @param url - to get content from
 * 
 * Solo pasamos la url, la cual nos devolvera la pagina que contiene las regiones ajax
 */

function retrieveURLParameterOnlyUrl(url) {
  
   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChange;
         req.open("GET", url, true);
         req.send();
      }
   }
}

/**
 * Get the contents of the URL via an Ajax call
 *
 * @param url - to get content from
 * @param asyncFlag - true call made asynchronously, false call synchronously
 */
function retrieveURLParameterOnlyUrlPorPost(url,asyncFlag) {
  
 
   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChange;
      try {
         req.open("POST", url, asyncFlag); //was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
      	 req.onreadystatechange = processStateChange;
         req.open("POST", url, asyncFlag);
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         req.send();
      }
   }
}


/**
 * Enviamos parametros para popup
 *
 * url - Url de invocacion
 * nameOfFormToPost - Nombre del formulario de envio de datos
 * findParameter - Nombre del parametro a buscar para su envio
 * sendParameter - Nombrel del parametro a utilizar para el envio de la peticion
 */
function retrieveURLParameterPopPup(url, nameOfFormToPost, findParameter, sendParameter) {

	
   // get the (form based) params to push up as part of the get request
   if (url.indexOf("?") > -1) {
      url = url + "&" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   } else {
      url = url + "?" + getParameterFormAsString(nameOfFormToPost, findParameter, sendParameter);
   }

   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChangePopPup;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
      	  // la salida sera para un popup, conlocual no hay 'iAreaTrabajo'	
         req.onreadystatechange = processStateChangePopPup;
         req.open("GET", url, true);
         req.send();
      }
   }
} // retrieveURLParameter

/**
 * Get the contents of the URL via an Ajax call
 *
 * @param url - to get content from
 * 
 * Solo pasamos la url, la cual nos devolvera la pagina que contiene las regiones ajax PARA POP-UP
 */

function retrieveURLParameterOnlyUrlPopPup(url) {
  
   if (debugAjax) {
      alert('retriveURLParameter: variable url: ' + url);
   }

   // Do the Ajax call
   if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = processStateChangePopPup;
      try {
         req.open("GET", url, true); // was get
      } catch (e) {
         alert("Problem Communicating with Server\n"+e);
      }
      req.send(null);
   } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
         req.onreadystatechange = processStateChangePopPup;
         req.open("GET", url, true);
         req.send();
      }
   }
}

/**
 * Creado para ser utilizado desde un popup, para no perder el ambito
 *
 * Get the contents of the URL via an Ajax call
 * por post en vez de por get
 *
 * @param url - to get content from
 * @param nameOfFormToPost - which form values will be posted up to the server as part
 *                           of the request (can be null)
 * @param asyncFlag - true call made asynchronously, false call synchronously
 */
function retrieveURLPorPostPopPup(url,nameOfFormToPost,asyncFlag) {		
	  	//recogemos los parametros a enviar por post
    	var formAsString = getFormAsString(nameOfFormToPost);
	    //Do the Ajax call
	    if (window.XMLHttpRequest) { // Non-IE browsers
	      req = new XMLHttpRequest();
	      req.onreadystatechange = processStateChangePopPup;
	      try {
	      	req.open("POST", url, asyncFlag); //was get
	      } catch (e) {
	        alert("Problem Communicating with Server\n"+e);
	        ocultaCarga();
	      }
				req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      req.send(formAsString);
	    }
	    else if (window.ActiveXObject) { // IE
	      req = new ActiveXObject("Microsoft.XMLHTTP");
	      if (req) {
	        req.onreadystatechange = processStateChangePopPup;
	        req.open("POST", url, asyncFlag);
					req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					req.send(formAsString);
	      }
	    }
}
/*
 * Set as the callback method for when XmlHttpRequest State Changes
 * used by retrieveUrl only in modal window
 */
function processStateChangePopPup() {
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
      } else {
         alert("Problem with server response:\n " + req.statusText);
      }
   }
} // processStateChangePopPup


/**
 * Get the contects of form via a pagination call
 *
 * @param form
 * @param propertyFormPage
 * @param pageValue
 */
function submitFormQueryAjax(form, propertyFormPage, pageValue){

    setValue(propertyFormPage, pageValue);
    retrieveURLPorPost(form.action, form.name, false);
     
}

/**
 * 
 * @param url
 * @param method
 *        GET o POST
 * @param asyncFlag
 *        true o false
 */
function ajaxCall(url, method, asyncFlag, callback) {
	// Do the Ajax call
	var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	req.onreadystatechange = function() {
		if (req.readyState == 4) { // Complete
			if (req.status == 200) { // OK response
				if(typeof callback != 'undefined' && callback != null) {
					callback(req.responseText);
				}
			} else {
				alert("Problem with server response:\n " + req.statusText);
			}
		}
	};
	
	try {
		req.open(method || "GET", url, asyncFlag || true);
		req.send(null);
	} catch (e) {
		alert("Problem Communicating with Server\n"+e);
	}
}

function retrieveURLParameterCompleto(url, llamadaCambio, parametros){
	// Do the Ajax call
	if (window.XMLHttpRequest) { // Non-IE browsers
		req = new XMLHttpRequest();
		//req.onreadystatechange = function(event) { eval(llamadaCambio + '(event,parametros);'); };
		req.onreadystatechange = function(event) { processStateDefined(event, llamadaCambio, parametros); };
		try {
			req.open("GET", url, true); // was get
		} catch (e) {
			alert("Problem Communicating with Server\n" + e);
		}
		req.send(null);
	} else if (window.ActiveXObject) { // IE
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			//req.onreadystatechange = function(event) { eval(llamadaCambio + '(event,parametros);'); };
			req.onreadystatechange = function(event) { processStateDefined(event, llamadaCambio, parametros); };
			req.open("GET", url, true);
			req.send();
		}
	}
}

function processStateDefined(event, llamadaCambio, parametros) {
	if (req.readyState == 4) { // Complete
		if (req.status == 200) { // OK response
			if (debugAjax) {
				alert(document.getElementById('txtDebugAjax'));
				if (document.getElementById('txtDebugAjax') != null) {
					document.getElementById('txtDebugAjax').value = document.getElementById('txtDebugAjax').value + req.responseText;
				} else {
					alert('processStateDefined: respuesta: ' + req.responseText);
				}
			}
 
			// Split the text response into Span elements
			spanElements = splitTextIntoSpan(req.responseText);

			// Use these span elements to update the page
			replaceExistingWithNewHtml(spanElements);

			eval(llamadaCambio + '(event,parametros);');
			
		} else {
			alert("Problem with server response:\n " + req.statusText);
		}
	}
} // processStateDefined