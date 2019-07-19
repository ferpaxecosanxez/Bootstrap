var meses = [ "enero", "febrero", "marzo", "abril","mayo", "junio", "julio", "agosto", "septiembre", "octubre","noviembre", "diciembre" ]; 
		
function evaluaEstado(value){

	var literalMes = meses[value];	           
	var estadoActual = document.getElementById(literalMes + ".idEstdPeriodoCont");
	var fecCierre = document.getElementById(literalMes + ".fecCierrePlanificado");
	var estadoCierre = document.getElementById(literalMes + ".idEstdCierre");
    if(fecCierre != null && !fecCierre.value==""){
	  if(esFechaValidaSinAlert(fecCierre.value)){
	  	if(estadoCierre != null && estadoCierre.value==""){
	  		//estadoCierre.value = <%= EstdPeriodoCont.CERRADO.getId() %>
	  		estadoCierre.value = 4;
	  	}
	  }	  
    } else {
      estadoCierre.value = "";
    }
    actualizaCalendario();
}

function inicializarFechasCalendario(){	
	for(var i = 0; i < meses[i].length;i++){		
		document.getElementById(meses[i] + ".fecCierrePlanificado").value = "";	
		if(document.getElementById(meses[i] + ".idEstdCierre") != null){
			document.getElementById(meses[i] + ".idEstdCierre").value = "";
		}
	}
}

function seleccionarCalendario(url) {
   // Ventana de calendario

   if(window.document.forms[0].calendario.value != ''){
	   var url = url + "?formOrigen=1&ano=" + document.getElementById("ano").value + "&calendario=" + window.document.forms[0].calendario.value;
   }else{
	   var url = url + "?formOrigen=1&ano=" + document.getElementById("ano").value;
   }

   var valor = lanzarVentana(url,950,450,null);
   if(valor != null && valor != ''){   	  
      // Limpiamos los datos del formulario	
      inicializarFechasCalendario();
	  datos=valor.split("*");
	  fechas=datos[1].split("|");
	   
	   // Se tratan todas las fechas recogidas del calendario 
	   for(var i = 0; i < fechas.length;i++){
	   	if(fechas[i].indexOf("/")!= -1 ){	   
	   	  var diaMes = fechas[i].split("/");
	   	  if( diaMes!=null && diaMes!="" && diaMes!=undefined ){
	  	   	  if(diaMes[0].length == 1){
	  	   		diaMes[0] = "0" + diaMes[0];
	  	      }
	  	   	  // El mes siempre viene con 2 dígitos
	  	   	  var mesAux = diaMes[1];
	  	   	  if(mesAux.substr(0,1)=="0"){
	  	   		  mesAux = mesAux.substr(1,1);
	  	   	  }
	  	   	
	  	   	  if(document.getElementById(meses[mesAux-1] + ".fecCierrePlanificado") != null){
	  	   		  document.getElementById(meses[mesAux-1] + ".fecCierrePlanificado").value = diaMes[0]+ "/" + diaMes[1] + "/" + datos[0];
	  	   	  }
	  	   	  if(document.getElementById(meses[mesAux-1] + ".idEstdCierre") != null && document.getElementById(meses[mesAux-1] + ".idEstdCierre").value==""){
	  	   	    // document.getElementById(meses[mesAux-1] + ".idEstdCierre").value = <%= EstdPeriodoCont.CERRADO.getId() %>;
	  	   	  	document.getElementById(meses[mesAux-1] + ".idEstdCierre").value = 4;
	  	   	  }
 	  	  } else {
 	  	  	document.getElementById(meses[mesAux-1] + ".fecCierrePlanificado").value = "";
 	  	  	document.getElementById(meses[mesAux-1] + ".idEstdCierre").value = "";
 	  	  }
 	  	}
	   }         	   
     setValue("calendario", valor);	           
  }
}

// Actualiza la variable calendario dónde se guardan los días seleccionados
// La cadena es del estilo año*dia0/mes0|dia1/mes1|dia2/mes2 ...
function actualizaCalendario(){
	
	var calendario = document.getElementById("ano").value + "*";
	for(var i = 0; i < meses.length; i++){
		var valorFecha = document.getElementById(meses[i] + ".fecCierrePlanificado").value;		
		if(valorFecha != null && !valorFecha == ""){			
			calendario = calendario + valorFecha.substr(0,5) + "|";			
		}
	}	
	setValue("calendario", calendario);
}

//validar que el formato de una fecha sea válido (mm/dd/aaaa)
 function esFechaValidaSinAlert(fecha){
 	if (fecha != undefined && fecha != "" ) {
 		if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {     		
           return false;
      	}
		        	
        var dia  =  parseInt(fecha.substring(0,2),10);
        var mes  =  parseInt(fecha.substring(3,5),10);
        var anio =  parseInt(fecha.substring(6),10);
        
        if(anio > 2100 || anio<1900){	        
	        return false;
	     }
	     
	    switch(mes){
	        case 1:
	        case 3:
	        case 5:
	        case 7:
	        case 8: 
	        case 10:
	        case 12:
	            numDias=31;
	            break;
	        case 4: case 6: case 9: case 11:
	            numDias=30;
	            break;
	        case 2:
	            if (comprobarSiBisisesto(anio)){ numDias=29 }else{ numDias=28};
	            break;
	        default:	            
	            return false;
	    }
 
        if (dia > numDias || dia==0){            
            return false;
        }
        return true;
    }
}

// Asigna las fechas de cierre automático siempre y cuando no estuviesen rellenas antes
function asignarFechasCierreAuto(){
   var anio = document.getElementById("ano").value;
   for(var i = 0; i < meses.length;i++){
	 var literalFechaCierre = meses[i] + ".fecCierrePlanificado";
	 var fechaCierreMes = document.getElementById(literalFechaCierre);
	 if(fechaCierreMes != null && fechaCierreMes.value == ""){
		numMes = i + 1;
		switch(numMes){
	  	  case 1: case 3: case 5: case 7: case 8: 
			numDias=31;
			numMes = "0" + numMes;	            
	        break;
		  case 10: case 12:
		    numDias=31;
		    break; 
	      case 4: case 6: case 9: 
	      	numDias=30;
	      	numMes = "0" + numMes;
	        break;
	      case 11:
	      	numDias=30;
	        break;
		  case 2:
		  	numMes = "0" + numMes;
		    if (comprobarSiBisisesto(anio)){ 
		       numDias=29 
		    }else{ 
		       numDias=28
		    }
		    break;
		}			
		
		//document.getElementById(meses[i] + ".idEstdCierre").value = <%= EstdPeriodoCont.CERRADO.getId() %>
		if(document.getElementById(meses[i] + ".idEstdCierre")!=null && document.getElementById(meses[i] + ".idEstdPeriodoCont") != 4) {
			document.getElementById(meses[i] + ".idEstdCierre").value = 4;
			fechaCierreMes.value = numDias + "/" + numMes + "/" + anio;
	 	}
	}
  }
  actualizaCalendario();
}