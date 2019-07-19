
var cargaOnload = false;

window.onload = function(){
	cargaComboAgrupaciones(true);
}

function formRecargoSeguridad_limpiar(){
	setValue('ejercicio','');
	setValue('idFamilia','');
	setValue('idAgrupacionContb','');
	showHideVis('cFamilia',true);
	showHideVis('cAgrupacion',false);
}

// Llamada Ajax para cargar el combo de Agrupaciones contables segun la Familia de Productos seleccionada.
function cargaComboAgrupaciones(cOnload){

	cargaOnload = cOnload;
	
	var idFamilia = document.getElementById("idFamilia").value;

	if (idFamilia != null && parseInt(idFamilia) >= 0){
		var url = accCargaAgContablesAjax; // Definido en la JSP
		url +="?idFamiliaProd=" + idFamilia;
		
		ajaxCall(url, "GET", true, callBackComboAgrupaciones);
	}
}

function callBackComboAgrupaciones(html) {
	
	var cbAgrupaciones = document.getElementById("idAgrupacionContb");

	// Se podria implemententa un JSP y cargando el HTML en un DIV o TD pero tenemos el problema de que 
	// utilizamos diferentes formularios de struts dependiendo de la pagina y tendriamos que tener una JSP
	// por cada formulario utilizado indistintamente.
	// Con esta solucion solo deben compartir el id del elemento html.
	//document.getElementById("cAgrupacion").innerHTML = html;

	// Eliminamos todo el contenido del combo
	cbAgrupaciones.innerHTML = '';
	
	// Generamos los options con los valores obtenidos de la consulta	
	var registros = html.split("&&-");
	for (var i = 0; i < registros.length; i++){
		
		var op = trim(registros[i]);
				
		if (op != null && op.length > 10){
			var campos = op.split("&&+");// Parejas de Propiedad=Valor
			var c1 = campos[0];
			var c2 = campos[1];
			//alert("C1 " + c1 + " C2 " + c2);			
			var valId = c1.split("="); // ID
			var id = valId[1];
			var valDesc = c2.split("="); // DESCRIPCION
			var desc = valDesc.length == 2 ? valDesc[1] : '';
			
			var option = document.createElement('option');
		    option.value = id; 
		    option.innerText = desc;
		    
		    if (id != ''){
		    	//alert("aniade " + id);
		    	cbAgrupaciones.appendChild(option);
		    }
		}
	}
	
	if (cargaOnload){
		// Si la carga de la pagina es al entrar en el mantenimiento de Recargos,
		// proviene de un error en la logica del servidor o simplemente es la carga 
		// de resultados de una pantalla de consulta seleccionaremos el mismo valor
		// que anteriormente tenia el combo de agrupaciones
		var selected = document.getElementById("agrupSelected").value;
		//alert(selected);
		
		if (selected != null && selected != '' && parseInt(selected) >= 0){
			cbAgrupaciones.value = selected;
		}
	
	}



}
