
/*
 * FUNCIONES JAVASCRIPT PARA LA GESTION DE PAGOS
 */

  /* Funcion para eliminar el formato los datos */
  function desFormatearImporte(importe){
    importe = importe.replace('.','');
	importe = importe.replace(',','.');
	importe = Math.round(importe * 100);
  
    return importe; 
  }
  function replaceAll( str, find, replace ){
	    while (str.toString().indexOf(find) != -1)
	    	str = str.toString().replace(find,replace);
	    return str;
  }
  /* Funcion para eliminar el formato los datos */
  function desFormatearImporteSinSeparadorMiles(importe){
    importe = importe.replace(',','.');
    importe = Math.round(importe * 100);
  
    return importe; 
  }
  
  /* Funcion para formatear los datos */
  function formatearImporte(importe){
    importe = importe / 100;   
    importe = importe.toString().replace('.',',');
    importe = formateoDecimales(importe.toString(),',',2,'.',11);
    importe = mascaraDecimal(importe.toString(),',','2');
  
    return importe; 
  }
  
  /* Funcion para formatear los datos calculados */
  function formatearImporteCalculado(importe){
    importe = importe / 100;   
    importe = importe.toString().replace('.',',');
    importe = mascaraDecimal(importe.toString(),',','2');
    
    return importe; 
  }
  
  /* Funcion para formatear los datos */
  function formatearImporteSinSeparadorMiles(importe){
    importe = importe / 100;   
    importe = importe.toString().replace('.',',');
    importe = mascaraDecimal(importe.toString(),',','2');
  
    return importe; 
  }  
  
  /* comprueba q el importe total es mayor q cero */
  function comprobarImporteTotal(){
    var correcto = true;
    
    var importeTotal = document.getElementById('importeTotal').innerHTML;
    importeTotal = desFormatearImporte(importeTotal);
    if((importeTotal == "") || (importeTotal == 0)){
      correcto = false;
    }
    	
    return correcto;
  }
  
  /* comprueba q se han informado todos los importes */
  function comprobarImportesInformados(lstDatosxReserva){
    var correcto = true;
    
    for (i = 0; i < contadorConceptos; i++) {

      var importe = document.getElementById(lstDatosxReserva+'['+i+'].importe').value;
      importe = desFormatearImporte(importe);
	  var factura = document.getElementById(lstDatosxReserva+'['+i+'].numFactura').value;
	  
	  if((importe == "") || (importe == 0)){
		
		var observacion = document.getElementById(lstDatosxReserva+'['+i+'].observacion').value;
		if((factura != "") || (observacion != "")){
		  correcto = false;
		}
	  }
	}
	
    return correcto;
  }
  
  
  /* comprueba q se han informado todos los importes */
  function comprobarImportesInformadosProf(lstDatosxReserva){
    var correcto = true;
    
    for (i = 0; i < contadorConceptos; i++) {

      var importe = document.getElementById(lstDatosxReserva+'['+i+'].importe').value;
      importe = desFormatearImporte(importe);
	  var factura = document.getElementById(lstDatosxReserva+'['+i+'].numFactura').value;
	  
	  if((importe == "") || (importe == 0)){
		
		var observacion = document.getElementById(lstDatosxReserva+'['+i+'].observacion').value;
		if((factura != "") || (observacion != "")){
		  correcto = false;
		}
	  }else{
	  	if(factura == ""){
	  		correcto = false;
	  	}
	  }	
	}
	
    return correcto;
  }
 
  /* Funcion para el control del motivo de recobro */
  function habilitarMotivoRecobro(){
    var idClasiPago = document.getElementById('sntroPagoView.clasePago.id').value;
    if ((idClasiPago == idRepetible) || (idClasiPago == idRecobrable)){
      document.getElementById('sntroPagoView.idMotivoRecobro').disabled = false;
    }else{
      document.getElementById('sntroPagoView.idMotivoRecobro').disabled = true;
    }
  }
 
  /* Funcion para la gestion del motivo de recobro */
  function gestionMotivoRecobro(idMtRecobro){
    var correcto = true;
    if(document.getElementById(idMtRecobro).disabled == false){
      var idMotivoRecobro = document.getElementById(idMtRecobro).value;
      if (idMotivoRecobro == ""){
        correcto = false;
      }
    }
   
    return correcto;
  }
   
  
  /* Funcion para el control de la periodicidad */
  function habilitarPeriodicidad(idTransferencia, idConsignacion){
    var idMedioPago = document.getElementById('pagoReservaView.idMedioPago').value;
    if ((idMedioPago == idTransferencia) || (idMedioPago == idConsignacion)){
      document.getElementById('pagoReservaView.mesesPeriodicidad').disabled = false;
    }else{
      document.getElementById('pagoReservaView.mesesPeriodicidad').disabled = true;
    }
  }
  
  /* Funcion para la gestion de la periodicidad */
  function gestionPeriodicidad(pObjeto, msg){
    if ((pObjeto.value > 12) || (pObjeto.value < 0)){
      alert(msg);
      pObjeto.value = "";
    }
  }
 
 
  /* Funcion calcular el total de reserva disponible */
  function calcularReservaTotalDisponible(contadorConceptos){
    
    var numReserva = 1;
    var importeReserva = 0;
    var idReserva = document.getElementById('lstPagosxReserva[0].idExReservaXGaranCobe').value;
    
    for(var i=0; i < contadorConceptos; i++){
      var idReservaPago = document.getElementById('lstPagosxReserva['+i+'].idExReservaXGaranCobe').value;
      var importe = document.getElementById('lstPagosxReserva['+i+'].importe').value;
      importe = desFormatearImporte(importe);
        
      if(idReserva == idReservaPago){
        importeReserva += importe;
      }else{
        importeReserva = formatearImporteSinSeparadorMiles(importeReserva);
       	document.forms(0).lstReservaTot[numReserva].value = importeReserva;
        idReserva = idReservaPago;
        numReserva++;
        importeReserva = importe;
      }
    }
    
    // se guarda el ultimo sumatorio
    importeReserva = formatearImporteSinSeparadorMiles(importeReserva);
    document.forms(0).lstReservaTot[numReserva].value = importeReserva;
  }
    
  
  /* Funcion para el control de los resumenes del pago */
  function controlResumenImporte(contadorConceptos, lstDatosxReserva, valorSi){
   
    var totalImporteLiquido = 0;
    var totalProvisiones = 0;
    var totalHonorGto = 0;  
    
    var totalBaseHonor = 0;
    var totalIrpfHonor = 0;
    var totalIvaHonor = 0;
    var totalHonor = 0;
  
    var totalBaseGto = 0;
    var totalIrpfGto = 0;
    var totalIvaGto = 0;
    var totalGto = 0;
    
    var spImporteTot = document.getElementById('importeTotal'); 
    var spTotalProv = document.getElementById('provisiones');
    var spTotHonorGto = document.getElementById('impTotHonGtos');
    
    var spImporteBaseHonor = document.getElementById('impBaseHonor');
    var spTotIrpfHonor = document.getElementById('totIrpfHonor');
    var spTotIvaHonor = document.getElementById('totIvaHonor');
    var spTotHonor = document.getElementById('totHonor');
    
    var spImporteBaseGto = document.getElementById('impBaseGtos');
    var spTotIrpfGto = document.getElementById('totIrpfGtos');
    var spTotIvaGto = document.getElementById('totIvaGtos');
    var spTotGto = document.getElementById('totGtos');    
   
    for(var i=0;i < contadorConceptos; i++){
      var swGasto = document.getElementById(lstDatosxReserva+'['+i+'].swGasto').value;
      var swHonorario = document.getElementById(lstDatosxReserva+'['+i+'].swHonorario').value;
	  var swProvision = document.getElementById(lstDatosxReserva+'['+i+'].swProvision').value;
	  
	  var importePago = document.getElementById(lstDatosxReserva+'['+i+'].importe').value; 
	  var porcIva = document.getElementById('iva_'+i).innerHTML; 
      var porcIrpf = document.getElementById('irpf_'+i).innerHTML;   
                 
      porcIva = desFormatearImporte(porcIva);	  
	  porcIrpf = desFormatearImporte(porcIrpf);
      importePago = desFormatearImporte(importePago);
	    
      // se comprueba si se trata de un gto o de un honorario
	  if (swGasto == valorSi){
	    // gastos
        totalBaseGto += importePago;
        totalIrpfGto += porcIrpf;
        totalIvaGto += porcIva;	    
	  }
	  if (swHonorario == valorSi){
	    // honorarios
        totalBaseHonor += importePago;
        totalIrpfHonor += porcIrpf;
        totalIvaHonor += porcIva;		
	   }
	   if(swProvision == valorSi){
	     // provision
	     totalProvisiones += importePago;
	   }
    }
    
    // se calculan los totales
    totalHonor = totalBaseHonor - totalIrpfHonor + totalIvaHonor;    
    totalGto = totalBaseGto - totalIrpfGto + totalIvaGto;
    totalHonorGto = totalHonor + totalGto;
    totalImporteLiquido = totalHonorGto - totalProvisiones;    
    
    // se formatean todos los datos
    totalHonorGto = formatearImporte(totalHonorGto);  
    totalBaseHonor = formatearImporte(totalBaseHonor);
    totalIrpfHonor = formatearImporte(totalIrpfHonor);
    totalIvaHonor = formatearImporte(totalIvaHonor);
    totalHonor = formatearImporte(totalHonor);
    totalBaseGto = formatearImporte(totalBaseGto);
    totalIrpfGto = formatearImporte(totalIrpfGto);
    totalIvaGto = formatearImporte(totalIvaGto);
    totalGto = formatearImporte(totalGto);
    totalImporteLiquido = formatearImporte(totalImporteLiquido);
    totalProvisiones = formatearImporte(totalProvisiones);
    
    // se pintan todos los datos
    spTotHonorGto.innerHTML = totalHonorGto.toString();
    spImporteBaseHonor.innerHTML = totalBaseHonor.toString();
    spTotIrpfHonor.innerHTML = totalIrpfHonor.toString();
    spTotIvaHonor.innerHTML = totalIvaHonor.toString();
    spTotHonor.innerHTML = totalHonor.toString();
    spImporteBaseGto.innerHTML = totalBaseGto.toString();
    spTotIrpfGto.innerHTML = totalIrpfGto.toString();
    spTotIvaGto.innerHTML = totalIvaGto.toString();
    spTotGto.innerHTML = totalGto.toString();
    spImporteTot.innerHTML = totalImporteLiquido.toString();
    spTotalProv.innerHTML = totalProvisiones.toString();
  }
 
 
  /* Funcion para el control de los porcentajes tras su modificacion */
  function calculoImportes(index, lstDatosxReserva){
    var totalIrpf = 0;
    var totalIva = 0;
    var totalConcepto = 0;
  
    var importeCpto = document.getElementById('imp_'+index);
    var concepto = document.getElementById('concpt_'+index);   
    var iva = document.getElementById('iva_'+index);   
    var irpf = document.getElementById('irpf_'+index);   
    
    var importePago = document.getElementById(lstDatosxReserva +'['+index+'].importe').value; 
    var porcIva = document.getElementById(lstDatosxReserva +'['+index+'].porcIva').value; 
    var porcIrpf = document.getElementById(lstDatosxReserva +'['+index+'].porcIrpf').value; 
    
    importePago = desFormatearImporte(importePago);
	porcIva = desFormatearImporte(porcIva);	  
	porcIrpf = desFormatearImporte(porcIrpf);	  
	
    var impIva = (importePago * porcIva)/10000;
    var impIrpf = (importePago * porcIrpf)/10000;
    
    totalIva = Math.round(impIva);
    totalIrpf = Math.round(impIrpf);	        
    totalConcepto = importePago - totalIrpf + totalIva;
    
    totalConcepto = formatearImporteCalculado(totalConcepto);  
    importePago = formatearImporteCalculado(importePago);    
    
    totalIva = formatearImporte(totalIva);    
    totalIrpf = formatearImporteCalculado(totalIrpf);

    importeCpto.innerHTML = importePago.toString();    	
    concepto.innerHTML = totalConcepto.toString();
    iva.innerHTML = totalIva.toString(); 
    irpf.innerHTML = totalIrpf.toString(); 
  }  


  /* Funcion para introducir una reserva */
  function reestimarReserva(pag,idExPolizaGaranCobe){

    pag = pag + '?idPolizaGaranCobe='+ idExPolizaGaranCobe;
    var valor = lanzarVentana(pag,800,500);
    return valor;
  }
      
  /* Control mostrar/ocultar las imagenes */
  function controlImagenes(nmImagen){
    var imagen = document.getElementById(nmImagen).src;
    var nameImg = imagen.substring(imagen.lastIndexOf('\/')+1, imagen.length);
    var flag;
    var imgSrc;
    if(nameImg == "icoExpand.gif"){
      flag = true;
      imgSrc = rutaImg + 'ico-.gif';
    }else{
      flag = false;
      imgSrc = rutaImg + 'icoExpand.gif';    
    }
    
    var resultado = [flag,imgSrc];
    return resultado;
  }
  
  /* Control mostrar/ocultar conceptos pago recobro */
  function controlConceptosPagoRecobro(index, pagoRecobro){
    var nmImagen = 'imgReser_' + index;
    var resultado = controlImagenes(nmImagen);

    showHide(pagoRecobro+index, resultado[0]);
    changeIcon('imgReser_'+index, resultado[1]); 
   
    layOutPantalla();
  }
  
  /* Control mostrar/ocultar porcentajes */
  function controlPorcentajes(index){
    var imagen = document.getElementById('img_'+index).src;
    var nameImg = imagen.substring(imagen.length-8, imagen.length)
    var flag;
    var imgSrc;
    if(nameImg == "icoExpand.gif"){
      flag = true;
      imgSrc = rutaImg + 'ico-.gif';
    }else{
      flag = false;
      imgSrc = rutaImg + 'icoExpand.gif';    
    }
    
    showHide('importeBase_'+index, flag);
    showHide('totIrpf_'+index, flag);
    showHide('totIva_'+index, flag);
    showHide('totConcepto_'+index, flag);
    changeIcon('img_'+index, imgSrc); 
    
    layOutPantalla();
    //layOut_iFrame_page(this.window.frameElement);
    
    
  }  
  
  
  /* Control mostrar/ocultar resumen importes */
  function controlImportes(){
    var resultado = controlImagenes('imgImporte');
    
    showHide('resumenImporte', resultado[0]);
    changeIcon('imgImporte', resultado[1]); 
       
     layOutPantalla();  
     //layOut_iFrame_page(this.window.frameElement);
     
   
  }
    

  /* Funcion para la deshabilitar los botones de los pagos */
  function gestionBotonera(){
    document.getElementById('botEmitir').disabled = true;
  }  
  
  /* Funcion para la gestion de las acciones de la consulta */
  function gestionAccionConsulta(action, nmFrame){
    submitFormActionMsg(document.forms[0],action,null,null,null); 
  } 
  
  /* Funcion para la seleccion de la cuenta bancaria */
  function buscarCtaBancaria(idPerceptor, tipoBusqueda, pag, idTipoBanco, pagDestino, idCuentaDefecto){
	  
    pag = pag + "?idPerceptor=" + idPerceptor;
    pag = pag + "&tipoBusqueda=" + tipoBusqueda;
    
    var valor = lanzarVentana(pag,500,550);    
    return valor;
  }
  
  function buscarCtaBancaria(idPerceptor, tipoBusqueda, pag, idCuentaDefecto) {
	  
	    pag = pag + "?idPerceptor=" + idPerceptor;
	    pag = pag + "&tipoBusqueda=" + tipoBusqueda;
	    pag = pag + "&idCuentaCheck=" + idCuentaDefecto;
	    
	    var valor = lanzarVentana(pag,500,550);    
	    return valor;	  
  }
  
  /* Funcion para cambiar el perceptor */
  function cambioProcedencia(pag, actionSgte){
    var valor = lanzarVentana(pag,600,400);
    if(valor != undefined){
      if(valor[0]){
        // se recargan los datos del perceptor
        document.getElementById('idPerceptor').value = valor[1];
        document.getElementById('tipoBusqueda').value = valor[2];
        
        submitFormActionMsg(document.forms[0],actionSgte,null,'iTabContent',null); 
      }
    }
  }
  
  
  
  
  /* Funcion para el control de la semi-persona */
  function controlSemiPersona(flagSemiPsn, valorSi, flag){
    
    if(flagSemiPsn == valorSi){
      
      // se permite la escritura en la pantalla para la promocion de la semi-persona     
      document.getElementById('idTipoIdentificacion').disabled = flag;
      document.getElementById('tipoIdentificacion').disabled = flag;
      document.getElementById('numeroIdentificacion').disabled = flag;
      document.getElementById('nombre').disabled = flag;
      document.getElementById('telefono1.telefono').disabled = flag;
      document.getElementById('telefono2.telefono').disabled = flag;
      document.getElementById('telefono3.telefono').disabled = flag;
      document.getElementById('fax.telefono').disabled = flag;
      document.getElementById('email.email').disabled = flag;
      document.getElementById('datosDomicilio.tipoVia.id').disabled = flag;
      document.getElementById('datosDomicilio.via').disabled = flag;
      document.getElementById('datosDomicilio.numeroVia').disabled = flag;
      document.getElementById('datosDomicilio.bloque').disabled = flag;
      document.getElementById('datosDomicilio.piso').disabled = flag;
      document.getElementById('datosDomicilio.puerta').disabled = flag;
      document.getElementById('datosDomicilio.pais.id').disabled = flag;
      document.getElementById('datosDomicilio.codPostal').disabled = flag;
      document.getElementById('datosDomicilio.localidad').disabled = flag;
      document.getElementById('datosDomicilio.provincia.id').disabled = flag;
      
      // busqueda localidad
      document.getElementById('imgBusqLocalidad').disabled = flag;
    }
    
  }
  
  
  /* Funcion para anular el pago */
  function anularPago(pagAnulacion, accion, nmFrame){
    var valor = lanzarVentana(pagAnulacion, 500,300);
    if(valor != undefined){
      document.getElementById('idFormaAnulacion').value = valor;
      ocultaBotones();
      gestionAccionConsulta(accion, nmFrame);
    }
  }  
  
  
  function ocultaBotones(){
	var botones = document.getElementsByTagName("input");
	for( var i=0; i < botones.length; i++ ){
	  if (botones[i].type == "button"){	  
	    botones[i].style.display = "none";
	    //botones[i].disabled = "true";
	  }
	}
  }
  
  function muestraBotones(){
	var botones = document.getElementsByTagName("input");
	for( var i=0; i < botones.length; i++ ){
	  if (botones[i].type == "button"){	  
	    botones[i].style.display = "block";
	    //botones[i].disabled = "false";
	  }
	}
  }
  
  function muestraCargaModal(ancho){
    var div = parent.document.getElementById("divGeneral");
    if (div == null) div = document.getElementById("divGeneral");
    div.style.width=ancho-7+"px";
    div.style.visibility = 'visible';
	//se ocultan los select de la pagina para que no se superpongan a la cortina
  	escondeSelects();
  }
  
	function cambiarCta(ctaSeleccionado, campoDestino){
		// Se asigna el tipo segun la cuenta seleccionada.
		var  tipoBanco = ctaSeleccionado.options[ctaSeleccionado.selectedIndex].tipoDatoBanco;
		document.getElementById(campoDestino).value = tipoBanco;
	}