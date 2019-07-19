
function activarDesactivar(combo) {
     indice = combo.selectedIndex;
     alert("probada activarDesactivar(combo)");
     if(combo.name == 'documentoAlta.swEnvio')
     {alert("probada activarDesactivar(combo) combo.name == 'documentoAlta.swEnvio'");
        if(indice == 0)
       {alert("probada activarDesactivar(combo) indice == 0");
          jQuery('#documentoAlta.asuntoEnvio').disabled=true;
          setValue("documentoAlta.asuntoEnvio",'');  
          
          jQuery('#documentoAlta.cuerpoEnvio').disabled=true;
          setValue("documentoAlta.cuerpoEnvio",'');  
          
          jQuery('#idDestinoDocumento').selectedIndex="0";
          jQuery('#idDestinoDocumento').disabled=true;
          
          jQuery('#documentoAlta.idMedioEnvioDocu').selectedIndex="0";
          jQuery('#documentoAlta.idMedioEnvioDocu').disabled=true;
          
          jQuery('#documentoAlta.codHtmlPlantilla').selectedIndex="0";
          jQuery('#documentoAlta.codHtmlPlantilla').disabled=true;
          
          jQuery('#botonCamposDinamicos').disabled=true;
       }
       else
       {alert("probada activarDesactivar(combo) else");
          jQuery('#documentoAlta.asuntoEnvio').disabled=false;
          jQuery('#documentoAlta.cuerpoEnvio').disabled=false;
          jQuery('#idDestinoDocumento').disabled=false;
          jQuery('#documentoAlta.idMedioEnvioDocu').disabled=false;
          jQuery('#documentoAlta.codHtmlPlantilla').disabled=false;
          jQuery('#botonCamposDinamicos').disabled=false;
           }
         }
      }


      function obtenerCombos()
      {alert("probada obtenerCombos()");
         obtenerCamposDinamicos();
      }
   
         
      function obtenerCamposDinamicos(form)
      {
    	 if(jQuery(":input[name='documentoAlta.idTipoDocGd']").val() != ''){
    		 retrieveURLParameterSync(actionObtieneCamposDinamicos,form,'documentoAlta.idTipoDocGd','estadoObjetoAjax');
    	 }
      }

  function activarDesactivarEnvio(action)
  {
     indiceId = jQuery('select[name="documentoAlta.swEnvio"] option:selected').index();
     if(indiceId == indiceSi)
     {
        showHide('divBloqueEnvio',true);
     }
     else
     {
        if (confirm(mensajeConfirmacionLimpiarEnvio)) 
        {      
	        submitFormActionMsg(document.forms[0], action, null, 'iAreaTrabajo');     
	        jQuery('select[name="documentoAlta.idMedioEnvioDocu"]').val("");
	        setValue("documentoAlta.asuntoEnvio",'');  
	        setValue("documentoAlta.cuerpoEnvio",'');  
	        jQuery('select[name="documentoAlta.codHtmlPlantilla"]').val("");
	        jQuery('select[name="idDestinoDocumento"]').val("");
	        showHide('divBloqueEnvio',false);
        }
        else
        {alert("provada activarDesactivarEnvio() confirm(mensajeConfirmacionLimpiarEnvio) else");
            jQuery('select[name="documentoAlta.swEnvio"]').index(indiceSi);
        }
     }
  }

  function activarDesactivarDocumentoPlantilla()
  {
  
     indiceId = jQuery('select[name="documentoAlta.swGenerar"] option:selected').index();
     if(indiceId == indiceSi)
     {
        showHide('divTipoDocumentoPlantilla1',true);
        showHide('divTipoDocumentoPlantilla2',true);
        showHide('divTipoDocumentoPlantilla3',true);
        showHide('divTipoDocumentoPlantilla4',true);
     }
     else
     {

        setValue("documentoAlta.idTipoDocGd",'');
        setValue("documentoAlta.codTipoDocGd",'');   
        setValue("documentoAlta.descripcionTipoDocGd",'');       
        setValue("documentoAlta.descripcionPlantillaGd",'');
        setValue("documentoAlta.idPlantillaGd",'');
        
        showHide('divTipoDocumentoPlantilla1',false);
        showHide('divTipoDocumentoPlantilla2',false);
        showHide('divTipoDocumentoPlantilla3',false);
        showHide('divTipoDocumentoPlantilla4',false);      
     }
  } 
   
    
   function busquedaCondicionGeneracion(pag)
  {
  setValue('documentoAlta.idCondGeneracion','');
  setValue('documentoAlta.descripcionCondicionGeneracion','');

    var valor = lanzarVentana(pag,600,400);
  
    if(valor != undefined) 
      {
        setValue("documentoAlta.idCondGeneracion",valor[0]);  
        setValue("documentoAlta.codigoCondicionGeneracion",valor[1]);
        setValue("documentoAlta.descripcionCondicionGeneracion",valor[2]);
    }else{
        setValue("documentoAlta.idCondGeneracion",'');  
        setValue("documentoAlta.codigoCondicionGeneracion",'');
        setValue("documentoAlta.descripcionCondicionGeneracion",'');
    }
  }
  
  
  function busquedaPlantilla(pag)
  {
       var valor = lanzarVentana(pag,600,400);   
       if(valor != undefined) 
       {
          setValue("documentoAlta.idPlantillaGd",valor[0]);
          setValue("documentoAlta.codPlantillaGd",valor[1]);
          setValue("documentoAlta.descripcionPlantillaGd",valor[2]);
       }
  }
  
  function busquedaPlantillaHTML(pag)
  {
       var valor = lanzarVentana(pag,600,400);   
       if(valor != undefined) 
       {
          setValue("documentoAlta.asuntoCuerpoIdGd",valor[0]);
          setValue("documentoAlta.codHtmlPlantilla",valor[1]);
          setValue("documentoAlta.descripcionHtmlPlantilla",valor[2]);
       }
  }
  
  function busquedaCorreo(pag)
  {
    var valor = lanzarVentana(pag,600,400);   
    if(valor != undefined) 
    {
       setValue("documentoAlta.idTipoCorreoGd",valor[0]);
       setValue("documentoAlta.codTipoCorreoGd",valor[1]);
       setValue("documentoAlta.descripcionTipoCorreoGd",valor[2]);
    }  
  }
  
  function busqueda(pag, form)
  {
    var valor = lanzarVentana(pag,600,400);   
    if(valor != undefined) 
    {
       setValue("documentoAlta.idTipoDocGd",valor[0]);
       setValue("documentoAlta.codTipoDocGd",valor[1]);
       setValue("documentoAlta.descripcionTipoDocGd",valor[2]);
       if(form != null){
    	   obtenerCamposDinamicos(form);
       }
    }    
  }

    function busquedaCamposDinamicos(nameCampo, pag)
  {
    var valor = lanzarVentana(pag,600,400);
    if(valor != undefined && nameCampo != ''){
    	objetoValor = jQuery("input[name='"+ nameCampo +"']");
    	valorCampo = objetoValor.val();
    	valorCampo += "/$" + valor[0] + "$";
    	objetoValor.val(valorCampo);
    }
  }
    
  function validarAceptar()
  {
                                
    indice = jQuery('select[name="documentoAlta.swEnvio"] option:selected').index();
     
    if (indice>0)
    {
       indice = jQuery('select[name="documentoAlta.idMedioEnvioDocu"] option:selected').index();
       
       if (indice==0)
       {
          alert(propiedadIdMedioEnvio);
          return false;
       }
       else
       {
          asunto = jQuery('textarea[name="documentoAlta.asuntoEnvioLabel.description"]').val();
    
          if (asunto==undefined || asunto=='')
          {
             alert(propiedadAsuntoEnvio);
             return false;
          }
          else
          {
             cuerpo = jQuery('textarea[name="documentoAlta.cuerpoEnvioLabel.description"]').val();
    
             if (cuerpo ==undefined || cuerpo=='')
             {
                alert(propiedadCuerpoEnvio);
                return false;
             }
             else
             {
                indice = jQuery('select[name="documentoAlta.codHtmlPlantilla"] option:selected').index();
    
                if (indice==0)
                {
                   alert(propiedadIdHtmlPlantilla);
                   return false;
                }
             }            
          }
       
          var cuerpo = jQuery('textarea[name="documentoAlta.cuerpoEnvioLabel.description"]').val();
          var asunto = jQuery('textarea[name="documentoAlta.asuntoEnvioLabel.description"]').val();
          
          var texto = asunto+' '+cuerpo;
          
          if (!validaCamposDinamicos(texto))
          {
             return false;
          }
          
       }
              
    }

    if (!validaCamposDinamicos(jQuery('input[name="documentoAlta.carpetaGd"]').val()))
    {
       return false;
    }
           
    if (getValue("documentoAlta.descripcionLabel.description")=='')
    {
       alert(mnsajeValidacionDescripcion);
       return false;
    }

    indiceId = jQuery('select[name="documentoAlta.swGenerar"] option:selected').index();
    if(indiceId == indiceSi)
    {
	    if (jQuery("input[name='documentoAlta.idTipoDocGd']").val()=='')
	    {
	       alert(validacionTipoDocIdGd);
	       return false;    
	    }
    }
       
   	submitFormMsg(document.forms[0],validateSalidaAltaForm,'iAreaTrabajo',mensajeAlta);
	
  }
	  
	function validaCamposDinamicos(texto)
	{
   
       var res = texto.split(' ');
	
	   for (var i=0; i < res.length; i++) 
	   {
	      if (res[i].indexOf("$")>-1)
	      {
	         var x = jQuery('select[name="idCatalogoCamposDinamicos"]').children();
	
	         var txt = '';
	         var existe = 'N';
	         
	         parte = res[i];
	         while(parte.indexOf("$")>=0)
	         {
		         valor1 = parte;
	             primero=valor1.indexOf("$");
	             valor2 = valor1.substr(primero+1);
	             segundo=valor2.indexOf("$");

                 if (segundo>0)
                 {
                    final=valor1.substr(primero,segundo+2);
                 }
                 else
                 {
                    final=valor1;
                 }

		         for (var j=0; j < x.length; j++)
		         {
		            var valor = x[j].text;
		            if (final.toUpperCase()=='$'+valor.toUpperCase()+'$')
		            {
		               existe = "S";
		               break;
		            }
		            else
		            {
		               existe = "N";  
		            }
		         }
		         
		         if (existe=="N")
		         {
	                texto=mensajeCampoNoDefinido;
	                texto=texto.replace('[0]',final);
   	                texto=texto.replace('[1]',jQuery('input[name="documentoAlta.descripcionTipoDocGd"]').val());
                    
                    alert(texto);
                    
		            return false;
		         }
		         
		         parte=parte.substr(primero+segundo+2);
             }
	      }
	   }
	   return true;
	}

  function seleccionDestinatario(idDestinatario)
  {
         jQuery('input[name="destinatarioSeleccionado"]').val(idDestinatario);
         jQuery('select[name="idDestinoDocumento"]').val(idDestinatario);
         eleccionDestinatario();
  }
      
  function eleccionDestinatario()
  {
    objetoIdDestino = jQuery('select[name="idDestinoDocumento"] option:selected');
    objetoDesinatarioSelecc = jQuery('input[name="destinatarioSeleccionado"]');
    objetoDescDestinatarioSelecc = jQuery('input[name="descripcionDestinatario"]');
    objetoIdDestinoHidden = jQuery('input[name="idDestinoDocumento_hidden"]')
    
    objetoDesinatarioSelecc.val(objetoIdDestino.val());
    objetoDescDestinatarioSelecc.val(objetoIdDestino.text());
    objetoIdDestinoHidden.val(objetoIdDestino.val());
   }

  function eliminarDestinatario(action)
  {
  	objetoDestinoDoc = jQuery('select[name="idDestinoDocumento"] option:selected');
     indiceId = objetoDestinoDoc.index();
     destino = objetoDestinoDoc.text();
         
     alert(indiceId);
     alert(destino);
     
     if (jQuery('input[name="destinatarioSeleccionado"]').val()==null)
     {
        alert(destinatarioNoSeleccionado);
        return false;     
     }
     
     if(destino == null || destino == '')
     {
        alert(destinoDocumentoNoSelecc);
        return false;
     }

     existe=0;
     
     if (jQuery('#tablaregistroDestinatarios')!=null)
     {
     	rows = jQuery("#tablaregistroDestinatarios tr");
     	jQuery("#tablaregistroDestinatarios tr").each(function() {
     		primerTd = jQuery(this).find('td:first-child');
     		if(primerTd.attr("id") == jQuery('select[name="idDestinoDocumento"] option:selected').val()){
     			existe=1;
     		}
     	});
     }
    
    if (existe==0)
    {
       alert(destinatarioNoExiste);
       return false;
    }
    else
    {
       submitFormActionMsg(document.forms[0], action, null, 'iAreaTrabajo');
       return true;
    }
             
  }
  
  function validacionDestinatarios(action)
  {
  
    objetoIdDestinoSelected = jQuery('select[name="idDestinoDocumento"] option:selected');
    indiceId = objetoIdDestinoSelected.index();
    destino = objetoIdDestinoSelected.text();

    if(destino == null || destino == '')
    {
       alert(destinoDocumentoNoSelecc);
       return false;
    }
    
    existe=0;
    
    if (jQuery('#tablaregistroDestinatarios')!=null)
    {
    	rows = jQuery("#tablaregistroDestinatarios tr");
    	jQuery("#tablaregistroDestinatarios tr").each(function() {
    		primerTd = jQuery(this).find('td:first-child');
    		if(primerTd.attr("id") == jQuery('select[name="idDestinoDocumento"] option:selected').val()){
    			existe=1;
    		}
    	});
    }    

    
    if (existe==0)
    {
       submitFormActionMsg(document.forms[0], action, null, 'iAreaTrabajo');
       return true;
    }
    else
    {
       alert(destinatarioYaExiste);
       return false;
    }
      
  }

  function limpiarPlantillaEmail(){
	  setValue("documentoAlta.asuntoCuerpoIdGd","");
      setValue("documentoAlta.codHtmlPlantilla","");
      setValue("documentoAlta.descripcionHtmlPlantilla","");
  }
  
  function activarDesactivarIndexarCorreo()
  {
	  
	 if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == medioEnvioSMSSeguro){
		 limpiarPlantillaEmail();
         jQuery("#imgObligatoriaPlantillaEmail").css("visibility", "hidden");
	 } else {
		 jQuery("#imgObligatoriaPlantillaEmail").css("visibility", "visible");
	 }
	  
	 if(false){
		 // no utilizado actualmente
		 jQuery('select[name="documentoAlta.swIndexarEnvio"]').val("");
		 
		 if(jQuery('select[name="documentoAlta.idMedioEnvioDocu"]').val() == idEnvioCorreo)
		 {
		    showHide('divIndexarCorreo1',true);
		    showHide('divIndexarCorreo2',true);
		 }
		 else
		 {
		    showHide('divIndexarCorreo1',false);
		    showHide('divIndexarCorreo2',false);
		 }
	 } else {
		 if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == medioEnvioSMSSeguro){
			 jQuery("#destinatarioEmailTR").removeClass("oculta");
			 jQuery("#buzonEmailTR").addClass("oculta");
			 jQuery("select[name='documentoAlta\\.idBuzonContratacion']").val("");
			 jQuery("select[name='documentoAlta\\.idDestinatarioEmail']").val("");
			 jQuery("#imgObligDestEmail").removeClass("oculta");
		 } else if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == medioEnvioNoSeguro){
			 jQuery("#buzonEmailTR").removeClass("oculta");
			 jQuery("#destinatarioEmailTR").removeClass("oculta");
			 jQuery("#imgObligDestEmail").addClass("oculta");
			 jQuery("select[name='documentoAlta\\.idDestinatarioEmail']").val("");
		 } else {
			 jQuery("#buzonEmailTR").addClass("oculta");
			 jQuery("#destinatarioEmailTR").addClass("oculta");
			 jQuery("#imgObligDestEmail").addClass("oculta");
			 jQuery("select[name='documentoAlta\\.idBuzonContratacion']").val("");
			 jQuery("select[name='documentoAlta\\.idDestinatarioEmail']").val("");
		 }
	 }
       
  }
         
  function activarDesactivarTipoCorreoGd()
  {   
  	 objetoIncideSelected = jQuery('select[name="documentoAlta.swIndexarEnvio"] option:selected');
     indiceId = objetoIncideSelected.index();
     valorIndice = objetoIncideSelected.val();
     
     if(valorIndice == listaErroresDocumentoSi)
     {
        showHide('divIndexarTipoCorreoGd1',true);
        showHide('divIndexarTipoCorreoGd2',true);
     }
     else
     {
        jQuery('input[name="documentoAlta.idTipoCorreoGd"]').val("");
        jQuery('input[name="documentoAlta.codTipoCorreoGd"]').val("");
        jQuery('input[name="documentoAlta.descripcionTipoCorreoGd"]').val("");
        
        showHide('divIndexarTipoCorreoGd1',false);
        showHide('divIndexarTipoCorreoGd2',false);
     }
    
  }
  
  function busquedaDocEstaticos(pag)
  {
	 var valor = lanzarVentana(pag,800,600);   
	 if(valor != undefined) 
	 {    			
 		jQuery("#docEstaticoNombre").val(valor[1]);
 		jQuery("#docEstaticoTitulo").val(valor[2]);
 		jQuery("#docEstaticoAutor").val(valor[3]);
 		jQuery("#docEstaticoFechaCreacion").val(valor[4]);
 		jQuery("#docEstaticoIdioma").val(valor[5]);
 		jQuery("#docEstaticoUrl").val("/");
 		jQuery("#docEstaticoOper").val(1);
 	 }
   }
	  
   function activarDesactivarDocEstaticosGd()
   {   
	    objetoSelected = jQuery('select[name="documentoAlta.swEstatico"] option:selected');
 		indiceId = objetoSelected.index();
 		valor = objetoSelected.val();
 
 		if(valor == indiceSi)
 		{
    		document.getElementById("imgDocEstaticosGd").style.visibility = "visible";
 		}
 		else
 		{
    		document.getElementById("imgDocEstaticosGd").style.visibility = "hidden";
    		jQuery("#docEstaticoNombre").val("");
    		jQuery("#docEstaticoTitulo").val("");
    		jQuery("#docEstaticoAutor").val(""); 
    		jQuery("#docEstaticoFechaCreacion").val("");
    		jQuery("#docEstaticoIdioma").val("");
    		jQuery("#docEstaticoUrl").val("");
    		jQuery("#docEstaticoOper").val(0);
 		}   
   }

