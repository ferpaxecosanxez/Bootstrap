function buscaValoresCaracteristica(action, nombreForm, mensajeError, idProdRiesgoCarac, indice, width, height){
	
	if(idProdRiesgoCarac == undefined || idProdRiesgoCarac == ""){
		alert(mensajeError);
		return;
	}
	
	action = action + "?caracteristica.id=" + idProdRiesgoCarac + "&indice=" + indice+ "&nombreForm="+ nombreForm;
	   
	var valorRetorno = lanzarVentana(action);
}

function getRiesgos(action, idComboGarantias, idProdEfec){
	jQuery("#spanFecha").text(jQuery("#fechaEfec").val());
	
	if(idComboGarantias != null){
		limpiarCombo(idComboGarantias);
	}
	
	if(jQuery("input[id='" + idProdEfec + "']").val()){
		document.forms[0].action = action + "?idProdTec=" + jQuery("input[id='" + idProdEfec + "']").val();
	    document.forms[0].submit();
	}
}

function busquedaProd(idSpanFecha, idFechaEfec, idProdEfec, codProdTec, desProdTec, idRiesgo){
	if(idSpanFecha != null){
		jQuery("input[id='"+idSpanFecha+ "']").text(jQuery("input[id='"+idFechaEfec + "']").val());
	}
    
    var idProdEfec = jQuery("input[id='"+idProdEfec+"']").val();
    var codProdTec = jQuery("input[id='"+codProdTec+"']").val();
    var desProdTec = jQuery("input[id='"+desProdTec+"']").val();
    var idRiesgo = jQuery("input[id='"+idRiesgo+"']").val();
    var riesgoPT = jQuery('select[name="riesgoPT"] option:selected').val();
    
    var actionString = actionConsulta + '?idProdEfec=' + idProdEfec + '&codProdTec=' + codProdTec + '&desProdTec=' + desProdTec;
    
	if( idRiesgo != null && idRiesgo != ""){
		actionString += '&idRiesgo=' + idRiesgo + '&riesgoPT=' + riesgoPT;
		document.forms[0].action = actionString;
		document.forms[0].submit();
	}
}

function limpiarFechaEfecto(){
	jQuery("#spanFecha").text("");
}

function limpiarFormularioDocumentacion(){
	limpiar(document.forms[0],camposNoTocar);
	limpiarCombo('comboGarantias');
	limpiarCombo('comboRiesgos');
	limpiarFechaEfecto();
}

/* Funcion para cancelar operación sobre productos */
function cancelarOperacionProducto(msg, url, target, accionAgenda) {
	if(msg == null)   {
	   getPage(url, target);
	   // desplegar agenda
	   top.plegar("cAgenda");
	   // agenda & menu
	   menuAgenda(accionAgenda);
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

/* Funcion para mostrar el menu de la izquierda y recargar la agenda */
function menuAgenda(accionAgenda){
   
   // se elimina la lavadora
   parent.document.getElementById('divGeneral').style.visibility = 'hidden';
   
   // se muestra el menu
	if(top.menuPlegado)  {
     top.plegar('cMenuArea');
   }
   
   top.controlArbolProducto();
   
   //cambia el iframe derecho de la pagina principal para que aparezca la agenda de nuevo 
   var localizacion = "" + window.parent.frames[2].location;
   var indice = localizacion.indexOf('monitor');
   if (indice > -1) {
	  window.parent.frames[2].location = accionAgenda;
	  top.window.document.getElementById("agTituloGif").src = top.window.imgAgTitulo.src;
	}
}