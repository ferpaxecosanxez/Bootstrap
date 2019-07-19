/* Funcion para abrir la ventana emergente de busqueda de poliza*/
function busquedaPoliza() {
	var fecSntro = document.getElementById('fechaSntro').value;
	if (fecSntro == '') {
		alert(mensajeErrorFecha);
	} else {
		if(jQuery('input[name="swReembolso"]').is(':checked')){
			abrePopupBuscaAsegurado();
		}else{
			var url = accionBusquedaPoliza + "?familia=" + familiaSeleccionada;
			muestraCarga();
			var valor = lanzarVentana(url, 800, 550);
			ocultaCarga();
	
			if (valor != null) {
				// Recuperamos para el formulario los datos que nos llegan desde el
				// popup de selección de póliza
				document.getElementById('numPoliza').value = valor[0];
				// document.getElementById('idPolMovim').value = valor[1];
				// document.getElementById('idProdEfec').value = valor[2];
				seleccionarFamilia(valor[4]);
			}
		}
	}
}

function showDatosTomador(value){
	if(value==1){
		showHide(document.getElementById('idDivPersonaFisica'),false);
		showHide(document.getElementById('idDivPersonaJuridica'),true);
			
		setValue('nombre','');
		setValue('apel1','');
		setValue('apel2','');
			
	}else if(value==2 || value==3 || value==4){
		showHide(document.getElementById('idDivPersonaFisica'),true);
		showHide(document.getElementById('idDivPersonaJuridica'),false);
//		setValue('razonSocial','');
	}else if(value==undefined || value==''){
		showHide(document.getElementById('idDivPersonaFisica'),false);
		showHide(document.getElementById('idDivPersonaJuridica'),false);
	}
}	
	
function lupaPersonas(fordwar){
	if(document.getElementById('idTipoIdent').value == 1){
	var tipo;
		tipo = 2;
	}else{
		tipo = 1;
	}

	pag= fordwar;
	pag= pag + "?tipoPersona=" + tipo;
	pag= pag + "&tipoIdentificador="+document.getElementById('idTipoIdent').value;
	pag= pag + "&identificador="+document.getElementById('docIdent').value;
	pag= pag + "&nombre="+document.getElementById('nombre').value;
	pag= pag + "&apel1="+document.getElementById('apel1').value;
	pag= pag + "&apel2="+document.getElementById('apel2').value;	
	
	var valor = lanzarVentana(pag,600,480);
	if(valor!=undefined){
		document.getElementById('docIdent').value = valor[1];
		setValue('idTipoIdent',valor[8]);
		showDatosTomador(valor[8]);

		if(valor[3]!="2"){
//			document.getElementById('razonSocial').value = valor[9];
//		}else{
			document.getElementById('nombre').value = valor[5];
			document.getElementById('apel1').value = valor[6];
			document.getElementById('apel2').value = valor[7];    		
		}

	}	
}	



function buscarRiesgos() {
	var flag = false;
	// Validamos campos obligatorios
	if (document.getElementById("fechaSntro").value == "") {
		flag = true;
		alert(mensajeErrorFecha);
	}
	if (document.getElementById("horaSntro").value == ""){
		flag = true;
		alert(mensajeErrorValidaHora);
		document.getElementById("horaSntro").focus();
	}
	if (document.getElementById("numPoliza").value == ""
			&& (familiaSeleccionada == familiaAuto && document.getElementById("matricula").value == "")) {
		flag = true;
		alert(mensajeErrorValidacion);
	}
	if(familiaSeleccionada != familiaAuto && document.getElementById("numPoliza").value == ""){
		flag = true;
		alert(mensajeValidacionPoliza);
	}
	
	if(!flag) {
		habilitaCamposBusquedaAsegurado();
		
		jQuery('input[name="idFamiliaProd"]').val(familiaSeleccionada);
		jQuery('input[name="numeroPoliza"]').val(document.getElementById("numPoliza").value);
		jQuery('input[name="fechaSiniestro"]').val(document.getElementById("fechaSntro").value);
		jQuery('input[name="tipoFechaSiniestro"]').val(document.getElementById("tipoFecha").value);
		jQuery('input[name="horaSiniestro"]').val(document.getElementById("horaSntro").value);
		
		if(document.getElementById("swReembolso") != null && document.getElementById("swReembolso").checked){
			accUrl = accionBuscarRiesgoSalud;
		}else{
			accUrl = accionBuscarRiesgos;
		}
		
		document.forms[0].action = accUrl;
		muestraCarga();
		document.getElementById("tipoFecha").disabled = false;
		document.forms[0].submit();
	}
}

