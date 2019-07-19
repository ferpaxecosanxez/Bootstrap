	/* Funcion para el control del limite reserva */
	function controlLimitePago(pObjeto, indiceReserva, indicePago){
		// Importe total de todas los detalles del pago
		var totalImporte = 0;
	
		// Todos los objetos detalle del pago
		var lstPago = document.getElementsByName('importe');
	
		// Lista con todos detalles del pago
		var importeTotal = document.getElementById('importeTotal');
	
		// Importe total de los pagos de un determinado concepto de reserva
		var importeTotalPagoXConcepto = document.getElementById('conceptoPagoReserva['+indiceReserva+'].totalImportesPago').value;
	
		// Importe que hay para un concepto de reserva determinado
		var limiteReserva = document.getElementById('conceptoPagoReserva['+indiceReserva+'].importeReserva').value;
		limiteReserva = limiteReserva * 100;
	
		// Lista con los detalles de pago para un determinado concepto de reserva
		var lstPagosXConcepto =  document.getElementsByName('lstImportesActuales_'+indiceReserva);
		var importePagosXConcepto = 0;
	
		var lstPagosXConceptoAnteriores =  document.getElementsByName('lstImportesAnteriores_'+indiceReserva);
		var importePagosXConceptoAnteriores = 0;
	
		var pagoDetalleActual = document.getElementById('lstImportesActuales_'+indiceReserva+'_'+indicePago); 
		pagoDetalleActual.value = pObjeto.value;
	
		var pagoDetalleAnterior = document.getElementById('lstImportesAnteriores_'+indiceReserva+'_'+indicePago);
	
		for(var i=0;i < lstPagosXConceptoAnteriores.length; i++){
			var importePagoAnterior = lstPagosXConceptoAnteriores[i].value;
			importePagoAnterior = importePagoAnterior.replace(/\./g, '');
			importePagoAnterior = importePagoAnterior.replace(',','.');
			importePagoAnterior = Math.round(importePagoAnterior * 100);
			importePagosXConceptoAnteriores += importePagoAnterior;
		}
	
		for(var i=0;i < lstPagosXConceptoAnteriores.length; i++){
			var importePago = lstPagosXConcepto[i].value;
			importePago = importePago.replace(/\./g, '');
			importePago = importePago.replace(',','.');
			importePago = Math.round(importePago * 100);
			importePagosXConcepto += importePago;
		}
	
		pagoDetalleActual.value = pagoDetalleActual.value.toString().replace(/\./g, '');
		pagoDetalleActual.value = formateoDecimales(pagoDetalleActual.value.toString(),',',2,'.',11);
		pagoDetalleActual.value = mascaraDecimal(pagoDetalleActual.value.toString(),',','2');
	
		pagoDetalleAnterior.value = pagoDetalleAnterior.value.toString().replace(/\./g, '');
		pagoDetalleAnterior.value = formateoDecimales(pagoDetalleAnterior.value.toString(),',',2,'.',11);
		pagoDetalleAnterior.value = mascaraDecimal(pagoDetalleAnterior.value.toString(),',','2');
	
		//Si el total del pago acumulado para el concepto de reserva es mayor que su limite 
		if(importePagosXConcepto - importePagosXConceptoAnteriores > limiteReserva){
			// Lanzamos un mensaje de aviso
			alert(comentarioReservaInsuficiente);
			// Dejamos los importes como estaban
			pagoDetalleActual.value = document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value;
			pObjeto.value = document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value;
		} else{
	
			//pagoDetalleAnterior.value = pagoDetalleActual.value;
			document.getElementById('importesBBDD_'+indiceReserva+'_'+indicePago).value = pagoDetalleActual.value;
		
			//Se muestra en la pagina el total del pago para el concepto de reserva
			importePagosXConcepto = importePagosXConcepto / 100;   
			importePagosXConcepto = importePagosXConcepto.toString().replace('.',',');
			importePagosXConcepto = formateoDecimales(importePagosXConcepto.toString(),',',2,'.',11);
			importePagosXConcepto = mascaraDecimal(importePagosXConcepto.toString(),',','2');
			document.getElementById('totalImportesPago_'+indiceReserva).innerHTML = importePagosXConcepto.toString();
		
			// Sumamos todos los importes de los pagos
			for(var i=0;i < lstPago.length; i++){
				var importePago = lstPago[i].value;
				importePago = importePago.replace(/\./g, '');
				importePago = importePago.replace(',','.');
				importePago = Math.round(importePago * 100);
				totalImporte += importePago;
			}
		
			//Los mostramos en la pagina
			totalImporte = totalImporte / 100;   
			document.getElementById('importeTotalPago').value = totalImporte.toString();
			document.getElementById('importeLiquidoPago').value = totalImporte.toString();
			totalImporte = totalImporte.toString().replace('.',',');
			totalImporte = formateoDecimales(totalImporte.toString(),',',2,'.',11);
			totalImporte = mascaraDecimal(totalImporte.toString(),',','2');
			importeTotal.innerHTML = totalImporte.toString();
		}    
	}

	/* Comprueba que todo es correcto */
	function comprobarDatos() {
		duplicado = compruebaPagoDuplicado();
		continuar = true;
		if(duplicado)
			continuar = window.confirm(confirmacionPagoDuplicado);
		if (continuar){	
			var refEconomica = confirmarReferenciaEconomica();
			if (refEconomica){
				var importeCorrecto = comprobarImporteTotal();
				if(importeCorrecto){
					var correcto = comprobarImportesInformados('sntroPagoView.lstPagoDetalleView');
					if(correcto){	  
						//ponemos activo campos inactivos
						document.getElementById('sntroPagoView.idReferenciaPago').disabled = false;		  	
						// se envia el resultado 
						var importeTotal = document.getElementById('sntroPagoView.importeTotalPago').value;
						importeTotal = importeTotal.toString().replace('.',',');
						document.getElementById('sntroPagoView.importeTotalPago').value=importeTotal;
						document.getElementById('sntroPagoView.importeLiquidoPago').value=importeTotal;
						muestraCargaModal(890);
						enviarPagosxReserva(accionGrabarDatos);
						window.returnValue = true;
					}else{
						alert(comentarioImporteSnInf);
					}
				}else{
					alert(comentarioImporte);
				}
			}
		}
	}

	function confirmarReferenciaEconomica(){
		var id = document.getElementById('sntroPagoView.medioPago.id').value;
		if (validaCuentaDestino(id)){
			if (id == idChequeManual){
				var plantillaCheque = /^\w{1,14}$/;
				if(document.getElementById('sntroPagoView.referenciaEconomica').value == ''){
					alert(comentarioReferenciaEconomica);
					return false;
				}else{
					var valor = document.getElementById('sntroPagoView.referenciaEconomica').value;
					var re = valor.match(RegExp(plantillaCheque));
					if (re != null && re.length > 0) {
						return true;
					}else{
						alert(comentarioFormatoReferenciaEconomica);
						return false;
					}
				}
			}else if (id == idTransferenciaManual){
				if (document.getElementById('sntroPagoView.referenciaEconomica').value == ''){
					alert(comentarioReferenciaEconomica);
					return false;
				}
				return true;
			}else if (id == idConsignacionManual || id == idConsignacionAuto){
				var orgJudOrigen = getValue('sntroPagoView.orgJudOrigen');
				if (orgJudOrigen==null || orgJudOrigen==undefined || orgJudOrigen==''){
					alert(comentarioDatosConsignacion + ' (Num. Juzgado)');
					return false;
				}
				var idTipoProcJudicial = getValue('sntroPagoView.tipoProcJudicial.id');
				if (idTipoProcJudicial==null || idTipoProcJudicial==undefined || idTipoProcJudicial==''){
					alert(comentarioDatosConsignacion + ' (Tipo Procedimiento)');
					return false;
				}
				var numProcedimiento = getValue('sntroPagoView.numProcedimiento');
				if (numProcedimiento==null || numProcedimiento==undefined || numProcedimiento==''){
					alert(comentarioDatosConsignacion + ' (Num. Procedimiento)');
					return false;
				}
				var anoProcedimiento = getValue('sntroPagoView.anoProcedimiento');
				if (anoProcedimiento==null || anoProcedimiento==undefined || anoProcedimiento==''){
					alert(comentarioDatosConsignacion + ' (Año Procedimiento)');
					return false;
				}
			}
		}else{
			alert(comentarioCuentaDestino);
			return false;
		}
		return true;
	}
	
	function validaCuentaDestino(id){
		if (id == idTransferenciaAuto || id == idTransferenciaManual){
			if (document.getElementById("sntroPagoView.tipoDatoBancoDestino.id").value == idCtaBancaria &&
				document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.codBanco") &&
				(document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.codBanco").value == ""
					|| document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.codSucursal").value == ""
						|| document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.ctaDigito").value == ""
							|| document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.ctaBanco").value == "")){
					return false;
			}else if (document.getElementById("sntroPagoView.tipoDatoBancoDestino.id").value == idCtaIban
					&& document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.codIban")
					&& document.getElementById("cuentaBancariaDestino.ctaBancoDefecto.codIban").value == ""){
				return false;
			}
		}
		return true;
	}