	/*minimizar el menu*/
   	if (!top.menuPlegado) {
	  // Funci?n para minimizar el men?
       	top.plegar('cMenuArea');
	}
	
	
	
	
	/*cargar datos para enviar*/
	function cargarDatos(){
		//unidad organizativa
		cargarUnidad();
		//producto
		cargarProducto();
		
		//tomador
		if (document.getElementById('numPoliza')== null){
			if(document.getElementById('criteriosSeleccionView.unidad.idUnidad') == null){
				if (cargarTomador(msnCliente, msnPolizasSeleccionadas) == false){ return false;}
			}
		}else{
			if (cargarPolizas(msnPoliza, msnGarantiasSeleccionadas) == false){ return false;}
		}
		//recogemos criterios de seleccion
		//periodo y fechas
		if (validacionFechas(msnFechas) == false){ return false;}
		return true;
	}
	
	
	function enviarDatos(){
		enviarDatos(null);		
	}
	
	
	function enviarDatos(action){	
		var cargado = cargarDatos();
		if (cargado == true){
			muestraCarga();
			
			if (action != null){
				document.forms[0].action = action;
			}			
			submitForm(document.forms[0],null,'iAreaTrabajo');
		}
	}


	/*Cargamos datos de la unidad*/
	function cargarUnidad(){
	}
	
	/*Cargamos datos del producto */
	function cargarProducto(){
	}
	
	/*cargamos los datos del tomador*/
	function cargarTomador(msnC, msnP){
		if (document.getElementById('tomador.docIdent') != null){
			if(document.getElementById('tomador.docIdent').value == ''
			&& document.getElementById('tomador.nombre').value == ''
			&& document.getElementById('tomador.apel1').value == ''
			&& document.getElementById('tomador.apel2').value == ''
			&& document.getElementById('tomador.razonSocial').value == ''){
				alert(msnCliente);
				return false;
			}
			var idPolizas="";
			if(top.document.frames('iAgenda').document.getElementById('registros') != null){
				var length = top.document.frames('iAgenda').document.getElementById('registros').value;
			
				for (var i = 0; i < length; i++){
					if (top.document.frames('iAgenda').document.getElementById('criteriosSeleccionView.dynaForm.tcPoliza_'+i).checked){	
						idPolizas += top.document.frames('iAgenda').document.getElementById('criteriosSeleccionView.dynaForm.idPoliza_'+i).value +"|";
					}
				}
			}
			if (idPolizas != ""){
				document.forms[0].elements['idPolizas'].value = idPolizas;
				//return true;
			}			
	
			return true;
		}
	}
	/*cargamos los datos de las polizas*/
	function cargarPolizas(msnP, msnG){
//		if (top.frames['iAgenda'].document.getElementById('cBody')){
//			top.frames['iAgenda'].document.getElementById('cBody').style.display = "block";
//		}
		if (document.getElementById('numPoliza').value != null && document.getElementById('numPoliza').value != ""){
			if (document.getElementById('buscar').value == 0){				
				alert(msnG);
				return false;
			}
			
			if (jQuery('#idPoliza').val() == ""){	
				alert(msnPolizasSeleccionadas);
				return false;
			}
			
			document.forms[0].elements['numPoliza'].value = document.getElementById('numPoliza').value;
		}

		if (jQuery('#nombreTomador')){
			jQuery("input[name='nombreTomador']").val(jQuery('#nombreTomador').val());
		}
		if (jQuery('#fechaAlta')){
			jQuery("input[name='fechaAlta']").val(jQuery('#fechaAlta').val());
		}
		if (jQuery('#descProducto')){
			jQuery("input[name='criteriosSeleccionView.producto.descripcionProducto']").val(jQuery('#descProducto').val());
		}
		if (jQuery('#descProducto')){
			jQuery("input[name='descProducto']").val(jQuery('#descProducto').val());
		}
		if (jQuery('#descEstadoPoliza')){
			jQuery("input[name='descEstadoPoliza']").val(jQuery('#descEstadoPoliza').val());
		}
		
		if (jQuery('#descEstadoPoliza')){
			jQuery("input[name='descEstadoPoliza']").val(jQuery('#descEstadoPoliza').val());
		}
		
		
		//Save info about poliza filters
		jQuery("input[name='idPoliza']").val(jQuery('#idPoliza').val());
		jQuery("input[name='idProdRiesgo']").val(jQuery('#idProdRiesgo').val());
		jQuery("input[name='idRgoMovim']").val(jQuery('#idRgoMovim').val());
		jQuery("input[name='codGarantia']").val(jQuery('#idGarantiaPoliza').val());
		
		
			
//		var idProdGarantias="";
//		var registros = jQuery("#registros", top.frames["iAgenda"].document);
//		
//		if(registros != null){
//			var length = registros.val();
//			for (var i = 0; i < length; i++){
//				var checkBoxElement = top.document.frames('iAgenda').document.getElementById('criteriosSeleccionView.dynaForm.idProdGarantia_'+i);
//				if (checkBoxElement.checked){			
//					idProdGarantias += checkBoxElement.value +"|";
//				}
//			}
//			if (jQuery('#idPoliza').val() != ""){
//				jQuery('input[name="idPolizas"]').val(jQuery('#idPoliza').val());
//			}else{
//				if (top.document.frames('iAgenda').document.getElementById('idPoliza')){
//					alert(jQuery('#idPoliza'));
//					alert(jQuery("input[name='idPolizas']"));
//					jQuery('#idPoliza').val(jQuery("#idPoliza", top.frames["iAgenda"].document).val());
//					jQuery("input[name='idPolizas']").val(jQuery("#idPoliza", top.frames["iAgenda"].document).val());
//				}
//			}
//		}
//		var idProdGarantiaObject = jQuery("input[name='idProdGarantias']");
//		if (idProdGarantias != ""){
//			if (idProdGarantiaObject){
//				idProdGarantiaObject.val(idProdGarantias);
//			}
//		} else if (idProdGarantiaObject){
//			alert(msnG);
//			return false;
//		}
			
		return true;
	}
	
	/*validacion de las fechas*/
	function validacionFechas(msn){
		//periodo
		document.forms[0].elements['criteriosSeleccionView.mes'].value 		= mesMostrado;
		document.forms[0].elements['criteriosSeleccionView.anno'].value 	= annoMostrado;
		document.forms[0].elements['criteriosSeleccionView.periodo'].value 	= meses[mesMostrado] + " " + annoMostrado;
		//fecha desde-hasta
		if (document.forms[0].elements['criteriosSeleccionView.fechaEfectoDesde'] != null && 
			document.forms[0].elements['criteriosSeleccionView.fechaEfectoHasta'] != null ){
			var fechaDesde = document.forms[0].elements['criteriosSeleccionView.fechaEfectoDesde'].value;
			var fechaHasta = document.forms[0].elements['criteriosSeleccionView.fechaEfectoHasta'].value;
			document.forms[0].elements['criteriosSeleccionView.stringFechaEfectoDesde'].value = fechaDesde;
			document.forms[0].elements['criteriosSeleccionView.stringFechaEfectoHasta'].value = fechaHasta;
			
			if (fechaDesde != "" && fechaHasta != ""){
				auxDesde = fechaDesde.split("/");
				auxHasta = fechaHasta.split("/");
				dateDesde = new Date(auxDesde[2], auxDesde[1], auxDesde[0]);
				dateHasta = new Date(auxHasta[2], auxHasta[1], auxHasta[0]);
				if(compareDate(dateDesde, dateHasta)==1)		{		
					//alert('<bean:message key="jsp.estadisticas.mensaje.fechasDesdeHasta"/>');
					alert(msn);
					return false;
				}
			}	
		}
		return true;
	}
	/*Compara Fechas*/
	function compareDate(dateA, dateB) { 
   		timeDifference = dateA - dateB;
   		if (timeDifference > 0) 		return 1; 
   		else if (timeDifference < 0)    return -1; 
   		else 						    return 0; 
	}
	/*salir de la aplicacion*/
	function salir(msnCancelar, actionCancelar, actionLogin){
		top.window.frames['iAgenda'].location = actionLogin;
	   	parent.writeSituation('Estadisticas', actionCancelar, true);
		cancelar(msnCancelar,actionCancelar,'iAreaTrabajo');
		// Funci?n para minimizar el men?
		top.plegar('cMenuArea');
	}
	
	/*limpiar datos */
	function limpiarDatosGlobal(){
		
		//producto		
		limpiarProducto();
		//limpiar resto campos
		limpiar(document.forms[0],camposNoTocar);
		if(document.forms[0].elements['criteriosSeleccionView.actualizarProducto']){
			document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
		}		
		if(document.forms[0].elements['criteriosSeleccionView.tcDelMes']){		
			document.getElementById('criteriosSeleccionView.tcDelMes').checked = true;		
		}
		jQuery("#tipoConsultaFamProd").click();
	}
	
	function limpiarDatosElemental(){
		if (document.getElementById('buscar')){
			document.getElementById('buscar').value = 0;
		}
		//Datos del tomador o poliza: registros de polizas y/o garantias
		limpiarPolizasGarantias(actionPolizas, actionGarantias);		
		//limpiar resto campos
		limpiar(document.forms[0],camposNoTocar);
		if(document.forms[0].elements['criteriosSeleccionView.actualizarProducto']){
			document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
		}
		if(document.forms[0].elements['criteriosSeleccionView.tcDelMes']){
			document.getElementById('criteriosSeleccionView.tcDelMes').checked = true;
		}
		showDatosTomador('');
		inicializarFrameAgenda();
		return false;
	}
	
	function inicializarFrameAgenda(){
		window.parent.frames[2].location = "/etica/agenda/miagenda/consulta/pendientes.do";
		top.window.document.getElementById("agTituloGif").src = top.window.imgAgTitulo.src;
		top.window.document.getElementById("mostrarAgAr").src = top.window.imgSinImagen.src;
	}
	
	/*limpiar datos Unidad organizativa */	
	function limpiarUnidad(){
		if (top.document.frames('iAgenda').document.getElementById('iArbol') != null){
			var formArbol 	= top.document.frames('iAgenda').document.frames('iArbol').document.forms[0];
			if (formArbol != null){
				formArbol.idUnidad.value ="";
				formArbol.desUnidad.value ="";
				formArbol.codUnidad.value ="";
				formArbol.action = actionUnidad;
				top.document.frames('iAgenda').document.frames('iArbol').document.location = actionUnidad;
			}
		}
	}
	/*limpiar datos del producto*/
	function limpiarProducto(){
//		top.window.frames['iAgenda'].location = recargaPagDerecha;
//		parent.writeSituation('Estadisticas', recargaPagDerecha, true);
		jQuery("#riesgoProducto").hide();
		jQuery("#idRiesgoProducto").find('option.dboption').remove();;
		document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value = "";
		
		jQuery("#garantiaProducto").hide();
		jQuery("#idGarantiaProducto").find('option.dboption').remove();
  		document.forms[0].elements['criteriosSeleccionView.producto.idGarantiaProd'].value = "";
	}
	
	//Datos del tomador o poliza: registros de polizas y/o garantias
	function limpiarPolizasGarantias(actionPolizas, actionGarantias){
		if (document.getElementById('descripcionTomador'))document.getElementById('descripcionTomador').value="";
		if (document.getElementById('idTomador'))document.getElementById('idTomador').value = "";
		if (document.getElementById('cifNifTomador'))document.getElementById('cifNifTomador').value = "";
		if (document.getElementById('descripcionTomador'))document.getElementById('descripcionTomador').value = "";
		if (document.getElementById('idTomador') != null){
			//top.window.frames['iAgenda'].location = actionPolizas;
		if (document.getElementById('tomador.nombre'))document.getElementById('tomador.nombre').value = "";
		if (document.getElementById('tomador.apel1'))document.getElementById('tomador.apel1').value = "";
		if (document.getElementById('tomador.apel2'))document.getElementById('tomador.apel2').value = "";
		if (document.getElementById('tomador.docIdent'))document.getElementById('tomador.docIdent').value = "";
		
		
			//parent.writeSituation('Estadisticas', top.window.frames['iAgenda'].location, true);
			document.forms[0].action = actionPolizas;
		}
	
		if (document.getElementById('numPoliza') != null){
			document.getElementById('numPoliza').value = "";
			document.forms[0].action = actionGarantias;
		}
		if (top.frames['iAgenda'].document.getElementById('cBody')){
			top.frames['iAgenda'].document.getElementById('cBody').style.display = "none";
		}
		
		
		
		//Limpiar filtro en busqueda por poliza
		limpiarRiesgoPoliza();
		
		
	}	
	
	
	
	/* periodo */
	function periodo(tipo, accion, valorMes, valorAnno){
		var mes = valorMes;
		var anno = valorAnno;
		mes = mesMostrado;

		if (tipo == 'mes'){
			if (accion == 'sumar'){
				mes = mesMostrado +1; 
			}else {
				mes = mesMostrado -1;
			}
		}else{	
			if (accion == 'sumar'){
				anno = annoMostrado + 1; 
			}else {
				anno = annoMostrado - 1;
			}
		}
		
		if (mes == 12){
			mes = 0;
			anno = anno + 1;
		}
		if (mes == -1){
			mes = 11;
			anno = anno - 1;
		}
	
		if (anno == -1){
			alert ("Año no valido.");
			anno = 0;
		}	
		mesMostrado = mes;
		annoMostrado = anno;

		document.getElementById('divMes').innerHTML = meses[mesMostrado] + " " + annoMostrado;
	}
	
	function desglosar(tipo, subTipo){
		cargarDatos();
		document.forms[0].elements['criteriosSeleccionView.tipoConsulta'].value = tipo;
		document.forms[0].elements['criteriosSeleccionView.subTipoEstadistica'].value = subTipo;		
		document.forms[0].action = actionDesglose;		
		submitForm(document.forms[0],null,null);
	}
 /***********************************************************************************************/
 /*	Fichero de Javascript para las validaciones de los datos generales del tomador de una poliza*/
 /***********************************************************************************************/
 	// variables globales de js
	var flagDisableInSession;
	//mostrar y ocultar datos
	function showDatosTomador(value){
	
		if(document.getElementById('idDivPersonaFisica')!=null && document.getElementById('idDivPersonaFisica') != undefined &&
		   document.getElementById('idDivPersonaJuridica')!=null && document.getElementById('idDivPersonaJuridica') != undefined){
			if(value==1){
				showHide(document.getElementById('idDivPersonaFisica'),false);
				showHide(document.getElementById('idDivPersonaJuridica'),true);
				setValue('tomador.nombre','');
				setValue('tomador.apel1','');
				setValue('tomador.apel2','');
			}else if(value==2 || value==3 || value==4){
				showHide(document.getElementById('idDivPersonaFisica'),true);
				showHide(document.getElementById('idDivPersonaJuridica'),false);
				setValue('tomador.razonSocial','');
			}else if(value==undefined || value==''){
				showHide(document.getElementById('idDivPersonaFisica'),false);
				showHide(document.getElementById('idDivPersonaJuridica'),false);
			}
		}
	}
	//   ----   FUNCIONALIDAD PARA EL TOMADOR ------------- 
	function lupaPersonas(fordwar, action){
		var tipo;
		if(document.getElementById('tomador.idTipoIdent').value == 1){
			tipo = 2;
		}else{
			tipo = 1;
		}
		tipo = 1;
    	pag= fordwar;
    	pag= pag + "?tipoPersona=" + tipo;
    	pag= pag + "&tipoIdentificador="+document.getElementById('tomador.idTipoIdent').value;
    	pag= pag + "&identificador="+document.getElementById('tomador.docIdent').value;
    	pag= pag + "&nombre="+document.getElementById('tomador.nombre').value;
    	pag= pag + "&apel1="+document.getElementById('tomador.apel1').value;
    	pag= pag + "&apel2="+document.getElementById('tomador.apel2').value;
    	pag= pag + "&razonSocial="+document.getElementById('tomador.razonSocial').value;
    	
    	cleanDatosTomador();
    		
    	var valor = lanzarVentana(pag,600,480);
    	if(valor!=undefined){
	    	document.forms[0].action = action;
   	   		setValue('tomador.idPersona',valor[0]);
    		setValue('tomador.docIdent', valor[1]);
    		setValue('tomador.nombre', valor[5]);
    		setValue('tomador.apel1', valor[6]);
    		setValue('tomador.apel2', valor[7]);
    		setValue('idTomador',valor[0]);
    		setValue('cifNifTomador',valor[1]);
    		setValue('tomador.idTipoIdent',valor[8]);
    		setValue('tomador.razonSocial', valor[2])
    	} 
    	// muestro los campos dependiendo si es persona fisica o juridica
    	showDatosTomador(document.getElementById('tomador.idTipoIdent').value);
    }
   
    
    function disableDatosTomador(flag){
    	if(document.getElementById('tomador.docIdent')!=undefined){
    		document.getElementById('tomador.docIdent').disabled = flag;
    	}
    	if(document.getElementById('tomador.nombre')!=undefined){
    		document.getElementById('tomador.nombre').disabled = flag;
    	}
    	if(document.getElementById('tomador.apel1')!=undefined){
    		document.getElementById('tomador.apel1').disabled = flag;
    	}
    	if(document.getElementById('tomador.apel2')!=undefined){
    		document.getElementById('tomador.apel2').disabled = flag;
    	}
    	if(document.getElementById('tomador.razonSocial')!=undefined){
    		document.getElementById('tomador.razonSocial').disabled = flag;
    	}
    }
    //limpiar datos tomador    
    function cleanDatosTomador(){    	
    	if(document.getElementById('tomador.idTipoIdent') != null){
    		setValue('tomador.idTipoIdent','');
    	}
    	if(document.getElementById('tomador.docIdent') != null){
	    	setValue('tomador.docIdent','');
	    }
	    if(document.getElementById('tomador.nombre') != null){
	    	setValue('tomador.nombre','');
	    }
	    if(document.getElementById('tomador.apel1') != null){
	    	setValue('tomador.apel1','');
	    }
	    if(document.getElementById('tomador.apel2') != null){
	    	setValue('tomador.apel2','');
	    }
	    if(document.getElementById('tomador.razonSocial') != null){
	    	setValue('tomador.razonSocial','');
	    }
	    if(document.getElementById('tomador.idPersona') != null){
	    	setValue('tomador.idPersona','');
	    }
	   	disableDatosTomador(false);
			
	
    }
    function datosPersonales(tipo,action,message, modulo){
       var idPersona = document.getElementById('tomador.idPersona').value;
	    if(idPersona == null || idPersona == undefined || idPersona == ''){
    		alert(message);
    	}else{
          var pag = action;
    	  pag = pag + "?persona.id=" + idPersona;
	      pag = pag + "&swCtasBancarias=1";
	      pag = pag + "&swPermisos=1";
	      var valor = lanzarVentana(pag,500,550);
	      
      	  if (valor != null) {
             showDatosTomador(document.getElementById('tomador.idTipoIdent').value);
     		// disableCamposNoModif(true);
             disableDatosTomador(true);
         }
      }
  } 
  
  function allDisabledFull(form,flag){
    	var campos = form.elements;
	    for(var i= 0;i<campos.length; i++){
        	campos[i].disabled = flag;	        
     	}
     	var elementosImg = document.getElementsByTagName("img");
     	array_img = new Array();
     	var valorCodigoImg;
    	var sizeArrayImg = elementosImg.length;
   		for(var z=0;z<sizeArrayImg;z++){   			
   			if(elementosImg[z].id != undefined){   			
   				if(elementosImg[z].id.indexOf('imgDisabled') > -1 ){   				
   					elementosImg[z].disabled = flag;	   			
   				}else{
   					elementosImg[z].disabled = flag;
   				}
   			}	   			   			
   		}
  }
  
  function enviandoDatos(url){  
		var location = url;
		enviarDatos(location);
  }
  	
  	function seleccionaUOrg(object) {
	 pag = actionUnidad + '?codigo=' + object.value;
     var valor = lanzarVentana(pag,600,530)
     if(valor != undefined) {
    	//valor[0] = id
    	//valor[1] = codigo
    	//valor[2] = descripcion
    	//valor[3] = tipo
     	document.forms[0].elements['criteriosSeleccionView.unidad.idUnidad'].value = valor[0];
     	document.forms[0].elements['criteriosSeleccionView.unidad.desUnidad'].value = valor[2] + " (" + valor[3] + ")";
     	document.forms[0].elements['criteriosSeleccionView.unidad.codUnidad'].value = valor[1];     	
     }
  	}
  	
  	function seleccionaProducto(object) {
  		var url = actionProducto + '?codProdTec=' + object.value;
  		var valor = lanzarVentana(url,600,400);
  		
  		if(valor != undefined) {
  			document.forms[0].elements['criteriosSeleccionView.producto.idProducto'].value = valor[0];
  			document.forms[0].elements['criteriosSeleccionView.producto.codigoProducto'].value = valor[1];
  			document.forms[0].elements['descripcionProducto'].value = valor[1];
  			document.forms[0].elements['criteriosSeleccionView.producto.descripcionProducto'].value = valor[2];
  			document.forms[0].elements['criteriosSeleccionView.producto.idProdEfec'].value = valor[3];
  			document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
  			
  			prepararComboRiesgosPorProducto();
  			
			
/*  			
  			switch(valor[4]) {
  				case "PARTICU":
  					top.frames['iAgenda'].frames['iProducto'].document.forms[0].elements['idFamiliaProductos'].value = 2;
  					break;
  				case "AUTOS":
  					top.frames['iAgenda'].frames['iProducto'].document.forms[0].elements['idFamiliaProductos'].value = 3;
  					break;
  				case "INDUSTR":
  					top.frames['iAgenda'].frames['iProducto'].document.forms[0].elements['idFamiliaProductos'].value = 1;
  					break;
  			}
  			
  			top.frames['iAgenda'].frames['iProducto'].document.forms[0].elements['idProdEfec'].value = valor[3];
  			top.frames['iAgenda'].frames['iProducto'].document.forms[0].elements['codigoProducto'].value = valor[1];     					
  			top.frames['iAgenda'].frames['iProducto'].cargarArbolProducto();     	
  			top.frames['iAgenda'].document.getElementById('seleccionProducto').style.display = "block";
*/  		}
  		else{
  			ocultaValoresProducto();
  		}
  	}
  	
  	function ocultaValoresProducto(){  		
  		//actualizamos los valores del producto a vacío para que no realice busquedas por ningun valor
  		actualizarProducto();
      	document.forms[0].elements['descripcionProducto'].value = "";
      	document.forms[0].elements['criteriosSeleccionView.producto.descripcionProducto'].value = "";
      	document.forms[0].elements['criteriosSeleccionView.producto.codigoProducto'].value = "";
  	}
  	
  	
  	
  	//Genera combos de riesgo y garantías para un producto seleccionado
  	function prepararComboRiesgosPorProducto() {
  		
  		//Abre loader
  		muestraCarga();
  		
  		//Consulta datos del producto
  		jQuery.post(
				"/etica/estadisticas/comun/producto/obtenerDatosProducto.do", 
				{
					idProdEfect: document.forms[0].elements['criteriosSeleccionView.producto.idProdEfec'].value, 
					idProdRiesgo: document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value
				}
		).done(function(data) {
			if (data.success) {
				document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value = "";
				jQuery("#idRiesgoProducto").find('option.dboption').remove();
				for (var comboIter = 0; comboIter < data.combo.length; comboIter++) {
					var combo = data.combo[comboIter];
					jQuery("#idRiesgoProducto").append('<option value="' + combo.value + '">' + combo.label + '</option>');
				}
				jQuery("#riesgoProducto").show();
				
				//Cierra loader
				ocultaCarga();
			}
		});
  		
  	}
  	
  	
  	
  //Genera combos de riesgo y garantías para un producto seleccionado
  	function prepararComboGarantiaPorRiesgoProducto() {
  		
  		document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value = jQuery("#idRiesgoProducto").val();
  		document.forms[0].elements['criteriosSeleccionView.producto.idGarantiaProd'].value = "";
  		
  		//Abre loader
  		muestraCarga();
  		
  		//Si se selecciona riesgo
  		if (document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value != "") {
  		
	  		//Consulta datos del producto
	  		jQuery.post(
					"/etica/estadisticas/comun/producto/obtenerDatosProducto.do", 
					{
						idProdEfect: document.forms[0].elements['criteriosSeleccionView.producto.idProdEfec'].value, 
						idProdRiesgo: document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value
					}
			).done(function(data) {
				if (data.success) {
					jQuery("#idGarantiaProducto").find('option.dboption').remove();
					for (var comboIter = 0; comboIter < data.combo.length; comboIter++) {
						var combo = data.combo[comboIter];
						jQuery("#idGarantiaProducto").append('<option value="' + combo.value + '">' + combo.label + '</option>');
					}
					if (data.combo.length > 0) {
						jQuery("#garantiaProducto").show();
					} else {
						jQuery("#garantiaProducto").hide();
					}
					//Cierra loader
					ocultaCarga();
				}
			});
	  		
  		} else {
  			
  			//Reiniciamos combo garantia
  			jQuery("#idGarantiaProducto").find('option.dboption').remove();
  			jQuery("#garantiaProducto").hide();
  			
  			//Cierra loader
  			ocultaCarga();
  			
  		}
  		
  	}
  	
  	
  	
  	//Almacena garantia seleccionada
  	function almacenaGarantiaSeleccionada() {
  		document.forms[0].elements['criteriosSeleccionView.producto.idGarantiaProd'].value = jQuery("#idGarantiaProducto").val();
  	}
  	
  	
  	
  	
  	function seleccionaConjuntoProductos() {
  		var url = actionCjtoProductos + "?cjtoProductosString=" + document.getElementById('cjtoProductosString').value;
  		var valor = lanzarVentana(url,500,400);
  		if(valor != undefined) {
  			document.getElementById('cjtoProductosString').value = valor[0];
  			jQuery('#criteriosSeleccionView\\.producto\\.stringCjtoProductosIds').val(valor[1]);
  			document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
		}
	}
  	
  	function detalleConjuntoProductos(productos) {
  		var url = actionDetalleCjtoProductos + "?cjtoProductosString=" + productos;
  		var valor = lanzarVentana(url,650,400);
	}
  	
  	function consultaConjuntoProductos() {
  	     lanzarVentanaOpen(actionConsultaProductos,500,400);
  	}
  	
  	function actualizarCjtoProductos(object){
  		object.value=object.value.toUpperCase();
  		seleccionTipoConsulta(1);
  		document.forms[0].elements['criteriosSeleccionView.producto.stringCjtoProductos'].value = object.value;
  		document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
  	}
  	
  	function seleccionTipoConsulta(tipoConsulta){
  		document.forms[0].elements['criteriosSeleccionView.producto.tipoCriterios.id'].value = tipoConsulta;
  		
  		// Dependiendo de la selección mostramos el elemento checked y ocultamos el resto de elmenentos
  		switch(tipoConsulta){
  			case 0:
  				//familia productos
  				document.forms[0].elements['tipoConsultaFamProd'].checked = true;
  				document.getElementById('familiaProductos').style.visibility = 'visible';
  				document.getElementById('productosString').style.visibility = 'hidden';
  				document.getElementById('descProducto').style.visibility = 'hidden';
  				document.getElementById('riesgoProducto').style.display = 'none';
  				if (document.getElementById('garantiaProducto')) {
  					document.getElementById('garantiaProducto').style.display = 'none';
  				}
//  				document.getElementById('riesgo').style.display = 'none';
//  				document.getElementById('garantia').style.display = 'none';
  				if (document.getElementById('agrEstadistica'))
  					document.getElementById('agrEstadistica').style.visibility = 'hidden';
  				ocultaValoresProducto();
  				break;
  			case 1:
  				//conjunto de productos
  				document.forms[0].elements['tipoConsultaCjtoProd'].checked = true;
  				document.getElementById('familiaProductos').style.visibility = 'hidden';
  				document.getElementById('productosString').style.visibility = 'visible';
  				document.getElementById('descProducto').style.visibility = 'hidden';
  				document.getElementById('riesgoProducto').style.display = 'none';
  				if (document.getElementById('garantiaProducto')) {
  					document.getElementById('garantiaProducto').style.display = 'none';
  				}
  				//document.getElementById('riesgo').style.display = 'none';
  				//document.getElementById('garantia').style.display = 'none';
  				if (document.getElementById('agrEstadistica'))
  					document.getElementById('agrEstadistica').style.visibility = 'hidden';
  				ocultaValoresProducto();
  				break;
  			case 2:
  				//producto
  				document.forms[0].elements['tipoConsultaProd'].checked = true;
  				document.getElementById('familiaProductos').style.visibility = 'hidden';
  				document.getElementById('productosString').style.visibility = 'hidden';
  				document.getElementById('descProducto').style.visibility = 'visible';
  				if (document.getElementById('agrEstadistica'))
  					document.getElementById('agrEstadistica').style.visibility = 'hidden';
  				break;
  			case 3:
  				//Agrp. Estadística
  				document.forms[0].elements['tipoConsultaAgrpEstd'].checked = true;
  				document.getElementById('familiaProductos').style.visibility = 'hidden';
  				document.getElementById('productosString').style.visibility = 'hidden';
  				document.getElementById('descProducto').style.visibility = 'hidden';
  				document.getElementById('riesgoProducto').style.display = 'none';
  				if (document.getElementById('garantiaProducto')) {
  					document.getElementById('garantiaProducto').style.display = 'none';
  				}
  				document.getElementById('agrEstadistica').style.visibility = 'visible';
  				//document.getElementById('riesgo').style.display = 'none';
  				//document.getElementById('garantia').style.display = 'none';
  				ocultaValoresProducto();
  				break;
  		}
  	}
  	
  	function asignarNumPoliza(numPoliza){
  		var inputNumPoliza = jQuery(":hidden[name='poliza.numPoliza']");
  		jQuery(inputNumPoliza).val(numPoliza);
  	}
  	
  	function cargarGarantiasPoliza(action){
  		if(jQuery('#idPoliza').val() != ''){
	  		var location = action + "?poliza= "+ jQuery('#numPoliza').val();
	  		document.forms[0].action = location;
	
	  		top.window.document.getElementById("agTituloGif").innerHTML = top.window.labelEstadisticas;
			submitForm(document.forms[0],null,'iAgenda');
  		} else {
  			inicializarFrameAgenda();
  		}
	}
  	
  	
	
	function actualizarProducto(){
		document.forms[0].elements['criteriosSeleccionView.actualizarProducto'].value = true;
		document.forms[0].elements['criteriosSeleccionView.producto.idProdEfec'].value = "";
      	document.forms[0].elements['criteriosSeleccionView.producto.idProducto'].value = "";
      	document.forms[0].elements['criteriosSeleccionView.producto.idRiesgoProd'].value = "";
      	document.forms[0].elements['criteriosSeleccionView.producto.idGarantiaProd'].value = "";  
	}
	
