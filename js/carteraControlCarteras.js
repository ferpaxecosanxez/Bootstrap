/**
 *	Fichero que contiene todos los scripts asociados a la operativa de Control de Carteras.
 *  Fecha de creacion : 6-mar-08
 *  Autor : Justo Aguilar - jmaguilar@calculo-sa.es
 */
 
 
 //	-------------	Comun
 
 function alertArray(array) {
 	var resultado = ""; 
    for ( x in valor ) {
    	resultado += x + " : " + valor[x] + "\n";
    } 
    alert ( resultado );
 }
 
 

 //	-------------	Consulta
 
 function lupaProducto(pag) {   
    var valor = lanzarVentana(pag,600,400);
    if ( valor != undefined ) {
	    //	alertArray( valor );
    	if (document.getElementById('idProducto') != undefined){
    	
    		document.getElementById('idProducto').value = valor[0];
    	}
    	if (document.getElementById('codProducto') != undefined){
	    document.getElementById('codProducto').value = valor[1];	//	Código del producto recuperado
    	}
	    document.getElementById('descProducto').value = valor[2];	//	Descripcion del producto recuperado	    
    }
 }
 
 function lupaGarantiaProducto(pag) {  
	 riesgoSeleccionado = document.getElementById("garantia.idProdRiesgo").value;
	 pag = pag + '?riesgoSeleccionado=' + riesgoSeleccionado;
	    var valor = lanzarVentana(pag,600,400);
	    if ( valor != undefined ) {
		    //	alertArray( valor );
	    	if (document.getElementById('idGarantia') != undefined){
	    	
	    		document.getElementById('idGarantia').value = valor[0];
	    		
	    	}
	    	if (document.getElementById('codGarantia') != undefined){
		    document.getElementById('codGarantia').value = valor[1];	//	Código del producto recuperado
	    	}
	    	if (document.getElementById('descGarantia') != undefined){
			    document.getElementById('descGarantia').value = valor[2];	//	Código del producto recuperado
		    }
		    
	    }
	 }
 
 function mostrarParametros(path) {
 	lanzarVentana(path,"800","400",null); 
 }
 
 function submitFormConsulta(form) {
 
 	var fechaContableDesde = document.getElementById('fechaContableDesde').value;
 	var fechaContableHasta = document.getElementById('fechaContableHasta').value;
 	var fechaPlanificacionDesde = document.getElementById('fechaPlanificacionDesde').value;
 	var fechaPlanificacionHasta = document.getElementById('fechaPlanificacionHasta').value;
 	
 	if ( fechaContableDesde != null && fechaContableDesde.length > 0 && 
 		 fechaContableHasta != null && fechaContableHasta.length > 0 ) {
 		if ( compararFechas(fechaContableHasta,fechaContableDesde,0) < 0 ) {
 			alert("Rango de Fecha Contable incorrecto");
 			return -1;
 		}
 	}
 	
 	if ( fechaPlanificacionDesde != null && fechaPlanificacionDesde.length > 0 &&  
 		 fechaPlanificacionHasta != null && fechaPlanificacionHasta.length > 0 ) {
 		if ( compararFechas(fechaPlanificacionHasta,fechaPlanificacionDesde,0) < 0 ) {
 			alert("Rango de Fecha de Planificación incorrecto");
 			return -1;
 		}
 	}
 
 	//	Se estable el numero de pagina a 1 
 	form.pagina.value = 1;
  
 	//	Se envia el formulario
 	form.submit(); 	
 }
 
 function limpiarConsultaForm(form, evitarCampos) {
 	//	Se invoca el metodo de limpiar generico 
 	limpiar(form, evitarCampos);
 	
 	//	Se limpian los radio buttons
 	if(form.chkFamiliaOProducto != undefined){
	 	familiaOProducto = form.chkFamiliaOProducto;
	 	for ( i = 0; i < familiaOProducto.length; i++ ) {
	 		familiaOProducto[i].checked = false;
		}
 	}
 }
 
 //	-------------	Detalle
 
 function irDetalle(path,numCartera,numTrabajo) {   
    //	Se agregan los parametros de busqueda
    path += '?'
   	path += 'numCartera=' + numCartera;
   	path += '&'
    path += 'numTrabajo=' + numTrabajo;
    
    //	Se establece el nuevo path de la pagina
    document.location = path;
 }
 
 
 function irConsultaPoliza(path) {   
    //	Se establece el nuevo path de la pagina
     document.location = path;
 }
 
 function irAnadirGarantias(path, idMediador){
	path += '?'
	path += 'idMediador=' + idMediador;
		 
	//	Se establece el nuevo path de la pagina
	//document.location = path;
	var valor = lanzarVentana(path,800,600);
 }
 
 function habilitarBotones(tipoSeleccion)
 {
 	if( tipoSeleccion == "ParametroSel" ){
 		this.document.getElementById("botonAnadir").disabled=true;
     	this.document.getElementById("botonAnadir").className="boton2Disabled";
     	this.document.getElementById("botonEliminar").disabled=false;
     	this.document.getElementById("botonEliminar").className="boton2";
     	if (this.document.getElementById("botonModificar") != undefined){
     		this.document.getElementById("botonModificar").disabled=false;
         	this.document.getElementById("botonModificar").className="boton2";
     	}
     	
     }else if( tipoSeleccion == "ParametroMod" ){
     	this.document.getElementById("botonAnadir").disabled=false;
     	this.document.getElementById("botonAnadir").className="boton2";
     	this.document.getElementById("botonEliminar").disabled=true;
     	this.document.getElementById("botonEliminar").className="boton2Disabled";
     	if (this.document.getElementById("botonModificar") != undefined){
     		this.document.getElementById("botonModificar").disabled=true;
         	this.document.getElementById("botonModificar").className="boton2Disabled";
     	}
     }
 
 }
 
 function switchRadioButton(){
		var divFamiliaProducto = document.getElementById("divFamiliaProducto");
		var divProducto = document.getElementById("divProducto");
		var chkFamiliaProducto = document.getElementById("chkFamiliaProducto");
		var chkProducto = document.getElementById("chkProducto");
		if (chkFamiliaProducto.checked){
			
			document.getElementById("idProducto").value="";
			document.getElementById("proteccionCarteraView.codProducto").value="";
			document.getElementById("proteccionCarteraView.DescProducto").value="";
			
			
			divProducto.style.display = 'none';
			divFamiliaProducto.style.display = 'block';
		}else{
			document.getElementById("idFamiliaProducto").selectedIndex = 0;
			divProducto.style.display = 'block';
			divFamiliaProducto.style.display = 'none';
		}

}
 
 function desbloquearAyudaGarantias(){

	 if (document.getElementById("garantia.idProdRiesgo") != undefined && document.getElementById("garantia.idProdRiesgo").value != null 
			 && document.getElementById("garantia.idProdRiesgo").value !=""){
		 document.getElementById("imgDisabled").disabled = false;
	 }else if(document.getElementById("garantia.idProdRiesgo") != undefined){
			document.getElementById("imgDisabled").disabled = true;
	 }
	 
 }
