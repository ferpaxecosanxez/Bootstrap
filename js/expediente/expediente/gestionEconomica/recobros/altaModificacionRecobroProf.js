  /* Funcion para el control del limite reserva */
  function controlLimiteRecobroProf(pObjeto, indiceRecobro, idName){
    // Importe total de todas los detalles del recobro
    var totalImporte = 0;

    // Todos los objetos detalle del recobro
    var lstRecobro = document.getElementsByName(idName);

    // Lista con todos detalles del recobro
    var importeTotalLiquido = document.getElementById('importeTotal');

    // Lista con los detalles de recobro para un determinado concepto de reserva
    var lstRecobrosXConcepto =  document.getElementsByName('lstImportesActuales');
    var importeRecobrosXConcepto = 0;
      
    var recobroDetalleAnterior = document.getElementById('lstImportesAnteriores_'+indiceRecobro);
    var recobroDetalleActual = document.getElementById('lstImportesActuales_'+indiceRecobro); 
    recobroDetalleActual.value = pObjeto.value;
      
    //Flags para saber si el importe corresponde a un concepto de Gastos u Honoraros
    var swGastos = document.getElementById('swGastos_'+indiceRecobro).value;
    var swHonor = document.getElementById('swHonorarios_'+indiceRecobro).value;

    //Importes Base totales
    var importeBaseHonor = document.getElementById('idDivImporteBaseHonor').innerHTML;
    var importeBaseGastos = document.getElementById('idDivImporteBaseGastos').innerHTML;

    for(var i=0;i < lstRecobrosXConcepto.length; i++) {
      
      var importeRecobro = lstRecobrosXConcepto[i].value;
      importeRecobro = formateaVistaNegocio(importeRecobro);
      importeRecobrosXConcepto += importeRecobro;
        
    }
      
    recobroDetalleActual.value = recobroDetalleActual.value.toString().replace('.','');
    recobroDetalleActual.value = recobroDetalleActual.value.toString().replace('.','');
    recobroDetalleActual.value = formateoDecimales(recobroDetalleActual.value.toString(),',',2,'.',11);
    recobroDetalleActual.value = mascaraDecimal(recobroDetalleActual.value.toString(),',','2');
    
    recobroDetalleAnterior.value = recobroDetalleAnterior.value.toString().replace('.','');
    recobroDetalleAnterior.value = recobroDetalleAnterior.value.toString().replace('.','');
    recobroDetalleAnterior.value = formateoDecimales(recobroDetalleAnterior.value.toString(),',',2,'.',11);
    recobroDetalleAnterior.value = mascaraDecimal(recobroDetalleAnterior.value.toString(),',','2');
    
    var variacionImporte =  formateaVistaNegocio(recobroDetalleActual.value) - formateaVistaNegocio(recobroDetalleAnterior.value);
    recobroDetalleAnterior.value = recobroDetalleActual.value;
    document.getElementById('importesBBDD_'+indiceRecobro).value = recobroDetalleActual.value;
  
    // Sumamos todos los importes de los recobros
    for(var i=0;i < lstRecobro.length; i++){
      var importeRecobro = lstRecobro[i].value;
      importeRecobro = formateaVistaNegocio(importeRecobro);
      totalImporte += importeRecobro;
    }

    //Los mostramos en la pagina
    var importeTotalPantalla = totalImporte /100;
    document.getElementById('importeTotalRecobro').value = importeTotalPantalla.toString();
    
    var importeAGuardar = importeTotalPantalla.toString().replace('.',',');
    document.getElementById('recobroView.importeTotalRecobro').value = importeAGuardar;
        
    //Si estamos en una regularizacion de iva
    if (swRegIva == '1') {
      
	  // Se recoge el importe de provisión de recobro correspondiente al valor inicial de BBDD
      var provisionRecobro = formateaVistaNegocio(document.forms[0].elements['recobroDetalle['+indiceRecobro+'].reservaRecobroView.importeInicialBD'].value);
      if (provisionRecobro > 0){
    	  // Si el recobro a realizar es por un importe mayor o igual al provisionado se inicializa el importe de provisionamiento
          if (formateaVistaNegocio(recobroDetalleActual.value) >= provisionRecobro){
        	  provisionRecobro = undoNumber("0,00");
          }else{
        	  //En otro caso, se resta de la provisión 
        	  provisionRecobro = provisionRecobro - formateaVistaNegocio(recobroDetalleActual.value);
          }
          //seteamos resultado sobre el importe que quedará de provisión.
          document.forms[0].elements["recobroDetalle["+indiceRecobro+"].reservaRecobroView.importe"].value = formatea(provisionRecobro);
      }
    
      document.getElementById('idDivImporteIva_'+indiceRecobro).innerHTML = recobroDetalleActual.value;
      document.getElementById('idDivImporteTotalConceptoRecobro_'+indiceRecobro).innerHTML = recobroDetalleActual.value;
      
      //Se comprueba si el importe modificado es de Honorarios o Gastos
      if (swHonor == '1'){
      
        var importeTotalIva = formateaVistaNegocio(document.getElementById('idDivTotalIvaHonor').innerHTML);
        importeTotalIva = importeTotalIva + variacionImporte;
        document.getElementById('idDivTotalIvaHonor').innerHTML = formatea(importeTotalIva);
        document.getElementById('impcTotalIVAHonorarios').value = formatea(importeTotalIva);
          
        document.getElementById('idDivTotalHonor').innerHTML = formatea(importeTotalIva);
        document.getElementById('impcTotalHonorarios').value = formatea(importeTotalIva);
          
        var importeTotalGastos = formateaVistaNegocio(document.getElementById('idDivTotalGastos').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalIva + importeTotalGastos);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalIva + importeTotalHonor);
          
      }else if (swGastos == '1') {
      
        var importeTotalIva = formateaVistaNegocio(document.getElementById('idDivTotalIrpfGastos').innerHTML);
        importeTotalIva = importeTotalIva + variacionImporte;
        document.getElementById('idDivTotalIvaGastos').innerHTML = formatea(importeTotalIva);
        document.getElementById('impcTotalIVAGastos').value = formatea(importeTotalIva);
          
        document.getElementById('idDivTotalGastos').innerHTML = formatea(importeTotalIva);
        document.getElementById('impcTotalGastos').value = formatea(importeTotalIva);
          
        var importeTotalHonor = formateaVistaNegocio(document.getElementById('idDivTotalHonor').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalIva + importeTotalHonor);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalIva + importeTotalHonor);
         
      }
      
    //Si estamos en una regularizacion de irpf  
    } else if (swRegIrpf == '1') {
    	
	  // Se recoge el importe de provisión de recobro correspondiente al valor inicial de BBDD
      var provisionRecobro = formateaVistaNegocio(document.forms[0].elements['recobroDetalle['+indiceRecobro+'].reservaRecobroView.importeInicialBD'].value);
      if (provisionRecobro > 0){
  	      // Si el recobro a realizar es por un importe mayor o igual al provisionado se inicializa el importe de provisionamiento
          if (formateaVistaNegocio(recobroDetalleActual.value) >= provisionRecobro){
      	    provisionRecobro = undoNumber("0,00");
          }else{
      	    //En otro caso, se resta de la provisión 
      	    provisionRecobro = provisionRecobro - formateaVistaNegocio(recobroDetalleActual.value);
          }
          //seteamos resultado sobre el importe que quedará de provisión.
          document.forms[0].elements["recobroDetalle["+indiceRecobro+"].reservaRecobroView.importe"].value = formatea(provisionRecobro);
      }

    
      document.getElementById('idDivImporteIrpf_'+indiceRecobro).innerHTML = recobroDetalleActual.value;
      document.getElementById('idDivImporteTotalConceptoRecobro_'+indiceRecobro).innerHTML = recobroDetalleActual.value;
      
      //Se comprueba si el importe modificado es de Honorarios o Gastos
      if (swHonor == '1'){
      
        var importeTotalIrpf = formateaVistaNegocio(document.getElementById('idDivTotalIrpfHonor').innerHTML);
        importeTotalIrpf = importeTotalIrpf + variacionImporte;
        document.getElementById('idDivTotalIrpfHonor').innerHTML = formatea(importeTotalIrpf);
        document.getElementById('impcTotalIRPFHonorarios').value = formatea(importeTotalIrpf);
          
        document.getElementById('idDivTotalHonor').innerHTML = formatea(importeTotalIrpf);
        document.getElementById('impcTotalHonorarios').value = formatea(importeTotalIrpf);
          
        var importeTotalGastos = formateaVistaNegocio(document.getElementById('idDivTotalGastos').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalIrpf + importeTotalGastos);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalIrpf + importeTotalGastos);
          
      } else if (swGastos == '1') {
      
        var importeTotalIrpf = formateaVistaNegocio(document.getElementById('idDivTotalIrpfGastos').innerHTML);
        importeTotalIrpf = importeTotalIrpf + variacionImporte;
        document.getElementById('idDivTotalIrpfGastos').innerHTML = formatea(importeTotalIrpf);
        document.getElementById('impcTotalIRPFGastos').value = formatea(importeTotalIrpf);
          
        document.getElementById('idDivTotalGastos').innerHTML = formatea(importeTotalIrpf);
        document.getElementById('impcTotalGastos').value = formatea(importeTotalIrpf);
          
        var importeTotalHonor = formateaVistaNegocio(document.getElementById('idDivTotalHonor').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalIrpf + importeTotalHonor);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalIrpf + importeTotalHonor);
          
      }
      
      //Si no estamos ni en regularizacion Iva ni Irpf (hay que calcular los totalesIva e Irpf)
    } else {
      var totalIrpf = 0;
      var totalIva = 0;
      var totalConcepto = 0;
        
      var importeRecobro = formateaVistaNegocio(recobroDetalleActual.value);
      var importeBase = importeRecobro;

      porcIrpf = document.getElementById('porcIrpfBBDD_'+indiceRecobro).value;
      porcIrpf = porcIrpf.replace(',','.');
      porcIrpf = parseFloat(porcIrpf);
      porcIrpf = porcIrpf /100;

      porcIva = document.getElementById('porcIvaBBDD_'+indiceRecobro).value;
      porcIva = porcIva.replace(',','.');
      porcIva = parseFloat(porcIva);
      porcIva = porcIva /100;

      if (porcIrpf != '') {

        totalIrpf = importeRecobro * porcIrpf;

      }
        
      if (porcIva != '') {
        
        totalIva = importeRecobro * porcIva;
          
      }
        
      totalConcepto = importeRecobro - totalIrpf + totalIva;
      
      // Se recoge el importe de provisión de recobro correspondiente al valor inicial de BBDD
      var provisionRecobro = formateaVistaNegocio(document.forms[0].elements['recobroDetalle['+indiceRecobro+'].reservaRecobroView.importeInicialBD'].value);
      if (provisionRecobro > 0){
      	// Si el recobro a realizar es por un importe mayor o igual al provisionado se inicializa el importe de provisionamiento
          if (totalConcepto >= provisionRecobro){
          	provisionRecobro = undoNumber("0,00");
          }else{
          	//En otro caso, se resta de la provisión 
          	provisionRecobro = provisionRecobro - totalConcepto;
          }
          //seteamos resultado sobre el importe que quedará de provisión.
          document.forms[0].elements["recobroDetalle["+indiceRecobro+"].reservaRecobroView.importe"].value = formatea(provisionRecobro);
      }
      
      importeTotalRecobroPantalla = importeRecobro + totalIva;
      totalConcepto = formatea(totalConcepto);
      document.getElementById('lstImportesLiquidos_'+indiceRecobro).value = totalConcepto; 

      totalIva = formatea(totalIva);
      totalIrpf = formatea(totalIrpf);
      importeBase = formatea(importeBase);
      importeTotalRecobroPantalla= formatea(importeTotalRecobroPantalla);
        
      document.getElementById('idDivImporte_'+indiceRecobro).innerHTML = importeBase;
      document.getElementById('idDivImporteIva_'+indiceRecobro).innerHTML = totalIva;
      document.getElementById('importeIvaBBDD_'+indiceRecobro).value = totalIva;
      document.getElementById('idDivImporteIrpf_'+indiceRecobro).innerHTML = totalIrpf;
      document.getElementById('importeIrpfBBDD_'+indiceRecobro).value = totalIrpf;
      document.getElementById('idDivImporteTotalConceptoRecobro_'+indiceRecobro).innerHTML = totalConcepto;
        
      totalImporte = 0;
        
      // Todos los objetos detalle del recobro
      var lstRecobroLiquido = document.getElementsByName('importeLiquido');
    
      // Sumamos todos los importes liquidos de los recobros
      totalImporteLiquido = 0;
      for(var i=0;i < lstRecobroLiquido.length; i++){
        var importeRecobroLiquido = lstRecobroLiquido[i].value;
        importeRecobroLiquido = formateaVistaNegocio(importeRecobroLiquido);
        totalImporteLiquido += importeRecobroLiquido;
      }
      totalImporteLiquido = formatea(totalImporteLiquido);
      document.getElementById('importeLiquidoRecobro').value = totalImporteLiquido;
      document.getElementById('recobroView.importeLiquidoRecobro').value = totalImporteLiquido;
      importeTotalLiquido.innerHTML = totalImporteLiquido.toString();
        
      if (swHonor == '1'){
      
        var importeBaseHonor = formateaVistaNegocio(document.getElementById('idDivImporteBaseHonor').innerHTML);
        importeBaseHonor = importeBaseHonor + variacionImporte;
        document.getElementById('idDivImporteBaseHonor').innerHTML = formatea(importeBaseHonor);
        document.getElementById('impcImporteBaseHonorarios').value = formatea(importeBaseHonor);;

        var importeTotIrpf = importeBaseHonor * porcIrpf;
        document.getElementById('idDivTotalIrpfHonor').innerHTML = formatea(importeTotIrpf);
        document.getElementById('impcTotalIRPFHonorarios').value = formatea(importeTotIrpf);

        var importeTotIva = importeBaseHonor * porcIva;
        document.getElementById('idDivTotalIvaHonor').innerHTML = formatea(importeTotIva);
        document.getElementById('impcTotalIVAHonorarios').value = formatea(importeTotIva);

        var importeTotalHonor = importeBaseHonor - importeTotIrpf + importeTotIva;
        document.getElementById('idDivTotalHonor').innerHTML = formatea(importeTotalHonor);
        document.getElementById('impcTotalHonorarios').value = formatea(importeTotalHonor);

        var importeTotalGastos = formateaVistaNegocio(document.getElementById('idDivTotalGastos').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalHonor + importeTotalGastos);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalHonor + importeTotalGastos);

      } else if (swGastos == '1') {
      
        var importeBaseGastos = formateaVistaNegocio(document.getElementById('idDivImporteBaseGastos').innerHTML);
        importeBaseGastos = importeBaseGastos + variacionImporte;
        document.getElementById('idDivImporteBaseGastos').innerHTML = formatea(importeBaseGastos);
        document.getElementById('impcImporteBaseGastos').value = formatea(importeBaseGastos);

        var importeTotIrpf = importeBaseGastos * porcIrpf;
        document.getElementById('idDivTotalIrpfGastos').innerHTML = formatea(importeTotIrpf);
        document.getElementById('impcTotalIRPFGastos').value = formatea(importeTotIrpf);

        var importeTotIva = importeBaseGastos * porcIva;
        document.getElementById('idDivTotalIvaGastos').innerHTML = formatea(importeTotIva);
        document.getElementById('impcTotalIVAGastos').value = formatea(importeTotIva);

        var importeTotalGastos = importeBaseGastos - importeTotIrpf + importeTotIva;
        document.getElementById('idDivTotalGastos').innerHTML = formatea(importeTotalGastos);
        document.getElementById('impcTotalGastos').value = formatea(importeTotalGastos);

        var importeTotalHonor = formateaVistaNegocio(document.getElementById('idDivTotalHonor').innerHTML);
        document.getElementById('idDivTotalHonorGastos').innerHTML = formatea(importeTotalHonor + importeTotalGastos);
        document.getElementById('impcTotalHonorariosGastos').value = formatea(importeTotalHonor + importeTotalGastos);
      }
    }
  }    

	function controlConceptosRecobro(index, recobroRecobro){

		var nmImagen = 'imgReser_' + index;
		var resultado = controlImagenes(nmImagen);
		showHide(recobroRecobro+index, resultado[0]);
		changeIcon(nmImagen, resultado[1]); 
		layOutPantalla();

	}
    

    
	function formatea (valor) {
	
		valor = valor / 100;   
		valor = valor.toString().replace('.',',');
		valor = formateoDecimales(valor.toString(),',',2,'.',11);
		valor = mascaraDecimal(valor.toString(),',','2');
		return valor;
		
    }
    
    /* Funcion que pasa el importe que aparece en la pantalla como texto y con comas separando
       los decimale a un valor numerico con puntos separando los decimales */
	function formateaVistaNegocio (valor) {
	
		valor = valor.replace('.','');
		valor = valor.replace('.','');
		valor = valor.replace(',','.');
		valor = Math.round(valor * 100);
		return valor;
      
    }
  
	function controlMesesPeriodicidad (campo) {
		var meses = campo.value;
		if (meses!=undefined && meses!=null && meses!='' && meses > 12){
			alert(msgErrorPeriodicidad);
		}
	}
	
	function modificarPorcentaje (pObjeto, indiceRecobro, idName, idImporte) {
      porcentaje = pObjeto.value;     
      document.getElementById(idName+'BBDD_'+indiceRecobro).value = porcentaje;
      objeto = document.getElementById('importesBBDD_'+indiceRecobro);
      if (swRegIva != '1' && swRegIrpf != '1'){
		controlLimiteRecobroProf(objeto, indiceRecobro, idImporte);
      }
	}
	
	
    /* Función que comprueba si existen provisiones de recobro, en caso negativo, inicializa los valores a 0*/
    function inicializarImportesReservasRecobros() {
 	 var formulario = document.forms[0];
  	 for (var i = 0 ; i < contadorConceptos; i++) {
  	    var importe = formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importe"].value;
  	   	if(trim(importe)==""){
  	    	importe = "0,00";
  	    	formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importe"].value = importe;
  	  	    formulario.elements["recobroDetalle["+i+"].reservaRecobroView.importeInicialBD"].value = importe;
  	    }
  	  
  	 }
	}


	