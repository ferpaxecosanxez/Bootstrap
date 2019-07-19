// Alta de factores

function seleccionFactores(action){
	var valor = lanzarVentana(action,600,400);
	if(valor){
		location.reload();
	}	
}

function agregarFactores(action){
	jQuery("#seleccionFactoresForm").attr('action', action);
	jQuery("#seleccionFactoresForm").submit();
	window.returnValue = true;
	window.close();
}

function saveFactores(action){
	jQuery("#factoresProdAltaForm").attr('action', action);
	jQuery("#factoresProdAltaForm").submit();
}

var camposNoTocar = ['pagina'];	
var arrayVentanaProducto = new Array("","codProdTec","desProdTec","idProdEfec","","fechaEfec");
var arrayVentanaFactor = new Array("codigoFactor","desFactor","","","","");

function establecerCodigoProducto(codigo)
{
	jQuery("#codProdTec").val(codigo);		
}

function getRiesgos(action){
	if(jQuery("#idProdEfec").val()!=''){
		jQuery("#filtroFactoresProdForm").attr('action', action);
		jQuery("#filtroFactoresProdForm").submit();
	}
}

function expValue(){
	jQuery("#exportacion").val("1");
} 