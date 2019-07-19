
  /* Funcion para introducir los comentarios de la reserva */
  function introducirComentario(idReservaSntro, index, descripcionConcepto, idTripleta){
   var pag = urlIntroducirComentario;
   pag = pag + '?reservaView.id=' + idReservaSntro;
   pag = pag + '&reservaView.comentario=' + descripcionConcepto;
   pag = pag + '&reservaView.idTripleta=' + idTripleta;
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
  		recalculaTotales();
  }
  
  function recalculaTotalesConceptos(elemento) {
	  
	  	 var formulario = document.forms[0];

	  	 // Recalculamos el total para cada fila
	  	 for (var i = 0 ; i < contadorConceptos; i++) {
	  		
	  	    var importeComprometido = (formulario.elements["reservaSntro["+i+"].importeComprometido"]!=undefined?formulario.elements["reservaSntro["+i+"].importeComprometido"].value:"0,00");
	  	    var importe = (formulario.elements["reservaSntro["+i+"].importe"]!=undefined?formulario.elements["reservaSntro["+i+"].importe"].value:"0,00");
	  	    var importeBD = (formulario.elements["reservaSntro["+i+"].importeInicialBD"]!=undefined?formulario.elements["reservaSntro["+i+"].importeInicialBD"].value:"0,00");
	  	    if(trim(importe)==""){
	  	    	importe = "0,00";
	  	    }
	  	 	total = undoNumber(importeComprometido) + undoNumber(importe);
	  	 	formulario.elements["reservaSntro["+i+"].importeTotal"].value = doNumber(total); 
	  	 	formulario.elements["polGarCobView.lstReservaView["+i+"].importe"].value = importe;
	      	formulario.elements["polGarCobView.lstReservaView["+i+"].importeVariacion"].value = doNumber(undoNumber(importe) - undoNumber(importeBD));
	      	//Error no reportado: al hacer una reestimacion manual se estaba grabando en este campo el valor del importe en negativo
	  	 	//formulario.elements["polGarCobView.lstReservaView["+i+"].importeComprometidoVariacion"].value = undoNumber(importeComprometido) - undoNumber(importeBD) ;
	  	 	if (undoNumber(importeBD) != undoNumber(importe)) {
	  	 		formulario.elements["polGarCobView.lstReservaView["+i+"].swVariacion"].value = valorSi;
	  	 	}else{
	  	 		formulario.elements["polGarCobView.lstReservaView["+i+"].swVariacion"].value = valorNo;
	  	 	}
	  	 }
	  	 
	  	 // Recalculamos el total por columna
	  	 var totalComprometidoPagos = 0.0;
	  	 var totalDisponible = 0.0;
		 var totalTotales = 0.0;
	  	 for (var i = 0 ; i < contadorConceptos; i++) {
	  	   
	  		 totalComprometidoPagos += undoNumber((formulario.elements["reservaSntro["+i+"].importeComprometido"]!=undefined?formulario.elements["reservaSntro["+i+"].importeComprometido"].value:"0,00"));
	  	    importe = (formulario.elements["reservaSntro["+i+"].importe"]!=undefined?formulario.elements["reservaSntro["+i+"].importe"].value:"0,00");
	  	    if(trim(importe)==""){
	  	    	importe = "0,00";
	  	    }
	  	    totalDisponible += undoNumber(importe);
	  	    totalTotales += undoNumber((formulario.elements["reservaSntro["+i+"].importeTotal"]!=undefined?formulario.elements["reservaSntro["+i+"].importeTotal"].value:"0,00"));
	  	 }
	  	
	  	 parent.document.getElementById("polGarCobView.reservaComprometidaTotal").value = doNumber(totalComprometidoPagos);
	  	 parent.document.getElementById("polGarCobView.reservaDisponibleTotal").value = doNumber(totalDisponible);
	  	 parent.document.getElementById("polGarCobView.reservaTotal").value = doNumber(totalTotales);
	  	 
  }
  

  // TODO: Todo esto debería estar un poco más optimizado
 /* Función que recalcula todos los totales de la pantalla */
  function recalculaTotales(elementoModificado) {

  	 var formulario = document.forms[0];

  // Recalculamos el total para cada fila
  	 for (var i = 0 ; i < contadorConceptos; i++) {
  	    var importeComprometido = formulario.elements["reservaSntro["+i+"].importeComprometido"].value;
  	    var importe = formulario.elements["reservaSntro["+i+"].importe"].value;
  	    var importeBD = formulario.elements["reservaSntro["+i+"].importeInicialBD"].value;
  	    if(trim(importe)==""){
  	    	importe = "0,00";
  	    }
  	 	total = undoNumber(importeComprometido) + undoNumber(importe);
  	 	formulario.elements["reservaSntro["+i+"].importeTotal"].value = formateaValoresNumericos(total); 
  	 	formulario.elements["polGarCobView.lstReservaView["+i+"].importe"].value = importe;
      	formulario.elements["polGarCobView.lstReservaView["+i+"].importeVariacion"].value = formateaValoresNumericos(redondeo2decimales(undoNumber(importe) - undoNumber(importeBD)));
      	//Error no reportado: al hacer una reestimacion manual se estaba grabando en este campo el valor del importe en negativo
  	 	//formulario.elements["polGarCobView.lstReservaView["+i+"].importeComprometidoVariacion"].value = undoNumber(importeComprometido) - undoNumber(importeBD) ;
  	 	if (undoNumber(importeBD) != undoNumber(importe)) {
  	 		formulario.elements["polGarCobView.lstReservaView["+i+"].swVariacion"].value = valorSi;
  	 	}else{
  	 		formulario.elements["polGarCobView.lstReservaView["+i+"].swVariacion"].value = valorNo;
  	 	}
  	 }
  	 
  	 // Este es el importe total anterior de los conceptos de esta polGarCob
  	 var anteriorImporteConceptos = undoNumber(parent.document.getElementById("polGarCobView.reservaTotal").value);
  	 
  	 // Recalculamos el total por columna
  	 var totalComprometidoPagos = 0.0;
  	 var totalDisponible = 0.0;
	 var totalTotales = 0.0;
  	 for (var i = 0 ; i < contadorConceptos; i++) {
  	    totalComprometidoPagos += undoNumber(formulario.elements["reservaSntro["+i+"].importeComprometido"].value);
  	    importe = formulario.elements["reservaSntro["+i+"].importe"].value;
  	    if(trim(importe)==""){
  	    	importe = "0,00";
  	    }
  	    totalDisponible = redondeo2decimales(totalDisponible) + redondeo2decimales(undoNumber(importe));
  	    totalTotales = redondeo2decimales(totalTotales) + redondeo2decimales(undoNumber(formulario.elements["reservaSntro["+i+"].importeTotal"].value));
  	 }
  	 parent.document.getElementById("polGarCobView.reservaComprometidaTotal").value = formateaValoresNumericos(totalComprometidoPagos);
  	 parent.document.getElementById("polGarCobView.reservaDisponibleTotal").value = formateaValoresNumericos(totalDisponible);
  	 // este es el nuevo total de los conceptos
  	 parent.document.getElementById("polGarCobView.reservaTotal").value = formateaValoresNumericos(totalTotales);
  	 // esta es la diferencia entre el anterior total y el nuevo, esta diferencia es lo que tiene que variar el toral de las reservas
  	 var diferenciaConceptos = totalTotales - anteriorImporteConceptos;
  	 
  	 // Límite de la cobertura ( Se aplica a todos los niveles ).
  	 var importeLimiteCobertura = undoNumber(parent.document.getElementById("polGarCobView.sublimiteGarantiaImporte").value);
  	 
  	 // Sublímites. Los sublímites son de todas las garantías, así que esto tiene que ser un sumatorio del anterior, porque viene ya cargado.
  	 var importeAnteriorTotalReservas = undoNumber(parent.document.getElementById("polGarCobView.sublimiteGarantiaReserva").value);
  	 
  	 // el importe es el anterior más lo que ha aumentado/decrementado el de la polGarCobActual
  	 var importeActualReservas = (importeAnteriorTotalReservas + diferenciaConceptos);
  	 // Estos son los pagos que tenemos sobre las reservas totales.
  	 var pagosGarantia = undoNumber(parent.document.getElementById("polGarCobView.sublimiteGarantiaPagos").value);
  	 // La diferencia es: (importe máximo de reserva - (importe total reservas + importe total pagos)) 
  	 var diferencia = importeActualReservas + pagosGarantia;
  	 diferencia = importeLimiteCobertura - diferencia; 

  	 parent.document.getElementById("polGarCobView.sublimiteGarantiaReserva").value = doNumber(importeActualReservas);
	 parent.document.getElementById("polGarCobView.sublimiteGarantiaDiferencia").value = doNumber(diferencia);
	
	 validaVariacion(elementoModificado);
  	
  } 
  
  function formateaValoresNumericos(importe){
	  var retorno = doNumber(importe);
	  retorno = formateoDecimales(retorno, ',', 2, '.', 11);
	  retorno = mascaraDecimal(retorno,',','2');
	  return retorno;
  }
  
  function redondeo2decimales(valor) {
	  return Math.round((valor)*Math.pow(10,2))/Math.pow(10,2);
  }
  
  function validaVariacion(elementoModificado) {
  
  	 if (elementoModificado != undefined) {
  	 	/* Validación sobre el límite de la cobertura */
  	 	var diferencia = undoNumber(parent.document.getElementById("polGarCobView.sublimiteGarantiaDiferencia").value);
  	 	var swSuperaLimite = parent.document.getElementById("polGarCobView.swSuperaLimite").value;
  	 	
  	 	if (diferencia < 0){
  	 		if ((null == swSuperaLimite) || ((null != swSuperaLimite) && (swSuperaLimite == 0))){
  	 			rollbackValor(elementoModificado);
  	 		}
  	 	}
  	 	
	  	 var actual = undoNumber(elementoModificado.value);
	  	 var anterior = undoNumber(document.forms[0].elements[elementoModificado.name+"Anterior"].value);
	  	 var variacion = actual - anterior;
	  	 
	  	 var totalActual = undoNumber(parent.document.getElementById("polGarCobView.reservaDisponibleTotal").value);
	  	 var totalAnterior = undoNumber(reservaAnterior);
	  	 var variacionTotal = totalActual - totalAnterior;
	  	 
	  	 var variacionMaxima = undoNumber(parent.document.getElementById("polGarCobView.variacionMaxima").value);
	  	 
	  	 var importeMaximo = undoNumber(parent.document.getElementById("polGarCobView.importeMaximo").value);
	  	 
	  	 
	  	if (variacion >= 0) {
	  		if (variacion > variacionMaxima) {
			 	rollbackValor(elementoModificado);
  	 		} else {
  	 			reestimacionAcumulada = reestimacionAcumulada + variacion;
  	 			variacionMaxima = variacionMaxima - variacion;	  	 		
  	 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
  	 		}
	  	}else{
 			reestimacionAcumulada = reestimacionAcumulada + variacion;
 			variacionMaxima = variacionMaxima - variacion;	  	 		
 			document.forms[0].elements[elementoModificado.name+"Anterior"].value = doNumber(actual);
	  	}
	  	 
	  	 // Seteamos la variación máxima con el resultado de las validaciones
	  	 parent.document.getElementById("polGarCobView.variacionMaxima").value = doNumber(variacionMaxima);
	  	 parent.document.getElementById("polGarCobView.importeMaximo").value = doNumber(importeMaximo);
	  	 
	 }
  } 
   