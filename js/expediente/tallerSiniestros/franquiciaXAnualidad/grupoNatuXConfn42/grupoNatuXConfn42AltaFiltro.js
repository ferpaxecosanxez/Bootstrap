/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA DE ALTA DE GRUPO NATURALEZA POR TRÁMITE SEGÚN
 * CONFIGURACIÓN DEL EXPEDIENTE
 */

 
 /*
  * Comprueba todos los datos antes de validar el alta
  */
 function comprobarDatos(){
 	if(validarForm()==true){
 		submitForm(document.forms[0],null,'iAreaTrabajo');
	}else{
		alert(msgDatosFormOblig);
	}
 }

 /*
 * Comprueba que todos los combos esten informados
 * @returns {Boolean}
 */
function validarForm(){
	if(document.getElementById('idTramite').value == "" ||
		document.getElementById('idObjeto').value == "" ||
		document.getElementById('idGarantia').value == "" ||
		document.getElementById('idCobertura').value == "" ||
		(document.getElementById('idProducto').value == "" &&
	      document.getElementById('idFamiliaProd').value == "")){
		return false;	
	}
	return true;
}

/*
 * Carga los combos Trámites/Objeto/Garantía/Cobertura según la configuración del expediente en el taller
 * @param idZona
 * @param idGremio
 * @param idCalidad
 */
 function cargarConfExpe(selectedName){
 
    var findParameters;
	var sendParameters;

	if (selectedName == 'idFamiliaProd'){
		findParameters = ['idFamiliaProd'];
		sendParameters = ['idFamiliaProdAux'];
		
	}else if (selectedName == 'idProducto'){
		findParameters = ['idProducto'];
		sendParameters = ['idProductoAux'];
		
	}else if (selectedName == 'idTramite') {
		findParameters = ['idFamiliaProd','idProducto','idTramite'];
		sendParameters = ['idFamiliaProdAux','idProductoAux','idTramiteAux'];
		
	}else if (selectedName == 'idObjeto'){
		findParameters = ['idFamiliaProd','idProducto','idTramite','idObjeto'];
		sendParameters = ['idFamiliaProdAux','idProductoAux','idTramiteAux','idObjetoAux'];
		
	}else if (selectedName == 'idGarantia'){
		findParameters = ['idGarantia','idFamiliaProd','idProducto','idTramite','idObjeto'];
		sendParameters = ['idGarantiaAux','idFamiliaProdAux','idProductoAux','idTramiteAux','idObjetoAux'];
	}
  	
 	retrieveURLParameters(sActionCombos,'grupoNatuXConfn42AltaForm',findParameters,sendParameters);
 	
 }
 
 /* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
	function buscarProductoGXTAlta(pagInicial,pagBusqueda,codProducto,idProducto){
	  var pag;
	  var codigoProducto = document.getElementById(codProducto).value;	
	  var identificadorProducto = document.getElementById(idProducto).value;	
	  
	  // si se ha introducido algun valor en codigo o descripcion, se deberá ejecutar directamente la consulta
	  if(codigoProducto=="")
	    pag = pagInicial;  
	  else pag = pagBusqueda;
	  
	  pag= pag+"?codigoProducto="+codigoProducto;
	   
	  var valor = lanzarVentana(pag,600,400);
	  if(valor != undefined) 
	  {
		if(codigoProducto != null)		
			setValue(codProducto, valor[0]);				  
		if(identificadorProducto != null)		
			setValue(idProducto, valor[1]);				  
	  }
	  cargarConfExpe("idProducto");
	} 
