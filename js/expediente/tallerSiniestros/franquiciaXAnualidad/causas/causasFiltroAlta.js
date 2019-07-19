/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA CAUSAS ASOCIADAS A FRANQUICIA FILTRO ALTA
 */

    function comprobarDatos() {
        if (document.getElementById('idFamilia').value != "" || 
            document.getElementById('idProducto').value != ""){
          submitForm(document.forms[0],null,'iAreaTrabajo');
        } else {
          alert(mensaje);
        }
	}
    
    
    /* Codigo JScript que se ejecuta al terminar de cargarse la pagina 	*/
	/* y que activa los radio buttons. 						*/
    window.onload = function()	{
		if (document.getElementById('criterioSeleccion').value == "Producto"){
			//se activa el radio button de producto
			document.forms(0).rbProducto.checked = "true";
			chequearFiltroCXF(2,'rbFamilia','rbProducto','idFamilia','codigoProducto','idProducto','cIdFamilia','cCodProdComponente');
		}else{
			//se activa el radio button de familia
			document.forms(0).rbFamilia.checked = "true";
			chequearFiltroCXF(1,'rbFamilia','rbProducto','idFamilia','codigoProducto','idProducto','cIdFamilia','cCodProdComponente');
			
		}	
    }