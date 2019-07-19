/******************************************************************************* 
Javascript para dar altura a una capa con scroll, ejemplo en: 
gims-html_portalUsuario\jsp\produccion\cotizacionesProyectos\nuevaProduccion\
            CotizacionPolizaRapidaFiltro.html 
*******************************************************************************/
    function layOutCapaScroll()  {
      //cBody es una capa  que se abre por delante de todo y se cierra por 
      //detr?s de todo. De ella se extrae el alto total de la p?gina al que se 
      //resta lo que hay por delante y por debajo de la capa a la que se quiere dar altura.
      //Esta cantidad se extrae del espacio ?til en pantalla (document.body.offsetHeight)
      //y el resto se le aplica como alto a la capa con scroll...      
      
      var alturaPagina = document.getElementById("cBody").offsetHeight;          	 //altura real de la p?gina  
      var alturaPantalla = document.body.offsetHeight;                               //altura pantalla(iframe)      
      var alturaCapaScroll = document.getElementById("cTablaScrollGarantias").offsetHeight;   //altura construcci?n tablas
      var alturaRestoElm = alturaPagina - alturaCapaScroll;                          //altura del resto de elementos de la p?gina
      var alturaDisponible = alturaPantalla - alturaRestoElm;                        //espacio disponible en pantalla
      
      var capaDatos = document.getElementById("cDatosEco");                         //toda la cosntrucci?n de las tabals
      var capaTabla = document.getElementById("cTablaScrollGarantias");                      //tabla derecha con scroll horizontal
      var cabTablaIzq = document.getElementById("cCabTablaIzq");                    //cabecera tabla izquierda
      var cabTablaDcha = document.getElementById("cCabTablaDcha");                  //cabecera tabla derecha
      
      //alturaDisponible = (alturaDisponible > 300)? alturaDisponible : 300;
      capaDatos.style.height = alturaDisponible;
      capaTabla.style.height = alturaDisponible;
      
      capaDatos.onscroll = function()  {
         cabTablaIzq.style.top = parseInt(capaDatos.scrollTop);
         cabTablaDcha.style.top = parseInt(capaDatos.scrollTop);
         capaTabla.style.height = parseInt(alturaDisponible) +  parseInt(capaDatos.scrollTop);
         hideSelects_provisional('cCabTablaDcha');
      }
    }
    //funci?n que oculta los combos que quedan por debajo de una capa
    /****************************************************************/
    /* atenci?n: verificar con el general.js, la funci?n est? duplicada 
    verificar que son iguales y cargarse esta */
    /****************************************************************/
    var combosOcultos;
    function hideSelects_provisional(pCapa, iFrame)  {
      try {
        combosOcultos = new Array();
        var overDiv = document.getElementById(pCapa);
        var combos = document.getElementsByTagName('SELECT');  
        for(i = 0; i < combos.length; i++ )  {
          obj = combos[i];
          if( !obj || !obj.offsetParent ) {
            continue;
          }
          
          objLeft   = obj.offsetLeft;
          objTop    = obj.offsetTop;
          objWidth = obj.offsetWidth;
          objHeight = obj.offsetHeight;
          
          // Find the element's (select/applet) offsetTop and offsetLeft relative to the BODY tag.
          objParent = obj.offsetParent;
          while( objParent.tagName.toUpperCase() != "BODY" ) {
             objLeft  += objParent.offsetLeft;
             objTop   += objParent.offsetTop;
             objParent = objParent.offsetParent;
          }
           
          overDivLeft   = overDiv.offsetLeft;
          overDivTop    = overDiv.offsetTop;
          overDivWidth  = overDiv.offsetWidth;
          overDivHeight = overDiv.offsetHeight;
           
          // Find the element's offsetTop and offsetLeft relative to the BODY tag.
          overDivParent = overDiv.offsetParent;
          while( overDivParent.tagName.toUpperCase() != "BODY" )   {
             overDivLeft  += overDivParent.offsetLeft;
             overDivTop   += overDivParent.offsetTop;
             overDivParent = overDivParent.offsetParent;
          }
    
          if(
             ( objTop + objHeight )  >= ( overDivTop )                        &&
             ( objTop )              <= ( overDivTop + overDivHeight )        &&
             ( objLeft + objWidth )  >= ( overDivLeft )                       && 
             ( objLeft )             <= ( overDivLeft + overDivWidth)
           ) {
                combosOcultos[combosOcultos.length] = obj;
                obj.style.visibility = "hidden";
           }  else {
                obj.style.visibility = "";
           }
        }
      } catch(e)  {
        alert(e)
        return
      }
    }
	
    
 
    function gestiona(pId) {
    	
        var img = document.getElementById("img" + pId);
        var div = document.getElementById("c" + pId);
       
  		var imgSRC = img.getAttribute("src");
  		var rutaLength = imgSRC.length;
  		//Para obtener la ruta siempre suponía que el icono del que se parte era 'icono-.gif'. 
        //De ahí que restase las diez posiciones ('icono-.gif') para obtener la ruta
        //de acceso al directorio de imagenes. Ahora se busca por el directorio
        //Incidencia mantis 9924
        var ruta;
        if (imgSRC.indexOf('img') != -1)
  	  	{
      	  var sizeHastaImg = imgSRC.indexOf('img');
      	  //Se añade cuatro posiciones correspondientes a la cadena 'img/', 
      	  ruta = imgSRC.substr(0, sizeHastaImg +4);
  	  	} else {//se mantiene esta posibilidad, aunque nunca pasará por aquí, los iconos siempre se encuentran en directorio 'img'
  		  ruta = imgSRC.substr(0, rutaLength - 10);
  	  	}
  		
  		var imgMas = new Image();
        	imgMas.src = ruta + "iconoExpand.gif";
    	var imgMenos = new Image();
        	imgMenos.src = ruta + "icono-.gif";
  		
        showHide2("c" + pId);
        showHide2("c" + pId + "2");
        //showHide("c" + pId);
        //showHide("c" + pId + "2");
  		if(div != null)
        	img.src = (img.src == imgMas.src) ? imgMenos.src : imgMas.src;
	
    }
    
    function gestionOtros() {
        //pendient hacer m?ltiples inserciones!!
         showHide('cOtrosCont', true); 
         document.getElementById('cOtrosCont').className = "nivel2";
         showHide('cOtrosCont2', true);
         document.getElementById('cOtrosCont2').className = "nivel2";
    }
    
    function eliminarOtros(pId, pCheck) {
        showHide('c'+pId, false); 
        showHide('c'+pId+'2', false);
        //limpiar(document.getElementById('txt' + pId));
        /*for(var i=0; i<4; i++)  {
          limpiar(document.getElementById('txt' + pId + '2_' + i));
        }*/
        pCheck.checked=true;
      }


