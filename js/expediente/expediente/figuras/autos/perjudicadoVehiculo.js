/*************************************************************************************************************
//Esta funcion muestra u oculta los vehiculos
*************************************************************************************************************/
 var capaVisible;
 
 function deshabilitarDannos(pObjeto){
 	pObjeto.checked = false;
 	pObjeto.onclick();
 	pObjeto.disabled = true;
 }
   
 function ocultarDannos(pObjeto){
    //oculta todos los tr danios 
	//para contemplar la posibilidad de que habiendo seleccionado da?os, si el usuario cambia de veh?culo
	//se inicialice a 0 la seleccion de los mismos
	for (var i = 1; i <= 7; i++) {		
		var tabla = eval("trSec" + i);
        showHide(tabla, false);
        pObjeto[i].value = 0;
	}
 }
  
 function actualizarDannos(){
    var danno = "danno"
	for (var i = 1; i <= 7; i++) {		
		var name = danno + i;
        document.getElementById(name).value = 0;
	}
 }
      
 // control de sin Danios 
 function sinDannos (pObjeto,pDannos){
   ocultarDannos(pDannos);
   actualizarDannos();
   if(pObjeto.checked == true){
	 if(capaVisible != null){
        showHide(capaVisible, false);
     }
     capaVisible = null;
	 // se desmarcan e inhabilitan todos los posibles danios marcados
	 deshabilitarDannos(document.getElementById('perjudicadoVehiculoView.swDannosGenerales'));
	 deshabilitarDannos(document.getElementById('perjudicadoVehiculoView.swLunas'));
	 deshabilitarDannos(document.getElementById('perjudicadoVehiculoView.swNeumaticos'));
	 deshabilitarDannos(document.getElementById('perjudicadoVehiculoView.swBajos'));
	 //Se eliminan los posibles daños registrados mediante la ventana
	 eliminarDannosEnVehiculo();
	 if (document.getElementById('enlaceDannos') != null){
		document.getElementById('enlaceDannos').style.display = 'none';
	 }
	 
   }
   else{
	 // se habilitan todos los posibles danios marcados
	 document.getElementById('perjudicadoVehiculoView.swDannosGenerales').disabled = false;
	 document.getElementById('perjudicadoVehiculoView.swLunas').disabled = false;
	 document.getElementById('perjudicadoVehiculoView.swNeumaticos').disabled = false;
	 document.getElementById('perjudicadoVehiculoView.swBajos').disabled = false;
	 if (document.getElementById('enlaceDannos') != null){
		document.getElementById('enlaceDannos').style.display = 'block';
	 }
	 
   }
 }
  
 function mostrarVehiculo(index,pObjeto0,pObjeto1,pObjeto2,pDannos,rutaImgVehiculos) {
 	if (index.value == ""){
	 	//Si no se ha seleccionado el tipo de vehiculo se pone por defecto a 1 que es turimo
	 	document.forms[0].idTipoVehiculo.value = 1;
	 	document.forms[0].idTipoVehiculo.selectedIndex = 1;
	 	index.value = "1";
 	}
    var indice = index.value - 1;
	ocultarDannos(pDannos);
		          	  
    if((pObjeto0.checked == true) || (pObjeto1.checked == true) || (pObjeto2.checked == true)){  
        if(capaVisible != null){
           showHide(capaVisible, false);
    	}
        showHide('trVeh' + indice, true);
        capaVisible = 'trVeh' + indice;	
    }  
    else if(capaVisible != null){
        showHide(capaVisible, false);
        capaVisible = null;
		ocultarDannos(pDannos);
		//Se eliminan los posibles daños registrados mediante la ventana
		eliminarDannosEnVehiculo();
	}
	precargaImgs(index,rutaImgVehiculos);
 }
   
 
/*************************************************************************************************************
   //Arrays de veh?culos y sus respectivos componentes
*************************************************************************************************************/
var vehiculos = new Array('imgCoche', 'imgMoto', 'imgCamion', 'imgFurgon' , 'imgTractor', 'imgTractor', 'imgCamion', 'imgCamion', 'imgMoto');

