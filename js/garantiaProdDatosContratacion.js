/***************** FUNCIONES GENERALES *************************************
Almaceno en este fichero las funciones javascript contenidas dentro de la 
página garantiaProdDatosContratacion.jsp
****************************************************************************/


function busquedaFactor(pag)
         {
              var valor = lanzarVentana(pag,600,400);

              if(valor != undefined) {
                  setValue("garantiaView.idFactorMultiplicador", valor[2]);
                  setValue("garantiaView.factorMultiplicador", valor[0]);
                  setValue("garantiaView.tipoFactorMultiplicador", valor[1]);
                  document.getElementById('descFactor').innerText=valor[3];
              }
      }
  
  function seleccionarRutina(pag) 
		 {
		
          var valor = lanzarVentana(pag,600,530)
          if(valor != null)	{
	          setValue("garantiaView.codRutiCalcCapi",valor[0]);
          setValue("garantiaView.idRutiCalcCapi",valor[2]);
        
     }
  }
  
        
   function mostrar1(value) {
   
		//alert(value);
   		
   		objDepurCombo = document.forms[0].elements['garantiaView.tipoDepurCapital'][0];
   		objDepurHidden = document.forms[0].elements['garantiaView.tipoDepurCapital'][1];       		
   		//objCapModiCombo = document.forms[0].elements['garantiaView.tipoCapitalMod'][0];
   		//objCapModiHidden = document.forms[0].elements['garantiaView.tipoCapitalMod'][1];
   		
   		//objCapModiCombo.disabled=false;
   		//objCapModiHidden.disabled=true;
   		objDepurCombo.disabled=false;
   		objDepurHidden.disabled=true;
   		
        showHide('tdRutina1',false);
        showHide('tdRutina2',false);
        showHide('tdCap1',false);
        showHide('tdCap2',false);
        showHide('tdCap3',false);
        showHide('tdCap4',false);
        showHide('tdCap5',false);
        showHide('tdCap6',false);
     
     if (value == 4)  {
     	//SUBORDINADO GARANTIA
        showHide('tdCap1', true);
        showHide('tdCap2', true);
        //seleccionCombo(objCapModiCombo,1);
   		objDepurCombo.disabled=true;
   		objDepurHidden.disabled=false;
   		//objDepurHidden.value="";       
        //objCapModiCombo.disabled=true;
   		//objCapModiHidden.disabled=false;
     } else if (value == 5)  {
     	//SUBORDINADO  CARACTERISTICA
        showHide('tdCap3', true);
        showHide('tdCap4', true);
        //seleccionCombo(objCapModiCombo,1);
   		objDepurCombo.disabled=true;
   		objDepurHidden.disabled=false;
   		//objDepurHidden.value="";       
    }else if(value == 6) {
    	//SUBORDINADO SUMA ASEG
        showHide('tdCap5',true);
        showHide('tdCap6',true);
        //seleccionCombo(objCapModiCombo,1);
   		objDepurCombo.disabled=true;
   		objDepurHidden.disabled=false;
   		//objDepurHidden.value="";       
     }else if(value == 7) {
     	//RUTINA
        showHide('tdRutina1',true);
        showHide('tdRutina2',true);  
     }else if(value == 3){
     	//LISTA
     	//seleccionCombo(objCapModiCombo,1);
     	seleccionCombo(objDepurCombo,3);
        //objCapModiCombo.disabled=true;
   		//objCapModiHidden.disabled=false;
   		objDepurCombo.disabled=true;
   		objDepurHidden.disabled=false;       		
   		objDepurHidden.value="3";       		
     }else{
     	if(isNaN(varAux)){
        	objDepurCombo.options.selectedIndex=0;
        	varAux = "";
        }
        //objCapModiCombo.options.selectedIndex=0;                                 
     }
     
     mostrarCamposImportes();
       
  }  
  
  function seleccionCombo(objCombo,valor){
  	for(i=0;i<objCombo.options.length;i++){
  		if(objCombo.options[i].value==valor)
		{
			objCombo.options[i].selected=true;
			return;
		}
  	}
  }
  
  function camposImp(valorMuestra){
		showHide('icf',valorMuestra);
		showHide('icr',valorMuestra);
        showHide('pcf',valorMuestra);
        showHide('pcr',valorMuestra);
  }
  
  function camposLista(valorMuestra){
	showHide('divValores',valorMuestra);
    showHide('impText',valorMuestra);            
    showHide('impForm',valorMuestra);
    showHide('impData',valorMuestra);            
	showHide('porcText',valorMuestra);            
	showHide('porcForm',valorMuestra);            
    showHide('porcData',valorMuestra);            
  }      
  
  function mostrarCamposImportes(){
  	objCapital = document.forms[0].elements['garantiaView.tipoCapital'];
  	objDepurCapital = document.forms[0].elements['garantiaView.tipoDepurCapital'][0];
  	//alert(objDepurCapital.options.selectedIndex)
  	//alert(objDepurCapital.options[objDepurCapital.options.selectedIndex].value)
  	valorCapital = objCapital.options[objCapital.options.selectedIndex].value;
  	if(objDepurCapital.options.selectedIndex!=-1)
      	valorDepurCapital = objDepurCapital.options[objDepurCapital.options.selectedIndex].value;
  	else
	  	valorDepurCapital = ""

     if(valorCapital == 1 || valorCapital == 5) {//importe
     	if(valorDepurCapital==2){//fijo
     		camposLista(false);
     		camposImp(false);
     		showHide('icf',true);	     	
     	}else if(valorDepurCapital==4){//rango
     		camposLista(false);
     		camposImp(false);
     		showHide('icr',true);	     	
     	}else if(valorDepurCapital==3){//lista
	     	camposImp(false);
     	
		    showHide('divValores',true);
		    
            showHide('impText',true);            
            showHide('impForm',true);
            showHide('impData',true);            

            showHide('porcText',false);            
			showHide('porcForm',false);            
            showHide('porcData',false);           	     	
     	}else{//libre
     		camposLista(false);
     		camposImp(false);	     	
     	}             
     } else if(valorCapital == 2 || valorCapital == 6){//porcentaje
     	if(valorDepurCapital==2){//fijo
     		camposLista(false);
     		camposImp(false);
     		showHide('pcf',true);	     	
     	}else if(valorDepurCapital==4){//rango
     		camposLista(false);
     		camposImp(false);
     		showHide('pcr',true);	     	
     	}else if(valorDepurCapital==3){//lista
	     	camposImp(false);
     	
		    showHide('divValores',true);
		    
            showHide('impText',false);            
            showHide('impForm',false);
            showHide('impData',false);            

            showHide('porcText',true);            
			showHide('porcForm',true);            
            showHide('porcData',true);           	     	
     	}else{//libre
     		camposLista(false);
     		camposImp(false);	     	
     	}                             
     } else{//oculto todas las capas
       	camposLista(false);
     	camposImp(false);	     	
     }
  	
  }
 
