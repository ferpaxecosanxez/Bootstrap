var imgMenos = new Image();
imgMenos.src = imgPath + "ico-.gif";
var imgMas = new Image();
imgMas.src = imgPath + "icoExpand.gif";
var imgTransp = new Image();
imgTransp.src = imgPath + "transp.gif";

function showHideNodo(pID, idRol, tipo){
	var longitud; 
	var img;
	
	var reservas;
	var pagos;
	var reservasRecobros;
	var recobros;
	var coste;
	
	var obj;
	var vis;
	var vis2;
		
	var temp = new Array();
	temp = pID.split('.');
	
	longitud = temp.length - 1;
				
	if(temp.length > 1){
	
		if(temp.length == 2){		
			//riesgo
			garCob = document.getElementById("riesgoSntro_ajax_" + temp[longitud]);		
			reservas = "ReservaTotalRi" + temp[longitud];
			pagos = "PagoTotalRi" + temp[longitud];
			reservasRecobros = "ReservaRecobroTotalRi" + temp[longitud];
			recobros = "RecobroTotalRi" + temp[longitud];
			coste = "CosteTotalRi" + temp[longitud];
			
		}else if(temp.length == 3){	
			//tramite
			garCob = document.getElementById("tramiteSntro_ajax_" + temp[longitud]);
			reservas = "ReservaTotalTr" + temp[longitud];
			pagos = "PagoTotalTr" + temp[longitud];
			reservasRecobros = "ReservaRecobroTotalTr" + temp[longitud];
			recobros = "RecobroTotalTr" + temp[longitud];
			coste = "CosteTotalTr" + temp[longitud];
		
		}else if(temp.length == 4){
			if(tipo == "Pp"){
				garCob = document.getElementById("personaSntro_ajax_" + temp[longitud]);
			}else if(tipo == "Pj"){
				garCob = document.getElementById("perjudicadoSntro_ajax_" + temp[longitud]);
			}else if(tipo == "Pv"){
				garCob = document.getElementById("vehiculoSntro_ajax_" + temp[longitud]);
			}
			
			reservas = "ReservaTotalOb" + temp[longitud]+idRol;
			pagos = "PagoTotalOb" + temp[longitud]+idRol;
			reservasRecobros = "ReservaRecobroTotalOb" + temp[longitud]+idRol;
			recobros = "RecobroTotalOb" + temp[longitud]+idRol;
			coste = "CosteTotalOb" + temp[longitud]+idRol;
		}
	
		if(temp.length < 4){
			obj = document.getElementById(pID);
			if (obj != null){
				vis = (getDivCurrentDisplay(obj) != "block") ? "block" : "none";
				
				document.getElementById(pID).style.display = vis;
			}
			img = document.getElementById("img" + pID.substr(2));
		
		}else if(temp.length == 4){
			vis = (getDivCurrentDisplay(garCob) != "none") ? "none" : "block";
			img = document.getElementById("img" + temp[longitud]);
		}
		
  		if (img.src == imgTransp.src) {
	    	vis2 = "block";
  		}else if(vis == "block"){
	    	img.src = imgMenos.src
	    	vis2 = "none";
	  	}else {
  			img.src = imgMas.src
	    	vis2 = "block";
  		}

	  	if (vis != undefined){	  		
	  		garCob.style.display = vis;
	  	}

		document.getElementById(reservas).style.display = vis2;
	    document.getElementById(pagos).style.display = vis2;
	    document.getElementById(reservasRecobros).style.display = vis2;
		document.getElementById(recobros).style.display = vis2;
		document.getElementById(coste).style.display = vis2;
	}
}

