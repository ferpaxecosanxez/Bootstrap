///////////////////////////////////////////////////////////////////////////////////////////////////////////
// DHONORARIOS FOTOPERITACION
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

/* Funcinción para abrir la Gestión Documental */
function abrirGD() {
	var url = clienteGD + "?Usuario=" + usuarioGD + "&Expediente="
			+ idExpediente + "&Area=" + area;
	lanzarVentanaOpen(url, top.document.body.offsetWidth,
			top.document.body.offsetHeight);
}

// FINAL DHONORARIOS
// //////////////////////////////////////////////////////////////////////////////////////////////////
