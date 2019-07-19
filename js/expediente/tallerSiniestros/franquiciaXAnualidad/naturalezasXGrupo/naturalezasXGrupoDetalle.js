/*
 * FUNCIONES JAVASCRIPT COMUNES DE LA OPERATIVA LISTA NATURALEZAS X GRUPO DETALLE
 */

   window.onload = function()	{
	   if (document.getElementById('naturalezaXGrupo.ctlEstado') != null && document.getElementById('naturalezaXGrupo.ctlEstado').value == '1'){
			document.getElementById('BotonAnular').disabled = false;
			document.getElementById('BotonRehabilitar').disabled = true;
		}else if (document.getElementById('naturalezaXGrupo.ctlEstado') != null && document.getElementById('naturalezaXGrupo.ctlEstado').value == '0'){
			document.getElementById('BotonAnular').disabled = true;
			document.getElementById('BotonRehabilitar').disabled = false;
		}
   }
   


	
  