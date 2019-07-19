/*
*	Funcion de bloqueo de campos
*	se encarga de invocar a la funcion de bloqueo de la jsp en la que estemos
*	formulario --> formulario que contiene los campos a bloquear
*	tipo --> indica la jsp que tiene que bloquear: agrupaciones, datos generales, riesgos,...
*/

function bloqueoCampos(formulario, tipo){

	var form = new Object(formulario);

	switch(tipo){
		case 0://datos generales
			bloqueoDatosGenerales(form);
			break;
		case 1://datos agrupacion
			//bloqueoDatosAgrupacion(form);
			break;
		case 2://datos riesgo poliza
			//bloqueoDatosRiesgoPoliza(form);
			break;			
		case 4://datos riesgo agrupacion
			//bloqueoDatosRiesgoAgrupacion(form);
			break;			
		case 5://datos riesgo asegurado
			//bloqueoDatosRiesgoAsegurado(form);
			break;
		case 6://datos mediadores
			//bloqueoDatosMediadores(form);
			break;			
	}
}

/*
*	Funcion encargada de bloquear los datos generales de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosGenerales(formulario){
	
	//Campos que no se ponen a disabled
	var excludedFieldsCamposGestion = [ 'poliza.datosGestion.mediadorGestor.idMediador',
	                                    'poliza.datosGestion.mediadorGestor.codMediador',
					    'poliza.datosGestion.mediadorGestor.descMediador',
					    'poliza.datosGestion.porcComisGestorPrimer',
					    'poliza.datosGestion.porcComisGestorSuc',								 		
					    'poliza.datosGestion.mediadorGestor.porcParticComisPrimer',
					    'poliza.datosGestion.mediadorGestor.porcParticComisSuc',
					    'poliza.datosGestion.idMedioCobro',
					    'poliza.datosGestion.idMotivoAviso',
					    'poliza.datosGestion.fecAviso',
					    'poliza.datosGestion.fecContable'];
	
	var excludedFieldsOtrosDatos = [ 'poliza.otrosDatos.swCoaseguroCedido',
					 'poliza.otrosDatos.swReaseguroFacultativo'];
	
	var excludedFieldsIndicadorDatos = ['swMasRiesgos',
	                                    'swMasRiesgos.si',
	                                    'swMasRiesgos.no',
	                                    'swAgrpRiesgos',
	                                    'swAgrpRiesgos.si',
	                                    'swAgrpRiesgos.no',	
	                                    'poliza.idNivelEmisionRecibo',
	                                    'poliza.idNivelFecVcto',
	                                    'swGaranGenRiesgoPoliza',
	                                    'swGaranGenRiesgoPoliza.si',
	                                    'swGaranGenRiesgoPoliza.no',
	                                    'poliza.idNivelMedioCobro',
	                                    'poliza.idNivelFormaPago'];	
	
	var excludedFieldsTomador = [ 'botonLimpiarCuenta'
	                              , 'botonLimpiarIban',
	                              'tomador.swDomicilioDocu',
	                              'tomador.swDomicilioCobro'
	                             ];
	
	var excludedFieldsDomicilioTomador = [ 'btLimpiarDomicCobroTipoCobro', 'btLimpiarDomicCobroTipoDocu', 'btLimpiarDomicCobro'];
	
	//LOS CAMPOS QUE NO APAREZCAN PARA SER DESHABILITADOS, EST?N HABILITADOS	
	disableFieldsArray(formulario, camposDuracion);
//	disablePartialFieldsArray(formulario, camposOtrosDatos, excludedFieldsOtrosDatos);
	disableFieldsArray(formulario, datosMovimiento);
	disablePartialFieldsArray(formulario, camposIndicador,excludedFieldsIndicadorDatos);
	disablePartialFieldsArray(formulario, camposGestion,excludedFieldsCamposGestion);
	checkFormaPago(formulario,'poliza.datosGestion.idFormaPago');
	checkNumSuplementoExt(formulario,'poliza.numSuplExterno');
	disableFieldsArray(formulario, camposTomador);
	disablePartialFieldsArray(formulario, camposTomador, excludedFieldsTomador);
	disablePartialFieldsArray(formulario, camposDomicilioTomador, excludedFieldsDomicilioTomador);
//	disablePartialFieldsArray(formulario, camposOtrosDatos, excludedFieldsOtrosDatos);
//	disableFieldsArray(formulario, camposCoaseguroAceptado);
//	disableFieldsArray(formulario, camposReaseguroAceptado);
	showTipoNegocio(document.getElementById('poliza.otrosDatos.idTipoNegocio').value);
	
	var arrayIncludedFields = ['poliza.datosGenerales.fecVctoPoliza'];
	
	//Ponemos a enabled imagenes, enlaces y botones
	enabledComponents(arrayIncludedFields);
	
	//Mediador
	document.getElementById('poliza.datosGestion.idTipoComision').disabled=true; //combo del tipo de comision
	obj = new Object(formulario);
	if(obj['poliza.datosGestion.porcComisGestorPrimer'])obj['poliza.datosGestion.porcComisGestorPrimer'].disabled=true;	
	if(obj['poliza.datosGestion.porcComisGestorSuc'])obj['poliza.datosGestion.porcComisGestorSuc'].disabled=true;	
	obj['poliza.numSuplExterno'].disabled=false;
	if(obj['swMasRiesgos.si'] != null && obj['swMasRiesgos.si'].checked) {
		obj['swMasRiesgos'].disabled=true;
		obj['swMasRiesgos.si'].disabled=true;
		obj['swMasRiesgos.no'].disabled=true;
	}
	if(obj['swAgrpRiesgos.si'] != null && obj['swAgrpRiesgos.si'].checked) {
		obj['swAgrpRiesgos'].disabled=true;
		obj['swAgrpRiesgos.si'].disabled=true;
		obj['swAgrpRiesgos.no'].disabled=true;
	}
	obj['poliza.datosGenerales.numExpedienteVenta'].disabled=true;	
}


function checkFormaPago(form, formaPago) {
	if(document.getElementById('swBloqueoFormaPago')!=undefined){		
		if (document.getElementById('swBloqueoFormaPago').value==0) {
			enableField(form, formaPago);
		}
	}
}

/*
 * Para el caso de un Suplemento de una póliza con 
 * Tipo de Negocio = Coaseguro Aceptado o Reaseguro Aceptado 
 * y sólo para esos casos, debe de desproteger el campo Num. Supl.Ext
 */
function checkNumSuplementoExt(form, numSuplementoExt) {
	if(document.getElementById('poliza.otrosDatos.idTipoNegocio')!=undefined){		
		if (document.getElementById('poliza.otrosDatos.idTipoNegocio').value==3 || document.getElementById('poliza.otrosDatos.idTipoNegocio').value==5) {
		    enableField(form, numSuplementoExt);
		}
	}
}

