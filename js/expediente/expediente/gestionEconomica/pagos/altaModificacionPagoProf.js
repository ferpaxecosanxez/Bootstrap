
function controlConceptosPago(index, pagoRecobro){
		var nmImagen = 'imgReser_' + index;
		var resultado = controlImagenes(nmImagen);
		  
		showHide(pagoRecobro+index, resultado[0]);
		changeIcon(nmImagen, resultado[1]); 
		 
		layOutPantalla();
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
		if (valor.indexOf('.') != -1 && valor.indexOf('.') == valor.length - 2) {
			valor = valor.replace('.',',');
			valor += '0'; 
		}
		valor = valor.replace('.','');
		valor = valor.replace('.','');
		valor = valor.replace(',','.');
		valor = Math.round(valor * 100);
		return valor;
    }

    /* Comprueba que todo es correcto */
    function comprobarDatos() {
    	
    	muestraCarga();
    	duplicado = compruebaPagoDuplicado();
		continuar = true;
		if(duplicado)
			continuar = window.confirm(mensajeConfirmacionPagoDuplicado);
		if (continuar){	
			var refEconomica = confirmarReferenciaEconomica();
			if (refEconomica){
				var importeCorrecto = comprobarImporteTotal();
				if(importeCorrecto){
					//ponemos activo campos inactivos
					document.getElementById('sntroPagoView.idReferenciaPago').disabled = false;		  	
					// se envia el resultado 
					enviarPagosxReserva(urlGrabarDatos);
					window.returnValue = true;
				}else{
					ocultaCarga();
					alert(mensajeErrorImporte);
				}
			}
		}	
    }

    function confirmarReferenciaEconomica(){
    	var id = document.getElementById('sntroPagoView.medioPago.id').value;
    	if (id == idChequeManual){
    		var plantillaCheque = /^\w{1,14}$/;
    		if(document.getElementById('sntroPagoView.referenciaEconomica').value == ''){
    			ocultaCarga();
    			alert(comentarioReferenciaEconomica);
    			return false;
    		}else{
    			var valor = document.getElementById('sntroPagoView.referenciaEconomica').value;
    			var re = valor.match(RegExp(plantillaCheque));
    			if (re != null && re.length > 0) {
    				return true;
    			}else{
    				ocultaCarga();
    				alert(comentarioFormatoReferenciaEconomica);
    				return false;
    			}
    		}
    	}else if (id == idTransferenciaManual){
    		if (document.getElementById('sntroPagoView.referenciaEconomica').value == ''){
    			ocultaCarga();
    			alert(comentarioReferenciaEconomica);
    			return false;
    		}
    		return true;
    	
		}else if (id == idConsignacionManual || id == idConsignacionAuto){
			var orgJudOrigen = getValue('sntroPagoView.orgJudOrigen');
			if (orgJudOrigen==null || orgJudOrigen==undefined || orgJudOrigen==''){
				ocultaCarga();
				alert(comentarioDatosConsignacion + ' (Num. Juzgado)');
				return false;
			}
			var idTipoProcJudicial = getValue('sntroPagoView.tipoProcJudicial.id');
			if (idTipoProcJudicial==null || idTipoProcJudicial==undefined || idTipoProcJudicial==''){
				ocultaCarga();
				alert(comentarioDatosConsignacion + ' (Tipo Procedimiento)');
				return false;
			}
			var numProcedimiento = getValue('sntroPagoView.numProcedimiento');
			if (numProcedimiento==null || numProcedimiento==undefined || numProcedimiento==''){
				ocultaCarga();
				alert(comentarioDatosConsignacion + ' (Num. Procedimiento)');
				return false;
			}
			var anoProcedimiento = getValue('sntroPagoView.anoProcedimiento');
			if (anoProcedimiento==null || anoProcedimiento==undefined || anoProcedimiento==''){
				ocultaCarga();
				alert(comentarioDatosConsignacion + ' (Año Procedimiento)');
				return false;
			}
		}
    	
    	return true;
    }

	function controlLimitePago(pObjeto, indiceReserva, indicePago){
		// Importe total de todas los detalles del pago
		var totalImporte = 0;
		
		// Lista con todos detalles del pago
		var importeTotal = document.getElementById('importeTotal');
		
		// Importe total de los pagos de un determinado concepto de reserva
		var importeTotalPagoXConcepto = document.getElementById('conceptoPagoReserva['+indiceReserva+'].totalImportesPago').value;
		importeTotalPagoXConcepto = Math.round(importeTotalPagoXConcepto * 100);
		
		// Importe que hay para un concepto de reserva determinado
		var limiteReserva = document.getElementById('conceptoPagoReserva['+indiceReserva+'].importeReserva').value;
		limiteReserva = Math.round(limiteReserva * 100);
	    limiteReserva = limiteReserva + importeTotalPagoXConcepto;
				
		// Lista con los detalles de pago para un determinado concepto de reserva
		var lstPagosXConcepto =  document.getElementsByName('lstImportesActuales_'+indiceReserva);
		var importePagosXConcepto = 0;
		
		var pagoDetalleAnterior = document.getElementById('lstImportesAnteriores_'+indiceReserva+'_'+indicePago);
		var pagoDetalleActual = document.getElementById('lstImportesActuales_'+indiceReserva+'_'+indicePago); 
		var pagoDetalleLiquido = document.getElementById('lstImportesLiquidos_'+indiceReserva+'_'+indicePago); 
		var pagoDetalleBrutoAnterior = document.getElementById('lstImportesBrutosAnteriores_'+indiceReserva+'_'+indicePago); 
		pagoDetalleActual.value = pObjeto.value;
		
		var campoOcultoRecalculoIVAIRPF = document.getElementById('recalCampo_'+indiceReserva+'_'+indicePago).value;
		
		//Flags para saber si el importe corresponde a un concepto de Gastos u Honoraros
		var swGastos = document.getElementById('swGastos_'+indiceReserva+'_'+indicePago).value;
		var swHonor = document.getElementById('swHonorarios_'+indiceReserva+'_'+indicePago).value;
		var swGastosProf = document.getElementById('swGastosProfesional_'+indiceReserva+'_'+indicePago).value;
		
		//Importes Base totales
		var importeBaseHonor = document.getElementById('idDivImporteBaseHonor').innerHTML;
		var importeBaseGastos = document.getElementById('idDivImporteBaseGastos').innerHTML;
		
		var importePagoTotal = 0;
		var importeBrutoTotal = 0;
		
		var porcIvaEstado = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).disabled;
		var porcIrpfEstado = document.getElementById('porcIrpfBBDD_'+indiceReserva+'_'+indicePago).disabled;
		
		if (campoOcultoRecalculoIVAIRPF == "false") {
			swRegIva = "1";
			swRegIrpf = "1";
		}
		
		else {
			swRegIva = "0";
			swRegIrpf = "0";			
		}
		
		for(var i=0;i < lstPagosXConcepto.length; i++){
			var importePago = lstPagosXConcepto[i].value;
			importePago = formateaVistaNegocio(importePago);
			
			if(i == indicePago){
				importePagosXConcepto += importePago;
			}
		
			var totalIva = 0;
			var porcIva = 0;
			
			if (swRegIva == '1' || swRegIrpf == '1'){
				porcIva = 0;
			}else{
				if(document.getElementsByName('porcIva').length == 1){
					porcIva = document.forms[0].porcIva.value;	
				} else {
					//porcIva = document.forms[0].porcIva[indiceReserva].value;
					porcIva = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;
				}
				
				if (undefined != porcIva){
					porcIva = porcIva.replace(',','.');
					porcIva = parseFloat(porcIva);
					porcIva = porcIva /100;	
				} 
			}
			
			if (isNaN(porcIva) || porcIva == '') {
				porcIva = 0;
				document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value = porcIva;
			}
			
			if (porcIva != ''){
				totalIva = Math.round((importePago * (porcIva/100))*Math.pow(10,2))/Math.pow(10,2);
			}
			
			var impBrutParcial = importePago + Math.round(totalIva * 100);
			importeBrutoTotal += impBrutParcial;
		}
		
		if (pagoDetalleLiquido.value.indexOf('.') != -1 && pagoDetalleLiquido.value.indexOf('.') == pagoDetalleLiquido.value.length - 2) {
			pagoDetalleLiquido.value = pagoDetalleLiquido.value.replace('.',',');
			pagoDetalleLiquido.value += '0'; 
		}
		pagoDetalleLiquido.value = pagoDetalleLiquido.value.toString().replace('.','');
		pagoDetalleLiquido.value = pagoDetalleLiquido.value.toString().replace('.','');
		pagoDetalleLiquido.value = formateoDecimales(pagoDetalleLiquido.value.toString(),',',2,'.',11);
		pagoDetalleLiquido.value = mascaraDecimal(pagoDetalleLiquido.value.toString(),',','2');
		
		if (pagoDetalleBrutoAnterior.value.indexOf('.') != -1 && pagoDetalleBrutoAnterior.value.indexOf('.') == pagoDetalleBrutoAnterior.value.length - 2) {
			pagoDetalleBrutoAnterior.value = pagoDetalleBrutoAnterior.value.replace('.',',');
			pagoDetalleBrutoAnterior.value += '0'; 
		}
		pagoDetalleBrutoAnterior.value = pagoDetalleBrutoAnterior.value.toString().replace('.','');
		pagoDetalleBrutoAnterior.value = pagoDetalleBrutoAnterior.value.toString().replace('.','');
		pagoDetalleBrutoAnterior.value = formateoDecimales(pagoDetalleBrutoAnterior.value.toString(),',',2,'.',11);
		pagoDetalleBrutoAnterior.value = mascaraDecimal(pagoDetalleBrutoAnterior.value.toString(),',','2');
		
		if (pagoDetalleActual.value.indexOf('.') != -1 && pagoDetalleActual.value.indexOf('.') == pagoDetalleActual.value.length - 2) {
			pagoDetalleActual.value = pagoDetalleActual.value.replace('.',',');
			pagoDetalleActual.value += '0'; 
		}
		pagoDetalleActual.value = pagoDetalleActual.value.toString().replace('.','');
		pagoDetalleActual.value = pagoDetalleActual.value.toString().replace('.','');
		pagoDetalleActual.value = formateoDecimales(pagoDetalleActual.value.toString(),',',2,'.',11);
		pagoDetalleActual.value = mascaraDecimal(pagoDetalleActual.value.toString(),',','2');
		
		if (pagoDetalleAnterior.value.indexOf('.') != -1 && pagoDetalleAnterior.value.indexOf('.') == pagoDetalleAnterior.value.length - 2) {
			pagoDetalleAnterior.value = pagoDetalleAnterior.value.replace('.',',');
			pagoDetalleAnterior.value += '0'; 
		}
		pagoDetalleAnterior.value = pagoDetalleAnterior.value.toString().replace('.','');
		pagoDetalleAnterior.value = pagoDetalleAnterior.value.toString().replace('.','');
		pagoDetalleAnterior.value = formateoDecimales(pagoDetalleAnterior.value.toString(),',',2,'.',11);
		pagoDetalleAnterior.value = mascaraDecimal(pagoDetalleAnterior.value.toString(),',','2');
		
		//Si el total del pago acumulado para el concepto de reserva es mayor que su limite 
		var variacionImporte =  formateaVistaNegocio(pagoDetalleActual.value) - formateaVistaNegocio(pagoDetalleAnterior.value);
		
		var totalIrpf = 0;
		var totalIva = 0;
		var importeTotalLiquido = 0;
		
		var importeBase = importePagosXConcepto;
		
		//si es regulación iva o irpf simplemente hacemos lo mismo pero sin hacer calculos, o por simplicidad hacer los calculos con valor 0
		if (swRegIva == '1' || swRegIrpf == '1'){
			porcIrpf = 0;
			porcIva = 0;
		}else{
			porcIrpf = document.getElementById('porcIrpfBBDD_'+indiceReserva+'_'+indicePago).value;
			porcIrpf = porcIrpf.replace(',','.');
			porcIrpf = parseFloat(porcIrpf);
			porcIrpf = porcIrpf /100;
			
			porcIva = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;
			porcIva = porcIva.replace(',','.');
			porcIva = parseFloat(porcIva);
			porcIva = porcIva /100;
		}
		
		if (isNaN(porcIrpf) || porcIrpf == '') {
			porcIrpf = 0;
			document.getElementById('porcIrpfBBDD_'+indiceReserva+'_'+indicePago).value = porcIrpf;
		}
		
		if (porcIrpf != ''){
			totalIrpf = Math.round((importeBase * (porcIrpf/100))*Math.pow(10,2))/Math.pow(10,2);
		}
		if (porcIva != ''){
			totalIva = Math.round((importeBase * (porcIva/100))*Math.pow(10,2))/Math.pow(10,2);
		}
		
		totalIrpf = Math.round(totalIrpf * 100);
	    totalIva = Math.round(totalIva * 100);
		importeLiquido = importeBase - totalIrpf + totalIva;
		importeBruto = importeBase + totalIva;
		importeLiquido = formatea(importeLiquido);
		//importeBrutoTotal = importeBruto;

		if(importeBrutoTotal > limiteReserva){
			// Lanzamos un mensaje de aviso
			alert(mensajeReservaInsuficiente);
			// Dejamos los importes como estaban
			pagoDetalleActual.value = document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value;
			pObjeto.value = document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value;
			//Dejamos el porcentaje de iva como estaba
			if (lstPagosXConcepto.length > 1){
		        document.forms[0].porcIva[indicePago].value = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;
			} else {
		        document.forms[0].porcIva.value = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;		
			}
		} else{
			var pagoAnterior = pagoDetalleAnterior.value;
			pagoDetalleAnterior.value = pagoDetalleActual.value;
			document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value = pagoDetalleActual.value;
			
			totalIva = formatea(totalIva);
			totalIrpf = formatea(totalIrpf);
			importeBase = formatea(importeBase);
			importeBruto= formatea(importeBruto);
			
			pagoDetalleLiquido.value = importeLiquido;			
			document.getElementById('idDivImporte_'+indiceReserva+'_'+indicePago).innerHTML = importeBase;
			
			if (swRegIrpf != '1'){
				document.getElementById('idDivImporteIva_'+indiceReserva+'_'+indicePago).innerHTML = totalIva;
				document.getElementById('importeIvaBBDD_'+indiceReserva+'_'+indicePago).value = totalIva;
				document.getElementById('totalImporteIvaBBDD_'+indiceReserva+'_'+indicePago).value = totalIva;
			}
			
			if (swRegIva != '1'){
				document.getElementById('idDivImporteIrpf_'+indiceReserva+'_'+indicePago).innerHTML = totalIrpf;
				document.getElementById('importeIrpfBBDD_'+indiceReserva+'_'+indicePago).value = totalIrpf;
				document.getElementById('totalImporteIrpfBBDD_'+indiceReserva+'_'+indicePago).value = totalIrpf;
			}
			
			document.getElementById('idDivImporteTotalConceptoPago_'+indiceReserva+'_'+indicePago).innerHTML = importeLiquido;
			//document.getElementById('totalImportesPago_'+indiceReserva).innerHTML = formatea(importeBrutoTotal);
			
			// Todos los objetos detalle del pago
			var lstPagoLiquido = document.getElementsByName('importeLiquido');
			
			// Sumamos todos los importes liquidos de los pagos
			totalImporteLiquido = 0;
			for(var i=0;i < lstPagoLiquido.length; i++){
				var importePagoLiquido = lstPagoLiquido[i].value;
				importePagoLiquido = formateaVistaNegocio(importePagoLiquido);
				totalImporteLiquido += importePagoLiquido;
			}
			totalImporteLiquido = formatea(totalImporteLiquido);
			document.getElementById('importeLiquidoPago').value = totalImporteLiquido;
			importeTotal.innerHTML = totalImporteLiquido.toString();
			
			// Todos los objetos detalle del pago
			var lstPago = document.getElementsByName('importe');
			
			// Sumamos todos los importes de los pagos
			totalImporte = 0;
			for(var i=0;i < lstPago.length; i++){
				var importePago = lstPago[i].value;
				importePago = formateaVistaNegocio(importePago);
				totalImporte += importePago;
			}
			
			//Los mostramos en la pagina
			var importeTotalPantalla = formatea(totalImporte);
			document.getElementById('importeTotalPago').value = importeTotalPantalla;
			
			var contadorCampos = document.getElementById('contadorCampos').value;
			var totalIvaCampos = 0;
			var importeIvaPorCampo = document.getElementsByName('importeIvaPorCampo');
			
			for (var x=0; x < importeIvaPorCampo.length; x++) {
				var totalImporteIva = importeIvaPorCampo[x].value;
				totalImporteIva = formateaVistaNegocio(totalImporteIva);
				totalIvaCampos += totalImporteIva;
			}
			
			var totalIrpfCampos = 0;
			var importeIrpfPorCampo = document.getElementsByName('importeIrpfPorCampo');
			
			for (var x=0; x < importeIrpfPorCampo.length; x++) {
				var totalImporteIrpf = formateaVistaNegocio(importeIrpfPorCampo[x].value);
				totalIrpfCampos += totalImporteIrpf;
			}
			
			var totalImportePagoPantalla = formateaVistaNegocio(totalImporteLiquido) - totalIrpfCampos;
			var totalImporteBaseCalculo = (formateaVistaNegocio(totalImporteLiquido) - totalIvaCampos + totalIrpfCampos);
			var totalBaseCalculoPrincipal = (formateaVistaNegocio(totalImporteLiquido) + totalIrpfCampos);
			var diferenciaEntreBaseCalculoTotalImportePago = totalBaseCalculoPrincipal - formateaVistaNegocio(totalImportePagoBBDD);
			
			if (diferenciaEntreBaseCalculoTotalImportePago > 0 && diferenciaEntreBaseCalculoTotalImportePago > limiteReserva) {
				
				alert(mensajeReservaInsuficiente);
				
				if (lstPagosXConcepto.length > 1){
			        document.forms[0].porcIva[indicePago].value = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;
				} 
				
				else {
			        document.forms[0].porcIva.value = document.getElementById('porcIvaBBDD_'+indiceReserva+'_'+indicePago).value;		
				}
				
				document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value = pagoAnterior;
				pagoDetalleActual.value = pagoAnterior;
				pObjeto.value = pagoAnterior;
				totalBaseCalculoPrincipal = 0;
				importeTotalPantalla = 0;
				return controlLimitePago(pObjeto, indiceReserva, indicePago);			
			}

			//document.getElementById("idDivImporteBaseGastos").innerHTML = formatea(totalImporteBaseCalculo);
			document.getElementById('totalImportesPago_'+indiceReserva).innerHTML = formatea(totalBaseCalculoPrincipal);
			
			if (swHonor == '1'){
				var importeBaseHonor = formateaVistaNegocio(document.getElementById('idDivImporteBaseHonor').innerHTML);
				importeBaseHonor = importeBaseHonor + variacionImporte;
				document.getElementById('idDivImporteBaseHonor').innerHTML = formatea(importeBaseHonor);
				var importeTotIrpf = Math.round(importeBaseHonor * porcIrpf);
				document.getElementById('idDivTotalIrpfHonor').innerHTML = formatea(importeTotIrpf);
				var importeTotIva = Math.round(importeBaseHonor * porcIva);
				document.getElementById('idDivTotalIvaHonor').innerHTML = formatea(importeTotIva);
				var importeTotalHonor = importeBaseHonor - importeTotIrpf + importeTotIva;
				document.getElementById('idDivTotalHonor').innerHTML = formatea(importeTotalHonor);
				var importeTotalGastos = formateaVistaNegocio(document.getElementById('idDivTotalGastos').innerHTML);
				document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalHonor + importeTotalGastos);
			} else if (swGastos == '1'){
				var importeBaseGastos = formateaVistaNegocio(document.getElementById('idDivImporteBaseGastos').innerHTML);
				//alert("importeBaseGastos: " + formatea(importeBaseGastos));
				importeBaseGastos = importeBaseGastos + variacionImporte;
				document.getElementById('idDivImporteBaseGastos').innerHTML = formatea(importeBaseGastos);
				document.getElementById('idDivImporteBaseGastos').innerHTML = formatea(totalImporteBaseCalculo);
				//var importeTotIrpf = Math.round(importeBaseGastos * porcIrpf);
				document.getElementById('idDivTotalIrpfGastos').innerHTML = formatea(totalIrpfCampos);
				//var importeTotIva = Math.round(importeBaseGastos * porcIva);
				document.getElementById('idDivTotalIvaGastos').innerHTML = formatea(totalIvaCampos);
				//var importeTotalGastos = (importeBaseGastos + totalIvaCampos) - totalIrpfCampos;
				document.getElementById('idDivTotalGastos').innerHTML = totalImporteLiquido;
				var importeTotalHonor = formateaVistaNegocio(document.getElementById('idDivTotalHonor').innerHTML);
				document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalHonor + importeTotalGastos);
			}
		}
	}
	
	function modificarPorcentaje(pObjeto, indiceReserva, indicePago, idName){
		porcentaje = pObjeto.value;
		document.getElementById(idName+'BBDD_'+indiceReserva+'_'+indicePago).value = porcentaje;
		objeto = document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago);
		if (swRegIva != '1' && swRegIrpf != '1'){
			controlLimitePago(objeto, indiceReserva, indicePago);
		}
	}
    
    function controlTodosLimites(){
    	var e=document.getElementsByName("importe");
    	for(var i=0; i < e.length;i++){
    		e[i].onchange();
    	}
    }