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