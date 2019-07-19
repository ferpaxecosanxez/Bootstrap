function mostrarContexto(event, html)  {

  var bordeDerecho  = document.body.clientWidth  - event.clientX;  //lo que queda hasta el borde derecho
	var bordeInferior = document.body.clientHeight - event.clientY;  //lo que queda hasta el borde inferior
  
  document.getElementById("caption").innerHTML = html
	if (bordeDerecho < document.getElementById("cContext").offsetWidth) {
    document.getElementById("cContext").style.left =     
      document.body.scrollLeft+event.clientX-getElementById("cContext").offsetWidth
	} else {
		document.getElementById("cContext").style.left = document.body.scrollLeft+event.clientX
	}
	
	if (bordeInferior < document.getElementById("cContext").offsetHeight) {
		document.getElementById("cContext").style.top = 
      document.body.scrollTop+event.clientY-getElementById("cContext").offsetHeight
	} else {
		document.getElementById("cContext").style.top = document.body.scrollTop+event.clientY
	}
	
  document.getElementById("cContext").style.display = "block"
  return false
}

function ocultarContextMenu() {
  document.getElementById("cContext").style.display = "none"
}
