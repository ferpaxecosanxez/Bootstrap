   function validarCampos(tipoFamilia) {
   		// Validamos campos obligatorios
   		if (document.getElementById("fechaSntro").value == "") {
            alert(mensajeErrorFecha);
   		} else if (document.getElementById("numPoliza").value == "" && document.getElementById("matricula").value == "") {
			alert(mensajeErrorValidacion);
   		} else if ( ((tipoFamilia == familiaHogar) || (tipoFamilia == familiaAuto)) && document.getElementById("idTipologiaStro").value == "") {
				alert(mensajeErrorTipologiaStro);
   		} else if (validaChequeados()){
   			//avisamos si se desea continuar con la grabación del expediente
            if (confirm(msgContinuarApertura)){
            	document.getElementById('operacionApertura').value = opSiguiente;
                accUrl=accionValidarCampos;       
                document.forms[0].action=accUrl;
                muestraCarga();
                
                //si está disabled lo ponemos enabled para que lo pille bien el formulario
                if (document.getElementById("sntroPolizaInterfaz.riesgos[0].swRiesgoAfectado").disabled == true){
    		        document.getElementById("sntroPolizaInterfaz.riesgos[0].swRiesgoAfectado").disabled = false;
    	        }
                document.getElementById("tipoFecha").disabled = false;
    	        document.forms[0].submit(); 
            }
		 		
   		} else {
   			alert(mensajeErrorChequeado);
   		}
   }
   
  function validaChequeados(){
  	var marcado = false;
  	var i = 0;
  	while (i<numRiesgos && !marcado){
		marcado = document.getElementById("riesgo"+i).checked;
		i++;  	
  	}
	return marcado;  
  }  
   
  function controlChecksRiesgos(pCheck) {
    var tablaChecks = document.getElementById("tablaChecksRiesgos");
    for (var i=0;i < tablaChecks.children.length;i++) { // recorrer filas
      if (tablaChecks.children[i].children[0].children[0] != null && 
    	tablaChecks.children[i].children[0].children[0].type == "checkbox" ){
    	  if (tablaChecks.children[i].children[0].children[0] != pCheck){
    		  tablaChecks.children[i].children[0].children[0].checked = false;
    	  }else{
    		  document.forms[0].numRiesgoSeleccionado.value = tablaChecks.children[i].children[1].innerText;
    	  }
      }
    }
  }

  function salir(){
      var pag =  accionSalir;
      document.forms(0).action = pag;
      submitForm(document.forms[0],null,'iAreaTrabajo');
  }
  
  function seleccionarFamilia(tipo) {
	document.getElementById("capaAutos").style.display = "none";
	document.getElementById("capaParticulares").style.display = "none";
	document.getElementById("capaIndustriales").style.display = "none";
	
	if (tipo == familiaAuto) {
		document.getElementById("capaAutos").style.display = "block";
        document.getElementById("tipoFecha").value = tipoFechaOperacion;
	}else if (tipo == familiaHogar) {
		document.getElementById("capaParticulares").style.display = "block";
		showHide("tipologia", true);
		document.getElementById("tipoFecha").value = tipoFechaOperacion;
	}else if (tipo == familiaIndus) {
		document.getElementById("capaIndustriales").style.display = "block";
		//bug#7520 - se permiten distintos tipos de fecha
		if (getValue('tipoFecha') == ''){
			document.getElementById("tipoFecha").value = tipoFechaOperacion;
		}
	}
	familiaSeleccionada = tipo;
  }
  