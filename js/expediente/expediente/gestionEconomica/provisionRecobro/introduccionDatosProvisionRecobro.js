
  /* Funcion para introducir los comentarios de la reserva */
  function introducirComentario(idReservaSntro, index, idConceptoRecobro){
   var pag = urlIntroducirComentario;
   pag = pag + '?conceptoRecobroView.id=' + idConceptoRecobro;
   var valor = lanzarVentana(pag,600,300);
   
   if (valor != undefined){
     var enlace = "comentario_" + index;
     document.getElementById(enlace).className="operacionesContenido";
   } 
  }
    
  /* se oculta la capa de los botones */
  window.onload = function() {
	 
  } 
  
  function undoNumber(num) {
  		num = num.split(".").join("");
  		num = num.split(",").join(".");
  		return parseFloat(num);
  }
  
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
  
  function rollbackValor(elementoModificado) {
	 	alert(alertaRollBackValor);
  		elementoModificado.value = 
  		document.forms[0].elements[elementoModificado.name+"Anterior"].value;
  		recalculaTotalesConceptos();
  }
  
  function recalculaTotalesConceptos() {
	  
	  	 var formulario = document.forms[0];

	  	 // Recalculamos el total para cada fila
	  	 for (var i = 0 ; i < contadorConceptos; i++) {
	  	    var importe = formulario.elements["provisionReservaSntro["+i+"].importe"].value;
	  	    var importeBD = formulario.elements["provisionReservaSntro["+i+"].importeInicialBD"].value;
	  	    if(trim(importe)==""){
	  	    	importe = "0,00";
	  	    }
	  	 	formulario.elements["polGarCobView.lstReservaRecobroView["+i+"].importe"].value = importe;
	      	formulario.elements["polGarCobView.lstReservaRecobroView["+i+"].importeVariacion"].value = doNumber(undoNumber(importe) - undoNumber(importeBD));
	  	 }
	  	 
	  	 // Recalculamos el total por columna
	  	 var totalDisponible = 0.0;
	  	 for (var i = 0 ; i < contadorConceptos; i++) {
	  	    importe = formulario.elements["provisionReservaSntro["+i+"].importe"].value;
	  	    if(trim(importe)==""){
	  	    	importe = "0,00";
	  	    }
	  	    totalDisponible += undoNumber(importe);
	  	 }
	  	 parent.document.getElementById("polGarCobView.reservaRecobroDisponibleTotal").value = doNumber(totalDisponible);
	  	 
  }
  

 /* Función que recalcula todos los totales de la pantalla incluyendo tanto la variación como el importe máximo de reserva */
  function recalculaTotales(elementoModificado) {

	 recalculaTotalesConceptos();
	 validaVariacion(elementoModificado);
  	
  } 
  
  function validaVariacion(elementoModificado) {
  
  	 if (elementoModificado != undefined) {
  	 	
  	 	
	  	 var actual = undoNumber(elementoModificado.value);
	  	 var anterior = undoNumber(document.forms[0].elements[elementoModificado.name+"Anterior"].value);
	  	 var variacion = actual - anterior;
	  	 
	  	 var variacionMaximaProvRecobro = undoNumber(parent.document.getElementById("polGarCobView.variacionMaximaProvRecobro").value);
	  	 
	  	 var importeMaximoProvRecobro = undoNumber(parent.document.getElementById("polGarCobView.importeMaximoProvRecobro").value);
	  	 
	  	 if (reestimacionAcumulada >= 0) {
	  	 	if (variacion >= 0) {
	  	 		if (variacion >= variacionMaximaProvRecobro) {
				 	rollbackValor(elementoModificado);
	  	 		} else {
	  	 			reestimacionAcumulada = reestimacionAcumulada + variacion;
	  	 			variacionMaximaProvRecobro = variacionMaximaProvRecobro - variacion;	  	 		
	  	 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
	  	 		}
	  	 	} else {
	  	 		if (Math.abs(variacion) >= variacionMaximaProvRecobro) {
				 	rollbackValor(elementoModificado);
	  	 		} else {
	  	 			reestimacionAcumulada = reestimacionAcumulada + variacion;
	  	 			if (reestimacionAcumulada >= 0) {
	  	 				variacionMaximaProvRecobro = importeMaximoProvRecobro - reestimacionAcumulada;
	  	 			} else {
	  	 				variacionMaximaProvRecobro = importeMaximoProvRecobro;
	  	 			}
	  	 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
	  	 		}
	  	 	}
	  	 } else {
	  	 	if (variacion >= 0) {
	  	 		if (variacion >= variacionMaximaProvRecobro) {
				 	rollbackValor(elementoModificado);
	  	 		} else {
	  	 			reestimacionAcumulada = reestimacionAcumulada + variacion;
	  	 			if (reestimacionAcumulada >= 0) {
	  	 				variacionMaximaProvRecobro = importeMaximoProvRecobro - reestimacionAcumulada;
	  	 			} else {
	  	 				variacionMaximaProvRecobro = importeMaximoProvRecobro;
	  	 			}
	  	 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
	  	 		}	  	 		
	  	 	} else {
	  	 		if (Math.abs(variacion) >= variacionMaximaProvRecobro) {
				 	rollbackValor(elementoModificado);
	  	 		} else {
	  	 			variacionMaximaProvRecobro = importeMaximoProvRecobro;
	  	 			reestimacionAcumulada = reestimacionAcumulada + variacion;
	  	 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
	  	 		}
	  	 	}
	  	 }
	  	 
	  	 // Seteamos la variación máxima con el resultado de las validaciones
	  	 parent.document.getElementById("polGarCobView.variacionMaximaProvRecobro").value = doNumber(variacionMaximaProvRecobro);
	  	 parent.document.getElementById("polGarCobView.importeMaximoProvRecobro").value = doNumber(importeMaximoProvRecobro);
	  	 
	 }
  } 
   