function submitFormMultiPart(){
	
	return validateGarantiaForm(document.getElementById('garantiaForm'));

}

function cargaCombos(nombreCombo,valor){
	objCombo = document.forms[0].elements[nombreCombo];
	valorDepurCapital = objDepurCapital.options[objDepurCapital.options.selectedIndex].value;	    	
	
	for(i=0;i<objCombo.options.length;i++){
		if(objCombo.options[i].value==valor){
			objCombo.options[i].selected=true;
			return;
		}
	}
}
		
function unificaDepuracion(valorCalculo){

	//alert(document.getElementById('garantiaView.tipoDepurCapital').value);
					
	if (valorCalculo==2){
		if(document.getElementById('garantiaView.tipoDepurCapital').value!=2){
			//alert("A - ambos deben deber ser iguales ");
			setValue("garantiaView.tipoDepurCapital",valorCalculo);	
		}
	}
	if (valorCalculo!=2){
		if(document.getElementById('garantiaView.tipoDepurCapital').value==2){
			//alert("B - ambos deben deber ser iguales");	
			setValue("garantiaView.tipoDepurCapital","0");
		}
	}
}
		
function unificaCalculo(valorDepuracion){
	if (valorDepuracion==2){
		if(document.getElementById('garantiaView.tipoCalculoCapital').value!=2){
			alert('<bean:message key="jsp.garantiaPT.alta.dc.aIguales"/>');
			setValue("garantiaView.tipoCalculoCapital",valorDepuracion);	
		}
	}
	if (valorDepuracion!=2){
		if(document.getElementById('garantiaView.tipoCalculoCapital').value==2){
			alert('<bean:message key="jsp.garantiaPT.alta.dc.bIguales"/>');
			setValue("garantiaView.tipoCalculoCapital","0");
		}
	}
		
}