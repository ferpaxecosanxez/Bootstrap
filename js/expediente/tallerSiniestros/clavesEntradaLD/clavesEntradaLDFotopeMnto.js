/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA CLAVES ENTRADA LD FOTOPERITACIÓN
 */

function comprobarDatos() 
   {
   	  var claveEntrada = document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].selectedIndex].text;
   	  var claveSapLd = document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].selectedIndex].text;
   	  var tipoEncargo = document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].options[document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].selectedIndex].text;
   	  
            
      if ((claveEntrada=="")&&(claveSapLd=="")&&(tipoEncargo=="")) {
      	alert(rellenoCampo);
      }
      else if(claveEntrada=="") {
		alert(claveEntradaVacio);      
      }
      else if(claveSapLd=="") {
		alert(claveSAPLDVacio);      
      }
      else if(tipoEncargo=="") {
		alert(tipoEncargoVacio);      
      }
      else {
		submitForm(document.forms[0],null,'iAreaTrabajo')
      }
    }