function initShowHideNodo(pID, idRol, tipo){

	var temp = new Array();		
	temp = pID.split('.');
	var idNodo = temp[0];
	
	for(i=1;i<temp.length;i++){
		idNodo += "."+temp[i];
		showHideNodo(idNodo, idRol, tipo);
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

function getPagExpediente(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id="+id+"&polGarCobView.siniestroView.ctlNmod="+ctlNmod+"&polGarCobView."+
	"sntroRiesgoView.id=&polGarCobView.sntroRiesgoView.ctlNmod=&polGarCobView.sntroTramiteView.id=&polGarCobView."+
	"sntroTramiteView.ctlNmod=&polGarCobView.perjudicadoPersonaView.id=&polGarCobView.perjudicadoPersonaView.ctlNmod="+
	"&polGarCobView.perjudicadoView.id=&polGarCobView.perjudicadoView.ctlNmod=&polGarCobView.perjudicadoVehiculoView.id="+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod=";
	
	return pag;
}

function getPagRiesgo(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id=&polGarCobView.siniestroView.ctlNmod=&polGarCobView."+
	"sntroRiesgoView.id="+id+"&polGarCobView.sntroRiesgoView.ctlNmod="+ctlNmod+"&polGarCobView.sntroTramiteView.id=&polGarCobView."+
	"sntroTramiteView.ctlNmod=&polGarCobView.perjudicadoPersonaView.id=&polGarCobView.perjudicadoPersonaView.ctlNmod="+
	"&polGarCobView.perjudicadoView.id=&polGarCobView.perjudicadoView.ctlNmod=&polGarCobView.perjudicadoVehiculoView.id="+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod=";
	
	return pag;
}

function getPagTramite(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id=&polGarCobView.siniestroView.ctlNmod=&polGarCobView."+
	"sntroRiesgoView.id=&polGarCobView.sntroRiesgoView.ctlNmod=&polGarCobView.sntroTramiteView.id="+id+"&polGarCobView."+
	"sntroTramiteView.ctlNmod="+ctlNmod+"&polGarCobView.perjudicadoPersonaView.id=&polGarCobView.perjudicadoPersonaView.ctlNmod="+
	"&polGarCobView.perjudicadoView.id=&polGarCobView.perjudicadoView.ctlNmod=&polGarCobView.perjudicadoVehiculoView.id="+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod=";
	
	return pag;
}

function getPagPerjudicadoPersona(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id=&polGarCobView.siniestroView.ctlNmod=&polGarCobView."+
	"sntroRiesgoView.id=&polGarCobView.sntroRiesgoView.ctlNmod=&polGarCobView.sntroTramiteView.id=&polGarCobView."+
	"sntroTramiteView.ctlNmod=&polGarCobView.perjudicadoPersonaView.id="+id+"&polGarCobView.perjudicadoPersonaView.ctlNmod="+ctlNmod+
	"&polGarCobView.perjudicadoView.id=&polGarCobView.perjudicadoView.ctlNmod=&polGarCobView.perjudicadoVehiculoView.id="+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod=";
	
	return pag;
}

function getPagPerjudicado(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id=&polGarCobView.siniestroView.ctlNmod=&polGarCobView."+
	"sntroRiesgoView.id=&polGarCobView.sntroRiesgoView.ctlNmod=&polGarCobView.sntroTramiteView.id=&polGarCobView."+
	"sntroTramiteView.ctlNmod=&polGarCobView.perjudicadoPersonaView.id=&polGarCobView.perjudicadoPersonaView.ctlNmod="+
	"&polGarCobView.perjudicadoView.id="+id+"&polGarCobView.perjudicadoView.ctlNmod="+ctlNmod+"&polGarCobView.perjudicadoVehiculoView.id="+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod=";
	
	return pag;
}

function getPagPerjudicadoVehiculo(id, ctlNmod){
	var pag = "polGarCobView.siniestroView.id=&polGarCobView.siniestroView.ctlNmod=&polGarCobView."+
	"sntroRiesgoView.id=&polGarCobView.sntroRiesgoView.ctlNmod=&polGarCobView.sntroTramiteView.id=&polGarCobView."+
	"sntroTramiteView.ctlNmod=&polGarCobView.perjudicadoPersonaView.id=&polGarCobView.perjudicadoPersonaView.ctlNmod="+
	"&polGarCobView.perjudicadoView.id=&polGarCobView.perjudicadoView.ctlNmod=&polGarCobView.perjudicadoVehiculoView.id="+id+
	"&polGarCobView.perjudicadoVehiculoView.ctlNmod="+ctlNmod;
	
	return pag;
}

function comprobarPlegarTodo(){
	var elementosTr = document.getElementsByTagName("tr");
	
	for(var i=0; i<elementosTr.length; i++){
		var id = elementosTr[i].id;
		
	   	if((id!="")&&(id.substr(0,1)=="c")){
	   		var img = document.getElementById("img" + id.substr(1,id.length));
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
        		
        	if(img.src == imgMenos.src){	
        		img.src = imgMas.src;
        	}
        	
        	var obj = document.getElementsByName(id);	
	
			for(var j=0; j<obj.length; j++){		
				obj[j].style.display ="none";
			}
		}
   	}
}

function abrirCapa(idNodo, idRol, tipo){

	var idExpediente;
	var idRiesgo;
	var idTramite;
	var idObjeto;
		
	var temp = new Array();
	temp = idNodo.split('.');
	
	if(temp.length > 1){
	
		if(temp.length == 2){
			showHideNodo(idNodo);
		}else if(temp.length == 3){
			idRiesgo = temp[0]+"."+temp[1];
			idTramite = idNodo;	
			showHideNodo(idRiesgo);
			showHideNodo(idTramite);	
		}else if(temp.length == 4){
			idRiesgo = temp[0]+"."+temp[1];
			idTramite = temp[0]+"."+temp[1]+"."+temp[2];
			idObjeto = idNodo;	
			showHideNodo(idRiesgo);
			showHideNodo(idTramite);
			showHideNodo(idObjeto,idRol,tipo);
		}
	}
}

function esImporteNegativo(importe){
	var esNegativo = false;
    if(importe.charAt(0) == '-'){
	  esNegativo = true;
	}
    return esNegativo;
}

function introduccionPolGarCob(id, ctlNmod, tipo, paginaBase){
  	var pag = paginaBase + '?';

  	if(tipo == 'E'){
  		pag = pag + getPagExpediente(id, ctlNmod);
  	}else if(tipo == 'R'){
  		pag = pag + getPagRiesgo(id, ctlNmod);
    }else if(tipo == 'T'){
    	pag = pag + getPagTramite(id, ctlNmod);
    }else if(tipo == 'Pp'){
    	pag = pag + getPagPerjudicadoPersona(id, ctlNmod);
    }else if(tipo == 'Pj'){
    	pag = pag + getPagPerjudicado(id, ctlNmod);	
    }else if(tipo == 'Pv'){
    	pag = pag + getPagPerjudicadoVehiculo(id, ctlNmod);
    }

	var valor = lanzarVentanaSiniestros(pag,600,400);
     
    return valor;
}