function activarDesactivarPlantillaEmail(){
  	indiceId = jQuery('select[name="documentoAlta.swEnvio"] option:selected').index();
	if(indiceId == indiceSi)
	{
		showHide('destinatarioEmail1',true);
 		showHide('destinatarioEmail2',true);
 		showHide('tipoPlantillaEmail1',true);
 		showHide('tipoPlantillaEmail2',true);
 		showHide('divBloqueEnvio',true);
	} else {
		showHide('destinatarioEmail1',false);
 		showHide('destinatarioEmail2',false); 
		showHide('tipoPlantillaEmail1',false);
 		showHide('tipoPlantillaEmail2',false);
 		showHide('divBloqueEnvio',false);
 		document.getElementById('asuntoCuerpoIdGd').value = '';
 		document.getElementById('descripcionHtmlPlantilla').value = ''; 
	}
}
	   
function validarAceptarKTP() {                               
	 if (getValue("documentoAlta.descripcionLabel.description")==''){
		alert(mnsajeValidacionDescripcion);
		return false;
	 }

	 indiceId = jQuery('select[name="documentoAlta.swGenerar"] option:selected').index();
	 if(indiceId == indiceSi){
		if (jQuery("input[name='documentoAlta.idTipoDocGd']").val()==''){
   			alert(validacionTipoDocIdGd);
   			return false;
		}
	 }
	 
	 indiceId = jQuery('select[name="documentoAlta\\.swEnvio"] option:selected').index();
     if(indiceId == indiceSi) {
    	 
    	 if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == ""){
    		 alert(propiedadIdMedioEnvio);
	   		 return false; 
    	 } else if(jQuery("input[name='documentoAlta\\.asuntoCuerpoIdGd']").val() == "" && jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() != medioEnvioSMSSeguro){
    		 alert(validacionPlantillaEmail);
	   		 return false;
    	 } else {
			 if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == medioEnvioSMSSeguro){
				 if(jQuery("select[name='documentoAlta\\.idDestinatarioEmail']") == ""){
					 alert(validacionDestinatarioEmail);
			   		 return false; 
				 }
			 } else if(jQuery("select[name='documentoAlta\\.idMedioEnvioDocu']").val() == medioEnvioNoSeguro){
				 if(jQuery("select[name='documentoAlta\\.idBuzonContratacion']") == ""){
					 alert(validacionBuzonContratacion);
			   		 return false;
				 }
			 }
    	 }
     }
	 
	submitFormMsg(document.forms[0],validateSalidaAltaForm,'iAreaTrabajo',mensajeAlta);	
}

function onLoadDocSalida(){
	layOutPantalla();
  	document.getElementById('idDestinoDocumento').selectedIndex = 0;
  	obtenerCamposDinamicos('salidaAltaForm');
  	activarDesactivarPlantillaEmail();
}