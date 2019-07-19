function validateRutinaCalculo() {
	var codRutinaCalculo = document.getElementById("grupoFactores.rutinaCalculoView.codigo").value;	    		
	if (codRutinaCalculo == ""){
    	setValue("grupoFactores.rutinaCalculoView.id","");
	} else {
		busquedaRutinaCalculo(actionVentanaRutinas + '?idTipoRutina=3&codigo=' + codRutinaCalculo);
	}
}

function validateRutinaDepu(){
	var codRutinaDepu = document.getElementById("grupoFactores.rutinaDepuView.codigo").value;
	if (codRutinaDepu == ""){
		setValue("grupoFactores.rutinaDepuView.id","");
	} else {	
		busquedaRutinaDepuracion(actionVentanaRutinas + '?idTipoRutina=2&codigo=' + codRutinaDepu);
	}
}

function busquedaRutinaDepuracion(pag){
  var valor = lanzarVentana(pag,600,400);
  if(valor != undefined) {
		setValue("grupoFactores.rutinaDepuView.id",valor[2]);            
		setValue("grupoFactores.rutinaDepuView.codigo",valor[0]); 
  }
}		

function busquedaRutinaCalculo(pag){
  var valor = lanzarVentana(pag,600,400);
  if(valor != undefined) {
		setValue("grupoFactores.rutinaCalculoView.id",valor[2]);            
		setValue("grupoFactores.rutinaCalculoView.codigo", valor[0]);
  }
}