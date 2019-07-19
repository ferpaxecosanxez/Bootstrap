/** *******************************************************************************************************
 * 	Funciones que realizan el calculo en CLIENTE(Navegador) de los totales por: 						  *
 * 	Conceptos por perjudicado.																			  *
 *  Incapacidad Temporal.																		          *
 *  Secuelas = Invalidez permanente. 																	  *
 *  *******************************************************************************************************
 * 	@since 05/05/2017																					  *																						  *
 *  Edgar Laucho 																						  *
 * 	*******************************************************************************************************
 */

/** *******************************************************************************************************
 * 	Realiza el calculo del total por todos los conceptos de perjuicios valorados por cada perjudicado.    *
 * 	@since 05/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 	
 *	Recibe como parametro el input html.
 * 	*******************************************************************************************************
 */
function calcularTotalesCompania(jObject) {
	
	//Obtiene la tabla del perjudicado especifico como objeto jQuery.
	var tableCompania = $("#" + getTableId(jObject));

	//Variable que contiene la sumatoria por tabla de perjudicado.
	var suma = parseFloat(0);

	//Recorre todos los input de la tabla para el perjudicado en especifico
	tableCompania.find('input').each(function()
	{
		var input = $(this);

		//Nombre del input
		var name = input.attr('name');

		//En caso de que el nombre contenga la cadena 'numAnyos' no se adiciona al total de la suma.
		if(name.indexOf('numAnyos') > 0)
		{
			return;
		}
		
		//Los input tienen como valor un número decimal formateado, se desformatea para realizar los calculos.
		var numDouble = isNull(input);

		//Sumatoria de totales por perjudicado.
		suma = parseFloat(suma) + parseFloat(numDouble);
	});

	//En el id de la tabla está concatenado la posición del perjudicado, comenzando desde cero, tal cual un array.
	var indice = getTableId(jObject).substring(13, 14);

	//Se muestra el total en el jsp
	var total = $("#idTotalPerjudicado" + indice);

	//Set al html el total por perjudicado formateado.
	total.html(formatearValoracion(suma.toFixed(2)));
	
	//Totales indemnizacion
	totalIndemnizacion();

}//fin calcularTotalesCompania