function validarHora(campoHora) {
	var ok = true;
	if (campoHora.value.length > 0) {
		if (campoHora.value.indexOf(":") == -1) {
			ok = false;
		} else if ((campoHora.value.indexOf("-") != -1)
				|| (campoHora.value.indexOf(".") != -1)
				|| (campoHora.value.indexOf(",") != -1)) {
			ok = false;
		} else {
			var hora = campoHora.value.substring(0, campoHora.value
					.indexOf(":"));
			var minutos = campoHora.value.substring(campoHora.value
					.indexOf(":") + 1);

			if (isNaN(hora)) {
				ok = false;
			}
			if (isNaN(minutos)) {
				ok = false;
			}

			if (hora.length == 0) {
				ok = false;
			} else if (hora.length == 1) {
				hora = "0" + hora
			} else if (parseInt(hora) > 23) {
				ok = false;
			}

			if (minutos.length == 0) {
				ok = false;
			} else if (minutos.length == 1) {
				minutos = "0" + minutos
			} else if (parseInt(minutos) > 59) {
				ok = false;
			}

			if (ok) {
				campoHora.value = hora + ":" + minutos;
			}
		}
		if (!ok) {
			campoHora.value = "";
		}
	}
	return ok;
}

function completarHora(campo, evento) {
	var texto = campo.value;
	if ((evento.keyCode > 47 && evento.keyCode < 58)
			|| (evento.keyCode > 95 && evento.keyCode < 106)
			|| (evento.keyCode == 8)) {
		if (texto.length == 2) {
			if ((evento.keyCode != 8) && (evento.keyCode != 46)
					&& (evento.keyCode != 37) && (evento.keyCode != 39)
					&& (evento.keyCode != 9) && (evento.keyCode != 0)
					&& (evento.keyCode != 35) && (evento.keyCode != 36)
					&& (evento.keyCode != 38) && (evento.keyCode != 40)) {
				campo.value = texto + ':';
			}
		}
	} else {
		if (evento.keyCode != 16 && evento.keyCode != 16) {
			campo.value = texto.substring(0, texto.length - 1);
		}
	}
}

function validarHoraMensaje(campoHora) {
	if (!validarHora(campoHora)) {
		alert(mensajeErrorHora);
	}
}

function salir() {
	var pag = accionSalir;
	document.forms(0).action = pag;
	submitForm(document.forms[0], null, 'iAreaTrabajo');
}

