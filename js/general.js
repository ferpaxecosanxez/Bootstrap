	var arrayLinks = null;
	var targetFrameDefault = 'iAreaTrabajo';

/***************** FUNCIONES GENERALES *************************************/
	//Se introduce aquí esta función para que esté definida cuando se llama con el parámetro linksEnabled
	function isObjInArray(array,obj) {
		for (j = 0; j < array.length; j++) {
			if ( array[j] == obj) {
				return true;
			}
		}
		return false;
	}

   function lanzarVentana(pag, width, height, parametros, callback, loadCarga)  {
	   var altura = parseInt(height) + 20 + "px";
	   var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+altura+"px, scrollbars=auto";
	   var valorRetorno = undefined;
	   var nivelVentana = undefined;
	   
	   if (BrowserDetect.browser == "Explorer") {
		   valorRetorno = window.showModalDialog(pag, parametros, "dialogHeight:"+altura+"px; dialogWidth:"+width+"px;status:no");
	   } else {
		   nivelVentana = window.nivelVentana ? window.nivelVentana : (window.opener && window.opener.parentNivelVentana ? window.opener.parentNivelVentana : undefined);
    	 
		   if (typeof(nivelVentana) == "undefined") {
			   window.nivelVentana = "0";
			   window.parentNivelVentana = "1";
		   } else {
			   window.parentNivelVentana = String(eval(window.nivelVentana) + 1);
		   }
    	 
		   var nombreVentana = "win" + window.parentNivelVentana;
		   var ventana = window.open(pag, nombreVentana, "modal=yes, "+args);
		   ventana.callback = callback;
		   ventana.nivelVentana = window.parentNivelVentana;
	   }
	   
	   //Al cerrar la ventana modal, es posible que nos interese mostrar el panel de "Cargando".
	   //Siempre y cuando el valorRetorno sea "OK" (window.returnValue)
	   if ( (valorRetorno != undefined) && (typeof valorRetorno == 'string') && (valorRetorno == 'OK') && (loadCarga != undefined) && (loadCarga == true) ) {
		   muestraCargaComun();
	   }
	   
	   return valorRetorno;
   }

   function lanzarVentanaOpen(pag, width, height, parametros) {
	   var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+height+"px, scrollbars=auto"
	   var izq = (screen.width - width) / 2;
       var arr = (screen.height - height) / 2;

       if(BrowserDetect.browser == "Explorer"){
    	   window.open(pag,parametros,"height="+height+"px,width="+width+"px,scrollbars=NO,left="+izq+",top="+arr)
       }else{
    	   window.open(pag,"win","modal=yes, "+args)
       }
   }
   
   function lanzarVentanaOpenScroll(pag, width, height, parametros) {
		var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+height+"px, scrollbars=auto"
		var izq = (screen.width - width) / 2;
		var arr = (screen.height - height) / 2;
		if(BrowserDetect.browser == "Explorer"){
			window.open(pag,parametros,"height="+height+"px,width="+width+"px,scrollbars=YES,left="+izq+",top="+arr)
		}else{
			window.open(pag,"win","modal=yes, "+args)
		}
   }

   // Lanza una pop-up en este caso escalable escalable
   function lanzarVentanaResizable(pag, width, height, parametros) {
	   var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=yes, width="+width+ "px, height="+height+"px, scrollbars=auto"
	   if(BrowserDetect.browser == "Explorer"){
		   ventana = window.open(pag,"win","modal=yes, "+args)
	   }else{
		   ventana = window.open(pag,"win","modal=yes, "+args)
	   }
	   return ventana
   }
   
   function buscaValores(elemento_id, elemento_cod, elemento_desc, url, callback, winWidth, winHeight){
	   // abre una ventana generica dependiendo de la url que le pasemos y de los id de los objetos de la p?gina
	   var valor = lanzarVentana(url, winWidth==undefined?700:winWidth, winHeight==undefined?510:winHeight, null, callback);
	   
	   if(valor != undefined){
		   setValue(elemento_id, valor[0]);
		   setValue(elemento_cod, valor[1]);
		   setValue(elemento_desc, valor[2]);
	   }
	   return valor;
   }
   
   function buscaValoresArray(array,url, winWidth, winHeight){
	   /**
	    * abre una ventana generica dependiendo de la url que le pasemos y del conjunto de elementos que se esten pasando.
   		La posicion de los elementos en el array debe corresponder con la posicion del valor devuelto por la ventana.
	    */
	   var valor = lanzarVentana(url, winWidth==undefined?700:winWidth, winHeight==undefined?510:winHeight, null);
	   if(valor != undefined){
		   for(var i=0;i<array.length;i++){
			   if(array[i]!=""){
				   setValue(array[i], valor[i]);
			   }
		   }
	   }
   }
   
   function buscaValoresPForm(elemento_id, elemento_cod, elemento_desc,url,pForm, winWidth, winHeight){
  /**
   abre una ventana generica dependiendo de la url que le pasemos y de los id de los objetos
   de la p?gina
  */
	   var valor = lanzarVentana(url, winWidth==undefined?700:winWidth, winHeight==undefined?510:winHeight, null);
	   if(valor != undefined){
		   setValuePForm(elemento_id, valor[0], pForm);
		   setValuePForm(elemento_cod, valor[1], pForm);
		   setValuePForm(elemento_desc, valor[2], pForm);
	   }
   }

   function buscaValoresArrayPForm(array,url,pForm, winWidth, winHeight){
  /**
   abre una ventana generica dependiendo de la url que le pasemos y del conjunto de elementos que se esten pasando.
   La posicion de los elementos en el array debe corresponder con la posicion del valor devuelto por la ventana.
  */
	   var valor = lanzarVentana(url, winWidth==undefined?700:winWidth, winHeight==undefined?510:winHeight, null);
	   if(valor != undefined){
		   for(var i=0;i<array.length;i++){
			   if(array[i]!="")
				   setValuePForm(array[i], valor[i], pForm);
		   }
	   }
   }

  /**
   * Invoca a la funcion de callback desde una ventana popup (argumento "ventana").
   * Para cada ventana, la propiedad callback contiene el codigo que se ha de ejecutar antes de que se devuelva el control a la padre y se cierre la ventana actual;
   * la propiedad parentCallback contiene el codigo que se le enviará desde la ventana actual a la ventana popup, pero que se almacena en la ventana padre por si un
   * refresco de la ventana hija hace que pierda el callback enviado.
   */
  function invocarCallback(ventana, valor) {
      var callback = (ventana.callback) ? ventana.callback : ((ventana.opener && ventana.opener.parentCallback) ? ventana.opener.parentCallback : undefined);
      if(callback) {
    	  callback(valor);
      }
  }

  function openWindow(pag, width, height)  {
	  var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+height+"px, scrollbars=yes";
	  ventana = window.open(pag,"win", args);
  }

  function trim(s) {
	  return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
  }

  function getParentPage(pPage) {
	  parent.document.location = pPage;
  }
  
  function getPage(pPage, targetFrame, load) {
	  if ((null!=load && load) || (undefined == load)){
		  muestraCargaComun();
	  }
	  
	  if(targetFrame == null){
          document.location = pPage;
      }else{
    	 if ((null!=load && load != false) || (undefined == load)){
    		 muestraCargaComun();
    	 }
    	 if (undefined == targetFrame) {
    		 targetFrame = targetFrameDefault;
    	 }
         top.window.frames[targetFrame].document.location = pPage; 
      }
   }

   function getPagina(pPage, targetFrame, mensaje) {
      if(targetFrame == null){
         document.location = pPage;
      }else{
         top.window.frames[targetFrame].document.location = pPage;
      }
      parent.writeSituation(mensaje, pPage, true);
   }

   function setValue(element, value) {
	  if (value != "undefined" && value != null) {
		  value = trim(value);
		  if(document.getElementById(element) != undefined){
			  document.getElementById(element).value = value;
			  if (document.getElementById(element).defaultValue) {
				  document.getElementById(element).defaultValue = value; 
			  }
		  }
	  }
   }
   
   function setValueWithoutBlanks(element, value) {
	  if (value != "undefined" && value != null) {
		  value = trim(value);
		  value = value.replace(/\s/g, "");
		  if(jQuery("input[name='" + element + "']")){
			  jQuery("input[name='" + element + "']").val(value);
		  }
	  }
   }
   
   
   function setAttribute(element, attribute, value) {
		  if (value != "undefined" && value != null) {
			  value = trim(value);
			  if(document.getElementById(element) != undefined){
				  document.getElementById(element).setAttribute(attribute, value);
			  }
		  }
   }

   function getValue(element) {
	   return document.getElementById(element).value;
   }

   function getValueByName(tipo, element) {
	   return jQuery(tipo+"[name='"+element+"']").val();
   }
   
   function setValuePForm(element, value, pForm) {
	   if(pForm==null || pForm=="") pForm = '0';
	   if (value != "undefined" && value != null) {
		   value = trim(value);
		   document.forms[pForm].elements[element].value = value;
	   }
   }

   function getValuePForm(element, pForm) {
	   if(pForm==null || pForm=="") pForm = '0';
	   		return document.forms[pForm].elements[element].value;
   }

   function setValuePestana(element, value) {
	   if(value!="undefined" && value!=null)  {
		   value = trim(value);
		   window.frames['iTabContent'].document.getElementById(element).value = value;
	   }
   }

   // Ejecuta la funci?n de validaci?n del formulario
   function validaForm(pForm,pFuncValida,pTarget) {
	   validado = true;
	   if (pFuncValida != null) {
		   try {
			   validado = pFuncValida(pForm);
		   } catch(e) {
			   alert("excepci\u00f3n en el script. Error: " + e.name + ". Error mensaje: " + e.message);
			   alert('error validando el formulario');
			   validado = false;
		   }
	   }
	   if (validado) {
		   // si se establece un target de carga del formulario
		   setTargetForm(pForm, pTarget);
	   }
	   return validado;
   }
   
  function setTargetForm (pForm, pTarget) {
	  if (pTarget != null) {
		   // Error detectado el 20181102
		   // en vez de cargar en el iframe
		   // se recarga la pantalla al completo
		   pForm.target = pTarget
	   }
  } 

  function validaFormMultiPart(iframeName){
	  validado = true;

      try{
          validado = document.frames[iframeName].submitFormMultiPart();
      }catch(e){
          alert("excepci\u00f3n en el script. Error: " + e.name + ". Error mensaje: " + e.message);
          alert('error validando el formulario');
          validado = false;
      }
      return validado;
  }

  function rowOver(pObj, pClase)  {
	  pObj.className = pClase;
  }

  function listadoOver(pObj, pColor)  {
	  pObj.bgColor = pColor;
  }

  function comprobarCampos(campo,indice,listaCampos){
      var booleana = false;
      for(var i=0;i<indice;i++){
    	  if(listaCampos[i]==campo){
    		  booleana = true;
    		  break;
    	  }
      }
      return booleana;
  }

  function limpiar(form,camposNoTocar)  {
	  
	  if(form != undefined && form.elements != undefined){
		  var campos = form.elements;
		  var camposLength;
		  try{
			  camposLength = camposNoTocar.length;
		  }catch(e){
			  var camposNoTocar;
		  }
	      for(var i= 0;i<campos.length; i++){
	    	  switch(campos[i].type){
	    	  
		    	  case "text":
		    		  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].value = "";
		              break;
		
		          case "textarea":
		        	  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].value = "";
		              break;
		
		          case "checkbox":
		              if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].checked = false;
		              break;
		          
		          case "select-one":
		               if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		            	   campos[i].selectedIndex = 0;
		               break;
		          
		          case "hidden":
		               if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		            	   campos[i].value = "";
		               break;
		               
		          case "radio":
		      		  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		      			  campos[i].checked = false;
		      		  break;
	    	  }
	      }
	      // Limpiar clases "is-filled".
	      cleanForm();
	  }
  }
  
  /*
   * Funcion de envio del formulario.
   * Devuelve true si se ha enviado correctamente o false en otro caso
   */
  function submitForm(form, validateFunction, target, swLavadora) {
      //Comprobamos si el formulario tiene un spam para pintar los errores. 
      //Si es así, lo limpiamos antes de hacer el submit para eliminar errores 
      //anteriores al submit 
      if (form && form.document && form.document.getElementById('erroresAjax')) {
          form.document.getElementById('erroresAjax').innerHTML = "";
      }
	  var validado = true;
	  if (validateFunction != null) {
		  try {
			  validado = validaForm(form,validateFunction,target);
		  } catch(e) {
			  alert("excepci\u00f3n en el script. Error: " + e.name + ". Error mensage: " + e.message);
			  alert('error validando el formulario');
			  validado = false;
		  }
	  }
	  if (validado) {
		  setTargetForm(form, target);
		  form.submit();
		  if ((null != target) && (undefined != target) && ( (null == swLavadora) || (undefined == swLavadora) || (swLavadora == true) )) {
			  muestraCargaComun();
		  }
	  }
	  return validado;
  }
  
  /*
   * Funcion de envio del formulario con lavadora.
   * Devuelve true si se ha enviado correctamente o false en otro caso
   */
  function submitFormLavadora(form, validateFunction, target) {
	  try {
		  validado = validaForm(form,validateFunction,target);
	  } catch(e) {
		  alert("excepci\u00f3n en el script. Error: " + e.name + ". Error mensage: " + e.message);
		  alert('error validando el formulario');
		  validado = false;
	  }
	  if (validado) {
		  muestraCarga();
		  form.submit();
	  }
	  return validado;
  }

  function submitFormMsg (form,validateFunction,target, msg){
	  var old_target = form.target;
      try{
    	  validado = validaForm(form,validateFunction,target);
      }catch(e){
    	  alert('error validando el formulario');
    	  validado = false;
      }
      if ((validado)&&(confirm(msg))) form.submit();
      else { form.target = old_target; validado = false; }
      return validado;
  }
  
  function submitFormMsgLavadora(form, validateFunction, target, msg, load) {
	  	  	  var old_target = form.target;
	  	        try{
	  	      	  validado = validaForm(form,validateFunction,target);
	  	        }catch(e){
	  	      	  alert('error validando el formulario');
	  	      	  validado = false;
	  	        }
	  	        if ((validado)&&(confirm(msg))) {
	  	  		  if ( load !== undefined && load !== null && load ) {
	  	  			  muestraCargaComun();
	  	  		  }
	  	      	  
	  	      	  form.submit();
	  	        } else { form.target = old_target; validado = false; }
	  	        return validado;
	      }
   
  function submitFormActionMsg (form,action,validateFunction,target, msg, cancelAction){
      validado = true;
	  if(form != undefined){
	      var old_target = form.target;
	      if (validateFunction != null){
	    	  try{
	    		  validado = validaForm(form,validateFunction,target);
	    	  }catch(e){
	    		  alert('error validando el formulario');
	    		  validado = false;
	    	  }
	      }
	      form.action = action;
	      if (target != null){
	    	  form.target = target;
	      }
	      if (msg != null){
	    	  if ((validado)&&(confirm(msg))) form.submit();
	    	  else {
	    		  if(cancelAction != undefined){
	    			  form.action = cancelAction;
	    			  form.submit();
	    		  }
	    		  form.target = old_target;
    			  validado = false;
	    	  }
	      }else{
	    	  if (validado)form.submit();
	      }
	  }
	  return validado;
  }
  
  function submitFormActionMsgLavadora(form, action, validateFunction, target, msg, cancelAction, load){
	        validado = true;
	  	  if(form != undefined){
	  	      var old_target = form.target;
	  	      if (validateFunction != null){
	  	    	  try{
	  	    		  validado = validaForm(form,validateFunction,target);
	  	    	  }catch(e){
	  	    		  alert('error validando el formulario');
	  	    		  validado = false;
	  	    	  }
	  	      }
	  	      form.action = action;
	  	      if (target != null){
	  	    	  form.target = target;
	  	      }
	  	      if (msg != null) {
	  	    	  if ((validado)&&(confirm(msg))) {
	  	    		  if ( load !== undefined && load !== null && load ) {
	  	    			  muestraCargaComun();
	  	    		  }
	  	    		  
	  	    		  form.submit();
	  	    	  } else {
	  	    		  if(cancelAction != undefined && cancelAction != null){
	  	    			  form.action = cancelAction;
	  
	  	    			  if ( load !== undefined && load !== null && load ) {
	  	    				  muestraCargaComun();
	  	    			  }
	  	    			  
	  	    			  form.submit();
	  	    		  }
	  	    		  form.target = old_target;
	      			  validado = false;
	  	    	  }
	  	      }else{
	  	    	  if (validado) {
	  	    		  if ( load !== undefined && load !== null && load ) {
	  	    			  muestraCargaComun();
	  	    		  }
	  	    		  
	  	    		  form.submit();
	  	    	  }
	  	      }
	  	  }
	  	  return validado;
	    }
  
  function submitFormMsgIframe(form,action,target,messaje,url) {
      if (selectTab=="tab0_DAT") {
         submitFormMsg(form,action,target,messaje);
      }else{
         submitFormActionMsg(form,url,null,target, messaje);
      }
  }
  
  function submitFormQuery(form,validateFunction,target,propertyFormPage,pageValue,load){
	  setValue(propertyFormPage,pageValue);
	  submitForm(form,validateFunction,target,load);
	  muestraCargaComun();
  }

  function cancelar(msg, url, target) {
	  if(msg == null)   {
		  getPage(url, target);
		  return;
	  } else {
		  if (confirm(msg)) {
			  getPage(url, target);
		  }
	  }
  }

  function cambiarPagina (msg, url, target) {
      if (confirm(msg)) {
         getPage(url, target);
      }
  }
  
  function cambiarEstado (msg, url, target) {
      if (confirm(msg)) {
         getPage(url, target);
      }
  }

  function handleErrors(pBool) {
	  if(parseInt(document.getElementById("cLayOut").offsetHeight) > 22) {
		  if(pBool) {
			  with (document.getElementById("icoError")) {
				  src = icoMaximizarE.src;
				  alt = "Maximizar";
				  onclick = function() {handleErrors(false)};
				  document.getElementById("cError").className = "errorMinimizada";
			  }
		  } else {
			  with (document.getElementById("icoError")) {
				  src = icoMinimizarE.src;
				  alt = "Minimizar";
				  onclick = function() {handleErrors(true)};
			  }
			  document.getElementById("cError").className = "error";
		  }
	  }
  }

  function handleMens(pBool) {
	  if(pBool) {
		  with (document.getElementById("icoMens")) {
			  src = icoMaximizarA.src;
			  alt = "Maximizar";
			  onclick = function() {handleMens(false)};
			  document.getElementById("cMens").className = "avisoMinimizada";
		  }
	  } else {
		  with (document.getElementById("icoMens")) {
			  src = icoMinimizarA.src;
			  alt = "Minimizar";
			  onclick = function() {handleMens(true)};
		  }
		  document.getElementById("cMens").className = "aviso";
	  }
  }

  function mensajes(arrayDatos,msg) {
	  var i=0;
	  for (var el in arrayDatos) {
		  var regExp = new RegExp();
		  regExp = ("{"+i+"}");
		  msg=msg.replace("["+i+"]",arrayDatos[i]);
		  i++;
	  }
	  return msg;
  }
  
  // Para que Firefox pueda funcionar como Internet Explorer
  // almacena los eventos cuando se realiza click sobre un elemento
  function guardarEvento(evento) {
     if(window.event == undefined)
        window.evento = evento;
  }
  