/** *******************************************************************************************************
 * 	Realiza el calculo del total por todos los conceptos de perjuicios valorados por cada perjudicado.    *
 * 	@since 05/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function calcularTotalPerjudicadosAlCargar() {
	
	//Recorre cada una de las tablas creadas por perjudicado.
	$(".perjudicadoClass").each(function()
	{
		//Variable que contiene la sumatoria por tabla de perjudicado.
		var suma = parseFloat(0);
		
		//Tabla que contiene los inputs (Conceptos) por cada uno de los perjudicados.
		var tableCompania = $(this);

		//Recorre todos los input de la tabla.
		tableCompania.find('input').each(function()
		{
			var input = $(this);

			//Nombre del input
			var name = input.attr('name');

			//En caso de que el nombre contenga la cadena 'numAnyos' no se adiciona al total de la suma.
			if(name.indexOf('numAnyos') > 0)
			{
				return;
			}
			
			//Los input tienen como valor un número decimal formateado, se desformatea para realizar los calculos.
			var numDouble = isNull(input);
			suma = parseFloat(suma) + parseFloat(numDouble);
			
			//Unbind del evento onchange.
			input.unbind("change");
			
			//Se agrega evento onchange a cada uno de los inputs de totales por perjudicados.
			input.bind("change",function() {
				
				//on change llama a calcularTotalesCompania.
				calcularTotalesCompania(this);
			});

		});

		//En el id de la tabla está concatenado la posición del perjudicado, comenzando desde cero, tal cual un array.
		var indice = tableCompania.attr("id").substring(13, 14);

		//Se muestra el total en el jsp
		var total = $("#idTotalPerjudicado" + indice);

		//Set al html el total por perjudicado formateado.
		total.html(formatearValoracion(suma.toFixed(2)));
		
		//Totales indemnizacion
		totalIndemnizacion();
	});

}//fin calcularTotalPerjudicadyos
/** *******************************************************************************************************
 * 	Obtiene y devuelve el id de la tabla perjudicados en donde se están realizando los ajustes.           *
 * 	@since 05/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function getTableId(jObject)
{	
	var id = $(jObject).closest('table').attr('id');
	return id;
	
}//fin getTableId
/** *******************************************************************************************************
 * 	Setea en el jsp el total de la indemnización											              *
 * 	@since 05/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function totalIndemnizacion()
{
	//Variable que contiene la sumatoria de la indemnización.
	var indemnizacion = parseFloat(0);

	//Recorre todos los input de la tabla.
	$(".totalIndemnizacionClass").each(function()
	{
		//TD object
		var td = $(this);

		//Calculo del TOTAL de la indemnización
		var numDouble = parseFloat(desFormatearValoracion(td.html()));
		indemnizacion = parseFloat(indemnizacion) + parseFloat(numDouble);
	});
	
	//Se muestra el total de la indemnizacion en el jsp
	var total = $("#idTotalIndemnizacion");
	total.html(formatearValoracion(indemnizacion.toFixed(2)));
	
}//fin totalIndemnizacion
/** *******************************************************************************************************
 * 	Realiza el calculo del total por todos los conceptos de incapacidad temproal. 					      *
 * 	@since 18/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function calcularIncapacidadTemporalCompania() {

	//Obtiene la tabla que contiene los input a totalizar.
	$("#tablaIncapacidadTemporalCompania").each(function()
	{
		//Variable que contiene la sumatoria de los conceptos por incapacidad temporal.
		var suma = parseFloat(0);
		
		//Tabla que contiene los inputs (Conceptos) por incapacidad temporal.
		var tableCompania = $(this);

		//Recorre todos los input de la tabla.
		tableCompania.find('input').each(function()
		{
			var input = $(this);

			//Nombre del input
			var name = input.attr('name');

			//En caso de que el nombre contenga alguna de las siguientes cadenas no se adiciona a la suma.
			if(name.indexOf('numDias') > 0)
			{	return;
			}else if(name.indexOf('numDiasMuyGrave') > 0)
			{	return;
			}else if(name.indexOf('numDiasGrave') > 0)
			{	return;
			}
			else if(name.indexOf('numDiasModerado') > 0)
			{	return;
			}else if(name.indexOf('numIntervencion') > 0)
			{	return;
			}else if(name.indexOf('importeReduccion') > 0)
			{	return;
			}
			
			//Los input tienen como valor un número decimal formateado, se desformatea para realizar los calculos.
			var numDouble = isNull(input);
			suma = parseFloat(suma) + parseFloat(numDouble);

			//Unbind del evento onchange.
			input.unbind("change");
			
			//Se agrega evento onchange a cada uno de los inputs de incapacidad temporal.
			input.bind("change",function() {
				
				//on change llama a calcularIncapacidadTemporalCompania.
				calcularIncapacidadTemporalCompania();
			});

		});

		//Se muestra el total en el jsp
		var total = $("#incapacidadTemporalCompaniaTotal");

		//Set al html el total por perjudicado formateado.
		total.html(formatearValoracion(suma.toFixed(2)));
		
		//Totales por incapacidad temporal y secuelas.
		totalIncapacidadYSecuelas();
	});
}//fin calcularIncapacidadTemporalCompania
/** *******************************************************************************************************
 * 	Realiza el calculo del total por todos los conceptos de incapacidad temporal. 					      *
 * 	@since 18/05/2017																					  *
 * 	JIRA BAR-50.																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function calcularInvalidezPermanenteCompania() {

	//Obtiene la tabla que contiene los input a totalizar.
	$("#tablaSecuelas").each(function()
	{
		//Variable que contiene la sumatoria de los conceptos por incapacidad temporal.
		var suma = parseFloat(0);
		
		//Tabla que contiene los inputs (Conceptos) por incapacidad temporal.
		var tableCompania = $(this);

		//Recorre todos los input de la tabla.
		tableCompania.find('input').each(function()
		{
			var input = $(this);

			//Nombre del input
			var name = input.attr('name');

			//En caso de que el nombre contenga alguna de las siguientes cadenas no se adiciona a la suma.
			if(name.indexOf('numPuntosFuncional') > 0)
			{	return;
			}else if(name.indexOf('numPuntosEstetica') > 0)
			{	return;
			}else if(name.indexOf('semanasGestion') > 0)
			{	return;
			}else if(name.indexOf('porcentajePerjuicioExcepcional') > 0)
			{	return;
			}else if(name.indexOf('importeReduccion') > 0)
			{	return;
			}
			
			//Los input tienen como valor un número decimal formateado, se desformatea para realizar los calculos.
			var numDouble = isNull(input);
			suma = parseFloat(suma) + parseFloat(numDouble);
			
			//Unbind del evento onchange.
			input.unbind("change");
			
			//Se agrega evento onchange a cada uno de los inputs de invalidez permanente.
			input.bind("change",function() {
				
				//on change llama a calcularInvalidezPermanenteCompania.
				calcularInvalidezPermanenteCompania();
			});

		});

		//Se muestra el total en el jsp
		var total = $("#secuelasTotal");

		//Set al html el total por perjudicado formateado.
		total.html(formatearValoracion(suma.toFixed(2)));
		
		//Totales por incapacidad temporal y secuelas.
		totalIncapacidadYSecuelas();
	});
}
/** *******************************************************************************************************
 * 	Setea en el jsp el total de Incapacidad Personal y Secuelas								              *
 * 	@since 19/05/2017																					  *																						  *
 *  Edgar Laucho 																					      *
 * 	*******************************************************************************************************
 */
function totalIncapacidadYSecuelas()
{
	//Variable que contiene el total del campo incapacidad temporal.
	var incapacidadTemporal = parseFloat(desFormatearValoracion($("#incapacidadTemporalCompaniaTotal").html()));
	
	//Variable que contiene el total del campo invalidez permanente.
	var secuelas = parseFloat(desFormatearValoracion($("#secuelasTotal").html()));
	
	//Total de valoración
	var totalValoracion = parseFloat(incapacidadTemporal) + parseFloat(secuelas);

	//Se muestra el total de la indemnizacion en el jsp
	var total = $("#totalValoracion");
	
	total.html(formatearValoracion(totalValoracion.toFixed(2)));
	
}//fin totalIncapacidadSecuelas
function formatearValoracion(importe){ 
	
    importe = importe.toString().replace('.',',');
    importe = formateoDecimales(importe.toString(),',',2,'.',11);
    importe = mascaraDecimal(importe.toString(),',','2');
    return importe; 
}
function desFormatearValoracion(importe){

	  importe = replaceAll(importe, ".", "");
	  importe = importe.replace(',','.');
	  
	  return importe; 
}

/**
 * Function que valida si el importe del input es NULL.
 * De ser NULL retorna 0 y setea al campo el valor de 00,00
 * De lo contrario devuelve el numero con el formato para realizar el calculo.
 * @param input
 * @returns {Number}
 * Edgar Laucho
 * @sicne 23/05/2017
 */
function isNull(input)
{
	//Los input tienen como valor un número decimal formateado, se desformatea para realizar los calculos.
	var numDouble = 0;
	
	//En el caso que el importe sea vacio no se totaliza
		if(input.val() != "")
		{
			numDouble = parseFloat(desFormatearValoracion(input.val()));
		}
		
	return numDouble;
}//fin isNUll