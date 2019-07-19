
function openNavLeft() {
    document.getElementById("mySidenavLeft").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("list-menu").style.width = "250px";
}

function closeNavLeft() {
    document.getElementById("mySidenavLeft").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

function openNavRightAgenda() {
    document.getElementById("mySidenavRight").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("agenda").style.width = "250px";
}
function openNavRightProducto() {
    document.getElementById("mySidenavRight").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("producto").style.width = "250px";
}

function closeNavRight() {
    document.getElementById("mySidenavRight").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
}

function closeProductoDecesos() {
    document.getElementById("productoDecesos").style.display = "none";
}
function showAnotaciones() {
    var anotaciones = document.getElementById("anot");
    anotaciones.classList.add("active");
    var busqueda = document.getElementById("busq");
    busqueda.classList.remove("active");
    document.getElementById("busqueda").style.display = "none";
    document.getElementById("anotaciones").style.display = "block";
}
function showBusqueda() {
    var anotaciones = document.getElementById("anot");
    anotaciones.classList.remove("active");
    var busqueda = document.getElementById("busq");
    busqueda.classList.add("active");
    document.getElementById("anotaciones").style.display = "none";
    document.getElementById("busqueda").style.display = "block";
}
function limpiar(form,camposNoTocar)  {
	  if(form != undefined && form.elements != undefined){
		  var campos = form.elements;
		  var camposLength;
		  try{
			  camposLength = camposNoTocar.length;
		  }catch(e){
			  var camposNoTocar;
		  }
	      for(var i= 0;i<campos.length; i++){
	    	  switch(campos[i].type){
	    	  
		    	  case "text":
		    		  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].value = "";
		              break;
		
		          case "textarea":
		        	  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].value = "";
		              break;
		
		          case "checkbox":
		              if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		                  campos[i].checked = false;
		              break;
		          
		          case "select-one":
		               if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		            	   campos[i].selectedIndex = 0;
		               break;
		          
		          case "hidden":
		               if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		            	   campos[i].value = "";
		               break;
		               
		          case "radio":
		      		  if (camposLength<1 || !comprobarCampos(campos[i].name,camposLength,camposNoTocar))
		      			  campos[i].checked = false;
		      		  break;
	    	  }
	      }
	  }
}