function seleccionarFamilia(tipo) {
    var checkReembolso = jQuery('input[name="swReembolso"]');
    
    if (tipo != null && tipo != "" && tipo != "0") {
    	
    	document.getElementById("capaAutos").style.display = "none";
		document.getElementById("capaParticulares").style.display = "none";
		document.getElementById("capaIndustriales").style.display = "none";
		document.getElementById("capaVida").style.display = "none";
		document.getElementById("capaSalud").style.display = "none";

          if (tipo == familiaAuto) {
             if (document.getElementById('icoAutos') != null){
    	 		 document.getElementById('icoAutos').src = icoCocheSelec;
             }
             if (document.getElementById('icoHogar') != null){
            	 document.getElementById('icoHogar').src = icoHogar;
             }
             if (document.getElementById('icoIndus') != null){
            	 document.getElementById('icoIndus').src = icoEmpresa;
             }
             if (document.getElementById('icoSalud') != null){
            	 document.getElementById('icoSalud').src = icoSalud;
             }
             if (document.getElementById('icoVida') != null){
            	 document.getElementById('icoVida').src = icoPersona;
             }
            
 			document.getElementById("capaAutos").style.display = "block";
 			jQuery('.ocultoSiReembolsoSalud').toggle(false);
 			jQuery(checkReembolso).prop('checked',false);
 			jQuery('.ocultoSiReembolso').toggle(true);
 			jQuery('input[name="numPoliza"]').removeAttr('disabled');
 	    	jQuery('select[name="tipoFecha"]').removeAttr('disabled');
          }
          
          if (tipo == familiaHogar) {
	    	 if (document.getElementById('icoHogar') != null){
	             document.getElementById('icoHogar').src = icoHogarSelec;
	         } 
	         if (document.getElementById('icoAutos') != null){
    	  	 	 document.getElementById('icoAutos').src = icoCoche;
             }
             if (document.getElementById('icoIndus') != null){
            	 document.getElementById('icoIndus').src = icoEmpresa;
             }
             if (document.getElementById('icoSalud') != null){
            	 document.getElementById('icoSalud').src = icoSalud;
             }
             if (document.getElementById('icoVida') != null){
            	 document.getElementById('icoVida').src = icoPersona;
             }
 			document.getElementById("capaParticulares").style.display = "block";
			jQuery('.ocultoSiReembolsoSalud').toggle(false);
            jQuery(checkReembolso).prop('checked',false);
            jQuery('.ocultoSiReembolso').toggle(true);
            jQuery('input[name="numPoliza"]').removeAttr('disabled');
 	    	jQuery('select[name="tipoFecha"]').removeAttr('disabled');
          }
          
          if (tipo == familiaVida) {
	    	  if (document.getElementById('icoVida') != null){
	          	  document.getElementById('icoVida').src = icoPersonaSelec;
	          }
	          if (document.getElementById('icoAutos') != null){
	 	 		 document.getElementById('icoAutos').src = icoCoche;
	          }
	          if (document.getElementById('icoHogar') != null){
	         	 document.getElementById('icoHogar').src = icoHogar;
	          }
	          if (document.getElementById('icoIndus') != null){
	         	 document.getElementById('icoIndus').src = icoEmpresa;
	          }
	          if (document.getElementById('icoSalud') != null){
	         	 document.getElementById('icoSalud').src = icoSalud;
	          }
	          document.getElementById("capaVida").style.display = "block";
	          jQuery('.ocultoSiReembolsoSalud').toggle(false);
	          jQuery(checkReembolso).prop("checked",false);
	          jQuery('.ocultoSiReembolso').toggle(true);
	          jQuery('input[name="numPoliza"]').removeAttr('disabled');
	 	      jQuery('select[name="tipoFecha"]').removeAttr('disabled');
          }
          
          if (tipo == familiaSalud) {
 	         if (document.getElementById('icoSalud') != null){
 	             document.getElementById('icoSalud').src = icoSaludSelec;
 	         }
 	    	 if (document.getElementById('icoIndus') != null){
 	          	 document.getElementById('icoIndus').src = icoEmpresa;
 	     	 }
 	    	 if (document.getElementById('icoHogar') != null){
 	             document.getElementById('icoHogar').src = icoHogar;
 	         } 
 	         if (document.getElementById('icoAutos') != null){
 	 	  	 	 document.getElementById('icoAutos').src = icoCoche;
 	         }
 	         if (document.getElementById('icoVida') != null){
           	     document.getElementById('icoVida').src = icoPersona;
            }
   			document.getElementById("capaSalud").style.display = "block";
   			jQuery('input[name="numPoliza"]').removeAttr('disabled');
 	    	jQuery('select[name="tipoFecha"]').removeAttr('disabled');
 			jQuery('.ocultoSiReembolsoSalud').toggle(true);
           }
          
          if (tipo == familiaIndus) {
        	 if (document.getElementById('icoIndus') != null){
             	 document.getElementById('icoIndus').src = icoEmpresaSelec;
        	 }
	    	 if (document.getElementById('icoHogar') != null){
	             document.getElementById('icoHogar').src = icoHogar;
	         } 
	         if (document.getElementById('icoAutos') != null){
    	  	 	 document.getElementById('icoAutos').src = icoCoche;
             }
             if (document.getElementById('icoSalud') != null){
            	 document.getElementById('icoSalud').src = icoSalud;
             }
             if (document.getElementById('icoVida') != null){
            	 document.getElementById('icoVida').src = icoPersona;
             }
 			document.getElementById("capaIndustriales").style.display = "block";
			jQuery('.ocultoSiReembolsoSalud').toggle(false);
			jQuery(checkReembolso).prop('checked',false);
			jQuery('.ocultoSiReembolso').toggle(true);
			document.getElementById("tipoFecha").disabled = false;
          }
          familiaSeleccionada = tipo;
          jQuery('input[name="idFamiliaProd"]').val(tipo);
          
    }else{
          jQuery('.ocultoSiReembolsoSalud').toggle(false);
    }
}