function limpiarCjtoProductos() {
	jQuery(':hidden[id="cjtoProductosString"]').val('');
	jQuery(':hidden[id="criteriosSeleccionView\\.producto\\.stringCjtoProductosIds"]').val('');
}	



















/* NUEVAS FUNCIONALIDADES PARA RENTABILIDAD POLIZA */
function cargarRiesgosPoliza(){
	
	if (jQuery('#idPoliza').val() != "") {
		
		//Abre loader
  		muestraCarga();
	
		jQuery.post(
				"/etica/estadisticas/monitor/poliza/obtenerriesgosgarantias.do", 
				{
					idPoliza: jQuery('#idPoliza').val(),
					idProdRiesgo: jQuery('#idRiesgoPoliza').val(),
					idRgoMovim: jQuery('#idRgoMovim').val()
				}
		).done(function(data) {
			if (data.success) {
				jQuery("#idProdRiesgo").html('<option></option>');
				for (var comboIter = 0; comboIter < data.combo.length; comboIter++) {
					var combo = data.combo[comboIter];
					jQuery("#idProdRiesgo").append('<option value="' + combo.value + '">' + combo.label + '</option>');
				}
				if (data.combo.length > 0) {
					jQuery("#prodRiesgo").show();
				}
				
				//Cierra loader
				ocultaCarga();
			}
		});
	}
}
	
	
function cargarNumeroRiesgoPoliza(){
	
	if (jQuery('#idProdRiesgo').val() != "") {
		
		//Abre loader
  		muestraCarga();
	
		jQuery.post(
				"/etica/estadisticas/monitor/poliza/obtenerriesgosgarantias.do", 
				{
					idPoliza: jQuery('#idPoliza').val(),
					idProdRiesgo: jQuery('#idProdRiesgo').val(),
					idRgoMovim: jQuery('#idRgoMovim').val()
				}
		).done(function(data) {
			if (data.success) {
				jQuery("#idRgoMovim").html('<option></option>');
				for (var comboIter = 0; comboIter < data.combo.length; comboIter++) {
					var combo = data.combo[comboIter];
					jQuery("#idRgoMovim").append('<option value="' + combo.value + '">' + combo.label + '</option>');
				}
				if (data.combo.length > 0) {
					jQuery("#numRiesgoPoliza").show();
				}
				
				//Cierra loader
				ocultaCarga();
			}
		});
	} else {
		limpiarNumRiesgoPoliza();
	}
}


