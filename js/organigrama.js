function muestraTreeItem(pDiv)  {//conmuta la visibilidad
  document.getElementById(pDiv).style.display = 
    (document.getElementById(pDiv).style.display != "block") ? "block" : "none"// : 
}
function muestraTreeItem_2(pDiv)  {//conmuta la visibilidad
  if (document.getElementById(pDiv).style.display != "block") 
    document.getElementById(pDiv).style.display = "block"
  return
}
var objIluminado = false;
function escribeInfo(pObj)  {
  if(pObj != null)  { //si se ha de quedar rersaltada la opción sobre la que se muestra información a la derecha
    if(objIluminado)
      objIluminado.className = "enlaceTxt"
    objIluminado = pObj
    pObj.className = "iluminado"
  }
  document.getElementById("info1").style.display = "block"
  document.getElementById("sInfo").innerHTML = pObj.innerHTML
}