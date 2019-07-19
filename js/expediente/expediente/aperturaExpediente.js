/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA APERTURA DE EXPEDIENTE
 */


 /* Funcion para cancelar el expediente */
 function cancelarExpediente(msg, url, target,accionAgenda) {
  if(msg == null)   {
    getPage(url, target);
    return;
  } else {
    if (confirm(msg)) {
      muestraCarga();
      getPage(url, target);
      // agenda & menu
      menuAgenda(accionAgenda);
    }
  }
 }
   
 /* Funcion para cancelar el expediente */
 function cancelarExpedienteExpandido(msg, url, target,accionAgenda) {
  if(msg == null)   {
    getPage(url, target);
    return;
  } else {
    if (confirm(msg)) {
      getPage(url, target);
      
      // desplegar agenda
 	  top.plegar("cAgenda");

 	  
      // agenda & menu
      menuAgenda(accionAgenda);
    }
  }
 }
   
  /* Funcion para cancelar la consulta del expediente */
  function cancelarConsultaExpediente(url, target,accionAgenda) {
    
    getPage(url, target);
      
    // agenda & menu
    menuAgenda(accionAgenda);
 }
    
 /* Funcion para grabar los datos y salir del expediente */
 function grabarExpediente(formulario, funValidar, target, msg, accionAgenda) {
  var validado = validaForm(formulario,funValidar,target);
   if(validado){
     if (confirm(msg)) {
       
       muestraCarga();
       formulario.submit();
       // agenda & menu
       menuAgenda(accionAgenda);    
    }
  }	
 }   
 
 /* Funcion para mostrar de menu de la izquierda y recargar la agenda */
 function menuAgenda(accionAgenda){
    
    // se elimina la lavadora
    parent.document.getElementById('divGeneral').style.visibility = 'hidden';
    
    // se muestra el menu
	if(top.menuPlegado)  {
      top.plegar('cMenuArea');
    }
    
    top.controlArbolExpediente();
    
    //cambia el iframe derecho de la pagina principal para que aparezca la agenda de nuevo 
    var localizacion = "" + window.parent.frames[2].location;
    var indice = localizacion.indexOf('monitor');
    if (indice > -1) {
	  window.parent.frames[2].location = accionAgenda;
	  top.window.document.getElementById("agTituloGif").src = top.window.imgAgTitulo.src;
	}
 }
 
 /* Funcion para actualizar los checks del conductor */
 function actualizarCheckConductor(swConductor, swOtroConductor){
   if (window.frames['iTabContent'].document.getElementById('cbConductor') != null &&
   	   window.frames['iTabContent'].document.getElementById('cbConductor') != undefined){
	  if(swConductor == "1"){
	    window.frames['iTabContent'].document.getElementById('cbConductor').checked = true;
	  } else{
	    window.frames['iTabContent'].document.getElementById('cbConductor').checked = false;
	  }
  }
  if (window.frames['iTabContent'].document.getElementById('cbOtroConductor') != null &&
   	   window.frames['iTabContent'].document.getElementById('cbOtroConductor') != undefined){
	  if(swOtroConductor == "1"){
	    window.frames['iTabContent'].document.getElementById('cbOtroConductor').checked = true;
	  } else{
	    window.frames['iTabContent'].document.getElementById('cbOtroConductor').checked = false;
	  }
  }
 }
 
 /* Funcion para actualizar los checks del conductor */
 function checkearConductor(swConductor, swOtroConductor){
 	if(swConductor == "1"){
		  document.getElementById('swConductor').checked = true;
	} else{
		  document.getElementById('swConductor').checked = false;
	}
 	
 	if(swOtroConductor == "1"){
		  document.getElementById('swOtroConductor').checked = true;
		} else{
		  document.getElementById('swOtroConductor').checked = false;
		}
		
 }
      
 /* Funcion para recoger un elemento de un array */
 function setValueLst(element, value) {

   	if(value != null){
   	 for(var i=0; i<value.length;i++){
   	   document.getElementById(element).value = value[i];
     }   	
   	}
 }

 /* Funcion para recoger un elemento de un array */
 function setLstValueLst(element, value) {

   	if(value != null){
   	 for(var i=0; i<value.length;i++){
   	   element[i].value = value[i];
     }   	
   	}
 }

  //Funcion que limpia todas las cajas de texto de la pantalla y las habilita
  function limpiarCombos(form, camposNoTocar) {
    	
    	limpiar(form, camposNoTocar);
    	
    	var elementos = form.elements;
    	for(var i= 0;i < elementos.length; i++){
	        
	        if ((elementos[i].type == "text" && elementos[i].disabled == true)|| 
		        (elementos[i].type == "select-one" && elementos[i].disabled == true)){
	    		elementos[i].disabled = false;
	    	}
    	}
    } 
        
 /* Funcion para limpiar los datos de caracter personal */
 function limpiarDatosPersonales(form,idPersona,tlfno1,tlfno2,tlfno3,email,fax){
    
    var id = document.getElementById(idPersona).value;
    if (id != ""){
    	// solo se limpian los telefonos & emails
    	document.getElementById(tlfno1).value = "";
    	document.getElementById(tlfno2).value = "";
    	document.getElementById(tlfno3).value = "";
    	document.getElementById(email).value = "";
    	document.getElementById(fax).value = "";
    }
    else limpiarCombos(form);
 }
    
  /* Funcion que habilita el nro de identificacion */
  function habilitarIdentificacion(pObjeto){
  	document.getElementById(pObjeto).disabled = false;	
  }     
     
 /* Funcion para la busqueda de las localidades */
 function busquedaLocalidad(pag, provincia, codPostal, localidad) {
  var valor = lanzarVentana(pag,600,500);

  if (valor != undefined) {
    if (codPostal != null) {
      setValue(codPostal,valor[0]);
    }
    if (localidad != null) {
      setValue(localidad, valor[1]);
    }
    if (provincia != null) {
      setValue(provincia,valor[2]);
    }
  }
 }

 /* Funcion para la busqueda de las personas */
 function busquedaPersona(pag, idPersona, tipoIdent, numIdent, nombre, primerApell, segundoApell, tipoPns) {
  var valor = lanzarVentana(pag,600,400);

  if(valor != undefined) {
    if(idPersona != null) {
      setValue(idPersona, valor[0]);
    }
    if(numIdent != null) {
      setValue(numIdent, valor[1]);
    }
    if(nombre != null) {
      setValue(nombre,valor[2]);
    }
    if(tipoIdent != null) {
      setValue(tipoIdent,valor[8]);
    }
    if(primerApell != null) {
      setValue(primerApell,valor[4]);
    }
    if(segundoApell != null) {
      setValue(segundoApell,valor[5]);
    }
    if(tipoPns != null){
      setValue(tipoPns,valor[3]);	
    }
  }
  return valor;
 }

 /* Funcion para seleccionar un determinado valor en un combo */
 function seleccionarCombos(pObjeto, pValue, form) {
  for (var i = 0; i < form.elements[pObjeto].length; i++) {
    if (form.elements[pObjeto].options[i].text == pValue) {
      form.elements[pObjeto].options[i].selected = true;
    }
  }
 }

 /* Funcion para seleccionar un determinado valor en un combo */
 function seleccionarCombosIndice(pObjeto, pIndex, form) {
  for (var i = 0; i < form.elements[pObjeto].length; i++) {
    if (form.elements[pObjeto].options[i].value == pIndex) {
      form.elements[pObjeto].options[i].selected = true;
    }
  }
 }
 
 /* Funcion para mostrar/ocultar las barras de operaciones */
 function controlBarraOperaciones(visible, pObjeto) {
  if (visible == 0) {
    document.getElementById(pObjeto).disabled = true;
    document.getElementById('eObservaciones').disabled = true;
  } else {
    document.getElementById(pObjeto).disabled = false;
  }
 }

 /* Funcion para mostrar los datos del abogado */
 function mostrarAbogado(form,cBObjeto, pObjeto) {
  var mostrar = form.elements[cBObjeto].options[form.elements[cBObjeto].selectedIndex].text;
  if(mostrar == "SI") {
    showHide(pObjeto,true);
  } else {
    showHide(pObjeto,false);
  }
 }

 /* Funcion para habilitar campos tras marcar un check */
 function habilitaCampoCheck(pObjeto,nameText) {
  if(pObjeto.checked == true){
    document.getElementById(nameText).disabled = false;
  } else {
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  }
 }
 
 /* Funcion para habilitar campos tras marcar un check */
 function habilitaCampoOcultoCheck(pObjeto,divName,nameText) {
  if(pObjeto.checked == true){
    showHide(divName, true);
    document.getElementById(nameText).disabled = false;
  } else {
    showHide(divName, false);
    document.getElementById(nameText).disabled = true;
  }
 } 
 
 /* Funcion para gestion de la seleccion de las garantias */
 function gestionGarantias (valor, pObjeto){

   switch(valor){
     case 0:
       /* dannios propios */
       if(pObjeto.checked == true){
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
         showHide('divTipoDanno',true);	
         
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);	
       
       }else{
         showHide('divTipoDanno', false);	      
       }
     break;

     case 1:
       /* incendio */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
      
         showHide('divTipoIncendio',true);	
         showHide('divTipoDanno',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);	
       
       }else{
         showHide('divTipoIncendio',false);      
       }
     break;

     case 2:
       /* robo */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
         
         showHide('divTipoRobo',true);	
         showHide('divTipoDanno',false);
         showHide('divTipoIncendio',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);
       
       }else{
         showHide('divTipoRobo',false);      
       }
     break;
     
     case 3:
       /* lunas */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
      
         showHide('divTipoLuna',true);	
         showHide('divTipoDanno',false);	
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);
       
       }else{
         showHide('divTipoLuna',false);      
       }
     break;
     
     case 4:
       /* asistencia viaje */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
         
         showHide('divTipoDanno',false);	
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);	
       
       }
     break;
     
     case 5:
       /* multas */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
		 document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
      
         showHide('divTipoDanno',false);	
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     showHide('divTipoAcont',false);
       
       }
     break;
     
     case 6:
       /* perdida puntos */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swAcontExtra').checked = false;
         document.getElementById('swAcontExtraswAcontExtra_').value = '0';
      
         showHide('divTipoPdaPtos',true);
         showHide('divTipoDanno',false);	
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoAcont',false);
       
       }else{
         showHide('divTipoPdaPtos',false);     
       }
     break;
     
     case 7:
       /* acontecimientos extraordinarios */
       if(pObjeto.checked == true){
         document.getElementById('swDannosPropios').checked = false;
         document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
         document.getElementById('swIncendio').checked = false;
         document.getElementById('swIncendioswIncendio_').value = '0';
         document.getElementById('swRobo').checked = false;
         document.getElementById('swRoboswRobo_').value = '0';
         document.getElementById('swLunas').checked = false;
         document.getElementById('swLunasswLunas_').value = '0';
         document.getElementById('swAsistenciaViaje').checked = false;
         document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
         document.getElementById('swMultas').checked = false;
         document.getElementById('swMultasswMultas_').value = '0';
         document.getElementById('swPerdidaPuntos').checked = false;
         document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
         
         showHide('divTipoAcont',true);
         showHide('divTipoDanno',false);	
         showHide('divTipoIncendio',false);
	     showHide('divTipoRobo',false);
	     showHide('divTipoLuna',false);	
	     showHide('divTipoPdaPtos',false);
	     
       }else{
         showHide('divTipoAcont',false);      
       }
     break;                         
   }  
 }
 
 
  /* Funcion para gestion de la seleccion de las garantias */
 function gestionSinGarantias (){

   // se anulan todos los valores de las garantias
   document.getElementById('swDannosPropios').checked = false;
   document.getElementById('swDannosPropiosswDannosPropios_').value = '0';
   document.getElementById('swIncendio').checked = false;
   document.getElementById('swIncendioswIncendio_').value = '0';
   document.getElementById('swRobo').checked = false;
   document.getElementById('swRoboswRobo_').value = '0';
   document.getElementById('swLunas').checked = false;
   document.getElementById('swLunasswLunas_').value = '0';
   document.getElementById('swAsistenciaViaje').checked = false;
   document.getElementById('swAsistenciaViajeswAsistenciaViaje_').value = '0';
   document.getElementById('swMultas').checked = false;
   document.getElementById('swMultasswMultas_').value = '0';
   document.getElementById('swPerdidaPuntos').checked = false;
   document.getElementById('swPerdidaPuntosswPerdidaPuntos_').value = '0';
   document.getElementById('swAcontExtra').checked = false;
   document.getElementById('swAcontExtraswAcontExtra_').value = '0';  
 }
 
 /* Funcion para gestion de la seleccion de las garantias */
 function controlGarantiasSeleccionadas (){
   
   var checkGarantia = false;
   
   if(document.getElementById('swDannosPropios').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swIncendio').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swRobo').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swLunas').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swAsistenciaViaje').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swMultas').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swPerdidaPuntos').checked == true){
     checkGarantia = true;
   }
   if(document.getElementById('swAcontExtra').checked == true){
     checkGarantia = true;
   }                    
    
   return checkGarantia; 
 } 
 
 /* Funcion para comprobar que han sido introducidos los datos del propietario vehiculo contrario */
 function validarPropietarioContrario(form, errorNombre, errorRazon){
 
   var valor = true;
   var idTipoIdentificacion = form.idTipoIdentificacionA.value;
   if(idTipoIdentificacion == 1){
     var razonSocial = form.razonSocialA.value;
     if((razonSocial == "") || (razonSocial == null)){
       valor = false;
       alert(errorRazon);
     }
   }
   else{
     var nombre = form.nombreA.value;
     if((nombre == "") || (nombre == null)){
       valor = false;
       alert(errorNombre);
     }
   }
   return valor;
 }
 
 /* Funcion para comprobar que los datos del conductor del vehiculo contrario son correctos */
 function comprobarDatosConductorContario(form){
   
   var flag = form.flagPns.value;
   var validado = validateDatosConductorForm(form);

   if((flag == 'true') && (validado == true)){
   	 return true;
   }
   return false;
 }
 
 /* Funcion para comprobar que los datos del conductor del vehiculo contrario son correctos */
 function comprobarDatosPropietarioContario(form, errorNombre, errorRazon){
   
   var flag = form.flagPns.value;
   var validado = validarPropietarioContrario(form, errorNombre, errorRazon);
   
   if((flag == 'true') && (validado == true)){
	 return true;
   }
   return false;
 } 
 
  /* Funcion para el control del 2 checks como un radio button: cuando se carga la pagina*/
 function habilitarDanniosContr(valor1, pObjeto1,nameText1, valor2,pObjeto2, nameText2) {
  if(valor1 == 1){
    // se habilita pObjeto1
    document.getElementById(pObjeto1).checked = true;
    document.getElementById(nameText1).disabled = false;
    
    // se deshabilita pObjeto2
    document.getElementById(pObjeto2).checked = false
    document.getElementById(nameText2).value = "";
    document.getElementById(nameText2).disabled = true;
  }else{
    // se deshabilita pObjeto1
    document.getElementById(pObjeto1).checked = false
    document.getElementById(nameText1).value = "";
    document.getElementById(nameText1).disabled = true; 
    
    if(valor2 == 1){
      // se habilita pObjeto2
      document.getElementById(pObjeto2).checked = true;
      document.getElementById(nameText2).disabled = false;
    }else{
      // se deshabilita pObjeto2
      document.getElementById(pObjeto2).checked = false
      document.getElementById(nameText2).value = "";
      document.getElementById(nameText2).disabled = true;      
    }      
  }
 }
  
  /* Funcion para el control del 2 checks como un radio button*/
 function activarSeleccionCheck(pObjeto1,nameText1, pObjeto2, nameText2) {
  if((pObjeto1.checked == false) && (pObjeto2.checked == false)){
    document.getElementById(nameText1).value = "";
    document.getElementById(nameText1).disabled = true;
  
    document.getElementById(nameText2).value = "";
    document.getElementById(nameText2).disabled = true;
  }
  
  if(pObjeto1.checked == true){
    document.getElementById(nameText1).disabled = false;
    
    // se deshabilita el otro check
    document.getElementById(pObjeto2).checked = false
    document.getElementById(nameText2).value = "";
    document.getElementById(nameText2).disabled = true;
  }else{
    document.getElementById(nameText1).value = "";
    document.getElementById(nameText1).disabled = true;  
  } 
  
  
  if(pObjeto2.checked == true){
    document.getElementById(nameText2).disabled = false;
    
    // se deshabilita el otro check
    document.getElementById(pObjeto1).checked = false
    document.getElementById(nameText1).value = "";
    document.getElementById(nameText1).disabled = true;
  } else{
    document.getElementById(nameText2).value = "";
    document.getElementById(nameText2).disabled = true;    
  } 
 }

 /* Funcion para habilitar campos tras seleccionar SI de un combo */
 function habilitaCampoCombo(form,pObjeto,nameText) {
  var mostrar = form.elements[pObjeto].options[form.elements[pObjeto].selectedIndex].text;
  if(mostrar == "SI") {
    document.getElementById(nameText).disabled = false;
  } else {
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  }
 }
 
 /* Funcion para habilitar campos tras seleccionar un valor de un combo (SI/NO) */
 function habilitaCampoComboValue(form,pObjeto, valueObjeto, nameText) {
  var mostrar = form.elements[pObjeto].options[form.elements[pObjeto].selectedIndex].value;
  if(mostrar == valueObjeto) {
    document.getElementById(nameText).disabled = false;
  } else {
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  }
 }
  
 /* Funcion para poner a true un flag*/
 function flagTrue(pObjeto) {
  pObjeto.value = true
 }


 /* Funcion para validar el email */
 function validarEmail(form,validar){
  validaForm(form,validar,'iAreaTrabajo');
 }

 /* Funcion para validar el telefono */
 function validarTelefono(form,validar){
  //alert("validando telefono...");
  validaForm(form,validar,'iAreaTrabajo');
 }

 /* Funcion para actualizar las listas */
 function actualizarLst(pObjeto,numObjetos){
   if(pObjeto.checked == true){
      numObjetos++;
   }
   else {
      numObjetos--;
   }
   return numObjetos;
 }
 
 /* Funcion para desactivar los datos de los conductores */
 function desactivarConductores(conductor,otro,otroConductor){
  conductor.disabled = true;
  otro.disabled = true;
  otroConductor.disabled = true;
 }

 /* Funcion para activar los datos de los conductores */
 function activarConductores(conductor,otro,otroConductor){
  conductor.disabled = false;
  otro.disabled = false;
  otroConductor.disabled = false;
 }


 /* Funcion para comprobar si se han seleccionado los da?os del vehiculo */	
 function comprobarDanioSeleccionados(form,daniosGrales){
  if((document.getElementById('swDannoGral').checked == true) || (document.getElementById('swLunas').checked == true) || (document.getElementById('swNeumaticos').checked == true)){   
	// se comprueba q se ha seleccionado alguna seccion
	for (var i =1; i< form.daniosSeleccionados.length; i++){
	  if(form.daniosSeleccionados[i].value == "1"){
		daniosGrales = 1;
	  }	
	}	
  }
  else daniosGrales = 1;
  return daniosGrales;
 }
	  

 /* Funcion para actualizar una determinada circunstancia de la DAA */	  
 function comprobarCircuns(pCircun, pCircunA, pCircunB){
   
   if(pCircun.value == "1"){
     // se ha seleccionado solo la circunstancia A
     pCircunA.checked = true;
     pCircunB.checked = false;
   }
   else if(pCircun.value == "2"){
   	 // se ha seleccionado solo la circunstancia B
   	 pCircunA.checked = false;
   	 pCircunB.checked = true;
   }
   else if(pCircun.value == "3"){
     // se han seleccionado las circunstancias A y B
     pCircunA.checked = true;
     pCircunB.checked = true;
   }
   else {
     // no se ha seleccionado ni la circunstancia A ni la circunstancia B
   	 pCircunA.checked = false;
   	 pCircunB.checked = false;
   }
 }	  
	   
 /* Funcion para la pantalla emergente de observaciones */
 function altaObservaciones(pag, pag2) {
  // abrimos la ventana de observaciones
  var valor = lanzarVentana(pag, 600,500);
  if (valor != undefined && valor != null && valor != 0){
  	document.getElementById("linkObservaciones").className = "operacionesContenido";
  }else{
  	document.getElementById("linkObservaciones").className = "operaciones";
  }
  
  //Se recarga el iframe oculto para que a su vez recarge el arbol
  pag2 = pag2 + '&swConsulta=';
  pag2 = pag2 + '&swModoConsulta=';
  pag2 = pag2 + '&modificacion=';
  top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2; 
 } 

 /* Funcion que aumenta n dias a una fecha dada como parametro */
 function aumentaDiasFecha(fecha, numDias){
	// pasaremos la fecha a formato mm/dd/yyyy 
	var fec=fecha.split('/');
	fec=fec[1]+'/'+fec[0]+'/'+fec[2]; 
	var fechaAumentada=new Date(fec); 
	fechaAumentada.setTime(fechaAumentada.getTime()+numDias*24*60*60*1000);
	var mes=fechaAumentada.getMonth()+1; 
	if(mes<=9) mes='0'+mes; 
	var dia = fechaAumentada.getDate();
	if (dia<=9) dia='0'+dia;
	return dia+'/'+mes+'/'+fechaAumentada.getFullYear();
 } 
	 
  /* Funcion para la pantalla emergente de testigos */
 function enlaceObservacionesConsulta (pag, idObjeto, tipoObjeto, valorSi) {
  
  pag = pag + '?idObjVinculado='+idObjeto;
  pag = pag + '&objObservacion='+tipoObjeto;
  pag = pag + '&swConsulta='+ valorSi;
  top.window.frames[1].document.location = pag;
} 
 
 /* Funcion para la consulta de las observaciones */
 function consultarHcoObservaciones(action, idObjeto, tipoObjeto){
   
   action = action + '?pagina=0';
   action = action + '&idObjVinculado='+idObjeto;
   action = action + '&objObservacion='+tipoObjeto;
   getPage(action);
 }
 
 
 /* Funcion para la pantalla emergente de recibos afectados */
 function consultaRecibosAfectados(pag, tipoExp) {
  // el expediente es de tipo autos
  pag = pag +"?objExpediente="+tipoExp;
    
  // abrimos la ventana de observaciones
  lanzarVentana(pag, 700,400);
 }
 
 /* Funcion para la pantalla de introducir datos taller */
 function comprobarPeritaje(pObjeto, form, pag, enlaceBH, pagAsigProf, pagReload){
  var valor = null;
  if(enlaceBH == false){ 
    var peritar = form.elements[pObjeto].options[form.elements[pObjeto].selectedIndex].text;
    if (peritar == "SI") {
      valor = lanzarVentana(pag, 800,550);
      
      // si se han informado todos los datos, asignacion profesionales
      if(valor == true){
        lanzarVentana(pagAsigProf, 800, 620);
      }
    }
  }else{
     valor = lanzarVentana(pag, 800,400);
  }
  
  if (valor != undefined && valor != null && valor != 0){
	 document.getElementById("linkEncargos").className = "operacionesContenido";
	 document.getElementById("linkTalleres").className = "operacionesContenido";
  }else{
	 document.getElementById("linkEncargos").className = "operaciones";
	 document.getElementById("linkTalleres").className = "operaciones";
  }

  //Se recarga el iframe oculto para que a su vez recarge el arbol
  pagReload = pagReload + '&swConsulta=';
  pagReload = pagReload + '&swModoConsulta=';
  pagReload = pagReload + '&modificacion=';
  top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pagReload;
 }
 
 /* Funcion para la consulta de los datos del encargo */
 function pestannaEncargoModoConsulta(){
   
   document.getElementById('encargoView.idTipoEncargo').disabled = true;
   document.getElementById('encargoView.idMedioEnvioEncargo').disabled = true;
   document.getElementById('encargoView.estimacionEncargo').disabled = true;
   document.getElementById('encargoView.fecLimiteEncargo').disabled = true;
   //document.getElementById('encargoView.observacion').disabled = true;
   document.getElementById('idLugarEncargo').disabled = true;
   
   // lugar encargo
   document.getElementById('nombreEncargo').disabled = true;
   document.getElementById('datosUbicacionEncargo.tipoVia.id').disabled = true;
   document.getElementById('datosUbicacionEncargo.via').disabled = true;
   document.getElementById('datosUbicacionEncargo.numeroVia').disabled = true;
   document.getElementById('datosUbicacionEncargo.bloque').disabled = true;
   document.getElementById('datosUbicacionEncargo.piso').disabled = true;
   document.getElementById('datosUbicacionEncargo.puerta').disabled = true;
   document.getElementById('datosUbicacionEncargo.pais.id').disabled = true;
   document.getElementById('datosUbicacionEncargo.codPostal').disabled = true;
   document.getElementById('datosUbicacionEncargo.localidad').disabled = true;   
   document.getElementById('datosUbicacionEncargo.provincia.id').disabled = true;
   document.getElementById('telefono1Encargo.telefono').disabled = true;
   document.getElementById('telefono2Encargo.telefono').disabled = true;   
   document.getElementById('telefono3Encargo.telefono').disabled = true;
         
   // tb las imagenes
   document.getElementById('calenFecLimiteEncargo').disabled = true;
   //document.getElementById('imgBusqLugarEncargo').disabled = true;
   //document.getElementById('btLimpiarLugarEncargo').disabled = true;   
 }
 
  /* Funcion para la consulta de los datos del encargo */
 function pestannaEncargoModoModificacionDatos(){
   
   document.getElementById('encargoView.idMedioEnvioEncargo').disabled = false;
   document.getElementById('encargoView.estimacionEncargo').disabled = false;
   document.getElementById('encargoView.fecLimiteEncargo').disabled = false;
   document.getElementById('calenFecLimiteEncargo').disabled = false;
   //document.getElementById('encargoView.observacion').disabled = false;
   //document.getElementById('idLugarEncargo').disabled = false;
   document.getElementById('encargoView.swCompromisoPago').disabled = false;
   
   //window.parent.document.getElementById('encargoView.fecRealizacionEncargo').disabled = false;
   //window.parent.document.getElementById('btnFechaEncargo').disabled = false;
 
 }
 
 /* Funcion para la modificacion de los datos del lugar de realizacion del encargo */
 function realizacionModoModificacionDatos(){
   
   document.getElementById('idLugarEncargo').disabled = false;
   document.getElementById('nombreEncargo').disabled = false;
   document.getElementById('datosUbicacionEncargo.tipoVia.id').disabled = false;
   document.getElementById('datosUbicacionEncargo.via').disabled = false;
   document.getElementById('datosUbicacionEncargo.numeroVia').disabled = false;
   document.getElementById('datosUbicacionEncargo.bloque').disabled = false;
   document.getElementById('datosUbicacionEncargo.piso').disabled = false;
   document.getElementById('datosUbicacionEncargo.puerta').disabled = false;
   document.getElementById('datosUbicacionEncargo.pais.id').disabled = false;
   document.getElementById('datosUbicacionEncargo.codPostal').disabled = false;
   document.getElementById('datosUbicacionEncargo.localidad').disabled = false;
   document.getElementById('datosUbicacionEncargo.provincia.id').disabled = false;
   document.getElementById('telefono1Encargo.telefono').disabled = false;
   document.getElementById('telefono2Encargo.telefono').disabled = false;
   document.getElementById('telefono3Encargo.telefono').disabled = false;
 }
 
 
  /* Funcion para la consulta de los datos del encargo */
 function pestannaProfesionalModoConsulta(flag){
   
   document.getElementById('imgBusqProf').disabled = flag;
   document.getElementById('btLimpiarProf').disabled = flag;   
 }
 
  /* Funcion para limpiar los campos de los talleres/profesionales */
  function limpiarDatosModificarPsn(pId,form){
    if (pId != ""){
    	// solo se limpian los telefonos & emails
    	document.getElementById('telefono1.telefono').value = "";
    	document.getElementById('telefono2.telefono').value = "";
    	document.getElementById('telefono3.telefono').value = "";
    	document.getElementById('email.email').value = "";
    	document.getElementById('fax.telefono').value = "";
    }
    else{
      limpiarCombos(form);
    }  
  } 
  
 /* Funcion que deshabilita todos los campos de un formulario */
 function deshabiltarAllForm(form) {
  var elementos = form.elements;
  for(var i= 0;i < elementos.length; i++){        
	if ((elementos[i].type == "text")||(elementos[i].type == "select-one")){
	  elementos[i].disabled = true;
	}
  }
 }
 
 /* Funcion que habilitar los campos del la pantalla de datos talleres */
 function abrirDatosTaller() {
  // se habilitan Fecha Peritaci?n, Estimaci?n Reparaci?n y Observaciones
  document.getElementById('fechaPeritacion').disabled = false;
  document.getElementById('estimacionReparacion').disabled = false;
  document.getElementById('txtObservacion').disabled = false;
  
  var nombreTaller = document.getElementById('nombre').value;
  if(nombreTaller != ""){
    document.getElementById('nombre').readOnly = true;
  }else{
    document.getElementById('nombre').readOnly = false;
  }
 }   
 
 /* Funcion para enviar los datos del taller */
 function enviarDatosTaller(action, msgConf1){
 
   var msgConfir = "";
   var mostrarMsg = false;
   
   //var validado = validateTalleresForm(window.frames['datosTaller'].document.forms[0]);
   //if(validado){
   
     var fechaPeritacion = window.frames['datosTaller'].document.getElementById('fechaPeritacion').value;
     if(fechaPeritacion == ""){
       msgConfir = msgConf1 + "\n";
       mostrarMsg = true;
     }
     
     if(mostrarMsg){
       // alert confirmacion
       if(confirm(msgConfir)){
         submitFormActionMsg(window.frames['datosTaller'].document.forms[0],action, validateTalleresForm, 'datosTaller',null);
       }
     }else{
       submitFormActionMsg(window.frames['datosTaller'].document.forms[0],action, validateTalleresForm, 'datosTaller',null);
     }  
   //}
 } 
 
 /* Funcion para validar los datos del taller */
 function validarDatosTaller(){
   var validado = false;
   var nombre = window.frames['datosTaller'].document.forms[0].nombre.value;
   if(nombre != ""){
     validado = true;
   }
   return validado;
 }
 
  /* Funcion para enviar los datos del encargo */
 function enviarDatosEncargo(actionG, actionProf, msgError){
   // despu?s, se cambiar? por la validacion de Struts
   var validadoDatos = validarDatosEncargo();

   // guardo la fecha
   var fecha = document.getElementById('encargoView.fecRealizacionEncargo').value;
   window.frames['iTabContent'].document.getElementById('encargoView.fecRealizacionEncargo').value = fecha;
   
   if(validadoDatos){   
     var tab = document.getElementById('tab0_DAT');
	 document.getElementById(selectTab).className = "tab";
	 selectTab = 'tab0_DAT';
	 tab.className="activeTab";
     submitFormActionMsg(window.frames['iTabContent'].document.forms[0],actionG,null,'iTabContent',null);
     muestraCarga();
   } else {
     alert(msgError);
     var tab = document.getElementById('tab2_DAT');
     document.getElementById(selectTab).className = "tab";
     selectTab = 'tab2_DAT';
     tab.className="activeTab";
     submitFormActionMsg(window.frames['iTabContent'].document.forms[0],actionProf,null,'iTabContent',null);
   } 
 }
 
  /* Funcion para validar los datos del encargo */
 function validarDatosEncargo(){
   var validado = false;

   var idProveedor = window.frames['iTabContent'].document.getElementById('encargoView.proveedorRela.id').value;
   var idTram = window.frames['iTabContent'].document.getElementById('encargoView.usuarioTramitador.id').value;

   if(idProveedor != "" && idTram != ""){
     validado = true;
   }
   return validado;
 }

  /* Funcion para validar los datos del encargo */
 function validarUbicacionEncargo(){
   var validado = false;
   var idProveedor = window.frames['iTabContent'].document.getElementById('nombreEncargo').value;
   if(idProveedor != ""){
     validado = true;
   }
   return validado;
 }
 
 /* Funcion para limpiar los campos de la ubicacion del encargo */
 function limpiarUbicacionEncargo(idJuzgado, habilitar){
  // se limpia el formulario correspondientes  
  if(idJuzgado == ""){
    document.getElementById('idTipoIdentificacionEncargo').value ="";
    document.getElementById('numeroIdentificacionEncargo').value = "";
  }
  document.getElementById('idProfesionalEncargo').value = "";
  document.getElementById('nombreEncargo').value = "";
  document.getElementById('datosUbicacionEncargo.via').value = "";
  document.getElementById('datosUbicacionEncargo.numeroVia').value = "";
  document.getElementById('datosUbicacionEncargo.bloque').value = "";
  document.getElementById('datosUbicacionEncargo.piso').value = "";
  document.getElementById('datosUbicacionEncargo.puerta').value = "";
  document.getElementById('datosUbicacionEncargo.codPostal').value = "";
  document.getElementById('datosUbicacionEncargo.localidad').value = "";
  document.getElementById('datosUbicacionEncargo.provincia.id').value = "";
  document.getElementById('telefono1Encargo.telefono').value = "";
  document.getElementById('telefono2Encargo.telefono').value = "";
  document.getElementById('telefono3Encargo.telefono').value = "";
  
  if(habilitar){
    controlFormularioUbicacionEncargo(idJuzgado, false);
  }
 } 
    
 /* Funcion para limpiar los campos de la ubicacion del encargo */
 function controlFormularioUbicacionEncargo(idJuzgado, flag){
  // se limpia el formulario correspondientes  
  if(idJuzgado == ""){
    document.getElementById('idTipoIdentificacionEncargo').disabled = flag;
    document.getElementById('numeroIdentificacionEncargo').disabled = flag;
  }
  document.getElementById('idProfesionalEncargo').disabled = flag;
  document.getElementById('nombreEncargo').disabled = flag;
  document.getElementById('datosUbicacionEncargo.tipoVia.id').disabled = flag;
  document.getElementById('datosUbicacionEncargo.via').disabled = flag;
  document.getElementById('datosUbicacionEncargo.numeroVia').disabled = flag;
  document.getElementById('datosUbicacionEncargo.bloque').disabled = flag;
  document.getElementById('datosUbicacionEncargo.piso').disabled = flag;
  document.getElementById('datosUbicacionEncargo.puerta').disabled = flag;
  document.getElementById('datosUbicacionEncargo.pais.id').disabled = flag;
  document.getElementById('datosUbicacionEncargo.codPostal').disabled = flag;
  document.getElementById('datosUbicacionEncargo.localidad').disabled = flag;
  document.getElementById('datosUbicacionEncargo.provincia.id').disabled = flag;
  document.getElementById('telefono1Encargo.telefono').disabled = flag;
  document.getElementById('telefono2Encargo.telefono').disabled = flag;
  document.getElementById('telefono3Encargo.telefono').disabled = flag;
 }    
    
 /* Funcion para asignar profesionales */
 function enlaceProfesionales (pag, tipoObj, idObjeto, pag2, tipoProf){
   pag = pag + "?objProfesional="+ tipoObj;
   pag = pag + "&idTipoObjeto="+ idObjeto;
   pag = pag + '&tipoProf='+ tipoProf;
   pag = pag + '&swConsulta=';
   pag = pag + '&swModoConsulta=';
   pag = pag + '&modificacion=';
   var valor = lanzarVentana(pag,800,400);
   if (valor!= undefined && valor!= null && valor[0] != undefined && valor[0] != null && valor[0] > 0){
	 document.getElementById("linkEncargos").className = "operacionesContenido";
   }else{
	 document.getElementById("linkEncargos").className = "operaciones";
   }
   //Se recarga el iframe oculto para que a su vez recarge el arbol
   pag2 = pag2 + '&swConsulta=';
   pag2 = pag2 + '&swModoConsulta=';
   pag2 = pag2 + '&modificacion=';

   top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2;   
 } 
 
  /* Funcion para asignar profesionales */
 function enlaceProfesionalesConsulta (pag, tipoObj, idObjeto, tipoProf, valorSi, sAccion){
   pag = pag + "?objProfesional="+ tipoObj;
   pag = pag + "&idTipoObjeto="+ idObjeto;
   pag = pag + '&tipoProf='+ tipoProf;
   pag = pag + '&swConsulta='+ valorSi;
   pag = pag + '&swModoConsulta='+ valorSi;
   pag = pag + '&modificacion='+ valorSi;
   var valor = lanzarVentana(pag,800,400);
   if(valor!= undefined && valor!= null && valor[0] != undefined && valor[0] != null){
     sAccion = sAccion + '?idEncargo='+valor[0];
     top.window.frames[1].document.location = sAccion;
   }  
 } 
 
  /* Funcion para mostrar los campos referentes a los abogados */
  function mostrarAbogadoNoAutos(form){
	mostrarAbogado(form,'swAbogado','cTNAbogado');
	mostrarAbogado(form,'swAbogado','cNAbogado');
	mostrarAbogado(form,'swAbogado','cTTAbogado');
	mostrarAbogado(form,'swAbogado','cTAbogado');
	mostrarAbogado(form,'swAbogado','cTEAbogado');
	mostrarAbogado(form,'swAbogado','cEAbogado');
  }

  /* Funcion que habilita los campos dependiendo del tipo de persona (Fisica/Juridica)*/
  function pnsFisicaJuridica(idTipoPns){
	if((idTipoPns == 1)){
	  // persona juridica 
	  showHide(cJuridica,true);
  	  showHide(cDesconocido,false);
	  showHide(cFisica,false);
	  showHide(cApells,false);
	  showHide(cNSexo, false);
	  showHide(cSexo, false);
	}		  	  
	else{
	  if(idTipoPns == ""){
	  	showHide(cDesconocido,true);
	  	showHide(cJuridica,false);
	  	showHide(cFisica,false);
	    showHide(cApells,false);
	    showHide(cNSexo, false);
	    showHide(cSexo, false);
	  }
	  // persona fisica
	  showHide(cFisica,true);
	  showHide(cApells,true);
	  showHide(cJuridica,false);
	  showHide(cDesconocido,false);
	  showHide(cNSexo, true);
	  showHide(cSexo, true);
    }	
  }
  
  /* Funcion que habilita los campos dependiendo del tipo de persona (Fisica/Juridica)*/
  function pnsFisicaJuridicaBis(idTipoPns){
	if((idTipoPns == 1)){
	  // persona juridica 
	  showHide(cJuridica,true);
  	  showHide(cDesconocido,false);
	  showHide(cFisica,false);
	  showHide(cApells,false);
	  showHide(cNSexo, false);
	  showHide(cSexo, false);
	}		  	  
	else{
	  if(idTipoPns == ""){
	  	showHide(cDesconocido,true);
	  	showHide(cJuridica,false);
	  	showHide(cFisica,false);
	    showHide(cApells,false);
	    showHide(cNSexo, false);
	    showHide(cSexo, false);
	  }
	  // persona fisica
	  showHide(cFisica,true);
	  showHide(cApells,true);
	  showHide(cJuridica,false);
	  showHide(cDesconocido,false);
	  showHide(cNSexo, true);
	  showHide(cSexo, true);
    }	
  }
  
    /* Funcion que habilita los campos dependiendo del tipo de persona (Fisica/Juridica)*/
  function pnsFisicaJuridicaEncargo(idTipoPns){
	if((idTipoPns == 1)){
	  // persona juridica 
	  showHide(cJuridica,true);
  	  showHide(cDesconocido,false);
	  showHide(cFisica,false);
	}		  	  
	else{
	  if(idTipoPns == ""){
	  	showHide(cDesconocido,true);
	  	showHide(cJuridica,false);
	  	showHide(cFisica,false);
	  }else{
	    // persona fisica
	    showHide(cFisica,true);
	    showHide(cJuridica,false);
	    showHide(cDesconocido,false);
	  }
    }	
  }
  
  /* Funcion para el control del tipo de persona a mostrar (fisica/juridica)*/  	
  function controlTipoPersona(tipoIdent, capaNFisica, capaFisica, capaNJuridica, capaJuridica, capaNSexo, capaSexo, capaFechas, capaNIdioma, capaIdioma){
	var idTipoPns = document.getElementById(tipoIdent).value;
	if(idTipoPns != 1){
	  // persona fisica
	  showHide(capaNFisica,true);
      showHide(capaFisica,true);
	  
	  showHide(capaNJuridica,false);
	  showHide(capaJuridica,false);
	  
	  if(capaSexo != null){
	    showHide(capaNSexo,true);
        showHide(capaSexo,true);
      }
	  if(capaFechas != null){
	    showHide(capaFechas,true);
	  }
	  if(capaIdioma != null){
	    showHide(capaNIdioma,true);
	    showHide(capaIdioma,true);
	  }
	}else{
	  // persona juridica	
	  showHide(capaNJuridica,true);
	  showHide(capaJuridica,true);
	  
	  showHide(capaNFisica,false);
      showHide(capaFisica,false);
	  
	  if(capaSexo != null){
	    showHide(capaNSexo,false);
        showHide(capaSexo,false);
      }
	  if(capaFechas != null){
	    showHide(capaFechas,false);
	  }
	  if(capaIdioma != null){
		showHide(capaNIdioma,false);
		showHide(capaIdioma,false);
	  }	  
	}
  }
    
 /* Funcion para habilitar el motivo */
 function habilitarMotivo(cObjeto,nameText) {
  if(document.getElementById(cObjeto).value != ""){
    // se habilita el campo motivo
    document.getElementById(nameText).disabled = false;
  } else {
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  }
 }
 
 /* Funcion para el control datos de los testigos */
  function controlCamposDatosPersonales(valor){
    document.getElementById('idTipoIdentificacion').disabled = valor;
    document.getElementById('numeroIdentificacion').disabled = valor;
    document.getElementById('nombre').readonly = valor;
    document.getElementById('apellido1').readonly = valor;
    document.getElementById('apellido2').readonly = valor;
    if (document.getElementById('razonSocial') != null)
		document.getElementById('razonSocial').readonly = valor;
    document.getElementById('idSexo').disabled = valor;
    document.getElementById('datosDomicilio.localidad').disabled = valor;
    document.getElementById('datosDomicilio.numeroVia').disabled = valor;
    document.getElementById('datosDomicilio.via').disabled = valor;
    document.getElementById('datosDomicilio.tipoVia.id').disabled = valor;
    document.getElementById('datosDomicilio.bloque').disabled = valor;
    document.getElementById('datosDomicilio.piso').disabled = valor;
    document.getElementById('datosDomicilio.puerta').disabled = valor;
    document.getElementById('datosDomicilio.codPostal').disabled = valor;
    document.getElementById('datosDomicilio.pais.id').disabled = valor;
    document.getElementById('datosDomicilio.provincia.id').disabled = valor;
 
    if(!valor){  
      document.getElementById('idPersona').value = "";
    }
  }
  
 /* Funcion para habilitar las observaciones */
 function habilitarObservacion(cObjeto, nameText, stPasivo, stSc, stRecobro, stReactivado, stActivo){
  var stExpdte = document.getElementById(cObjeto).value;
  if((stExpdte == stActivo) || (stExpdte == "")){
   // se deshabilita el campo observaciones
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  } else {
    // se habilita el campo observaciones
    document.getElementById(nameText).disabled = false;
  }
 } 
 
 
 /* Funcion para habilitar el motivo de reserva */
 function habilitarMotivoReserva(form,cObjeto,nameText) {
  var mostrar = form.elements[cObjeto].options[form.elements[cObjeto].selectedIndex].text;
  if(mostrar == "SI") {
    document.getElementById(nameText).disabled = false;
  } else {
    document.getElementById(nameText).disabled = true;
    document.getElementById(nameText).value = "";
  }
 }
 
 /* Funcion para guardar el mes contable */
 function controlMesContable(form, cObjeto, nameText){
  // mes contable
  var mesContable = form.elements[cObjeto].options[form.elements[cObjeto].selectedIndex].text;
  document.getElementById(nameText).value = mesContable; 
 } 
  
 /* Funcion para enviar los datos de la reserva */
 function enviarDatosReserva(action){
   submitFormActionMsg(window.frames['datosReserva'].document.forms(0),action,null,'datosReserva',null);
 }
  
 /* Funcion para enviar los datos de los pagos x reserva */
 function enviarPagosxReserva(action){   
   //document.forms[0].action = action;
   document.forms[0].submit();
 }
 
 /* Funcion para enviar los datos de los recobros x reserva */
 function enviarRecobrosxReserva(action){
   document.forms[0].action = action;
   document.forms[0].submit();
 }
   
  function comprobarDesplegadoArbol(){
  	
	var elementosDIV = document.getElementsByTagName("div");
	var valorCodigoGarantia;
	
	//Comprobamos si el elemento debe estar o no desplegado al inicializarse
	for(var i=0; i<elementosDIV.length; i++){
	   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("deployed");
	   	
	   	//alert()
	   	if(valorCodigoGarantia!=null){
	   		gestionaArbol(valorCodigoGarantia);
	   	}
	   	
   }
}