//Convierte una cifra en formato americano a formato europeo.
Number.prototype.formatMoney = function(c, d, t){
  	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
  	i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
  	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
  	+ (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
  
/*****
Funcion utilizada para formatear numeros cuando llamamos al evento onkeyup (al escribir en un text)
objeto    ---> el objeto de formulario
tecCodigo ---> codigo de la tecla pulsada
cadena     ---> cadena a formatear
decCar    ---> caracter separador de los decimales
numDec    ---> numero de decimales
milCar    ---> caracter separador para los miles
numTotal  ---> numero total de caracteres (sin incluir caracteres separadores)
****/
function formatNumber(objeto,tecCodigo,cadena,decCar,numDec,milCar,numTotal){

   //si es un cursor,supr,insert ---> no hacemos nada (la tecla hace accion normal)
   if(validaKeyCodesNumericos(tecCodigo,null))
      return;

   //si es numerico ---> formateamos
   if(validaKeyCodesNumericos(tecCodigo,true))
   {
      objeto.value=formateoDecimales(cadena,decCar,numDec,milCar,numTotal);
   }
   else{
      //si es tecla especial devolvemos lo mismo q habia escrito
      if(validaKeyCodesNumericos(tecCodigo,false)){
         objeto.value=cadena;
      }
      else{
         //si borramos caracteres ---> formateamos la salida
         if(tecCodigo=="8" || tecCodigo=="0"){
            objeto.value=formateoDecimales(cadena,decCar,numDec,milCar,numTotal);
         }
         else{//si metemos otro caracter lo eliminamos
            objeto.value=cadena.toUpperCase().replace(String.fromCharCode(tecCodigo),"");
         }
      }
   }
}


/**********
INICIO Funciones Nuevas obtenidas de Reaseguro para GIMSInputNumerico
***********/

function formatoCorrecto2(value){

   if(value.charAt(0)==',')
      value = "0" + value;

   return value;


 }


function compruebaTamano (valorCadena, TamEnteros, TamDecimales, carDecimal)
 {

   var signo = '';//si viene signo '-', lo guardaremos aqui y se lo quitemos al 'valorCadena'
   //Si el numero empieza por '-' y no es SOLO '-'
   if(valorCadena.charAt(0) == '-' && valorCadena.length > 1){

      signo = '-';//guardamos el signo
      //se lo quitamos al numero
      valorCadena = valorCadena.substring(1,valorCadena.Length);

   }

    var ok = true;
    var texto="El dato introducido tiene: ";
    var texto2 ="";

    var cadenaNumerica = String(valorCadena).replace(/[^\d,]*/gi, "");
    var intDec = cadenaNumerica.indexOf(carDecimal);
    var cadenaEnera="";
    var cadenaDecimal="";
   if (intDec!=-1)
   {
      cadenaEnera = cadenaNumerica.substring(0,intDec);
      cadenaDecimal = cadenaNumerica.substring(intDec+1, cadenaNumerica.length);
   }
   else
   {
      cadenaEnera = cadenaNumerica;
   }
    if (!((TamEnteros==0)&& (cadenaEnera.length=1) && (cadenaEnera=="0"))){
        if  (cadenaEnera.length>TamEnteros) texto2="\n   - La parte entera un tama\u00f1o superior a "+ TamEnteros;
        if  (cadenaEnera.length>TamEnteros && TamDecimales==0) texto2="\n   - Un tama\u00f1o superior a "+ TamEnteros +" posiciones"; 
    }
   if  (cadenaDecimal.length>TamDecimales) texto2+="\n   - La parte decimal un tama\u00f1o superior a "+ TamDecimales;
   if (texto2 !="")
     {
     alert (texto+texto2);
     ok=false;
     }
   return ok;
 }

function mascaraNumericaSignoNegativo(code)
{
      // Para que Firefox pueda funcionar como Internet Explorer
      var tecla;
      var teclaEspecial;
      if(window.event != undefined) {
 	     tecla = event.keyCode;
      } else {
 	     if(window.evento) {
 		     tecla = evento.charCode;
 		     teclaEspecial = evento.keyCode;
 	     }
      }
      
      // punto, coma y signo -
      arr = new Array("46", "44", "45");
      for(var i=0;i<arr.length;i++) {
         if(arr[i] == tecla) {
                return;
         }
      }
      
      // retroceso, suprimir, inicio, fin, izquieda, derecha
      arr = new Array("8", "46", "36", "35", "37", "39");
      for(var i=0;i<arr.length;i++) {
         if(arr[i] == teclaEspecial) {
                return;
         }
      }
       
       //si no es numerico
       if ( isNaN( parseInt( String.fromCharCode( tecla ) ) ) ) {
          if(window.event != undefined) {
        	  event.returnValue = false;
          } else {
        	  evento.preventDefault();
          }
       }
}

function mascaraNumerica(code)
{
      //coma y el punto

       arr = new Array("46","44");
         for(var i=0;i<arr.length;i++)
         {
         if(arr[i]==event.keyCode)
             {
                return ;
            }
       }
       //si no es num?rico
       if ( isNaN( parseInt( String.fromCharCode( event.keyCode ) ) ) )
       {
        event.returnValue = false;
        }
}

/**********
FIN Funciones Nuevas obtenidas de Reaseguro para GIMSInputNumerico
***********/





/*****
Funcion utilizada para validar que la tecla pulsada corresponda a un numero o un caracter separador
Los caracteres validados son todos los numericos, el punto, la coma y los numeros del teclado numerico
codigo ---> codigo de la tecla pulsada
bNumero---> booleano de control para validar teclas numericas o teclas especiales
****/
function validaKeyCodesNumericos(codigo,bNumero)
{
   if(bNumero==null){//cursores,insert,supr,inicio,fin
      arr = new Array("35","36","37","38","39","40","45","46");
   }
   else{
      if(bNumero){//numericos(teclado normal y numerico), punto y coma
         arr = new Array("48","49","50","51","52","53","54","55","56","57","49","50","188","190","96","97","98","99","100","101","102","103","104","105","106");
      }
      else{//teclas especiales(crtl,alt,shift...)
         arr = new Array("16","17","18","20","27","33","34","91","92","93");
      }
   }

   for(var i=0;i<arr.length;i++)
   {
      if(arr[i]==codigo)
      {
         return true;
      }
   }

   return false;
}


function quitaCerosIzq (texto) {
   while ((texto.charAt(0) == '0') && (texto.length>1) ){
      texto = texto.substring(1);
   }
   return texto;
 }
 
function ponCerosIzq (texto, nCeros) {
	var ceros = 10;
	if (nCeros != null)
		ceros = nCeros;
	while ((texto.length<ceros) && (texto.length>=1) ){
      texto = "0".concat(texto);
   }
   return texto;
 }
 

 function formateoMiles(valorCadena,cadenaMiles)  {
   var valorCadena = String(valorCadena).replace(/[^-\d]*/gi, "");
   var cadenaF="";
  var variador = 0;

  if (valorCadena.indexOf("-") == 0) {
    variador = 1;
  }

   if(valorCadena!="")
   {
      valorCadena = parseFloat(valorCadena)+"";
   }
   var longitud=valorCadena.length - variador;

   if(longitud>3)
   {
      var punt=parseInt(longitud/3);
      var cont=0;

      while(cont!=punt)
      {
         longitud=valorCadena.length;
         cadenaSF=valorCadena.substring(0,longitud-3);
         if(cadenaF!="")
         {
            cadenaF=cadenaMiles+valorCadena.substring(longitud-3)+cadenaF;
         }
         else
         {
            cadenaF=cadenaMiles+valorCadena.substring(longitud-3);
         }

         valorCadena=cadenaSF;
         cont++;
      }
   }

   if(longitud%3==0 && cadenaMiles !== "")
   {
      cadenaF=cadenaF.substring(1);
   }

   return valorCadena+cadenaF;
}

function formateoDecimales(valorCadena,cadenaDecimal,digitosDecimal,cadenaMiles,digitosMiles)
  {
   var cadenaNumerica = String(valorCadena).replace(/[^-\d,]*/gi, "");
   if (cadenaNumerica.lastIndexOf(cadenaDecimal)!=cadenaNumerica.indexOf(cadenaDecimal))
   {
      return (formateoDecimales(cadenaNumerica.substring(0,cadenaNumerica.lastIndexOf(cadenaDecimal)),cadenaDecimal,digitosDecimal,cadenaMiles,digitosMiles));
   }

   if ((cadenaNumerica.indexOf(cadenaDecimal)!=-1) && (digitosDecimal!=0))
   {
      var valorCadena1 = cadenaNumerica.substring(cadenaNumerica.indexOf(cadenaDecimal)+1);
      var valorCadena3 = cadenaNumerica.substring(0,cadenaNumerica.indexOf(cadenaDecimal));
      if (valorCadena1.length>digitosDecimal)
      {
         valorCadena1= valorCadena1.substring(0,digitosDecimal);
      }

      if (valorCadena3.length>digitosMiles)
      {
         valorCadena3= valorCadena3.substring(0,digitosMiles);
      }
      if (valorCadena3.indexOf("-") == 0 && parseInt(valorCadena3) == 0) // caso -0
      {
    	  return "-"+formateoMiles(valorCadena3,cadenaMiles)+cadenaDecimal+valorCadena1;
      }
      return formateoMiles(valorCadena3,cadenaMiles)+cadenaDecimal+valorCadena1;
   }
   else
   {
      if (cadenaNumerica.length>digitosMiles)
      {
         cadenaNumerica= cadenaNumerica.substring(0,digitosMiles);
      }
      return formateoMiles(cadenaNumerica,cadenaMiles);
   }
  }

function mascaraDecimal(valor, cadenaDecimal, mask) {
   var intDec = valor.indexOf(cadenaDecimal);
      var cadena = '';

      for (var i = 0; i < mask; i++) {
         cadena += "0";
    }

   if (valor != "") {
      if (intDec > 0) {
         var valorEntero = valor.substring(0,intDec);
         var   valorAux = valor.substring(intDec+1);
         var maskLength = mask;
         var valorAuxLength = valorAux.length;
         var nCeros = maskLength - valorAuxLength;
         var sAux = "";

         for(i = 0; i < nCeros; i++) {
            sAux += "0";
         }

         return valorEntero + cadenaDecimal + valorAux + sAux;
      	}else if(intDec==0){//Este caso significa que la cadena que tenemos es ",000", por ejemplo
      		return valor;
	    }
      	else {
         if(cadena=="")
         {
            return valor;
         }
         return valor+cadenaDecimal+cadena;
      }
   }

   return "";
}


function convertirMascaraDecimal(valor, cadenaDecimalEntra, cadenaDecimalSale, mask) {
   var intDec = valor.indexOf(cadenaDecimalEntra);
      var cadena = '';

      for (var i = 0; i < mask; i++) {
         cadena += "0";
    }

   if (valor != "") {
      if (intDec > 0) {
         var valorEntero = valor.substring(0,intDec);
         var   valorAux = trim(valor.substring(intDec+1));
         var maskLength = mask;
         var valorAuxLength = valorAux.length;
         var nCeros = maskLength - valorAuxLength;
         var sAux = "";

         for(i = 0; i < nCeros; i++) {
         	if(i == 0)
         		sAux = "0";
         	else
            	sAux += "0";
         }

         return valorEntero + cadenaDecimalSale + valorAux + sAux;
      	}else if(intDec==0){//Este caso significa que la cadena que tenemos es ",000", por ejemplo
      		return valor;
	    }
      	else {
         if(cadena=="")
         {
            return valor;
         }
         return valor+cadenaDecimalSale+cadena;
      }
   }

   return "";
}


/* enlaza dos select entre si */
function initLinkedSelect(from,to) {
  /* array para almacenar la tripleta de valores texto, valor, id */
  var options = new Array();
  var elementoSel = null;
  for (var i=0; i < to.options.length; i++) {
    /* salvamos el texto, valor e id del combo destino */
    options[i] = new Array(to.options[i].text,to.options[i].value,to.options[i].id,to.options[i].selected);
  }
  /* Cuando la selecci?n del combo origen cambia... */
  from.onchange = function() {
    /* valor de filtrado del combo origen*/
    var fromCode = from.options[from.selectedIndex].value;
    /* eliminamos las opciones originales del combo */
    to.options.length = 0;
    /*a?adimos un option vacio*/
    to.options[to.options.length] = new Option('','');
    /* recorremos las opciones anteriormente salvadas...desde el segundo
    elemento puesto que ya existe la primera */

    for (i = 1; i < options.length; i++) {
      /* si el id del combo destino es el mismo que el valor del combo origen...*/
      if (options[i][2] == fromCode) {
        /* a?ado la opcion al combo destino */
        option          = new Option();

        option.text     = options[i][0];
        option.value    = options[i][1];
        option.id       = options[i][2];
        option.selected = options[i][3];
        /*hay que hacer esto por que parece que sino no funciona correctamente */
        if(option.selected){
         elementoSel = to.options.length;
        }

        to.options[to.options.length] = option;
      }
      if(elementoSel != null){
         to.selectedIndex = elementoSel
      }
    }
    if(null != to.onchange ){
        if(to.selectedIndex==-1)
         to.selectedIndex=0;
      to.onchange();
    }
    try  {
      //funcion para escribir sobre las p?ginas en las que se necesite m?s c?digo a ejecutar en el "onchange" del combo
       extendOnchange();
     } catch(e)   {
       return
     }
  }
  /* actualizamos el combo destino */
  from.onchange();
}

/* enlaza dos select entre si */
function initLinkedSelectFunction(from,to,func) {
  /* array para almacenar la tripleta de valores texto, valor, id */
  var options = new Array();
  var elementoSel = null;
  for (var i=0; i < to.options.length; i++) {
    /* salvamos el texto, valor e id del combo destino */
    options[i] = new Array(to.options[i].text,to.options[i].value,to.options[i].id,to.options[i].selected);
  }
  /* Cuando la selecci?n del combo origen cambia... */
  from.onchange = function() {
    /* valor de filtrado del combo origen*/
    var fromCode = from.options[from.selectedIndex].value;
    
    if (func != null){
    	func(fromCode);
    }
    
    /* eliminamos las opciones originales del combo */
    to.options.length = 0;
    /*a?adimos un option vacio*/
    to.options[to.options.length] = new Option('','');
    /* recorremos las opciones anteriormente salvadas...desde el segundo
    elemento puesto que ya existe la primera */

    for (i = 0; i < options.length; i++) {
      /* si el id del combo destino es el mismo que el valor del combo origen...*/
      if (options[i][2] == fromCode) {
        /* a?ado la opcion al combo destino */
        option          = new Option();

        option.text     = options[i][0];
        option.value    = options[i][1];
        option.id       = options[i][2];
        option.selected = options[i][3];
        /*hay que hacer esto por que parece que sino no funciona correctamente */
        to.options[to.options.length] = option;
      }
      
    }
    if(to.onchange)
    	to.onchange();
  
  }
  /* actualizamos el combo destino */
  from.onchange();
}

/* enlaza un select con varios. to es un array de los select que se quieren actualizar */

function initLinkedMultiSelect(from,to) {

  var destinies = new Array();

  for(var j=0;j < to.length;j++){
  /* array para almacenar la tripleta de valores texto, valor, id */

        var options = new Array();
        var elementoSel = null;

        for (var i=0; i < to[j].options.length; i++) {
          /* salvamos el texto, valor e id del combo destino */
          options[i] = new Array(to[j].options[i].text,to[j].options[i].value,to[j].options[i].id,to[j].options[i].selected);
        }
        destinies[j] = options;
  }

  /* Cuando la selecci?n del combo origen cambia... */

  from.onchange = function() {
    /* valor de filtrado del combo origen*/
    var fromCode = from.options[from.selectedIndex].value;
    for(j=0;j < to.length;j++){
          /* eliminamos las opciones originales de los combos destino */
      to[j].options.length = 0;
          /*a?adimos un option vacio*/
      to[j].options[to[j].options.length] = new Option('','');
    }

    /* recorremos las opciones anteriormente salvadas...desde el segundo
    elemento puesto que ya existe la primera */

    for (var h=0; h < destinies.length; h++){
      var options = destinies[h];
          for (i = 1; i < options.length; i++) {
            /* si el id del combo destino es el mismo que el valor del combo origen...*/
            if (options[i][2] == fromCode) {
              /* a?ado la opcion al combo destino */
              option          = new Option();
              option.text     = options[i][0];
              option.value    = options[i][1];
              option.id       = options[i][2];
              option.selected = options[i][3];
              /*hay que hacer esto por que parece que sino no funciona correctamente */
              if(option.selected){
                  elementoSel = to[h].options.length;
              }

              to[h].options[to[h].options.length] = option;
            }

            if(elementoSel != null){
                  to[h].selectedIndex = elementoSel
            }
          }

          if(null != to[h].onchange ){
              if(to[h].selectedIndex==-1)
                  to[h].selectedIndex=0;
            to[h].onchange();
          }
       }
  }
  /* actualizamos el combo destino */
  from.onchange();
}

function initLinkedMultiSelectCaracteristica(from,to) {

	  if (from.onchange==undefined || from.onchange==null || from.onchange==''){
		  var destinies = new Array();
		  
		  for(var j=0;j < to.length;j++){
		  /* array para almacenar la tripleta de valores texto, valor, id */
	
		        var options = new Array();
		        var elementoSel = null;
	
		        for (var i=0; i < to[j].options.length; i++) {
		          /* salvamos el texto, valor e id del combo destino */
		          options[i] = new Array(
		        		  			to[j].options[i].text,
		        		  			to[j].options[i].value,
		        		  			to[j].options[i].id,
		        		  			to[j].options[i].selected,
		        		  			to[j].options[i].getAttribute('idElementoTabla'),
		        		  			to[j].options[i].getAttribute('idElementoTablaFiltro'));
		        }
		        destinies[j] = options;
		  }

	  	/* Cuando la selecci?n del combo origen cambia... */
		  from.onchange = function() {
		    /* valor de filtrado del combo origen*/
		    var fromIdElementoTabla = from.options[from.selectedIndex].getAttribute('idElementoTabla');
		    for(j=0;j < to.length;j++){
		          /* eliminamos las opciones originales de los combos destino */
		      to[j].options.length = 0;
		          /*a?adimos un option vacio*/
		      to[j].options[to[j].options.length] = new Option('','');
		    }
	
		    /* recorremos las opciones anteriormente salvadas...desde el segundo
		    elemento puesto que ya existe la primera */
		    for (var h=0; h < destinies.length; h++){
		      var options = destinies[h];
		          for (i = 1; i < options.length; i++) {
		            /* si el id del combo destino es el mismo que el valor del combo origen...*/
		            if (options[i][5] == fromIdElementoTabla) {
		              /* a?ado la opcion al combo destino */
		              option          = new Option();
		              option.text     = options[i][0];
		              option.value    = options[i][1];
		              option.id       = options[i][2];
		              option.selected = options[i][3];
		              option.setAttribute('idElementoTabla', options[i][4]);
		              option.setAttribute('idElementoTablaFiltro', options[i][5]);
		              /*hay que hacer esto por que parece que sino no funciona correctamente */
		              if(option.selected){
		                  elementoSel = to[h].options.length;
		              }
	
		              to[h].options[to[h].options.length] = option;
		            }
	
		            if(elementoSel != null){
		                  to[h].selectedIndex = elementoSel
		            }
		          }
	
		          if(null != to[h].onchange ){
		              if(to[h].selectedIndex==-1)
		                  to[h].selectedIndex=0;
		            to[h].onchange();
		          }
		       }
		  }
		  /* actualizamos el combo destino */
		  from.onchange();

	  }
	}



/***************** FUNCION formato de FECHA ******************************

	/*
	 * Esta funcion va aplicando el formato de fecha con el numero de digitos
	 * de dias, mes y anyo, y el separador q se le pasa
	 */
	function formatoFecha (campo,digDia,digMes,digAno,separador) {
		// longitud de la cadena
		var longi = campo.length;
		// ultimo caracter introducido
		var ultimo = campo.charAt(longi-1);
		var digiMes = digDia+digMes+1;
		var digiTodo = digDia+digMes+digAno+2;
		var regExp = new RegExp ("^([0-9])$");
		var numero=false;      
     
		if (event.keyCode == 9 && longi > 0) {  

			return null;
		}

		if ((event.keyCode>=48 && event.keyCode<=57) | (event.keyCode>=96 && event.keyCode<=105)) {
			numero = true;
		}	  

		if (regExp.exec(ultimo)&& numero && event.keyCode!=8 && event.keyCode!=46) {
			// Si solo se ha ingresado el dia
			if(longi == 2) {
				var dia  =  parseInt(campo.substring(0,2),10);
				if (dia > 31 || dia < 0) {
					alert("El d\u00eda ha sido ingresado incorrectamente");
				} else {
					campo += separador;
					return campo;
				}
			
			// Si solo se ha ingresado el mes
			}else if(longi == 5) {
				var mes  =  parseInt(campo.substring(3,5),10);
				if(mes > 12 || mes == 0){
					alert("El mes ha sido ingresado incorrectamente");
				} else {
					campo += separador;
					return campo;
				}
			}
		} else if ((ultimo == separador) && (longi!=(digDia+1)) && (longi!=(digiMes+1))) {
			// se ha introducido el separador pero no dd le corresponde
			campo = borraUltimo(campo);
			return campo;
		} else if ((ultimo!=separador) && (event.keyCode!=8)) {
		
			// se ha introducido otra cosa q no es ni el separador ni un num ni tecla borrado o tabulador   
			if(!regExp.exec(ultimo)){
				campo = borraUltimo(campo);
				return campo;
			}

			if (campo.length==digDia || campo.length==digiMes) {
				campo+=separador;
			}
			return campo;
		} else {
			
			return campo;
		}
	}

	// Genera un objeto javascript Date a partir de una cadena de formato dd/MM/yyyy
	function fechaES2Date(fechaES) {
		var campos = fechaES.split("/");
		return new Date(campos[2], parseInt(campos[1]) - 1, campos[0]);
	}

	// Genera una cadena de formato dd/MM/yyyy a partir de un objeto javascript Date 
	function date2FechaES(fecha) {
		return fecha.getDate().toString() + "/" + (fecha.getMonth() + 1).toString() + "/" + fecha.getFullYear().toString();
	}

	// A partir de una fecha genera una cadena con formato yyyy-MM-dd
	function date2FechaISO(fecha) {
		return fecha.getFullYear().toString() + "-" + fecha.getMonth().toString() + "-" + fecha.getDate().toString();
	}

	// A partir de una cadena con formato yyyy-MM-dd genera una fecha 
	function fechaISO2Date(fechaISO) {
		var campos = fechaISO.split("-");
		return new Date(campos[0], campos[1], campos[2]);
	}

	function borraUltimo (campo) {
		campo=campo.substring(0,campo.length-1);
		return (campo);
	}

	/*****************************************************************
	 	Funciones de Validación de Fechas
	 ******************************************************************/
	//validar que el formato de una fecha sea válido (mm/dd/aaaa)
	function esFechaValida(fecha){
		if (fecha != undefined && fecha != "" ) {
			if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
				alert("formato de fecha no válido (dd/mm/aaaa)");
				return false;
			}

			var dia  =  parseInt(fecha.substring(0,2),10);
			var mes  =  parseInt(fecha.substring(3,5),10);
			var anio =  parseInt(fecha.substring(6),10);

			if(anio > 2100 || anio<1900){
				alert('El a\u00f1o est\u00E1 fuera del rango establecido por \u00e9Tica');
				return false;
			}

			switch(mes){
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
				numDias=31;
				break;
			case 4: case 6: case 9: case 11:
				numDias=30;
				break;
			case 2:
				if (comprobarSiBisisesto(anio)){ numDias=29; }else{ numDias=28; };
				break;
			default:
				alert("El mes ha sido ingresado incorrectamente");
			return false;
			}

			if (dia > numDias || dia==0){
				alert("El d\u00eda no es v\u00e1lido para el mes seleccionado");
				return false;
			}
			return true;
		}
	}

// Verifica si el año es bisiesto, para permitir en Febrero poner 28 ó 29 días
function comprobarSiBisisesto(anio){
	if ( (anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0)) ) {
	    return true;
	} else {
	    return false;
	}
}	  
	  	
