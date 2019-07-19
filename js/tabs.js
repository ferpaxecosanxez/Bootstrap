//funci?n que maneja la construcci?n de pesta?as: 
//su apariencia -activa, inactiva- y la carga de la p?gina correspondiente

function changeTab(tab,ruta,form)  {
  //si la tab activa es una tab de datos, cambio el action del form y lo env?o
  if(selectTab != tab.id && isDataTab(selectTab)){
  		form.action = ruta;
  		form.submit();  	
  }else{
	  //si la tab activa no es de datos redirigo hacia el destino indicado  	
    document.getElementById("iTabContent").src =  ruta     //carga la p?gina: "iTabContent es el marco"
  }
 
  document.getElementById(selectTab).className = "tab"    //le aplica el estilo inactivo a la pesta?a
  tab.className="activeTab";
  //devolvemos el id de la tab activa
  return tab.id;
}


function actualizarTab(tab)  {
  
  document.getElementById(selectTab).className = "tab"    //le aplica el estilo inactivo a la pesta?a
  tab.className="activeTab";
  
  //devolvemos el id de la tab activa
  return tab.id;
}


//Similar a "changeTab", usada para las validaciones
function changeTabMultiPart(tab,ruta,form)  {
  
  //si la tab activa es una tab de datos, cambio el action del form y lo env?o
  if(selectTab != tab.id && isDataTab(selectTab)){
  		form.action = ruta;
  		form.submit();  	
  }else{
	  //si la tab activa no es de datos redirigo hacia el destino indicado  	
    document.getElementById("iTabContent").src =  ruta     //carga la p?gina: "iTabContent es el marco"
  }
 
 
  document.getElementById(selectTab).className = "tab"    //le aplica el estilo inactivo a la pesta?a
  tab.className="activeTab";
  //devolvemos el id de la tab activa
 
  return tab.id;
}

//funcion que devuelve si la tab pasada es una tab de datos, y es necesario hecr submit del form
//el formato utilizado es <nombre tab>_DAT
function isDataTab(tabName){
	return tabName.indexOf("_DAT")== -1?false:true;
}

function changeTabIframe(zona,action,form,validateFunction,target)
    {
    
   
    
    	if (selectTab=="tab0_DAT")
    	{
    		validador = validaForm(form,validateFunction,target);
    		if (validador)
	    		return changeTab(zona,action,form);
	    	else
	    		return selectTab;
    	}
    	else
    	{
    		return changeTab(zona,action,form);
    	}
    }
 
 
//Cambia de iframe, ademas genera la validacion junto al atributo page de struts, haciendo su submit  
function changeTabIframeMultiPart(zona,action,form,validateFunction,target)
    {
   
    		validador = validaFormMultiPart(target);
    		if (validador)
	    		return changeTabMultiPart(zona,action,form);
	    	else
	    		return selectTab;
    	
    }    

    //funci?n para dar altura al frame
function layOutTabWdw(pFrame) {
  if(pFrame)
    document.getElementById("iTabContent").style.height = document.body.clientHeight - document.getElementById("cTabWindow").offsetTop - 70 + "px";
  else  {
    document.getElementById("cTabWindow").style.height = document.body.clientHeight - document.getElementById("cTabWindow").offsetTop - 70 + "px";
    document.getElementById("c"+activeLayer).style.display =  "block";
  }
}
    