/* Despliega la sabana de pago recobro segun el nivel indicado, actualmente
	esta programado para que despliegue hasta el riesgo                     */
function comprobarIndustrial(){
  	
	var elementosDIV = document.getElementsByTagName("div");
	var valorCodigoGarantia;
	mi_array = new Array();
	
	var elementosImg = document.getElementsByTagName("img");
	var valorCodigoImg;
	array_img = new Array();


	var elementosSpan = document.getElementsByTagName("span");
	var codigoSpan;
	
	array_spanTramite = new Array();
	array_spanRiesgo = new Array();
	
	var size;
	
	var codigoSpanRi;
	for(var v=0; v<elementosSpan.length; v++){
	   	codigoSpanRi = elementosSpan.item(v).getAttribute("deployed");
	   	
	   	if(codigoSpanRi!=null){	   		
	   		
	   		if(codigoSpanRi.indexOf('riesgo',0) == 0){
	   			array_spanRiesgo.push(elementosSpan.item(v));	
	   		}	 
	   		
	   	}
	   	
   }
   
   	var sigue = new Boolean();
   	
	for(var x=0; x<elementosSpan.length; x++){
	   	codigoSpan = elementosSpan.item(x).getAttribute("deployed");
	   	
	   	
	   	if(codigoSpan!=null){	   		
	   		
	   		if(codigoSpan.indexOf('tramite',0) == 0){	 
	   			array_spanTramite.push(elementosSpan.item(x));	
	   		}else if(codigoSpan.indexOf('riesgo',0) == 0 && sigue == false){
	   			sigue = true;
	   		}else if(codigoSpan.indexOf('riesgo',0) == 0 && sigue == true){
	   			break;
	   		}	
	   		
	   	}
	   	
	  
	   	
   }
   
   

	
   if(array_spanTramite!=null && array_spanTramite!=undefined && array_spanTramite.length > 0 && array_spanRiesgo!=null && array_spanRiesgo!=undefined)	{
   
   		
   		if(array_spanRiesgo.length > 1){   		
   			size = array_spanTramite.length + array_spanRiesgo.length ;   		
   		}else if(array_spanRiesgo.length == 1){   		
   			size = array_spanTramite.length ;   		
   		}
   
   }else{
   		
   		size = 0;
   }
   
   
	//Comprobamos si el elemento debe estar o no desplegado al inicializarse
	for(var i=0; i<elementosDIV.length; i++){
	   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("deployed");
	   	
	   	if(valorCodigoGarantia!=null){
	   		mi_array.push(elementosDIV.item(i));	
	   	}
	   	
   }
   
   //comprobamos que imagen se tiene que cambiar para deplegarse
   for(var e=0;e<elementosImg.length;e++){
   		valorCodigoImg = elementosImg.item(e).getAttribute("deployed");
   		
   		if(valorCodigoImg!=null){
   		
   			array_img.push(elementosImg.item(e));
   		}
   
   }
   
   //div
   if(mi_array.length == size || mi_array.length > size){
   	
   	
   		var sizeArray = mi_array.length - size;
   		var valor;
   		
   		for(var e=0;e<sizeArray;e++){
   			
   			valor = mi_array[e].getAttribute("deployed");
   			
   			if(valor!=null){
   				gestionaArbol(valor);
   			}
   			
   			
   		}
   
   }
   
   //img 
   if(array_img.length == size || array_img.length > size){
   	
   		var sizeArrayImg = array_img.length - size;
   		var valorImg;
   		
   		for(var z=0;z<sizeArrayImg;z++){
   			
   			valorImg = array_img[z].getAttribute("deployed");
   			
   			if(valorImg!=null){
   				gestionaImgArbol(valorImg);
   			}
   			
   			
   		}
   
   }
   
   
   //Comprobamos si el elemento debe estar o no desplegado al inicializarse
   var idDivTree;
   var valorCodigoTree;
	for(var pp=0; pp<elementosDIV.length; pp++){
		
	   	valorCodigoTree = elementosDIV.item(pp).getAttribute("deployed");	   	
	   	idDivTree = elementosDIV.item(pp).getAttribute("id");
	   	
	   	if(valorCodigoTree!=null){
	   	
	   		vis = getDivCurrentDisplay(elementosDIV.item(pp));
	   		
	   		var temp = new Array();
			temp = idDivTree.split('.');
	
			var longitud = temp.length - 1;
			
			
			var idRiesgo1;
			idRiesgo1 = "reservaTotalRi" + temp[longitud];
		
			var idRiesgo2;
			idRiesgo2 = "pagoTotalRi" + temp[longitud];
		
			var idRiesgo3;
			idRiesgo3 = "recobroTotalRi" + temp[longitud];
		
			var idRiesgo4;
			idRiesgo4 = "costeTotalRi" + temp[longitud];
			
			var idTr1;
			idTr1 = "reservaTotalTr" + temp[longitud];
		
			var idTr2;
			idTr2 = "pagoTotalTr" + temp[longitud];
		
			var idTr3;
			idTr3 = "recobroTotalTr" + temp[longitud];
		
			var idTr4;
			idTr4 = "costeTotalTr" + temp[longitud];
			
			var vis2 = null;		
			if(vis == "block"){
		
				vis2 = "none";
		
			}else if (vis == "none"){
		
				vis2 = "block";
			}
			
			if(document.getElementById(idRiesgo1)!=undefined){
			
				document.getElementById(idRiesgo1).style.display = vis2;
			
			}
			if(document.getElementById(idRiesgo2)!=undefined){
			
				document.getElementById(idRiesgo2).style.display = vis2;
			
			}
			if(document.getElementById(idRiesgo3)!=undefined){
			
				document.getElementById(idRiesgo3).style.display = vis2;
			
			}
			if(document.getElementById(idRiesgo4)!=undefined){
			
				document.getElementById(idRiesgo4).style.display = vis2;
			
			} 
			
			
			if(document.getElementById(idTr1)!=undefined){
			
				document.getElementById(idTr1).style.display = vis2;
			
			}
			if(document.getElementById(idTr2)!=undefined){
			
				document.getElementById(idTr2).style.display = vis2;
			
			}
			if(document.getElementById(idTr3)!=undefined){
			
				document.getElementById(idTr3).style.display = vis2;
			
			}
			if(document.getElementById(idTr4)!=undefined){
			
				document.getElementById(idTr4).style.display = vis2;
			
			} 
			
			
			
	   		
	   		
	   	}
	   	
   }	
}