function ltrim(s) {
   return s.replace(/^\s+/, "");
}

function rtrim(s) {
   return s.replace(/\s+$/, "");
}

function trim(s) {
   return rtrim(ltrim(s));
}	


/***************** FUNCIONES auxiliares de FECHA ******************************/

// Abre un calendario y le asigna al input con id idCampoFecha la fecha seleccionada
function asignarFecha(idCampoFecha, urlCalendario, ancho, alto) {
	window.parentCallback = function(valor) {
		setValue(idCampoFecha, valor);
	};
	
	var valor = lanzarVentana(urlCalendario, ancho || '200', alto || '230', null, window.parentCallback);
	
	if (valor != undefined)
		window.parentCallback(valor);
}

/**
 * Habilita o deshabilita los botones en función de un recurso seleccionado.
 * 
 * @param flagCarga
 *            Dependiendo de quien lo invoque, se verificará si el elemento
 *            DOM contiene valor o no.<br>
 *            Ejm: Verifica si se ha seleccionado opción de un ComboBox.
 * @param bot2
 *            A definir.
 */
function modificaBotones(flagCarga, bot2) {
	var value = null;
	var element = jQuery(flagCarga);
	var tag = element.prop('tagName');
	
	bot2 = (bot2 == null) ? '' : bot2;
	
	// Dependiendo del tipo de TAG obtener su valor.
	switch (tag) {
	case 'SELECT':
		value = element.val();
		break;
	case 'TR':
		var tdHidden = jQuery('td.column-hidden.selectedRow');
		value = tdHidden.html();
		// id de TD = name de SELECT. Autoseleccionamos opción.
		jQuery('select[name="' + tdHidden.prop('id') + '"] option[value="' + value + '"]').prop('selected', true);
		// Activar efecto en SELECT.
		jQuery('select[name="' + tdHidden.prop('id') + '"]').parent().addClass('is-filled');
		break;
	}

	if (value == null || value == '') {
		if (jQuery('#botonModificar' + bot2) != null) {
			jQuery('#botonModificar' + bot2).prop('disabled', true);
			jQuery('#botonModificar' + bot2).removeClass('btn-etica-white').addClass('btn-etica-disabled');
		}
		if (jQuery('#botonEliminar' + bot2) != null) {
			jQuery('#botonEliminar' + bot2).prop('disabled', true);
			jQuery('#botonEliminar' + bot2).removeClass('btn-etica-white').addClass('btn-etica-disabled');
		}
		if (jQuery('#botonAnadir' + bot2) != null) {
			jQuery('#botonAnadir' + bot2).prop('disabled', false);
			jQuery('#botonAnadir' + bot2).removeClass('btn-etica-disabled').addClass('btn-etica-white');
		}
		if (jQuery('#botonRehabilitar' + bot2) != null) {
			jQuery('#botonRehabilitar' + bot2).prop('disabled', true);
			jQuery('#botonRehabilitar' + bot2).removeClass('btn-etica-white').addClass('btn-etica-disabled');
		}
	} else {
		if (jQuery('#botonModificar' + bot2) != null) {
			jQuery('#botonModificar' + bot2).prop('disabled', false);
			jQuery('#botonModificar' + bot2).removeClass('btn-etica-disabled').addClass('btn-etica-white');
		}
		if (jQuery('#botonEliminar' + bot2) != null) {
			jQuery('#botonEliminar' + bot2).prop('disabled', false);
			jQuery('#botonEliminar' + bot2).removeClass('btn-etica-disabled').addClass('btn-etica-white');
		}
		if (jQuery('#botonAnadir' + bot2) != null) {
			jQuery('#botonAnadir' + bot2).prop('disabled', true);
			jQuery('#botonAnadir' + bot2).removeClass('btn-etica-white').addClass('btn-etica-disabled');
		}
		if (jQuery('#botonRehabilitar' + bot2) != null) {
			jQuery('#botonRehabilitar' + bot2).prop('disabled', false);
			jQuery('#botonRehabilitar' + bot2).removeClass('btn-etica-disabled').addClass('btn-etica-white');
		}
	}
}

/***************** FUNCION de BOTONES **************************************
 flagCarga: el flag emplado para saber si se ha cargado desde loadrow.

 Deben existir lo botones "botonAnadir","botonModificar" y "botonEliminar".

 ***************************************************************************/
   function modificaBotonesForms(formulario,flagCarga){
      if((flagCarga.value==null)||(flagCarga.value=='')){
    	  
	       if(formulario.botonModificar!=null){
	         formulario.botonModificar.disabled=true;
	         formulario.botonModificar.className="etica-disabled";
	       }
	       if(formulario.botonEliminar!=null){
	         formulario.botonEliminar.disabled=true;
	         formulario.botonEliminar.className="etica-disabled";
	       }
	       if(formulario.botonAnadir!=null){
	         formulario.botonAnadir.disabled=false;
	         formulario.botonAnadir.className="btn btn-etica btn-etica-white";
	       }
       
      }else{
    	  
	       if(formulario.botonModificar!=null){
	         formulario.botonModificar.disabled=false;
	         formulario.botonModificar.className="btn btn-etica btn-etica-white";
	       }
	       if(formulario.botonEliminar!=null){
	         formulario.botonEliminar.disabled=false;
	         formulario.botonEliminar.className="btn btn-etica btn-etica-white";
	       }
	       if(formulario.botonAnadir!=null){
	         formulario.botonAnadir.disabled=true;
	         formulario.botonAnadir.className="etica-disabled";
	       }
      }
   }

/************************FUNCION EXPORTACION**********************************
Se encarga de enviar la peticion deseada al Action encargado de realizar la
exportacion a Word o Excel. Hay que definir en la jsp la variable sAccion que
es el path de dicho Action. La jsp debe de tener un ampo oculto llamado office
que tendra el tipo mime en el que queremos transformar los datos. Los valores
posibles de este campo son 'msword' y 'msexcel'. La llamada a esta funcion se
realiza desde la jsp iFace.jsp
******************************************************************************/
   function cargaExport(mime)
   {
         document.forms[0].office.value=mime;
         var actionOld = document.forms[0].action;
         document.forms[0].action=sAccion;
         document.forms[0].submit();
         document.forms[0].target="_self";
         document.forms[0].action=actionOld;
         document.forms[0].office.value="";
   }
/************************FUNCION BOTONES EXPORTACION***************************
Encargada de mostrar u ocultar los iconos de exportacion. Los parametros que se
le pasan son:
bShow --> true o false, si se quiere mostrar u ocultar, respectivamente
icoW y icoE --> path a las imagenes para cada uno de los iconos
icoT --> path del icono transparente utilizado en la ocultacion

            ????????????????YA NO SE UTILIZA!!!!!!!!!!
******************************************************************************/
   function muestraImgExport(bShow,icoW,icoE,icoT)
   {
      if(bShow)
      {
         window.parent.document.getElementById('imgWord').src=icoW;
         window.parent.document.getElementById('imgWord').className="mano";
         window.parent.document.getElementById('imgWord').alt=altTxt;
         window.parent.document.getElementById('imgExcel').src=icoE;
         window.parent.document.getElementById('imgExcel').className="mano";
         window.parent.document.getElementById('imgExcel').alt=altTxt;
      }
      else
      {
         window.parent.document.getElementById('imgWord').src=icoT;
         window.parent.document.getElementById('imgWord').className="puntero";
         window.parent.document.getElementById('imgWord').alt="";
         window.parent.document.getElementById('imgExcel').src=icoT;
         window.parent.document.getElementById('imgExcel').className="puntero";
         window.parent.document.getElementById('imgExcel').alt="";
         bCarga=false;
      }
   }
/**
* Funci?n para el tratamiento del acciones en formularios de listas
*
*/
function submitFormListaMsg(form,action,funcValida,operativa,arrNoSubmitElements){
   var formValidado = true;

   //validamos el formulario
   if (funcValida != null){
      formValidado = funcValida(form)

      if (! formValidado)return false;
   }

   //obtengo el valor por defecto del elemento a tratar

   if (typeof indUsoName != 'undefined' && indUsoName != null && indUsoName != ''){
      //obtenemos el objeto del formulario
      var porDefecto = (form.elements[indUsoName].checked);
   }

   switch(operativa){

     case "A":
        //si pasamos el indicador de uso, ya existe un indicador de uso marcado, pedimos confirmaci?n
        if (porDefecto){
            if ((typeof indUsoName != 'undefined' && indUsoName != null && porDefecto) && getIndUso(indUsoName,tableResultName)){
               if (!confirm(msgConfirmIndUso)) return false;
            }
         }
        break;

     case "M":
        //si pasamos el indicador de uso, ya existe un indicador de uso marcado, pedimos confirmaci?n
        if (porDefecto){
           if ((typeof indUsoName != 'undefined' && indUsoName != null && porDefecto) && getIndUso(indUsoName,tableResultName)){
               if (!confirm(msgConfirmIndUso)) return false;
            }
         }
        break;

     case "E":
        break;

      }

      //si se ejecuta correctamente la funci?n de validaci?n de entrada de datos
      if (formValidado){
         //si hay que deshabilitar alg?n control para no enviarlos en el submit

         if (arrNoSubmitElements != null){

            for (i=0; i < arrNoSubmitElements.length;i++){
               var element = form.elements[arrNoSubmitElements[i]];
               switch(element.type){
                  case "text","checkbox","select-one":
                     element.disabled = true;
                     break;
               }
            }
         }
         form.action= action;
         form.submit();
      }
   }

/*
* Funci?n que devuelve true si existe un elemento por defecto (valor 1) en una celda de una
* tabla HTML, utilizada por la funcion submitFormListaMsg para el tratamiento de acciones en forms
* de listas
*/

   function getIndUso(cellIndUsoName,tableName){

       table = document.getElementById(tableName);
      rows = table.rows;

      //iteramos sobre las filas de la tabla
       for (i=0; i < rows.length; i++){
         //iteramos sobre las celdas de cada fila, buscando la que alamacena el valor de uso por defecto
         row = rows[i];
         cells = row.cells;
         for(j=0; j < cells.length; j++){
            td=cells[j];
            if (td.id == cellIndUsoName ){
               if (td.innerHTML == 1)return true;
            }
         }
      }
      return false;
   }


/*
 * Funcion para cargar en un formulario los elementos obtenidos desde una fila de una tabla HTML
 * en la que cada una de las celdas de la fila tiene una propiedad "id" que se llama igual, que
 * el elemento del formulario con el que se enlaza
 */
function loadDataRowCustom(row,form,trueValue,falseValue,linkedCombo){
   var celdas = jQuery(row).children();
   jQuery(celdas.each(function(){
	   var td = jQuery(this);
	   if(td.attr("id") != null){
		   valor = jQuery.trim(td.text());
		   //para tratar variables booleanas
		   if (trueValue != null && falseValue != null){
		      if (valor == trueValue){
		         valor = "true";
		      }else if (valor == falseValue){
		         valor = "false";
		      }
		   }
		   var $form = jQuery(form);
		   var field = $form.find(":input[name='"+td.attr("id")+"']");
		   switchData(field, linkedCombo);
   	   }
	   // Agregamos clase de fila seleccionada.
	   td.addClass('selectedRow');
	 })
   );
   resetSelected(row);
}
   
function switchData(field, linkedCombo) {
   switch(field.attr("type")) {
      case "text":
      case "hidden":
      case "textarea":
    	 field.val(valor);
         break;
      case "checkbox":
      case "radio":
          if(valor.indexOf("1") > -1) {
        	  field.prop( "checked", true);
          } else {
        	  field.prop( "checked", false);
          }
         break;
      case "select-one":
    	 field.val(valor);
         if (linkedCombo) {
            field.onchange();
            // si no ha podido cargar el valor en el combo porque no existe la opcion
            // la creamos
            if (valor != '' && field.val() == '') {
               field.prepend("<option value=''>" + valor + "</option>");
               field.val(valor);
            }
         }
         break;
   }
}



/*
* Sobrecarga de la funci?n anterior, pasando como valores para true = 1 y para false = 0
*
*/
function loadDataRow(row,form){
	loadDataRowCustom(row,form,null,null,false);
}

