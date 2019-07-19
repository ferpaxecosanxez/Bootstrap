/* Funcion para el control de las personas*/
    function controlPsn(tipoIdent,nombre,razonSocial) {
      var idTipoPns = document.getElementById(tipoIdent).value;
      if(idTipoPns != 1){
        // persona fisica
        document.getElementById(nombre).value = "";
        document.getElementById(razonSocial).disabled = true;
            
      }else{
        // persona juridica 
        document.getElementById(razonSocial).value = "";
        document.getElementById(nombre).disabled = true;
      } 
    }
    
    /* Funcion para la comprobar si es posible mostrar los datos adicionales de la persona */
    function datosPersonales(tipoObj,idPersona, tipoPersona, domicilioSel, telefonoSel, emailSel){
      var idPersona = document.getElementById(idPersona).value;
      var tipoPersona = document.getElementById(tipoPersona).value;
      
      if(tipoObj == 0) {
        // datos parte implicada
        document.getElementById('tipoObjeto').value = vImplicado;
      } else if(tipoObj == 1) {
        // datos abogado
        document.getElementById('tipoObjeto').value = vAbogado;
      } else {
        // datos procurador
        document.getElementById('tipoObjeto').value = vProcurador;
      }
      
      if(idPersona == ""){
        alert("errorDatosAdicionales " + errorDatosAdicionales);
      } else {
        
        var pag = datosPersonalesInicializar;
        pag = pag + "?persona.id=" + idPersona;
        pag = pag + "&persona.tipoPersona.id=" + tipoPersona;
        pag = pag + "&swCtasBancarias=0";
        pag = pag + "&swPermisos=0";
        var valor = lanzarVentana(pag,500,550);
         
        if (valor != null) {
          // domicilio
          setValueLst(domicilioSel,valor[0]);
          // telefonos
          setLstValueLst(telefonoSel,valor[1]);
          // email
          setValueLst(emailSel,valor[2]);
          // se actualizan los datos
          var action = actualizarDatosPersonales;
          document.forms[0].action = action;
          submitFormActionMsg(document.forms[0],action,null,'iAreaTrabajo',null); 
        }
      }
    }
  
    /* Funcion que llama a la ventana modal para la busqueda de personas */
    function lupaBuscaPersonas(tipoObj,idPsn, idTipoIdent, nroIdent, nombre, apel1, apel2, tipoPersona, razonSocial){
      var pag = lupaBuscaPersonas;
      var tipoPsn = document.forms[0].elements[idTipoIdent].options[document.forms[0].elements[idTipoIdent].selectedIndex].text;
      if (tipoPsn == "C.I.F."){
        pag = pag + "?tipoPersona=2";
        pag = pag + "&razonSocial="+document.getElementById(razonSocial).value;
      } else {
        pag = pag + "?tipoPersona=1";
        pag = pag + "&apel1="+document.getElementById(apel1).value;
        pag = pag + "&apel2="+document.getElementById(apel2).value;
      }
         
      if(tipoObj == 0) {
        // datos parte implicada
        document.getElementById('tipoObjeto').value = vImplicado;    
      } else if(tipoObj == 1) {
        // datos para el abogado
        document.getElementById('tipoObjeto').value = vAbogado;
      } else {
        // datos para el procurador
        document.getElementById('tipoObjeto').value = vProcurador;
      }
      
      pag= pag + "&tipoIdentificador="+document.getElementById(idTipoIdent).value;
      pag= pag + "&identificador="+document.getElementById(nroIdent).value;
      pag= pag + "&nombre="+document.getElementById(nombre).value;
       
      var valor = busquedaPersona(pag, idPsn, idTipoIdent, nroIdent, nombre, apel1, apel2, tipoPersona);
      if (valor != undefined) {
        var action = reloadPersona;
        document.forms[0].action = action;
        submitFormActionMsg(document.forms[0],action,null,'iAreaTrabajo',null);
      }
    }
       
    /* Función para seleccionar un profesional */
    function buscarProfesional(idTipoProveedor){
      muestraCarga();
      var pag = buscarProfesionalSeleccionado;
      pag = pag + '?idTipoProveedor='+idTipoProveedor;
      pag = pag + '&idTipoProfesional='+idTipoProveedor;
      
      var valor = lanzarVentana(pag,700,650);
      
      if(valor != undefined){
        if(idTipoProveedor == idTipoProveedorAbogado){
          document.getElementById('idProfesionalA').value = valor[0];
          document.getElementById('tipoObjeto').value = vAbogado;
        }else{
          document.getElementById('idProfesionalP').value = valor[0];
          document.getElementById('tipoObjeto').value = vProcurador;
        } 
        submitFormActionMsg(document.forms[0],reloadPersona,null,'iAreaTrabajo',null);
      }
    }
    
  /* Funcion para guardar los datos */
  function enviarDatosParteImplicada(action){		
    var validado = validateDatosParteImplicadaForm(document.forms[0]);
    if(validado == true){
      submitFormActionMsg(document.forms[0],action,null,'iAreaTrabajo',null); 
    }
  }  
  
	/* Funcion para la consulta de los datos de la parte implicada */
	function datosParteImplicadaModoConsulta(flag){
	  if (!flag){
		  document.getElementById('imgBusqAbogado').disabled = flag;
		  document.getElementById('imgBusqOtrosDatosAbog').disabled = flag;
		  document.getElementById('btLimpiarAbog').disabled = flag;
		  document.getElementById('imgBusqProcurador').disabled = flag;
		  document.getElementById('imgBusqOtrosDatosProc').disabled = flag;
		  document.getElementById('btLimpiarProc').disabled = flag;
		  document.getElementById('imgBusqAbogado').style.display = "none";
		  document.getElementById('imgBusqOtrosDatosAbog').style.display = "none";
		  document.getElementById('btLimpiarAbog').style.display = "none";
		  document.getElementById('imgBusqProcurador').style.display = "none";
		  document.getElementById('imgBusqOtrosDatosProc').style.display = "none";
		  document.getElementById('btLimpiarProc').style.display = "none"; 
	  }
	}