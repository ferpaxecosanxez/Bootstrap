/*MODIFICADO: A.AGUILERA 05-02-07**************************************************************************************************/
	
	/*Funcion para cambiar la ruta del iframe*/
	function changeGDURL(url)  {  
 		document.getElementById("iGestionDocu").src =  url;     //carga la p?gina: "iGestionDocu" es el marco.
 	}
	
	/*Esconde selects*/
	function escondeSelects(){
		if(!window.attachEvent) return false;
		var selects = frames['iAreaTrabajo'].document.getElementsByTagName("select");
		for( var i=0; i<selects .length; i++ ){
		selects[i].style.display = "none";
		}
	}
	
	/*Muestra selects*/
	function muestraSelects(){
		if(!window.attachEvent) return false;
		var selects = frames['iAreaTrabajo'].document.getElementsByTagName("select");
		for( var i=0; i<selects .length; i++ ){
			selects[i].style.display = "inline";
		}
	}
	
	/*Para mostrar la agenda por encima*/
	function flotaAgenda(){
		if(document.getElementById('cGestionDocu').style.display=="block"){
			document.getElementById('cAgenda').style.display = "block"; 
			escondeSelects();
		}
	}	
	
	function dflotaAgenda(){
	//alert(parent.document.body.cols)
		if(document.getElementById('cGestionDocu').style.display=="block"){
			document.getElementById('cAgenda').style.display = "none";
			muestraSelects();
		}
	}
	
	function flotaMenu(){
		if(document.getElementById('cGestionDocu').style.display=="block"){
			document.getElementById('cMenuArea').style.display = "block"; 
			escondeSelects();
		}
	}
			
	function dflotaMenu(){
	//alert(parent.document.body.cols)
		if(document.getElementById('cGestionDocu').style.display=="block"){
			document.getElementById('cMenuArea').style.display = "none";
			muestraSelects();
		}
			
	}	
	
var despliegueGD = false; //variable para saber si esta desplegada la GD
	
