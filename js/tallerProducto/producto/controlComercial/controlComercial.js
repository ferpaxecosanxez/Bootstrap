	// Variables globales 
	var botonAnadir="";
	var botonModificar="";
	var botonEliminar="";
	var campoTipo="";
	var campoDescripcion="";
	
	function submitFormMultiPart(){

		return true;

	}
	
	function getIndex(menu,valor){
    	  result = -1;
    	  index = 0;
    	  while(index < menu.length && result == -1){
    	    if(menu.options[index].value == valor){
    	    	result = index;
    	    }else{
    	      index++;
    	    }
    	  }
    	return result;
	}
	
     var tdAnterior;
     function resetSelected(row)   {
        if(tdAnterior != null)  {
           cells = tdAnterior.cells;
           for(var i=0; i<cells.length; i++)   
              cells[i].className = "";  
        }
	    if(row != null)
	       tdAnterior = row;
	    else 
	       tdAnterior = null;
	 }
	 
	function cambiarBotones() {

		botonAnadir=document.getElementById("botonAnadir");
		
		botonModificar= document.getElementById("botonModificar");
		
		botonEliminar= document.getElementById("botonEliminar");
		
		campoTipo=document.getElementById("tipoUnidadOrg");
		
		campoTipo.value="";
		
		campoDescripcion= document.getElementById("descripcion");
		
		campoDescripcion.value="";

		var cadenaFondoBlanco, cadenaFondoAzul;
		
		if(tamLista == 0) {  
			
			botonAnadir.disabled = false;
			botonAnadir.className = "boton2";
			botonModificar.disabled = true;
			botonModificar.className = "boton2Disabled";
			botonEliminar.disabled = true;
			botonEliminar.className = "boton2Disabled";
		 
		} else { 
			
		   	botonAnadir.disabled = true;
			botonAnadir.className = "boton2Disabled";
			botonModificar.disabled = false;
			botonModificar.className = "boton2";
			botonEliminar.disabled = false;
			botonEliminar.className = "boton2";
		
			cadenaFondoBlanco = "tr" + document.getElementById("indice").value;
			cadenaFondoAzul = cadenaFondoBlanco + "F";
		
			if(document.getElementById(cadenaFondoAzul)) {
			   document.getElementById(cadenaFondoAzul).className="selectedRow";
			   document.getElementById(cadenaFondoAzul).onmouseout = function(){};
			   document.getElementById(cadenaFondoAzul).onmouseover = function(){};
			} else {
			   document.getElementById(cadenaFondoBlanco).className="selectedRow";
			   document.getElementById(cadenaFondoBlanco).onmouseout = function(){};
			   document.getElementById(cadenaFondoBlanco).onmouseover = function(){};
			}
		}      
	}
	
	function antesLimpiar() {
	  cadenaFondoBlanco = "tr" + document.getElementById("indice").value;
	  cadenaFondoAzul = cadenaFondoBlanco + "F";
	 
	  if(document.getElementById("indice").value) {
	if(document.getElementById(cadenaFondoAzul)) {
	   document.getElementById(cadenaFondoAzul).onmouseover = function(){rowOver(this, 'listadoOver')};
	   document.getElementById(cadenaFondoAzul).onmouseout = function(){rowOver(this,  'fdoColor2')};
	   document.getElementById(cadenaFondoAzul).className = "fdoColor2";
	} else {
	   document.getElementById(cadenaFondoBlanco).onmouseover = function(){rowOver(this, 'listadoOver')};
	   document.getElementById(cadenaFondoBlanco).onmouseout = function(){rowOver(this,  '')};
	   document.getElementById(cadenaFondoBlanco).className = "";
	    }   
	  }
	}
	
	function parameters() {
		   return '&codigo=' + getValue('prodTecPpal.canalAutorizadoView.codigo');
	 	}
	
    function buscaValoresControlComercial(elemento_id,elemento_desc, elemento_cod, elemento_tipo_uni_org , url, callback){
 
	   var valor = lanzarVentana(url, 700, 510, null, callback);

	    if(valor != undefined){
	       setValue(elemento_id, valor[0]);
	       setValue(elemento_desc, valor[2]);
	       setValue(elemento_cod, valor[1]);
	       setValue(elemento_tipo_uni_org, valor[3]);
	    }
    }
    
    function cargaVentanaUnidadOrganizativa(action){
    	buscaValoresControlComercial('prodTecPpal.canalAutorizadoView.idUnidadOrg',
		 		 'prodTecPpal.canalAutorizadoView.nombre','prodTecPpal.canalAutorizadoView.codigo',
		 		 'prodTecPpal.canalAutorizadoView.tipoUnidadOrganizativa',
		 		  action+'?vf=1&codigo='+
		 		  document.getElementById('prodTecPpal.canalAutorizadoView.codigo').value+'&origenControlComercial=1&lupa=1', null);
    }
    
    function enviaFormulario(action){
    	
    	document.forms[0].id="prodTecControlComercialForm";
    	
    	var form= document.getElementById("prodTecControlComercialForm");
    	
    	submitFormActionMsg(form,action,validateProdTecControlComercialForm,null,null);
    	
    	limpiar(form); 
    	
    }
    
    function limpiarFormulario(){
    	
    	var form= document.getElementById("prodTecControlComercialForm");
    	
    	resetSelected(); 
    	antesLimpiar();
    	limpiar(form); 
    	cambiarBotones();
    }
    