/* Metodo que al detectar que se pulsa la tecla ENTER lanza laapertura */
function pulsarEnterApertura() {
	if (window.event.keyCode == 13) {
		document.getElementById("numPoliza").onblur();
		document.getElementById("botonAceptar").onclick();
	}
}

/* Métodos para la búsqueda de Asegurado en expedientes de reembolso */

function limpiaCamposBuscaAsegurado(){
	jQuery('input[name="numPoliza"]').val('');
	jQuery('#idTipoIdent option[value="2"]').attr("selected",true);
	jQuery('input[name="docIdent"]').val('');
	jQuery('input[name="numTarjeta"]').val('');
	jQuery('input[name="nombre"]').val('');
	jQuery('input[name="apel1"]').val('');
	jQuery('input[name="apel2"]').val('');
	jQuery('#idTipoRol option[value=""]').attr("selected",true);
	jQuery('#idTipo option[value=""]').attr("selected",true);
	
	habilitaCamposBusquedaAsegurado();
	jQuery('#botonBuscar').removeAttr('disabled');
}

function habilitaCamposBusquedaAsegurado(){
	jQuery('input[name="numPoliza"]').removeAttr('disabled');
	jQuery('select[name="idTipoIdentificador"]').removeAttr('disabled');
	jQuery('input[name="numTarjeta"]').removeAttr('disabled');
	jQuery('input[name="nombre"]').removeAttr('disabled');
	jQuery('input[name="docIdent"]').removeAttr('disabled');
}


function abrePopupBuscaAsegurado(){
	var fecSntro = document.getElementById('fechaSntro').value;
	if (fecSntro == '') {
		alert(mensajeErrorFecha);
	}else{
		var url = '/etica/expediente/reembolsoAsegurado/apertura/buscaAsegurado.do';
		
		var numPoliza =jQuery('input[name="numPoliza"]').val();
		var numTarjeta =jQuery('input[name="numTarjeta"]').val();
		var nombre =jQuery('input[name="nombre"]').val();
		var apel1 =jQuery('input[name="apel1"]').val();
		var apel2 =jQuery('input[name="apel2"]').val();
		var docIdent =jQuery('input[name="docIdent"]').val();
		var idTipoIdentificador =jQuery('select[name="idTipoIdentificador"]').val();

		url+='?numPoliza='+numPoliza;
		url+='&numTarjeta='+numTarjeta;
		url+='&nombre='+nombre;
		url+='&apel1='+apel1;
		url+='&apel2='+apel2;
		url+='&docIdent='+docIdent;
		url+='&idTipoIdentificador='+idTipoIdentificador;
		url+='&fechaSntro='+fecSntro;
		//console.log(url);

		abrePopup(url, callbackPopupBuscaAsegurado);
	}
}

function callbackPopupBuscaAsegurado(valor){
	if (valor!=undefined){
		if (valor!=null){
			if (valor.length==8){
				//idPolMaestro, idRgoMaestro, idPersona, numPoliza, numTarjeta, nombre, docIdent, idTipoIdent
				if (valor[0]!='' && valor[1]!=''){
					jQuery('input[name="idPolMaestro"]').val(valor[0]);
					jQuery('input[name="idRgoMaestro"]').val(valor[1]);
					//jQuery('input[name="numPoliza"]').val(valor[3]);
					document.getElementById('numPoliza').value = valor[3];
					jQuery('input[name="numTarjeta"]').val(valor[4]);
					jQuery('input[name="nombre"]').val(valor[5]);
					jQuery('input[name="docIdent"]').val(valor[6]);
					jQuery('select[name="idTipoIdentificador"]').val(valor[7]);
					if (valor[2]!='INNOMINADA'){
						jQuery('input[name="idPersona"]').val(valor[2]);
					}
					deshabilitaBusquedaAsegurado();
					if (valor[2]=='INNOMINADA'){
						tratamientoInnnominada();
					}
				}
			}
		}
	}
}		