function funcionDocumental(pam){
		
	if(pam==true){
		
		//Estas dos primeras sentencias if son para asegurar que la situacion de partida antes de
		//disparar la gestion documental es aquella en que agenda y menu estan visibles 
		//y evitar asi posibles descuadres en las medidas de las capas implicadas
		//alert(menuPlegado);
		//alert(agendaPlegado);
		
		if (menuPlegado) {
	   		// Funcion para maximizar el menu
	     	plegar('cMenuArea');
	   	}

      	if (agendaPlegado) {
       		// Para maximizar la Agenda
       		plegar('cAgenda');
      	}
		//alert(document.getElementById('cGestionDocu').currentStyle.getAttribute('display'));
		/*izq*/	//document.getElementById("cGestionDocu").style.left = 770 + "px"; //--------------------------------- 640 // 770 // 900
		document.getElementById("cGestionDocu").style.display="block";
		//document.getElementById("cGestionDocu").display="block";
		document.getElementById("cGestionDocu").style.width = 510 + "px";
		document.getElementById("cGestionDocu").style.left = 0 + "px"; //------------------------------------- 640 // 770 // 900
		document.getElementById("cGestionDocu").style.top = 0 + "px";
		
		//Dimensiones para el iframe de gestion documental 
		// --------------- (anchos de la capa cGestionDocu - le quitaremos 5 al iframe) ---------------------- 640 // 510 // 380
		document.getElementById("iGestionDocu").style.left = 0 + "px";				// ------------------- 630 // 500 // 370										
		document.getElementById("iGestionDocu").style.width = 505 + "px";				// ------------------- 630 // 500 // 370										
		document.getElementById("iGestionDocu").style.height = eval(alto - pie);
		
/*izq*/	document.getElementById("cCabecera").style.left = 510 + "px";
		document.getElementById("cCabecera").style.width = eval(ancho - 510); //--------------- 640 // 510 // 380
		//alert(document.getElementById("cCabecera").style.width);
		document.getElementById("tblCabecera").style.width = 770 + "px"; //----------------------------------- 640 // 770 // 900
			
/*izq*/	document.getElementById("cPie").style.left = 510 + "px";
		document.getElementById("cPie").style.width = 770 + "px"; //------------------------------------------ 640 // 770 // 900
		
/*izq*/	document.getElementById('desplegarMenu').style.left=510+"px";
		document.getElementById("cMenuArea").style.display = "none"; 
/*izq*/	document.getElementById("cMenuArea").style.left = 510+'px';
		
/*izq*/	//document.getElementById("cAgenda").style.left = eval(ancho - agenda - 510); //---------------------- 637 // 510 // 380
		document.getElementById("cAgenda").style.display = "none"; 
		document.getElementById("cAgenda").style.left = eval(ancho - agenda); //------------------------------ 637 // 510 // 380
		
		
/*izq*/	//document.getElementById("cAreaTrabajo").style.left = 0+'px';
		document.getElementById("cAreaTrabajo").style.left = 510+'px';
		document.getElementById("cAreaTrabajo").style.width = 770 + "px"; //---------------------------------- 640 // 770 // 900
		document.getElementById("iAreaTrabajo").style.width = eval(ancho - 510); //--------------------------- 640 // 510 // 380
			  
		document.getElementById("imgPlegarAgenda").onmouseover = function()  {flotaAgenda();escondeSelects()}
		//evitar que al visualizar el menu, este se minimice al hacer click sobre el
		document.getElementById("minimizarMenu").onclick=function(){}
				
		document.getElementById("imgDocu").onclick=function(){funcionDocumental(false)} 
		
		//menuPlegado = true;
		//agendaPlegado = true;
		
				
		despliegueGD = true;

	}else if(pam==false){
		//alert(menuPlegado);
		//alert(agendaPlegado);
		
		muestraSelects();
	  	document.getElementById("cGestionDocu").style.display="none";
		document.getElementById("cGestionDocu").style.left=0+"px";
		
/*izq*/	document.getElementById("cCabecera").style.left = 0 + "px";
	 	document.getElementById("cCabecera").style.width = eval(ancho-agenda);
		document.getElementById("tblCabecera").style.width = "100%";
		
/*izq*/	document.getElementById("cPie").style.left = 0 + "px";
		document.getElementById("cPie").style.width = eval(ancho-agenda);
		document.getElementById("cPie").style.top = eval(alto-pie);
		
/*izq*/	document.getElementById("desplegarMenu").style.left=0+"px";
/*izq*/	document.getElementById("cMenuArea").style.left = 0+'px';
	    document.getElementById("cMenuArea").style.display = "block"; 
	    document.getElementById("iMenu").style.height = eval(alto - (pie+77));
	    		
		document.getElementById("cAgenda").style.display = "block"; 
		document.getElementById("cAgenda").style.left = eval(ancho - agenda);
		document.getElementById("iAgenda").style.height = eval(alto - (pie+19));
		document.getElementById("cSleep").style.height = eval(alto - (pie+19));
		
		document.getElementById("cAreaTrabajo").style.left = menu;
		document.getElementById("cAreaTrabajo").style.width = eval(ancho - (agenda+menu));
        document.getElementById("iAreaTrabajo").style.width = eval(ancho - (agenda+menu+10));
        document.getElementById("iAreaTrabajo").style.height = eval(alto -(pie+80));
	   		  		  	
 	  	document.getElementById("imgPlegarAgenda").onmouseover = function()  {flotaAgenda();}
	  	//se vuelve a restablecer la funcionalidad del onclick del boton minimizar menu
	 	document.getElementById("minimizarMenu").onclick=function(){plegar('cMenuArea')}
	 	
	 	document.getElementById("imgDocu").onclick=function(){funcionDocumental(true)} 
	 	
		menuPlegado = false;
		agendaPlegado = false;
		
		despliegueGD = false;
		
	}
}