function loadDataRowLinkedCombo(row,form){
   loadDataRowCustom(row,form,null,null,true);
}
/**
/* funci?n para seleccionar una fila
**/
function selectRow(row) {
   var cells = row.cells;
    for(var i=0; i<cells.length; i++)  {
      cells[i].className = "selectedRow";
    }
   resetSelected(row);
}

// variable global para marcar la fila tratada.
var tdAnterior;

/**
 * Almacena la útima fila seleccionada. También se encarga de quitar la clase
 * que identifica si una fila ha sido seleccionada o no de la fila seleccionada
 * con anterioridad a esta.
 * 
 * @param row Fila de tabla que se ha selccionado.
 */
function resetSelected(row) {
    if (tdAnterior != null && tdAnterior != row) {
    	// Obtenemos celdas de la selección anterior.
    	var celdas = jQuery(tdAnterior).children();
    	
		jQuery(celdas.each(
			function() {
				var td = jQuery(this);
				// Quitar clase de fila seleccionada.
				td.removeClass('selectedRow');
			}
		));
    }
    
	// Guardamos la última fila seleccionada.
	tdAnterior = (row != null ? row : null);
}

/**
 * Funcion utilizada para enviar al consulta ordenada en base a la cabecera de la columna que
 * el usuario seleccione
 */
function submitFormOrder(form, position) {
   var arrColumnName = 'columns';
   var columns = new Array();

   // recorremos el array de columnas
   for (j = 0; j < form.elements.length; j++) {
      // recorremos los elementos del form para obtener los que forman el array de columnas
      if (form.elements[j].name.indexOf(arrColumnName + "[") != -1) {
         columns[columns.length] = form.elements[j].name;
      }
   }

   /* Realizamos el for a partir de la posicion 1 del array, porque la
      posicion 0 corresponde siempre al codigo, y debe estar a 1 */
   for (var i = 0; i < columns.length; i++) {
      // Si la columna no es por la que consultamos, le limpiamos el orden
      var arrPosition = columns[i].substring(arrColumnName.length, columns[i].length);

      if (arrPosition.indexOf("[" + position + "]") == -1) {
         form.elements[columns[i]].value = '';
      } else {
         // en base al valor definimos su ordenacion
         switch(form.elements[columns[i]].value) {
            case '1': // ordenado ascendente
               form.elements[columns[i]].value = '-1'; //siguiente orden descendente
               break;

            case '': // sin orden
               form.elements[columns[i]].value = '1'; // siguiente orden ascendente
               break;

            case '0': // sin orden
               form.elements[columns[i]].value = '1'; // siguiente orden ascendente
               break;

            case '-1':
               form.elements[columns[i]].value = '1'; // siguiente orden ascendente
               break;
         }
      }
   }

   form.submit();
}

// Busca un elemento dentro de un array
function arrIndexOf(arr, elem) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == elem) {
			return i;
		}
	}
	
	return -1;
}

var CLASSNAME_SEPARATOR = " ";
// Busca un className en un objeto
function hasClassName(objeto, className) {
	var arrClassName = objeto.className.split(CLASSNAME_SEPARATOR);
	return arrIndexOf(arrClassName, className) != -1;
}

// Anyade un className a un objeto
function addClassName(objeto, className) {
	if(!hasClassName(objeto, className)) {
		var arrClassName = objeto.className.split(CLASSNAME_SEPARATOR);
		arrClassName.unshift(className);
		objeto.className = arrClassName.join(CLASSNAME_SEPARATOR);
	}
}

// Borra un className a un objeto
function removeClassName(objeto, className) {
	if(hasClassName(objeto, className)) {
		var arrClassName = objeto.className.split(CLASSNAME_SEPARATOR);
		arrClassName.splice(arrIndexOf(arrClassName, className), 1);
		objeto.className = arrClassName.join(CLASSNAME_SEPARATOR);
	}
}

// Tiene la misma funcion que showHide, pero en lugar de utilizar el display block/none utiliza el className oculta
var SHOWHIDEOCULTA_CLASSNAME = "oculta";
function showHideOculta(pID, pBol) {
	var obj = (typeof(pID) == "object") ? pID : document.getElementById(pID);
	if(obj) {
		if(pBol == null) {
			if(hasClassName(obj, SHOWHIDEOCULTA_CLASSNAME)) {
				removeClassName(obj, SHOWHIDEOCULTA_CLASSNAME);
			} else {
				addClassName(obj, SHOWHIDEOCULTA_CLASSNAME);
			}
		} else {
			if(pBol) {
				removeClassName(obj, SHOWHIDEOCULTA_CLASSNAME);
			} else {
				addClassName(obj, SHOWHIDEOCULTA_CLASSNAME);
			}
		}
	}
}

function showHide(pID, pBol) {
	var obj = (typeof(pID) == "object") ? pID : document.getElementById(pID);
	if(obj) {
		if(pBol == null) {
			obj.style.display = getDivCurrentDisplay(obj) != "block" ? "block" : "none";
		} else {
			obj.style.display = pBol ? "block" : "none";
		}
	}
}

function getDivCurrentDisplay(divElement) {
	if(BrowserDetect.browser == "Explorer") {
		return divElement.currentStyle.getAttribute('display');
	} else {
		return document.defaultView.getComputedStyle(divElement)["display"];
	}
}

function isDivOculto(nombreDiv) {
	return getDivCurrentDisplay(document.getElementById(nombreDiv)) == 'none';
}

function showHideInLine(pID, pBol)   {
	  if(pID == "[object]")
	    var obj = pID
	  else
	    var obj = document.getElementById(pID);
	  if(obj){
		  if(pBol == null)  {
		    var vis = (obj.currentStyle.getAttribute('display') != "inline") ? "inline" : "none";
		  } else  {
		   var vis  = (pBol) ? "inline" : "none";
		  }
		  obj.style.display = vis;
	  }
	}

function showHideArrai(arrai, pBol)  {
  for(var i=0; i < arrai.length; i++) {
    showHide(arrai[i], pBol)
  }
}

//propiedad visibilidad
function showHideVis(pID, pBol)   {
  var obj = document.getElementById(pID);
  if(obj){
	  if(pBol == null)  {
		  var vis;
		  
		  if(BrowserDetect.browser == "Explorer") {
			vis = (obj.currentStyle.getAttribute('visibility') != "visible") ? "visible" : "hidden";
		  } else {
			vis = (document.defaultView.getComputedStyle(obj)["visibility"] != "visible") ? "visible" : "hidden";
		  }
	  } else  {
	     var vis  = (pBol) ? "visible" : "hidden";
	  }
	  obj.style.visibility = vis;
  }
}

function mostrarElemento(idElemento, pBol)   {
	  var obj = document.getElementById(idElemento);
	  if(obj){
		  if(pBol == null)  {
			  var vis;
			  
			  if(BrowserDetect.browser == "Explorer") {
				vis = (obj.currentStyle.getAttribute('display') != "block") ? "block" : "none";
			  } else {
				vis = (document.defaultView.getComputedStyle(obj)["display"] != "block") ? "block" : "none";
			  }
		  } else  {
		     var vis  = (pBol) ? "block" : "none";
		  }
		  obj.style.display = vis;
	  }
	}

 /**
 * funci?n utilizada para marcar todos los evento on change de todos
 * los controles editables (select, textbox, radioButtons y checks) presentes en un formulario pasado, para controlar si alguno de
 * ellos se ha modificado, pero manteniendo el c?digo del evento onchange que tuviesen los controles
 */
 function activateChangeForm(form, activateCodeSrc){
   var functionCode;
   var arrOldFunctions = new Array();
   var arrNewFunctions = new Array();

   for (i=0; i < form.elements.length;i++){
      //si el control es editable
      if (isInputControl(form.elements[i])){
         //a?adimos una nueva funcion al array de funciones del evento
         addDelegate(form.elements[i],'onchange',new Function(activateCodeSrc));
      }
   }
 }

 function addDelegate(element, elementEvent, delegate){
   // multi-cast delegates are attached to the element as an Array;
   // ie - element['onclickDelegates'], element['onfocusDelegates'],etc
   var elementDelegates = elementEvent + 'Delegates';

   if (element[elementDelegates]){
      // there are already multi-cast delegates for this element
      // and this event; add this delegate
      element[elementDelegates].push(delegate);
   }else{
      // no multi-cast delegates for this element for this event;
      // create a multi-cast delegate list for the element
      element[elementDelegates] = [];

      if (element[elementEvent]){
      // this element has a delegate for this event already;
      // preserve the delegate and append it to the list of
      // multi-cast delegates
      element[elementEvent + 'Delegate'] = element[elementEvent];
      element[elementDelegates].push(element[elementEvent]);
      }

      // append the new delegate to the list of multi-cast delegates
      element[elementDelegates].push(delegate);

      // change the event to a function which will fire all
      // multi-cast delegates
      element[elementEvent] = (function() {return function(){
                                    for (var ii = 0; ii < this[elementDelegates].length;++ii){
                                       this[elementDelegates][ii].call(this);
                                    }
                                   }
                                 })();
   }
} // addDelegate()


function removeDelegate(element, elementEvent, delegate){
   // multi-cast delegates are attached to the element as an Array;
   // ie - element['onclickDelegates'], element['onfocusDelegates'],etc
   var elementDelegates = elementEvent + 'Delegates';

   if (element[elementDelegates]){
      // multi-cast delegates for this element were found
      var delegatesRemoved = 0;
      if (elementEvent == delegate){
         // SPECIAL CASE: when the delegate to be removed is the same
         // String as the event, attempt to remove the preserved
         // original delegate for this element for this event;
         // this is done because the original delegate may be an
         // anonymous function built from the original HTML;
         // ie - <input ... onclick="...">
         delegate = element[elementEvent + 'Delegate'];
      }

      // iterate through the multi-cast delegates; when a matching
      // one is found, remove it from the list
      var ii = 0;
      while (ii < element[elementDelegates].length){
         if (element[elementDelegates][ii] == delegate){
            element[elementDelegates].splice(ii, 1);
            ++delegatesRemoved;
         }else{
            ++ii;
         }
      }

   // return the number of multi-cast delegates removed
   return delegatesRemoved;
   }

   // no multi-cast delegates were found for this element; return
   // something to give the caller this information
   return -1;
} // removeDelegate()



 function isInputControl(formControl){
     var bOk = (formControl.type == "text"
            ||formControl.type == "select-one"
            ||formControl.type == "checkbox"
            ||formControl.type == "radio"
            ||formControl.type == "textarea");


  return bOk;
 }


/**
 * Funcion para cambiar imagenes:
 * - idImagen corresponde al attributo id="" de la etiqueta 'img'
 * - imagen1 es una de las dos imagenes con su path
 * - imagen2 es la otra de las dos imagenes con su path
 */
function cambiarImagen(idImagen, imagen1, imagen2) {
   var obj = document.getElementById(idImagen);

   if (obj.src.indexOf(imagen1) > -1) {
      obj.src = imagen2;
   }
   else {
      obj.src = imagen1;
   }
}


 /**
 * funcion para cambiar el action de un formulario; (usada en le taller de productos)
 */
   function cambiaAction (form,accion) {
      form.action = accion;
   }

/*****************************************************************************
 * Funcion utilizada para pasar a un campo oculto el valor de un checkbox,
 * para poder realizar el envio del dato.
 * Los datos de (des)marcado se establen como parametro
 /****************************************************************************/
function propertyCheck(hidden, checked) {
   propertyCheck(hidden, checked, 1, 0);
}

function propertyCheck(hidden, checked, checkedValue, uncheckedValue) {
	if (checked) {
      hidden.value = checkedValue;
   } else {
      hidden.value = uncheckedValue;
   }
}

//-------------------------------------------------------------------------------------------
// compararFechas
//-------------------------------------------------------------------------------------------
// Descripci??n : Permite una comparaci??n entre 2 fechas estableciendo una distancia que
//               depender?? del tercer campo de entrada:
//    0: diferencia en D??as
//    1: diferencia en Meses
//    2: diferencia en A??os
// Programador : Daniel G. Arceo
//       Fecha : 24-07-2003
//    Historia : 1.00 - [10-06-1998] Primera versi??n
//     2.00 - [24-07-2003] Versi??n Mejorada (Daniel G. Arceo)
//     Versi??n : 2.00 - Se incorpora la condici??n por distancia el retorno de la diferencia

function compararFechas(f1, f2, distancia){
   //convertimos la cadena pasada a fecha
   var dia;
   var mes;
   var ano;

   var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year
   var matchArray="";

   //primera fecha
   matchArray = f1.match(datePat); // is the format ok?
   if (matchArray == null) {
    return "";
   }
   day = matchArray[1];
   month = matchArray[3];
   year = matchArray[4];

   var fecPri=new Date(month + '/' + day + '/' + year);

  //segunda fecha
   matchArray = f2.match(datePat); // is the format ok?
   if (matchArray == null) {
    return "";
   }
   day = matchArray[1];
   month = matchArray[3];
   year = matchArray[4];

  var fecSec=new Date(month + '/' + day + '/' + year);
  var diferencia = 0;
  var diferenciaDiaria = ((fecPri - fecSec)/3600000)/24;

  switch (parseInt(distancia)){
   case 0://   d?as
      diferencia = (diferenciaDiaria < 0)?Math.ceil(diferenciaDiaria):Math.floor(diferenciaDiaria);
      break;
   case 1://   meses (comprobar)
      diferenciaMensual = (diferenciaDiaria)/30;
      diferencia = (diferenciaMensual < 0)?Math.ceil(diferenciaMensual):Math.floor(diferenciaMensual);
      break;
   case 2://   a?os
      diferenciaAnual = (diferenciaDiaria)/365;
      diferencia = (diferenciaAnual < 0)?Math.ceil(diferenciaAnual):Math.floor(diferenciaAnual);
      break;
  }

return diferencia;
 }


   /**
    * Funcion que cambia el valor de un hidden por el de la etiqueta de
    * un elemento option perteneciente a un select.
    * Los parametros pasados como argumento pertenecen al id elemento del cual
    * sacaremos el valor (select) y al id elemento del hidden en el cual
    * pondremos el valor, luego especificaremos en el parametro opcion a modo de literal
    * si queremos que en el hidden se guarde el value o el text del combo, el valor para
    * `opcion` sera 'value'
    * Esta funcion es llamada en el evento "onchange" del select
    */
   function datosBeanCalculo(elementoOrigen, elementoDestino, opcion) {
      var selectBox = document.getElementById(elementoOrigen);
      if(opcion == 'value'){
      user_input = selectBox.value;
      }else{
      user_input = selectBox.options[selectBox.selectedIndex].text;
      }

    document.getElementById(elementoDestino).value = user_input;
    //alert(document.getElementById(elementoDestino).value);
  }


   /**
    * Funcion que busca el indice q le corresponde dentro de su nombre
    */
   function obtenerIndice(pObjeto) {
      var index;
      var camposLength= pObjeto.name.length;
      var i=0;
      var encontrado = false;

      while((i< camposLength) && !encontrado){
        var car = pObjeto.name.charAt(i);
        if(car=='['){
         i++;
         car = pObjeto.name.charAt(i);
         index = car;
         i++;
         car = pObjeto.name.charAt(i);
         while(car!=']'){
           index = enlace+car;
           car = pObjeto.name.charAt(i);
           i++;
         }
         encontrado = true;
        }
        i++;
      }
     return index;
  }

   /**
    * Funcion que busca el indice q le corresponde dentro de su nombre
    * llama a la funcion showHide con el nombre de se le pasa como argumento
    */
   function showHideIndice(pObjeto, nombreHidden) {
      var index;
      var camposLength= pObjeto.name.length;
      var i=0;
      var encontrado = false;

      while((i< camposLength) && !encontrado){
        var car = pObjeto.name.charAt(i);
        if(car=='['){
         i++;
         car = pObjeto.name.charAt(i);
         index = car;
         i++;
         car = pObjeto.name.charAt(i);
         while(car!=']'){
           index = enlace+car;
           car = pObjeto.name.charAt(i);
           i++;
         }
         encontrado = true;
        }
        i++;
      }
      var hiddenName = nombreHidden+index;
      showHide(hiddenName);
  }


  /**
  * se le llama en el "onchange" del combo "tipo documento" y conmuta la visibilidad de los campos
  * "nombre y apellidos" y "razon social".
  * pValue es el value de la opcion del combo: debe ser "cif"
  * pNum: en caso de haber mas de un bloque con la misma funcionalidad en la pagina (trNomApe1, trNomApe2 .. etc.)
*/
function filtroTipoDoc(pValue,pNum) {
  pNum = pNum != null ? pNum:"";
  if(pValue.toUpperCase() == "C.I.F."){
    var bol = true;
    limpiarValores("trNomApe"+pNum)
    limpiarValores("trRS"+pNum)
  }else
    var bol = false;
  showHide("trNomApe"+pNum, !bol);
  showHide("trRS"+pNum, bol);
}
/*
  *  la funci?n busca elementos de formulario en el objeto para desseleccionar/borrar valores
  *  obj = celda/capa,etc. :
*/
function limpiarValores(obj) {
    obj = document.getElementById(obj);
    if(obj != null){
        var combos = obj.getElementsByTagName("SELECT");
        var campos = obj.getElementsByTagName("INPUT");
        var areas  = obj.getElementsByTagName("TEXTAREA");
        for(var k = 0; k<areas.length; k++)
          areas[k].value = "";
        for(var k = 0; k<campos.length; k++)
          campos[k].value="";
        for(var k = 0; k<combos.length; k++)
          combos[k].selectedIndex = -1;
    }
}