function cargarGarantiasRiesgoPoliza(){
	
	if (jQuery('#idRgoMovim').val() != "") {
		
		//Abre loader
  		muestraCarga();
	
		jQuery.post(
				"/etica/estadisticas/monitor/poliza/obtenerriesgosgarantias.do", 
				{
					idPoliza: jQuery('#idPoliza').val(),
					idProdRiesgo: jQuery('#idRiesgoPoliza').val(),
					idRgoMovim: jQuery('#idRgoMovim').val()
				}
		).done(function(data) {
			if (data.success) {
				jQuery("#idGarantiaPoliza").html('<option></option>');
				for (var comboIter = 0; comboIter < data.combo.length; comboIter++) {
					var combo = data.combo[comboIter];
					jQuery("#idGarantiaPoliza").append('<option value="' + combo.value + '">' + combo.label + '</option>');
				}
				if (data.combo.length > 0) {
					jQuery("#garantiaPoliza").show();
				}
				
				//Cierra loader
				ocultaCarga();
			}
		});
	} else {
		limpiarGarantiasPoliza();
	} 
}




function limpiarRiesgoPoliza() {
	jQuery("#idProdRiesgo").val("");
	jQuery("#idProdRiesgo").html('<option></option>');
	jQuery("#prodRiesgo").hide();
	
	limpiarNumRiesgoPoliza();
}



function limpiarNumRiesgoPoliza() {
	jQuery("#idRgoMovim").val("");
	jQuery("#idRgoMovim").html('<option></option>');
	jQuery("#numRiesgoPoliza").hide();
	
	limpiarGarantiasPoliza();
}


function limpiarGarantiasPoliza() {
	jQuery("#idGarantiaPoliza").val("");
	jQuery("#idGarantiaPoliza").html('<option></option>');
	jQuery("#garantiaPoliza").hide();
}

