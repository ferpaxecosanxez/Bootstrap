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
	var excludedFieldsOtrosDatos = [ 'poliza.otrosDatos.swCoaseguroCedido',
									'poliza.otrosDatos.swReaseguroFacultativo'];
			
	//LOS CAMPOS QUE NO APAREZCAN PARA SER DESHABILITADOS, EST?N HABILITADOS					
	disableFieldsArray(formulario, camposDuracion);
	disablePartialFieldsArray(formulario, camposOtrosDatos, excludedFieldsOtrosDatos);
	
	var arrayIncludedFields = ['poliza.datosGenerales.fecVctoPoliza'];
	
	//Ponemos a enabled imagenes, enlaces y botones
	enabledComponents(arrayIncludedFields);
	
}
