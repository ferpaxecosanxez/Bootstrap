
/*******************************************************************************************/
/* Funciones Generales de la iFace                                                */
/*******************************************************************************************/
  
  //devuelve la fecha...
  function getFecha() {
     var fecha = new Date()
     var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
     var dia = fecha.getDate()
     var mes = meses[fecha.getMonth()]
     var anno = fecha.getFullYear()
     return ""+dia+" de "+mes+" de "+anno
  }

/*******************************************************************************************/
/* Funciones control de espacio de trabajo.                                                */
/* - el arrai 'medidas' contiene todas las combinaciones posibles de medidas de las capas  */
/* - la funcion plegar() establece la posici?n del arrai adecuada en base a cual es el     */
/* elemento a plegar (agneda o menu) y si se encuentra alguno de ellos ya plegado.         */
/* - a continuaci?n llama a la funci?n ajustarCapas() pas?ndole la posici?n del arrai      */
/* adecuada y el elemento (cAgenda, cMenuArea) a plegar/desplegar                              */
/*******************************************************************************************/
var agenda = 238;
var menu = 149;
var pie = 32;
var cabecera;
var areaTrabajo; 
var ancho;
var alto;
var medidas = new Array();
var ancho = screen.width;

//maximizar el navegador 
window.resizeTo(screen.width, screen.height);
window.moveTo(0,0);

window.onload = function()  {

  var ancho = jQuery(document.body).width();
  var alto = jQuery(document.body).height();
//ancho = 1024
//alto = 768
  //aplicar medidas segun ?rea disponible
  document.getElementById("cPie").style.top = eval(alto-pie);
  
  if(ancho != 800)	{
  	document.getElementById("cAgenda").style.left = eval(ancho - agenda);
  	document.getElementById("iAgenda").style.height = eval(alto - (pie+20)); 
  	document.getElementById("cSleep").style.height = eval(alto - (pie+20));
  } else {//resoluci?n de 800 x 600
  	agenda = 0;
  }
  var cCab = document.getElementById("cCabecera").style.width = eval(ancho - ((agenda+menu)-10));
  var cPie = document.getElementById("cPie").style.width = eval(ancho - (agenda+menu));
  var cAreaTrab = document.getElementById("cAreaTrabajo").style.width = eval(ancho - (agenda+menu)); 
  var iAreaTrab = document.getElementById("iAreaTrabajo").style.width = eval(ancho - (agenda+menu+10));
  
  document.getElementById("iAreaTrabajo").style.height = eval(alto -(pie+80));
  document.getElementById("iMenu").style.height = eval(alto - (pie+77));

 
  //mostrar la pantalla
  document.getElementById("cPantalla").style.visibility = "visible";
  
  //medidas para manejar las dimensiones del area de trabajo al contraer la agenda y/o el men?
  medidas = [
    //["cAreaTrabajo.width", "iAreaTrabajo.width", "cAreaTrabajo.x", "cPie/cCabecera.width"]
    //menú plegado, agenda desplegada
    [eval(cAreaTrab+menu-10),eval(iAreaTrab+menu-12),"10px",eval(ancho-agenda)],
    //agenda plegada, menú desplegado
    [eval(cAreaTrab+agenda-6),eval(iAreaTrab+agenda-8),menu,eval(cCab+agenda)],
    //ambos plegados
    [eval(cAreaTrab+agenda+menu-16),eval(iAreaTrab+agenda+menu-18),"10",eval(menu+cCab+agenda)],
    //ambos desplegados
    [cAreaTrab, iAreaTrab, menu,cCab] 
  ]
  
  redimensionarCarga();
}

function redimensionarCarga() {
	setTimeout(function(){
		  divGeneral.style.left = iAreaTrabajo.screenLeft - screenLeft;
		  divGeneral.style.top = iAreaTrabajo.screenTop - screenTop - 2;
		  divGeneral.style.width = document.getElementById('iAreaTrabajo').clientWidth;
		  divGeneral.style.height = document.getElementById('iAreaTrabajo').clientHeight;
	},10);	
}

