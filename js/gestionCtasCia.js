	 


function submitSimple(form,action, operacion){
	     
		 // A --> Anadir
		 // E -> Anular
		 // R --> Rehabilitar
	     // M --> Modificar
		 
		 if (operacion == 'A') {
			 
			 // Debe estar seleccionada una cuenta en el combo.
			 var indice = this.document.getElementById("idCuentaCia").selectedIndex;
			 var idCuentaCia = this.document.getElementById("idCuentaCia").options[indice].value;
			 
			 //alert(idCuentaCia);
			 
			 if (idCuentaCia == null  || idCuentaCia == '') {
				 alert(msgSeleccionCuenta);
				 return false;
			 }
		 } else {
			 
			 // Debe contener el valor del id de la cuenta seleccionada.
			 if (form.idCuentaCia.value == null || form.idCuentaCia.value == '') {
				 alert("ERROR");
				 return false;
			 }
			 
		 }
		 
		 // Si todo va bien realizamos el submit
		  if (form != null && action != null) {
			  form.action= action;
		      form.submit();  
		  }
	 }

     function seleccionFila(fila, form) {
    	 
    	 // Obtenemos el valor del id de la cuenta.
    	 var celdas = fila.cells;
    	 var celValor = celdas[0];
    	 var inputs = celValor.getElementsByTagName("input");
    	 var valor = inputs[0].value;
    	 // Asignamos los class CSS
    	 selectRow(fila);
    	 // Seteamos el valor en el hidden
    	 form.ctaAsociadaSeleccionada.value = valor;
    	 
    	 this.document.getElementById("botonAnadir").disabled="disabled";
         this.document.getElementById("botonAnadir").className="boton2Disabled";
         // alert(valor);
    	 //alert(form.ctaAsociadaSeleccionada.value);
    	 
     }
     
     function limpiarValorSeleccion(form){
    	 // Limpiamos el valor de la fila seleccionada
    	 form.ctaAsociadaSeleccionada.value="";
    	 // Limpiamos el combo
    	 this.document.getElementById("idCuentaCia").selectedIndex = 0;
    	 // Reiniciamos los botones
    	 reiniciarBotones(form);
     }
	 
	 function habilitarBotonRehabilitar(){
       this.document.getElementById("botonHabilitar").disabled=false;
       this.document.getElementById("botonHabilitar").className="boton2";
       this.document.getElementById("botonEliminar").disabled=true;
       this.document.getElementById("botonEliminar").className="boton2Disabled";
       this.document.getElementById("botonModificar").disabled=true;
       this.document.getElementById("botonModificar").className="boton2Disabled";


     }
     
     function deshabilitarBotonRehabilitar(){      	
       this.document.getElementById("botonHabilitar").disabled=true;
       this.document.getElementById("botonHabilitar").className="boton2Disabled";     
       this.document.getElementById("botonEliminar").disabled=false;
       this.document.getElementById("botonEliminar").className="boton2";
       this.document.getElementById("botonModificar").disabled=false;
       this.document.getElementById("botonModificar").className="boton2";
     }
     
     function reiniciarBotones(form){    	 
     
	      this.document.getElementById("botonHabilitar").disabled="disabled";
	      this.document.getElementById("botonHabilitar").className="boton2Disabled";
	
	     
	      this.document.getElementById("botonEliminar").disabled="disabled";
	      this.document.getElementById("botonEliminar").className="boton2Disabled";
	      
	      this.document.getElementById("botonModificar").disabled="disabled";
	      this.document.getElementById("botonModificar").className="boton2Disabled";
	  
	      this.document.getElementById("botonAnadir").disabled="";
	      this.document.getElementById("botonAnadir").className="boton2";
      
        
      }
     
     function pordefecto(indUso){
			
			this.document.getElementById("ctaBanco.indUso").value = indUso;
			if(indUso == '1'){
				this.document.getElementById("ctaBanco.indUso").checked = 'true';
			}
				
	 }	
			
     

