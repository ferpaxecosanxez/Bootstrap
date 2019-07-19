  /* Funcion para el control del limite recobro */
  function controlLimiteRecobro(pObjeto, indiceRecobro){
    // Importe total de todas los detalles del recobro
    var totalImporte = 0;
  
    // Todos los objetos detalle del recobro
    var lstRecobro = document.getElementsByName('importe');
  
    // Lista con todos detalles del recobro
    var importeTotalLiquido = document.getElementById('importeTotal');
  
    // Lista con los detalles de recobro para un determinado concepto de reserva
    var lstRecobrosXConcepto =  document.getElementsByName('lstImportesActuales');
    var importeRecobrosXConcepto = 0;
        
    var recobroDetalleAnterior = document.getElementById('lstImportesAnteriores_'+indiceRecobro);
    var recobroDetalleActual = document.getElementById('lstImportesActuales_'+indiceRecobro); 
    recobroDetalleActual.value = pObjeto.value;
    
   
    for(var i=0;i < lstRecobrosXConcepto.length; i++) {
      var importeRecobro = lstRecobrosXConcepto[i].value;
      importeRecobro = formateaVistaNegocio(importeRecobro);
      importeRecobrosXConcepto += importeRecobro;
    }
        
    recobroDetalleActual.value = recobroDetalleActual.value.toString().replace('.','');
    recobroDetalleActual.value = recobroDetalleActual.value.toString().replace('.','');
    recobroDetalleActual.value = formateoDecimales(recobroDetalleActual.value.toString(),',',2,'.',11);
    recobroDetalleActual.value = mascaraDecimal(recobroDetalleActual.value.toString(),',','2');
      
    recobroDetalleAnterior.value = recobroDetalleAnterior.value.toString().replace('.','');
    recobroDetalleAnterior.value = recobroDetalleAnterior.value.toString().replace('.','');
    recobroDetalleAnterior.value = formateoDecimales(recobroDetalleAnterior.value.toString(),',',2,'.',11);
    recobroDetalleAnterior.value = mascaraDecimal(recobroDetalleAnterior.value.toString(),',','2');
    
    // Se recoge el importe de provisión de recobro correspondiente al valor inicial de BBDD
    var provisionRecobro = undoNumber(document.forms[0].elements['recobroDetalle['+indiceRecobro+'].reservaRecobroView.importeInicialBD'].value);
    if (provisionRecobro > 0){
    	// Si el recobro a realizar es por un importe mayor o igual al provisionado se inicializa el importe de provisionamiento
        if (undoNumber(recobroDetalleActual.value) >= provisionRecobro){
        	provisionRecobro = undoNumber("0,00");
        }else{
        	//En otro caso, se resta de la provisión 
        	provisionRecobro = provisionRecobro - undoNumber(recobroDetalleActual.value);
        }
        //seteamos resultado sobre el importe que quedará de provisión.
        document.forms[0].elements["recobroDetalle["+indiceRecobro+"].reservaRecobroView.importe"].value = doNumber(provisionRecobro);
    }
    
    var variacionImporte =  formateaVistaNegocio(recobroDetalleActual.value) - formateaVistaNegocio(recobroDetalleAnterior.value);
    recobroDetalleAnterior.value = recobroDetalleActual.value;
    document.getElementById('importesBBDD_'+indiceRecobro).value = recobroDetalleActual.value;
    
    // Sumamos todos los importes de los recobros
    for(var i=0;i < lstRecobro.length; i++){
      var importeRecobro = lstRecobro[i].value;
      importeRecobro = formateaVistaNegocio(importeRecobro);
      totalImporte += importeRecobro;
    }
  
    //Los mostramos en la pagina
    var importeTotalPantalla = totalImporte /100;
    document.getElementById('recobroView.importeTotalRecobro').value = importeTotalPantalla;
    document.getElementById('recobroView.importeLiquidoRecobro').value = importeTotalPantalla;
    
    var importeAMostrar = importeTotalPantalla;
    importeAMostrar = importeAMostrar.toString().replace('.',',');
    importeAMostrar = formateoDecimales(importeAMostrar.toString(),',',2,'.',11);
    importeAMostrar = mascaraDecimal(importeAMostrar.toString(),',','2');
    document.getElementById('importeTotal').innerHTML = importeAMostrar;
    
    var importeGuardado = importeTotalPantalla.toString().replace('.',',');
    document.getElementById('importeTotalRecobro').value = importeGuardado;
    document.getElementById('importeLiquidoRecobro').value = importeGuardado;
    }

	/* Funcion para el control del numero de factura */
	function controlNumFactura (pObjeto, indiceRecobro) {
	
		document.getElementById('numFacturaBBDD_' + indiceRecobro).value = pObjeto.value;
		
	}
  
	/* Funcion para el control de las observaciones */
	function controlObservacion (pObjeto, indiceRecobro) {
	
		document.getElementById('observacionBBDD_' + indiceRecobro).value = pObjeto.value;
	}
  
	function crearListaFacturas () {
	
		var listaFacturas='';
		
		for (i = 0; i < contadorConceptos; i++) {
		
			var factura = document.getElementById('recobroView.lstRecobroDetalleView[' + i + '].numFactura').value;
			
			if ((factura != '')) {
			
				if (i==0) {
				
					listaFacturas = factura;
					
				} else {
				
					listaFacturas = listaFacturas + '@'+ factura;
				}
			}
		}
		
		return listaFacturas;
		
	}  
  
	/* Todas las comprobaciones están ahora sobre el servicio de guardar o modificar */
	function comprobarDatos () {
	
		continuarEstado = true;
		cobrado = true;
		continuar = validarMedioRecobro();
		var duplicado = false;
		
	    var importeCorrecto = comprobarImporteTotal();
	    if(importeCorrecto){
			if (continuar) {
				duplicado = compruebaRecobroDuplicado();
			}
			
			if(duplicado) {
				continuar = window.confirm(msgAvisoRecobroDuplicado);
			}
			
			if (continuar) {
				muestraCarga();
				enviarRecobrosxReserva(actCalculaEstadoRecobro);
			}
		}else{
			  alert(msgErrorImporte);
		}
	}
  
	function medioRecobro () {

		var idMedioRecobro = document.getElementById('recobroView.medioRecobro.id').value;

		if (idMedioRecobro == medioRecobroChequeAut || idMedioRecobro == medioRecobroChequeMan) {
			document.getElementById('refRecobro').style.display = 'block';
			document.getElementById('cheque').style.display = 'block';
			if(document.getElementById('cuentaOrigen')!=undefined){
				document.getElementById('cuentaOrigen').style.display = 'none';
			}
			if(document.getElementById('imgLupaBancoOrigen')!=undefined){
				document.getElementById('imgLupaBancoOrigen').disabled = true;
			}
			if(document.getElementById('recobroView.referenciaEconomica')!=undefined){
				document.getElementById('recobroView.referenciaEconomica').disabled = true;
			}
			if(document.getElementById('recobroView.numCheque')!=undefined){
				document.getElementById('recobroView.numCheque').disabled = false;
			}
			if(document.getElementById('recobroView.fecChequeRecobro') !=undefined){
				document.getElementById('recobroView.fecChequeRecobro').disabled = false;
			}
			
			if(document.getElementById('imgFechaCheque')!=undefined){
				document.getElementById('imgFechaCheque').disabled = false;
			}
			

		} else if (idMedioRecobro == medioRecobroTransfe || idMedioRecobro == medioRecobroTransfeMan) {
			document.getElementById('refRecobro').style.display = 'block';
			if(document.getElementById('cuentaOrigen')!=undefined){
				document.getElementById('cuentaOrigen').style.display = 'none';
			}
			document.getElementById('cheque').style.display = 'none';
			if(document.getElementById('imgLupaBancoOrigen')!=undefined){
				document.getElementById('imgLupaBancoOrigen').disabled = false;
			}
			if(document.getElementById('recobroView.referenciaEconomica')!=undefined){
				document.getElementById('recobroView.referenciaEconomica').disabled = false;
			}
			if(document.getElementById('recobroView.numCheque')!=undefined){
				document.getElementById('recobroView.numCheque').disabled = true;
			}
			if(document.getElementById('recobroView.fecChequeRecobro') !=undefined){
				document.getElementById('recobroView.fecChequeRecobro').disabled = true;
			}
			if(document.getElementById('imgFechaCheque')!=undefined){
				document.getElementById('imgFechaCheque').disabled = true;
			}

		} else if (idMedioRecobro == medioRecobroAgencia) {
			document.getElementById('refRecobro').style.display = 'block';
			if(document.getElementById('cuentaOrigen')!=undefined){
				document.getElementById('cuentaOrigen').style.display = 'none';
			}
			document.getElementById('cheque').style.display = 'none';
			if(document.getElementById('imgLupaBancoOrigen')!=undefined){
				document.getElementById('imgLupaBancoOrigen').disabled = false;
			}
			
			if(document.getElementById('recobroView.referenciaEconomica')!=undefined){
				document.getElementById('recobroView.referenciaEconomica').disabled = false;
			}
			if(document.getElementById('recobroView.numCheque')!=undefined){
				document.getElementById('recobroView.numCheque').disabled = true;
			}
			if(document.getElementById('recobroView.fecChequeRecobro') !=undefined){
				document.getElementById('recobroView.fecChequeRecobro').disabled = true;
			}
			if(document.getElementById('imgFechaCheque')!=undefined){
				document.getElementById('imgFechaCheque').disabled = true;
			}


		}else{
			if(document.getElementById('cuentaOrigen')!=undefined){
				document.getElementById('cuentaOrigen').style.display = 'none';
			}
			if(document.getElementById('cheque')!=undefined){
				document.getElementById('cheque').style.display = 'none';
			}
			
		}

		var idTipoDatoDestino = document.getElementById('recobroView.tipoDatoBancoDestino.id').value;
		
		// se recargan los datos del banco mediante ajax
		var actionAjax =  actDatosBancariosDestinoReload;
		actionAjax += '?idTipoDatoBancoAjax=' + idTipoDatoDestino 
		retrieveURLParameterPopPup(actionAjax,'datosRecobroForm','recobroView.medioRecobro.id','idMedioRecobroAjax');
	
	}
  
  
	/* Funcion para los datos bancarios */
	function datosBancariosOrigen () {
		
		var valor = buscarCtaBancaria(idPerceptor, tipoPerceptor,actDatosBancariosPerceptorInicializar, 'recobroView.tipoDatoBancoOrigen.id');
		
		if (valor != undefined){
			if(valor[0] != null){
				var idDatoBancario = valor[0];
				setValue('idDatosBanco',idDatoBancario);
			}

			// tipo dato bancario
			if(valor[1] != null){
				var idTipoDatoBancario = valor[1];
				setValue('recobroView.tipoDatoBancoOrigen.id' ,idTipoDatoBancario);
			}

			// se recargan los datos del banco mediante ajax
      		var actionAjax =  actDatosBancariosOrigenReload;
			actionAjax = actionAjax + '?idTipoDatoBancoAjax='+ idTipoDatoBancario + '&idDatosBancoAjax=' + idDatoBancario;
			retrieveURLParameterPopPup(actionAjax,'datosRecobroForm','idDatosBanco','idDatosBancoAjax');
		}
	}
   
	function compruebaRecobroDuplicado () {
	
		var action = actRecobroDuplicadoReload;
 		action = action + '?idExpedienteAjax=' + idSiniestro;
		action = action + '&importeLiquidoAjax=' + document.getElementById('recobroView.importeLiquidoRecobro').value;
		facturas = crearListaFacturas();
		action = action + '&facturasAjax=' + facturas;
		if (document.getElementById('swModoModificacion').value == valorSi){
			retrieveURLPorPostPopPup(action, '0', false);
		}else{
			retrieveURLWithoutParametersSync(action);
		}
		return document.getElementById("recobroDuplicado").innerText=="true";
		
	}     
   
	function validarMedioRecobro () {
	  
		var valorRetorno = true;
		var idMedioRecobro = document.getElementById('recobroView.medioRecobro.id').value;
		var idMotivoRecobro = document.getElementById('recobroView.motivoRecobro.id').value;
		if (idMedioRecobro == ""){
			alert(msgErrorMedioRecobro);
			valorRetorno = false;
		}else if (idMotivoRecobro == ""){
			alert(msgErrorMotivoRecobro);
			valorRetorno = false;
		}
		
		

		// Si es cheque, se comprueba que el número de cheque y la fecha están informados,
		// y si el número de cheque es válido
		/*if (idMedioRecobro == medioRecobroCheque) {
		
	        var plantillaCheque = /^\w{1,14}$/;
			if(document.getElementById('recobroView.numCheque').value == '') {
		  		alert(msgNumChequeNoInformado);
		  		valorRetorno = false;
		  	}
		  	
		  	if (valorRetorno) {
		  		var valor = document.getElementById('recobroView.numCheque').value;
				var re = valor.match(plantillaCheque);
				if (re != null && re.length > 0) {
				  	valorRetorno = true;
				}else{
			  		alert(msgNumChequeNoValido);
			  		valorRetorno = false;
				}
		  	}
		  	
		  	if(valorRetorno && document.getElementById('recobroView.fecChequeRecobro').value == '') {
		  		alert(msgFecChequeRecobroNoInformado);
		  		valorRetorno =  false;
		  	}
		}*/
		return valorRetorno;
	}
	
    /* Funcion que pasa el importe que aparece en la pantalla como texto y con comas separando
       los decimale a un valor numerico con puntos separando los decimales */
    function formatea(valor){
      valor = valor / 100;   
      valor = valor.toString().replace('.',',');
      valor = formateoDecimales(valor.toString(),',',2,'.',11);
      valor = mascaraDecimal(valor.toString(),',','2');
      return valor;
    }
    
    /* Funcion que pasa el importe que aparece en la pantalla como texto y con comas separando
       los decimale a un valor numerico con puntos separando los decimales */
    function formateaVistaNegocio(valor){
      valor = valor.replace('.','');
      valor = valor.replace('.','');
      valor = valor.replace(',','.');
      valor = Math.round(valor * 100);
      return valor;
    }
    
    /* Función que comprueba si existen provisiones de recobro, en caso negativo, inicializa los valores a 0*/
    function inicializarImportesReservasRecobros() {
  	  
	  	 var formulario = document.forms[0];
	  	 for (var i = 0 ; i < contadorConceptos; i++) {
	  	    var importe = formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importe"].value;
	  	   	if(trim(importe)==""){
	  	    	importe = "0,00";
	  	    }
	  	  formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importe"].value = importe;
	  	  formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importeInicialBD"].value = importe;
	  	 }
	}