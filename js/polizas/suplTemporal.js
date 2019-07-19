/*
*	Funcion de bloqueo de campos
*	se encarga de invocar a la funcion de bloqueo de la jsp en la que estemos
*	formulario --> formulario que contiene los campos a bloquear
*	tipo --> indica la jsp que tiene que bloquear: agrupaciones, datos generales, riesgos,...
*/
function bloqueoCampos(formulario, tipo){

	var obj = new Object(formulario);
	switch(tipo){
		case 0://datos generales
			bloqueoDatosGenerales(formulario);
			break;
		case 1://datos agrupacion
			//bloqueoDatosAgrupacion(formulario);
			break;
		case 2://datos riesgo poliza
			//bloqueoDatosRiesgoPoliza(formulario);
			break;			
		case 4://datos riesgo agrupacion
			//bloqueoDatosRiesgoAgrupacion(formulario);
			break;			
		case 5://datos riesgo asegurado
			//bloqueoDatosRiesgoAsegurado(formulario);
			break;
		case 6://datos mediadores
			//bloqueoDatosMediadores(formulario);
			break;			
	}
}

/*
*	Funcion encargada de bloquear los datos generales de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosGenerales(formulario){

	//Campos que no se ponen a disabled
	var excludedFieldsCamposGestion = [ 'poliza.datosGestion.swEmisionRecibo',
										'poliza.datosGestion.fecContable',
										'botonLimpiarCuenta',
										'botonLimpiarIban',
										'botonLimpiarDB',
										'btLimpiarDomicCobro', 'btLimpiarDomicCobroTipoCobro', 'btLimpiarDomicCobroTipoDocu',
										'tomador.btLimpiar'];
										
	//Para el suplemento temporal hay que sobreescribir la funcionalidad del onclick
	if(document.getElementById("swMasRiesgos.si") != null){	
		document.getElementById("swMasRiesgos.si").onclick = swMasRiesgosSiFunction;
	}
	if(document.getElementById("swMasRiesgos.no") != null){	
		document.getElementById("swMasRiesgos.no").onclick = swMasRiesgosNoFunction;
	}
			
	//LOS CAMPOS QUE NO APAREZCAN PARA SER DESHABILITADOS, EST?N HABILITADOS					
	disableFieldsArray(formulario, camposDuracion);
	disableFieldsArray(formulario, camposProcedenciaNegocio);
	disablePartialFieldsArray(formulario, camposGestion, excludedFieldsCamposGestion);
	disableFieldsArray(formulario, camposMedidador);
	disableFieldsArray(formulario, camposMasMediadores);
	disableFieldsArray(formulario, camposTomador);
	//disablePartialFieldsArray(formulario, camposTomador, excludedFieldsCamposTomador);
	disableFieldsArray(formulario, camposOtrosDatos);
	disableFieldsArray(formulario, camposRelacionesPoliza);
	disableFieldsArray(formulario, camposMasInfoTomador);
	
	disableFieldsArray(formulario, camposDomicilioTomador);
	var moreLinksEnabled = ['enlaceCoaseguroCedido', 'enlaceCoaseguroAceptado'];
	
	//A los linksEnabeld establecidos en comunBloqueos.js le a?adimos en este caso dos nuevos enlaces
	linksEnabled = linksEnabled.concat(moreLinksEnabled);
	//Ponemos a disabled imagenes, enlaces y botones
	disableComponents(excludedFieldsCamposGestion);
	
	//datosDomicilio.jsp
	if (domiciliosFunctions!=null){
		eval(domiciliosFunctions);
	}
	
	var arrayIncludedFields = ['poliza.datosGenerales.fecVctoPoliza'];
	//Ponemos a enabled imagenes, enlaces y botones
	enabledComponents(arrayIncludedFields);
	
	obj = new Object(formulario);
	if (obj['swMasRiesgos']) obj['swMasRiesgos'].disabled=true;
	if (obj['swMasRiesgos.si']) obj['swMasRiesgos.si'].disabled=true;
	if (obj['swMasRiesgos.no']) obj['swMasRiesgos.no'].disabled=true;
	if (obj['swAgrpRiesgos']) obj['swAgrpRiesgos'].disabled=true;
	if (obj['swAgrpRiesgos.si']) obj['swAgrpRiesgos.si'].disabled=true;
	if (obj['swAgrpRiesgos.no']) obj['swAgrpRiesgos.no'].disabled=true;
	
	obj['poliza.datosGenerales.numExpedienteVenta'].disabled=true;
}

function swMasRiesgosSiFunction(onclick){

	swMasRiesgosTrueSelected();document.getElementById('poliza.swMasRiesgos').value='1';
}

function swMasRiesgosNoFunction(){

	swMasRiesgosFalseSelected();document.getElementById('poliza.swMasRiesgos').value='0';
}