var menuPlegado = false;
var agendaPlegado = false;
var arbolExpedienteNoAutos = false;
var arbolExpedienteAutos = false;
var arbolExpediente = false;
var arbolProduccionOpetariva = false;
var arbolEntradaBatchOpetariva = false;
var arbolReaseguroOpetariva = false;
var arbolProduccion = false;
var arbolEntradaBatch = false;
var arbolReaseguro = false;
var funcion = null;

var icoAgPlegar = new Image();
icoAgPlegar.src = "img/curvaCabAgenda.gif";
var icoAgDesplegar = new Image();
icoAgDesplegar.src = "img/abrirAgenda.gif";


function plegar(elm, fnc)  {
  funcion = (fnc != null)? fnc : funcion;
  var valores;

  switch(elm)  {
  
    case "cMenuArea"  :
      if(menuPlegado) {
        valores = agendaPlegado ? medidas[1] : medidas[3]
        showHide('minimizarMenu');
      }else{
        valores = agendaPlegado ? medidas[2] : medidas[0]
        showHide('minimizarMenu');
      }
      
      menuPlegado = eval(!menuPlegado)
      break

    case "cAgenda"  :
      if(agendaPlegado) {
        document.getElementById('imgPlegarAgenda').src = icoAgPlegar.src;
        document.getElementById('imgPlegarAgenda').alt = "Minimizar Agenda";
        showHide('desplegarAgenda');
        valores = menuPlegado ? medidas[0] : medidas[3];
      } else  {
        document.getElementById('imgPlegarAgenda').src = icoAgDesplegar.src;
        document.getElementById('imgPlegarAgenda').alt = "Maximizar Agenda";
        showHide('desplegarAgenda');
        valores = menuPlegado ? medidas[2] : medidas[1];
      }
      agendaPlegado = eval(!agendaPlegado)
      break
  }
  ajustarCapas(valores, elm)
}



function ajustarCapas(valores, elm)  {
  if(elm == "cMenuArea" && menuPlegado){
	  document.getElementById("cPie").style.left = valores[2];
	  document.getElementById("cPie").style.width = valores[3];
	  document.getElementById("cAreaTrabajo").style.left = valores[2];
	  document.getElementById("cCabecera").style.left = valores[2];
	  document.getElementById("cCabecera").style.width = valores[0];
  }
  if(elm == "cMenuArea" && !menuPlegado){
	  document.getElementById("cPie").style.width = valores[0];
	  document.getElementById("cAreaTrabajo").style.left = valores[2];
	  document.getElementById("cCabecera").style.left = valores[2];
	  document.getElementById("cCabecera").style.width = valores[0];
	}
  if(elm == "cAgenda") {
	  document.getElementById("cPie").style.width = valores[0];
	  document.getElementById("cCabecera").style.width = valores[0]+10;
  }
  if(!(elm == "cAgenda" && ancho == 800))
	document.getElementById(elm).style.display = (document.getElementById(elm).style.display == "block" 
    || document.getElementById(elm).style.display == "") ? "none" : "block"
  
  document.getElementById("cAreaTrabajo").style.width = valores[0]
  document.getElementById("iAreaTrabajo").style.width = valores[1]
  
  redimensionarCarga();
}

//suspender .. atenua la agenda mostrando una capa semitransparenet (cSleep) por encima.
function sleepAgenda()  {
  if(document.getElementById("cSleep").style.display == "block")
    document.getElementById("cSleep").style.display = "none"
  else
    document.getElementById("cSleep").style.display = "block"
}

var img = new Image()
img.src = "img/agBotRestaurar.png"
function maximizarAgenda(pBol)  {
  if(pBol)  {
    //cuando se maximiza la agenda
    var arrValores = [
      0, ancho, "100%", "hidden", img.src, "restaurar", false
    ]
  }  else {
    //cuando se contrae la a genda a su posici?n original
    var arrValores = [
      eval(ancho - agenda), agenda, agenda, "visible", "img/agBotMaximizar.png", "maximizar", true
    ]
  }
  with (document.getElementById("cAgenda")) {
    style.width = arrValores[1]
    style.left = arrValores[0]
  }
  document.getElementById("iAgenda").style.width = arrValores[2] 
  document.getElementById("cAreaTrabajo").style.visibility = arrValores[3]
  
  with (document.getElementById("imgMaximizar")) {
    src = arrValores[4]
    alt = arrValores[4]
    title = arrValores[5]
    onclick = function()  { maximizarAgenda(arrValores[6])}
  }
}

