  
  function modificarExpediente(){
  	if (swSiniestroWeb == 1){
		if(confirm(mensajeMododificaWEB)){
			muestraCarga();
			getPage(accionCrearNuevaSituacion, 'iAreaTrabajo');
		}
  	} else {
  		muestraCarga();
  		getPage(accionCrearNuevaSituacion, 'iAreaTrabajo');
  	}
  }
  
  function guardarTodo(){
  	if (swSiniestroWeb == 1){
  		if(confirm(mensajeGuardarTodoWEB)){
			muestraCarga();
			getPage(accionGuardarSituacion, 'iAreaTrabajo');
		}
  	} else {
  		muestraCarga();
		getPage(accionGuardarSituacion, 'iAreaTrabajo');
  	}
  }

    //Menu Gestion Documental
	if(top.despliegueGD==false){           
      if(!top.menuPlegado)  {
	    top.plegar('cMenuArea');
	  }
	}	
  
    //Para consultar los relatos
    function inicializarConsultaRelato() {
      muestraCarga();
      submitFormActionMsg (document.forms[0], accionInicializarConsulta, null , 'iAreaTrabajo', null);
    }
	
	//Inicializa la pantalla correspondiente al origen del relato pulsado
    function inicializarOrigenRelato(idRelato, ctlNmodRelato){    
      muestraCarga();
      accionInicializarOrigen = accionInicializarOrigen + "?estructuraRelatoView.idRelato=" + idRelato;
      accionInicializarOrigen = accionInicializarOrigen + "&estructuraRelatoView.ctlNmodRelato=" + ctlNmodRelato;
	  submitFormActionMsg(document.forms[0], accionInicializarOrigen, null , 'iAreaTrabajo', null);
    }
    
    //Para consultar los relatos
    function detalleRelato(idRelato, ctlNmodRelato) {
      muestraCarga();
      accionDetalleRelato = accionDetalleRelato + "?estructuraRelatoView.idRelato=" + idRelato; 
      accionDetalleRelato = accionDetalleRelato + "&estructuraRelatoView.ctlNmodRelato=" + ctlNmodRelato; 
      submitFormActionMsg (document.forms[0], accionDetalleRelato, null , 'iAreaTrabajo', null);
    }
    
    //Plega todo el relato
	function comprobarPlegarRelato(){
		var elementosDIV = document.getElementsByTagName("div");
		var valorCodigoGarantia;
		var id1;
		
		//Comprobamos si el elemento debe estar o no desplegado al inicializarse
		for(var i=0; i<elementosDIV.length; i++){
		   	valorCodigoGarantia = elementosDIV.item(i).getAttribute("idPlegadoHistorico");
		   	id1 = elementosDIV.item(i).getAttribute("id");
		   	if(valorCodigoGarantia!=null && id1!=null){	   		
		   		var id = id1.substr(1,id1.length);   		
		   		gestiona(id);
		   	}
	   	}
	}
	
	//Pliega o despliega un nodo de la sabana del relato
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
      showHideNodoRelato("c" + pId);
      if(div != null) {
		if (img.src == imgMas.src) {
  			img.src = imgMenos.src;
  		} else if (img.src == imgMenos.src) {
  			img.src = imgMas.src;
		}
  	  }
    }
  
    /*Despliega el div del arbol*/  
    function showHideNodoRelato(pID, pBol)   {
      var obj = document.getElementsByName(pID) 
      for(var i=0; i < obj.length; i++){    
        if(obj[i].style.display == "block"){
          obj[i].style.display ="none";
        }else if(obj[i].style.display == "none"){
          obj[i].style.display ="block";
        }else{ 
          obj[i].style.display ="none";
        }
      }
    }
    
    /* Funcion para el control de los criterios de seleccion de los relatos */
 	function controlHistoria (pObjeto) {
	   // control todos los movimientos
	   if(pObjeto.name == "estructuraRelatoView.swAllMovimientos"){
	     if(pObjeto.checked){
	       // se desactivan todos los checks
	       gestionCriteriosHistoria(true);
	       document.getElementById('estructuraRelatoView.swAllMovimientos').disabled = false;
	       document.getElementById('estructuraRelatoView.swAllMovimientos').checked = true;
	     }else{
	       // se activan todos los checks
		   gestionCriteriosHistoria(false);   
	     }  
	   }  
	   // movimientos economicos
	   if(pObjeto.name == "estructuraRelatoView.swMovEconomicos"){
	     if(pObjeto.checked){
	       document.getElementById('estructuraRelatoView.swPagoRecobro').disabled = true;
	       document.getElementById('estructuraRelatoView.swPagoRecobro').checked = false; 
	     }else{
	       document.getElementById('estructuraRelatoView.swPagoRecobro').disabled = false;   
	     }   
	   } 
	   // pago/recobro
	   if(pObjeto.name == "estructuraRelatoView.swPagoRecobro"){
	     if(pObjeto.checked){
	       document.getElementById('estructuraRelatoView.swMovEconomicos').disabled = true;
	       document.getElementById('estructuraRelatoView.swMovEconomicos').checked = false; 
	     }else{
	       document.getElementById('estructuraRelatoView.swMovEconomicos').disabled = false;     
	     }   
	   } 
	   // cicos
	   if(pObjeto.name == "estructuraRelatoView.swCicos"){
	     if(pObjeto.checked){
	       // se desactivan todos los checks
	       gestionCriteriosHistoria(true);
	       document.getElementById('estructuraRelatoView.swCicos').disabled = false;
	       document.getElementById('estructuraRelatoView.swCicos').checked = true;
	     }else{
	       // se activan todos los checks
		   gestionCriteriosHistoria(false);   
	     } 
	   } 
	 }
   
    /* Funcion para activar/desactivar todos los checks marcando solo el criterio "Todos los movimientos" */
 	function gestionCriteriosHistoria (flag){
		document.getElementById('estructuraRelatoView.swAllMovimientos').disabled = flag;
		document.getElementById('estructuraRelatoView.swMovEconomicos').disabled = flag;
		document.getElementById('estructuraRelatoView.swEncargosProf').disabled = flag;
		document.getElementById('estructuraRelatoView.swObservaciones').disabled = flag;
		document.getElementById('estructuraRelatoView.swModificaciones').disabled = flag;
		document.getElementById('estructuraRelatoView.swPagoRecobro').disabled = flag;
		document.getElementById('estructuraRelatoView.swAgendaExpdte').disabled = flag;
		document.getElementById('estructuraRelatoView.swCicos').disabled = flag;
		if(flag == true){
			document.getElementById('estructuraRelatoView.swMovEconomicos').checked = false;
			document.getElementById('estructuraRelatoView.swEncargosProf').checked = false;
			document.getElementById('estructuraRelatoView.swObservaciones').checked = false;
			document.getElementById('estructuraRelatoView.swModificaciones').checked = false;
			document.getElementById('estructuraRelatoView.swPagoRecobro').checked = false;
			document.getElementById('estructuraRelatoView.swAgendaExpdte').checked = false;   
			document.getElementById('estructuraRelatoView.swCicos').checked = false;
		}
	}
 	function handlerBlockRelato(pObj, recarga)  {
		  var pBol = (document.getElementById('tit'+pObj).title.substr(0,3) == "Exp")? true : false;
		  var literal = (pBol)? textoContraer : textoExpandir;
		  document.getElementById('img'+pObj).title = literal;
		  document.getElementById('tit'+pObj).title = literal;
		    
		  var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
		  if (recarga != null && recarga == 'true'){
			  inicializarConsultaRelato();
		  }
		  showHide(pObj, pBol);
		  changeIcon('img' + pObj, imgSrc );
		  event.cancelBubble = true;
	}