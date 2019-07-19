/** FUNCIONES PARA LA GESTION DEL TALLER DE MATRICES **/

/*
 * Recoge el valor del tipo de dato, y lanza petición para mostrar las matrices según el mismo.
 */
function inicializaEstructura(){
		showHide('divLoad',true);
		var valorTipoDato=document.forms[0].elements('matrizEfectoView.matrizView.tipoDato.id').options[document.forms[0].elements('matrizEfectoView.matrizView.tipoDato.id').selectedIndex].value;
	    inicializarValores(valorTipoDato);		  
	    showHide('divLoad',false);
}

/*
 * Muestra la matríz/ces correspondientes mostrando el valor según el tipo de dato indicado
 * @param valorTipoDato
 */
function inicializarValores(valorTipoDato){
	if (document.getElementById('matrices').innerHTML!=""){
		
		var numvalorestexto=document.getElementById('numdeTasText').value;
		var alfanumerico = "valorAlfaNumTexto0";
		var fecha        = "valorFechaTexto0";
		var importe      = "valorImporteTexto0";
		var numerico     = "valorNumericoTexto0";
		var porcentaje   = "valorPorcentajeTexto0";
		
		for (var i=0;i<=numvalorestexto-1;i++) {
			alfanumerico = "valorAlfaNumTexto" +i;
			fecha        = "valorFechaTexto"+i;
			importe      = "valorImporteTexto"+i;
			numerico     = "valorNumericoTexto"+i;
			porcentaje   = "valorPorcentajeTexto"+i;
			
			switch(valorTipoDato){		
			case "1": 
				showHide(alfanumerico,true);
				showHide(fecha,false);
				showHide(importe,false);
				showHide(numerico,false);
				showHide(porcentaje,false);
				break;
			case "2": 
				showHide(alfanumerico,false);
				showHide(fecha,false);
				showHide(importe,false);
				showHide(numerico,true);
				showHide(porcentaje,false);
				break;
			case "3": 
				showHide(alfanumerico,false);
				showHide(fecha,false);
				showHide(importe,true);
				showHide(numerico,false);
				showHide(porcentaje,false);
				break;
			case "4": 
				showHide(alfanumerico,false);
				showHide(fecha,false);
				showHide(importe,false);
				showHide(numerico,false);
				showHide(porcentaje,true);
				break;
			case "5": 
				showHide(alfanumerico,false);
				showHide(fecha,true);
				showHide(importe,false);
				showHide(numerico,false);
				showHide(porcentaje,false);				
				break;	
			default:}
		}
			
		var numvalores=document.getElementById('numdeTas').value;
		alfanumerico = "valorAlfaNum0";
		fecha        = "valorFecha0";
		importe      = "valorImporte0";
		numerico     = "valorNumerico0";
		porcentaje   = "valorPorcentaje0";
		
		
		for (var i=0;i<=numvalores-1;i++) { 
			// lo primero es generar los tres posibles valores tasa, prima minima, prima base.	
			alfanumerico = "valorAlfaNum"+i;
			fecha        = "valorFecha"+i;
			importe      = "valorImporte"+i;
			numerico     = "valorNumerico"+i;
			porcentaje   = "valorPorcentaje"+i;
			
			var valorAlfanumerico = "lstMatrizValorView[" + i + "].alfanumerico";
			var valorFecha = "lstMatrizValorView[" + i + "].fecha";
			var valorNumerico = "lstMatrizValorView[" + i + "].numerico"; 
	        var valorImporte ="lstMatrizValorView[" + i + "].importe"; 
	        var valorPorcentaje ="lstMatrizValorView[" + i + "].porcentaje";
			
			switch(valorTipoDato){		
			case "1": 
				showHide(alfanumerico,true);
				showHide(fecha,false);
				setValue(valorFecha, "");
				showHide(importe,false);
				setValue(valorImporte, "");
				showHide(numerico,false);
				setValue(valorNumerico, "");
				showHide(porcentaje,false);
				setValue(valorPorcentaje, "");
				break;
			case "2": 
				showHide(alfanumerico,false);
				setValue(valorAlfanumerico, "");
				showHide(fecha,false);
				setValue(valorFecha, "");
				showHide(importe,false);
				setValue(valorImporte, "");
				showHide(numerico,true);
				showHide(porcentaje,false);
				setValue(valorPorcentaje, "");
				break;
			case "3": 
				showHide(alfanumerico,false);
				setValue(valorAlfanumerico, "");
				showHide(fecha,false);
				setValue(valorFecha, "");
				showHide(importe,true);
				showHide(numerico,false);
				setValue(valorNumerico, "");
				showHide(porcentaje,false);
				setValue(valorPorcentaje, "");
				break;
			case "4": 
				showHide(alfanumerico,false);
				setValue(valorAlfanumerico, "");
				showHide(fecha,false);
				setValue(valorFecha, "");
				showHide(importe,false);
				setValue(valorImporte, "");
				showHide(numerico,false);
				setValue(valorNumerico, "");
				showHide(porcentaje,true);
				break;
			case "5": 
				showHide(alfanumerico,false);
				setValue(valorAlfanumerico, "");
				showHide(fecha,true);
				showHide(importe,false);
				setValue(valorImporte, "");
				showHide(numerico,false);
				setValue(valorNumerico, "");
				showHide(porcentaje,false);
				setValue(valorPorcentaje, "");
				break;	
			default:
		    }			
		}
	}
}