//funci?n que da altura a una o varias capas de pantalla con scroll <div id="cScroll">, <div id="cScroll1">, etc..).
//Calcula lo que hay por encima y por debajo de la capa.
//se ha incluido una capa cBody a nivel de tiles para saber el alto del body completo.
//pPantalla = true cuando la capa debe abarcar la pantalla entera*/
function layOutPantalla(pPantalla)   {
  try   {//try 1
    if(document.body && document.getElementById("cScroll")) {//if 1
      if(document.readyState == "loading")   {//if 2
        /**las ventanas modales tardan m?s en cargar ..*/
        setTimeout("layOutPantalla("+pPantalla+")", 10)
      } else   {//else 2
        try   {//try 2
          document.getElementById("cScroll").style.overflow = "visible"; // para coger la medida real de la capa, si est? contra?da
          var espacioAnterior =  parseInt(document.getElementById("cScroll").offsetTop);
          var altoCapaBody    =  parseInt(document.getElementById("cBody").offsetHeight);
          var altoCapaScroll  =  parseInt(document.getElementById("cScroll").offsetHeight);
          var margenBody      =  5; //definido en hoja de estilos, no encuentro la forma de recuperar el valor din?micamente ..
          var espacioPosterior =    altoCapaBody - (espacioAnterior + altoCapaScroll);
          var medida_cScroll = parseInt(document.body.offsetHeight) - margenBody - (espacioAnterior + espacioPosterior);
          document.getElementById("cScroll").style.overflow = "auto"; //resetear la medida despu?s de extraer su valor
          if(pPantalla) {
            document.getElementById("cScroll").style.height = medida_cScroll;
            return;
          }
          if(medida_cScroll < 60)   {
            medida_cScroll = 60;
          }
          if(medida_cScroll < altoCapaScroll)   {
            try   {
              /**en el caso de haber m?s de una capa con scroll: <div id="cScrollX">: cScrolll1, cScroll2, etc..*/
              /**(estas deben estar anidadas en la capa <div id=cScroll>)*/
              var capas = document.getElementsByTagName("DIV");
              var capasScroll = new Array();
              var altoCapas = 0;

              for(var i=0; i<capas.length; i++) {
                if(capas[i].id.substr(0,capas[i].id.length-1) == "cScroll")   {
                  capasScroll[capasScroll.length] = capas[i];
                  altoCapas += parseInt(capas[i].offsetHeight);
                }
              }

              if(capasScroll.length > 0)  {
                /**se elimina el espacio destinado a otros elementos fuera de las capas de scroll*/
                medida_cScroll = medida_cScroll - (altoCapaScroll - altoCapas);

                /**distribuci?n del espacio para scroll entre todas las capas con scroll*/
                medida_cScroll = eval((medida_cScroll)/capasScroll.length);
                if(medida_cScroll < 60)
                  medida_cScroll = 60;

                /**hay que verificar medidas para cada capa (puede que una no necesite scroll y otra s?)*/
                recalculaMedida(capasScroll, medida_cScroll, false);

                for(var i=0; i<capas_nuevaMedida.length; i++)  {
                  capas_nuevaMedida[i].capa.style.height = eval(capas_nuevaMedida[i].alto);
                }

              } else {/**hay una ?nica capa para poner el scroll*/
                document.getElementById("cScroll").style.height = medida_cScroll;
              }
            } catch(e)  {
              document.getElementById("cScroll").style.height = medida_cScroll;
            }
          } else {
            if(medida_cScroll > altoCapaScroll)
              medida_cScroll = "";
            document.getElementById("cScroll").style.height = medida_cScroll;
          }
        } catch(e)  {//catch 2
          return
        }
      }//fin else 2
    } else  {//else 1
      setTimeout("layOutPantalla("+pPantalla+")", 100);
    }
  } catch(e)   {//catch 1
    return;
  }
}

var capas_nuevaMedida = new Array();
var medida_aux = 0;
function recalculaMedida(pCapas, pMedida, pRecursividad){

   for(var i=0; i<pCapas.length; i++)  {
      if(pCapas[i].id != "processed" && pCapas[i].offsetHeight < pMedida)  {
         /**se va a procesar una capa que no necesita scroll, conservar? su propia medida.*/

         /**la medida se vuelve a sumar y dividir entre el nuevo n?mero de capas*/
         var numCapas_modificadas   = capas_nuevaMedida.length;
         var numCapas_origen        = pCapas.length;
         var numCapas_porProcesar   = numCapas_origen-numCapas_modificadas;
         var altoCapa                     = pCapas[i].offsetHeight;

         pMedida = parseInt((parseInt(pMedida)*numCapas_porProcesar) - altoCapa)
            / parseInt(numCapas_porProcesar-1);

         /**hay que guardarlo en una variable para recuperar este ?ltimo valor al final de la funci?n, */
         /**sino el valor de pMedida es el del primer hilo de ejecuci?n que es el que continuar? en el */
         /**pie de la funci?n (if(!pRecursividad)..)*/
         medida_aux = pMedida;

         /**la capa se guarda en un array(capas_nuevaMedida) y se le cambia el id (id=processed) */
         /**para volver a llamar a la funci?n */
         capas_nuevaMedida[capas_nuevaMedida.length] = new Object();
         capas_nuevaMedida[capas_nuevaMedida.length-1].capa = pCapas[i];
         capas_nuevaMedida[capas_nuevaMedida.length-1].alto = pCapas[i].offsetHeight;

         pCapas[i].id = "processed";
         recalculaMedida(pCapas, pMedida, true);
         break;
      }
   }

   //se comprueba cuales capas faltan en el nuevo array y se incluyen.
   if(!pRecursividad)   {//s?lo la llamada inicial, es decir el final de la funci?n
      for(var k=0; k<pCapas.length; k++)  {
         if(pCapas[k].id != "processed")  {
            capas_nuevaMedida[capas_nuevaMedida.length] = new Object();
            capas_nuevaMedida[capas_nuevaMedida.length-1].capa = pCapas[k];
            capas_nuevaMedida[capas_nuevaMedida.length-1].alto = (medida_aux != 0)? medida_aux:pMedida;
         }
      }
   }
}

//funci?n para darle tama?o(alto) al iframe en base al espacio ?til en pantalla.
//El iframe debe tener el id=iTabContent y estar anidado en la capa con id=cTabWindow
function layOut_iFrame() {
   var availableHeight = parseInt(document.body.offsetHeight - (document.getElementById("cBody").offsetHeight - document.getElementById("cTabWindow").offsetHeight));
      availableHeight -= (document.getElementById("cTabWindow").className == "tabWindow") ? 15:5;
      if(availableHeight < 300)  {
         availableHeight = 280;
         //availableHeight -= document.getElementById("cBotones").offsetHeight; //Factor correcci?n botones
         document.body.scroll = "auto";
      }
   var iTabContent = document.getElementById("iTabContent");
      iTabContent.style.height = availableHeight;

}
//funci?n para darle alto al iframe en base a la p?gina que contiene.
//se le llama desde la p?gina que contiene pas?ndole layOut_iFrame_page(this.window.frameElement)

function layOut_iFrame_page(pObj)   {
            try   {
               if(document.readyState == "complete")  {
                  pObj.style.height = document.getElementById("cBody").offsetHeight;
               } else {
                  setTimeout("layOut_iFrame_page(parent.document.getElementById('"+pObj.id+"'))",100);
               }

            } catch(e)  {
               return;
            }
         }


//funci?n para darle alto al iframe en base a la p?gina que contiene.
//se utiliza en la sabana de produccion cuando el iframe con su contenido se carga desde Ajax;
//en la p?gina que carga hay que incluir una capa con id="cBodyEdit"

function layOut_iFrame_page2(pObj)   {
           //alert(pObj.height);
           //alert(document.getElementById("cBodyEdit").offsetHeight + 16);
            try{

               if(document.readyState == "complete")  {
			   	
               pObj.height = document.getElementById("cBodyEdit").offsetHeight + 16;
               if(pObj.height < 100)
                    pObj.height = 100;
               } else {
                  setTimeout("layOut_iFrame_page(parent.document.getElementById('"+pObj.id+"'))",100);
               }

            } catch(e)  {
               return;
            }
         }

function layOut_iFrame_page3(pObj, documentContent)   {
           //alert(pObj.height);
           //alert(document.getElementById("cBodyEdit").offsetHeight + 16);
            try{

               if(documentContent.readyState == "complete")  {

               pObj.height = documentContent.getElementById("cBodyEdit").offsetHeight + 16;
               } else {
                  setTimeout("layOut_iFrame_page(parent.document.getElementById('"+pObj.id+"'))",100);
               }

            } catch(e)  {
               return;
            }
         }

function layOut_iFrame_page4(pObj, valorDIV)   {
           //alert(pObj.height);
           //alert(document.getElementById("cBodyEdit").offsetHeight + 16);
            try{

               if(document.readyState == "complete")  {
                
               pObj.height = document.getElementById("cBodyEdit").offsetHeight + 16 + valorDIV;
               if(pObj.height < 100)
                    pObj.height = 100;
               } else {
                  setTimeout("layOut_iFrame_page(parent.document.getElementById('"+pObj.id+"'))",100);
               }

            } catch(e)  {
               return;
            }
         }
         
/* Funci?n que copia el codigo html de una p?gina
(para ventanas modales p.ej.) al portapapeles. Se usa para depurar*/
function copiarCodigoFuente() {
    window.clipboardData.setData("Text",document.documentElement.innerHTML);
    /* Copiar el codigo del siguiente boton dentro de la p?gina */
    // <input type="button" onclick="copiarCodigoFuente()" value="copiar codigoHTML"/>
}


//funci?n que muestra la capa de enlaces
function showEnlaces(pObj, evt) {
   evt.cancelBubble = true;
   var capa = document.getElementById("cEnlaces");
   if(capa.style.visibility != "visible")  {
      var espacio = document.getElementById("cBody").offsetWidth;
      capa.style.top = pObj.offsetTop + pObj.offsetHeight + 3;
      capa.style.left = espacio - capa.offsetWidth;

      showHideVis("cEnlaces", true);
      hideSelects("cEnlaces");
     document.onclick  = hideEnlaces;
   } else  {
      hideEnlaces();
   }
}

//funci?n que muestra la capa de enlaces con el ID mandado,
//importante cuando puede haber mas de una capa igual en el mismo formulario
//(en sig_riesgo de campañas esto ocurre)
//Si ID va vacio tomara el nombre antiguo "cEnlaces" por defecto  

//Ya que la capa no puede llevar el id=cEnlaces y antes adquiria el estilo por el ID,
//he creado uno nuevo llamado cGarantias para asignar mediante class="cGarantias"

function showEnlacesConNombre(pObj, evt, ID) {
	//si queda algun evento pendiente de ocultar capas, lo activo antes
	if (document.onclick!=null)
		{document.onclick();}
	
	
	if ((ID==null)||(ID==""))
		{ID="cEnlaces";}
	
 evt.cancelBubble = true;
 var capa = document.getElementById(ID);
 if(capa.style.visibility != "visible")  {
    var espacio = document.getElementById("cBody").offsetWidth;
    capa.style.top = pObj.offsetTop + pObj.offsetHeight + 3;
    capa.style.left = espacio - capa.offsetWidth;

    showHideVis(ID, true);
    hideSelects(ID);
   document.onclick = function(){
	  	hideEnlacesConNombre(ID);};
 } else  {
	   hideEnlacesConNombre(ID);
 }
}

//funci?n que muestra la capa de enlaces
function showEnlacesAltura(pObj, evt, situacionAltura) {
   evt.cancelBubble = true;
   var capa = document.getElementById("cEnlaces");
   if(capa.style.visibility != "visible")  {
      var espacio = document.getElementById("cBody").offsetWidth;
      capa.style.top = pObj.offsetTop + pObj.offsetHeight + situacionAltura;
      capa.style.left = espacio - capa.offsetWidth;

      showHideVis("cEnlaces", true);
      hideSelects("cEnlaces");
     document.onclick  = hideEnlaces;
   } else  {
      hideEnlaces();
   }
}

//funcion que muestra la capa de enlaces
function mostrarEnlaces(pObj, event) {
	// Para que Firefox pueda funcionar como Internet Explorer
	if(window.event != undefined) {
		window.event.cancelBubble = true;
	} else {
	  if(window.evento)
		  window.evento.stopPropagation();
	}

	var capa = document.getElementById("cEnlaces");
	if(capa.style.visibility != "visible")  {
      var espacio = document.getElementById("cBody").offsetWidth;
      capa.style.top = pObj.offsetTop + pObj.offsetHeight + 3;
      capa.style.left = espacio - capa.offsetWidth;

      showHideVis("cEnlaces", true);
      hideSelects("cEnlaces");
      document.onclick  = hideEnlaces;
   } else  {
      hideEnlaces();
   }
}

//funci?n que oculta la capa de enlaces y muestra los combos que se ocultaron previamente.
function hideEnlaces()  {
   try   {
      showHideVis("cEnlaces", false);
      showHideVis("cEnlaces", false);
      for(var i=0; i < combosOcultos.length; i++)   {
         combosOcultos[i].style.visibility = "visible";
      }
      
      document.onclick  = null;
   } catch(e)  {
      return;
   }
}

function hideEnlacesConNombre(ID)  {
	if ((ID==null)||(ID==""))
	{
	ID="cEnlaces";
	}
	
    try   {
    	showHideVis(ID, false);
    	showHideVis(ID, false);
    	for(var i=0; i < combosOcultos.length; i++)   {
    		combosOcultos[i].style.visibility = "visible";
    	}
      
    	document.onclick  = null;
    } catch(e)  {
      return;
    }
}

//funci?n que oculta los combos que quedan por debajo de una capa
//pCapa es el id de la capa que se va a mostrar: los combos que ocupen su mismo espacio se deben ocultar
var combosOcultos;
function hideSelects(pCapa, iFrame)  {
  try {
    combosOcultos = new Array();
    var overDiv = document.getElementById(pCapa);
    var combos = document.getElementsByTagName('SELECT');
    for(i = 0; i < combos.length; i++ )  {
      obj = combos[i];
      if( !obj || !obj.offsetParent ) {
        continue;
      }

      objLeft   = obj.offsetLeft;
      objTop    = obj.offsetTop;
      objWidth = obj.offsetWidth;
      objHeight = obj.offsetHeight;

      // Find the element's (select/applet) offsetTop and offsetLeft relative to the BODY tag.
      objParent = obj.offsetParent;
      while( objParent.tagName.toUpperCase() != "BODY" ) {
         objLeft  += objParent.offsetLeft;
         objTop   += objParent.offsetTop;
         objParent = objParent.offsetParent;
      }

      overDivLeft   = overDiv.offsetLeft;
      overDivTop    = overDiv.offsetTop;
      overDivWidth  = overDiv.offsetWidth;
      overDivHeight = overDiv.offsetHeight;

      // Find the element's offsetTop and offsetLeft relative to the BODY tag.
      overDivParent = overDiv.offsetParent;
      while( overDivParent.tagName.toUpperCase() != "BODY" )   {
         overDivLeft  += overDivParent.offsetLeft;
         overDivTop   += overDivParent.offsetTop;
         overDivParent = overDivParent.offsetParent;
      }

      if(
         ( objTop + objHeight )  >= ( overDivTop )                        &&
         ( objTop )              <= ( overDivTop + overDivHeight )        &&
         ( objLeft + objWidth )  >= ( overDivLeft )                       &&
         ( objLeft )             <= ( overDivLeft + overDivWidth)
       ) {
            combosOcultos[combosOcultos.length] = obj;
            obj.style.visibility = "hidden";
       }  else {
            obj.style.visibility = "";
       }
    }
  } catch(e)  {
    //alert(e)
    return;
  }
}

/*******************************************************************************
funci?n que controla la expansi?n y contracci?n de bloques
(ejemplo en el prototipo html: producci?n > contizaciones y proyectos > nueva producci?n > CotizacionPolizaRapidaFiltro.html)
hay que ajustar las funciones, no es conveniente que haya literales en el js (multiidioma)
*******************************************************************************/
function handlerAllBlocks(pObj, pName) {
   var expandir = (pObj.title.substr(0,3) == "Exp")? true : false;
  var literal = (expandir)? textoContraerTodos : textoExpandirTodos;
  var imgSrc = (expandir)? rutaImg + "botContraerTodos.png" : rutaImg + "botExpandirTodos.png";
  changeIcon(pObj.id, imgSrc);
  pObj.title = literal;
  var bloques = document.getElementsByName(pName);
  for(var i = 0; i < bloques.length; i++) {
   handlerBlock(bloques[i].id.substr(3), expandir);
  }
}
function handlerBlock(pObj, pBol)  {
  pBol = (pBol != null) ? pBol : (document.getElementById('img'+pObj).title.substr(0,3) == "Exp")? true : false;
  var literal = (pBol)? textoContraer : textoExpandir;
  document.getElementById('img'+pObj).title = literal;
  if (document.getElementById('tit'+pObj)){
	  document.getElementById('tit'+pObj).title = literal;
  }
  showHide(pObj, pBol);
  var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
  changeIcon('img' + pObj, imgSrc );
  
  // Para que Firefox pueda funcionar como Internet Explorer
  if(window.event != undefined) {
	  window.event.cancelBubble = true;
  } else {
	  if(window.evento)
		  window.evento.stopPropagation();
  }
  
  layOutPantalla();
}

function cancelBubble() {
	if(window.event != undefined) {
		window.event.cancelBubble = true;
	} else {
		if(window.evento) {
			window.evento.stopPropagation();
		}
	}
}
function handlerAllBlocks2(pObj, pName) {
	   var expandir = (pObj.title.substr(0,3) == "Exp")? true : false;
	  var literal = (expandir)? textoContraerTodos : textoExpandirTodos;
	  var imgSrc = (expandir)? rutaImg + "botContraerTodos.png" : rutaImg + "botExpandirTodos.png";
	  changeIcon(pObj.id, imgSrc);
	  pObj.title = literal;
	  var bloques = document.getElementsByName(pName);
	  for(var i = 0; i < bloques.length; i++) {
		handlerBlock2(bloques[i].id.substr(3), expandir);
	  }
	}
function handlerBlock2(pObj, pBol)  {
  pBol = (pBol != null) ? pBol : (document.getElementById('img'+pObj).title && document.getElementById('img'+pObj).title.substr(0,3) == "Exp")? true : false;
  var literal = (pBol)? textoContraer : textoExpandir;
  document.getElementById('img'+pObj).title = literal;
  if (document.getElementById('tit'+pObj)){
	  document.getElementById('tit'+pObj).title = literal;
  }
  showHide(pObj, pBol);
  var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
  changeIcon('img' + pObj, imgSrc );
  event.cancelBubble = true;
}

/* -A. Aguilera 25-05-07- ******************************************************************
Contemplando el caso de una jsp conteniendo bloques contraibles junto a frames conteniendo jsp's que a 
su vez contienen bloques contraibles.
*******************************************************************************************************/
function handlerAllBlocksFrames(pObj, pName)	{
    var expandir = (pObj.title.substr(0,3) == "Exp")? true : false;
    var literal = (expandir)? textoContraerTodos : textoExpandirTodos;
    var imgSrc = (expandir)? rutaImg + "botContraerTodos.png" : rutaImg + "botExpandirTodos.png";
    changeIcon(pObj.id, imgSrc);
    pObj.title = literal;
    		
		//Para todos los bloques contraibles que esten dentro de frames
		if(frames){
			for(j=0;j<frames.length;j++){
				var bloquesf0 = frames[j].document.getElementsByName(pName);
				//alert(bloquesf0.length); // Cuantos bloques hay en cada frame
				
				for(var i = 0; i < bloquesf0.length; i++){
					handlerBlockFrames(bloquesf0[i].id.substr(3), expandir, frames[j], j);
				}
			}
			
			//Para los bloques contraibles que no esten dentro de frames
			var bloques = document.getElementsByName(pName);
			for(var i = 0; i < bloques.length; i++)	{
				handlerBlock(bloques[i].id.substr(3), expandir);
			}
			
		}else{
		
			//Para los bloques contraibles que no esten dentro de frames
			var bloques = document.getElementsByName(pName);
			for(var i = 0; i < bloques.length; i++)	{
				handlerBlock(bloques[i].id.substr(3), expandir);
			}
			
		}
		
}