var imgCoche = new Array(['cor1.gif','cov1.gif'],['cor2.gif','cov2.gif'],['cor3.gif','cov3.gif'],['cor4.gif','cov4.gif'],['cor5.gif','cov5.gif'],['cor6.gif','cov6.gif'],['cor7.gif','cov7.gif']);

var imgMoto = new Array(['mr1.gif','mv1.gif'],['mr2.gif','mv2.gif'],['mr3.gif','mv3.gif'],['mr4.gif','mv4.gif'],['mr5.gif','mv5.gif'],['mr6.gif','mv6.gif']);

var imgCamion = new Array(['cr1.gif','cv1.gif'],['cr2.gif','cv2.gif'],['cr3.gif','cv3.gif'],['cr4.gif','cv4.gif'],['cr5.gif','cv5.gif'],['cr6.gif','cv6.gif'],['cr7.gif','cv7.gif']);

var imgFurgon = new Array( ['fr1.gif','fv1.gif'],['fr2.gif','fv2.gif'],['fr3.gif','fv3.gif'],['fr4.gif','fv4.gif'],['fr5.gif','fv5.gif'],['fr6.gif','fv6.gif'],['fr7.gif','fv7.gif']);

var imgTractor = new Array( ['tr1.gif','tv1.gif'],['tr2.gif','tv2.gif'],['tr3.gif','tv3.gif'],['tr4.gif','tv4.gif'],['tr5.gif','tv5.gif'],['tr6.gif','tv6.gif'],['tr7.gif','tv7.gif']);

/*************************************************************************************************************
   //Esta funcion realiza dos acciones dependiendo del lugar de llamada
   //1. muestra el tr que contiene la descripcion de danios indicada desde la parte del vehiculo seleccionado
   //2 oculta el respectivo tr cuando se hace click en el mismo
*************************************************************************************************************/
   function insertadanos(valor,descripcion,pObjeto,pObjetoDanno, img) {
     if(descripcion=="inserta"){
      	showHide('trSec'+ valor, true);
      	pObjeto[valor].value = 1;
      	pObjetoDanno.value = 1;
      	cambialo(img,true);
     }
     if(descripcion=="elimina"){
      	showHide('trSec'+ valor, false);
      	pObjeto[valor].value = 0;
      	pObjetoDanno.value = 0;
      	cambialo(img,false);
     }
     
     var daniosGrales = 0;
     // se comprueba si hay q deshabilitar o habilitar el compo de peritar
     for (var i =1; i< pObjeto.length; i++){
	   if(pObjeto[i].value == "1"){
		daniosGrales = 1;
	   }	
	 }
  
   }
   function insertadanos2(valor,descripcion,pObjeto,pObjetoDanno,img) {
   
   	 var idTipoVeh = document.forms[0].idTipoVehiculo.value;
   	 
   	 if (idTipoVeh != null && idTipoVeh != undefined){
   	 	if (idTipoVeh == 1){
   	 		img = "cov" + img;
   	 	}else if (idTipoVeh == 2){
   	 		img = "mv" + img;
   	 	}else if (idTipoVeh == 3){
   	 		img = "cv" + img;
   	 	}else if (idTipoVeh == 4){
   	 		img = "fv" + img;
   	 	}else if (idTipoVeh == 5){
   	 		img = "tv" + img;
   	 	}else if (idTipoVeh == 6){
   	 		img = "tvv" + img;
   	 	}else if (idTipoVeh == 7){
   	 		img = "cvv" + img;
   	 	}else if (idTipoVeh == 8){
   	 		img = "cvv" + img;
   	 	}else if (idTipoVeh == 9){
   	 		img = "mvv" + img;
   	 	}
   	 }
   
     if(pObjeto[valor].value == '0'){
      	showHide('trSec'+ valor, true);
      	pObjeto[valor].value = 1;
      	pObjetoDanno.value = 1;
      	cambialo(img,true);
     }else if(pObjeto[valor].value == '1'){
      	showHide('trSec'+ valor, false);
      	pObjeto[valor].value = 0;
      	pObjetoDanno.value = 0;
      	cambialo(img,false);
     }
     
     var daniosGrales = 0;
     // se comprueba si hay q deshabilitar o habilitar el compo de peritar
     for (var i =1; i< pObjeto.length; i++){
	   if(pObjeto[i].value == "1"){
		daniosGrales = 1;
	   }	
	 }	
	 
   }