/*
 * Realiza la busqueda del Riesgo
 */
 function busquedaRiesgo(pag)
 {
    if(document.getElementById("matrizEfectoView.riesgo.codigo").value!="")
        pag=pag+"?codigo="+document.getElementById("matrizEfectoView.riesgo.codigo").value;
    
    var valor = lanzarVentana(pag,600,400);
    if(valor != undefined) {
    setValue("matrizEfectoView.riesgo.id",valor[0])            
    setValue("matrizEfectoView.riesgo.descripcion",valor[2])
    setValue("matrizEfectoView.riesgo.codigo", valor[1])
    //alert(valor[0] + "··" + valor[1] + "··" + valor[2]);
    }
 }

/* 
 * Función para ocultar todos los campos dinámicos de la página, cuando cámbia tipoDato 
 */
 function ocultarCamposTotal(){
    showHide('spLongitudDecimal',false);
    showHide('spLiteralLongitud',false);
    showHide('spCajaLongitud',false);
    showHide('spLiteralDecimal',false);
    showHide('spCajaDecimal',false);
 }
 
/**
 * Muestra los campos relacionados con el tipo de dato especificado
 */
 function mostrarTipoDato(tipoDato){

  ocultarCamposTotal();
  // La longitud por defecto sera nula, a no ser que sea una Fecha
  setValue("matrizEfectoView.matrizView.longitud", '');
  setValue("matrizEfectoView.matrizView.decimales", '');
  document.forms[0].elements['matrizEfectoView.matrizView.longitud'].readOnly = false;
  document.forms[0].elements['matrizEfectoView.matrizView.decimales'].readOnly = false;
  switch (tipoDato)  {
   case '1': // Tipo de Dato "ALFANUMERICO"
      setValue("matrizEfectoView.matrizView.longitud", '20');
      break;
   case '2': // Tipo de Dato "NUMERICO"
	  setValue("matrizEfectoView.matrizView.longitud", '13');
	  setValue("matrizEfectoView.matrizView.decimales", '2');
	  document.forms[0].elements['matrizEfectoView.matrizView.longitud'].value = '17';
	  document.forms[0].elements['matrizEfectoView.matrizView.decimales'].value = '6';
      showHide('spLongitudDecimal',true);
      showHide('spLiteralLongitud',true);
      showHide('spCajaLongitud',true);
      showHide('spLiteralDecimal',true);
      showHide('spCajaDecimal',true);
      break;
   case '3': // Tipo de Dato "IMPORTE"
      setValue("matrizEfectoView.matrizView.longitud", '13');
      setValue("matrizEfectoView.matrizView.decimales", '2');
      document.forms[0].elements['matrizEfectoView.matrizView.longitud'].value = '13';
      document.forms[0].elements['matrizEfectoView.matrizView.decimales'].value = '2';
      document.forms[0].elements['matrizEfectoView.matrizView.longitud'].readOnly = true;
      document.forms[0].elements['matrizEfectoView.matrizView.decimales'].readOnly = true;
      showHide('spLongitudDecimal',true);
      showHide('spLiteralLongitud',true);       
      showHide('spCajaLongitud',true);
      showHide('spLiteralDecimal',true);
      showHide('spCajaDecimal',true);     
      break;
   case '4': // Tipo de Dato "PORCENTAJE"
      showHide('spLongitudDecimal',true);
      showHide('spLiteralLongitud',true);
      document.getElementById('matrizEfectoView.matrizView.longitud').value="6";
      document.getElementById('matrizEfectoView.matrizView.decimales').value="3";
      document.getElementById('matrizEfectoView.matrizView.longitud').readOnly=true;
      document.getElementById('matrizEfectoView.matrizView.decimales').readOnly=true;   
      showHide('spLongitudDecimal',true);
      showHide('spLiteralLongitud',true);       
      showHide('spCajaLongitud',true);
      showHide('spLiteralDecimal',true);
      showHide('spCajaDecimal',true);   
      break;
   case '5': // Tipo de Dato "FECHA"
      // Establecer una longitud por defecto para que el validador no de error (dd/mm/yyyy)
      setValue("matrizEfectoView.matrizView.longitud", '10');
      break;
   }
   inicializaEstructura();
 }
 
 /*
  * Lanza la petición de parametrización de factores y tramos.
  * @param pag
  * @param form
  * @param idRiesgo
  */
 function pintaLo(pag,form,idRiesgo) {
    if(document.getElementById("matrizEfectoView.riesgo.id").value != ""){
      var valor = lanzarVentana(factor + '?idRiesgo=' + document.getElementById("matrizEfectoView.riesgo.id").value + '&origen=0', 700, 510);
      if(valor != undefined) {
    	  showHide('divLoad',true);
          retrieveURLPorPost(pag,form,false);
          plegaAmbos();
          showHide('divLoad',false);
          inicializaEstructura();
      }
    }else{
      alert(msgErrorRiesgo);
    }
  }
  
  var estadoMtz = 1;
  function callInicioMtz(){
    if(estadoMtz==1){ URLY=URLX + '?inicio=true';retrieveURLPorPost(URLY,'garantiatarifaForm',false);estadoMtz=2}
  }
  
  //plegar Menu y Agenda
  function plegaAmbos(){
    if(document.getElementById('matrices').innerHTML != ""){
      top.plegar('cMenuArea');
      top.plegar('cAgenda');
    } 
  }
  
  /*
   * Si previamente se ha definido la matriz, se recarga su información por si se hubiese
   * cambios en la precisión del tipo de dato
   * @param pag
   * @param form
   */
   function cargarPrecisionTipoDatoNum(pag,form){
	   //Comprueba que si el tipo de dato es NUMERICO, esté los datos 'decimales' y 'longitud'
	   //informados, si no lo están se informan con los valores por defecto 6 y 17 respectivamente
	   if (document.getElementById("matrizEfectoView.matrizView.tipoDato.id").value == 2){
		   if (document.getElementById("matrizEfectoView.matrizView.longitud").value == "" && 
			   document.getElementById("matrizEfectoView.matrizView.decimales").value == ""){
			      document.getElementById("matrizEfectoView.matrizView.longitud").value = '17';
			      document.getElementById("matrizEfectoView.matrizView.decimales").value = '6';
		   }else if(document.getElementById("matrizEfectoView.matrizView.longitud").value == "" && 
				    document.getElementById("matrizEfectoView.matrizView.decimales").value != ""){
			   document.getElementById("matrizEfectoView.matrizView.longitud").value = '17';
		   }else if(document.getElementById("matrizEfectoView.matrizView.longitud").value != "" && 
				    document.getElementById("matrizEfectoView.matrizView.decimales").value == ""){
			   document.getElementById("matrizEfectoView.matrizView.decimales").value = '6';
		   }
		   		
	   }
	   //Se recarga la información
   	   if(document.getElementById('matrices').innerHTML != ""){
   		retrieveURLPorPost(pag,form,false);
   		inicializaEstructura();
	   }
   }
   
   /*
    * Envio del formulario para el alta de la matriz
    */
   function envioFormulario(){
	   if (validarForm()== true && document.getElementById('matrices').innerHTML != "")
	   {
		   submitFormMsg(document.forms[0],null,'iAreaTrabajo',msgAlta);
	   }else{
		   if (document.getElementById('matrices').innerHTML == ""){
			   alert(msgDatosFormMatriz)
		   }else{
			   alert(msgDatosFormOblig);
		   }
		   
	   }
   }
   
   /*
    * Comprueba que todos los campos obligatorios esten informados
    * @returns {Boolean}
    */
   function validarForm(){
   	if(document.getElementById('matrizEfectoView.matrizView.descripcion').value == "" ||
   		document.getElementById('matrizEfectoView.riesgo.codigo').value == "" ||
   		document.getElementById('matrizEfectoView.matrizView.tipoDato.id').value == ""){
   		return false;	
   	}
   	return true;
   }