/* -  A. Aguilera 25-05-07- ******************************************************************
Parametro 3: frames[j]--> recorremos todos los frames de la p?gina desde donde se llama a handlerAllBlocks 
	y lo enviamos uno a uno a handlerblock.
Parametro 4: j--> Ese mismo ?ndice servir? para calcular la altura de la capa cBodyEdit"j" una vez hecho
	handlerblock en todos los bloques que contienen y darle ese valor de altura al frame que contiene dicha
	p?gina.
*******************************************************************************************************/
function handlerBlockFrames(pObj, pBol, iFrame, num)  {
	
    if(iFrame!=null){
	
		var frameTitle = eval("frames['"+iFrame.name+"'].document.getElementById('tit"+pObj+"').title.substr(0,3)");
		pBol = (pBol != null) ? pBol : (frameTitle == "Exp")? true : false;
		
		var literal = (pBol)? textoContraer : textoExpandir;
				
		frames[iFrame.name].document.getElementById("img"+pObj).title = literal;
		frames[iFrame.name].document.getElementById("tit"+pObj).title = literal;
				
		var bloque = eval("frames['"+iFrame.name+"'].document.getElementById('"+pObj+"')");
		showHide(bloque, pBol); 
							
		var frameIm = eval("frames['"+iFrame.name+"'].document.getElementById('img"+pObj+"')");
		var imagen = eval("frames['"+iFrame.name+"'].document.getElementById('"+frameIm.id+"')");
		var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
		imagen.src = imgSrc;
	  		
		var alturaBodyEdit = eval("frames['"+iFrame.name+"'].document.getElementById('cBodyEdit"+num+"').offsetHeight");
		frames[iFrame.name].window.frameElement.height = alturaBodyEdit + 16;
		
		event.cancelBubble = true;
	 	layOutPantalla();
		
	}else{
		
		pBol = (pBol != null) ? pBol : (document.getElementById('tit'+pObj).title.substr(0,3) == "Exp")? true : false;
		var literal = (pBol)? textoContraer : textoExpandir;
		document.getElementById('img'+pObj).title = literal;
		document.getElementById('tit'+pObj).title = literal;
		showHide(pObj, pBol); 
		//alert(rutaImg);
		var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
		changeIcon('img' + pObj, imgSrc );
		//event.cancelBubble = true;
	    layOutPantalla();
		
	}
}


function changeIcon(pImg, pimgSrc)  {
  document.getElementById(pImg).src = pimgSrc;
}

/* Funcion para chequear el radio button correspondiente*/
function chequearFiltro(valor,rbFamilia,rbProducto,idFamilia,codProducto,cFamilia,cProducto){
   switch(valor){

      case 1:
         // se activa la familia de productos
         document.getElementById(rbFamilia).checked = true;
         document.getElementById(rbProducto).checked = false;

         document.getElementById(codProducto).value = "";

         showHideVis(cFamilia, true);
         showHideVis(cProducto, false);
      break;

      case 2:
         // se activa el producto
         document.getElementById(rbProducto).checked = true;
         document.getElementById(rbFamilia).checked = false;

         if (document.getElementById(idFamilia)) {
        	 document.getElementById(idFamilia).value = "";	 
         }
                  
         if (document.forms[0].elements[idFamilia]) {
        	 document.forms[0].elements[idFamilia].selectedIndex = -1;
         }
                           
		if (document.getElementById("idTipoTramite") != null)
			document.getElementById("idTipoTramite").length = null;
		

         showHideVis(cProducto, true);
         showHideVis(cFamilia, false);
      break;
   }
}
/*Esta funci?n coloca el foco en el primero de los inputs visibles*/
function Foco(){
      var inputs=document.getElementsByTagName("INPUT");
         if(inputs.length!=0){
            for(var i=0;i<inputs.length;i++){
               //alert(inputs[i].type);
               if(inputs[i].type!="hidden"){
                  inputs[i].focus();
                  break;
               }
            }

         }
   }


  /* Funcion para habilitar/deshabilitar todos los campos de un formulario */
  function allDisabled(form,flag){

    var campos = form.elements;
    for(var i= 0;i<campos.length; i++){
      campos[i].disabled = flag;
    }
  }
  /* Deshabilita todo el formulario excepto los campos indicados */
  // form --> Nombre del formulario
  // flag --> Habilitar o deshabilitar. true o false. 
  // camposNoTocar --> Campos que no se deshabilitaran
  function disabledFields(form,flag, camposNoTocar){

	    var campos = form.elements;
	    for(var i= 0;i<campos.length; i++){
	    	var enc = false;
	    	
	    	if (camposNoTocar != null) {
		    	for (var x = 0; x < camposNoTocar.length; x++) {
		    		
		    		if (camposNoTocar[x] == campos[i].name){
		    			enc = true;
		    			break;
		    		}	
		    	}
	    	}
	    	
	    	if (!enc){ 
	    		campos[i].disabled = flag; 
	    	}
	    }
  }
  
  // Funcion que comprueba si el campo pasado como parametro es null o es vacio
  function isEmptyField(campo) {
	  
	  var bool = false;
	  
	  //alert("Campo " + campo.name + "\n Type " + campo.type + "\n Value " + campo.value);
	  switch(campo.type){
	      case "text":
	         if (campo.value == null || trim(campo.value).length == 0)
	             bool = true;
	         break;
	
	      case "textarea":
		      if (campo.value == null || trim(campo.value).length == 0)
		    	  bool = true;
		      break;
	
	      case "checkbox":
	         if (campo.checked == false)
	        	 bool = true;
	         break;
	         
	      case "select-one":
	          if (campo.selectedIndex == 0)
	        	  bool = true;
	          break;
	          
	      case "hidden":
	    	  if (campo.value == null || trim(campo.value).length == 0)
	    		  bool = true;
	          break;
	
	      default:
	    	  break;
	      
	  }
	  
	  return bool;
  }
  
  function isEmptyValue(value){
	  
	  if (typeof(value) == "undefined" || value == null || trim(value) == ''){
		  return true;
	  }
  }  
  
  /* Funcion que oculta todos los select del area de trabajo */
  function escondeSelects(){
	if(!window.attachEvent) return false;
	var selects = document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "none";
	}
  }

  /* Funcion que muestra todos los select del area de trabajo */
  function muestraSelects(){
	if(!window.attachEvent) return false;
	var selects = document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "inline";
	}
  }
    
  function setVisivilityDiv(div, muestra) {
	if ( (div != undefined) && (div != null) ) {
		div.style.visibility = (muestra?'visible':'hidden');
		div.focus();
	}	  	  
  }
  
  function setVisivilityCargaComun(pDiv, muestra) {	
	  var divGeneral;
		
		if (top && top.document) {
			var divGeneral = top.document.getElementById(pDiv);
			setVisivilityDiv(divGeneral, muestra);
		}
		
		if (parent && parent.document) {
			divGeneral = parent.document.getElementById(pDiv);
			setVisivilityDiv(divGeneral, muestra);
		}
		
		if (document) {
			divGeneral = document.getElementById(pDiv);
			setVisivilityDiv(divGeneral, muestra);
		}
		
		var frameAreaTrabajo;
		
		if (top && top.window && top.window.frames) {
			frameAreaTrabajo = top.window.frames[targetFrameDefault];
			if (frameAreaTrabajo && frameAreaTrabajo.top && frameAreaTrabajo.top.document) {
				divGeneral = frameAreaTrabajo.top.document.getElementById(pDiv);
				setVisivilityDiv(divGeneral, muestra);
			}
	
			if (frameAreaTrabajo && frameAreaTrabajo.parent && frameAreaTrabajo.parent.document) {
				divGeneral = frameAreaTrabajo.parent.document.getElementById(pDiv);
				setVisivilityDiv(divGeneral, muestra);
			}
	
			if (frameAreaTrabajo && frameAreaTrabajo.document && frameAreaTrabajo.document.document) {
				divGeneral = frameAreaTrabajo.document.document.getElementById(pDiv);
				setVisivilityDiv(divGeneral, muestra);
			}
	
			if (frameAreaTrabajo && frameAreaTrabajo.document) {
				divGeneral = frameAreaTrabajo.document.getElementById(pDiv);
				setVisivilityDiv(divGeneral, muestra);
			}
		}
  }
  
  /* Funcion */
  function muestraCargaComun(){
	// Mostrar capa de carga de contenido quitando menú izquierdo y capa.
	top.document.getElementById('menu-left').classList.remove('active');
	top.document.getElementById('overlay-menu-left').classList.remove('active');
	  
    //muestra la capa que contiene la cortina transparente
	setVisivilityCargaComun('divGeneral', true);
  }

  /* Funcion */
  function muestraCarga(){
	  if (top.document.getElementById("divGeneralImg") != null) {
		  top.document.getElementById("divGeneralImg").src = top.imgCargando.src;
	  }
	  muestraCargaComun();
  }

  /* Funcion */
  function muestraTarifa(){
	  if (top.document.getElementById("divGeneralImg") != null) {
		  top.document.getElementById("divGeneralImg").src = top.imgTarificando.src;
	  }
	  muestraCargaComun();
  }
  
  /* Funcion */
  function muestraCargando(srcImg){
	//muestra la capa que contiene la cortina transparente
	if (document.getElementById('divCargando') != null){
		var div=document.getElementById('divCargando');
		var altoDocumento=jQuery(document).height();
		div.style.height=altoDocumento;
		if(srcImg!=null){
			var span=div.firstChild;
			var img=span.firstChild;	
			img.src=srcImg;
		}	
		document.getElementById('divCargando').style.visibility = 'visible';
	}
  }
  
  /* Funcion */
  function ocultaCarga(){
	//oculta la capa que contiene la cortina transparente
	  setVisivilityCargaComun('divGeneral', false);
  }
  
  /* Funcion */
  function ocultaCargando(){
	//oculta la capa que contiene la cortina transparente
	var divCargando = document.getElementById('divCargando');

	if (divCargando != null) {
		divCargando.style.visibility = 'hidden';
		divCargando.focus();
	}
	
	//vuelve a mostrar los select de la pagina
	muestraSelects();
  }
  
  /* P Roza 27-09-07- ********************************
 	Controles para la integracion con siniestros
 *****************************************************/

  /* Funcion para el control del reloj desde un iframe */
  function muestraCargaIFrame(){
	//muestra la capa que contiene la cortina transparente
	top.document.getElementById('divGeneral').style.visibility = 'visible';
	//se ocultan los select de la pagina para que no se superpongan a la cortina
  	escondeSelects(); 
  	escondeSelectsParent(); 
  }
  
  /* Funcion para el control del reloj desde un iframe */
  function ocultaCargaIFrame(){
	//oculta la capa que contiene la cortina transparente
	top.document.getElementById('divGeneral').style.visibility = 'hidden';
	//vuelve a mostrar los select de la pagina
	muestraSelects();
	muestraSelectsParent();
  }
  
  /* Funcion para el control del reloj desde una pagina con tabs */
  function muestraCargaWTab(){
	//muestra la capa que contiene la cortina transparente
	top.document.getElementById('divGeneral').style.visibility = 'visible';
	//se ocultan los select de la pagina para que no se superpongan a la cortina
  	escondeSelects(); 
  	escondeSelectsTab(); 
  }
  
  /* Funcion para el control del reloj desde una pagina con tabs */
  function ocultaCargaWTab(){
	//oculta la capa que contiene la cortina transparente
	top.document.getElementById('divGeneral').style.visibility = 'hidden';
	//vuelve a mostrar los select de la pagina
	muestraSelects();
	muestraSelectsTab();
  }  
  
    /* Funcion que oculta todos los select del area de trabajo */
  function escondeSelectsParent(){
	if(!window.attachEvent) return false;
	var selects = window.parent.document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "none";
	}
  }

  /* Funcion que muestra todos los select del area de trabajo */
  function muestraSelectsParent(){
	if(!window.attachEvent) return false;
	var selects = window.parent.document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "inline";
	}
  } 
  
  /* Funcion que oculta todos los select del area de trabajo */
  function escondeSelectsTab(){
	if(!window.attachEvent) return false;
	var selects = window.frames['iTabContent'].document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "none";
	}
  }

  /* Funcion que muestra todos los select del area de trabajo */
  function muestraSelectsTab(){
	if(!window.attachEvent) return false;
	var selects = window.frames['iTabContent'].document.getElementsByTagName("select");
	for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "inline";
	}
  }  
  
  
  
  function layOut_iFrame_page_Multiples(pObj,num){
         //alert(pObj.height)
         pObj.height = document.getElementById("cBodyEdit"+num+"").offsetHeight +16;
	}
	
	/**Funcion que deshabilita un boton y lo vuelve ha habilitar a los segundos que le pasemos**/
	function protegeBoton(bot,time){
	   	bot.disabled=true;
	  	setTimeout("document.getElementById('" +bot.id+"').disabled = false",time);
	}

	/**Funcion que quita una opcion de un combo*/
	function removeElementOption(poSelect, id)    {
		if (poSelect != null) {
	   		var opcionSeleccionada = poSelect.value;
	   		poSelect.value = id;
	   		poSelect.remove(poSelect.selectedIndex);
	   		poSelect.value = opcionSeleccionada;
		}
   }
   
	