/**********************************************************************************************************
   //Esta funcion lleva a cabo la precarga
**********************************************************************************************************/
var imgsSustitucion;
var tipoVehSelec;

function precargaImgs(index,rutaImgVehiculos) {
  var indice = index.value - 1;
  var vehSeleccionado = eval(vehiculos[indice]);
  
  imgsSustitucion = new Array();

  for (i = 0; i < vehSeleccionado.length; i++) {
    imgsSustitucion[i] = new Array();
    for (k = 0; k<2; k++) {
      imgsSustitucion[i][k] = new Image();
      imgsSustitucion[i][k].src = rutaImgVehiculos+vehSeleccionado[i][k];
    }
  }
  tipoVehSelec = indice;
}

/**********************************************************************************************************
//Esta funcion sustituye todas las imagenes del coche por las imagenes verdes
**********************************************************************************************************/
function limpiarDannos(index,rutaImgVehiculos) {
	var indice = index.value - 1;
	var vehSeleccionado = eval(vehiculos[indice]);
  
	imgsSustitucion = new Array();

	var pre = "";
	if (indice != null && indice != undefined){
   		if (indice == 0){
   	 		pre = "cov";
   	 	}else if (indice == 1){
   	 		pre = "mv";
   	 	}else if (indice == 2){
   	 		pre = "cv";
   	 	}else if (indice == 3){
   	 		pre = "fv";
   	 	}else if (indice == 4){
   	 		pre = "tv";
   	 	}else if (indice == 5){
   	 		pre = "tv";
   	 	}else if (indice == 6){
   	 		pre = "cv";
   	 	}else if (indice == 7){
   	 		pre = "cv";
   	 	}else if (indice == 8){
   	 		pre = "mv";
		}
	}    
	for (i = 0; i < vehSeleccionado.length; i++) {
		imgsSustitucion[i] = new Array();
	    var texto = "img"+pre+(i+1)+"";
	    var texto2 = ""+pre+(i+1)+".gif";
    	document.getElementById(texto).src= rutaImgVehiculos+texto2;
	}
	tipoVehSelec = indice;
}

