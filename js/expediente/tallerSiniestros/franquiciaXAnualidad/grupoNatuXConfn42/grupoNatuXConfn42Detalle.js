/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA GRUPO NATURALEZA X TRAMITE
 */

   window.onload = function()	{
	   if (document.getElementById('grupoNatuXConfn42View.ctlEstado') != null && document.getElementById('grupoNatuXConfn42View.ctlEstado').value == '1'){
			document.getElementById('BotonAnular').disabled = false;
			document.getElementById('BotonRehabilitar').disabled = true;
		}else if (document.getElementById('grupoNatuXConfn42View.ctlEstado') != null && document.getElementById('grupoNatuXConfn42View.ctlEstado').value == '0'){
			document.getElementById('BotonAnular').disabled = true;
			document.getElementById('BotonRehabilitar').disabled = false;
		}
   }
   


	
  