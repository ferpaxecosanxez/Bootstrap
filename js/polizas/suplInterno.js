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
	var excludedFieldsCamposGestion = [ 'poliza.datosGestion.mediadorGestor.idMediador',
								 		'poliza.datosGestion.mediadorGestor.codMediador',
								 		'poliza.datosGestion.mediadorGestor.descMediador',
								 		'poliza.datosGestion.idTipoComision',
										'poliza.datosGestion.porcComisGestorPrimer',
								 		'poliza.datosGestion.porcComisGestorSuc',
								 		'poliza.datosGestion.mediadorGestor.porcParticComisPrimer',
								 		'poliza.datosGestion.mediadorGestor.porcParticComisSuc',
								 		'poliza.datosGestion.idMedioCobro',
								 		'poliza.datosGestion.idMotivoAviso',
								 		'poliza.datosGestion.fecAviso',
								 		'poliza.datosGestion.fecContable'];

	var excludedFieldsCamposTomador = [   'botonLimpiarCuenta'
										, 'botonLimpiarIban'];
	
	var excludedFieldsDomicilioTomador = [ 'btLimpiarDomicCobroTipoCobro', 'btLimpiarDomicCobroTipoDocu', 'btLimpiarDomicCobro'];
	
	var excludedFieldsCamposCoaseguroAceptado = [ 'poliza.otrosDatos.polizaCoaseguroCedente',
												  'poliza.otrosDatos.suplementoCoaseguroCedente',
												  'poliza.otrosDatos.reciboCoaseguroCedente'];
												  
	var excludedFieldsCamposReaseguroAceptado = [ 'poliza.otrosDatos.polizaReaseguroCedente',
												  'poliza.otrosDatos.suplementoReaseguroCedente',
												  'poliza.otrosDatos.reciboReaseguroCedente'];
			
	//LOS CAMPOS QUE NO APAREZCAN PARA SER DESHABILITADOS, EST?N HABILITADOS					
	disableFieldsArray(formulario, datosMovimiento);
	disableFieldsArray(formulario, camposDuracion);
	disableFieldsArray(formulario, camposIndicador);
	disablePartialFieldsArray(formulario, camposGestion, excludedFieldsCamposGestion);
	//Habilita los datos del tomador, para luego poder deshabilitarlos selectivamente
	//disableDatosTomador(false);
	disableFieldsArray(formulario, camposTomador);
	disablePartialFieldsArray(formulario, camposTomador, excludedFieldsCamposTomador);
	disablePartialFieldsArray(formulario, camposDomicilioTomador, excludedFieldsDomicilioTomador);
	
//	disableFieldsArray(formulario, camposOtrosDatos);
//	disablePartialFieldsArray(formulario, camposCoaseguroAceptado, excludedFieldsCamposCoaseguroAceptado);
//	disablePartialFieldsArray(formulario, camposReaseguroAceptado, excludedFieldsCamposReaseguroAceptado);
	showTipoNegocio(document.getElementById('poliza.otrosDatos.idTipoNegocio').value);
	
	var arrayExcludedFields = ['poliza.personaRelacionada.docIdPersona',
							   'poliza.datosGestion.mediadorGestor.codMediador',
							   'tomador.domicilioView.via',
							   'tomador.domicilioCobroView.via',
							   'tomador.domicilioDocumView.via',
							   'tomador.domicilioView.localidad',
							   'tomador.domicilioCobroView.localidad',
							   'tomador.domicilioDocumView.localidad',
							   'poliza.datosGestion.fecAviso',
							   'tomador.ctaBanco',
							   'poliza.datosGenerales.numExpedienteVenta'];
	
	var arrayExcludedBotones = ['btLimpiarPersonaRelacionada', 'btLimpiarDomicCobro', 'btLimpiarDomicCobroTipoCobro', 'btLimpiarDomicCobroTipoDocu'];
	
	arrayExcludedFields = arrayExcludedFields.concat(excludedFieldsCamposTomador).concat(arrayExcludedBotones);
	
	var moreLinksEnabled = ['imgDisabledContenido', 'imgDisabledNoContenido'];
	
	//A los linksEnabeld establecidos en comunBloqueos.js le a?adimos en este caso dos nuevos enlaces
	linksEnabled = linksEnabled.concat(moreLinksEnabled);
	
	//Ponemos a disabled imagenes, enlaces y botones
	//disableComponents(arrayExcludedFields);
	
	var arrayIncludedFields = ['poliza.datosGenerales.fecVctoPoliza'];
	//Ponemos a enabled imagenes, enlaces y botones
	enabledComponents(arrayIncludedFields);
	
	//datosDomicilio.jsp
	//if (domiciliosFunctions!=null) eval(domiciliosFunctions);	
	document.getElementById('poliza.datosGestion.idTipoComision').disabled=true; //combo del tipo de comision	
	obj = new Object(formulario);
	if(obj['poliza.datosGestion.porcComisGestorPrimer'])obj['poliza.datosGestion.porcComisGestorPrimer'].disabled=true;	
	if(obj['poliza.datosGestion.porcComisGestorSuc'])obj['poliza.datosGestion.porcComisGestorSuc'].disabled=true;	
}
