(function () {
	
	jQuery(document).ready(function() {
		
		jQuery('.polSelector').change(function() {
			
			//Abre loader
	  		muestraCarga();
	  		
	  		
	  		//Preparamos los checks de las filas de la misma póliza
	  		var currentId = jQuery(this).val();
	  		var isChecked = jQuery(this).is(":checked");
	  		jQuery(".polSelector[value=" + currentId + "]").removeAttr('checked');
	  		if (isChecked) {
	  			jQuery(".polSelector[value=" + currentId + "]").attr("checked", "checked");
			}
	  		
	  		//Enviamos las poólizas seleccionadas para calcular la rentabilidad
			var rentaIndivSeleccion = "";
			var idsProcesados = new Array();

			//Gestionamos el resto de pólizas
			jQuery(".polSelector:checked").each(function() {
			
				var idPoliza = jQuery(this).val();
				if (jQuery.inArray(idPoliza, idsProcesados ) == -1) {
					rentaIndivSeleccion += idPoliza + "|";
					idsProcesados.push(idPoliza);
				}
				
			});
			
			var serialized = jQuery("form[name=criteriosBusquedaForm]").serialize();
			
			jQuery.post("/etica/estadisticas/elemental/tomador/consulta/rentaindivmedia.do",
				serialized + "&rentaIndivSeleccion=" + rentaIndivSeleccion
			).done(function(data) {
				
				jQuery("#rentaGlobalIndiv").html(data);
				
				//Cierra loader
				ocultaCarga();
			});
	
			
		});
		
		
	});
	

}());