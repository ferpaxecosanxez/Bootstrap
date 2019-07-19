/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA DE MANTENIMIENTO DE CAUSAS X FRANQUICIA 
 */

 
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
	jQuery('#BotonAnnadir').disabled = estado;
	//si viene informado 'situacionRegistro', se está seleccionando un registro, tendremos que ver su estado para habilitar/deshabilitar
	//los botones de ANULAR y REHABILITAR
	if (estado == true){
		if (estadoRegistro != null && estadoRegistro == '1'){
			jQuery('#BotonAnular').disabled = !estado;
			jQuery('#BotonRehabilitar').disabled = estado;
		}else if (estadoRegistro != null && estadoRegistro == '0'){
			jQuery('#BotonAnular').disabled = estado;
			jQuery('#BotonRehabilitar').disabled = !estado;
		}
	}else{
		jQuery('#BotonAnular').disabled = !estado;
		jQuery('#BotonRehabilitar').disabled = !estado;
	}
	//jQuery('#BotonEliminar').disabled = !estado;
} 

/*
 * Limpia los datos del formulario
 */
function limpiarForm(){
	limpiar(document.forms[0],null);
	botonAnadirDesactivar(false);
	jQuery('#idCausa').disabled = false;
	propertyCheck(jQuery('#swSoloAsegurado_'), false, '1', '0');
	propertyCheck(jQuery('#swPeritacion_'), false, '1', '0');
	jQuery('#fechaAplicacion').disabled = false;
	jQuery('#imgFecSntro').disabled = false;
}

/*
 * Comprueba que todos los combos esten informados
 * @returns {Boolean}
 */
function validarForm(){
	if(jQuery('#idCausa').val() == "" ||
		jQuery('#swSoloAsegurado').val() == "" ||
		jQuery('#swPeritacion').val() == "" ||
		jQuery('#fechaAplicacion').val() == "" ||
		(familia == "" && producto == "")){
			return false;	
	}
		
	return true;
}

/*
 * Añade una nueva causa para la franquicia por anualidad
 */
function anadirCausa(){
	if(validarForm()==true){
		document.forms(0).action = actionAnadirCausa;
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

/*
 * Cambia el estado a anulado
 */
function anularCausa(){
	if(validarForm()==true){
		habilitaSelects();
		document.forms(0).action = actionAnularCausa;
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}

/*
 * Cambia el estado a rehabilitado
 */
function rehabilitarCausa(){
	if(validarForm()==true){
		habilitaSelects();
		document.forms(0).action = actionRehabilitarCausa;
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}


/*Carga la fila que se haya seleccionado del listado*/
function cargarDadasFilaSeleccionda(row,form,trueValue,falseValue,linkedCombo){
	loadDataRow(row,form,trueValue,falseValue,linkedCombo)
    inhabilitaSelectsNoLinks();
	jQuery('#BotonLimpiar').prop("disabled", false);
    resetSelected(row);
 }
