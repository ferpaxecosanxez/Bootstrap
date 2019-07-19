///////////////////////////////////////////////////////////////////////////////////////////////////////////
// DHONORARIOS 
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Funcion que pasa un string de un numero con el formato de decimales con coma
 y cambia el formato al string y lo pasa a float */
function desFormatearNumero(importeString) {
	importeString = importeString.replace(/\./g, '');
	importeString = importeString.replace(',', '.');
	var importe = parseFloat(importeString);
	return importe;
}

function obtenerNumero(idInput) {
	var input = document.getElementById(idInput);
	var numero = desFormatearNumero(input.value);
	return numero;
}

function calcularTotales(inputMod) {

	if (inputMod.value != "") {
		// Obtengo todos los datos en como numericos
		var honorarios = obtenerNumero('encargoView.encargoEntradaGeneralView.honorarios');
		var dietas = obtenerNumero('encargoView.encargoEntradaGeneralView.dietas');
		var fotos = obtenerNumero('encargoView.encargoEntradaGeneralView.fotos');
		var kilometraje = obtenerNumero('encargoView.encargoEntradaGeneralView.kilometraje');
		var hoteles = obtenerNumero('encargoView.encargoEntradaGeneralView.hoteles');
		var otros = obtenerNumero('encargoView.encargoEntradaGeneralView.otros');
		var gastosProcurador = obtenerNumero('encargoView.encargoEntradaGeneralView.gastosProcurador');
		var gastosJudiciales = obtenerNumero('encargoView.encargoEntradaGeneralView.gastosJudiciales');
		var suplidos = obtenerNumero('encargoView.encargoEntradaGeneralView.suplidos');
		var provisionFondos = obtenerNumero('encargoView.encargoEntradaGeneralView.provisionFondos');
		var devolucionProvisionFondos = obtenerNumero('encargoView.encargoEntradaGeneralView.devolucionProvisionFondos');
		var porcentajeIrpf = obtenerNumero('encargoView.encargoEntradaGeneralView.porcentajeIrpf');
		var porcentajeIva = obtenerNumero('encargoView.encargoEntradaGeneralView.porcentajeIva');

		// realizo todos los calculos

		// Total Gastos
		var totalGastos = dietas + fotos + kilometraje + hoteles + otros;

		// Total
		var total = honorarios + totalGastos + gastosProcurador
				+ gastosJudiciales;
		
		// Importe Retencion
		var importeRetencion = 0;
		if (idConceptoIrpf == "") {
			importeRetencion = (total * porcentajeIrpf) / 100;
		} else if (idConceptoIrpf == conceptoIrpf_SinIrpf) {
			importeRetencion = 0;
		} else if (idConceptoIrpf == conceptoIrpf_IvaSobreGastos) {
			importeRetencion = (totalGastos * porcentajeIrpf) / 100;
		} else if (idConceptoIrpf == conceptoIrpf_IvaSobreHonor) {
			importeRetencion = (honorarios * porcentajeIrpf) / 100;
		} else if (idConceptoIrpf == conceptoIrpf_IvaSobreGastosYHonor) {
			importeRetencion = ((totalGastos + honorarios) * porcentajeIrpf) / 100;
		}

		// Importe Iva
		var importeIva = 0;
		if (idConceptoIva == "") {
			importeIva = (total * porcentajeIva) / 100;
		} else if (idConceptoIva == conceptoIva_SinIva) {
			importeIva = 0;
		} else if (idConceptoIva == conceptoIva_IvaSobreGastos) {
			importeIva = (totalGastos * porcentajeIva) / 100;
		} else if (idConceptoIva == conceptoIva_IvaSobreHonor) {
			importeIva = (honorarios * porcentajeIva) / 100;
		} else if (idConceptoIva == conceptoIva_IvaSobreGastosYHonor) {
			importeIva = ((totalGastos + honorarios) * porcentajeIva) / 100;
		}

		// importe
		var importe = total - importeRetencion + importeIva;

		// Importe Liquido
		var importeLiquido = importe + provisionFondos
				- devolucionProvisionFondos + suplidos;

		// Asigno los valores calculados
		document.getElementById('encargoView.encargoEntradaGeneralView.totalGastos').value = formatearImporte(totalGastos);
		document.getElementById('encargoView.encargoEntradaGeneralView.total').value = formatearImporte(total);
		document.getElementById('encargoView.encargoEntradaGeneralView.importeRetencion').value = formatearImporte(importeRetencion);
		document.getElementById('encargoView.encargoEntradaGeneralView.importeIva').value = formatearImporte(importeIva);
		document.getElementById('encargoView.encargoEntradaGeneralView.importe').value = formatearImporte(importe);
		document.getElementById('encargoView.encargoEntradaGeneralView.importeLiquido').value = formatearImporte(importeLiquido);

	} else { // si se deja en blanco pogno un cero para realizar
				// correctamente los calculos
		inputMod.value = "0";
		// Recalculo los valores con el cero
		calcularTotales(inputMod);
	}

}

function MostrarCapa(obj, cap) {
	var capa = eval("document.getElementById('" + cap + "')");
	capa.style.width = 130 + "px";// numCaracteres*7 + "px";
	capa.style.backgroundColor = "white";
	capa.style.display = (capa.style.display == "block") ? "none" : "block";
	capa.style.position = "absolute";
	obj.style.position = "relative";
	capa.style.border = "solid  1px black";
	capa.style.padding = "3px";
	capa.style.top = obj.offsetTop + obj.offsetHeight + "px";
	capa.style.left = obj.offsetLeft - 117 + "px";

}

/* Funcinción para abrir la Gestión Documental */
function abrirGD() {
	var url = clienteGD + "?Usuario=" + usuarioGD + "&Expediente="
			+ idExpediente + "&Area=" + area;
	lanzarVentanaOpen(url, top.document.body.offsetWidth,
			top.document.body.offsetHeight);
}

/* Funcion que se llama al finalizar la carga de la pagina dHonorarios.jsp */
function onLoadPaginaDHonorarios() {
	if ((swModificacion == valorSi)
			&& (swTipoModificacion == modificacionEntrada)) {
		for ( var i = 0; i < document.forms[0].elements.length; i++) {
			document.forms[0][i].disabled = false;
		}
	}

	if (swPagoHonorarios == valorNo) {
		document.getElementById('encargoView.encargoEntradaGeneralView.numeroFactura').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.honorarios').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.dietas').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.fotos').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.kilometraje').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.hoteles').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.otros').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.gastosProcurador').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.gastosJudiciales').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.suplidos').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.provisionFondos').disabled = true;
		document
				.getElementById('encargoView.encargoEntradaGeneralView.devolucionProvisionFondos').disabled = true;
		document.getElementById('encargoView.encargoEntradaGeneralView.fechaFactura').disabled = true;
		document.getElementById('calenFechaFactura').disabled = true;
	}

	// En cualquier caso
	document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIva').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.porcentajeIrpf').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.importeRetencion').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.importeIva').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.total').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.totalGastos').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.importeLiquido').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.fecMovimiento').readOnly = true;
	document.getElementById('encargoView.encargoEntradaGeneralView.importe').readOnly = true;
	//document.getElementById('encargoView.encargoEntradaGeneralView.idClaveComunicacion').disabled = true;

	// Calculo todos los valores
	calcularTotales(document
			.getElementById('encargoView.encargoEntradaGeneralView.honorarios'));
}

// FINAL DHONORARIOS
// //////////////////////////////////////////////////////////////////////////////////////////////////
