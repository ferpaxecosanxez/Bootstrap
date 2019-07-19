/**
 * función común para las descripciones de decesos
 * para abrir correctamente la página de localidades
 * y actualizar en función del código postal
 * @param pag
 * @param objView obj view de donde sacar los datos de la dirección
 * puede ser sntroRgoIndusView, sntroRgoParticularesView, decesos
 * @returns
 */
function seleccionaLocalidadOcurrencia(pag,objView) {
	
	     var codPostal = document.forms[0][objView+'.siniestroDireccionView.codPostal'].value;
	     var localidad = document.forms[0][objView+'.siniestroDireccionView.localidad'].value;
	     var provincia = document.forms[0][objView+'.siniestroDireccionView.provincia.id'].value;
	     pag += '?codPostal=' + codPostal;
	     pag += '&descripcion=' + localidad;
	     pag += '&provincia=' + provincia;
	
	     var valor = lanzarVentana(pag,600,500);
	
	     if (valor != undefined) {
	     	setValue(objView+".siniestroDireccionView.provincia.id", valor[2]);
	        setValue(objView+".siniestroDireccionView.codPostal",valor[0]);
	        setValue(objView+".siniestroDireccionView.localidad",valor[1]);
	        setValue(objView+".siniestroDireccionView.idLocalidad",valor[3]);
	       
	     }
	  }
	
	function buscarLocalidadSeleccionada(valor){
	     if (valor.length>0) {
	        seleccionaLocalidadOcurrencia('<html:rewrite page="/localidad/lista/buscarLocalidades.do"/>');
	     }
	  }    
