/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA DE ALTA DE LA RELACIÓN NATURALEZA-GRUPO
 */

 
 /*
  * Comprueba todos los datos antes de validar el alta
  */
 function comprobarDatos(){
	if (document.all.Array == null){
	 		alert(msgDatosFormOblig);
 	}else{
 		submitFormActionMsg(document.forms[0],document.forms[0].action,null,'iAreaTrabajo',msgAlta);
 	}
 }
 

/*
 * Comprueba que todos los combos esten informados
 * @returns {Boolean}
 */
function validarForm(){
	if(document.getElementById('idNaturaleza').value == "" ){
		return false;	
	}
	return true;
}

/*
 * Añade una nueva relación grupo - naturaleza
 */
function anadir(){
	if(validarForm()==true){
		document.forms(0).action = actionAnadir;
		submitForm(document.forms[0],null,'_self');
	}else{
		alert(msgDatosFormOblig);
	}
}