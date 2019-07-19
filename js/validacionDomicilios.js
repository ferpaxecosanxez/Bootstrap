  function seleccionaLocalidad(pag,pCodPostal,pLocalidad,pProvincia) {
	 // se invoca a la funcion con el formulario  
	 seleccionaLocalidadForm(pag,pCodPostal,pLocalidad,pProvincia, document.forms[0]);
   }
   
   function seleccionaLocalidadForm(pag,pCodPostal,pLocalidad,pProvincia, form) {
	 var codPostal = "";
	 if(pCodPostal != null){
	   codPostal = form[pCodPostal].value;
	 }
	 var localidad = form[pLocalidad].value;
	 var provincia = form[pProvincia].value;
	 pag += '?codPostal=' + codPostal;
	 pag += '&descripcion=' + localidad;
	 pag += '&provincia=' + provincia;
	  var valor = lanzarVentana(pag,600,500);
	  if(valor != undefined) {
	    form.elements[pProvincia].onchange();    
		if(pCodPostal != null){
		  setValue(pCodPostal,valor[0]);     
		}      
		setValue(pLocalidad,valor[1]);
		setValue(pProvincia, valor[2]);
	  }
   }
   
   function changeProvinciaLogic(pais, provincia){
	   	// se invoca a la funcion con el formulario     	
	     changeProvinciaLogicForm(pais, provincia, document.forms[0]);
	}
	
	function changeProvinciaLogicForm(pais, provincia, form){
	   	selectPais = form.elements[pais];
		selectProvincia = form.elements[provincia];   	
	   	codigoISO = selectPais.options[selectPais.selectedIndex].id;
	   	
	   	if (selectProvincia.selectedIndex != -1) {
		   	codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].value;
		} else {
			codigoProvincia = '';
		}
	
	   	if (codigoProvincia == '99'){  
	   	  //si el pais es ESPAÑA 
	   		if (codigoISO == 'ES'){	
	   		   marcaPaisISO('',pais,form);
	   		}      		   
	     }else if(codigoProvincia != '99' && codigoProvincia !=''){ 
		     // si la provincia es ESPAÑOLA con pais EXTRANJERO
		     if(codigoISO != 'ES'){
		        //marcamos ESPAÑA como pais
		     	marcaPaisISO('ES',pais,form);
		     }
	     }else if (codigoProvincia == ''){ //si no hay elegido ningún país
		     	marcaPaisISO('ES',pais,form);
	     }   	
	}
	
	function setProvinciaValues(selectProvincia){
   		setValue('datosDomicilioC.provincia.codigo',selectProvincia.options[selectProvincia.selectedIndex].id);
   	}
   	
   	function marcaPaisISO(codigoISO, pais, form){
   	    selectPais = form.elements[pais];
   	    if (codigoISO==''){
   	    	selectPais.selectedIndex = 0;
   	    	return;
   	    }	   	    
   		for(i=0;i < selectPais.options.length;i++){
   			if (selectPais.options[i].id == codigoISO){
   			    selectPais.selectedIndex = i;
   				break;
   			}
   		}
   	}
   	
   	
   	function changePaisLogic(pais, provincia){
		// se invoca a la funcion con el formulario  
	    changePaisLogicForm(pais, provincia, document.forms[0]);
    }
    
    function changePaisLogicForm(pais, provincia, form){
		selectProvincia = form.elements[provincia];
	  	codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].value;
	  	//para marcar el valor inicial no obtenido desde la BD
	  	if (codigoProvincia == undefined) codigoProvincia ='';
	  	codigoPais = pais.options[pais.selectedIndex].id;
	    //si el pais es ESPAÑA      
	    if (codigoPais == 'ES'){
			//si esta marcada una provincia no ESPAÑOLA
			if (codigoProvincia == '99'){
	       		marcaProvincia('', provincia, form);			
			}       
	    }else if (codigoPais != 'ES' && codigoPais !=''){
	       //si el pais NO es ESPAÑA
	         if (codigoProvincia != '99' && codigoProvincia !=''){
	       		marcaProvincia('99', provincia, form);			
			 }else if(codigoProvincia ==''){
	       		marcaProvincia('99', provincia, form);	
			 }
	      }else if (codigoPais == ''){
	        //si no selecciona ningún pais
	        marcaProvincia('', provincia, form);        
	    }
    }
    
    function marcaProvincia(codigo, provincia, form){
   	    selectProvincia = form.elements[provincia];
   	    if (codigo==''){
   	    	selectProvincia.selectedIndex = 0;
   	    	return;
   	    }	
   	    
   		for(i=0;i < selectProvincia.options.length;i++){   		
   			if (selectProvincia.options[i].id == codigo){
   			    selectProvincia.selectedIndex = i;
   				break;
   			}
   		}
   	}
   	
   	
   	function seleccionarProvinciaBasico(destino, origen){
    	// se invoca a la funcion con el formulario  
    	seleccionarProvinciaBasicoForm(destino, origen, document.forms[0]);
    }
    
   	function seleccionarProvinciaBasicoForm(destino, origen, form){
   		codProvincia = parseInt(form.elements[origen].value.substring(0,2),10);
    	form.elements[destino].value=codProvincia;
    }
   	
   	function cambiarProvinciaLocalidadAjax(comboProvincia,localidad,localidadId,resp){
   		var pronviciaHidden=document.getElementById(comboProvincia.id+"_hidden");
   		var localidadHidden=document.getElementById(localidad.id+"_hidden");
   		var provinciayLocalidad = resp.responseText;
   		if (provinciayLocalidad == ''){	
   			localidad.value = '';
   			localidadId.value = '';
   			comboProvincia[0].selected = true;
   		}
   		arrayDatos = provinciayLocalidad.split("#");
   		
   		if (arrayDatos.length > 0){
   			idProvincia = arrayDatos[0];
   		
   			var cantidad = comboProvincia.length;
   			for (i = 0; i < cantidad; i++) {
   			    if (comboProvincia[i].value == idProvincia) {
   			    	comboProvincia[i].selected = true;
   			    	if(null!=pronviciaHidden && undefined!=pronviciaHidden){
   			    		pronviciaHidden.value=comboProvincia[i].value;
   			    	}	     	
   			     	break;
   			    }   
   			}
   		} 
   		
   		if (arrayDatos.length > 1){
   			localidad.value = arrayDatos[1];
   			if(null!=localidadHidden && undefined!=localidadHidden){
   				localidadHidden.value=arrayDatos[1];
   			}		
   			localidadId.value = arrayDatos[2];
   		}
   	}
   	
   	function seleccionarProvinciaAjax(url,idCodPostal,idComboProvincia,idComboPaises, localidad, idLocalidad){

   		comboPaises = document.getElementById(idComboPaises);
   		
   		//codISOPais = comboPaises.options[comboPaises.selectedIndex].id;
   		comboProvincia = document.getElementById(idComboProvincia);
   		localidadText = document.getElementById(localidad);
   		localidadId = document.getElementById(idLocalidad);

   		//if ((codISOPais == codigoPaisCompania)) {
   			codPostal = document.getElementById(idCodPostal).value;
   			
   		    url = url + "?codPostal="+codPostal;

   		    var ajax = new Ajax.Request( url, { method:"post",
   		                                  			onComplete: cambiarProvinciaLocalidadAjax.bind(this,comboProvincia,localidadText,localidadId)
   		                                    });
   		//} else {
   		     // Pais EXTRANJERO
   			//comboProvincia.value = 99;
   		//}
   	 
   	}