/* cambia las imagenes + y - del arbol para la sabana de pagos/recobros */
function gestionaImgArbol(pId) {
    	
        var img = document.getElementById(pId);
        
       
		var imgSRC = img.getAttribute("src");
  		var rutaLength = imgSRC.length;  		
  		var ruta = imgSRC.substr(0, imgSRC.lastIndexOf("/") + 1);
  		
  		
  		
  		var imgMas = new Image();
        	imgMas.src = ruta + "icoExpand.gif";
    	var imgMenos = new Image();
        	imgMenos.src = ruta + "ico-.gif";
  		
  	    
  		if(img != null)
  		{
  			if (img.src == imgMas.src) {
  				img.src = imgMenos.src;
  			} else if (img.src == imgMenos.src) {
  				img.src = imgMas.src;
  			}
  		}
        	
	
    }

function comprobarPlegarRelato(){
  	
  
	var elementosDIV = document.getElementsByTagName("div");
	
	var valorCodigoGarantia;
	var id1;
	
		
	
	//Comprobamos si el elemento debe estar o no desplegado al inicializarse
	for(var i=0; i<elementosDIV.length; i++){
	   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("idPlegadoHistorico");
	   	id1 = elementosDIV.item(i).getAttribute("id");
	   	
	   	if(valorCodigoGarantia!=null && id1!=null){	   		
	   		var id = id1.substr(1,id1.length);   		
	   		
	   		gestiona(id);
	   	}
	   	
   }
   
  
   
}

