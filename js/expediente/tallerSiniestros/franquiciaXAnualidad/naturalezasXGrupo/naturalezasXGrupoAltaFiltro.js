/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA DE ALTA DE LA RELACIÓN NATURALEZA-GRUPO
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
	if(document.getElementById('idGrupoNaturaleza').value == "" ){
		return false;	
	}
	return true;
}

