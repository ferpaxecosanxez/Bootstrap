	function getActividades(){
		document.forms[0].action = urlActividades; 
		document.forms[0].submit();
	}		
		
		
	function showDatosTomador(value){
		if(value==1){
			showHide(document.getElementById('idDivPersonaFisica'),false);
			showHide(document.getElementById('idDivPersonaJuridica'),true);
				
			setValue('nombre','');
			setValue('apel1','');
			setValue('apel2','');
				
		}else if(value==2 || value==3 || value==4){
			showHide(document.getElementById('idDivPersonaFisica'),true);
			showHide(document.getElementById('idDivPersonaJuridica'),false);
			setValue('razonSocial','');
		}else if(value==undefined || value==''){
			showHide(document.getElementById('idDivPersonaFisica'),false);
			showHide(document.getElementById('idDivPersonaJuridica'),false);
		}
	}	
		
	function lupaPersonas(fordwar){
		if(document.getElementById('idTipoIdent').value == 1){
		var tipo;
			tipo = 2;
		}else{
			tipo = 1;
		}

    	pag= fordwar;
    	pag= pag + "?tipoPersona=" + tipo;
    	pag= pag + "&tipoIdentificador="+document.getElementById('idTipoIdent').value;
    	pag= pag + "&identificador="+document.getElementById('docIdent').value;
    	pag= pag + "&nombre="+document.getElementById('nombre').value;
    	pag= pag + "&apel1="+document.getElementById('apel1').value;
    	pag= pag + "&apel2="+document.getElementById('apel2').value;
    	pag= pag + "&razonSocial="+document.getElementById('razonSocial').value;	
    	
    	
    	var valor = lanzarVentana(pag,600,480);
    	if(valor!=undefined){
    		document.getElementById('docIdent').value = valor[1];
    		setValue('idTipoIdent',valor[8]);
    		showDatosTomador(valor[8]);

    		if(valor[3]=="2"){
    			document.getElementById('razonSocial').value = valor[9];
    		}else{
    			document.getElementById('nombre').value = valor[5];
    			document.getElementById('apel1').value = valor[6];
    			document.getElementById('apel2').value = valor[7];    		
    		}

    	}	
    }	
	    
	function seleccionarEspecificos(){
		var objCampoFamiliaProd = document.getElementById('idFamiliaProd');
		if (objCampoFamiliaProd.value == familiaAuto){
			muestraVehiculo();
		}else if (objCampoFamiliaProd.value == familiaSalud){
			muestraSalud();
		}else if (objCampoFamiliaProd.value == familiaHogar){
			muestraCasa();
		}else if (objCampoFamiliaProd.value == familiaIndus){
			muestraEmpresa();
		}
	}

    function muestraVehiculo(){
	    var objCampoFamiliaProd = document.getElementById('idFamiliaProd');
	    //PARA CAMBIAR UN ICONO POR OTRO
	    if (document.getElementById('icoAutos')){
	    	document.getElementById('icoAutos').src = "../../../../img/icono_cocheSelec.png";
	    }
	    if (document.getElementById('icoHogar')){
	    	document.getElementById('icoHogar').src = "../../../../img/icono_casa.png";
	    }
	    if (document.getElementById('icoIndus')){
	    	document.getElementById('icoIndus').src = "../../../../img/icono_empresa.png";
	    }
	    if (document.getElementById('icoSalud')){
	    	document.getElementById('icoSalud').src = "../../../../img/icoLesionado.png";
	    }
		if (document.getElementById('icoVida')){
			document.getElementById('icoVida').src = "../../../../img/icono_persona.png";
    	}
		
	    if(document.getElementById('divVehiculo').currentStyle.getAttribute('display')=='none'){
    		//showHide('cCritEsp',true);
	    	showHide('divVehiculo',true);
	    	familiaOriginal = familiaAuto;
	    }else{
    		//showHide('critEspec',false);
	    	showHide('divVehiculo',false);
	    	familiaOriginal = '0';
	    	limpiaVehiculo();  
	    }

    	showHide('divActividad',false);    	
    	showHide('divAgrupacion',false);
    	showHide('divNegocio',false);
    	showHide('divSituacion',false);
    	showHide('divSalud',false);
    	
    	limpiaCasa();
    	limpiaEmpresa();
    	limpiaSalud();
    	
    	objCampoFamiliaProd.value = familiaAuto;
    }
	    
    function muestraSalud(){
    	var objCampoFamiliaProd = document.getElementById('idFamiliaProd');
    	
    	if (document.getElementById('icoAutos')){
    		document.getElementById('icoAutos').src = "../../../../img/icono_coche.png";
    	}
    	if (document.getElementById('icoHogar')){
    		document.getElementById('icoHogar').src = "../../../../img/icono_casa.png";
    	}
    	if (document.getElementById('icoIndus')){
    		document.getElementById('icoIndus').src = "../../../../img/icono_empresa.png";
    	}
    	if (document.getElementById('icoSalud')){
    		document.getElementById('icoSalud').src = "../../../../img/icoLesionadoSelec.png";
    	}
		if (document.getElementById('icoVida')){
			document.getElementById('icoVida').src = "../../../../img/icono_persona.png";	
		}
		
		showHide('divNegocio',false);
    	showHide('divSituacion',false);
    	showHide('divAgrupacion',false);
    	showHide('divActividad',false);	    
    	showHide('divVehiculo',false); 
    	showHide('divSalud',true);
	    
	    limpiaSalud();
		limpiaEmpresa();
		limpiaVehiculo();
    	limpiaCasa();
    	
    	familiaOriginal = familiaSalud;
    	
    	objCampoFamiliaProd.value = familiaSalud;
    }
    function muestraCasa(){
	    var objCampoFamiliaProd = document.getElementById('idFamiliaProd');
	  //PARA CAMBIAR UN ICONO POR OTRO
	    if (document.getElementById('icoAutos')){
	    	document.getElementById('icoAutos').src = "../../../../img/icono_coche.png";
	    }
	    if (document.getElementById('icoHogar')){
	    	document.getElementById('icoHogar').src = "../../../../img/icono_casaSelec.png";
	    }
	    if (document.getElementById('icoIndus')){
	    	document.getElementById('icoIndus').src = "../../../../img/icono_empresa.png";
	    }
	    if (document.getElementById('icoSalud')){
	    	document.getElementById('icoSalud').src = "../../../../img/icoLesionado.png";
	    }
		if (document.getElementById('icoVida')){
			document.getElementById('icoVida').src = "../../../../img/icono_persona.png";	
		}
	    
	    if(document.getElementById('divSituacion').currentStyle.getAttribute('display')=='none'){
    		//showHide('critEspec',true);
	    	showHide('divSituacion',true);
	    	familiaOriginal = familiaHogar;
	    }else if(document.getElementById('divSituacion').currentStyle.getAttribute('display')!='none' && 
	    	document.getElementById('divNegocio').currentStyle.getAttribute('display')!='none'){
    		//showHide('critEspec',true);
	    	showHide('divSituacion',true);
	    	familiaOriginal = familiaHogar;
	    }else{
    		//showHide('critEspec',false);
    		showHide('divSituacion',false);	    
	    	objCampoFamiliaProd.value = '0';    
	    	limpiaCasa();
	    }    
    	
    	showHide('divActividad',false);
    	showHide('divAgrupacion',false);
    	showHide('divVehiculo',false);
    	showHide('divNegocio',false);
    	showHide('divSalud',false);
    	
    	limpiaEmpresa();
    	limpiaVehiculo();
    	limpiaSalud();
    	
    	objCampoFamiliaProd.value = familiaHogar;
    }
	    
    function muestraEmpresa(){
		var objCampoFamiliaProd = document.getElementById('idFamiliaProd');   
		//PARA CAMBIAR UN ICONO POR OTRO
		if (document.getElementById('icoAutos')){
			document.getElementById('icoAutos').src = "../../../../img/icono_coche.png";
		}
		if (document.getElementById('icoHogar')){
			document.getElementById('icoHogar').src = "../../../../img/icono_casa.png";
		}
		if (document.getElementById('icoIndus')){
			document.getElementById('icoIndus').src = "../../../../img/icono_empresaSelec.png";
		}
		if (document.getElementById('icoSalud')){
			document.getElementById('icoSalud').src = "../../../../img/icoLesionado.png";
		}
		if (document.getElementById('icoVida')){
			document.getElementById('icoVida').src = "../../../../img/icono_persona.png";	
		}

	    if(document.getElementById('divNegocio').currentStyle.getAttribute('display')=='none'){
	    	//showHide('critEspec',true);
	    	showHide('divNegocio',true);
	    	showHide('divSituacion',true);
	    	showHide('divAgrupacion',true);
	    	showHide('divActividad',true);
	    	familiaOriginal = familiaIndus;
	    }else{
	    	//showHide('critEspec',false);
	    	showHide('divNegocio',false);
	    	showHide('divSituacion',false);
	    	showHide('divAgrupacion',false);
	    	showHide('divActividad',false);	    
	    	familiaOriginal = '0';
	    	limpiaEmpresa();
	    }        

    	showHide('divVehiculo',false); 
    	showHide('divSalud',false);
    	limpiaVehiculo();
    	limpiaCasa();
    	limpiaSalud();
    	
    	objCampoFamiliaProd.value = familiaIndus;
    }        
	    
    function limpiaVehiculo(){
    	setValue('numMatricula','');
    }
    
    function limpiaCasa(){
    	setValue('codTipoVia','');
    	setValue('via','');
    	setValue('numero','');
    	setValue('bloque','');
    	setValue('piso','');
    	setValue('puerta','');
    	setValue('codPais','');
    	setValue('codPostal','');
    	setValue('codLocalidad','');
    	setValue('codProvincia','');
    }    
    
    function limpiaEmpresa(){
    	limpiaCasa();
    	setValue('codActividad','');
    	setValue('agrupacionRiesgo','');
    	setValue('idTipoNegocio','');
    	setValue('companiaAbridora','');
    	setValue('numPolizaCedente','');
    	setValue('idProcedencia','');
    	setValue('oficinaProcedencia','');
    	setValue('refPolizaExterna','');
    	setValue('programaInternacional','');
    }    
    
    function limpiaSalud(){
    	setValue('idNcCuadroReembolso','');
    	setValue('tarjetaSanitaria','');
    }
    
    function persona(valor){
    	if(valor==""){
    		document.getElementById('codTipoRol').value="TOMADOR";
    	}else if(valor=="0"){
    		document.getElementById('codTipoRol').value="";
    	}else{
    		document.getElementById('codTipoRol').value=
    			document.getElementById('idTipoRol').options[document.getElementById('idTipoRol').selectedIndex].text;
    	}
    }
	    
	function parametersMediador(mediador) {
		return '&codigo=' + getValue('codMediador') + '&tipoUniOrg=' + mediador;
	}    
		   
	function validarDatosGenerales(){
		
		if (document.getElementById('idProducto').selectedIndex==0 && 
		document.getElementById('idMediador').value=="" &&  
		//document.getElementById('numPoliza').value=="" && 
		!validarTipoProducto() && !validaTomador()){
			alert(mensajeValidar);
			return false;
		}
		if(document.getElementById('numExpediente').value=="" 
		&& document.getElementById('numRecibo').value=="" 
		//&& document.getElementById('numPoliza').value==""
		){
			if(
				(document.getElementById('idProducto').selectedIndex!=0
				 && document.getElementById('idMediador').value=="" && 
				document.getElementById('idUsuario').value=="")
				 || 
				 (document.getElementById('idProducto').selectedIndex==0 
				 && document.getElementById('idMediador').value!="" && 
				document.getElementById('idUsuario').value=="") 
				 ||
				 (document.getElementById('idProducto').selectedIndex==0 
				 && document.getElementById('idMediador').value=="" && 
				document.getElementById('idUsuario').value==!"")){
					if(!validarTipoProducto() && !validaTomador()){
						alert(mensajeValidar);
						return false; 			
					}else{
						return true;
					}	
			}else{
				return true;
			}
		}
		else{
			return true;
		}
	}		   
	
	function validarTipoProducto(){
		if(document.getElementById('idFamiliaProd').value!=""){
			if(document.getElementById('idFamiliaProd').value=="3"){return validarAutos();}
			if(document.getElementById('idFamiliaProd').value=="1"){return validarEmpresas();}
			if(document.getElementById('idFamiliaProd').value=="2"){return validarHogar();}				 				
		}else{
			return true;
		}
	}
	
	function validarAutos(){
		if(document.getElementById('numMatricula').value==""){
			return false;
		}else{
			return true;
		}
	}
	
	function validarEmpresas(){
		if(!validarHogar() || (document.getElementById('idTipoNegocio').selectedIndex==0 && document.getElementById('idProcedencia').selectedIndex==0 && 
			document.getElementById('codActividad').selectedIndex==0 && document.getElementById('companiaAbridora').value==""
			 && document.getElementById('agrupacionRiesgo').value==""
			 && document.getElementById('programaInternacional').value=="" && document.getElementById('oficinaProcedencia').value=="" && document.getElementById('numPolizaCedente').value=="")){
			return false;
		}else{
			return true;
		} 		
	} 		
	
	function validarHogar(){
		if(document.getElementById('codTipoVia').selectedIndex==0 && document.getElementById('via').value==""
			 && document.getElementById('numero').value=="" && document.getElementById('bloque').value=="" && document.getElementById('piso').value==""
			  && document.getElementById('puerta').value=="" && document.getElementById('codPais').selectedIndex==0 && document.getElementById('codPostal').value==""
			  && document.getElementById('codLocalidad').value=="" && document.getElementById('codProvincia').selectedIndex==0){
			return false;
		}else{
			return true;
		} 		
	} 		 		
		   
	function seleccionaLocalidad(pag) {
         var codPostal = document.forms[0]['codPostal'].value;
         var localidad = document.forms[0]['codLocalidad'].value;

         pag += '?codPostal=' + codPostal;
         pag += '&descripcion=' + localidad;

         var valor = lanzarVentana(pag,600,500);

         if (valor != undefined) {
         	for(i=0;i<(document.getElementById('codProvincia').options).length;i++){
         		if(document.getElementById('codProvincia').options[i].id==valor[2]){
         			document.getElementById('codProvincia').options[i].selected=true;
         			break;
         		}
         	}
            setValue("codPostal",valor[0])
            setValue("codLocalidad",valor[1])
         }
	}
	      
 	function validaPersona(){
 		obj = document.getElementById('idTipoRol');
 		
 		if(obj.selectedIndex!=0){
			if(document.getElementById('docIdent').value!="" || document.getElementById('nombre').value!="" || 
			document.getElementById('apel1').value!="" || document.getElementById('apel2').value!="" || 
			document.getElementById('razonSocial').value!=""){
				return true;
			}else{
				//alert('<bean:message key="errors.validation.datoPersona"/>');
				return false;
			}
 		}else{
 			return true;
 		}
 	}	   
 	function validaTomador(){
 		obj = document.getElementById('idTipoRol');
 		
 		//if(obj.selectedIndex!=0){
			if(document.getElementById('docIdent').value!="" || document.getElementById('nombre').value!="" || 
			document.getElementById('apel1').value!="" || document.getElementById('apel2').value!="" || 
			document.getElementById('razonSocial').value!=""){
				return true;
			}else{
				return false;
			}
 		//}else{
 		//	return false;
 		//}
 	}		 	
	 	
 	function submitDatos(){
		/*
 		if(document.getElementById('idFechasConsPoliza').selectedIndex!=0 && 
 			document.getElementById('fechaEfectoDesde').value==""){
 			alert("Debe rellenar el campo de fecha 'Desde' antes de realizar la búsqueda");
 			return;
 		}*/

	 	if(validarDatosGenerales()){
	 		/*document.getElementById('pagina').value=1;
	 		document.getElementById('rapida').value='NO';
	 		submitForm(document.forms[0],null,null);*/
	 		
	 	  document.getElementById('pagina').value=1;
	      // Mostrar las capas ocultas
	      showHide('divLoad', true);
	      // Ejecución de la acción
	      var ok = submitForm(document.forms[0],null,null);
	      if (!ok) {
	        // Ocultar las capas visibles
	        showHide('divLoad', false);
	      }
	 	}
 	}
 	
 	
	// Función para devolver los datos seleccionados a la ventana principal
	function seleccionar(numPoliza, idPolMovim, idProdEfec, fecEfecto, idFamilia){
	 	var valor = [numPoliza, idPolMovim, idProdEfec, fecEfecto, idFamilia];
	 	window.returnValue = valor;
	 	window.close();
	}
	

	// Esta función queda preparada por si en "getActividad" se pasara correctamente a la pantalla la nueva familia de producto
	// dando prioridad a la familia del producto seleccionado antes
    function cargaTipoProducto(familiaOriginal, familiaProd) {
		var tipo = familiaOriginal;
		if (familiaProd != null && familiaProd != "" && familiaProd != "0"){
			tipo = familiaProd;
		}
		
   		if (tipo != null && tipo != "" && tipo != "0"){
   			document.getElementById('idFamiliaProd').value = tipo;
			//document.getElementById("selectCrit").style.display = "none";
			if (tipo == familiaAuto) {
				muestraVehiculo();
			}
			if (tipo == familiaHogar) {
				muestraCasa();
			}
			if (tipo == familiaIndus) {
				muestraEmpresa();
			}
   		}
	}
    

	    
	
	
