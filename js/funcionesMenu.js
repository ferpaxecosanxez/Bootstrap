function rolli(pObj, pOut) {
  if(pOut)
    pObj.className = "menuItem"
  else
    pObj.className = "menuOver"
}

function cargaPag(pPag, pBol, literal) {
	if((pPag.indexOf("http")==-1) && (pPag.indexOf("www.")==-1))	{
		muestraCargaComun();
		top.window.frames["iAreaTrabajo"].location = pPag;
    	parent.writeSituation(literal, pPag, true);
	} else {
		if (pPag.lastIndexOf("http")!=-1) { 
		     ventana = window.open(pPag.substring(pPag.lastIndexOf("http")));
		} else if (pPag.lastIndexOf("www.")!=-1) 
			ventana = window.open('http://'+pPag.substring(pPag.lastIndexOf("www.")));
	}
}


//funcion para gestion del menu
var nivelActivo;
function showHide(pNivel, pBol)   {
  var id = ("id_"+pNivel)
  var obj = document.getElementById(id).style;
  var capasHijas = document.getElementById(id).getElementsByTagName("DIV");
  
  obj.display = (obj.display != "block") ? "block" : "none";
  
  if(obj.display == "none"){
     for (var i=0; i < capasHijas.length; i++)   {
        capasHijas[i].style.display = "none"
     }
     if(pBol != true) {//no viene de la recursividad
      var itemMenu = "";
      var total = pNivel.split(".").length-1
      for(var i=0; i<total; i++) {
        itemMenu += nivelActivo.split(".")[i];
        itemMenu += (i < total-1) ? "." : "";
      }
      nivelActivo = itemMenu;
    }
  } else if(obj.display == "block")  {
  
    var nivelAnterior = nivelActivo
    nivelActivo = pNivel
    
    if(nivelAnterior != null && nivelAnterior.length >= nivelActivo.length)  {
        showHide(nivelAnterior.substr(0, nivelActivo.length), true);
    }
  }

}

  function cambiarIframe(context)	{
    //cambia el iframe derecho de la pagina principal para que aparezca
    //el arbol en lugar de la agenda
    var localizacion = "" + window.parent.frames[2].location;
    var indice = localizacion.indexOf('monitor');
	  if ( indice > -1) {
		  var agenda = context + "/agenda/miagenda/consulta/pendientes.do"
	    window.parent.frames[2].location = agenda;
	    //top.window.document.getElementById("agTituloGif").src = top.window.imgAgTitulo.src;
		top.window.document.getElementById("agTituloGif").innerHTML = top.window.labelAgenda;
	    //top.window.document.getElementById("mostrarAgAr").src = top.window.imgSinImagen.src;
	  }
  }  
  
function setColorItemMenuVisited() {
	setColorItemMenuLevel_1();
	setColorItemMenuLevel_2();
	setColorItemMenuLevel_3();
}

/**
 * Aplica efectos a nivel 1, es decir, cuando el usuario hace click en: <br>
 * Menú : Item > Item <b>nvl 1</b>
 * <p>
 * Si es un item que no contiene hijos, quitamos estilo al último item clickado
 * de cualquier nivel para activar el actual. También cerramos todos los menús
 * abiertos, ya que cuando el usuario vuelva a abrir el menú, podrá identificar
 * el item clickado.
 * <p>
 * Si es un item que contiene submenú, automáticamente cierra todos los submenús
 * de todos los niveles para abrir el actual.
 */
function setColorItemMenuLevel_1() {
	jQuery('.item-level-1').on('click', function () {
		// Cerramos todos los submenú abiertos.
		jQuery('.item-level-1.dropdown-toggle.actived').not(this).trigger('click');
		jQuery('.item-level-1').not(this).removeClass('actived');
		closeSubMenuLevel_2();
		
		if (jQuery(this).hasClass('item-no-children')) {
			// Item sin submenú.
			jQuery('.item-no-children').removeClass('visited');
			jQuery(this).addClass('visited');
		} else {
			// Se abre menú y activamos item.
			jQuery(this).toggleClass('actived');
		}
	});
}

/**
 * Aplica efectos a nivel 2, es decir, cuando el usuario hace click en: <br>
 * Menú : Item > Item nvl 1 > Item <b>nvl 2</b>
 * <p>
 * Sigue la misma funcionalidad que los items de nivel 1, solo que a nivel de
 * implementación tenemos que controlar el evento 'collapse' de forma manual ya
 * que de forma automática no funciona porque ya se usa en el nivel 1.
 */
function setColorItemMenuLevel_2() {
	jQuery('.item-level-2').on('click', function () {
		// Cerramos menús del nivel 2.
		jQuery('.item-level-2.dropdown-toggle.actived').not(this).trigger('click');
		jQuery('.item-level-2').not(this).removeClass('actived');
		
		if (jQuery(this).hasClass('item-no-children')) {
			// Item sin submenú.
			jQuery('.item-no-children').removeClass('visited');
			jQuery(this).addClass('visited');
		} else {
			// Se abre menú y activamos item.
			jQuery(this).toggleClass('actived');
			jQuery(this).next().collapse('toggle');
			
			// Asignamos estado de submenú.
			if(jQuery(this).hasClass('actived')) {
				jQuery(this).attr('aria-expanded', 'true');
			} else {
				jQuery(this).attr('aria-expanded', 'false');
			}
		}
	});
}

/**
 * Aplica efectos a nivel 3, es decir, cuando el usuario hace click en: <br>
 * Menú : Item > Item nvl 1 > Item nvl 2 >Item <b>nvl 3</b>
 * <p>
 * Este item es el último del nodo, por tanto, solo existen items sin hijos.
 */
function setColorItemMenuLevel_3() {
	jQuery('.item-level-3').on('click', function () {
		// Quitar último item clickado.
		jQuery('.item-no-children').removeClass('visited');
		// Dar estilo al nuevo click que abre página.
		jQuery(this).addClass('visited');
	});
}

/**
 * Método que se encarga de cerrar el submenú de nivel 2 cuando el usuario hace
 * click en un item de nivel 1 que contiene submenú.
 */
function closeSubMenuLevel_2() {
	// Cerrar submenús de nivel 2.
	jQuery('.item-level-2.dropdown-toggle.actived').next().collapse('hide');
	jQuery('.item-level-2.dropdown-toggle.actived').attr('aria-expanded', 'false');
	jQuery('.item-level-2').removeClass('actived');
}

