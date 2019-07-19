/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA RESPUESTAS POR BAREMO MNTO
 */

/*
 * Carga el combo de Modulos de Reserva
 * @param idZona
 * @param idGremio
 * @param idCalidad
 */
 function cargarComboModulosReserva(selectedValue){
		 
  	var findParameters = ['idZona', 'idGremio', 'idCalidad', 'idFamiliaProd', 'idProducto'];
 	var sendParameters = ['idZona', 'idGremio', 'idCalidad', 'idFamiliaProd', 'idProducto'];

 	retrieveURLParameters(sActionCombos,'respuestasXBaremoAltaForm',findParameters,sendParameters);
 	
 }
 
  
 /*
  * Marca la fila que se quiere mantener
  * @param row
  * @param form
  * @param idModulo
  * @param codModulo
  */
 function marcarFilaSeleccionada(row, form, idModulo, codModulo)
 {
	 var cells=row.cells;
	 for (i=0; i < cells.length; i++){
         td = cells(i);
         if (td.id !=''){
        	valor = trim(td.innerText);
            var field = form.elements(td.id);
            field.value = new String(valor);
         }
         if(td.className!="oculta"){
           td.className="selectedRow";
         }
	 }
	 //Ahora necesitamos cargar el combo, lo ideal sería llamar a 'cargarComboModulosReserva', pero al realizar la carga mediante ajax, 
	 //el tiempo de respuesta es impredecible, por lo que a veces no llegamos a tener la lista en el momento de intentar setear el 
	 //id del módulo de reserva
	 var combo = '<select id="idModuloReserva" class="input25"><option/><option value="'+idModulo+'">'+codModulo+'</option></select><IMG alt="'+desImag+'" src="/etica/img/flecha.gif">';
	 document.getElementById("id_Lista_ModReservas").innerHTML = combo;
	 document.getElementById("idModuloReserva").value = idModulo;
	 
	 //comprobamos si viene informado familia o producto, y en base a eso, se activa la familia o el producto
	 checkFamPro();
	 
	 inhabilitaSelectsNoLinks();
	 document.getElementById('BotonLimpiar').disabled = false;
	 resetSelected(row);
 }
 /*
  * Comprueba todos los datos antes de validar la modificación/alta
  */
 function comprobarDatos(){
	 	if (document.all.Array == null){
	 		alert(msgErrorParametros);
	 	}else{
	 		submitFormActionMsg(document.forms[0],document.forms[0].action,null,'iAreaTrabajo',msgAlta);
	 	}
	   	
 }
 
 /*
  * funcion para habilitar/deshabilitar los botones
  * @param estado del botón
  * @param estadoResgistro (Anulado/En vigor)
  */
function botonAnadirDesactivar(estado, estadoRegistro){
	document.getElementById('BotonAnnadir').disabled = estado;
	//si viene informado 'situacionRegistro', se está seleccionando un registro, tendremos que ver su estado para habilitar/deshabilitar
	//los botones de ANULAR y REHABILITAR
	if (estado == true){
		if (estadoRegistro != null && estadoRegistro == '1'){
			document.getElementById('BotonAnular').disabled = !estado;
			document.getElementById('BotonRehabilitar').disabled = estado;
		}else if (estadoRegistro != null && estadoRegistro == '0'){
			document.getElementById('BotonAnular').disabled = estado;
			document.getElementById('BotonRehabilitar').disabled = !estado;
		}
	}else{
		document.getElementById('BotonAnular').disabled = !estado;
		document.getElementById('BotonRehabilitar').disabled = !estado;
	}
	document.getElementById('BotonEliminar').disabled = !estado;
} 

/*
 * Limpia los datos del formulario
 */
function limpiarForm(){
	limpiar(document.forms[0],null);
	botonAnadirDesactivar(false);
	document.getElementById('idZona').disabled = false;
	document.getElementById('idGremio').disabled = false;
	document.getElementById('idCalidad').disabled = false;
	document.getElementById('idModuloReserva').disabled = false;
	document.getElementById('idFamiliaProd').disabled = false;
	document.getElementById('codigoProducto').disabled = false;
	document.getElementById('rbProducto').disabled = false
	document.getElementById('rbFamilia').disabled = false
	document.getElementById('imgBuscar').disabled = false
	cargarComboModulosReserva();
}

/*
 * Comprueba que todos los combos esten informados
 * @returns {Boolean}
 */
function validarForm(){
	if(document.getElementById('idZona').value == "" ||
		document.getElementById('idGremio').value == "" ||
		document.getElementById('idCalidad').value == "" ||
		document.getElementById('idModuloReserva').value == "" ||
		(document.getElementById('idFamiliaProd').value == "" && document.getElementById('idProducto').value == "")){
		
			return false;	
	}
		
	return true;
}

/*
 * Añade a una respuesta, un nuevo modulo de reserva
 * @returns
 */
function anadirRespXReserva(){
	if(validarForm()==true){
		document.forms(0).action = actionAnadirRespXReserva;
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

/*
 * Cambia el estado a anulado
 * @returns
 */
function anularRespXReserva(){
	if(validarForm()==true){
		document.forms(0).action = actionAnularRespXReserva;
		habilitaSelects();
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

/*
 * Cambia el estado a rehabilitado
 * @returns
 */
function rehabilitarRespXReserva(){
	if(validarForm()==true){
		document.forms(0).action = actionRehabilitarRespXReserva;
		habilitaSelects();
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

/*
 * Cambia el estado a rehabilitado
 * @returns
 */
function eliminarRespXReserva(){
	if(validarForm()==true){
		document.forms(0).action = actionEliminarRespXReserva;
		habilitaSelects();
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

function checkFamPro()
{
	if (document.forms[0].idProducto.value != ""){
		//se activa el radio button de producto
		document.forms(0).rbProducto.checked = "true";
		chequearFiltro2(2,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','idProducto','cIdFamiliaProd','cCodProdComponente');
	}else{
		//se activa el radio button de familia
		document.forms(0).rbFamilia.checked = "true";
		chequearFiltro2(1,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','idProducto','cIdFamiliaProd','cCodProdComponente');
		
	}
}

	