function cambiarReferenciasEconomicas(){
	var id = document.getElementById('sntroPagoView.medioPago.id').value;

	if(document.getElementById('datosConsignados') != null){
		document.getElementById('datosConsignados').style.display = 'none';
	}
	
	if (id == idChequeManual){
		bloqueoCamposCuentaDestino(true);
		document.getElementById('sntroPagoView.idReferenciaPago').value = idReferCheque;
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = false;
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;
		
	}else if (id == idChequeAuto){
		bloqueoCamposCuentaDestino(true);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;
					
	}else if (id == idTransferenciaManual){
		bloqueoCamposCuentaDestino(false);
		document.getElementById('sntroPagoView.idReferenciaPago').value = idReferTranfer;
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = false;
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;
		
	}else if (id == idTransferenciaAuto){
		bloqueoCamposCuentaDestino(false);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = false;
		
	}else if (id == idConsignacionManual){
		bloqueoCamposCuentaDestino(true);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;

		if(document.getElementById('datosConsignados') != null){
			document.getElementById('datosConsignados').style.display = '';
		}
		
	}else if (id == idConsignacionAuto){
		bloqueoCamposCuentaDestino(true);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;

		if(document.getElementById('datosConsignados') != null){
			document.getElementById('datosConsignados').style.display = '';
		}
		
	}else if (id == idAgencia){
		bloqueoCamposCuentaDestino(false);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;
		
	}else{
		bloqueoCamposCuentaDestino(false);
		document.getElementById('sntroPagoView.idReferenciaPago').value = '';
		document.getElementById('sntroPagoView.referenciaEconomica').disabled = true;
		document.getElementById('sntroPagoView.referenciaEconomica').value = '';
		document.getElementById('sntroPagoView.mesesPeriodicidad').disabled = true;
		
	}
}

function bloqueoCamposCuentaDestino(flag){
	if(document.getElementById('datosCCC') != undefined){
		document.getElementById('sntroPagoView.tipoDatoBancoDestino.id').disabled = flag;
		document.getElementById('datosCCC').disabled = flag;
	}
	
	if(document.getElementById('datosIban') != undefined){
		document.getElementById('sntroPagoView.tipoDatoBancoDestino.id').disabled = flag;
		document.getElementById('datosIban').disabled = flag;
	}
	
	if(document.getElementById('imgLupaBanco') != undefined){
		if(flag == true){
			document.getElementById('capaDatosBanco').style.visibility='hidden';
		}else{
			document.getElementById('capaDatosBanco').style.visibility='visible';
		}
		
		document.getElementById('imgLupaBanco').disabled = flag;
	}
}

function cambiarMedioPago(){
	cambiarReferenciasEconomicas();
	
	var idTipoDatoOrigen = document.getElementById('sntroPagoView.tipoDatoBancoOrigen.id').value;
	
	// se recargan los datos del banco mediante ajax
	var actionAjax =  accionAjaxBuscarOrigenReload;
	actionAjax += '?idTipoDatoBancoAjax=' + idTipoDatoOrigen 
	retrieveURLParameterPopPup(actionAjax,'datosPagoForm','sntroPagoView.medioPago.id','idMedioPagoAjax');
}

function datosBancariosPerceptor() {
	
	var idDatoBancario = document.getElementById("sntroPagoView.idCBancariaDestino");	
	var valor = buscarCtaBancaria(idPerceptor, tipoBusqueda ,accionBuscarCuenta, idDatoBancario.value);
	
	if (valor != undefined){
		if(valor[0] != null){
			setValue('sntroPagoView.idDatoBancario',valor[0]);
			setValue('sntroPagoView.idCBancariaDestino',valor[0]);
		}
	
		// tipo dato bancario
		if(valor[1] != null){        
			setValue('sntroPagoView.tipoDatoBancoDestino.id' ,valor[1]);
		}
	
		reloadDatosBancarios();
	}
}

// Se recargan los datos del banco mediante ajax
function reloadDatosBancarios(){
	var actionAjax =  accionAjaxBuscarCuenta;
	actionAjax = actionAjax + '?idTipoDatoBancoAjax='+ document.getElementById('sntroPagoView.tipoDatoBancoDestino.id').value;
	retrieveURLParameterPopPup(actionAjax,'datosPagoForm','sntroPagoView.idDatoBancario','idDatosBancoAjax'); 
}

// Funcion para el control del numero de factura
function controlNumFactura(pObjeto, indiceReserva, indicePago){
	document.getElementById('numFacturaBBDD_'+indiceReserva+'_'+indicePago).value = pObjeto.value;
}

// Funcion para el control de las observaciones
function controlObservacion(pObjeto, indiceReserva, indicePago){
	document.getElementById('observacionBBDD_'+indiceReserva+'_'+indicePago).value = pObjeto.value;
}

// Funcion para abrir la pantalla de reservas y reestimarlas manualmente
function actualizarReservas(idExPolGarCob, idObjetoStro, tipo){
	muestraCarga();
	var pag = accionActualizarReservas;   
	pag = pag + '?polGarCobView.id='+ idExPolGarCob;
	var valor = lanzarVentanaSiniestros(pag,840,550);
	if ((valor != undefined) && (valor != false)){
		document.forms[0].action=accionRecarga;
		document.forms[0].submit();
	}
}

function controlMesesPeriodicidad(campo){
	var meses = campo.value;
	
	if (meses!=undefined && meses!=null && meses!='' && meses > 12){
		alert(mensajeErrorPeriodicidad);
	}
}

function compruebaPagoDuplicado(){
	var action = accionComprobarDuplicados;
	action = action + '?idExpedienteAjax='+idExpediente;
	action = action + '&importeLiquidoAjax='+ document.getElementById('importeTotal').innerText;
	facturas=crearListaFacturas();
	action = action + '&facturasAjax='+facturas;
	retrieveURLPorPostPopPup(action, '0', false);
	return document.getElementById("pagoDuplicado").innerText=="true";
}

function crearListaFacturas(){
	var listaFacturas='';

	for (i = 0; i < contadorConceptos; i++) {
		var factura = document.getElementById('sntroPagoView.lstPagoDetalleView['+i+'].numFactura').value;
		if((factura != "")){
			if (i==0){
				listaFacturas=factura;
			}else{
				listaFacturas=listaFacturas+'@'+factura;
			}
		}
	}
	return listaFacturas;
}

function habilitarRecobro(){
	if(document.getElementById('sntroPagoView.motivoRecobro.id')){
		if(document.getElementById('sntroPagoView.clasePago.id').value == idRecobrable
				|| document.getElementById('sntroPagoView.clasePago.id').value == idRepetible){
			document.getElementById('sntroPagoView.motivoRecobro.id').disabled = false;
		}else{
			document.getElementById('sntroPagoView.motivoRecobro.id').value = '';
			document.getElementById('sntroPagoView.motivoRecobro.id').disabled = true;
		}
	}
}

function checkCambioPactado(pObjeto){
    if (pObjeto.checked){
    	document.getElementById('sntroPagoView.tipoCambioDiv.id').value = idCambioDivPactado;
    }else{
    	document.getElementById('sntroPagoView.tipoCambioDiv.id').value = ""; 
    }
}