function activaValores(object, valor, indice){
	nameImp = object + ".garanCobHandler.sortedElements["+indice+"].sublimiteImp";
	namePorc = object + ".garanCobHandler.sortedElements["+indice+"].sublimitePorc";
	
	if(valor==1){
		document.getElementById(nameImp).readOnly=false;
		document.getElementById(namePorc).value="";
		document.getElementById(namePorc).readOnly=true;
	}else if(valor==2){
		document.getElementById(nameImp).value="";
		document.getElementById(nameImp).readOnly=true;
		document.getElementById(namePorc).readOnly=false;		
	}else{
		document.getElementById(nameImp).value=document.getElementById(namePorc).value="";
		document.getElementById(nameImp).readOnly=true;
		document.getElementById(namePorc).readOnly=true;				
	}
}

function submitFormActionMsgCob (form,action,validateFunction,target, msg, msgerror){
      validado = true;
      
      if (validateFunction != null){
         try{
          validado = validaForm(form,validateFunction,target);
         }catch(e){
            alert(msgerror);
            validado = false;
         }
      }
      form.action = action;
      if (target != null){
         form.target = target;
      }   
      
      if ((validado)&& (msg != null) && (confirm(msg))) 
      {     	
      	  
      	form.submit();
      }	 
    }

function ocultaBotonAceptar(){
	document.getElementById('defectoDiv').style.display='none';
}

function pintaNivel(valor){
	if (valor ==2)	{
		document.getElementById('tdCob1').style.display = "block";
		document.getElementById('tdCob2').style.display = "block";
	} else {
		document.getElementById('tdCob1').style.display = "none";
		document.getElementById('tdCob2').style.display = "none";
	}
}

function anadirGarantia(pag, action){

	var valor = lanzarVentana(pag,600,400);
	
		if(valor) 
	  	{
	  		var actionIni;
	  		actionIni = document.forms[0].action;
	  		document.forms[0].action = action;
	  		document.forms[0].submit();
	  		document.forms[0].action = actionIni;
		}
}

function mostrarFranq(index) {
     if(index == 1) {
        showHide('divFranquicia1',true);
     } else if (index == 2)  {
        showHide('divFranquicia1',false);
     } else {
        showHide('divFranquicia1',false);
     }
  }