function comprobarPlegarEstructuraGarantia(){
  	
  	
	var elementosDIV = document.getElementsByTagName("div");
	var elementosTR = document.getElementsByTagName("td");
	
	var valorCodigoGarantia;
	var id1;
	
	var valorCodigoTr;
	var id2;
	
	//Comprobamos si el elemento debe estar o no desplegado al inicializarse
	for(var i=0; i<elementosDIV.length; i++){
	   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("despli");
	   	id1 = elementosDIV.item(i).getAttribute("id");
	   	
	   	if(valorCodigoGarantia!=null && id1!=null){
	   		var id = id1.substr(1,id1.length);   		
	   		
	   		gestiona(id);
	   	}
	   	
   }
   
   for(var i=0; i<elementosTR.length; i++){
        valorCodigoTr = elementosTR.item(i).getAttribute("despli");
	   	id2 = elementosTR.item(i).getAttribute("id");
	   	
		if(valorCodigoTr!=null && id2!=null){
	   		
	   		
	   		gestionaTo(id2);
	   		
	   		
	   	}
	   	
   }
   
}

function reloadRelato(id,idPolizaGaranCobe,tipoMov,tipoSntro){

	var elementosTD = document.getElementsByTagName("td");
	
	
	var codigoRiesgo;
	var id;
	var codigoOn;
	
	
	var atributo;
	atributo = 'idRelato' + tipoSntro + tipoMov
	

	
	var identificador;
	identificador = 'relato' + tipoSntro + tipoMov + id + idPolizaGaranCobe; 
	
	
	
	//alert(atributo);
	//alert(identificador);
	
	var sigue = new Boolean();
	for(var i=0; i<elementosTD.length; i++){
	
	
	
		if(tipoMov == 'Reserva'){
		
			codigoRiesgo = elementosTD.item(i).getAttribute(atributo);
		
			if(codigoRiesgo!=null && codigoRiesgo!=undefined){
				if(codigoRiesgo == identificador){
					
				}
			}
		
		}//fin reserva
		
		else if(tipoMov == 'Pago'){
		
			codigoRiesgo = elementosTD.item(i).getAttribute(atributo);
			codigoOn = elementosTD.item(i).getAttribute('onclick');
			
			
			if(codigoRiesgo!=null && codigoRiesgo!=undefined){
			
				if(codigoRiesgo == identificador){
					
					var funcion =  document.getElementById(identificador).onclick; 
				
					if(sigue == false){
						funcion();
						sigue= true;
					}
					
					
					
					
				}
			}
		
		}//fin reserva
		
		else if(tipoMov == 'Recobro'){
		
			codigoRiesgo = elementosTD.item(i).getAttribute(atributo);
			codigoOn = elementosTD.item(i).getAttribute('onclick');
			
			if(codigoRiesgo!=null && codigoRiesgo!=undefined){
			
				
				if(codigoRiesgo == identificador){
					
					var funcion =  document.getElementById(identificador).onclick; 
					
					
					if(sigue == false){
						funcion();
						sigue= true;
					}
				}
			}
		
		}//fin recobro
	
	}//for

}

