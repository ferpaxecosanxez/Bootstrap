 /* Funcion para desmarcar una lista */
  function desmarcarLst(numObjetos, lstObjetos){
    for(var i=0; i< lstObjetos.length; i++){
     lstObjetos[i].checked = false;
    }
	numObjetos = 0; 
	return numObjetos; 
  } 
       
  /* Funcion para actualizar las listas */
  function actualizarLst(pObjeto,numObjetos){
    if(pObjeto.checked == true){
      numObjetos++;
    }
    if(pObjeto.checked == false) {
      numObjetos--;
    }
    return numObjetos;
  }
    
  /* Funcion para tratar las listas: solo un elto chequeado */
  function actualizarUnoLst(pObjeto,numObjetos,lstObjetos){
    if(pObjeto.checked == true){
      for(var i=0; i< lstObjetos.length; i++){
      	if(lstObjetos[i].value != pObjeto.value){
      		lstObjetos[i].checked = false;
      	}
      }
	 numObjetos = 1;    
    }
    else{
      for(var i=0; i< lstObjetos.length; i++){
      	lstObjetos[i].checked = false;
      }
	 numObjetos = 0;      
    }
    return numObjetos;  
  }
  
  /* Funcion para enviar los datos */
  function enviarLstDatos (lstObjetos,numObjetos){
    var lstDatos = new Array(numObjetos);
     var num = 0;
    for(var i=0;i< lstObjetos.length; i++){
      if(lstObjetos[i].checked == true){
	      lstDatos[num] = lstObjetos[i].value;
    	  num++;
      }    
    }
     return lstDatos;  
  }
  
  
     function desmarcarTodos(form) {
            var campos = form.elements;
            var camposLength = campos.length;
            for (var i= 0;i < camposLength; i++) {
               switch(campos[i].type) {
                  case "checkbox":
                     campos[i].checked = false;
                     break;
               }
            }
         }

         function marcarTodos(form) {
      	    var campos = form.elements;
            var camposLength = campos.length;
            for(var i= 0;i < camposLength; i++) {
               switch(campos[i].type) {
                  case "checkbox":
                     campos[i].checked = true;
                     break;
               }
            }
         }