/* -F. Fernandez 04-07-07- ******************************************************************
Activacion y desactivacion de cortina para bloquear campos en la jsp.
Js realizados por Agustin Aguilera
necesaria la variable de entorno var dis;  para el control de combos.
*******************************************************************************************************/
	
	function muestraCortina(){
		//muestra la capa que contiene la cortina transparente para evitar la interaccion con la pagina
		//document.getElementById('divCortinaGeneral').style.visibility = 'visible';
		
		//En base a la capa CScroll, dimensiona y posiciona la capa cortina
		//document.getElementById('divCortinaGeneral').style.top = document.getElementById("cScroll").offsetTop;
		//document.getElementById('divCortinaGeneral').style.height = parseInt(document.getElementById("cScroll").offsetHeight) - 25 + "px";
				
		//se ocultan los select de la pagina para que no se superpongan a la cortina
		return inhabilitaSelects();
		
	}
	
	function muestraCortinaNoLinks(){
		// Lo mismo quu muestraCortina, pero no oculta los links, para poder utilizarlos en caso de consulta
		
		//En base a la capa CScroll, dimensiona y posiciona la capa cortina
		//document.getElementById('divCortinaGeneral').style.top = document.getElementById("cScroll").offsetTop;
		//document.getElementById('divCortinaGeneral').style.height = parseInt(document.getElementById("cScroll").offsetHeight) - 25 + "px";
				
		//se ocultan los select de la pagina para que no se superpongan a la cortina
		return inhabilitaSelectsNoLinks();
		
	}
		
	function ocultaCortina(){
		//oculta la capa que contiene la cortina transparente
		//document.getElementById('divCortinaGeneral').style.visibility = 'hidden';
		
		//vuelve a reestablecer el estado de cada select de la pagina
		return habilitaSelects();   
	}

			
	function inhabilitaSelects(){
		if(!window.attachEvent) return false;
		var selects = document.getElementsByTagName("select");
		var inputs = document.getElementsByTagName("input");
		var textareas = document.getElementsByTagName("textarea");
		var imgs = document.getElementsByTagName("img");
		
		valor = new Array(selects.length);
		vardis_cortina = new Array(selects.length);
		vardistext_cortina = new Array(inputs.length);
		vardistextarea_cortina = new Array(textareas.length);
		vardisimg_cortina = new Array(imgs.length);
					
		for(var i=0; i<selects.length; i++ ){
			vardis_cortina[i] = selects[i].disabled;
			selects[i].disabled = "true";
		}
		for(j=0; j<inputs.length; j++ ){
			if (inputs[j].type=="text"){			
				vardistext_cortina[j] = inputs[j].disabled;
				inputs[j].disabled = "true";
			}
			if (inputs[j].type=="button" && inputs[j].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
				vardistext_cortina[j] = inputs[j].disabled;
				inputs[j].disabled = "true";
			}
			
			//Deshabilitanos los botones de Guardar, Anular y VerPrecio en el caso de que el riesgo este anulado
			if (inputs[j].type=="button" && inputs[j].className=="boton"){ //El class boton2 es el de los botonos dentro de formulario			
				//Este campo hidden esta introducido en el polizaDatosRiesgoAjax en el ajax region num_riesgoAjax junto con el numRiesgo
				//alert(document.getElementById("idEstadoRiesgoHidden").value);
				if(document.getElementById("idEstadoRiesgoHidden") != null && document.getElementById("idEstadoRiesgoHidden").value == 2){
					if(inputs[j].id == "botonGuardar" || inputs[j].id == "botonAnular" || inputs[j].id == "botonPrecio"){ 
						vardistext_cortina[j] = inputs[j].disabled;
						inputs[j].disabled = "true";
					}
				}
			}
			if (inputs[j].type=="radio"){
				vardistext_cortina[j] = inputs[j].disabled;			
				inputs[j].disabled = "true";
			}
			if (inputs[j].type=="checkbox"){
				vardistext_cortina[j] = inputs[j].disabled;			
				inputs[j].disabled = "true";
			}
		}		
		for(var i=0; i<textareas.length; i++ ){
			vardistextarea_cortina[i] = textareas[i].disabled;
			textareas[i].disabled = "true";
		}	
		for(var i=0; i<imgs.length; i++ ){
			if(imgs[i].id != "handWrite"){ //El id handWrite mes la mano de modificacion que no queremos que se deshabilite
				vardisimg_cortina[i] = imgs[i].disabled;
				imgs[i].disabled = "true";
			}else{//Deshabilitanos la mano en el caso de que el riesgo este anulado		
				//Este campo hidden esta introducido en el polizaDatosRiesgoAjax en el ajax region num_riesgoAjax junto con el numRiesgo
				if(document.getElementById("idEstadoRiesgoHidden") != null && document.getElementById("idEstadoRiesgoHidden").value == 2){							
					vardisimg_cortina[i] = imgs[i].disabled;
					imgs[i].disabled = "true";
				}
			}
		}		
		
		arrayLinks = new Array(document.links.length);
		
		for(var i=0;i<document.links.length;i++){
			if(!isObjInArray(linksEnabled, document.links[i].id)){ 
				arrayLinks[i]=document.links[i].onclick;
				document.links[i].onclick="";
			}
		}
		
		//Flag que controla si tenemos el formulario habilitado
		swFormularioHabilitado = false; 
		
		return true;
	  }
	
	
	function inhabilitaSelectsNoLinks(){
		if(!window.attachEvent) return false;
		var selects = document.getElementsByTagName("select");
		var inputs = document.getElementsByTagName("input");
		var textareas = document.getElementsByTagName("textarea");
		var imgs = document.getElementsByTagName("img");
		
		valor = new Array(selects.length);
		vardis_cortina = new Array(selects.length);
		vardistext_cortina = new Array(inputs.length);
		vardistextarea_cortina = new Array(textareas.length);
		vardisimg_cortina = new Array(imgs.length);
					
		for(var i=0; i<selects.length; i++ ){
			vardis_cortina[i] = selects[i].disabled;
			selects[i].disabled = "true";
		}
		for(j=0; j<inputs.length; j++ ){
			if (inputs[j].type=="text"){			
				vardistext_cortina[j] = inputs[j].disabled;
				inputs[j].disabled = "true";
			}
			if (inputs[j].type=="button" && inputs[j].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
				vardistext_cortina[j] = inputs[j].disabled;
				inputs[j].disabled = "true";
			}
			
			//Deshabilitanos los botones de Guardar, Anular y VerPrecio en el caso de que el riesgo este anulado
			if (inputs[j].type=="button" && inputs[j].className=="boton"){ //El class boton2 es el de los botonos dentro de formulario			
				//Este campo hidden esta introducido en el polizaDatosRiesgoAjax en el ajax region num_riesgoAjax junto con el numRiesgo
				//alert(document.getElementById("idEstadoRiesgoHidden").value);
				if(document.getElementById("idEstadoRiesgoHidden") != null && document.getElementById("idEstadoRiesgoHidden").value == 2){
					if(inputs[j].id == "botonGuardar" || inputs[j].id == "botonAnular" || inputs[j].id == "botonPrecio"){ 
						vardistext_cortina[j] = inputs[j].disabled;
						inputs[j].disabled = "true";
					}
				}
			}
			if (inputs[j].type=="radio"){
				vardistext_cortina[j] = inputs[j].disabled;			
				inputs[j].disabled = "true";
			}
			if (inputs[j].type=="checkbox"){
				vardistext_cortina[j] = inputs[j].disabled;			
				inputs[j].disabled = "true";
			}
		}		
		for(var i=0; i<textareas.length; i++ ){
			vardistextarea_cortina[i] = textareas[i].disabled;
			textareas[i].disabled = "true";
		}	
		for(var i=0; i<imgs.length; i++ ){
			if(imgs[i].id != "handWrite"){ //El id handWrite mes la mano de modificacion que no queremos que se deshabilite
				vardisimg_cortina[i] = imgs[i].disabled;
				imgs[i].disabled = "true";
			}else{//Deshabilitanos la mano en el caso de que el riesgo este anulado		
				//Este campo hidden esta introducido en el polizaDatosRiesgoAjax en el ajax region num_riesgoAjax junto con el numRiesgo
				if(document.getElementById("idEstadoRiesgoHidden") != null && document.getElementById("idEstadoRiesgoHidden").value == 2){							
					vardisimg_cortina[i] = imgs[i].disabled;
					imgs[i].disabled = "true";
				}
			}
		}		
		
		//Flag que controla si tenemos el formulario habilitado
		swFormularioHabilitado = false; 
		
		return true;
	  }
	  
	  function habilitaSelects(){
		if(!window.attachEvent) return false;
		var selects = document.getElementsByTagName("select");
		var inputs = document.getElementsByTagName("input");
		var textareas = document.getElementsByTagName("textarea");
		var imgs = document.getElementsByTagName("img");
		
		if (vardis_cortina != null){					
			for(var i=0; i<selects.length; i++ ){
				selects[i].disabled = vardis_cortina[i];
			}
		}
		if (vardistext_cortina !=null){
			for(j=0; j<inputs.length; j++ ){
				if (inputs[j].type=="text"){			
					inputs[j].disabled = vardistext_cortina[j];
				}
				if (inputs[j].type=="button" && inputs[j].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
					inputs[j].disabled = vardistext_cortina[j];
				}
				if (inputs[j].type=="radio"){			
					inputs[j].disabled = vardistext_cortina[j];
				}
				if (inputs[j].type=="checkbox"){			
					inputs[j].disabled = vardistext_cortina[j];
				}
			}	
		}			
		if (vardistextarea_cortina != null){					
			for(var i=0; i<textareas.length; i++ ){
				textareas[i].disabled = vardistextarea_cortina[i];
			}
		}		
		if (vardisimg_cortina != null){					
			for(var i=0; i<imgs.length; i++ ){
				if(imgs[i].id != "handWrite"){ //El id handWrite es la mano de modificacion que no queremos que se deshabilite
					imgs[i].disabled = vardisimg_cortina[i];
				}
			}
		}		

		vardis_cortina = null;
		vardistext_cortina = null;
		vardistextarea_cortina = null;
		vardisimg_cortina = null;
		
		if(arrayLinks != null){
			for(var i=0;i<document.links.length;i++){
				if(!isObjInArray(linksEnabled, document.links[i].id)){ 
					document.links[i].onclick=arrayLinks[i];
				}
			}		
		}
		
		//Flag que controla si tenemos el formulario habilitado
		swFormularioHabilitado = true; 
		
		return true;
	  }
	  
	  // Esta funcion se encarga de habilitar o desabilitar, segun el
	  // parametro en entrada estado, la lista de ids que se 
	  // suministran.
	  function cambiaHabilitadoListaIds(estado, listaIds){
		var objetoId = null;
		
		// Se recorre la lista
		for(var ind in listaIds){
			objetoId = document.getElementById(listaIds[ind]);
			if(objetoId != undefined){
				objetoId.disabled = !estado;
			}else{
				alert('Id ('+listaIds[ind]+') no reconocido.');
			}
		}
		return !estado;
	  }
		
	  /*Funcion que muestra un ToolTip dinámico para un imput de texto. Parámetros: Obj= obj relativo al que se quiere asociar
	    el tooltip. id = identificador asociado. ancho = ancho del tooltip*/
	    
	  function mostrarTooltipInput(obj) {
	  	obj.title = obj.value;   
	} 

	/* Funcion usada para transformar un numero en formato espanol a numerico*/		
  function undoNumber(num) {
        num = num.split(".").join("");
        num = num.split(",").join(".");
        return parseFloat(num);
  }

	/* Funcion usada para transformar un numerico a formato espanol*/
  function doNumber(num) {
        prefix = '';
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? ',' + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
              splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
        }
        if (splitRight == "") {
              splitRight = ",00";
        } else {
              if (splitRight.length == 2) {
                    splitRight += "0";
              }
        }
        return prefix + splitLeft + splitRight;
  }
  
  function checkAll(valor){        		
		
		form = document.forms[0];
		for (i=0;i<form.elements.length;i++)  {  
		       if(form.elements[i].type == "checkbox"){
		    	   form.elements[i].checked=valor;
		    	   if (valor) {
		    		   document.getElementById(form.elements[i].name+'_').value = 1;
		    	   } else {
		    		   document.getElementById(form.elements[i].name+'_').value = 0;
		    	   }
		       }
		}  
  } 
  
  
  /* fUNCIONN EN LA QUE SE MARCAN/DESMARCAN LOS CHECK DE RIESGOFORM*/
  function marcaDesmarca(valor, form){
	 
	  do { 
	  		form=form.parentNode; 
	    } while(form.tagName!="FORM"); 
	  	
			for (i=0;i<form.elements.length;i++)  {  
				
		       if(form.elements[i].type == "checkbox"){
		    	  
		    	 if(form.elements[i].name.startsWith("riesgoBean.garantiasModalidadHashMap")){
		    		 form.elements[i].checked=valor;
			    	   if (valor) {
			    		   form.elements[i].value = 1;
			    	   } else {
			    		   form.elements[i].value = 0;
			    	   } 
			    	   try{
			    		   //marcar el hidden asociado a cada checkbox
				    	   if (valor) {
				    		   document.getElementById(form.elements[i].name+'_').value = 1;
				    	   } else {
				    		   document.getElementById(form.elements[i].name+'_').value = 0;
				    	   } 
			    	   }catch(err){}
		    	 }  
		    	   
		       }
		}  
	  	  
	  
}
  
  
  //  Función: Realiza una petición al servidor mediante Ajax sirviendose de la librería prototype
  //  Parametros: 
  //	  - url: La dirección del mapeo en struts
  //	  - metodo: Forma de envío de parámetros (get|post)
  //  	  - parametros: Parámetros a añadir en la petición {parametro1:valor1, parametro2:valor2..}
  //      - callbackSuccess: Función de retorno al terminar de ejecutar la petición
  //	  - callbackError: Función de retorno si la petición es fallida
  function peticionAjax(url, metodo, parametros, callbackSuccess, callbackError){
	var ajax = new Ajax.Request( 
			url, {  method:metodo,
				parameters: parametros,
				onComplete: function(){ocultaCarga()},
				onFailure: function(resp) { 
								ocultaCarga(); 
								//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
								if ( undefined != callbackError ) {
									setTimeout(function(){
										callbackError.call(this, resp);
									}, 10); 
								} 
							},
				onException : function() {ocultaCarga()},
				onSuccess : function(resp) { 
								ocultaCarga(); 
								//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
								if ( undefined != callbackSuccess ) {
									setTimeout(function(){
										callbackSuccess.call(this, resp);	
									}, 10); 
								} 
							},
				onLoading: function() {muestraCarga()},
				encoding: 'UTF-8'
			}
		);	
  }
  
  // hacemos una versión provisional quitando el encoding hasta que encontremos una solución mejor
  function nuevaPeticionAjax(url, metodo, parametros, callbackSuccess, callbackError){
	var ajax = new Ajax.Request( 
			url, {  method:metodo,
					parameters: parametros,
					onComplete: function(){ocultaCarga()},
					onFailure: function(resp) {
									ocultaCarga(); 
									//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
									if ( undefined != callbackError ) {
										setTimeout(function(){
											callbackError.call(this, resp);
										}, 10); 
									} 
								},
					onException : function() {ocultaCarga()},
					onSuccess : function(resp) {
									ocultaCarga();
									//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
									if ( undefined != callbackSuccess ) {
										setTimeout(function(){
											callbackSuccess.call(this, resp);	
										}, 10); 
									} 
								},
					onLoading: function() {muestraCarga()},
					contentType: 'application/x-www-form-urlencoded'
				}
		);	
  }
  
  //  Función: Realiza una petición al servidor mediante Ajax sirviendose de la librería prototype
  //  Parametros: 
  //	  - url: La dirección del mapeo en struts
  //	  - metodo: Forma de envío de parámetros (get|post)
  //  	  - parametros: Parámetros a añadir en la petición {parametro1:valor1, parametro2:valor2..}
  //      - callbackSuccess: Función de retorno al terminar de ejecutar la petición
  //	  - callbackError: Función de retorno si la petición es fallida
  function peticionAjaxUpdate(url, metodo, parametros, callbackSuccess, callbackError){
	var ajax = new Ajax.Update( 
			url, {  method:metodo,
					parameters: parametros,
					onComplete: function(){ocultaCarga()},
					onFailure: function(resp) { 
									ocultaCarga(); 
									//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
									if ( undefined != callbackError ) {
										setTimeout(function(){
											callbackError.call(this, resp);
										}, 10); 
									} 
								},
					onException : function() {ocultaCarga()},
					onSuccess : function(resp) { 
									ocultaCarga(); 
									//Ponemos un delay de 10 mls para que de tiempo a ocultar la lavadora
									if ( undefined != callbackSuccess ) {
										setTimeout(function(){
											callbackSuccess.call(this, resp);	
										}, 10); 
									} 
								},
					onLoading: function() {muestraCarga()},
					encoding: 'UTF-8'
				}
		);	
  }
  
  //Función: Devuelve todos los parámetros de un formulario en un string
  //  Parametros: 
  //	  - formName: Nombre del formulario del cual queremos obtener sus parámetros
  function obtenerParametrosFormulario(formName) {
	   // Setup the return String
	   returnString = "";

	   // Get the form values
	   formElements = document.forms[formName].elements;

	   // loop through the array , building up the url
	   // in the form /strutsaction.do&name=value
	   for (var i = formElements.length - 1; i >= 0; --i) {
	      // we encode with encodeURIComponent (include special characters) each value
		   if (formElements[i].name != null && formElements[i].name != "" && formElements[i].value != "" ) {
	    	  returnString = returnString + "&" + formElements[i].name+"="+escape(formElements[i].value);
	      }
	   }

	   if (debugAjax) {
	      alert('getFormAsString: variable returnString: ' + returnString);
	   }

	   // return the values
	   return returnString;
	}
  
  // obtiene una cadena con los parámetros que se pasarán 
  // a Ajax.Update
  function obtenerParametersCamposFormularios(formNames){
	  // array que se devuelve
	  parametros = "p=p";
	  for (var i = 0; i < formNames.length; i++){
		  
		  if(document.forms[formNames[i]] != undefined && document.forms[formNames[i]] != null){
			  // obtenemos los nombres de los formularios
			  formElements = document.forms[formNames[i]].elements;
			  
			  // de cada formulario obtenemos cada campo
			  for (var j = formElements.length - 1; j >= 0; --j) {
				  if (formElements[j].name != null && formElements[j].name != ""){
					  parametros = parametros + "&" + formElements[j].name + "=" + encodeURIComponent(formElements[j].value);
				  }
			  }
		  
		  }
	  }
	  
	  return parametros;
  }
  
  
  /**
   * Se le pasa el id de la opción seleccionada en el combo y se extrae el value
   * @param combo
   */
  function obtenerValueComboMedianteId(idcombo, id){
	  var combo = document.getElementById(idcombo);
	  for (i=0;i < combo.options.length;i++) {
	       if (combo.options[i].id == id) {
	          return combo.value;
	       }
	    }
  }
  
  /** Evalua codigo javascript dada una respuesta Ajax **/
  function evaluateJSAjaxResponse(response)
  {
	  
	  script = response.replace(/<script>(.*)<\/script>/, ""); // Remove tags
	  alert(script)
	  eval(script); // Execute javascript
 
  }
  
  /** Genera un editor de texto enriquecido **/
  /** Parametros:
   * 	-modo: Esta opción especifica que los elementos se convierten en instancias del editor TinyMCE WYSIWYG. 
   * 		   Esta opción se puede ajustar a cualquiera de los siguientes valores: "textareas"|"specific_textareas"|"exact"|"none"
   * 	-tema: Esta opción le permite especificar qué tema usar al visualizarse el editor, 2 valores: "simple"|"advanced"
   * 	-soloLectura: Especifica si quiere que se inicie el editor en modo lectura o no, valores: 1 (SI), 0 (NO)
   */
  function generarEditorTextoEnriquecido(modo,tema,soloLectura){
		tinyMCE.init({
			mode : modo,
			theme : tema,
			readonly : soloLectura
		});
   }
  
