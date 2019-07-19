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
			//bloqueoDatosAgrupacion(formulario);
			break;
		case 2://datos riesgo poliza
			//bloqueoDatosRiesgoPoliza(formulario);
			break;			
		case 4://datos riesgo agrupacion
			//bloqueoDatosRiesgoAgrupacion(formulario);
			break;			
		case 5://datos riesgo asegurado
			bloqueoDatosRiesgoAsegurado(formulario);
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

	//Obtenemos el Vencimiento, para ver si viene definido a nivel de POLIZA o a nivel de RIESGO
	//RIESGO por defecto
	var excludedFieldsCamposDuracion = [ ];
	
	if(document.getElementById("poliza.idNivelFecVcto") != null){
	
		//POLIZA		
		if( document.getElementById("poliza.idNivelFecVcto").value == 1){  
			//Campos que no se ponen a disabled
			excludedFieldsCamposDuracion = [ 'poliza.datosGenerales.fecVctoMvtoPoliza'];		
		}
	}else{
		//Para los productos de un solo riesgo
		//Campos que no se ponen a disabled
		excludedFieldsCamposDuracion = [ 'poliza.datosGenerales.fecVctoMvtoPoliza'];	
	}
	
	//LOS CAMPOS QUE NO APAREZCAN PARA SER DESHABILITADOS, EST?N HABILITADOS					
	disableFieldsArray(formulario, datosMovimiento);
	disablePartialFieldsArray(formulario, camposDuracion, excludedFieldsCamposDuracion);
	disableFieldsArray(formulario, camposIndicador);
	disableFieldsArray(formulario, camposProcedenciaNegocio);
	disableFieldsArray(formulario, camposGestion);
	disableFieldsArray(formulario, camposMedidador);
	disableFieldsArray(formulario, camposTomador);
	disableFieldsArray(formulario, camposOtrosDatos);
	disableFieldsArray(formulario, camposCoaseguroAceptado);
	disableFieldsArray(formulario, camposReaseguroAceptado);
	disableFieldsArray(formulario, camposRelacionesPoliza);
	disableFieldsArray(formulario, camposDomicilioTomador);
	
	//Ponemos a disabled imagenes, enlaces y botones
	disableComponents(excludedFieldsCamposDuracion);
	
	obj['poliza.datosGenerales.numExpedienteVenta'].disabled=true;
}


/*
*	Funcion encargada de bloquear los datos del riesgo asegurado
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoAsegurado(formulario){

	obj = new Object(formulario);
	
	if(obj['riesgoBean.fecVctoRiesgo'])obj['riesgoBean.fecVctoRiesgo'].disabled=false;	
	
	var arrayExcludedFields = ['riesgoBean.fecVctoRiesgo'];
	
	//Ponemos a enabled imagenes, enlaces y botones
	disableComponents(arrayExcludedFields);
}