/* oculta y muestra las capas del arbol de pagos/recobros */
function showHideArbol(pID, pBol)   {
	var obj = document.getElementsByName(pID);
	
	for(var i=0; i<obj.length; i++){
		
		if(getDivCurrentDisplay(obj[i]) == "block"){
			obj[i].style.display = "none";
		
		}else if(getDivCurrentDisplay(obj[i]) == "none"){
			obj[i].style.display = "block";
		
		}else{
			obj[i].style.display = "none";
		
		}
	}	
}

/* oculta y muestra las capas del arbol de pagos/recobros */
function gestionaArbol(pId) {
	
    showHideArbol(pId);  
}







  /*
  * Funcion que selecciona un opcion de un combo determinado
  * cbNombre: nombre del combo sobre el que se quiere seleccionar una opcion (property)
  * valueCombo: valor de la opcion que se desea seleccionar (id)
  */
  function copiarValorCombo(cbNombre, valueCombo) {
  	var combo = document.forms[0].elements[cbNombre];
    for(var i=0; i < combo.options.length; i++)  {
    	if(combo.options[i].value == valueCombo){
    		combo.options[i].selected = true;
    		combo.selectedIndex = combo.options[i].index;
        }
	}
  }
    
    
 /* Funcion para limpiar los campos de los talleres/profesionales */
 function limpiarDatosPsnAccionesLegales(tipo){
  
  // se limpia el formulario correspondientes  
  document.getElementById('tipoIdentificacion'+tipo).value = "";
  document.getElementById('idTipoIdentificacion'+tipo).value = "";
  document.getElementById('numeroIdentificacion'+tipo).value = "";
  document.getElementById('idPersona'+tipo).value = "";
  document.getElementById('tipoPersona'+tipo).value = "";
  document.getElementById('nombre'+tipo).value = "";
  document.getElementById('apellido1'+tipo).value = "";
  document.getElementById('apellido2'+tipo).value = "";
  document.getElementById('razonSocial'+tipo).value = "";
  document.getElementById('datosDomicilio'+tipo+'.localidad').value = "";
  document.getElementById('datosDomicilio'+tipo+'.numeroVia').value = "";
  document.getElementById('datosDomicilio'+tipo+'.via').value = "";
  document.getElementById('datosDomicilio'+tipo+'.bloque').value = "";
  document.getElementById('datosDomicilio'+tipo+'.piso').value = "";
  document.getElementById('datosDomicilio'+tipo+'.puerta').value = "";
  document.getElementById('datosDomicilio'+tipo+'.codPostal').value = "";
  document.getElementById('telefono1'+tipo+'.telefono').value = "";
  document.getElementById('telefono2'+tipo+'.telefono').value = "";
  document.getElementById('telefono3'+tipo+'.telefono').value = "";
  document.getElementById('fax'+tipo+'.telefono').value = "";
  document.getElementById('email'+tipo+'.email').value = "";
  
  if(tipo == ""){
    // imagenes
    document.getElementById('imgBusqLocalidad').disabled = false;
    document.getElementById('imgBusqFecNac').disabled = false; 
    document.getElementById('imgBusqFecCarnet').disabled = false;
    
    // se deshabilitan los campos
    document.getElementById('idTipoIdentificacion').disabled = false;
    document.getElementById('tipoIdentificacion').disabled = false;
    document.getElementById('numeroIdentificacion').disabled = false;
    document.getElementById('idPersona').disabled = false;
    document.getElementById('tipoPersona').disabled = false;
	document.getElementById('nombre').disabled = false;
    document.getElementById('apellido1').disabled = false;
    document.getElementById('apellido2').disabled = false;
    document.getElementById('razonSocial').disabled = false;
	document.getElementById('datosDomicilio.localidad').disabled = false;
    document.getElementById('datosDomicilio.numeroVia').disabled = false;
    document.getElementById('datosDomicilio.via').disabled = false;
    document.getElementById('datosDomicilio.tipoVia.id').disabled = false;
    document.getElementById('datosDomicilio.bloque').disabled = false;
    document.getElementById('datosDomicilio.piso').disabled = false;
    document.getElementById('datosDomicilio.puerta').disabled = false;
    document.getElementById('datosDomicilio.codPostal').disabled = false;
    document.getElementById('datosDomicilio.pais.id').disabled = false;
    document.getElementById('datosDomicilio.provincia.id').disabled = false;  
    
    if(document.getElementById('idTipoIdentificacion'+tipo).value != 1){
      document.getElementById('idSexo').disabled = false;
      document.getElementById('fechaNacimiento').value = "";
      document.getElementById('fechaNacimiento').disabled = false;
      document.getElementById('fechaCarnet').value = "";   
      document.getElementById('fechaCarnet').disabled = false;
    }
  }      
  }   
  

 /* Funcion para la pantalla emergente de testigos */
 function enlaceTestigos(pag, tipoObj, idTipoObj, pag2) {
  pag = pag + '?objTestigo='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta=';
  
  // abrimos la ventana de testigos
  var valor = lanzarVentana(pag, 700, 600);
  if (valor != undefined && valor != null && valor != 0){
  	document.getElementById("linkTestigos").className = "enlacesContenido";
  }else{
  	document.getElementById("linkTestigos").className = "enlaces";
  }
  
  //Se recarga el iframe oculto para que a su vez recarge el arbol
  pag2 = pag2 + '&swConsulta=';
  pag2 = pag2 + '&swModoConsulta=';
  pag2 = pag2 + '&modificacion=';
  top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2;
 }   
 
  /* Funcion para la pantalla emergente de testigos */
 function enlaceTestigosConsulta (pag, tipoObj, idTipoObj, valorSi, sAccion) {
  pag = pag + '?objTestigo='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta='+ valorSi;
  top.window.frames[1].document.location = pag;
 } 
  
  
 /* Funcion para la pantalla emergente de autoridades */
 function enlaceAutoridades(pag, tipoObj, idTipoObj, pag2) {
  pag = pag + '?tipoObjeto='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta=';
  
  // abrimos la ventana de testigos
  var valor = lanzarVentana(pag, 700, 400);
  if (valor[0] != undefined && valor[0] != null && valor[0] != 0){
  	document.getElementById("linkAutoridades").className = "enlacesContenido";
  }else{
  	document.getElementById("linkAutoridades").className = "enlaces";
  }
  //Se recarga el iframe oculto para que a su vez recarge el arbol
  pag2 = pag2 + '&swConsulta=';
  pag2 = pag2 + '&swModoConsulta=';
  pag2 = pag2 + '&modificacion=';
  top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2;
 }  
  
 /* Funcion para la pantalla emergente de autoridades */
 function enlaceAutoridadesConsulta(pag, tipoObj, idTipoObj,  valorSi, sAccion) {
  
  pag = pag + '?tipoObjeto='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta='+ valorSi;
  top.window.frames[1].document.location = pag;
 }  
    
 /* Funcion para la pantalla emergente de acciones legales */
 function enlaceAccionesLegales(pag, tipoObj, idTipoObj, pag2, fecFallec) {
  pag = pag + '?objAccLegal='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta=';
  pag = pag + '&swModoConsulta=';
  pag = pag + '&modificacion=';
  if (fecFallec != null && fecFallec != undefined && fecFallec != ''){
	  pag = pag + '&swFallecido=1';
  }else{
  	  pag = pag + '&swFallecido=0';
  }
  // abrimos la ventana de acciones legales
  var valor = lanzarVentana(pag, 800, 400);
  if (valor[0] != undefined && valor[0] != null && valor[0] > 0){
 	document.getElementById("linkAcciones").className = "enlacesContenido";
  }else{
	document.getElementById("linkAcciones").className = "enlaces";
  }
  //Se recarga el iframe oculto para que a su vez recarge el arbol
  if(pag2 != null){
    pag2 = pag2 + '&swConsulta=';
    pag2 = pag2 + '&swModoConsulta=';
    pag2 = pag2 + '&modificacion=';
    top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2;
  }  
 }  
 
 
  /* Funcion para la pantalla emergente de acciones legales */
 function enlaceAccionesLegalesConsulta (pag, tipoObj, idTipoObj, valorSi, sAccion, fecFallec) {
  
  pag = pag + '?objAccLegal='+tipoObj;
  pag = pag + '&idTipoObjeto='+idTipoObj;
  pag = pag + '&swConsulta='+ valorSi;
  pag = pag + '&swModoConsulta='+ valorSi;
  pag = pag + '&modificacion='+ valorSi;
  if (fecFallec != null && fecFallec != undefined && fecFallec != ''){
	  pag = pag + '&swFallecido=1';
  }else{
  	  pag = pag + '&swFallecido=0';
  }
  var valor = lanzarVentana(pag, 800, 400);
  if(valor!= null && valor[0] != undefined && valor[0] != null && valor[0]!=false){
 	sAccion = sAccion + '?idAccionLegal='+valor[0];
    top.window.frames[1].document.location = sAccion;
  }  
 } 
 
 /* Funcion consulta historico acciones legales */
 function consultaHcoAccionesLegales (flag){
   
   document.getElementById('accionLegalView.numproc').disabled = flag;
   document.getElementById('accionLegalView.idTipoJurisJud').disabled = flag;
   document.getElementById('accionLegalView.idTipoProcJudi').disabled = flag;
   document.getElementById('accionLegalView.fecActLegal').disabled = flag;
   document.getElementById('accionLegalView.idDerechoRepet').disabled = flag;
   document.getElementById('accionLegalView.idSituProcJudi').disabled = flag;
   document.getElementById('accionLegalView.comSituProcJudi').disabled = flag;
   document.getElementById('accionLegalView.descAccionLegal').disabled = flag;
   document.getElementById('accionLegalView.idResolucionProcJudi').disabled = flag;
   
   // imagenes
   document.getElementById('calenFecAct').disabled = flag;
   document.getElementById('imgBusqJuzgado').disabled = flag;
 }
 
  /* Funcion para la pantalla emergente de beneficiarios/reclamantes */
   function enlaceBeneficiarioReclamante(pag, idObjeto, idTipoObj, pag2) {
     pag = pag + "?idTipoObjeto=" + idTipoObj;
     pag = pag + "&idObjVinculado=" + idObjeto;
     pag = pag + '&swConsulta=';
     var valor = lanzarVentana(pag,710,580);
     if (valor[0] != undefined && valor[0] != null && valor[0] != 0){
	 	document.getElementById("linkBeneficiarios").className = "enlacesContenido";
	 }else{
	 	document.getElementById("linkBeneficiarios").className = "enlaces";
	 }
	 //Se recarga el iframe oculto para que a su vez recarge el arbol
	 top.window.frames['iAreaTrabajo'].frames['iAreaOculta'].location = pag2;
   }
   
  /* Funcion para la pantalla emergente de beneficiarios/reclamantes */
   function enlaceBeneficiarioReclamanteConsulta (pag, idObjeto, idTipoObj, valorSi, sAccion) {
     pag = pag + "?idTipoObjeto=" + idTipoObj;
     pag = pag + "&idObjVinculado=" + idObjeto;
     pag = pag + "&swConsulta=" + valorSi;
     top.window.frames[1].document.location = pag;
    }   

	/* Comprueba si los campos son un NIF correcto. */
	function validarNif(value) {
	   var bValid = true;
	
	   if(value.length!=9){
		return false;
	   }
	
	   var control_char = value.substr(value.length -1, 1);
	   value = value.substr(0, value.length-1);
	   var control_chars = new Array('T','R','W','A','G','M','Y','F','P',
	                                 'D','X','B','N','J','Z','S','Q','V',
	                                 'H','L','C','K','E');
	   if (!value.match(/^\d+$/)){	
	   	return false;
	   }
	   var offset = parseInt(value) % 23;      
	   if (!(control_chars[offset] == control_char)) {
	   	bValid = false;
	   }
	   return bValid;
	}
	
	function gestiona(pId) {
    	var img = document.getElementById("img" + pId);
        var div = document.getElementById("c" + pId);
        
        var imgSRC = img.getAttribute("src");
  		var rutaLength = imgSRC.length;
  		
  		//Para obtener la ruta siempre suponía que el icono del que se parte era 'icono-.gif'. 
        //De ahí que restase las diez posiciones ('icono-.gif') para obtener la ruta
        //de acceso al directorio de imagenes. Ahora se busca por el directorio
        //Incidencia mantis 9924
        var ruta;
        if (imgSRC.indexOf('img') != -1)
  	  	{
      	  var sizeHastaImg = imgSRC.indexOf('img');
      	  //Se añade cuatro posiciones correspondientes a la cadena 'img/', 
      	  ruta = imgSRC.substr(0, sizeHastaImg +4);
  	  	} else {//se mantiene esta posibilidad, aunque nunca pasará por aquí, los iconos siempre se encuentran en directorio 'img'
  		  ruta = imgSRC.substr(0, rutaLength - 10);
  	  	}  		
  		var imgMas = new Image();
        	imgMas.src = ruta + "iconoExpand.gif";
    	var imgMenos = new Image();
        	imgMenos.src = ruta + "icono-.gif";
  		
        showHide2("c" + pId);
          
  		if(div != null) {
  			if (img.src == imgMas.src) {
  				img.src = imgMenos.src;
  			} else if (img.src == imgMenos.src) {
  				img.src = imgMas.src;
  			}
        }
    }
    
    function gestionaTo(pId) {
    	
        var img = document.getElementById("img" + pId);
        var div = document.getElementById("c" + pId);
        
       
       
  		var imgSRC = img.getAttribute("src");
  		var rutaLength = imgSRC.length;
  		//Para obtener la ruta siempre suponía que el icono del que se parte era 'icono-.gif'. 
        //De ahí que restase las diez posiciones ('icono-.gif') para obtener la ruta
        //de acceso al directorio de imagenes. Ahora se busca por el directorio
        //Incidencia mantis 9924
        var ruta;
        if (imgSRC.indexOf('img') != -1)
  	  	{
      	  var sizeHastaImg = imgSRC.indexOf('img');
      	  //Se añade cuatro posiciones correspondientes a la cadena 'img/', 
      	  ruta = imgSRC.substr(0, sizeHastaImg +4);
  	  	} else {//se mantiene esta posibilidad, aunque nunca pasará por aquí, los iconos siempre se encuentran en directorio 'img'
  		  ruta = imgSRC.substr(0, rutaLength - 10);
  	  	}
  		
  		var imgMas = new Image();
        	imgMas.src = ruta + "iconoExpand.gif";
    	var imgMenos = new Image();
        	imgMenos.src = ruta + "icono-.gif";
  		
        showHide2("c" + pId);
        showHide2("c" + pId + "2");
        
      
        
  		if(div != null) {
  			if (img.src == imgMas.src) {
  				img.src = imgMenos.src;
  			} else if (img.src == imgMenos.src) {
  				img.src = imgMas.src;
  			}
  		}
	
    }
  
  /*Despliega el div del arbol*/  
  function showHide2(pID, pBol)   {
	var obj = document.getElementsByName(pID)	
	
	for(var i=0; i<obj.length; i++){		
		if(obj[i].style.display == "block"){
			obj[i].style.display ="none";
		}else if(obj[i].style.display == "none"){
			obj[i].style.display ="block";
		}else{ 
			obj[i].style.display ="none";
		}
	}
	

	
}
      