function deshabilitaBusquedaAsegurado(){
	jQuery('input[name="numPoliza"]').attr('disabled', 'disabled');
	jQuery('input[name="numTarjeta"]').attr('disabled', 'disabled');
	jQuery('input[name="nombre"]').attr('disabled', 'disabled');
	jQuery('input[name="docIdent"]').attr('disabled', 'disabled');
	jQuery('select[name="idTipoIdentificador"]').attr('disabled', 'disabled');
	jQuery('#botonBuscar').attr('disabled', 'disabled');
}

function abrePopup(forward, funcionCallback, w, h){

	if (funcionCallback == undefined){
    	window.parentCallback = function(valor) {
    		//alert(valor);
    	};
	}else{
		window.parentCallback = funcionCallback;
	}
	
	var valor = lanzarVentana(forward, w!=undefined?w:1000, h!=undefined?h:600, null, window.parentCallback);
	if(valor!=undefined && valor!=null) {
		window.parentCallback(valor);
	}
}

function onblurNumPoliza(){
	if (jQuery('input[name="numPoliza"]').val() != '' && jQuery('input[name="swReembolso"]').is(':checked')){
		abrePopupBuscaAsegurado();
	}else if(jQuery('input[name="numPoliza"]').val() != ''){
		mostrarSiniestroReembolso();
	}
}

function mostrarSiniestroReembolso(){
	var fecSntro = document.getElementById('fechaSntro').value;
	if (fecSntro == '') {
		alert(mensajeErrorFecha);
	}else{
//		if(!jQuery('input[name="swReembolso"]').is(":visible")){
			var url = '/etica/expediente/reembolsoAsegurado/apertura/mostrarCheckSaludPoliza.do';
			var numPoliza =jQuery('input[name="numPoliza"]').val();
			var fechaSntro =jQuery('input[name="fechaSntro"]').val();
			var horaSntro =jQuery('input[name="horaSntro"]').val();
			var tipoFecha =jQuery('select[name="tipoFecha"]').val();
			
			url+='?numPoliza='+numPoliza;
			url+='&fechaSntro='+fechaSntro;
			url+='&horaSntro='+horaSntro;
			url+='&tipoFecha='+tipoFecha;
			
			muestraCargaComun();
			document.location = url;
//		}	
	}
}

function mostrarCheckReembolso(){
	var numPoliza, fechaSntro, tipoFecha, horaSntro, idFamiliaProd;
	
	idFamiliaProd = jQuery('input[name="idFamiliaProd"]').val();
	numPoliza = jQuery('input[name="numeroPoliza"]').val();
	fechaSntro = jQuery('input[name="fechaSiniestro"]').val();
	tipoFecha = jQuery('input[name="tipoFechaSiniestro"]').val();
	horaSntro = jQuery('input[name="horaSiniestro"]').val();
	
	seleccionarFamilia(idFamiliaProd);
	jQuery('input[name="fechaSntro"]').val(fechaSntro);
	jQuery('input[name="horaSntro"]').val(horaSntro);
	jQuery('input[name="numPoliza"]').val(numPoliza);
	if(tipoFecha==''){
		jQuery('select[name="tipoFecha"]').val(tipoFechaOcurrencia);
	}else{
		jQuery('select[name="tipoFecha"]').val(tipoFecha);
	}
	jQuery('input[name="idFamiliaProd"]').val(idFamiliaProd);

}

/* OnClick para swReembolso */
function checkSwReembolso(marcado){
	var checkReembolso = jQuery('input[name="swReembolso"]');
	var idChecked = jQuery(checkReembolso).is(':checked');
	
	if(checkReembolso && idChecked && jQuery('input[name="idFamiliaProd"]').val() == familiaSalud){
		jQuery('input[name="horaSntro"]').val('00:00');
		jQuery('.ocultoSiReembolso').toggle(false);
		jQuery('select[name="tipoFecha"]').val(tipoFechaReembolso);
		if (jQuery('input[name="numPoliza"]').val() != '' && idChecked && marcado){
			abrePopupBuscaAsegurado();
		}
	}else{
		jQuery('.ocultoSiReembolso').toggle(true);
		jQuery('input[name="horaSntro"]').val('');
	}
}