/********MODIFICACION DE FUNCIONES PARA GARANT?AS********************************************************/

function plegarAmbos()  {
	
	var valores = medidas[2];
        	
	jQuery("#cAreaTrabajo").css("width", valores[0]); 
	jQuery("#iAreaTrabajo").css("width", valores[1]);
    jQuery("#cAreaTrabajo").css("left", valores[2]);
    jQuery("#cCabecera").css("width", valores[3]);
    jQuery("#cPie").css("width", valores[3]);
    		    
    jQuery('#cAgenda').css("display", "none");
    jQuery('#cMenuArea').css("display", "none");
    
    jQuery('#imgPlegarAgenda').attr("src", icoAgDesplegar.src);
	jQuery('#imgPlegarAgenda').attr("alt", "Maximizar Agenda");
	jQuery("#desplegarAgenda").css("display", "block");
    
    menuPlegado = true;
    agendaPlegado = true;
    
    redimensionarCarga();
		
}

function desplegarAmbos()  {
  var valores = medidas[3];
        	
  jQuery("#cAreaTrabajo").css("width", valores[0]); 
  jQuery("#iAreaTrabajo").css("width", valores[1]);
  jQuery("#cAreaTrabajo").css("left", valores[2]);
  jQuery("#cCabecera").css("width", valores[3]);
  jQuery("#cCabecera").css("left", valores[2]);
  jQuery("#cPie").css("width", valores[0]);
    		    
  jQuery('#cAgenda').css("display", "block");
  jQuery('#cMenuArea').css("display", "block");
  jQuery('#minimizarMenu').css("display", "block");
    
  jQuery('#imgPlegarAgenda').attr("src", icoAgPlegar.src);
  jQuery('#imgPlegarAgenda').attr("alt", "Minimizar Agenda");
  
  menuPlegado = false;
  agendaPlegado = false;
    
  redimensionarCarga();
		
}
/*********************************************************************************************/


   function lanzarVentana(pag, width, height, parametros)  {

     var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width="+width+ "px, height="+height+"px, scrollbars=yes"
     if(navigator.appName == "Microsoft Internet Explorer")
       ventana = window.showModalDialog(pag, parametros,"dialogHeight:"+height+"px; dialogWidth:"+width+"px;status:no")
     else
       ventana = window.open(pag,"win","modal=yes, "+args)
     
     return ventana
   }
   
   
 function plegarSiniestro(){

 	if(agendaPlegado==false)
 	plegar("cAgenda");
 }
 
 function inicializarImagenAgenda(){
	 jQuery("#mostrarAgAr").attr("src", imgMostrarAgenda.src);
	 jQuery("#mostrarAgAr").attr("title", toolTipAgenda);
 }
 
 function inicializarControlArbol(){
   arbolExpedienteAutos = false;
   arbolExpediente = false;
   arbolExpedienteNoAutos = false;
   arbolProduccionOpetariva = false;
   arbolEntradaBatchOpetariva = false;
   arbolReaseguroOpetariva = false;
   arbolProduccion = false;
   arbolEntradaBatch = false;
   arbolReaseguro = false;
 }
 
 function mostrarIconoArbol(){
	 jQuery("#agTituloGif").attr("src", imgAgTitulo.src);
	 jQuery("#agTituloGif").html(labelAgenda);
	 jQuery("#mostrarAgAr").attr("src", imgMostrarArbol.src);
	 jQuery("#mostrarAgAr").attr("title", toolTipArbol);
	 jQuery("#mostrarAgAr").attr("alt", toolTipArbol);
 }
 
 function mostrarIconoAgenda(label){
	 jQuery("#agTituloGif").attr("src", imgExpTitulo.src);
	 jQuery("#agTituloGif").html(label);
	 jQuery("#mostrarAgAr").attr("src", imgMostrarAgenda.src);
	 jQuery("#mostrarAgAr").attr("title", toolTipAgenda);
	 jQuery("#mostrarAgAr").attr("alt",  toolTipAgenda);
 }
 
 function arbolAutos(){
   inicializarImagenAgenda();
   inicializarControlArbol();
   arbolExpedienteAutos = true;
   arbolExpediente = true;
 }

 function arbolPr(){ 
   inicializarImagenAgenda();
   inicializarControlArbol()
   arbolProduccionOpetariva = true;
   arbolProduccion = true;
 }
 
 function arbolEb(){ 
   inicializarImagenAgenda();
   inicializarControlArbol()
   arbolEntradaBatchOpetariva = true;
   arbolEntradaBatch = true;
 }
 
 function arbolRea(){
   inicializarImagenAgenda();
   inicializarControlArbol();
   arbolReaseguroOpetariva = true;
   arbolReaseguro = true;
 }
 
 function arbolNoAutos(){
   inicializarImagenAgenda();
   inicializarControlArbol();
   arbolExpedienteNoAutos = true;
   arbolExpediente = true;
 }
 
 function controlArbolExpediente(){
   inicializarControlArbol();
   inicializarImagenAgenda();
 }
 
 function controlArbolProducto(){
   inicializarControlArbol();
   inicializarImagenAgenda();
 }
 
 function mostrarArbolAgenda(){
  // arbol no autos
  if(arbolExpedienteNoAutos!=false){ 
   if(arbolExpediente){
     frames[2].location = accionAgenda;
     mostrarIconoArbol();
	 inicializarControlArbol();
	 arbolExpedienteNoAutos = true;
   }else{
	 frames[2].location = accionExpNoAutos;
	 mostrarIconoAgenda(labelExpediente);
	 inicializarControlArbol();
	 arbolExpediente = true;
	 arbolExpedienteNoAutos = true;
   }
  }
  
  // arbol autos
  if(arbolExpedienteAutos!=false){ 
   if(arbolExpediente){
     frames[2].location = accionAgenda;
     mostrarIconoArbol();
	 inicializarControlArbol();
	 arbolExpedienteAutos = true;
   }else{
	 frames[2].location = accionExpAutos;
	 mostrarIconoAgenda(labelExpediente);
	 inicializarControlArbol();
	 arbolExpediente = true;
	 arbolExpedienteAutos = true;
   }
  }  

  // arbol produccion
  if(arbolProduccionOpetariva!=false){ 
   if(arbolProduccion){
     frames[2].location = accionAgenda;
     mostrarIconoArbol();
	 inicializarControlArbol();
	 arbolProduccionOpetariva = true;
   }else{
	 frames[2].location = accionArbProduccion;
	 mostrarIconoAgenda(labelPoliza);
	 inicializarControlArbol();
	 arbolProduccion = true;
	 arbolProduccionOpetariva = true;
   }
  } 
  
  // arbol entradaBatch
  if(arbolEntradaBatchOpetariva!=false){ 
   if(arbolEntradaBatch){
     frames[2].location = accionAgenda;
     mostrarIconoArbol();
	 inicializarControlArbol();
	 arbolEntradaBatchOpetariva = true;
   }else{
	 frames[2].location = accionArbEntradaBatch;
	 mostrarIconoAgenda(labelPoliza);
	 inicializarControlArbol();
	 arbolEntradaBatch = true;
	 arbolEntradaBatchOpetariva = true;
   }
 }
  
//arbol entradaBatch
  if(arbolReaseguroOpetariva!=false){ 
   if(arbolReaseguro){
     frames[2].location = accionAgenda;
     mostrarIconoArbol();
	 inicializarControlArbol();
	 arbolReaseguroOpetariva = true;
   }else{
	 frames[2].location = accionArbReaseguro;
	 mostrarIconoAgenda(labelReaseguro);
	 inicializarControlArbol();
	 arbolReaseguro = true;
	 arbolReaseguroOpetariva = true;
   }
 }
 }

// Contiene la situacion de la poliza segun el boton que lance la accion
var pulsado="";
 