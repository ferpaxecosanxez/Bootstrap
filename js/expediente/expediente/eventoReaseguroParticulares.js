   /************** GESTION EVENTO REASEGURO  **********/
    
    // Cuando el documento se cargue deshablitamos ciertos campos
	document.onreadystatechange = function(){
		
		if(document.readyState=="complete"){

			if(esReasegurable){
				var swApertura = document.getElementById('swApertura').value;
				var combo = document.getElementById('sntroRgoIndusView.swEventoReaseg');
	
				if (swApertura == 1 || (swApertura == 0 && combo.selectedIndex == 0)) {
	
					// Si es apertura o es modificacion y no se ha informado evento
					document.getElementById('sntroRgoIndusView.swEventoReaseg').selectedIndex = 0;
					
					document.getElementById('checkSwExpPrincipal').checked = '';
					document.getElementById('checkSwExpPrincipal').disabled = 'disabled';
					document.getElementById('checkSwExpPrincipal').value = '0';
					
					document.getElementById('sntroRgoIndusView.codigoEventoRea').readOnly = 'readonly';
					document.getElementById('sntroRgoIndusView.descEventoRea').readOnly = 'readonly';
	
					document.getElementById('descEventoPrincipal').readOnly = 'readonly';
					
				} else if (swApertura == 0 && combo.selectedIndex == 1) {
					//alert("Modificacion. No bloquear campos");
					// Si es modificacion y se ha informado evento
					// Bloquea para no poder modificar el evento si ya ha sido informado con anterioridad
//					document.getElementById('sntroRgoIndusView.swEventoReaseg').disabled = true;
//					document.getElementById('imgDisabled').disabled = true;
//					document.getElementById('descripcionEvento').disabled = true;
//					document.getElementById('sntroRgoIndusView.swExpedientePrincipal').disabled = true;
//					document.getElementById('sntroRgoIndusView.codigoEventoRea').disabled = true;
				}
			}
		}
	}
    
    
    // Devuelve la lista de parametros de la consulta de Eventos de Reaseguro
    function parametersEventoReaseguro() {
    	return '&codigo=' + getValue('sntroRgoIndusView.codigoEventoRea') +
          	'&descripcion=' + getValue('sntroRgoIndusView.descEventoRea');
    }
    
    
    
	// Controla la eleccion del combo Evento	
    function controlEvento(combo) {	
    	
    	if(esReasegurable){
		   
    		if (isEmptyField(combo) || document.getElementById('sntroRgoIndusView.swEventoReaseg').selectedIndex == 0) {
		    	
		    	//Evento NO. Deshabilitamos
		    	
		    	var swExpPpal = document.getElementById('checkSwExpPrincipal').checked; 
		    	var swApertura = document.getElementById('swApertura').value;
		    	//alert(swExpPpal + " - " + swApertura);
		    	
		    	// Si es principal y modificacion es posible que ya tenga expedientes asociados y hay que advertir de ello
		    	if (swExpPpal && swApertura == 0){
		    		if (!confirm(msgEliminarExpPpalEvento)){
		    			document.getElementById('sntroRgoIndusView.swEventoReaseg').selectedIndex = 1;
		    			throw "exit";
		    		}
		    			
		    	}
		    	
		    	// Limpiamos todos los campos
		    	document.getElementById('checkSwExpPrincipal').checked = '';
		    	document.getElementById('sntroRgoIndusView.idEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.codigoEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.descEventoRea').value = '';
		    	document.getElementById('descEventoPrincipal').value = '';
				
		    	document.getElementById('descEventoPrincipal').readOnly = 'readonly';	    	
	        	document.getElementById('checkSwExpPrincipal').disabled = 'disabled';
		    	document.getElementById('imgDisabled').disabled = true;

		    } else {
		    	// Evento SI. 
		    	// Habilitamos Check Exp-Ppal y la Lupa
		   		document.getElementById('checkSwExpPrincipal').disabled = '';
		    	document.getElementById('imgDisabled').disabled = '';
		    }
    	}
    }
   
    // Control de evento principal o asociado a uno existente
    // Si se marca el check:
    // - Vaciamos los campos de la lupa y la deshabilitamos
    // - Obligatorio informar la descripcion 
    // Si se desmarca el check
    // - Habilitamos la lupa
    // - Vaciamos descripcion
    var obliDescEvento = 'N';
    function controlEventoPrincipal(check) {
    
    	if(esReasegurable){
	    	// Check marcado, se deshabilita la lupa ya que se generara 
	    	// el codigo de evento al guardar el siniestro
		    if (!isEmptyField(check)) {
		    	
		    	//alert("PRINCIPAL");
				
		    	obliDescEvento = 'S';
		    	
		    	document.getElementById('imgDisabled').disabled = true;
		    	document.getElementById('descEventoPrincipal').readOnly = '';
		    	document.getElementById('descEventoPrincipal').value = '';
		    	
		    	// Vaciamos la Lupa y la deshabilitamos
				document.getElementById('sntroRgoIndusView.idEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.codigoEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.descEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.codigoEventoRea').readOnly = 'readonly';
		    	document.getElementById('sntroRgoIndusView.descEventoRea').readOnly = 'readonly';
		    	
		    	
		    } else {
		    	
		    	//alert("NO PRINCIPAL");
		    	
		    	var swApertura = document.getElementById('swApertura').value;
				
		    	// Si es modificacion es posible que ya tenga expedientes asociados y hay que advertir de ello
		    	if (swApertura == 0){
		    		if (!confirm(msgEliminarExpPpalEvento)){
		    			check.checked = 'checked';
		    			throw "exit";
		    		}
		    			
		    	}
		    	
		    	obliDescEvento = 'N';
				
				document.getElementById('sntroRgoIndusView.idEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.codigoEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.descEventoRea').value = '';
		    	document.getElementById('sntroRgoIndusView.codigoEventoRea').readOnly = '';
		    	document.getElementById('sntroRgoIndusView.descEventoRea').readOnly = '';
		    	document.getElementById('imgDisabled').disabled = false;
		    	
		    	
		    	document.getElementById('descEventoPrincipal').value = '';
		    	document.getElementById('descEventoPrincipal').readOnly = 'readonly';
		    }
    	}
    }
    
    // Validaciones antes de enviar el formulario
    function validacionEvento() {
        if(esReasegurable){
        	var combo = document.getElementById('sntroRgoIndusView.swEventoReaseg');
            
	        // Evento SI
	        if (combo.selectedIndex == 1) {	

			    if (obliDescEvento == 'S') {
			    	
			    	// Check marcado. Descripcion obligatoria
			   		var desc = document.getElementById('descEventoPrincipal');
			   		if (isEmptyField(desc)) {
			   			alert(msgDescripcionEventoObl);
			   			throw "exit";
			    	}
			   		document.getElementById('sntroRgoIndusView.swExpedientePrincipal').value = 'S';
				
			    } else {
			    	
			    	
			    	//Check sin marcar. Elegir evento obligatorio
			    	var idEvento = document.getElementById('sntroRgoIndusView.idEventoRea');
			    	if (isEmptyField(idEvento)) {
			    		alert(msgSeleccionaEvento);
				       	throw "exit";
			    	}
			    	document.getElementById('idEventoReaseguroExistente').value  = idEvento.value;
			    	document.getElementById('sntroRgoIndusView.swExpedientePrincipal').value = 'N';
			    	
			    }
	        }
	        
	        //alert("Principal " + document.getElementById('sntroRgoIndusView.swExpedientePrincipal').value);
	        
	        
        }
    }
    
    /************** FIN GESTION EVENTO REASEGURO  **********/
