
var imgMenos = new Image();
imgMenos.src = imgPath + "/ico-.gif";
var imgMas = new Image();
imgMas.src = imgPath + "/icoExpand.gif";

var nivelActivo;
var elmAnterior = new Object();

function showHideMenu(pNivel, pBol)   {
  var id = ("id_"+pNivel);
  var clase = "arbolSeleccionado";
  
  try {
    if(pNivel.indexOf(".") != -1) {
      var obj = document.getElementById(id).style;
      var img =  document.getElementById("img_"+pNivel);
      var mostrar = obj.display = (obj.display != "block") ? "block" : "none";
      clase = "arbolSeleccionado";
    } else { //compañía padre
      var mostrar = "none"
      var img = "nulo";
      clase = "arbolPadreSeleccionado"
    }
    iluminarObj(clase);
    switch (mostrar)  {  
      case "none":
        plegarCapas(pNivel, img);
        //hay que corregir el valor de nivelActivo
        if(!pBol) {//no viene de la recursividad
          var itemMenu = "";
          var total = pNivel.split(".").length-1
          for(var i=0; i<total; i++) {
            itemMenu += nivelActivo.split(".")[i];
            itemMenu += (i < total-1) ? "." : "";
          }
          nivelActivo = itemMenu;
        }
        break;
      case "block":
        img.src = imgMenos.src;

        var nivelAnterior = nivelActivo;
        nivelActivo = pNivel;

        if(nivelAnterior != null
          && nivelAnterior.split(".").length >= nivelActivo.split(".").length
          && nivelAnterior != nivelActivo)  {
          var itemMenu = "";
          for(var i=0; i < nivelActivo.split(".").length; i++) {
            itemMenu += nivelAnterior.split(".")[i];
            itemMenu += (i < nivelActivo.split(".").length-1) ? "." : "";
          }
          showHideMenu(itemMenu, true);
        }
        break;
      }
    } catch(e)  {
      if(nivelActivo != null) {
        if(nivelActivo.split(".").length >= pNivel.split(".").length
          && nivelActivo != pNivel) {
          if(nivelActivo.split(".").length > pNivel.split(".").length)  {
            var itemMenu = "";
            var total = pNivel.split(".").length;
            for(var i=0; i<total; i++) {
              itemMenu += nivelActivo.split(".")[i];
              itemMenu += (i < total-1) ? "." : "";
            }
            nivelActivo = itemMenu;
          }
          showHideMenu(nivelActivo);
        } else  {
          iluminarObj(clase);
        }
      } else  {
        iluminarObj(clase);
      }
    }
  }
  function plegarCapas(id, img)  {
    var capasHijas = document.getElementById("id_" + id).getElementsByTagName("DIV");
    if(img != "nulo") {
      var imagen =  (img != null) ? img : document.getElementById("img_"+id);
      imagen.src = imgMas.src;
    }
    for (var i=0; i<capasHijas.length; i++)   {
      if(capasHijas[i].id.substr(0,2) == "id") {
        capasHijas[i].style.display = "none";
      }
      var imgs = capasHijas[i].getElementsByTagName("IMG");
      for(var k=0; k<imgs.length; k++)  {
        if(imgs[k].id != "nulo")
          imgs[k].src = imgMas.src;
      }
    }
  }
  
  function iluminarObj(pClase)	{
	var obj = null;
	
    // Para que Firefox pueda funcionar como Internet Explorer
	if(window.event != undefined) {
		// en el caso de que el click se haya hecho sobre la imagen (+/-)
		obj = (event.srcElement.tagName == "IMG") ? event.srcElement.parentNode:event.srcElement;
		event.cancelBubble = true;
	} else {
		// en el caso de que el click se haya hecho sobre la imagen (+/-)
		if(window.evento) {
			obj = (window.evento.target.tagName == "IMG") ? window.evento.target.parentNode : window.evento.target;
			window.evento.stopPropagation();
		}
	}
	
    if(elmAnterior.obj != null)
      elmAnterior.obj.className = elmAnterior.clase;
    
    elmAnterior.obj = obj;
    elmAnterior.clase = obj.className;
    obj.className = pClase;
  }
  
