/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA RESERVAS AUTOMÁTICAS
 */

	/* Codigo JScript que se ejecuta al terminar de cargarse la pagina 	*/
	/* y que activa los radio buttons. 						*/
    window.onload = function()	{
		if (document.getElementById('criterioSeleccion').value == "Producto"){
			//se activa el radio button de producto
			document.forms(0).rbProducto.checked = "true";
			chequearFiltro2(2,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','idProducto','cIdFamiliaProd','cCodProdComponente');
		}else{
			//se activa el radio button de familia
			document.forms(0).rbFamilia.checked = "true";
			chequearFiltro2(1,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','idProducto','cIdFamiliaProd','cCodProdComponente');
			
		}	
    }
	
	function buscarSubmit(form) {
		//if (validateProdTecConsultaForm(form) == true)
		document.getElementById('pagina').value = 1;
		submitForm(form,null,'iAreaTrabajo');
	}
	
	
	/* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
	function buscarProductoResAuto(pagInicial,pagBusqueda,codProducto,idProducto){
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
	} 
	
	
	
	/* Funcion para chequear el radio button correspondiente*/
	function chequearFiltro2(valor,rbFamilia,rbProducto,idFamilia,codProducto,idProducto,cFamilia,cProducto){
		switch(valor){
					
			case 1:
				// se activa la familia de productos
				document.getElementById(rbFamilia).checked = true;		
				document.getElementById(rbProducto).checked = false;
				
				document.getElementById(codProducto).value = "";
				document.getElementById(idProducto).value = "";
				
				document.getElementById('criterioSeleccion').value = "";
				
				showHideVis(cFamilia, true);	
				showHideVis(cProducto, false);
			break;
					
			case 2:	
				// se activa el producto
				document.getElementById(rbProducto).checked = true;
				document.getElementById(rbFamilia).checked = false;

				document.getElementById(idFamilia).value = "";
				document.forms[0].elements[idFamilia].selectedIndex = 0;
				
				document.getElementById('criterioSeleccion').value = "Producto";	
				
				showHideVis(cProducto, true);	
				showHideVis(cFamilia, false);
			break;
		}
	}
	
	/*
	 * Carga el combo de Modulos de Reserva
	 * @param idZona
	 * @param idGremio
	 * @param idCalidad
	 */
	 function cargarComboModulosReserva(selectedValue){
			 
	  	var findParameters = ['idFamiliaProd', 'idProducto'];
	 	var sendParameters = ['idFamiliaProd', 'idProducto'];

	 	retrieveURLParameters(sActionCombos,'moduloReservaConsultaForm',findParameters,sendParameters);
	 	
	 }