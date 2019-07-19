function datosBancariosPerceptor(accionBuscarCuenta, idPerceptor, tipoBusqueda, tipoCtaBancaria, tipoIban) {
	var valor = lanzarVentana(accionBuscarCuenta + "?idPerceptor=" + idPerceptor + "&tipoBusqueda=" + tipoBusqueda, 500, 550);
	
	if (valor != undefined){
		var nuevoCSB = valor[2];
		
		if(nuevoCSB != "") {
			setValue("perceptor.csb", nuevoCSB);
			setValue("perceptor.sucursal", valor[3]);
			setValue("perceptor.dc", valor[4]);
			setValue("perceptor.cuenta", valor[5]);
			
			setValue("perceptor.iban", "");
			
			setValue("perceptor.tipoDatoBancario", tipoCtaBancaria);
			document.getElementById("perceptor.tipoDatoBancario").onchange();
		} else {
			setValue("perceptor.csb", "");
			setValue("perceptor.sucursal", "");
			setValue("perceptor.dc", "");
			setValue("perceptor.cuenta", "");
			
			setValue("perceptor.iban", valor[6]);
			
			setValue("perceptor.tipoDatoBancario", tipoIban);
			document.getElementById("perceptor.tipoDatoBancario").onchange();
		}
	}
}

function limpiarDatosBancariosPerceptor(tipoCtaBancaria) {
	if(getValue("perceptor.tipoDatoBancario") == tipoCtaBancaria) {
		setValue("perceptor.csb", "");
		setValue("perceptor.sucursal", "");
		setValue("perceptor.dc", "");
		setValue("perceptor.cuenta", "");
	} else {
		setValue("perceptor.iban", "");		
	}
}


function datosBancarios(accionBuscarCuenta, idFigura, tipoFigura, tipoCuenta, tipoDatoBanco, codIban) {
	var valor = lanzarVentana(accionBuscarCuenta + "?idFigura=" + idFigura + "&tipoFigura=" + tipoFigura+ "&tipoCuenta=" + tipoCuenta+ "&tipoDatoBanco=" + tipoDatoBanco + "&codIban=" + codIban, 500, 550);
	if (valor != undefined){
		var nuevoCSB = valor[2];
		if(nuevoCSB != "") {
			setValue("perceptor.csb", nuevoCSB);
			setValue("perceptor.sucursal", valor[3]);
			setValue("perceptor.dc", valor[4]);
			setValue("perceptor.cuenta", valor[5]);
			
			setValue("perceptor.iban", valor[6]);
			
			setValue("perceptor.tipoDatoBanco", valor[2]);
			//document.getElementById("perceptor.tipoDatoBancario").onchange();
		} else {
			setValue("perceptor.csb", "");
			setValue("perceptor.sucursal", "");
			setValue("perceptor.dc", "");
			setValue("perceptor.cuenta", "");
			
			setValue("perceptor.iban", valor[6]);
			
			setValue("perceptor.tipoDatoBanco", valor[2]);
			//document.getElementById("perceptor.tipoDatoBancario").onchange();
		}
	
		return [valor[0],valor[6]];	
	}
}

function limpiarDatosBancarios(tipoCtaBancaria) {
	if(getValue("perceptor.tipoDatoBancario") == tipoCtaBancaria) {
		setValue("perceptor.csb", "");
		setValue("perceptor.sucursal", "");
		setValue("perceptor.dc", "");
		setValue("perceptor.cuenta", "");
	} else {
		setValue("perceptor.iban", "");		
	}
}


function cambiarCapaDatos(value) {
	switch(parseInt(value)) {
		case <%= TipoDatoBanco.CTA_BANCARIA.intValue() %>:
			showHide("datosIban", false);
			showHide("datosCCC", true);
			break;
		case <%= TipoDatoBanco.CTA_IBAN.intValue() %>:
			showHide("datosIban", true);
			showHide("datosCCC", false);
			break;
	}
}
  
// El boton ejecutar solo se debe activar cuando hay modificaciones en los campos
function showBotonEjecutar() {
	showHide('botonEjecutar', true);
}

// Activa los campos de cuenta (ocurre al pulsar el boton "Limpiar")
function activarEdicionCuenta() {
	document.getElementById("perceptor.csb").readOnly = false;
	document.getElementById("perceptor.sucursal").readOnly = false;
	document.getElementById("perceptor.dc").readOnly = false;
	document.getElementById("perceptor.cuenta").readOnly = false;
	document.getElementById("perceptor.iban").readOnly = false;
	
	showBotonEjecutar();
}

// Desactiva los campos de cuenta (ocurre al pulsar en la lupa)
function desactivarEdicionCuenta() {
	document.getElementById("perceptor.csb").readOnly = true;
	document.getElementById("perceptor.sucursal").readOnly = true;
	document.getElementById("perceptor.dc").readOnly = true;
	document.getElementById("perceptor.cuenta").readOnly = true;
	document.getElementById("perceptor.iban").readOnly = true;
}
