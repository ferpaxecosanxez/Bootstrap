/* FUNCIONES JAVASCRIPT COMUNES DE LAS OPERATIVAS DEL TALLER DE SINIESTROS */

	/* Funcion para actualizar los combos tras una recarga */
	function seleccionaValor(cbNombre,hNombre) {
        var valueCombo = document.getElementById(hNombre).value;
        var combo = document.forms[0].elements[cbNombre];
		if (valueCombo!= ""){
		  for(var i=0; i < combo.options.length; i++)	{
			if(combo.options[i].value == valueCombo){
			   combo.options[i].selected = true;	
			}
		  }
		}
	}
	
	/* Funcion que deshabilita un combo-box */
	function deshabilitarCombo (cbNombre, codigo, comboOculto){
	
	   document.getElementById(cbNombre).value = "";
	   document.getElementById(cbNombre).disabled = true;
	   document.getElementById(codigo).value = "";
	   document.forms[0].elements[cbNombre].selectedIndex = 0;
	   document.forms[0].elements[cbNombre].options[document.forms[0].elements[cbNombre].selectedIndex].text = document.getElementById(codigo).value;
	   document.getElementById(comboOculto).value ="";
	}
	
	/* Funcion para chequear el radio button correspondiente*/
	function chequearFiltro(valor,rbFamilia,rbProducto,idFamilia,codProducto,cFamilia,cProducto){
		switch(valor){
					
			case 1:
				// se activa la familia de productos
				document.getElementById(rbFamilia).checked = true;		
				document.getElementById(rbProducto).checked = false;
				
				document.getElementById(codProducto).value = "";
				// Se asigna blanco al id del producto, en caso que tuviese valor
				if (document.getElementById("idProducto") != null){
					document.getElementById("idProducto").value = "";
				}
				
				// Se muestra el combo tipo de tramite
				if (document.getElementById("cTipoTramite") != null){
					showHideVis("cTipoTramite", true);
				}
				
				showHideVis(cFamilia, true);	
				showHideVis(cProducto, false);
			break;
					
			case 2:	
				// se activa el producto
				document.getElementById(rbProducto).checked = true;
				document.getElementById(rbFamilia).checked = false;

				document.getElementById(idFamilia).value = "";
				document.forms[0].elements[idFamilia].selectedIndex = 0;
				if (document.getElementById("idTipoTramite") != null){
					document.getElementById("idTipoTramite").value = "";
					document.forms[0].elements["idTipoTramite"].selectedIndex = 0;
					// Se oculta el combo tipo de tramite
					//showHideVis("cTipoTramite", false);
				}
				// Se asigna blanco al id objeto siniestro, en caso que tuviese valor
				if (document.getElementById("idObjetoStro") != null){
					document.getElementById("idObjetoStro").value = "";
					document.forms[0].elements["idObjetoStro"].selectedIndex = 0;
				}
				
				showHideVis(cProducto, true);	
				showHideVis(cFamilia, false);
			break;
		}
	}	
	
	/* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
	function busquedaProducto(pagInicial,pagBusqueda,codigoProducto,descripcionProducto,descripcionOculta){
	  var pag;
	  var codigo = document.getElementById(codigoProducto).value;	
	  var descripcion = "";
 	  if(!descripcionOculta)
 	  	descripcion = document.getElementById(descripcionProducto).value;
 	  
	  // si se ha introducido algun valor en codigo o descripcion, se deberá ejecutar directamente la consulta
	  if((codigo=="")&&(descripcion==""))
	    pag = pagInicial;  
	  else pag = pagBusqueda;
	  
	  pag= pag+"?codigoProducto="+codigo+"&descripcionProducto="+descripcion;
	   
	  var valor = lanzarVentana(pag,600,400);
	  if(valor != undefined) {
		if(codigoProducto != null)		
			setValue(codigoProducto, valor[0]);
		
		if(descripcionProducto != null)
			setValue(descripcionProducto,valor[2]);
	  }
	} 
	
	/* Funcion q envia un formulario con el criterio del radio button */
	function submitCriterioBusqueda(form,criterioSeleccion,rbFamilia,areaTrabajo) {
	   if(document.getElementById(rbFamilia).checked)
	   		document.getElementById(criterioSeleccion).value = "Familia";
	   else
	   		document.getElementById(criterioSeleccion).value = "Producto";
	   			
	  submitForm(form,null,areaTrabajo);
	}	

	/* Funcion para chequear el radio button correspondiente*/
	function chequearFiltro2(valor,rbFamilia,rbProducto,idFamilia,codProducto,idProducto,cFamilia,cProducto){
		switch(valor){
					
			case 1:
				// se activa la familia de productos
				document.getElementById(rbFamilia).checked = true;		
				if(rbProducto != null){
					document.getElementById(rbProducto).checked = false;
				}
				
				if(codProducto != null){
					document.getElementById(codProducto).value = "";
				}
				
				if(idProducto != null){
					document.getElementById(idProducto).value = "";
				}

				if(document.getElementById('criterioSeleccion') != null){
					document.getElementById('criterioSeleccion').value = "Familia";	
				}
				
				if(document.getElementById('descripcionProducto') != null){
					document.getElementById('descripcionProducto').value = "";
				}
				
				showHideVis(cFamilia, true);	
				if(cProducto != null){
					showHideVis(cProducto, false);
				}
				
			break;
					
			case 2:	
				// se activa el producto
				document.getElementById(rbProducto).checked = true;
				document.getElementById(rbFamilia).checked = false;

				document.getElementById(idFamilia).value = "";
				document.forms[0].elements[idFamilia].selectedIndex = 0; 	
				
				if(document.getElementById('idTipoTramite') != null)
					document.getElementById("idTipoTramite").length = null;
				
                if(document.getElementById('criterioSeleccion') != null){
                	document.getElementById('criterioSeleccion').value = "Producto";
                }
                
				showHideVis(cProducto, true);	
				showHideVis(cFamilia, false);
			break;
		}
	}
	
	function seleccionarTiposTramite(form){
		var findParameters = ['idFamiliaProd'];
		var sendParameters = ['idFamiliaProd'];
		if (document.getElementById("idTipoTramite") != null)
			document.getElementById("idTipoTramite").length = null;
		var valorFamiliaProd = document.getElementById("idFamiliaProd").value;
		if (valorFamiliaProd != ""){
			if(jQuery(":input[id='idTipoTramiteAjax']")){
	    	  if(valorFamiliaProd == criterioAutos){
				jQuery(":input[id='idTipoTramiteAjax']").val("idTramiteAutoAjax");
	    	  } else if(valorFamiliaProd == criterioHogar){
				jQuery(":input[id='idTipoTramiteAjax']").val("idTramiteHogarAjax");
	    	  }
			}
			retrieveURLParameters(actionReloadTipoTramite,form,findParameters,sendParameters);
		}
	}
	
	/* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
	function buscarProducto(pag,codProducto,idProducto){
	  var codigoProducto = document.getElementById(codProducto).value;	
	  var identificadorProducto = document.getElementById(idProducto).value;	
	  pag= pag+"?codigoProducto="+codigoProducto;
	  var valor = lanzarVentana(pag,600,400);
	  if(valor != undefined){
		if(codProducto != null)		
			setValue(codProducto, valor[0]);				  
		if(idProducto != null)		
			setValue(idProducto, valor[1]);				  
	  }
	}
	
	/* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
	function buscarProductoDescripcion(pag, codProducto, idProducto, descripcionProducto){
      var codigoProducto = document.getElementById(codProducto).value; 
      var descripcion = document.getElementById(descripcionProducto).value;
      pag= pag+"?codigoProducto="+codigoProducto+"&descripcionProducto="+descripcion;
      var valor = lanzarVentana(pag,600,400);
      if(valor != undefined) {
		setValue('codigoProducto', valor[0]);	
		setValue('idProducto', valor[1]);
		setValue('descripcionProducto', valor[2]);
      }
	}
	
	/* Funcion que recarga la lista de Caracteristicas de Siniestros en función de 
	 * la Familia de Producto/Producto/Tipologia de Siniestro/Causa del siniestro
	 * */
	function reloadCaracteristicas(idFamilia, idProducto, idTipologia, idCausa, form) {
		//Obtenemos los valores de los campos en el formulario corresponfiente
		
		var familia = form.elements[idFamilia].value; 
		var producto = form.elements[idProducto].value;
		var tipologia = form.elements[idTipologia].value;
		var causa = idCausa;
				
		nuevaPeticionAjax(accionBuscarCaracteristicas, 'post', 'familia='+familia+'&producto='+producto+'&tipologia='+tipologia+'&causa='+causa, callbackCaracSin, null);
	}
	
	function callbackCaracSin(respuesta){
		var spanElements = splitTextIntoSpan(respuesta.responseText);
		replaceExistingWithNewHtml(spanElements);
	}
	