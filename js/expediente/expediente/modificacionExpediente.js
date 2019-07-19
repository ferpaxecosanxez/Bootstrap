/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA DE MODIFICACION DE EXPEDIENTE
 */
 
 /* Funcion para cancelar el expediente */
 function cancelarModificacion(msg, url) {
  if (confirm(msg)) {
	  muestraCarga();
      getPage(url);
  }
 }
  
 /* Funcion para enviar los datos */
 function gestionModificacionDatos(action, idObjModificar, idTipoObjModificar){
	
	action = action + '?idObjModificar=' + idObjModificar;
	action = action + '&idTipoObjModificar=' + idTipoObjModificar;
	if(submitFormActionMsg(document.forms[0], action, null, 'iAreaTrabajo', null))
      muestraCarga();
  }

 /* Funcion para las modificaciones de los datos de la descripcion de accidentes de autos */
 function modificacionDescripcionAccidente(swBloquearArbol, valorSi, idEstadoRgo, estadoTerminado){
 
    if(swBloquearArbol == valorSi){
      
      if(idEstadoRgo == estadoTerminado){
        // no se permiten modificaciones
        allDisabledForm(document.forms(0),'true');
      
      }else{
       // se pueden modificar los datos del rgo
       allDisabledForm(document.forms(0),'false');
       document.getElementById('imgBusqLocalidad').disabled = false; 
      }
      
    }else{
    
	  allDisabled(document.forms(0),'true');   
	  document.getElementById('imgBusqLocalidad').disabled = true;  
    }
 }


 /* Funcion para las modificaciones de los datos generales de industriales */
 function modificacionDatosGenerales(swBloquearArbol, valorSi, idEstadoRgo, estadoTerminado){
 
    if(swBloquearArbol == valorSi){
      
      if(idEstadoRgo == estadoTerminado){
        // no se permiten modificaciones
        allDisabledForm(document.forms(0),'true');
      
      }else{
       // se pueden modificar los datos del rgo
       allDisabledForm(document.forms(0),'false');
       controlImagenesDatosGrales(false);
      }
      
      //A partir de la incidencia número 3035 se puede modificar el tramitador
      //document.getElementById('idTramitador').disabled = true; 
    }else{
    
	  allDisabled(document.forms(0),'true');    
      controlImagenesDatosGrales(true);
    }
 }
   
      
 /* Funcion para las imagenes de la pantalla de datos del rgo */
 function controlImagenesDatosGrales (flag){
   document.getElementById('calenFecDecla').disabled = flag;
   document.getElementById('calenFecComun').disabled = flag; 
   document.getElementById('imgBusqLocalidad').disabled = flag; 
 } 
 
       
 /* Funcion para el control datos de caracter personal */
  function gestionDatosEsPersonaSistema(tipo, valor){
    var flag = true;
    if(valor == '0'){
      flag = false;
    }
    document.getElementById('telefono1.telefono').disabled = valor;
    document.getElementById('telefono2.telefono').disabled = valor;
    document.getElementById('telefono3.telefono').disabled = valor;
    document.getElementById('email.email').disabled = valor;
    
    // imagenes
    document.getElementById('imgBusqPersona').disabled = flag;
    document.getElementById('btLimpiar').disabled = flag;
    document.getElementById('imgBusqLocalidad').disabled = flag;
    
    if(tipo == 'P'){
      // datos bancarios
      document.getElementById('ctaBanco.codIban').disabled = valor;
      document.getElementById('ctaBanco.codBanco').disabled = valor;
      document.getElementById('ctaBanco.codSucursal').disabled = valor;
      document.getElementById('ctaBanco.ctaDigito').disabled = valor;
      document.getElementById('ctaBanco.ctaBanco').disabled = valor;
    }
    
    if(tipo == 'fax'){
      // fax
      document.getElementById('fax.telefono').disabled = valor;
    }
  }	      
      
 /* Funcion para el control datos de caracter personal */
  function gestionDatosEsPersonaSistemaPorTipo(tipo, valor){
    var doc = window.frames['iTabContent'].document;

    if(tipo == 'C'){
      doc.getElementById('telefono1C.telefono').disabled = valor;
      doc.getElementById('telefono2C.telefono').disabled = valor;
      doc.getElementById('telefono3C.telefono').disabled = valor;
      doc.getElementById('emailC.email').disabled = valor;
      doc.getElementById('faxC.telefono').disabled = valor;
    }
    if(tipo == 'T'){
      doc.getElementById('telefono1T.telefono').disabled = valor;
      doc.getElementById('telefono2T.telefono').disabled = valor;
      doc.getElementById('telefono3T.telefono').disabled = valor;
      doc.getElementById('emailT.email').disabled = valor;
      doc.getElementById('faxT.telefono').disabled = valor;
    }
    if(tipo == 'P'){
      doc.getElementById('telefono1P.telefono').disabled = valor;
      doc.getElementById('telefono2P.telefono').disabled = valor;
      doc.getElementById('telefono3P.telefono').disabled = valor;
      doc.getElementById('emailP.email').disabled = valor;
      doc.getElementById('faxP.telefono').disabled = valor;
    }
    
  }	      
 /* Funcion para las modificaciones de los datos de los objetos sntro */
 function modificacionDatosObjetoSntro (swBloquearArbol, swModPersona, valorSi, valorNo, idEstadoRgo, estadoTerminado, tipo, tramitador){
 
    if(swBloquearArbol == valorSi){
      
      if(idEstadoRgo == estadoTerminado){
        // no se permiten modificaciones
        allDisabledForm(document.forms(0),'true');
      
      }else{
       // se pueden modificar los datos del objeto de sntro
       allDisabledForm(document.forms(0),'false');
       
       if(swModPersona == valorNo){
         // no se permite modificar los datos personales
         gestionDatosEsPersonaSistema('', 'true');
         controlImagenesObjetoSntro(false, true, tipo);
       }else{
         controlImagenesObjetoSntro(false, true, tipo);
       }
      }
      
      if(tramitador){
        document.getElementById('idTramitador').disabled = true; 
      }  
    }else{
      allDisabled(document.forms(0),'true');    
	  controlImagenesObjetoSntro(true, true, tipo);
    }
 }
  
 /* Funcion para las imagenes de las pantallas de datos de los objetos sntro */
 function controlImagenesObjetoSntro (flag, persona, tipo){
 
   document.getElementById('imgBusqPersona').disabled = flag;
   if(tipo == 'L'){
     document.getElementById('imgFecFallecimiento').disabled = flag; 
   }
   
   if(persona){
     document.getElementById('imgBusqDatosPsn').disabled = true; 
     document.getElementById('imgBusqLocalidad').disabled = true; 
  }else{
     document.getElementById('imgBusqDatosPsn').disabled = false; 
     document.getElementById('imgBusqLocalidad').disabled = false;   
  } 
 }  
       
 /* Funcion para las modificaciones de los datos de la descripcion de accidentes de autos */
 function modificacionVehiculo(swBloquearArbol, valorSi, idEstadoRgo, estadoTerminado){
 
    if(swBloquearArbol == valorSi){
      
      if(idEstadoRgo == estadoTerminado){
        // no se permiten modificaciones
        allDisabledForm(document.forms(0),'true');
      
      }else{
       // se pueden modificar los datos del rgo
       allDisabledForm(document.forms(0),'false');
      }
    }else{
      allDisabled(document.forms(0),'true');    
    }
 }
  
     
     
 /* Funcion para las modificaciones de los datos de los objetos sntro */
 function modificacionDatosPersonalesVehiculo (swBloquearArbol, swModPersona, valorSi, valorNo, tipo){
    
    if(swBloquearArbol == valorSi){
      if(swModPersona == valorNo){
         // no se permite modificar los datos personales
         controlImagenesDatosPersonalesVehiculo(false, true, tipo);
       }else{
         // se pueden modificar los datos personales
         controlImagenesDatosPersonalesVehiculo(false, false, tipo);
       }
    }else{
      allDisabled(document.forms(0),'true');    
	  controlImagenesDatosPersonalesVehiculo(true, true, tipo);
    }
 }     
     


 /* Funcion para las imagenes de las pantallas de los conductores, propietarios y tomadores */
 function controlImagenesDatosPersonalesVehiculo (flagPsn, flagGral, tipo){
   document.getElementById('imgBusqDatosPsn').disabled = flagPsn;
   document.getElementById('btLimpiar').disabled = flagPsn;
   
   if(tipo == 'C'){
     document.getElementById('btLimpiar').disabled = flagGral;
     document.getElementById('imgBusqPersona').disabled = flagGral;
     document.getElementById('imgBusqFecNaci').disabled = flagGral;
     document.getElementById('imgBusqFecCarnet').disabled = flagGral;
     document.getElementById('imgBusqLocalidad').disabled = flagGral;
   }
 } 
     
 /* Funcion para las bloquear las imagenes de las pantallas de los conductores, propietarios y tomadores */
 function controlImagenesDatosPersonalesVehiculoForm(flagPsn, flagGral, tipo, form){
   form.imgBusqDatosPsn.disabled = flagPsn;
   form.btLimpiar.disabled = flagPsn;
   if(tipo == 'C'){
     form.btLimpiar.disabled = flagGral;
     form.imgBusqPersona.disabled = flagGral;
     form.imgBusqFecNaci.disabled = flagGral;
     form.imgBusqFecCarnet.disabled = flagGral;
     form.imgBusqLocalidad.disabled = flagGral;
   }
 } 
        
  /* Funcion para habilitar/deshabilitar todos los campos de un formulario */
  function allDisabledForm(form,flag){
    var campos = form.elements;
    for(var i= 0;i<campos.length; i++){
      campos[i].name.disabled = flag;
    }
  }     
  
      
 /* Funcion para la consulta de los datos de las autoridades */
 function datosAutoridadModoConsulta(flag){
   
   document.getElementById('autoridadView.idAutoridad').disabled = flag;
   document.getElementById('autoridadView.swAtestado').disabled = flag;  
   document.getElementById('autoridadView.numAtestado').disabled = flag;
 }       
 
 
 /* Funcion para la consulta de los datos de las autoridades */
 function datosObservacionModoConsulta(flag){
   
   document.getElementById('idTipoObservacion').disabled = flag;
   document.getElementById('txtObservacion').disabled = flag;  
 } 
 
 
 /* Funcion para la consulta de los datos de los beneficiarios reclamantes */
 function datosBeneficiarioModoConsulta(flag){
   
   document.getElementById('idParentesco').disabled = flag;
   document.getElementById('imgBusqDatosPsn').disabled = flag;
   gestionDatosEsPersonaSistema('P', flag);
 }   
    
 /* Funcion para la consulta de los datos de los beneficiarios reclamantes */
 function datosTestigoModoConsulta(flag){
   
   document.getElementById('imgBusqDatosPsn').disabled = flag;
   gestionDatosEsPersonaSistema('fax', flag);
 }   
