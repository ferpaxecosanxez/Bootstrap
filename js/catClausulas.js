function busquedaFactor(pag){
  var valor = lanzarVentana(pag,650,530);
  if(valor != undefined) {
	if(valor[1]==0){
	
	    tinyMCE.execInstanceCommand("clausulas.texto","mceInsertContent",false," {#"+valor[0]+"} ");
			
	//tinyMCE.activeEditor.insertContent(" #"+valor[0]+" ");
		//_insertar(elEditor, " #"+valor[0]+" ");
		setValue("clausulas.texto", document.getElementById("clausulas.texto").value + " {#"+valor[0]+"} ");
	}
	if(valor[1]==1){
	  tinyMCE.execInstanceCommand("clausulas.texto","mceInsertContent",false," {@"+valor[0]+"} ");
	//tinyMCE.activeEditor.insertContent(" @"+valor[0]+" ");
		//_insertar(elEditor, " @"+valor[0]+" ");		
		setValue("clausulas.texto", document.getElementById("clausulas.texto").value + " {@"+valor[0]+"} ");
	}
  }
}		

function aceptarClausula(){
   // Para la correcta validacion de struts, seteamos el 
   // valor en los campos que usen TinyMCE.   
   
   document.getElementById("clausulas.texto").value = tinyMCE.activeEditor.getContent();		
   submitFormMsg(document.forms[0],validateClausulasForm,'iAreaTrabajo', mensajeAlta);		
}	