function lanzarVentanaSiniestros(pag, width, height, parametros)  {
     var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+height+"px, scrollbars=auto"
     if(navigator.appName == "Microsoft Internet Explorer")
     	ventana = window.showModalDialog(pag, parametros,"dialogHeight:"+height+"px; dialogWidth:"+width+"px;status:no");
     else
       ventana = window.open(pag,"win","modal=yes, "+args);
     return ventana;
   }
    
    
  /* Funcion para annadir garantias-coberturas */    
  function introduccionGaranCobeReload(idObjetoStro, idTipoObj, pag){

    pag = pag + '?idObjeto='+ idObjetoStro;
	pag = pag + '&idTipoObjeto=' + idTipoObj;
	 
    var valor = lanzarVentanaSiniestros(pag,600,400);
    return valor;
  }
       
  /* Funcion para la reestimacion de la reserva */    
  function introduccionReservaReload(idExPolizaGaranCobe, pag){

    pag = pag + '?idPolizaGaranCobe='+ idExPolizaGaranCobe;

    var valor = lanzarVentanaSiniestros(pag,800,530);
    return valor;
  }
  
  /* Funcion para introducir pagos */
  function introduccionPagoReload(idExPolizaGaranCobe, pag){
  
	pag = pag + '?idPolizaGaranCobe='+ idExPolizaGaranCobe;
 		
	var valor = lanzarVentanaSiniestros(pag,600,400);
	return valor;
  }
  
  /* Funcion para introducir recobros */
  function introduccionRecobroReload(idExPolizaGaranCobe, pag){
	
	pag = pag + '?idPolizaGaranCobe='+ idExPolizaGaranCobe;
 		
	var valor = lanzarVentanaSiniestros(pag,600,400);
	return valor;
  }
  
  /* Funcion para consultar pagos */
  function consultaPagoReload(idPago, pag){
  
	pag = pag + '?idPago='+ idPago;
 	
 	var valor = lanzarVentanaSiniestros(pag,800,770); 
	return valor;
  }
  
  /* Funcion para consultar recobros */
  function consultaRecobroReload(idRecobro, pag){
	
	pag = pag + '?idRecobro='+ idRecobro;
 		
	var valor = lanzarVentanaSiniestros(pag,800,770);
	return valor;
  }
  
	
  /* Funcion para mostrar los enlaces correctos en la consulta */
  function enlacesConsulta (){
    showHide('linkSiniestralidad', false);
    showHide('linkRecibosAfect', false);
    showHide('linkOtrosExp', false);
  }	
	    
  /* Funcion para el control de la calificacion del expediente */
  function controlCalifExpe(idCalifExpPpal){
    
    // calificacion expediente
    var idCalificacion = document.getElementById('riesgoSntroIndustrialView.idCalificaExpePrinci').value;
    if(idCalificacion == idCalifExpPpal){
      // se habilita el campo para escritura
      document.getElementById('riesgoSntroIndustrialView.numExpedienteAux').disabled = false;
    }else{
      document.getElementById('riesgoSntroIndustrialView.numExpedienteAux').value = "";
      document.getElementById('riesgoSntroIndustrialView.numExpedienteAux').disabled = true;
    }
  }
  
  /* Funcion para pasar de numero de calle a punto kilometrico */
  function cambiarNumKm(value){
  
  	var id;
  	if (document.getElementById('sntroRgoAutoView.siniestroDireccionView.kilometro')!=null){
		id = document.getElementById('sntroRgoAutoView.siniestroDireccionView.kilometro').value;
  	}else{
		id = document.getElementById('sntroRgoIndusView.siniestroDireccionView.kilometro').value;
  	}
	if (id != null){
    	if (id == value){
    		document.getElementById('numero').style.display = 'none';
    		document.getElementById('kilometro').style.display = 'block';
    	}else{
    		document.getElementById('numero').style.display = 'block';
    		document.getElementById('kilometro').style.display = 'none';
    	}
    }
  }
  

  /* Funcion para sustituir los puntos por las comas en la caja de texto de kilometro */
  function sutituirPuntos(object){
  	var valor = object.value;
	object.value = valor.replace('.',',');
  }
  
  
  /* Funcion para habilitar/deshabilitar los datos de la direccion del sntro industrial */
  function gestionDatosDireccionSntroIndustrial(posicion, swConsulta, swBloqueado){
    
    var flag = false;
    if(posicion == 0){
      flag = true;
    }
  
    document.getElementById('direccionSntroView.idTipoVia').disabled = flag; 
    document.getElementById('direccionSntroView.via').disabled = flag; 
    document.getElementById('idNumKm').disabled = flag; 
    document.getElementById('direccionSntroView.numero').disabled = flag; 
    document.getElementById('direccionSntroView.kilometro').disabled = flag; 
    document.getElementById('direccionSntroView.bloque').disabled = flag; 
    document.getElementById('direccionSntroView.piso').disabled = flag; 
    document.getElementById('direccionSntroView.puerta').disabled = flag; 
    document.getElementById('direccionSntroView.idPais').disabled = flag; 
    document.getElementById('direccionSntroView.codPostal').disabled = flag; 
    document.getElementById('direccionSntroView.localidad').disabled = flag; 
    document.getElementById('direccionSntroView.idProvincia').disabled = flag; 

  }  
 
 /* Funcion para el control del estado */
 function controlEstado(valorSi, idEstadoAct, idEstadoSgte){
   
   var swCambiarEstado = document.getElementById('swCambiarEstado').value;
   if(swCambiarEstado == valorSi){
     document.getElementById('idMotivo').disabled = false;
     document.getElementById('idEstado').value = idEstadoSgte;
   }else{
     document.getElementById('idMotivo').disabled = true;
     document.getElementById('idMotivo').value = "";
     document.getElementById('idEstado').value = idEstadoAct;
   }
 }
      
