	
	function buscarSubmit(form) {
	
		if(validarForm() == true){
			//Pongo la pagina a 1 para que muestre la primera pagina de los resultados
			//si no se pone nada dara un error al ejecutar la busqueda
			document.getElementById('pagina').value = 1;
			form.submit();
		}
	}
	
	/*funcion para validar los datos introducidos en el formulario*/
 	function validarForm(){

 		//comparo las fechas para que la fecha inicio no sea mayor o igual que la fecha fin
 		var diferencia=compararFechas(trim(document.getElementById('fechaInicio').value), trim(document.getElementById('fechaFin').value),0);
 		
 		//alert("fechaDesde" + document.getElementById('fechaDesde').value + " fechaHasta:" + document.getElementById('fechaHasta').value + "diferencia:" + diferencia);
 		if(diferencia > 0){
 			alert("La fecha fin tiene que ser mayor que la fecha inicio");
 			return false;
 		}

 		return true;
 	}
 	
 	function aceptar(){
 		var valor = [document.getElementById('numEncargos').value];
 		window.returnValue = valor;
	    window.close();
 	}
