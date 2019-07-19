/*
*	Funcion de bloqueo de campos
*	se encarga de invocar a la funcion de bloqueo de la jsp en la que estemos
*	formulario --> formulario que contiene los campos a bloquear
*	tipo --> indica la jsp que tiene que bloquear: agrupaciones, datos generales, riesgos,...
*/

function bloqueoCampos(formulario, tipo){

	switch(tipo){
		case 0://datos generales
			bloqueoDatosGenerales(formulario);
			break;
		case 1://datos agrupacion
			bloqueoDatosAgrupacion(formulario);
			break;
		case 2://datos riesgo poliza
			bloqueoDatosRiesgoPoliza(formulario);
			break;			
		case 4://datos riesgo agrupacion
			bloqueoDatosRiesgoAgrupacion(formulario);
			break;			
		case 5://datos riesgo asegurado
			bloqueoDatosRiesgoAsegurado(formulario);
			break;
		case 6://datos mediadores
			bloqueoDatosMediadores(formulario);
			break;			
	}
}

/*
*	Funcion encargada de bloquear los datos generales de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosGenerales(formulario){

	obj = new Object(formulario);

	disableDatosTomador(true);
	disableDatosDomicilioAux(true);
	disableDatosTja(true, 'tomador');
	disableDatosBancarios(true, 'tomador');
	checkTipoComision(formulario,'poliza.datosGestion.idTipoComision');
	checkMasRiesgos();
}

/*
*	Funcion encargada de bloquear los datos del riesgo de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoPoliza(formulario){

}

/*
*	Funcion encargada de bloquear los datos del riesgo de la agrupacion
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoAgrupacion(formulario){

}

/*
*	Funcion encargada de bloquear los datos del riesgo asegurado
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoAsegurado(formulario){

}

/*
*	Funcion encargada de bloquear los datos de las agrupaciones
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosAgrupacion(formulario){

}

/*
*	Funcion encargada de bloquear los datos de los mediadores
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosMediadores(formulario){

}

/*
 * Para el caso de un rehecho se permite la modificacion del tipo de comision
 */
function checkTipoComision(form, tipoComision) {
    if(document.getElementById('idTipoMovimientoPoliza')!=undefined){
	if(document.getElementById('idTipoMovimientoPoliza').value == 10){
	    document.getElementById('poliza.datosGestion.idTipoComision').disabled=false;
	}
    }
}

function checkMasRiesgos() {
    if(document.getElementById('deshabilitarRiesgos').value == 'true'){
    	document.getElementById('swMasRiesgos.si').disabled=true;
    	document.getElementById('swMasRiesgos.no').disabled=true;
	}
}