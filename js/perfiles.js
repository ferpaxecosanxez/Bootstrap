    var colores = new Array("sinAcceso", "acceso", "parcial");
    var textos = new Array("Sin acceso", "Con acceso", "Acceso parcial");

    function getNumberParents(id) {
       var indice = id.indexOf('_');
       var parents = 0;

       while (indice != -1) {
          parents++;
          indice = id.indexOf('_', indice+1);
       }
       return parents;
    }

		var objRadio = null;
		function checkState(pCapa, pRadio) {
			objRadio = pRadio;
			showHideVis("cCargando", true);
			showHideVis("id", false)
			setTimeout("checkStateDelayed(\""+pCapa+"\",\"init\" )", 500) //necesario para que pueda pintar la capa ...
		}

    function checkStateDelayed(pCapa, pRadio)	{
    	if(pRadio == "init")	{
    		pRadio = objRadio;
			}
      if(pRadio != null)
        writeAccess(pRadio.parentNode.parentNode.getElementsByTagName("DIV")[0], pRadio.value);

      
			var	radios = document.getElementById(pCapa).getElementsByTagName("INPUT")
      var parentCapa = (getNumberParents(pCapa) >= 1) ? pCapa.substr(0, pCapa.lastIndexOf("_")) : null;
      var parentRadios = (getNumberParents(pCapa) >= 1) ? document.getElementById(pCapa.substr(3)).getElementsByTagName("INPUT") : null;
      var valor;
      var acc1 = false;
      var acc2 = false;
      var parentNodo = (pRadio != null)? pRadio.parentNode.parentNode.id : null;


      if(parentNodo == pCapa.substr(3)) {
        for(var i=0; i<radios.length; i++) {
          if(radios[i].type == "radio" && radios[i].value == pRadio.value) {
              radios[i].checked = true;
              writeAccess(radios[i].parentNode.parentNode.getElementsByTagName("DIV")[0], radios[i].value);
          }
        }
      } else  {
        for(var i=0; i<radios.length; i++)  {
          if(radios[i].type == "radio") {
            if(radios[i].value == 0 && radios[i].checked)  {
              valor = (valor == 3) ? valor : 2;
              acc2 = true;
            } else if(radios[i].value == 1 && radios[i].checked)  {
              valor = 3;
              acc1 = true;
            }
          }
        }

       if(parentRadios != null)  {
          parentRadios[valor].checked = true;
          valor-=1;
          if(acc2 && acc1)  {
            valor = 2;
          } else {
        	 valor -=1;
          	
          }
          writeAccess(parentRadios[0].parentNode, valor, true )
        }
      }//fin else

      if(parentCapa != null)  {
        checkStateDelayed(parentCapa, null, true);
      }
      else	{
      	showHideVis("cCargando", false);
				showHideVis("id", true)
      	objRadio = null;
      }
			
    }

    function writeAccess(pObj, pValor, pTieneHijos)  {
      if(pObj != null)  {
      	if(pTieneHijos == null && pObj.className.substr(pObj.className.indexOf("H")) == "Hijos")	{
      		pTieneHijos = true;
      	}
      	var clase = eval(pTieneHijos) ? colores[pValor] + "Hijos" : colores[pValor];
        pObj.className = clase;
        pObj.title = textos[pValor];
        pObj.getElementsByTagName("INPUT")[0].value = pValor;
      }
    }

    function showHidePerfiles(pObj)   {
      var obj = document.getElementById("id_"+pObj).style
      obj.display = (obj.display != "block") ? "block" : "none"
      if(obj.display == "none"){
         var capasHijas = document.getElementById("id_"+pObj).getElementsByTagName("DIV")
         for (var i=0; i < capasHijas.length; i++)   {
            if(capasHijas[i].className == "opcionAnidada")
              capasHijas[i].style.display = "none"
         }
      }
    }

    window.onload = function()  {
    	document.getElementById("cCargando").height = document.getElementById("id").offsetHeight;
      var items = document.forms[0]["tipoAcceso"]
      var hijos = document.forms[0]["tieneHijos"]
      for(var i=0; i<items.length; i++) {
        writeAccess(items[i].parentNode, items[i].value, hijos[i].value)
      }
    }
