///////////////////////////////////////////////////////////////////////////////////////////////////////////
// DVALORACION
///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/* Funcion para abrir la gestión documental */
function abrirGD() {
	var url = clienteGD + "?Usuario=" + usuarioGD + "&Expediente="
			+ idExpediente + "&Area=" + area;
	lanzarVentanaOpen(url, top.document.body.offsetWidth,
			top.document.body.offsetHeight);
}

/* Funcion que se llama al finalizar la carga de la pagina dValoracion.jsp */
function onLoadPaginaDValoracion() {
	if ((swModificacion == valorSi)
			&& (swTipoModificacion == modificacionEntrada)) {
		document.getElementById('encargoView.encargoEntradaGeneralView.claveEntrada.id').disabled = false;
		document.getElementById('encargoView.encargoEntradaGeneralView.fechaValoracion').disabled = false;
		document.getElementById('calenFecha').disabled = false;
		document.getElementById('encargoView.encargoEntradaGeneralView.importeAvance').disabled = false;
		document.getElementById('encargoView.encargoEntradaGeneralView.textoCorto').disabled = false;
		document
				.getElementById('encargoView.encargoEntradaGeneralView.observacionesActividades').disabled = false;
	}
}

// FINAL DVALORACION
// //////////////////////////////////////////////////////////////////////////////////////////////////
