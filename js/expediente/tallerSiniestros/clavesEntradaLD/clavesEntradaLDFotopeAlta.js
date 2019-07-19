/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA CLAVES ENTRADA LD FOTOPERITACIÓN- ALTA
 */


function comprobarDatos() 
{
  var familia = document.forms[0].elements['clavesEntradaLDFotope.idFamiliaProd'].options[document.forms[0].elements['clavesEntradaLDFotope.idFamiliaProd'].selectedIndex].text;   	  
  var producto = document.getElementById('codigoProducto').value;
  var claveEntrada = document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].selectedIndex].text;
  var claveSapLd = document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].selectedIndex].text;
  var tipoEncargo = document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].options[document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].selectedIndex].text;
        
  if(((familia=="")&&(producto=="")) ||((familia!="")&&(producto!=""))){      
  	alert(mnsObligatorio);
  }
  else if ((familia=="")&&(producto=="")&&(claveEntrada=="")&&(claveSapLd=="")&(tipoEncargo=="")) {
  	alert(rellenoCampo);
  }
  else if(claveEntrada=="") {
	alert(claveEntradaVacio);      
  }
  else if(claveSapLd=="") {
	alert(claveSAPLDVacio);      
  }
  else if(tipoEncargo=="") {
	alert(tipoEncargoVacio);      
  }
  else if((familia!="") || (producto!="")){
	document.getElementById('codigoProducto').value = producto;

	if(document.getElementById('rbFamilia').checked){
   		document.getElementById('criterioSeleccion').value = "Familia";
   		
   		// se activan los campos para enviar los datos
		document.getElementById('codigoProducto').disabled = false;
   	}	
    else{
   		document.getElementById('criterioSeleccion').value = "Producto";
   		
   		// se activan los campos para enviar los datos
   		document.getElementById('idFamiliaProd').disabled = false;
   	}	
   		
    submitForm(document.forms[0],null,'iAreaTrabajo')
  }
}

window.onload = function()	{
	if (document.getElementById('criterioSeleccion').value == "Producto"){
		//se activa el radio button de producto
		document.forms(0).rbProducto.checked = "true";
		chequearFiltro(2,'rbFamilia','rbProducto','clavesEntradaLDFotope.idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	}else{
		//se activa el radio button de familia
		document.forms(0).rbFamilia.checked = "true";
		chequearFiltro(1,'rbFamilia','rbProducto','clavesEntradaLDFotope.idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	}	
}

function buscarProducto(pagInicial,pagBusqueda,codProducto,idProducto,descProducto){
  var pag;
  var codigoProducto = document.getElementById(codProducto).value;	
  // si se ha introducido algun valor en codigo o descripcion, se deberá ejecutar directamente la consulta
  if(codigoProducto=="")
    pag = pagInicial;  
  else pag = pagBusqueda;
  
  pag= pag+"?codigoProducto="+codigoProducto;
   
  var valor = lanzarVentana(pag,600,400);
  
	if(valor != undefined) {
	
		if(codigoProducto != null)		
			setValue(codProducto, valor[0]);				  
  
  		if (idProducto != null)
  			setValue(idProducto, valor[1]);

  		if (descProducto != null)
  			setValue(descProducto, valor[2]);

	}

}
	
function cambiarProducto() {
	document.getElementById('clavesEntradaLDFotope.idProducto').value = '';
	document.getElementById('descripcionProducto').value = '';
}

function comprobarDatos() 
{
   	  var claveEntrada = document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesEntrada'].selectedIndex].text;
  var claveSapLd = document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].options[document.forms[0].elements['clavesEntradaLDFotope.idClavesSapLdFotope'].selectedIndex].text;
  var tipoEncargo = document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].options[document.forms[0].elements['clavesEntradaLDFotope.idTipoEncargo'].selectedIndex].text;
  var tipoFamilia = document.forms[0].elements['clavesEntradaLDFotope.idFamiliaProd'].options[document.forms[0].elements['clavesEntradaLDFotope.idFamiliaProd'].selectedIndex].text;
  var producto = document.getElementById('clavesEntradaLDFotope.idProducto').value;
  
  if ((claveEntrada=="")&& (claveSapLd=="") && (tipoEncargo=="") && (tipoFamilia=="")&& (producto=="")) {
  	alert(rellenoCampo);
  }
  else if((tipoFamilia=="")&&(producto=="")) {
	alert(productoVacio);      
  }
  else if(claveEntrada=="") {
	alert(claveEntradaVacio);      
  }
  else if(claveSapLd=="") {
	alert(claveSAPLDVacio);      
  }
  else if(tipoEncargo=="") {
	alert(tipoEncargoVacio);      
  }
  else {
	submitForm(document.forms[0],null,'iAreaTrabajo')
  }
}

function buscarProductoLDFOT(pagInicial,pagBusqueda,codProducto,idProducto,descProducto){
	  var pag;
	  var codigoProducto = document.getElementById(codProducto).value;	
	  // si se ha introducido algun valor en codigo o descripcion, se deberá ejecutar directamente la consulta
	  if(codigoProducto=="")
	    pag = pagInicial;  
	  else pag = pagBusqueda;
	  
	  pag= pag+"?codigoProducto="+codigoProducto;
	   
	  var valor = lanzarVentana(pag,600,400);
	  
		if(valor != undefined) {
		
			if(codigoProducto != null)		
				setValue(codProducto, valor[0]);				  
	  
	  		if (idProducto != null)
	  			setValue(idProducto, valor[1]);

	  		if (descProducto != null)
	  			setValue(descProducto, valor[2]);
  
  	}

	}