/*********************************************************************************************************
Funcion para sustituir una imagen onmouseover y restablecerla onmouseout
*********************************************************************************************************/
var noCambia="verde";
function cambialo(pID, pBol) {
	var pos0 = pID.substr(pID.length-1) - 1;
	//comprobemos cual es la ruta de la imagen en el momento de hacer onmouseover 
	var ruta = document.getElementById("img" + pID).src;
  
	if (pBol == true) {//************************************************************//ONMOUSEOVER 
		//Si era rojo lo deja as? y cambia el valor de la variable noCambia por el string "rojo"
		if(ruta==imgsSustitucion[pos0][0].src){
	    	noCambia="rojo";
		} else {
			//Si era verde --> pasa a Rojo
        	var pos1 = 0;
        	document.getElementById("img" + pID).src= imgsSustitucion[pos0][pos1].src;
		}
	}else{//*************************************************************************//ONMOUSEOUT
		//Si la ruta era roja deja la imagen roja y restablece el valor de la variable noCambia por el string "verde"
		if(noCambia=="rojo"){
			var pos1 = 0;
			document.getElementById("img" + pID).src= imgsSustitucion[pos0][pos1].src;
			noCambia="verde";
		} else if(noCambia=="verde"){
			//Si la ruta antes del onmouseover no era roja, la restablece a verde tras el mouseout
            var pos1 = 1;
            document.getElementById("img" + pID).src= imgsSustitucion[pos0][pos1].src;
		}
	}
}

  /** Funcion para la carga de los datos marcados */
  function gestionDanniosVehiculo (){
    
    var swDannoGral = document.getElementById('perjudicadoVehiculoView.swDannosGenerales').value;
	var swLunas = document.getElementById('perjudicadoVehiculoView.swLunas').value;
	var swNeumaticos = document.getElementById('perjudicadoVehiculoView.swNeumaticos').value;
	var swBajos = document.getElementById('perjudicadoVehiculoView.swBajos').value;
	var swSinDannos = document.getElementById('perjudicadoVehiculoView.swSinDannos').value;  

	if (swDannoGral == "1" || swLunas == "1" || swNeumaticos == "1") {
	  
	  mostrarVehiculo(document.forms[0].idTipoVehiculo,document.getElementById('perjudicadoVehiculoView.swDannosGenerales'),document.getElementById('perjudicadoVehiculoView.swLunas'),document.getElementById('perjudicadoVehiculoView.swNeumaticos'),document.forms[0].daniosSeleccionados,rutaImgVehiculos);
	  
	  var dannos = document.forms[0].daniosSeleccionados;
	  if (document.getElementById('danno1').value == "1"){
		insertadanos2(1,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno1, '1');
	  }
	  if (document.getElementById('danno2').value == "1"){
		insertadanos2(2,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno2, '2');
	  }
	  if (document.getElementById('danno3').value == "1"){
		insertadanos2(3,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno3, '3');
	  }
	  if (document.getElementById('danno4').value == "1"){
		insertadanos2(4,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno4, '4');
	  }
	  if (document.getElementById('danno5').value == "1"){
		insertadanos2(5,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno5, '5');
	  }
	  if (document.getElementById('danno6').value == "1"){
		insertadanos2(6,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno6, '6');
	  }
	  if (document.getElementById('danno7').value == "1"){
		insertadanos2(7,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno7, '7');
	  }
	}
	
	
	var ckDannoGral = document.getElementById('perjudicadoVehiculoView.swDannosGenerales').checked;
	var ckLunas = document.getElementById('perjudicadoVehiculoView.swLunas').checked;
	var ckNeumaticos = document.getElementById('perjudicadoVehiculoView.swNeumaticos').checked;
	var ckBajos = document.getElementById('perjudicadoVehiculoView.swBajos').checked;
	var ckSinDannos = document.getElementById('perjudicadoVehiculoView.swSinDannos').checked;   
		
	if ((ckDannoGral == false) && (ckLunas == false) && (ckNeumaticos == false) && (ckBajos == false) && (ckSinDannos == false)){
	  sinDannos(document.getElementById('perjudicadoVehiculoView.swSinDannos'),document.forms[0].daniosSeleccionados);
	}
  }
  
  /* funcion para seleccionar los dannios en CONSULTA */
  function seleccionaDanniosConsulta(index) {
    
    var imgTipoVeh = "img";
    if(tipoVehSelec == 0){
      // coche
      imgTipoVeh = imgTipoVeh + "cov";
    }else if(tipoVehSelec == 1){
      // moto
      imgTipoVeh = imgTipoVeh + "mv";
    }else if(tipoVehSelec == 2){
      // camion
      imgTipoVeh = imgTipoVeh + "cv";
    }else if(tipoVehSelec == 3){
      // furgon
      imgTipoVeh = imgTipoVeh + "fv";
    }else if(tipoVehSelec == 4){
      // tractor
      imgTipoVeh = imgTipoVeh + "tv";
    }else if (tipoVehSelec == 5){
      // tractor
      imgTipoVeh = imgTipoVeh + "tv";
 	}else if (tipoVehSelec == 6){
	  // camion
      imgTipoVeh = imgTipoVeh + "cv";
	}else if (tipoVehSelec == 7){
   	  // camion
      imgTipoVeh = imgTipoVeh + "cv";
   	}else if (tipoVehSelec == 8){
   	  // moto
      imgTipoVeh = imgTipoVeh + "mv";
   	}

    var dannos = document.forms[0].daniosSeleccionados;
	if (document.getElementById('danno1').value == "1"){
	  document.getElementById(imgTipoVeh + "1").src= imgsSustitucion[0][index].src;
	}
	if (document.getElementById('danno2').value == "1"){
	  document.getElementById(imgTipoVeh + "2").src= imgsSustitucion[1][index].src;
	}
	if (document.getElementById('danno3').value == "1"){
	  document.getElementById(imgTipoVeh + "3").src= imgsSustitucion[2][index].src;
	}
	if (document.getElementById('danno4').value == "1"){
	  document.getElementById(imgTipoVeh + "4").src= imgsSustitucion[3][index].src;
    }
	if (document.getElementById('danno5').value == "1"){
	  document.getElementById(imgTipoVeh + "5").src= imgsSustitucion[4][index].src;
	}
	if (document.getElementById('danno6').value == "1"){
	  document.getElementById(imgTipoVeh + "6").src= imgsSustitucion[5][index].src;
	}
	if (document.getElementById('danno7').value == "1"){
	  document.getElementById(imgTipoVeh + "7").src= imgsSustitucion[6][index].src;
	}    
  }
    
    function conductorEqualAsegurado(){
	    document.forms[0].action = accionRecargarCondEqualAseg;
	    muestraCargaIFrame();
	    document.forms[0].submit();

      	operacionesOnLoadFiguraIFrame();
    }
    
    /* Funcion que recarga el combo de las marcas de vehiculos mediante ajax */
    function recargarMarcas(){
      var indice = document.getElementById('idTipoVehiculo').selectedIndex;
      var tipoVehiculo = document.getElementById('idTipoVehiculo').options[indice].value;
      accionRecargarMarcas = accionRecargarMarcas +'?tipoVehiculo=' + tipoVehiculo;
      document.getElementById('perjudicadoVehiculoView.idMarcaVehiculo').style.display = 'none';
	  document.getElementById('relojMarca').style.display = 'block';
      document.getElementById('idModelo').style.display = 'none';
	  document.getElementById('relojModelo').style.display = 'block';
      
      retrieveURLWithoutParameters(accionRecargarMarcas);
    }
  
    /* Funcion que recarga el combo de las modelos de vehiculos mediante ajax */
    function recargarModelos(select){
      var indice = select.selectedIndex;
      var idMarca = select.options[indice].value;
      var marca = select.options[indice].text;

      document.getElementById('perjudicadoVehiculoView.marcaVehiculo').value=marca;

      indice = document.getElementById('idTipoVehiculo').selectedIndex;
      tipoVehiculo = document.getElementById('idTipoVehiculo').options[indice].value;

      document.getElementById('idModelo').style.display = 'none';
	  document.getElementById('relojModelo').style.display = 'block';

      accionCompletaRecargarModelos = accionRecargarModelos +'?idMarca=' + idMarca + '&marca=' + marca + '&tipoVehiculo=' + tipoVehiculo;

      retrieveURLWithoutParameters(accionCompletaRecargarModelos);
    }
 
    /* Funcion que recarga la lista de las marcas en funcion del tipo de vehiculo */ 
  	function operacionesTipoVehiculo(){
  		limpiarDannos(document.forms[0].idTipoVehiculo,rutaImgVehiculos);
  		mostrarVehiculo(document.forms[0].idTipoVehiculo,document.getElementById('perjudicadoVehiculoView.swDannosGenerales'),document.getElementById('perjudicadoVehiculoView.swLunas'),document.getElementById('perjudicadoVehiculoView.swNeumaticos'),document.forms[0].daniosSeleccionados,rutaImgVehiculos);
  		actualizarDannos();
  		recargarMarcas();
  	}
  
  function operacionesOnLoadFiguraIFrame(){
  	controlTipoPersona('figuraFormView.tipoIdent.id','cNFisica','cFisica','cJuridica','cNJuridica','cNSexo','cSexo', 'cFechas', 'cNIdioma','cIdioma');
     var idNumKm = document.getElementById('figuraFormView.numKm.id').value;
     if (idNumKm == km){
       showHide('kilometroFig', true);
       showHide('numeroFig', false);
     }else{
       showHide('kilometroFig', false);
       showHide('numeroFig', true);
     }
     //habilitarElementos(deshabilitar);
  }
  
  function repintarVehiculo(){
  	if (document.getElementById('perjudicadoVehiculoView.swDannosGenerales').checked == true ||
        document.getElementById('perjudicadoVehiculoView.swLunas').checked == true ||
        document.getElementById('perjudicadoVehiculoView.swNeumaticos').checked == true)
    {
      mostrarVehiculo(document.forms[0].idTipoVehiculo,document.getElementById('perjudicadoVehiculoView.swDannosGenerales'),document.getElementById('perjudicadoVehiculoView.swLunas'),document.getElementById('perjudicadoVehiculoView.swNeumaticos'),document.forms[0].daniosSeleccionados,rutaImgVehiculos);
      gestionDanniosVehiculo();
    }else{
      sinDannos(document.getElementById('perjudicadoVehiculoView.swSinDannos'),document.forms[0].daniosSeleccionados);
    }
  }
  
  /* Funcion para seleccionar un determinado valor en un combo */
  function seleccionarCombos(pObjeto, pValue, form) {
    for (var i = 0; i < form.elements[pObjeto].length; i++) {
      if (form.elements[pObjeto].options[i].text == pValue) {
        form.elements[pObjeto].options[i].selected = true;
      }
    }
   }

   /* Funcion para seleccionar un determinado valor en un combo */
   function seleccionarCombosIndice(pObjeto, pIndex, form) {
    for (var i = 0; i < form.elements[pObjeto].length; i++) {
      if (form.elements[pObjeto].options[i].value == pIndex) {
        form.elements[pObjeto].options[i].selected = true;
      }
    }
   }
  
	function ocultarMostrarEnlaces(){	
		if (idObjeto != null && idObjeto > 0){
			window.parent.document.getElementById('barraOperaciones').style.display = 'block';
			window.parent.document.getElementById('barraEnlaces').style.display = 'block';
		} else {
			window.parent.document.getElementById('barraOperaciones').style.display = 'none';
			window.parent.document.getElementById('barraEnlaces').style.display = 'none';
		}
	}
	
	function registrarDannos(){
    	  var accionDannosVehiculo = window.parent.accionDannosVehiculo;
    	  accionDannosVehiculo = accionDannosVehiculo+ "?idTipoVehiculo=" +document.getElementById("perjudicadoVehiculoView.tipoVehiSntro.id").value;
    	  var valorRetorno = lanzarVentana(accionDannosVehiculo, 1000, 400);
    	  if (valorRetorno != null)
		  {
        	  //Eliminamos, si la hubiera, las zonas que estuvieran previamente seleccionadas, ya que se vuelve a realizar la validación
        	  eliminarDanosEnImagen();
			  //Obtiene el número de zonas, la posición 0 corresponde con el estado de la accion. El resto
    		  // a elementos dañados registrados.
			  iNumZonas = valorRetorno.length;
			  
			  if (iNumZonas > 1){
    	    	  document.getElementById('perjudicadoVehiculoView.swDannosGenerales').checked = true;
    	    	  document.getElementById('perjudicadoVehiculoView.swDannosGenerales').value = 1;
    	    	  mostrarVehiculo(document.forms[0].idTipoVehiculo,
    	    			  		  document.getElementById('perjudicadoVehiculoView.swDannosGenerales'),
    	    			  		  document.getElementById('perjudicadoVehiculoView.swLunas'),
    	    			  		  document.getElementById('perjudicadoVehiculoView.swNeumaticos'),
    	    			  		  document.forms[0].daniosSeleccionados,
    	    			  		  rutaImgVehiculos);
    	    			  		  
    	    	  var arrayZonasSinRepetir = new Array();
    	    	  var bExisteZona;
    	    	  for (var x = 1; x < iNumZonas; x++)
	    		  {
    	    		if (x == 1){
	    		  		arrayZonasSinRepetir[0] = valorRetorno[x];
	    		  	} else{
	    		  		bExisteZona = false;
	    		  		for (var j = 0; j<arrayZonasSinRepetir.length; j++)
	    		  		{
	    		  			if (arrayZonasSinRepetir[j] == valorRetorno[x])
    		  				{
    		  					bExisteZona = true;
    		  					break;
    		  				}
	    		  		}
	    		  		if (!bExisteZona)
	    		  		{
	    		  			arrayZonasSinRepetir[arrayZonasSinRepetir.length] = valorRetorno[x];
	    		  		}
	    		  	}
	    		  	
	    		  }
    	    	  var nZonasTotal = arrayZonasSinRepetir.length;
    	    	  
    	    	  for (var i = 0; i < nZonasTotal; i++)
    	          {
    	        	  relacionDanosImgRegistro(parseInt(arrayZonasSinRepetir[i]), 'inserta');
       	          }
    	      }
    	      	    	   	  	  
	  		  if (valorRetorno[0]){
	    		  retrieveURLWithoutParameters(window.parent.accionGuardarDannosEnVehiculo);
	    	  }
    	      
		  }
    	  
		
	}
	
	function relacionDanosImgRegistro (valorDannoRegistro, descripcion)
	{	var ivalorDannoRegistro = parseInt(valorDannoRegistro);
		switch (ivalorDannoRegistro) {
			//Corresponde a la zona Frontal
			case 1:
				insertadanos2(1,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno1, '1');
			break;
			//Corresponde a la zona Trasera
			case 2:
				insertadanos2(4,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno4, '4');
			break;
			//Corresponde a la zona Techo
			case 3:
				insertadanos2(7,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno7, '7');
			break;
			//Corresponde al lateral derecho (delantero(2) y trasero(3))
			case 4:
				insertadanos2(2,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno2, '2');
				insertadanos2(3,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno3, '3');
			break;
			//Corresponde al lateral izquierdo (delantero(6) y trasero(5))
			case 5:
				insertadanos2(5,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno5, '5');
				insertadanos2(6,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno6, '6');
			break;
			//Corresponde a la zona Interior, en la imagen se va a identificar con el techo
			case 6:
				insertadanos2(7,'inserta',document.forms[0].daniosSeleccionados,document.forms[0].danno7, '7');
			break;
			      
		}

	}
	
	function eliminarDanosEnImagen(){
		if (imgsSustitucion != null){
			for (var i = 1; i < 8; i++) {
				var danno= eval ("document.getElementById('danno"+ i.toString() + "')");
				limpiarImagen(i,document.forms[0].daniosSeleccionados, danno,i.toString());
			}
			
		}
	}
	function limpiarImagen(valor,pObjeto,pObjetoDanno,img){
		 var idTipoVeh = document.forms[0].idTipoVehiculo.value;
	   	 
	   	 if (idTipoVeh != null && idTipoVeh != undefined){
	   	 	if (idTipoVeh == 1){
	   	 		img = "cov" + img;
	   	 	}else if (idTipoVeh == 2){
	   	 		img = "mv" + img;
	   	 	}else if (idTipoVeh == 3){
	   	 		img = "cv" + img;
	   	 	}else if (idTipoVeh == 4){
	   	 		img = "fv" + img;
	   	 	}else if (idTipoVeh == 5){
	   	 		img = "tv" + img;
	   	 	}else if (idTipoVeh == 6){
	   	 		img = "tvv" + img;
	   	 	}else if (idTipoVeh == 7){
	   	 		img = "cvv" + img;
	   	 	}else if (idTipoVeh == 8){
	   	 		img = "cvv" + img;
	   	 	}else if (idTipoVeh == 9){
	   	 		img = "mvv" + img;
	   	 	}
	   	 }
	   	 if(pObjeto[valor].value == '1'){
	      	showHide('trSec'+ valor, false);
	      	pObjeto[valor].value = 0;
	      	pObjetoDanno.value = 0;
	      	cambialo(img,false);
	     }
	}
	
	/*
	 * Funcion que eliminará los daños que esten seleccionados en el vehículo
	 */
	 function eliminarDannosEnVehiculo(){
		 retrieveURLWithoutParameters(window.parent.accionEliminarDannosEnVehiculo);
	 }
	 