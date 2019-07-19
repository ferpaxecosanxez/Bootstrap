var nodes = new Array();
var selectedNode = new Object();
var openedNodeContainer = null;
var openedNodeType = null;
var flagNegotiateNode = true;
var flagParentLevel = 2; //nivel utilizado para encontrar el ancestro com?n a los nodos
//constantes
var ID     = "id_";
var ID_IMG = "img_"

  function showHide(nodo,tipoNodo,isBranch) {    
    
    // gesti?n de seleccion del nodo
    illuminate(nodo,tipoNodo,isBranch);
    
    //si no es una rama (es decir tiene hijos), salimos
    if (!isBranch) return;
    
    //obtenemos desde la cabecera pinchada, la capa contenedora de los hijos 	
    nodeContainer = getNodeContainer(nodo);
    
    icoNode = getNodeImage(nodo);
    
    //evaluamos el estado del nodo
    switch (nodeContainer.style.display)  {  
      //si el nodo est? abierto
      case "block":      
	      //se pliega la capa contenedora y todos los hijos abiertos
	      nodeContainer.style.display ="none";
	      icoNode.src = getCloseIco(tipoNodo);
	      closeChildrens(nodeContainer)      
	      break;
      
      //si el nodo esta cerrado  
      case "none":
        //si no venimos de un cierre de una rama padre
        if (flagNegotiateNode){
	        //se abre solo el nodo tratado
	      	nodeContainer.style.display="block";
	      	icoNode.src = getOpenIco(tipoNodo);
   	   	    //closeBrotherNode(nodo);
      	}
        break;
        
       case "":
          //si no venimos de un cierre de una rama padre
        if (flagNegotiateNode){
	        //se abre solo el nodo tratado
	      	nodeContainer.style.display="block";
	      	icoNode.src = getOpenIco(tipoNodo);
			//closeBrotherNode(nodo);
      	}
        break;
      }
		saveOpenedNode(tipoNodo);
  }

  /*
  * funcion que cierra el nodo hermano (del mismo nivel) que contiene a los nodos contenedores abiertos
  *
  */


  function closeBrotherNode(nodo){        
   	//se cierra el anterior nodo abierto, si es que habia alguno
   	var container;
   	var head;
  	if (openedNodeContainer != null){    	
   	    //obtenemos el nodo cabecera que ya estaba abierto, desde su contenedor
   	    openedNodeHead    = getNodeHead(openedNodeContainer);  	   	    
   	 //si pincha sobre si mismo   
   	 if (openedNodeHead.id == nodo.id) return;   
   	    
  	 //si el seleccionado y el nuevo tienen distinto nivel
  	 if (getLevel(openedNodeHead) != getLevel(nodo)){
  	 	//obtengo el hermano del nodo pinchado, que sea padre del seleccionado
  	 	container = getParentNodeBrother(openedNodeHead);
  	 	head = getNodeHead(container);
  	 }else{
  	 //si el seleccionado y el nuevo son del mismo nivel (hermanos)
		container = openedNodeContainer;
		head = openedNodeHead;
  	 }
  	    container.style.display = "none";
 	    openedIcoNode     = getNodeImage(head);
   	    openedIcoNode.src = getCloseIco(openedNodeType);	      	    
   		closeChildrens(container);
   	}
  }

  function illuminate(nodo,tipoNodo)	{    
    //cancelamos la burbuja de eventos
    window.event.cancelBubble = true;
    //comprobamos si existia un nodo anterior marcado
    if (selectedNode.className != undefined){
    	//devolvemos el estado anterior al nodo ya marcado
    	document.getElementById(selectedNode.id).className = selectedNode.className;
    }
    
    //obtenemos el nodo cabecera, que es el que se marcar
     var nodeHead = getNodeHead(nodo);     
    //guardamos el estado actual del nodo antes de cambiar la clase CSS del mismo
    selectedNode.className = nodeHead.className;
    selectedNode.id        = nodeHead.id;
    
    //obtenemos la clase CSS para el nodo en base a su tipo y lo marcamos    
    nodeHead.className = getSelectedClass(tipoNodo);
  }

  function getNodeContainer(nodo){
      var idNodeContainer;
  	  //si ha pulsado sobre la imagen, obtenemos su id 	
	  if(nodo.tagName == "IMG"){
	    idNodeContainer = ID + nodo.id.substr(ID_IMG.length);
	  }else{
	    idNodeContainer = ID + nodo.id;
	  }
	  
	  return document.getElementById(idNodeContainer)
  }

  function getNodeHead(nodo){
        var idNodeHead;
  	  //si ha pulsado sobre la imagen, obtenemos su id 	
	  if(nodo.tagName == "IMG"){
	    idNodeHead = nodo.id.substr(ID_IMG.length);
	  }else{
	    //si el nodo que recibe es un contenedor
	    if (nodo.id.indexOf(ID) != -1){
	    	idNodeHead = nodo.id.substr(ID.length);
	    }else{	  
	    	idNodeHead = nodo.id;
	    }
	  }
	  
	  return document.getElementById(idNodeHead)
  }


    function closeChildrens(nodo)  {
	    //obtenemos todas los DIV's hijos del actual si es una rama (es decir tiene hijos)
	    var capasHijas = nodo.getElementsByTagName("DIV");
	    //establecemos el flag de recursividad tratado en showHide
      	flagNegotiateNode = false;	
	    //recorremos las capas hijas, ocultando todas las que sean ramas
	    for (var i=0; i < capasHijas.length; i++)   {        
	      //si la capa es cabecera
	      if(capasHijas[i].id.indexOf(ID) == -1) {
	        // y ademas es padre y su capa contenedora esta abierta
	        var nodeContainer = getNodeContainer(capasHijas[i]);
	        if (nodeContainer != null && nodeContainer.style.display == "block"){
	        	//llamamos recursivamente el evento onclick para cerrar cada capa
	        	capasHijas[i].onclick();
	        }
	      }       
	     }
	     //liberamos el flag de recursividad
	     flagNegotiateNode = true;
     }

