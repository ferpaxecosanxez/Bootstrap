var imgMenos = new Image();
imgMenos.src = imgPath + "ico-.gif";
var imgMas = new Image();
imgMas.src = imgPath + "icoExpand.gif";

function showHideNodo(pID)   {
	var obj = document.getElementById(pID);
	
	
	var vis = (obj.currentStyle.getAttribute('display') != "block") ? "block" : "none";
  var img = document.getElementById("img" + pID.substr(2));
  if(vis == "block")
    img.src = imgMenos.src
  else
    img.src = imgMas.src
    
	document.getElementById(pID).style.display = vis;
	
	
	
	
	var temp = new Array();
	temp = pID.split('.');
	
	var longitud = temp.length - 1;

		var vis2 = null;		
		if(vis == "block"){
		
			vis2 = "none";
		
		}else if (vis == "none"){
		
			vis2 = "block";
		}
	
	if(temp.length == 2){		
		//riesgo
		var idRiesgo1;
		idRiesgo1 = "reservaTotalRi" + temp[longitud];
		
		var idRiesgo2;
		idRiesgo2 = "pagoTotalRi" + temp[longitud];
		
		var idRiesgo3;
		idRiesgo3 = "recobroTotalRi" + temp[longitud];
		
		var idRiesgo4;
		idRiesgo4 = "costeTotalRi" + temp[longitud];
		
		
		document.getElementById(idRiesgo1).style.display = vis2;
    	document.getElementById(idRiesgo2).style.display = vis2;
		document.getElementById(idRiesgo3).style.display = vis2;
		document.getElementById(idRiesgo4).style.display = vis2;
	
	}else if(temp.length == 3){	
		//tramite
		
		var idTr1;
		idTr1 = "reservaTotalTr" + temp[longitud];
		
		var idTr2;
		idTr2 = "pagoTotalTr" + temp[longitud];
		
		var idTr3;
		idTr3 = "recobroTotalTr" + temp[longitud];
		
		var idTr4;
		idTr4 = "costeTotalTr" + temp[longitud];
		
		
		document.getElementById(idTr1).style.display = vis2;
    	document.getElementById(idTr2).style.display = vis2;
		document.getElementById(idTr3).style.display = vis2;
		document.getElementById(idTr4).style.display = vis2;
	
	}
	
	
	
	
	
}

var elmAnterior = new Object();

function highLight(pObj)	{ 
  var obj = document.getElementById(pObj);
  if(elmAnterior.obj != null)
    elmAnterior.obj.className = elmAnterior.clase;
    
  elmAnterior.obj = obj;
  elmAnterior.clase = obj.className;
  obj.className = "highlight";
}