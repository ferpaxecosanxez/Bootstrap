/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA CLAVES ENTRADA LD FOTOPERITACIÓN
 */

window.onload = function()	{
	if (document.getElementById('criterioSeleccion').value == "Producto") {
		document.forms(0).rbProducto.checked = "true";
		chequearFiltro(2,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	} else {
		document.forms(0).rbFamilia.checked = "true";
		document.forms(0).idProducto.value="";
		chequearFiltro(1,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	}
	
	setValue('idProducto',null);		
}

function botonLimpiar(){
	limpiar(document.forms[0],camposNoTocar);
	chequearFiltro(1,'rbFamilia','rbProducto','idFamiliaProducto','codigoProducto','cFamiliaProducto','cCodigoProducto');
}

/* Funcion para la busqueda de producto: ventana emergente invocada por las lupas de producto */
function buscarProductoLDFOT(pagInicial,pagBusqueda,codProducto,idProducto){
  var pag;
  var codigoProducto = document.getElementById(codProducto).value;	
  var identificadorProducto = document.getElementById(idProducto).value;	
	  
  // si se ha introducido algun valor en codigo o descripcion, se deberá ejecutar directamente la consulta
  if(codigoProducto=="")
    pag = pagInicial;  
  else pag = pagBusqueda;
  
  pag= pag+"?codigoProducto="+codigoProducto;
   
  var valor = lanzarVentana(pag,600,400);
  if(valor != undefined) 
  {
	if(codigoProducto != null)		
		setValue(codProducto, valor[0]);				  
	if(identificadorProducto != null)		
		setValue(idProducto, valor[1]);				  
  }
}