/**
* objeto nodo utilizado, que identifica las propiedades de cada nodo en base a su tipo
*/
  function treeNode(pType, pIcoClose, pIcoOpen, pSelectedClass){
    this.type = pType;
  	this.icoClose = pIcoClose;    
  	this.icoOpen = pIcoOpen;
  	this.selectedClass = pSelectedClass;
  }
  
  function getSelectedClass(pType){  
	  for (i = 0; i < nodes.length; i++){
	  	if (nodes[i].type == pType){  	
	  		return nodes[i].selectedClass;
	  	}
	  }  
  }
  
  function getOpenIco(pType){  
	  for (i = 0; i < nodes.length; i++){
	  	if (nodes[i].type == pType){  	
	  		return nodes[i].icoOpen;
	  	}
	  }  
  }  

  function getCloseIco(pType){  
	  for (i = 0; i < nodes.length; i++){
	  	if (nodes[i].type == pType){  	
	  		return nodes[i].icoClose;
	  	}
	  }  
  }

  /*
  * devuelve true si ambos nodos tienen un padre comun, la variable nivel epieza en 0 para nodo raiz
  */
  function isCommonParent(nodoA, nodoB, parentLevel){
    var bOk = true;
  	var nodeHeadA = getNodeHead(nodoA);
  	var nodeHeadB = getNodeHead(nodoB);
  	
  	var arrParentA = nodeHeadA.id.split(".",parentLevel);
  	var arrParentB = nodeHeadB.id.split(".",parentLevel);  	
  	
  	//si no estamos trabajando con el nodo raiz
  	if (arrParentA.length == parentLevel  && arrParentB.length == parentLevel){
  		for (i=0; i < arrParentA.length; i++){
  			if (arrParentA[i] != arrParentB[i]){
  				bOk = false;
  				break;
  			}
  		}
  	}else{
  	//si estamos trabajando con el nodo raiz
  	 bOk =(arrParentA[0] == arrParentB[0]) 
  	} 	
    return bOk;
  }

/**
* devuelve el nodo cabecera padre del actual
*/
  function getParentNode(nodo){
  //obtenemos el nodo de cabecera del pasado
  var nodeHead = getNodeHead(nodo);
  var idParentNode;
  
  
  idParentNode = nodeHead.id.substr(0,nodeHead.id.lastIndexOf("."));
  return document.getElementById(idParentNode)   
  }
  
  
  function getNodeImage(nodo){
	//obtenemos la imagen para el nodo
  	if (nodo.tagName != "IMG"){
  		icoNode = nodo.getElementsByTagName("IMG")[0];
  	}else{
  		icoNode = nodo;
  	}
  	return icoNode;  
  }
  
  
  function getParentNodeBrother(nodo){
     
  	//obtenemos el nivel del nodo que pinchamos
  	nodeLevel = getLevel(nodo);
  	//obtengo el nodo hermano del que pinchamos (mismo nivel) que es padre directo del que estaba seleccionado
  	arrNodes = nodo.id.split(".");
  	
  	var startPos = 0;
  	var nodeBrotherId = "";
  	for (i=0;i < arrNodes.length;i++){
  	  if (i==0){ 
  	  	nodeBrotherId += arrNodes[i];
  	  }else{
   	  	nodeBrotherId += "." + arrNodes[i];
  	  }
  	  //si hemos alcanzado el nivel del nodo que ya estaba abierto  	  
  	  if (i+1 == nodeLevel) break;
  	}
  	
  	return document.getElementById(nodeBrotherId);  	
  	
  }
  
  function saveOpenedNode(tipoNodo){  
   	//guardamos el nodo contenedor abierto en el momento y el tipo del mismo, si es que existe alguno    
  	openedNodeContainer = getNodeContainer(document.getElementById(selectedNode.id));
   	openedNodeType = tipoNodo;
  }
  
  function getLevel(nodo){
    	//obtenemos el nivel del nodo en que estoy trabajando, en base a su id    
	return nodo.id.split(".").length;  	

  }
     