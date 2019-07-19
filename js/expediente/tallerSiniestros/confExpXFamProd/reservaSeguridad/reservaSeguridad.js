
/*
 * FUNCIONES JAVASCRIPT PARA LA OPERATIVA CONFIGURACION EXP FAMILIA PROD: RESERVA SEGURIDAD
 */

 
  /* Funcion para iniciar las pantallas con la familia seleccionada */
 function iniciarDatos(valorNo) {
    
    var swBuscarFamilia = document.getElementById('swBuscarFamilia').value;
	if (swBuscarFamilia == valorNo){
	  //se activa el radio button de producto
	  document.forms(0).rbProducto.checked = "true";
	  chequearFiltro(2,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	}else{
	  //se activa el radio button de familia
	  document.forms(0).rbFamilia.checked = "true";
	  chequearFiltro(1,'rbFamilia','rbProducto','idFamiliaProd','codigoProducto','cFamiliaProducto','cCodigoProducto');
	}
 }
 
  /* Funcion para la seleccion de productos */
  function parametersProducto() {      
    return '&codigo=' + getValue('codigoProducto') + '&descripcion=' + getValue('desProducto');
  }  

  /* Funcion para los conceptos de reserva */
  function gestionReservas(pObjeto){
    
    if(pObjeto.checked){
      showHideVis('cptoReserva', true);
    }else{
      showHideVis('cptoReserva', false);
    }
  }
  
  /* Funcion para los conceptos de reserva*/
  function getConceptosReserva(pag){
    
	lanzarVentana(pag, 600, 400);
  }  
 
 /* Funcion para seleccionar un determinado valor en un combo */
 function seleccionarCombosIndice(pObjeto, pIndex, form) {
  for (var i = 0; i < form.elements[pObjeto].length; i++) {
    if (form.elements[pObjeto].options[i].value == pIndex) {
      form.elements[pObjeto].options[i].selected = true;
    }
  }
 }