function MostrarTooltip ( obj,num ) {              
		var texto =  obj.options[obj.selectedIndex].text;
		var numCaracteres = obj.options[obj.selectedIndex].text.length; 
		var QueTooltip = eval("document.getElementById('tooltip" + num + "')");
		
		QueTooltip.innerHTML = texto;
		if(texto!=''){
		//Formato Tooltip 
		//QueTooltip.style.zIndex = 9999999; 
		QueTooltip.style.width = 180+"px";//numCaracteres*7 + "px";
		QueTooltip.style.display = "block"; 
		QueTooltip.style.position = "absolute"; 
		obj.style.position = "relative";
		QueTooltip.style.border =  "solid  1px black"; 
		QueTooltip.style.padding =   "3px"; 
		QueTooltip.style.fontSize =  "10px"; 
		QueTooltip.style.fontFamily = "Verdana"; 
		QueTooltip.style.backgroundColor = "LemonChiffon"; 
		QueTooltip.style.top = obj.offsetTop + obj.offsetHeight + "px";
		QueTooltip.style.left = obj.offsetLeft + "px";      
		}
	} 
	
	function OcultarTooltip (num){ 
		var QueTooltip = eval("document.getElementById('tooltip" + num + "')");
		QueTooltip.style.display = "none"; 
	}
	
	/* ************************************************************************ */
	
		//Funcion mostrar tooltip
	function MostrarTooltipPosicionado ( obj, tooltip ) {         
	     
 		var texto =  obj.options[obj.selectedIndex].text;
 		var numCaracteres = obj.options[obj.selectedIndex].text.length; 
 		
		if(obj.options[obj.selectedIndex].value !=""){
			document.getElementById(tooltip).innerHTML = texto;
		    //Formato Tooltip 
			document.getElementById(tooltip).style.zIndex = 9999999; 
			document.getElementById(tooltip).style.width = numCaracteres*7 + "px";
			document.getElementById(tooltip).style.display = "block"; 
			document.getElementById(tooltip).style.position = "absolute"; 
			obj.style.position = "relative";
			document.getElementById(tooltip).style.border =  "solid  1px black"; 
			document.getElementById(tooltip).style.padding =   "3px"; 
			document.getElementById(tooltip).style.fontSize =  "10px"; 
			document.getElementById(tooltip).style.fontFamily = "Verdana"; 
			document.getElementById(tooltip).style.backgroundColor = "LemonChiffon"; 
			document.getElementById(tooltip).style.top = obj.offsetTop + obj.offsetHeight + "px";
		          
			document.getElementById(tooltip).style.left = obj.offsetLeft + "px";              			
		}      
	}     
	
		//Funcion mostrar tooltip
	function MostrarTooltipPosicionadoLeft ( obj, tooltip, left ) {         
	     
 		var texto =  obj.options[obj.selectedIndex].text;
 		var numCaracteres = obj.options[obj.selectedIndex].text.length; 
 		
		if(obj.options[obj.selectedIndex].value !=""){
			document.getElementById(tooltip).innerHTML = texto;
		    //Formato Tooltip 
			document.getElementById(tooltip).style.zIndex = 9999999; 
			document.getElementById(tooltip).style.width = numCaracteres*7 + "px";
			document.getElementById(tooltip).style.display = "block"; 
			document.getElementById(tooltip).style.position = "absolute"; 
			obj.style.position = "relative";
			document.getElementById(tooltip).style.border =  "solid  1px black"; 
			document.getElementById(tooltip).style.padding =   "3px"; 
			document.getElementById(tooltip).style.fontSize =  "10px"; 
			document.getElementById(tooltip).style.fontFamily = "Verdana"; 
			document.getElementById(tooltip).style.backgroundColor = "LemonChiffon"; 
			document.getElementById(tooltip).style.top = obj.offsetTop + obj.offsetHeight + "px";
		          
			document.getElementById(tooltip).style.left = obj.offsetLeft + left + "px";              			
		}      
	}
	//Funcion que borra el contenido numerico cuando sea 0,00
	function resetInputNumericoOnFocus(object){
		if (object.value == "0,00"){
			object.value = "";
		}
	} 	
	//Funcion que borra el contenido numerico cuando sea 0,00
	function restoreInputNumericoOnBlur(object){
		if (object.value == ""){
			object.value = "0,00";
		}
	}
	/* Función para la cancelacion de una apertura de un siniestro */
	function cancelarApertura(msg, accionEliminar){
		if (confirm(msg)) {
	      	muestraCarga();
	      	getPage(accionEliminar, 'iAreaTrabajo');
			// agenda & menu
			parent.mostrarArbolAgenda();
		}
	}
	
	function cambiarCapaDatos(value) {
		var opcion = parseInt(value);
		if(opcion == idCtaBancaria){
			document.getElementById("datosIban").style.display = "none";
			document.getElementById("datosCCC").style.display = "block";
		}else if(opcion == idCtaIban){
			document.getElementById("datosIban").style.display = "block";
			document.getElementById("datosCCC").style.display = "none";
		}
	}
	
	function comprobarPosicionReclamo(comboPosicion){
		if(valorRecobro==valorNo && comboPosicion.value==valorCausante){
			alert(textoErrorPosicionRecobro);
			comboPosicion.value=valorPerjudicado;
		}
	}
	
	