//Recibe el 'id' del elemento HTML para proceder a la validación, si es correcta devuelve 'true' y sino devuelve 'false'
//Requiere del framework jQuery
  function validaDocumentoIdentificativo(a,tipoDocumento) {
    var resul = true;
    var temp = trim(jQuery('#'+a).val()).toUpperCase();
    var cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE";
    if (temp !== '') {
        //algoritmo para comprobacion de codigos tipo CIF
        suma = parseInt(temp.substring(2,3)) + parseInt(temp.substring(4,5)) + parseInt(temp.substring(6,7));
        for (i = 1; i < 8; i += 2) {
            temp1 = 2 * parseInt(temp.substring(i,i+1));
            temp1 += '';
            temp1 = temp1.substring(0,1);
            temp2 = 2 * parseInt(temp.substring(i,i+1));
            temp2 += '';
            temp2 = temp2.substring(1,2);
            if (temp2 == '') {
                temp2 = '0';
            }
            suma += (parseInt(temp1) + parseInt(temp2));
        }
        suma += '';
        n = 10 - parseInt(suma.substring(suma.length-1, suma.length));
        //si no tiene un formato valido devuelve error
        if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/.test(temp)) && !/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
            if ((temp.length == 9) && (/^[0-9]{9}$/.test(temp))) {
                var posicion = temp.substring(8,0) % 23;
                var letra = cadenadni.charAt(posicion);
                var letradni = temp.charAt(8);
                //alert("La letra del NIF no es correcta. " + letradni + " es diferente a " + letra);
                jQuery('#'+a).val(temp.substr(0,8) + letra);
                resul = false;
            } else if (temp.length == 8) {
            	if (/^[0-9]{7}[A-Z]{1}/.test(temp)){
            		temp = '0' + temp;
            		var letra = '';
            		var tipo = 'NIF';
            	} else if (/^[0-9]{1}/.test(temp)) {
                    var posicion = temp.substring(8,0) % 23;
                    var letra = cadenadni.charAt(posicion);
                    var tipo = 'NIF';
                } else if (/^[KLM]{1}/.test(temp)) {
                    var letra = String.fromCharCode(64 + n);
                    var tipo = 'NIF';
                } else if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp)) {
                    var letra = String.fromCharCode(64 + n);
                    var tipo = 'CIF';
                } else if (/^[T]{1}/.test(temp)) {
                    var letra = String.fromCharCode(64 + n);
                    var tipo = 'NIE';
                } else if (/^[XYZ]{1}/.test(temp)) {
                    var pos = str_replace(['X', 'Y', 'Z'], 0, ['0','1','2'], temp).substring(0, 8) % 23;
                    var letra = cadenadni.substring(pos, pos + 1);
                    var tipo = 'NIE';
                }
                if (letra !== '') {
                    //alert("Añadido la letra del " + tipo + ": " + letra);
                    jQuery('#'+a).val(temp + letra);
                } else {
                    //alert ("El CIF/NIF/NIE tiene que tener 9 caracteres");
                    jQuery('#'+a).val(temp);
                }
                resul = false;
            } else if (temp.length < 8) {
                //alert ("El CIF/NIF/NIE tiene que tener 9 caracteres");
                jQuery('#'+a).val(temp);
                resul = false;
            } else {
                //alert ("CIF/NIF/NIE incorrecto");
                jQuery('#'+a).val(temp);
                resul = false;
            }
        }
        //comprobacion de NIFs estandar
        if (/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
            var posicion = temp.substring(8,0) % 23;
            var letra = cadenadni.charAt(posicion);
            var letradni = temp.charAt(8);
            if (letra == letradni) {
            	// Si el tipo documento es NIF
            	if(tipoDocumento=="2"){
            		return 1;
            	}else{
            		resul = false;
            	}
                
            } else if (letra != letradni) {
                //alert("La letra del NIF no es correcta. " + letradni + " es diferente a " + letra);
                jQuery('#'+a).val(temp.substr(0,8) + letra);
                resul = false;
            } else {
                //alert ("NIF incorrecto");
                jQuery('#'+a).val(temp);
                resul = false;
            }
        }
        //comprobacion de NIFs especiales (se calculan como CIFs)
        else if (/^[KLM]{1}/.test(temp)) {
            if (temp[8] == String.fromCharCode(64 + n)) {
            	// Si el tipo documento es NIF
            	if(tipoDocumento=="2"){
            		return 1;
            	}else{
            		resul = false;
            	}
            } else if (temp[8] != String.fromCharCode(64 + n)) {
                alert("La letra del NIF no es correcta. " + temp[8] + " es diferente a " + String.fromCharCode(64 + n));
                jQuery('#'+a).val(temp.substr(0,8) + String.fromCharCode(64 + n));
                resul = false;
            } else {
                //alert ("NIF incorrecto");
                jQuery('#'+a).val(temp);
                resul = false;
            }
        }
        //comprobacion de CIFs
        else if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp)) {
            var temp_n = n + '';
            if (temp.substring(8,9) == String.fromCharCode(64 + n) || temp.substring(8,9) == parseInt(temp_n.substring(temp_n.length-1, temp_n.length))) {
            	// Si el tipo documento es CIF
            	if(tipoDocumento=="1"){
            		return 2;
            	}else{
            		resul = false;
            	}          	
            } else if (temp.substring(8,9) != String.fromCharCode(64 + n)) {
                //alert("La letra del CIF no es correcta. " + temp[8] + " es diferente a " + String.fromCharCode(64 + n));
                jQuery('#'+a).val(temp.substr(0,8) + String.fromCharCode(64 + n));
                resul = false;
            } else if (temp.substring(8,9) != parseInt(temp_n.substring(temp_n.length-1, temp_n.length))) {
                //alert("La letra del CIF no es correcta. " + temp[8] + " es diferente a " + parseInt(temp_n.substring(temp_n.length-1, temp_n.length)));
                jQuery('#'+a).val(temp.substr(0,8) + parseInt(temp_n.substring(temp_n.length-1, temp_n.length)));
                resul = false;
            } else {
                //alert ("CIF incorrecto");
                jQuery('#'+a).val(temp);
                resul = false;
            }
        }
        //comprobacion de NIEs
        //T
        else if (/^[T]{1}/.test(temp)) {
            if (temp.substring(8,9) == /^[T]{1}[A-Z0-9]{8}$/.test(temp)) {
            	// Si el tipo documento es NIE
            	if(tipoDocumento=="3"){
            		return 3;
            	}else{
            		resul = false;
            	}            
            } else if (temp.substring(8,9) != /^[T]{1}[A-Z0-9]{8}$/.test(temp)) {
                var letra = String.fromCharCode(64 + n);
                var letranie = temp.charAt(8);
                if (letra != letranie) {
                    //alert("La letra del NIE no es correcta. " + letranie + " es diferente a " + letra);
                    jQuery('#'+a).val(temp.substr(0,8) + letra);
                    resul = false;
                } else {
                    //alert ("NIE incorrecto");
                    jQuery('#'+a).val(temp);
                    resul = false;
                }
            }
        }
        //XYZ
        else if (/^[XYZ]{1}/.test(temp)) {
            var pos = str_replace(['X', 'Y', 'Z'], 0, ['0','1','2'], temp).substring(0, 8) % 23;
            var letra = cadenadni.substring(pos, pos + 1);
            var letranie = temp.charAt(8);
            if (letranie == letra) {
            	// Si el tipo documento es NIE
            	if(tipoDocumento=="3"){
            		return 3;
            	}else{
            		resul = false;
            	}     
            } else if (letranie != letra) {
                //alert("La letra del NIE no es correcta. " + letranie + " es diferente a " + letra);
                jQuery('#'+a).val(temp.substr(0,8) + letra);
                resul = false;
            } else {
                //alert ("NIE incorrecto");
                jQuery('#'+a).val(temp);
                resul = false;
            }
        }
    }
    if (!resul) {      
        return resul;
    }
}


/***************** BrowserDetect *************************************
   * 
   * 3 propiedades del objeto BrowserDetect:
   * ---------------------------------------
   * Browser name: BrowserDetect.browser
   * Browser version: BrowserDetect.version
   * OS name: BrowserDetect.OS
   * 
   * Ejemplo document.write('Estas usando ' + BrowserDetect.browser + ' ' + BrowserDetect.version + ' en ' + BrowserDetect.OS + '!');
   * 
   * Este script seguirá funcionando si regularmente se comprueba si los nuevos navegadores 
   * o versiones de los mismos siguen utilizando estas propiedades.
   * 
  **********************************************************************/

  var BrowserDetect = {
  	init: function () {
  		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
  		this.version = this.searchVersion(navigator.userAgent)
  			|| this.searchVersion(navigator.appVersion)
  			|| "an unknown version";
  		this.OS = this.searchString(this.dataOS) || "an unknown OS";
  	},
  	searchString: function (data) {
  		for (var i=0;i<data.length;i++)	{
  			var dataString = data[i].string;
  			var dataProp = data[i].prop;
  			this.versionSearchString = data[i].versionSearch || data[i].identity;
  			if (dataString) {
  				if (dataString.indexOf(data[i].subString) != -1)
  					return data[i].identity;
  			}
  			else if (dataProp)
  				return data[i].identity;
  		}
  	},
  	searchVersion: function (dataString) {
  		var index = dataString.indexOf(this.versionSearchString);
  		if (index == -1) return;
  		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  	},
  	dataBrowser: [
  		{
  			string: navigator.userAgent,
  			subString: "Chrome",
  			identity: "Chrome"
  		},
  		{ 	string: navigator.userAgent,
  			subString: "OmniWeb",
  			versionSearch: "OmniWeb/",
  			identity: "OmniWeb"
  		},
  		{
  			string: navigator.vendor,
  			subString: "Apple",
  			identity: "Safari",
  			versionSearch: "Version"
  		},
  		{
  			prop: window.opera,
  			identity: "Opera",
  			versionSearch: "Version"
  		},
  		{
  			string: navigator.vendor,
  			subString: "iCab",
  			identity: "iCab"
  		},
  		{
  			string: navigator.vendor,
  			subString: "KDE",
  			identity: "Konqueror"
  		},
  		{
  			string: navigator.userAgent,
  			subString: "Firefox",
  			identity: "Firefox"
  		},
  		{
  			string: navigator.vendor,
  			subString: "Camino",
  			identity: "Camino"
  		},
  		{		// for newer Netscapes (6+)
  			string: navigator.userAgent,
  			subString: "Netscape",
  			identity: "Netscape"
  		},
  		{
  			string: navigator.userAgent,
  			subString: "MSIE",
  			identity: "Explorer",
  			versionSearch: "MSIE"
  		},
  		{
  			string: navigator.userAgent,
  			subString: "Gecko",
  			identity: "Mozilla",
  			versionSearch: "rv"
  		},
  		{ 		// for older Netscapes (4-)
  			string: navigator.userAgent,
  			subString: "Mozilla",
  			identity: "Netscape",
  			versionSearch: "Mozilla"
  		}
  	],
  	dataOS : [
  		{
  			string: navigator.platform,
  			subString: "Win",
  			identity: "Windows"
  		},
  		{
  			string: navigator.platform,
  			subString: "Mac",
  			identity: "Mac"
  		},
  		{
  			   string: navigator.userAgent,
  			   subString: "iPhone",
  			   identity: "iPhone/iPod"
  	    },
  		{
  			string: navigator.platform,
  			subString: "Linux",
  			identity: "Linux"
  		}
  	]

  };
  BrowserDetect.init();

  

//bug#3350: controlar la tecla "backspace" salvo cuando el cursor esta en una caja de texto
window.document.onkeydown = function (e) {
	return controlaTeclas(e || window.event);
};

function controlaTeclas(event){
	if (event.keyCode == 8){
		var doPrevent=true;
		var d = event.srcElement || event.target;
		if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE')) 
			|| d.tagName.toUpperCase() === 'TEXTAREA') {
				doPrevent = d.readOnly || d.disabled;
		}
		if (doPrevent){
			return false;
		}
	}
}
/**
Posiciona la página actual arriba del todo, util para mostrar mensajes de error cuando existe scroll vertical
*/
function volverArriba(){
	jQuery('html, body').animate({scrollTop:0}, 'slow');
}
/**
Posiciona la página actual abajo del todo, util para mostrar resultado economico cuando existe scroll vertical
*/
function volverAbajo(){
	jQuery('html, body').animate({scrollTop:jQuery(document).height()}, 'slow');
}

/**
 * Devuelve el texto de una determinada celda
 * 
 * @param td
 * @returns
 */
function obtenerValorTD(td) {
    if(td.text() != undefined)
        return td.text();
    else
        return (td.children && td.children.length > 0) ? td.children[0].html() : td.html();
}

/**
 * 
 * Asigna el foco en el frame del árbol al elemento cuya propiedad nombre es 'foco' lo que hace que el scroll se posicione en el elemento
 * 
 * @param margenAnterior Espacio que se deja antes del elemento para que no se quede el scroll pegado al elemento
 */
function asignarFocoEnArbol(margenAnterior){
	var elementoFoco = jQuery("input[name='foco']");
	var elementoPadre = elementoFoco.parent().parent();
	var postion = elementoPadre.position();
	var offset = position ? position.top : 0;
	jQuery(document).scrollTop(offset - margenAnterior);
}

function limpiarCombo(idCombo){
	var object = jQuery("#"+idCombo);
	object.html('<option value=""></option>');
}

//Función para validar uno o varios emails separados por ;
function validaEmail(email) {
	var result = false;
	var re = /\S+@\S+\.\S+/;
	result = re.test(email);
	
    return result; 
}

// Función para seleccionar opción por defecto del combobox pasado como parámetro
function seleccionarValorCombo(comboName, defaultValue){
	if(jQuery("select[name*='"+comboName+"']").val() != undefined && jQuery("select[name*='"+comboName+"']").prop("disabled") == false){
		document.getElementById(comboName).selectedIndex = defaultValue;
	}
}  

//Función para validar uno o varios teléfonos (fijos o móviles) separados por ;
function validaTelefono(telefono) {
	var result = false;
	var re = /^[6|7|8|9]\d{8}$/;
	result = re.test(telefono);
	
  return result; 
}

//Función para validar uno o varios móviles separados por ;
function validaMovil(movil) {
	var result = false;
	var re = /^[6|7]\d{8}$/;
	result = re.test(movil);
	
  return result; 
}

//Función para lanzar ventana emergente hacia aplicación externa
function lanzarVentanaIFrame(pPage, width, heigth) {
	var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+heigth+"px, scrollbars=auto";
	var urlAppExterna = '<!doctype html>';
	urlAppExterna += '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
	urlAppExterna += '<iframe name="appExterna" width="'+width+'" height="'+heigth+'" src="'+pPage+'" frameborder="0"></iframe>';
	var win = window.open('','appExterna', args);
    win.document.write(urlAppExterna);
    win.location.reload();
    return false;
}

function validaFechaNacimiento(fecha) {
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	var fechaActual = dd + "/" + mm + "/" + yyyy;
	
	if (new Date(fecha) > new Date(fechaActual)) {
		alert("La fecha de nacimiento no puede ser posterior a la fecha actual");
		return false;
	}
	
	return true;
}

/**
 * Habilitamos o deshabilitamos el elemento de tipo link.
 * @param id. Identificador del elemento
 * @param valor. Valores true/false para habilitar o deshabilitar el elemento
 */
function habilitarLink(id, valor) {
	/*if (jQuery && jQuery("#"+id)) {
		jQuery("#"+id).attr("disabled", !valor);
	} else {
		setAttribute(id, "disabled", !valor);
	}*/
	
	if ( (top.window.frames['iAgenda']) && (top.window.frames['iAgenda'].document) ) {
		var elt = top.window.frames['iAgenda'].document.getElementById(id);
		if (elt) {
			with (elt) {
				onclick = (valor ? "" : function() { return false;} );
			}
		}
	} 
}


/**
 * Habilitamos o deshabilitamos el elemento.
 * @param id. Identificador del elemento
 * @param valor. Valores true/false para habilitar o deshabilitar el elemento
 */
function habilitarElemento(id, valor) {
	if (jQuery && jQuery("#"+id)) {
		jQuery("#"+id).attr("disabled", !valor);
	} else {
		setAttribute(id, "disabled", !valor);
	}
}

function deshabilitaBotonesGuardar() {
	if (habilitarElemento) {
		habilitarElemento('botonGuardar', false);
		habilitarElemento('botonSiguiente', false);
	}
}

function buscar() {
	if (document && document.forms[0]) {
		if (document.forms[0].pagina) {
			document.forms[0].pagina.value = 1;
		}
		// Ejecución de la acción
		submitForm(document.forms[0], null, targetFrameDefault);
	}
 }

function isVisible(id) {
    var element = jQuery("#"+id);
    return (element.css('display') !== 'none' && element.css('visibility') !== 'hidden' && element.css('opacity') !== 0);
}

/**
 * Método que debe de usarse obligatoriamente para todos los ficheros GIMS que
 * contengan algún formulario.
 * <p>
 * Este método se encarga de inicializar los efectos de Boostrap Material Design
 * (BMD) y funciones personalizadas que se han desarrollado.
 */
function initializeFunctionsDesign() {
	// Cargar efectos BMD. 
	jQuery('body').bootstrapMaterialDesign(); 
	
	// Efectos en ComboBox.
	stateBeginComboBox();
	// Mostrar o oculatar contenedores.
	showTableEtica();
	showContainerEticaResult();
}

/**
 * Corrige el bug que tiene Bootstrap Material Design (BMD) cuando muestra por
 * ComboBox por primera vez. La función consiste en verificar que la opción
 * seleccionada no contiene texto y de ser así, quitar la clase que realiza el
 * efecto que subir el label.
 * <p>
 * Agrega evento de cambio de imagen (Cambia color) al desplegar ComboBox.
 */
function stateBeginComboBox() {
	if (jQuery('.container-etica-combobox > select option:selected').text().length == 0) {
		// Remover clase de BMD.
		jQuery('.container-etica-combobox').removeClass('is-filled');
	}
	
	// Efecto de cambio de imagen de flecha hacia abajo
	var idImg = "#imgDropdownCombobox";
	var srcStart = "img/bootstrap/iconos/32px/triangle_bottom_grey.png";
	var srcFinal = "img/bootstrap/iconos/32px/triangle_bottom.png";
	
	jQuery('.container-etica-combobox > select').on('focus', function(){
		changeImage(idImg, srcStart, srcFinal);
	});
	jQuery('.container-etica-combobox > select').on('blur', function(){
		changeImage(idImg, srcStart, srcFinal);
	});
}

/**
 * Método complementario al método "limpiar" que quita la clase de BMD
 * "is-filled" para que los labels vuelvan a su estado original.
 * <p>
 * Si tiene el spinner activo, lo desactivamos.
 * 
 * @param form
 *            Formulario que se limpia.
 */
function cleanForm() {
	// Quitar clase de contenedores.
	jQuery('.form-etica .form-group').removeClass('is-filled');
	
	// Desactivar spinner si está activo.
	setVisivilityCargaComun('divGeneral', false);
}

/**
 * Realiza el cambio de una imagen por otra. Necesitamos pasarle las rutas de
 * las imágenes tal cual están ubicadas dentro del proyecto.
 * <p>
 * Este método se encaga de obtener el cotexto en el que está para poder cambiar
 * la imagen de forma correcta.
 * 
 * @param idImg
 *            El id del TAG img.
 * @param srcStart
 *            Ruta de la imagen dentro del proyecto que contiene al inicio, por
 *            ejemplo: "img/bootstrap/inicio.png"
 * @param srcFinal
 *            Ruta de la imagen dentro del proyecto por la que deseamos cambiar,
 *            por ejemplo: "img/bootstrap/final.png"
 */
function changeImage(idImg, srcStart, srcFinal) {
	var path = jQuery(idImg).attr('src');
	var contextPath = path.substring(0, path.indexOf('img'));
	var proyectPath = path.substring(path.indexOf('img'), path.length);
	
    if (proyectPath == srcStart) {
    	jQuery(idImg).attr('src', contextPath.concat(srcFinal));
    } else {
    	jQuery(idImg).attr('src', contextPath.concat(srcStart));
    }
}

/**
 * Muestra u oculta el contenedor que contiene los resultados de una búsqueda.
 * <p>
 * Tenemos que tener en cuenta que la tabla que se defina dede tener las nuevas
 * clases correspondientes, ya que está ligada al método "showTableEtica()",
 * también tenemos que seguir la nueva estructura para cuando no hay resultados
 * de la búsqueda.
 */
function showContainerEticaResult() {
	// Verificar si el contenedor tiene datos. 
	if (jQuery('.container-etica-result .container-etica-data table').length == 0
			&& jQuery('.container-etica-result .container-etica-data div').length == 0) {
		jQuery('.container-etica-result').addClass('hidden');
	} else {
		// Si contiene contenido, mostramos contenedor.
		jQuery('.container-etica-result').removeClass('hidden');
	}
}

/**
 * Muestra u oculta la estrucutra completa de un tabla (El tag TABLE debe tener
 * la clase ".table" y ".table-etica"). Casos:
 * <ul>
 * <li>Si contiene datos, se muestra cabeceras y datos.</li>
 * <li>Si no tiene datos, se oculta cabeceras.</li>
 * </ul>
 */
function showTableEtica() {
	if (jQuery('.table.table-etica tbody tr').length == 0) {
		jQuery('.table.table-etica').addClass('hidden');
	} else {
		jQuery('.table.table-etica').removeClass('hidden');
	}
}

/**
 * Limpia los espacios de inicio y fin del valor introducido por el usuario, una
 * vez limpio, se pasa a mayúsculas y asignárselo al mismo input.
 * 
 * @param input
 *            Objeto que se envía desde el propio INPUT que invoca este método.
 */
function capitalizeValue(input) {
	var object = jQuery(input);
	
	if (object.length > 0) {
		var newValue = jQuery.trim(object.val());
		// Asignar valor en mayúsculas.
		object.val(newValue.toUpperCase());
	}
}


