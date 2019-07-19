/*
*
*	Fichero de Javascript para las validaciones de los datos generales del mvto de la poliza
*
*/


// variables globales de js
var flagDisableInSession;
// Constantes
var aseguradoFisico="aseguradofis";
var conductorHabitual="conduchab";
var conductorOcasional="conducoca";
var aseguradoJuridico="aseguradojur";
var propietario="propietario";

	/*
	* Indicadores de seleccion para mas de un riesgo
	*/
	function swMasRiesgosFalse(){

		swMasRiesgosFalseSelected();
		ctrlFormaPago(false);
		ctrlMedioPago(false);
		
		funcionalidadMedioCobro(document.getElementById('poliza.datosGestion.idMedioCobro').value);
		
		showTipoNegocio(document.getElementById('poliza.otrosDatos.idTipoNegocio').value);
		
		if(document.getElementById('poliza.otrosDatos.swCoaseguroCedido') != null) {
			showCoasCedido(document.getElementById('poliza.otrosDatos.swCoaseguroCedido').value);
		}		
		
		if(document.getElementById('poliza.otrosDatos.swReaseguroFacultativo') != null) {
			showFacultativo(document.getElementById('poliza.otrosDatos.swReaseguroFacultativo').value);
		}
		
		if(document.getElementById('poliza.datosGestion.idTipoComision')!=undefined){			
			ctrlTipoComision(document.getElementById('poliza.datosGestion.idTipoComision').value);
		}
		
		if(document.getElementById('poliza.idNivelEmisionRecibo')!=undefined){
			ctrlEmisionRecibo(document.getElementById('poliza.idNivelEmisionRecibo').value);
		}
		
		showDatosTomador(document.getElementById('tomador.idTipoIdent').value);

	}
	
	function cambiarCapaDatos(value) {
		var opcion = parseInt(value);
		if(opcion == idCtaBancaria){
			document.getElementById("datosIban").style.display = "none";
			document.getElementById("datosCCC").style.display = "block";
		}else if(opcion == idCtaIban){
			document.getElementById("datosIban").style.display = "block";
			document.getElementById("datosCCC").style.display = "none";
		}
	}
	
	function swMasRiesgosFalseSelected(){
		
		document.getElementById('poliza.swMasRiesgos').value='0';
		document.forms["mvtoPolizaForm"].elements['poliza.swMasRiesgos'].value='0';
		setValue('poliza.swMasRiesgos','0');
		
		if(document.getElementById('poliza.idNivelFecVcto') != undefined){
			document.getElementById('poliza.idNivelFecVcto').value = '1';
		}
		document.getElementById('poliza.idNivelEmisionRecibo').value = '1';
		document.getElementById('poliza.idNivelMedioCobro').value = '1';
		if(document.getElementById('poliza.idNivelFormaPago') != undefined){
			document.getElementById('poliza.idNivelFormaPago').value = '1';
		}
		
		
		setValue('poliza.swAgrpRiesgos','0');
		setValue('poliza.swGaranGenRiesgoPoliza','0');
		document.getElementById('swMasRiesgos.no').checked = true;
		document.getElementById('swMasRiesgos.si').checked = false;
		
		document.getElementById('swAgrpRiesgos.no').checked = true;
		document.getElementById('swAgrpRiesgos.si').checked = false;
		
		if(document.getElementById('swGaranGenRiesgoPoliza.no')!=undefined){
			document.getElementById('swGaranGenRiesgoPoliza.no').checked = true;
    		document.getElementById('swGaranGenRiesgoPoliza.no').disabled = true;
		}
	
		if(document.getElementById('swGaranGenRiesgoPoliza.si')!=undefined){
			document.getElementById('swGaranGenRiesgoPoliza.si').disabled = true;
			document.getElementById('swGaranGenRiesgoPoliza.si').checked = false;
		}
		
		showHide(document.getElementById('indicadorNo'),false);
		showHide(document.getElementById('indicadorGeneral'),false);
					
	}


	/*
	* Indicadores de seleccion para mas de un riesgo
	*/
	function swMasRiesgosTrue(){
	
		swMasRiesgosTrueSelected();
		var idMedioCobro=document.getElementById('poliza.datosGestion.idMedioCobro');
		var idTipoNegocio=document.getElementById('poliza.otrosDatos.idTipoNegocio');
		var swCoaseguroCedido=document.getElementById('poliza.otrosDatos.swCoaseguroCedido');
		var swReaseguroFacultativo=document.getElementById('poliza.otrosDatos.swReaseguroFacultativo');
		var idTipoComision=document.getElementById('poliza.datosGestion.idTipoComision');
		var idNivelEmisionRecibo=document.getElementById('poliza.idNivelEmisionRecibo');
		var idTipoIdent=document.getElementById('tomador.idTipoIdent');	
		
		funcionalidadMedioCobro(idMedioCobro.value);
		showTipoNegocio(idTipoNegocio.value);
		if(swCoaseguroCedido != null) showCoasCedido(swCoaseguroCedido.value);
		if(swReaseguroFacultativo != null) showFacultativo(swReaseguroFacultativo.value);
		ctrlTipoComision(idTipoComision.value);
		ctrlFormaPago();
		ctrlMedioPago();
		if(idNivelEmisionRecibo!=undefined){
			ctrlEmisionRecibo(idNivelEmisionRecibo.value);
		}
		
		showDatosTomador(idTipoIdent.value);
			
	}
	
	function swMasRiesgosTrueSelected(){
		
		var idNivelFecVcto=document.getElementById('poliza.idNivelFecVcto');
		var idNivelEmisionRecibo=document.getElementById('poliza.idNivelEmisionRecibo');
		var idNivelMedioCobro=document.getElementById('poliza.idNivelMedioCobro');
		var idNivelFormaPago=document.getElementById('poliza.idNivelFormaPago');
		var swMasRiesgos=document.getElementById('poliza.swMasRiesgos');
		var swMasRiesgosSi=document.getElementById('swMasRiesgos.si');
		var swAgrpRiesgosNo=document.getElementById('swAgrpRiesgos.no');
		var swAgrpRiesgosSi=document.getElementById('swAgrpRiesgos.si');
		var swGaranGenRiesgoPolizaSi=document.getElementById('swGaranGenRiesgoPoliza.si');
		var swGaranGenRiesgoPoliza=document.getElementById('poliza.swGaranGenRiesgoPoliza');
		var swGaranGenRiesgoPolizaNo=document.getElementById('swGaranGenRiesgoPoliza.no');
		var indicadorNo=document.getElementById('indicadorNo');
		var indicadorGeneral=document.getElementById('indicadorGeneral');
		var idSwRiesgoPolizaGarantias=document.getElementById('idSwRiesgoPolizaGarantias');
		var swGaranGenRiesgoPolizaSi=document.getElementById('swGaranGenRiesgoPoliza.si');
		var swGaranGenRiesgoPolizaNo=document.getElementById('swGaranGenRiesgoPoliza.no');
	
		//document.getElementById('swMasRiesgos.no').checked = false;
		if(swMasRiesgos!=undefined){
		
			if(swMasRiesgos.value == 1){
				swMasRiesgosSi.checked = true;
			}
		}
		
		if(swGaranGenRiesgoPolizaSi!=undefined){
			if(swGaranGenRiesgoPoliza.value == 1){
				swGaranGenRiesgoPolizaSi.checked = true;
			}
			swGaranGenRiesgoPolizaSi.disabled = false;
		}
		
		if(swGaranGenRiesgoPolizaNo!=undefined){
			swGaranGenRiesgoPolizaNo.disabled = false;		
		}
		
		showHide(indicadorNo,true);
		showHide(indicadorGeneral,true);
		
		//Comprobamos si el riesgo poliza tiene garantias, si no tiene se deshabilita el swGaranGenRiesgoPoliza.si y swGaranGenRiesgoPoliza.no
		if(idSwRiesgoPolizaGarantias!=null){
    		if(idSwRiesgoPolizaGarantias.value == 1){
    			if(swGaranGenRiesgoPolizaSi != null) swGaranGenRiesgoPolizaSi.disabled = false;
    			if(swGaranGenRiesgoPolizaNo != null) swGaranGenRiesgoPolizaNo.disabled = false;		
    		}if(idSwRiesgoPolizaGarantias.value == 0){
    			if(swGaranGenRiesgoPolizaSi != null) swGaranGenRiesgoPolizaSi.disabled = true;
    			if(swGaranGenRiesgoPolizaNo != null) swGaranGenRiesgoPolizaNo.disabled = true;	
    		}
        }
	}
	
	function ctrlDuracion(value){
	
		if(value!=undefined && value!=null){

			if(value== '1'){
					
				if(document.getElementById('poliza.duracion.duracionNumero')!=undefined && document.getElementById('poliza.duracion.idUnidadDuracion')!=undefined){
					
					document.getElementById('poliza.duracion.duracionNumero').value = '1';
					document.getElementById('poliza.duracion.duracionNumero').disabled = true;
					
					document.getElementById('poliza.duracion.idUnidadDuracion').value = '3';
					document.getElementById('poliza.duracion.idUnidadDuracion').disabled = true;
					document.getElementById('poliza.duracion.idUnidadDuracion').options[document.getElementById('poliza.duracion.idUnidadDuracion').selectedIndex].value = '3';
				}
			
			}else{
			
				if(document.getElementById('poliza.duracion.duracionNumero')!=undefined && document.getElementById('poliza.duracion.idUnidadDuracion')!=undefined){
					document.getElementById('poliza.duracion.duracionNumero').disabled = false;
					document.getElementById('poliza.duracion.idUnidadDuracion').disabled = false;
				}
			}
		}
	}
	
	function ctrlDuracionRiesgoInicializacion(){
		document.getElementById('riesgoBean.fecEfectoRiesgo').disabled = true;
		document.getElementById('riesgoBean.duracion.idDuracionSeguro').disabled = true;
		document.getElementById('riesgoBean.duracion.duracionNumero').disabled = true;
		document.getElementById('riesgoBean.duracion.idUnidadDuracion').disabled = true;
		document.getElementById('riesgoBean.fecVctoRiesgo').disabled = true;
	}
	
	function ctrlDuracionRiesgo(value){
	
		if(value!=undefined && value!=null){
		
			if(value== '1'){
					
				if(document.getElementById('riesgoBean.duracion.duracionNumero')!=undefined && document.getElementById('riesgoBean.duracion.idUnidadDuracion')!=undefined){
				
					document.getElementById('riesgoBean.duracion.duracionNumero').value = '1';
					document.getElementById('riesgoBean.duracion.duracionNumero').disabled = true;
					
					document.getElementById('riesgoBean.duracion.idUnidadDuracion').value = '3';						
					document.getElementById('riesgoBean.duracion.idUnidadDuracion').options[document.getElementById('riesgoBean.duracion.idUnidadDuracion').selectedIndex].value = '3';						
					document.getElementById('riesgoBean.duracion.idUnidadDuracion').disabled = true;
				}
			
			}else{
			
				if(document.getElementById('riesgoBean.duracion.duracionNumero')!=undefined && document.getElementById('riesgoBean.duracion.idUnidadDuracion')!=undefined){
				
					document.getElementById('riesgoBean.duracion.duracionNumero').disabled = false;
					document.getElementById('riesgoBean.duracion.idUnidadDuracion').disabled = false;
				}
			}
		}
	}
	
	function ctrlGarantiaGeneral(value){
		
		if(value==1){
			if(document.getElementById('poliza.idNivelFecVcto') != undefined){
				document.getElementById('poliza.idNivelFecVcto').disabled = true;
			}
			document.getElementById('poliza.idNivelEmisionRecibo').disabled = true;
			document.getElementById('poliza.idNivelMedioCobro').disabled = true;
			
			if(document.getElementById('poliza.idNivelFormaPago') != undefined){
				document.getElementById('poliza.idNivelFormaPago').disabled = true;
			}
		
			if(document.getElementById('poliza.idNivelFecVcto') != undefined){
				document.getElementById('poliza.idNivelFecVcto').value = '1';
			}
			document.getElementById('poliza.idNivelEmisionRecibo').value = '1';
			document.getElementById('poliza.idNivelMedioCobro').value = '1';
			if(document.getElementById('poliza.idNivelFormaPago') != undefined){
				document.getElementById('poliza.idNivelFormaPago').value = '1';
			}
		}else{
			document.getElementById('poliza.idNivelEmisionRecibo').disabled = false;
		}

		var idReciboEmision=document.getElementById('poliza.idNivelEmisionRecibo').value;
		if(idReciboEmision==2){
			if(document.getElementById('poliza.idNivelFecVcto') != undefined){
				document.getElementById('poliza.idNivelFecVcto').disabled = false;
			}
			document.getElementById('poliza.idNivelEmisionRecibo').disabled = false;
			document.getElementById('poliza.idNivelMedioCobro').disabled = false;
			if(document.getElementById('poliza.idNivelFormaPago') != undefined){
				document.getElementById('poliza.idNivelFormaPago').disabled = false;
			}
		}
		ctrlFormaPago();
		ctrlMedioPago()
	}
	
	//	Controla el combo de las formas de pago
	function ctrlFormaPago(state){
		var campoIdFormaPago = document.getElementById('poliza.datosGestion.idFormaPago');
		var selectNivelFormaPago = document.getElementById('poliza.idNivelFormaPago');
		var selectVencimiento=document.getElementById('poliza.idNivelFecVcto');
		
		
		if(selectVencimiento != undefined && selectNivelFormaPago != undefined){
			var opcion=selectNivelFormaPago[selectNivelFormaPago.selectedIndex].value;
			// si el Nivel Forma Pago es Riesgo el Vencimiento debe ser también Nivel Riesgo 
			if(opcion=='2'){			
			    for (i = 0; i < selectVencimiento.length; i++) {
			       if (selectVencimiento[i].value == opcion) {
			    	   selectVencimiento[i].selected = true;
			       }   
			    }
			 // si el Nivel Forma Pago es Póliza el Vencimiento debe ser también Nivel Póliza
			}else if(opcion=='1'){
			    for (i = 0; i < selectVencimiento.length; i++) {
			       if (selectVencimiento[i].value == opcion) {
			    	   selectVencimiento[i].selected = true;
			       }   
			    }
			}
		}
		
		if(campoIdFormaPago!=undefined){
			
			if(state!=undefined){
				campoIdFormaPago.disabled = state;
			
				if(state == false){
					setValue('poliza.datosGestion.idFormaPago',null);
				}
			}else{
				
				// Si el nivel de pago es a nivel de riesgo se quita de modificacion en poliza
				// com.calculo.gims.produccion.general.beans.NivelFormaPago.RGO
				if(document.getElementById('poliza.idNivelFormaPago') != undefined && document.getElementById('poliza.idNivelFormaPago').value==2){
					campoIdFormaPago.disabled = true;
					campoIdFormaPago.selectedIndex = 0;
				}else{
					campoIdFormaPago.disabled = false;
				}
			}
		}
	}
	
	// Controla las operaciones a realizar si se cambia el combo de vencimiento
	function ctrlVencimiento(select){	
		var opcion=select[select.selectedIndex].value;
		var selectNivelFormaPago = document.getElementById('poliza.idNivelFormaPago');
		// si el Nivel Forma Pago es Riesgo el Vencimiento debe ser también Nivel Riesgo 
		if(selectNivelFormaPago != undefined){
			if(opcion=='2'){
			    for (i = 0; i < selectNivelFormaPago.length; i++) {
			       if (selectNivelFormaPago[i].value == opcion) {
			    	   selectNivelFormaPago[i].selected = true;
			       }   
			    }
			}else if(opcion=='1'){
			    for (i = 0; i < selectNivelFormaPago.length; i++) {
			       if (selectNivelFormaPago[i].value == opcion) {
			    	   selectNivelFormaPago[i].selected = true;
			       }   
			    }
			}
		}
		ctrlFormaPago();
	}
	
	// 	Controla el combo de medio de cobro para los datos generales del mvto de la poliza
	function ctrlMedioPago(state){
		var campoIdMedioCobro = document.getElementById('poliza.datosGestion.idMedioCobro');

		if(campoIdMedioCobro!=undefined){
			
			if(state!=undefined){
				campoIdMedioCobro.disabled = state;
				if(state == false){
					setValue('poliza.datosGestion.idMedioCobro',null);
				}
			}else{
				
				// Si el nivel de cobro es a nivel de riesgo se quita de modificacion en poliza
				// com.calculo.gims.produccion.general.beans.NivelMedioCobro.RGO
				if(document.getElementById('poliza.idNivelMedioCobro').value==2){
					campoIdMedioCobro.disabled = true;
					campoIdMedioCobro.value = '';
					campoIdMedioCobro.selectedIndex = 0;
				}
			}
		}
	}
	
	function showGestion1ReciboMediador(flag){

		if(document.getElementById('gestion1Recibo1')!=undefined){			
			showHide(document.getElementById('gestion1Recibo1'),flag);	
			showHide(document.getElementById('gestion1Recibo2'),flag);
		}	
	}
	
	/*
	* Controla los campos de entrada que hay que mostrar para introducir los datos bancarios del tomador
	*/
	function funcionalidadMedioCobro(value){
		if(document.getElementById('poliza.datosGestion.idMedioCobro').options[document.getElementById('poliza.datosGestion.idMedioCobro').selectedIndex].value == undefined){
			value = document.getElementById('poliza.datosGestion.idMedioCobro').value
		}
		
		if(value == 1){
			// Banco
			if(document.getElementById('idTableDatosBanco')){
				showHide(document.getElementById('idTableDatosBanco'),true);	
							
			}			
			//Mandato
			if(document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') != undefined && 
					(document.getElementById('poliza.idNivelEmisionRecibo').value == 2 || document.getElementById('poliza.idNivelEmisionRecibo').value == 3)){
				showHide(document.getElementById('idTableDatosMandato'),false);
			}else if(document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') != undefined 
					&& document.getElementById('poliza.idNivelEmisionRecibo').value == 1){
				showHide(document.getElementById('idTableDatosMandato'),true);
			}else if (document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') == undefined ){
				showHide(document.getElementById('idTableDatosMandato'),true);
			}
			
			// Eliminada llamada para que cuando se cambie de medio de cobro
			// no se quite la proteccion sobre los datos bancarios.
			//ctrlDatosBancoEnable(false);
			
			if(document.getElementById('idTableDatosTarjeta'))
				showHide(document.getElementById('idTableDatosTarjeta'),false);
	
			if(document.getElementById('idTodoDomicilioCobro'))
				showHide(document.getElementById('idTodoDomicilioCobro'),false);

			if(document.getElementById('tomador.swDomicilioCobro'))
				setValue('tomador.swDomicilioCobro','0');
			
			mostrarDomicilioCobro(0);
			showGestion1ReciboMediador(true);
			
		}else if(value == 6){
			// Tarjeta
			showHide(document.getElementById('idTableDatosBanco'),false);	
			showHide(document.getElementById('idTableDatosTarjeta'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),false);
			showHide(document.getElementById('idTableDatosMandato'),false);
			
			if(document.getElementById('tomador.swDomicilioCobro'))setValue('tomador.swDomicilioCobro','0');
			
			mostrarDomicilioCobro(0);
			showGestion1ReciboMediador(false);
			
		}else if( (value!=1 && value!=6) || (value==undefined || value=='' || value==null) ){
			// No es ni tarjeta ni es banco						
			showHide(document.getElementById('idTableDatosBanco'),false);
			showHide(document.getElementById('idTableDatosMandato'),false);
			showHide(document.getElementById('idTableDatosTarjeta'),false);
			showHide(document.getElementById('idTodoDomicilioDocum'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),true);
			
			if(document.getElementById('tomador.swDomicilioCobro')){
				var sinLimpiar = document.getElementById('tomador.swDomicilioCobro').value=='1';
				mostrarDomicilioCobro(document.getElementById('tomador.swDomicilioCobro').value, sinLimpiar);
			}
			showGestion1ReciboMediador(false);
		}
	}
	
	/**
	 * Recarga el bloque de informacion tomador si el medio de cobro es <b>BANCO</b>
	 * 
	 * @param idMedioCobro Id del medio de cobro seleccionado
	 */
	function reloadPersonaByMedioCobro(idMedioCobro){
		if(idMedioCobro == medioCobroBanco){
			if(document.getElementById('idPersona').value!=''){		
				loadPersona(document.getElementById('idPersona').value);
			 	presentationLogicPersona(document.getElementById('idPersona').value);
				document.getElementById('tomador.codIban').disabled=true;
				document.getElementById('tomador.codBanco').disabled=true;
			 	document.getElementById('tomador.codSucursal').disabled=true;
			 	document.getElementById('tomador.ctaDigito').disabled=true;
			 	document.getElementById('tomador.ctaBanco').disabled=true;
			 	document.getElementById('tomador.tipoDatoBancario').disabled=true;
			}				
		}
	}
	
	function showGestion1ReciboMediadorRiesgo(flag){

		if(document.getElementById('gestion1Recibo1')!=undefined){			
			showHide(document.getElementById('gestion1Recibo1'),flag);	
			showHide(document.getElementById('gestion1Recibo2'),flag);
			
			showHide(document.getElementById('gestion1Recibo1_2'),!flag);	
			showHide(document.getElementById('gestion1Recibo2_2'),!flag);
			
			if(flag!=null && flag!=undefined && document.getElementById('riesgoBean.datosGestion.sw1erRecMediador') !=undefined){
				
				if(flag){
					document.getElementById('riesgoBean.datosGestion.sw1erRecMediador').value = '1';
				}else{
					document.getElementById('riesgoBean.datosGestion.sw1erRecMediador').value = '0';
				}
			}
		}	
	}
	
	/*
	* Controla los campos de entrada que hay que mostrar para introducir los datos bancarios del tomador en las pantallas del riesgo de la poliza
	*/
	function funcionalidadMedioCobroRiesgo(value){

		if(document.getElementById('riesgoBean.datosGestion.idMedioCobro').options[document.getElementById('riesgoBean.datosGestion.idMedioCobro').selectedIndex].value == undefined){
			value = document.getElementById('riesgoBean.datosGestion.idMedioCobro').value
		}
		
		if(value == 1){
			// Banco
			showHide(document.getElementById('idTableDatosBanco'),true);	
			showHide(document.getElementById('idTableDatosTarjeta'),false);
			showHide(document.getElementById('idTodoDomicilioCobro'),false);
			if(document.getElementById('tomador.swDomicilioCobro'))
				setValue('tomador.swDomicilioCobro','0');
			
			//Mandato
			if(document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') != undefined && 
					(document.getElementById('poliza.idNivelEmisionRecibo').value == 2 || document.getElementById('poliza.idNivelEmisionRecibo').value == 3)){
				showHide(document.getElementById('idTableDatosMandato'),true);
			}else if(document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') != undefined 
					&& document.getElementById('poliza.idNivelEmisionRecibo').value == 1){
				showHide(document.getElementById('idTableDatosMandato'),false);
			}else if (document.getElementById('idTableDatosMandato') != undefined && document.getElementById('poliza.idNivelEmisionRecibo') == undefined ){
				showHide(document.getElementById('idTableDatosMandato'),false);
			}

			mostrarDomicilioCobro(0);
			showGestion1ReciboMediadorRiesgo(true);

		}else if(value == 6){
			// Tarjeta
			showHide(document.getElementById('idTableDatosBanco'),false);	
			showHide(document.getElementById('idTableDatosMandato'),false);
			showHide(document.getElementById('idTableDatosTarjeta'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),false);
			
			if(document.getElementById('tomador.swDomicilioCobro'))
				setValue('tomador.swDomicilioCobro','0');
			
			mostrarDomicilioCobro(0);
			showGestion1ReciboMediadorRiesgo(false);	

		}else if( (value!=1 && value!=6) || (value==undefined || value=='' || value==null) ){
			// No es ni tarjeta ni es banco						
			showHide(document.getElementById('idTableDatosBanco'),false);	
			showHide(document.getElementById('idTableDatosMandato'),false);
			showHide(document.getElementById('idTableDatosTarjeta'),false);
			showHide(document.getElementById('idTodoDomicilioDocum'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),true);
			if(document.getElementById('tomador.swDomicilioCobro')){
				var sinLimpiar = document.getElementById('tomador.swDomicilioCobro').value=='1';
				mostrarDomicilioCobro(document.getElementById('tomador.swDomicilioCobro').value, sinLimpiar);
			}

			showGestion1ReciboMediadorRiesgo(false);
		}
	}
	
	/*
	* Controlamos los div (tarjeta/cuenta bancaria) para el tomador de la agrupacion
	*/
	function funcionalidadMedioCobroAgr(value){

		if(value == 1){
			//Banco
			showHide(document.getElementById('idTableDatosBanco'),true);	
			showHide(document.getElementById('idTableDatosTarjeta'),false);
			showHide(document.getElementById('idTodoDomicilioCobro'),false);

			if(document.getElementById('tomador.swDomicilioCobro'))
				setValue('tomador.swDomicilioCobro','0');

			mostrarDomicilioCobro(0);
			
		}else if(value == 6){
			// Tarjeta
			showHide(document.getElementById('idTableDatosBanco'),false);	
			showHide(document.getElementById('idTableDatosTarjeta'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),false);
			
			if(document.getElementById('tomador.swDomicilioCobro'))
				setValue('tomador.swDomicilioCobro','0');

			mostrarDomicilioCobro(0);
		
		}else if( (value!=1 && value!=6) || (value==undefined || value=='' || value==null) ){
			// No es ni tarjeta ni es banco						
			showHide(document.getElementById('idTableDatosBanco'),false);	
			showHide(document.getElementById('idTableDatosTarjeta'),false);
			showHide(document.getElementById('idTodoDomicilioDocum'),true);
			showHide(document.getElementById('idTodoDomicilioCobro'),true);
			
			if(document.getElementById('tomador.swDomicilioCobro')){
				var sinLimpiar = document.getElementById('tomador.swDomicilioCobro').value=='1';
				mostrarDomicilioCobro(document.getElementById('tomador.swDomicilioCobro').value, sinLimpiar);
			}
		}
	}
	
	/*
	*	Muestra el apartado referente al domicilio de cobro dependiendo de swDomicilioCobro
	*/
	function mostrarDomicilioCobro(value, sinLimpiarDatos){
		
		if(value == '1') {  		 	
            showHide('domiliCobro',true);
            
         } else if (value == '0') {	        
            showHide('domiliCobro',false);
        
         }else if (value == '' || value==undefined) {
            showHide('domiliCobro',false);
         }
		if (sinLimpiarDatos==undefined || sinLimpiarDatos!=true){
			cleanDatosDomiciliosAux('cobro');
		}
	} 
  
	/*
	 *  Muestra el apartado referente al domicilio de documentacion dependiendo de swDomicilioDocu
	 */
	function mostrarDomicilioDocum(value, sinLimpiarDatos){
  	
		if(value == '1') {
			showHide('domiliDocum',true);
            
		} else if (value == '0') {	        
			showHide('domiliDocum',false);
		
		}else if (value == '' || value==undefined) {
            showHide('domiliDocum',false);
        }
		if (sinLimpiarDatos==undefined || sinLimpiarDatos!=true){
			cleanDatosDomiciliosAux('docu');
		}
	}

	/*
	 * Controla la visualiizacion de los campos  porcComisGestorPrimer y  orcComisGestorSuc segun el tipo de comision
	 */
	function ctrlTipoComision(value){
		
		if(value == 2){
			
			showHide(document.getElementById('porComision1Lit'),true);
			showHide(document.getElementById('porComision1Imput'),true);
			showHide(document.getElementById('porComisionSucesivoLit'),true);
			showHide(document.getElementById('porComisionSucesivoImput'),true);	
			
			showHide(document.getElementById('porComision1Lit2'),false);
			showHide(document.getElementById('porComision1Imput2'),false);
			showHide(document.getElementById('porComisionSucesivoLit2'),false);
			showHide(document.getElementById('porComisionSucesivoImput2'),false);
  		
  		}else{
		
			if(document.getElementById('poliza.datosGestion.porcComisGestorPrimer')!=undefined){
				document.getElementById('poliza.datosGestion.porcComisGestorPrimer').value = 0;
			}
		
			if(document.getElementById('poliza.datosGestion.porcComisGestorSuc')!=undefined){
				document.getElementById('poliza.datosGestion.porcComisGestorSuc').value = 0;
			}
  			
			showHide(document.getElementById('porComision1Lit'),false);
			showHide(document.getElementById('porComision1Imput'),false);
			showHide(document.getElementById('porComisionSucesivoLit'),false);
			showHide(document.getElementById('porComisionSucesivoImput'),false);
			
			showHide(document.getElementById('porComision1Lit2'),true);
			showHide(document.getElementById('porComision1Imput2'),true);
			showHide(document.getElementById('porComisionSucesivoLit2'),true);
			showHide(document.getElementById('porComisionSucesivoImput2'),true);
			

  		}
	}
  
	function ctrlEmisionRecibo(value){
	
		if(document.getElementById('poliza.idNivelEmisionRecibo')!=undefined && value!=undefined){
			
			if(value==2 || value==3){

				showHide(document.getElementById('idTableDatosMandato'),false);
				
			}else if(value == 1 && document.getElementById('poliza.datosGestion.idMedioCobro')!= undefined && document.getElementById('poliza.datosGestion.idMedioCobro').value == 1){
				showHide(document.getElementById('idTableDatosMandato'),true);
			}
			
			if(value==1 || value==3){
				setValue('poliza.idNivelFormaPago','1');
				if(document.getElementById('poliza.idNivelFecVcto') != undefined){
					setValue('poliza.idNivelFecVcto','1');
				}
				setValue('poliza.idNivelMedioCobro','1');
				
				if(document.getElementById('poliza.idNivelFormaPago') != undefined){
					document.getElementById('poliza.idNivelFormaPago').disabled = true;	
				}
				if(document.getElementById('poliza.idNivelFecVcto') != undefined && document.getElementById('poliza.idNivelFecVcto') != undefined){
					document.getElementById('poliza.idNivelFecVcto').disabled = true;
				}
				document.getElementById('poliza.idNivelMedioCobro').disabled = true;
				
				if(document.getElementById('poliza.datosGestion.swEmisionRecibo') != undefined && document.getElementById('poliza.datosGestion.swEmisionRecibo') != null){
				
					showHide(document.getElementById('tdSwEmisionRecibo1'),true);
					showHide(document.getElementById('tdSwEmisionRecibo2'),true);
				}
			
				if (value==3){
					document.getElementById('poliza.swAgrpRiesgos').value='1';
					document.getElementById('swAgrpRiesgos.si').checked = true;
					document.getElementById('swAgrpRiesgos.no').checked = false;
				}
			
			}else{
			
				if(document.getElementById('poliza.idNivelFormaPago') != undefined){
					document.getElementById('poliza.idNivelFormaPago').disabled = false;
				}
				if(document.getElementById('poliza.idNivelFecVcto') != undefined){
					document.getElementById('poliza.idNivelFecVcto').disabled = false;
				}
				document.getElementById('poliza.idNivelMedioCobro').disabled = false;
			
				if(document.getElementById('poliza.datosGestion.swEmisionRecibo') != undefined && document.getElementById('poliza.datosGestion.swEmisionRecibo') != null){
			
					showHide(document.getElementById('tdSwEmisionRecibo1'),false);
					showHide(document.getElementById('tdSwEmisionRecibo2'),false);
				}
			}

			ctrlFormaPago();
			ctrlMedioPago();
		}
	}
	
	function showDatosTomador(value){
		
		if(value==1){
			
			showHide(document.getElementById('idDivPersonaFisica'),false);
			showHide(document.getElementById('selectSexo'),false);
			showHide(document.getElementById('idDivPersonaJuridica'),true);

			setValue('tomador.nombre','');
			setValue('tomador.apel1','');
			setValue('tomador.apel2','');
			setValue('tomador.idSexo','');
			
		}else if(value==2 || value==3 || value==4){

			showHide(document.getElementById('idDivPersonaFisica'),true);
			showHide(document.getElementById('selectSexo'),true);
			showHide(document.getElementById('idDivPersonaJuridica'),false);

			setValue('tomador.razonSocial','');
		
		}else if(value==undefined || value==''){
			
			showHide(document.getElementById('idDivPersonaFisica'),false);
			showHide(document.getElementById('selectSexo'),false);
			showHide(document.getElementById('idDivPersonaJuridica'),false);
		
		}
	}
	
	//   ----   FUNCIONALIDAD PARA EL TOMADOR ------------- 
	function lupaPersonas(fordwar){
		
		if(mapaPrecargados!=null && mapaPrecargados['tomador']!=null)
			mapaPrecargados['tomador']=null;
		
		var tipo;
		var tipoDoc = document.getElementById('tomador.idTipoIdent').value;
		if( tipoDoc == 1){
			tipo = 2;
		}else if(tipoDoc == 2 || tipoDoc == 3 || tipoDoc == 4){
			tipo = 1;
		} else {
			tipo = "";
		}
		
		pag= fordwar;
    	pag= pag + "?tipoPersona=" + tipo;
    	pag= pag + "&tipoIdentificador="+document.getElementById('tomador.idTipoIdent').value;
    	pag= pag + "&identificador="+document.getElementById('tomador.docIdent').value;
    	pag= pag + "&nombre="+document.getElementById('tomador.nombre').value;
    	pag= pag + "&apel1="+document.getElementById('tomador.apel1').value;
    	pag= pag + "&apel2="+document.getElementById('tomador.apel2').value;
    	pag= pag + "&razonSocial="+document.getElementById('tomador.razonSocial').value;	
    	
    	var valor = lanzarVentana(pag,600,480);
    	var idPersona=null;
    	if(valor!=undefined){
    		idPersona=valor[0];
    		loadPersona(valor[0]);
    		inicializarConsultaMutualista();
    	}
    }
	
	/**
	 * Recarga la informacion del tomador dado un idPersona
	 * 
	 * @param idPersona Id de la persona seleccionada
	 */
	function loadPersona(idPersona){
		if(null!=idPersona && undefined!=idPersona){
			setValue('tomador.idPersona',idPersona);
			var parametros ="";
			if(null!=document.forms['mvtoPolizaForm'] && undefined != document.forms['mvtoPolizaForm']){
				parametros = obtenerParametersCamposFormularios(['mvtoPolizaForm']);
			}else{
				parametros = obtenerParametersCamposFormularios(['polRiesgoForm']);
			}			
			nuevaPeticionAjax(actionTomador,'post',parametros,callbackTomadorPoliza,callbackError);
			updateCodigoPostal('tomador.domicilioView');
		}
	}
	
	function presentationLogicPersona(idPersona){
		// muestro los campos dependiendo si es persona fisica o juridica
    	showDatosTomador(document.getElementById('tomador.idTipoIdent').value);

    	if(document.getElementById('tomador.domicilioView.idPais')!=undefined && document.getElementById('tomador.domicilioView.idPais').value == ''){
			var valorPais = obtenerValueComboMedianteId('tomador.domicilioView.idPais', codigoPaisCompania);
			document.getElementById('tomador.domicilioView.idPais').value=valorPais;
    		document.getElementById('tomador.domicilioView.idPais').id=codigoPaisCompania;
			changePaisLogicNew('tomador.domicilioView.idPais','tomador.domicilioView.idProvincia','tomador.domicilioView.localidad','tomador.domicilioView.imgBusqLocalidad','tomador.domicilioView.codPostal','tomador.domicilioView.codigoPais');               
    	}

    	if(document.getElementById('tomador.tipoDatoBancario')!=undefined && document.getElementById('tomador.tipoDatoBancario').value != ''){
    		cambiarCapaDatos(document.getElementById('tomador.tipoDatoBancario').value);
    	}
    	
    	// si obtengo algo de figuras, desabilito los campos pertinentes
    	if(idPersona !=null){
    		disableDatosTomador(true);
    		disableDatosTomadorPoPup(true);
        	disableCamposNoModif(true);
        	ctrlDatosBanco(true);
    		// Añado el mapa de campos precargados
        }
	}
    
	//  ----   BLOQUEOS DE CAMPOS ------------- 
	function disableDatosTomador(flag){		
		
		disableDatosPersonales(flag, 'tomador');
		disableDatosTomadorPoPup(flag);
		disableDatosAuxTomador(flag);
    	if(document.getElementById('tomador.domicilioView.via')!=undefined 
    			&& document.getElementById('tomador.domicilioView.via').value!=''){
    		disableDomicilioTomador(flag);
    	}
    	ctrlDatosBanco(true);
    }
    
    function disableDatosTomadorPoPup(flag){
    	
    	disableDatosPersonaAdic(flag, 'tomador');
    }
    
    function disableDatosAuxTomador(flag){
    	
    	disableDatosAdicionales(flag, 'tomador');
    }
	
    function disableDomicilioTomador(flag){
    	
    	disableDomicilio(flag, 'tomador.domicilioView', 'tomador');
    }
    
    function disableCamposPagadorRiesgo(flag){
    	
    	//Duracion
    	if(document.getElementById('riesgoBean.fecEfectoRiesgo')!=undefined){    	
    		document.getElementById('riesgoBean.fecEfectoRiesgo').disabled = flag;
    	}	

    	if(document.getElementById('riesgoBean.duracion.idUnidadDuracion')!=undefined){    	
    		document.getElementById('riesgoBean.duracion.idUnidadDuracion').disabled = flag;
    	}	
    	
    	if(document.getElementById('riesgoBean.duracion.duracionNumero')!=undefined){    	
    		document.getElementById('riesgoBean.duracion.duracionNumero').disabled = flag;
    	}	
    	
    	if(document.getElementById('riesgoBean.duracion.idDuracionSeguro')!=undefined){    	
    		document.getElementById('riesgoBean.duracion.idDuracionSeguro').disabled = flag;
    	}
    	
    	//Gestion
    	if(document.getElementById('riesgoBean.datosGestion.idMedioCobro')!=undefined && idNivelMedioCobro=="2"){    	
    		document.getElementById('riesgoBean.datosGestion.idMedioCobro').disabled = flag;
    	}	
    	
    	if(document.getElementById('riesgoBean.datosGestion.sw1erRecMediador')!=undefined){    	
    		document.getElementById('riesgoBean.datosGestion.sw1erRecMediador').disabled = flag;
    	}	    	
    	
    	//Pagador
    	disableDatosAdicionales(flag, 'tomador');
    	disableDatosBancarios(flag, 'tomador');
    	disableDatosTja(flag, 'tomador');
    }
    
    function disableCamposNoModif(flag){
    	
    	disableDatosAdicionales(flag, 'tomador');
    }
    
	function disableDatosDomicilioAux(flag){

		//Documentacion 	
		disableDomicilio(flag, 'tomador.domicilioDocumView');
		
		//Cobro
		disableDomicilio(flag, 'tomador.domicilioCobroView');
		
    }
    
    function disableTelefonosEmail(flag){

    	disableCamposNoModif(flag);
    }
    
    function disableTelefonosEmailIds(flag){
    
   		document.getElementById('tomador.idTlfn1').disabled = flag;
   		document.getElementById('tomador.idTlfn2').disabled = flag;
   		document.getElementById('tomador.idTlfn3').disabled = flag;
   		document.getElementById('tomador.idFax').disabled = flag;
   		document.getElementById('tomador.idEmail').disabled = flag;
    }
    
    function ctrlDatosBanco(flag){
    	
    	disableDatosBancarios(flag, 'tomador');
    }
    
    function ctrlDatosTjta(flag){
    	
    	disableDatosTja(flag, 'tomador');
    }
    
    function cleanDatosTomador(){

    	var objetoIdent = document.getElementById('tomador.idTipoIdent');
    	
		setValue('tomador.idTipoIdent','');
    	setValue('tomador.docIdent','');
    	setValue('tomador.nombre','');
    	setValue('tomador.apel1','');
    	setValue('tomador.apel2','');
    	setValue('tomador.razonSocial','');
    	setValue('tomador.idPersona','');
    	setValue('tomador.idIdioma','');
		setValue('tomador.idSexo','');
		setValue('tomador.fecNacimiento','');
		setValue('tomador.idDomicilio','');
			
		disableDatosTomador(false);
		
		cleanDatosDomicilio();
		
		cleanEmailTlf();
		
		if(document.getElementById('tomador.codIban')!=undefined){
			cleanDatosBanco(); 
		}
		
		if(document.getElementById('tomador.codTarjeta')!=undefined){
			cleanDatosTjaCredito();
		}
	
		cleanDatosDomiciliosAux('principal');
		
		if(document.getElementById('tomador.domicilioDocumView.via')!=undefined){
			cleanDatosDomiciliosAux('docu');
		}
	
		if(document.getElementById('tomador.domicilioCobroView.via')!=undefined){
   			cleanDatosDomiciliosAux('cobro');
		}
		
		inicializarConsultaMutualista();
		
		// Seleccionamos el idioma de comunicación por defecto
		var idIdiomaPorDefecto=jQuery("#idiomaComunicacionPorDefecto").val();
		jQuery("#tomador\\.idIdiomaComm option").each(function(){
			if (jQuery(this).val() == idIdiomaPorDefecto) {
		         jQuery(this).attr("selected","selected");
		    }   
	    });
    }
    
    function deleteDatosTomador(url,mensajeOK,mensajeNoOK){
    
    	if(mapaPrecargados!=null && mapaPrecargados['tomador']!=null)
    		mapaPrecargados['tomador']=null;
        new Ajax.Request(url, {method: 'get', 
        					   onSuccess: function(transport) {
        						   if (transport.responseText.match(/ok/)){
        							   cleanDatosTomador();
        							   cleanEmailTlf();
        							   alert(mensajeOK); 
        						   } else { 
        							   alert(mensajeNoOK);
        						   } 
        						}});	 
    }
    
    function deleteDatosPersonaRelacionada(url){
    
        new Ajax.Request(url, {method: 'get', 
        					   onSuccess: function(transport) {
        						   if (transport.responseText.match(/ok/)){
        							   cleanDatosPersonaRelacionada();
        						   } else { } 
        					   }});	 
    }
    
    function cleanDatosMasInfo(){

    	if(document.getElementById('tomador.fecNacimiento')!=undefined){
    		setValue('tomador.fecNacimiento','');  	
    	}
    	
    	if(document.getElementById('tomador.idEstadoCivil')!=undefined){    	
    		setValue('tomador.idEstadoCivil','');  
    	}
    	
    	if(document.getElementById('tomador.numHijos')!=undefined){
    		setValue('tomador.numHijos','');  
    	}
    	
    	if(document.getElementById('tomador.url')!=undefined){
    		setValue('tomador.url','');  
    	}
    	
    	if(document.getElementById('tomador.observaciones')!=undefined){
    		setValue('tomador.observaciones','');  
    	}
    	
    	if(document.getElementById('tomador.idCategoriaCarnet')!=undefined){
    		setValue('tomador.idCategoriaCarnet','');  
    	}
    	
    	if(document.getElementById('tomador.fecIniCarnet')!=undefined){
    		setValue('tomador.fecIniCarnet','');  
    	}
    	
    	if(document.getElementById('tomador.fecFinCarnet')!=undefined){
    		setValue('tomador.fecFinCarnet','');  
    	}
    	
    	if(document.getElementById('tomador.fecFinCarnet')!=undefined){
    		setValue('tomador.fecFinCarnet',''); 
    	}
    }
    
    function cleanEmailTlf(){
    
    	if(document.getElementById('tomador.tlfn1')!=undefined){
	    	document.getElementById('tomador.tlfn1').disabled = false;
	    	setValue('tomador.tlfn1','');
		}
		
		if(document.getElementById('tomador.tlfn2')!=undefined){
	    	document.getElementById('tomador.tlfn2').disabled = false;
	    	setValue('tomador.tlfn2','');
		}    
		
		if(document.getElementById('tomador.tlfn3')!=undefined){
	    	document.getElementById('tomador.tlfn3').disabled = false;
	    	setValue('tomador.tlfn3','');
		}    
		
		if(document.getElementById('tomador.idTlfn1')!=undefined){
	    	document.getElementById('tomador.idTlfn1').disabled = false;
	    	setValue('tomador.idTlfn1','');
		}    
    	
    	if(document.getElementById('tomador.idTlfn2')!=undefined){
	    	document.getElementById('tomador.idTlfn2').disabled = false;
	    	setValue('tomador.idTlfn2','');
		} 
    	
    	if(document.getElementById('tomador.idTlfn3')!=undefined){
	    	document.getElementById('tomador.idTlfn3').disabled = false;
	    	setValue('tomador.idTlfn3','');
		}
    	
    	if(document.getElementById('tomador.fax')!=undefined){
	    	document.getElementById('tomador.fax').disabled = false;
	    	setValue('tomador.fax','');
		}
		
		if(document.getElementById('tomador.idFax')!=undefined){
	    	document.getElementById('tomador.idFax').disabled = false;
	    	setValue('tomador.idFax','');
		}
		
		if(document.getElementById('tomador.email')!=undefined){
	    	document.getElementById('tomador.email').disabled = false;
	    	setValue('tomador.email','');
		}
    	
    	if(document.getElementById('tomador.idEmail')!=undefined){
	    	document.getElementById('tomador.idEmail').disabled = false;
	    	setValue('tomador.idEmail','');
		}
    }
    
    function cleanDatosDomicilio(tipo){
	var limpiarTodo=false;
     if(tipo && tipo == "principal")
		limpiarTodo=true;

    	var via = document.getElementById('tomador.domicilioView.via');
    	var tipoVia = document.getElementById('tomador.domicilioView.idTipoVia');
    	
		setValue('tomador.domicilioView.id','');	    
		setValue('tomador.domicilioView.idTipoVia','');
		setValue('tomador.domicilioView.via','');
		setValue('tomador.domicilioView.numVia','');
		setValue('tomador.domicilioView.bloque','');
		setValue('tomador.domicilioView.piso','');
		setValue('tomador.domicilioView.puerta','');
		setValue('tomador.domicilioView.idPais','');
		setValue('tomador.domicilioView.codPostal','');
		setValue('tomador.domicilioView.codPostalExt','');
		setValue('tomador.domicilioView.localidad','');
		setValue('tomador.domicilioView.idProvincia',''); 
		
		if(document.getElementById('tomador.tlfn1')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.tlfn1').disabled=false; 
			}

			if(document.getElementById('tomador.tlfn1').disabled == false){
				setValue('tomador.tlfn1','');
		    }       	
		}
		
		if(document.getElementById('tomador.tlfn2')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.tlfn2').disabled=false; 
			}

			if(document.getElementById('tomador.tlfn2').disabled == false){
				setValue('tomador.tlfn2','');
		    }       	
		}    
		
		if(document.getElementById('tomador.tlfn3')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.tlfn3').disabled=false; 
			}

			if(document.getElementById('tomador.tlfn3').disabled == false){
				setValue('tomador.tlfn3','');
		    }       	
		}    
		
		if(document.getElementById('tomador.idTlfn1')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.idTlfn1').disabled=false; 
			}

			if(document.getElementById('tomador.idTlfn1').disabled == false){
				setValue('tomador.idTlfn1','');
		    }       	
		}    
		
		if(document.getElementById('tomador.idTlfn2')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.idTlfn2').disabled=false; 
			}

			if(document.getElementById('tomador.idTlfn2').disabled == false){
				setValue('tomador.idTlfn2','');
		    }       	
		} 
		
		if(document.getElementById('tomador.idTlfn3')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.idTlfn3').disabled=false; 
			}

			if(document.getElementById('tomador.idTlfn3').disabled == false){
				setValue('tomador.idTlfn3','');
		    }       	
		}
		
		if(document.getElementById('tomador.fax')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.fax').disabled=false; 
			}

			if(document.getElementById('tomador.fax').disabled == false){
				setValue('tomador.fax','');
		    }       	
		}
		
		if(document.getElementById('tomador.idFax')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.idFax').disabled=false; 
			}

			if(document.getElementById('tomador.idFax').disabled == false){
				setValue('tomador.idFax','');
		    }       	
		}
		
		if(document.getElementById('tomador.email')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.email').disabled=false; 
			}

			if(document.getElementById('tomador.email').disabled == false){
				setValue('tomador.email','');
		    }       	
		}
		
		if(document.getElementById('tomador.idEmail')!=undefined){
			if(limpiarTodo)
			{
				document.getElementById('tomador.idEmail').disabled=false; 
			}

			if(document.getElementById('tomador.idEmail').disabled == false){
				setValue('tomador.idEmail','');
			}       	
		}
		
		if(document.getElementById('tomador.domicilioView.via').disabled == true){
			disableDomicilioTomador(false);
		}
		document.getElementById('tomador.domicilioView.localidad').disabled=false;
		document.getElementById('tomador.domicilioView.idProvincia').disabled=false;	
    }

    function cleanDatosDomiciliosAux(tipo,idPais){
    	if(tipo == "docu"){
    		if(document.getElementById('btLimpiarDomicCobroTipoDocu')!=undefined){
    			if(document.getElementById('btLimpiarDomicCobroTipoDocu').value == 'Desbloquear'){
    				document.getElementById('btLimpiarDomicCobroTipoDocu').value = 'Limpiar';
    				disableDomicilio(false, 'tomador.domicilioDocumView');
    				//Cobro
    				//disableDomicilio(true, 'tomador.domicilioCobroView');
    			}else{
    		    	var viaDocum = document.getElementById('tomador.domicilioDocumView.idTipoVia');
    		    	var tipoViaDocum = document.getElementById('tomador.domicilioDocumView.via');    	    		
    				setValue('tomador.domicilioDocumView.idTipoVia','');
    				setValue('tomador.domicilioDocumView.via','');
    				setValue('tomador.domicilioDocumView.numVia','');
    				setValue('tomador.domicilioDocumView.bloque','');
    				setValue('tomador.domicilioDocumView.piso','');
    				setValue('tomador.domicilioDocumView.puerta','');
    				//setValue('tomador.domicilioDocumView.idPais','');
    				//document.getElementById('tomador.domicilioDocumView.idPais').options[0].selected = true;
    				setValue('tomador.domicilioDocumView.codPostal','');
    				setValue('tomador.domicilioDocumView.codPostalExt','');
    				setValue('tomador.domicilioDocumView.localidad','');
    				setValue('tomador.domicilioDocumView.idProvincia','');
    				setValue('tomador.domicilioDocumView.id','');			
    				//Documentacion 	
    				disableDomicilio(false, 'tomador.domicilioDocumView');
    				//Cobro
    				//disableDomicilio(true, 'tomador.domicilioCobroView');
    			}
    		}
    		
    	}else if(tipo == "cobro"){
			if(document.getElementById('btLimpiarDomicCobroTipoCobro') !=undefined){
				if(document.getElementById('btLimpiarDomicCobroTipoCobro').value == 'Desbloquear'){
					document.getElementById('btLimpiarDomicCobroTipoCobro').value = 'Limpiar';
					//disableDomicilio(true, 'tomador.domicilioDocumView');
					//Cobro
					disableDomicilio(false, 'tomador.domicilioCobroView');
				}else{

					var viaCobro = document.getElementById('tomador.domicilioCobroView.via');
			    	var tipoViaCobro = document.getElementById('tomador.domicilioCobroView.idTipoVia');
		    		setValue('tomador.domicilioCobroView.idTipoVia','');
		    		setValue('tomador.domicilioCobroView.via','');
		    		setValue('tomador.domicilioCobroView.numVia','');
		    		setValue('tomador.domicilioCobroView.bloque','');
		    		setValue('tomador.domicilioCobroView.piso','');
		    		setValue('tomador.domicilioCobroView.puerta','');
		    		//document.getElementById('tomador.domicilioCobroView.idPais').options[0].selected = true;
		    		setValue('tomador.domicilioCobroView.codPostal','');
		    		setValue('tomador.domicilioCobroView.codPostalExt','');
		    		setValue('tomador.domicilioCobroView.localidad','');
		    		setValue('tomador.domicilioCobroView.idProvincia','');
		    		setValue('tomador.domicilioCobroView.id','');	
		    		//disableDomicilio(true, 'tomador.domicilioDocumView');
					//Cobro
					disableDomicilio(false, 'tomador.domicilioCobroView');
				}
			}
    		  	
    	}else if(tipo == "principal"){   	
	    	// Ponemos el pais por defecto en el combo.
    		if(document.getElementById('tomador.domicilioView.idPais') !=undefined){
    			document.getElementById('tomador.domicilioView.idPais').value = idPais;
    		}			
			if(document.getElementById('btLimpiarDomicCobro') !=undefined){
				if(document.getElementById('btLimpiarDomicCobro').value == 'Desbloquear'){
					document.getElementById('btLimpiarDomicCobro').value = 'Limpiar';
					disableCamposNoModif(false);
					disableDomicilio(false, 'tomador.domicilioView');		
				}else{
					cleanDatosDomicilio(tipo);			
				}
			}
			
    	}    	
    }
    
   function isModifyDatosBanco(object,modifyTextConfirm){
	   if (document.getElementById('poliza.codTipoMvtoPoliza').value != 'NPROD' && 
			   (document.getElementById('tomador.ctaBanco').value!='' || document.getElementById('tomador.codIban').value!='' )){	   	  
	   	  if(!messageMostrado){
			 if(confirm(modifyTextConfirm)){
			   	document.getElementById(object).value = 1;		 
			 }else{
			 	document.getElementById(object).value = 0;
			 }			 
			 messageMostrado = true;
		   }			 
	    }    
    }    
    
    function cleanDatosBanco(){
    	if (document.getElementById('nombreBancoID')) 
    		document.getElementById('nombreBancoID').style.display = "none";
    	if (document.getElementById('direccionBancoID')) 
    		document.getElementById('direccionBancoID').style.display = "none";

    	// Se limpian los campos de banco.
    	setValue('tomador.codIban','');
    	setValue('tomador.codBanco','');
    	setValue('tomador.codSucursal','');
    	setValue('tomador.ctaDigito','');
    	setValue('tomador.ctaBanco','');
    	setValue('tomador.idCtaBanco','');
    	
    	// Se habilitan los campos de edicion de banco.
    	ctrlDatosBanco(false);    
    }
    
    function cleanDatosTjaCredito(){
    	
    	setValue('tomador.codTarjeta','');
    	setValue('tomador.idTipoTarjeta','');
    	setValue('tomador.mesTarjeta','');
    	setValue('tomador.annoTarjeta','');
    	setValue('tomador.idCtaTarjeta','');
    	
    	ctrlDatosTjta(false);
    }
    
    function datosPersonales(tipo,action,message, modulo){
   		
	    var idPersona = document.getElementById('tomador.idPersona').value;
	    var btLimpiarDisabled = document.getElementById('tomador.btLimpiar') != null ? document.getElementById('tomador.btLimpiar').disabled : false; 
	    
	    if(idPersona == null || idPersona == undefined || idPersona == ''){
	    	alert(message);

	    }else{
	    
			var pag = action;
			pag = pag + "?persona.id=" + idPersona;
			pag = pag + "&swCtasBancarias=1";
			pag = pag + "&swPermisos=1";
			var valor = lanzarVentana(pag,500,550);
			
			if (valor != null) {
	
		      	// domicilio
		        setValueLst('domicilioSelec',valor[0]);
		      
		        // email
		        setValueLst('emailSelec',valor[2]);
		        
		        //ctas Bancarias
		        setValueLst('ctaBancariaSelec',valor[4]);
		        
		        setLstValueLst(document.forms(0).telefonoSelec,valor[1]);
		        
		        //Tarjeta de Credito
		        setValueLst('ctaTjaCreditoSelec',valor[6]);
		        
		                
		 
		        if(tipo == 'principal'){
		        	retrieveURLPorPost(actionReloadDatosTomador,document.forms(0).name,false);
		        	updateCodigoPostal('tomador.domicilioView');    
		        	var cuenta = document.getElementById("tomador.idCtaBanco").value;
		 			
		        	retrieveURLPorPost(actionReloadBanco,document.forms(0).name,false);
		        	
		        	var cuentaModificada = document.getElementById("tomador.idCtaBanco").value;
	
					//Determinamos si se ha modificado la cuenta bancaria para preguntar si se quiere cambiar los recibos asociados.
					if(cuenta != cuentaModificada){
						//messageCambioCuentaEnRecibos => inicializada en tomador.jsp
						isModifyDatosBanco('tomador.idModifCtaBanco',messageCambioCuentaEnRecibos);
						messageMostrado = false;
					}
		        	
		        }else if(tipo == 'cobro'){
		        	retrieveURLPorPost(actionReloadDomicilioCobro,document.forms(0).name,false);       
		        	updateCodigoPostal('tomador.domicilioCobroView');
	
		        }else if(tipo == 'docu'){
		        	retrieveURLPorPost(actionReloadDomicilioDocu,document.forms(0).name,false);     
		        	updateCodigoPostal('tomador.domicilioDocumView');
	
		        }else if(tipo == 'banco'){
		 			var cuenta = document.getElementById("tomador.idCtaBanco").value;
		 			
		        	retrieveURLPorPost(actionReloadBanco,document.forms(0).name,false);
		        	
		        	var cuentaModificada = document.getElementById("tomador.idCtaBanco").value;
	
					//Determinamos si se ha modificado la cuenta bancaria para preguntar si se quiere cambiar los recibos asociados.
					if(cuenta != cuentaModificada){
						//messageCambioCuentaEnRecibos => inicializada en tomador.jsp
						isModifyDatosBanco('tomador.idModifCtaBanco',messageCambioCuentaEnRecibos);
						messageMostrado = false;
					}
	
		        }else if(tipo == 'tarjeta'){
		        	retrieveURLPorPost(actionReloadTja,document.forms(0).name,false);
		        }	
	        
		        showDatosTomador(document.getElementById('tomador.idTipoIdent').value);
		        
		        disableDatosAdicionales(true, 'tomador'); 	//disableCamposNoModif(true);
		        disableDatosPersonales(true, 'tomador');	//disableDatosTomador(true);
		        disableDomicilioPersonal(true, 'tomador');//disableDatosTomador(true);
		        if (btLimpiarDisabled) {
		        	document.getElementById('tomador.btLimpiar').disabled = true;
		        }

		        disableDatosDomicilioAux(true);
		        disableDatosTomadorPoPup(true);
		        
		        ctrlDatosBanco(true); //Añadido al sacar de disableDatosTomador la deshabilitación de la cuenta bancaria.
			}
	    }
    } 
  
    function allDisabledFull(form,flag){
    	if(form!= undefined && form!=null){
    		var campos = form.elements;
    	    for(var i= 0;i<campos.length; i++){
    	    	//Controlamos que el usuario tenga permisos para modificar el campo
    	    	if (campos[i].tienePermiso == undefined) {
    	    		campos[i].disabled = flag;
    	    	} else {
    	    		if (campos[i].tienePermiso) {
    	    			campos[i].disabled = flag;
    	    		}
    	    	}
         	}
         	
         	disableCodPostalCorrectos();
         
         	var elementosImg = document.getElementsByTagName("img");
         	array_img = new Array();
         	var valorCodigoImg;
       		var sizeArrayImg = elementosImg.length;
       		
       		for(var z=0;z<sizeArrayImg;z++){
       			var elementoImg=elementosImg[z];
       			// Si es la mano que habilita los campos, no se puede deshabilitar 
       			if(elementoImg.id != undefined && elementoImg.id != 'handWrite'){
       				if(elementoImg.id.indexOf('imgDisabled') > -1 ){   				
       					elementoImg.disabled = flag;	   			
       				}else{
       					elementoImg.disabled = flag;
       				}
       			}	   			   			
       		}
       		
       		disableBonifiRecar(form, flag);
       		
       		// Si el flag está a true, disabled = true por lo que habrá que indicar que el formularioHabilitado = false
       		if(flag == true){
       			swFormularioHabilitado = false;
       		} else {
       			swFormularioHabilitado = true;
       		}
    	}
    }
  
    /* 
     * Funcion que deshabilita/habilita los campos de porcentaje cuando habilitamos el formulario    
     */
    function disableBonifiRecar(form, flag){
    	var campos = form.elements;
  	    for(var k= 0;k<campos.length; k++){
  	    	if(campos[k].name.indexOf("chekeadoBonifRecar")>-1 && campos[k].checked){
				k=k+2;
				if(flag){
					campos[k].disabled = false;
				}else{	 
					campos[k].disabled = true;
				}
  	    	}
  	    }
    }

    function disableCodPostalCorrectos(){
		disableCodPostalCorrecto('tomador.domicilioView'); 	
  		disableCodPostalCorrecto('tomador.domicilioCobroView');
		disableCodPostalCorrecto('tomador.domicilioDocumView'); 
    }
  
  
    function disableCodPostalCorrecto(formPrefix) {
		var idCodPostalSP = formPrefix + ".codPostal";
		var idCodPostalEXT = idCodPostalSP + "Ext";
		var idProvincia = formPrefix + ".idProvincia";
		
		var codPostal = document.getElementById(idCodPostalSP);
		var codPostalExt = document.getElementById(idCodPostalEXT);
		
		var provincia = document.getElementById(idProvincia); 
		
		if ( provincia != undefined && provincia.value == 99 ) {
			if ( codPostal != undefined && codPostal != null )
				codPostal.value = "0";
		} else {
			if ( codPostalExt != undefined && codPostalExt != null )
				codPostalExt.value = "0";
		}
    }
   
   
    function ctrl1ReciboMediador(){
  
    	if(document.getElementById('poliza.datosGestion.sw1erRecMediador')!=undefined){
    		if(document.getElementById('poliza.datosGestion.sw1erRecMediador').value == '1'){
    			document.getElementById('poliza.datosGestion.sw1erRecMediador.si').checked = true;
    			document.getElementById('poliza.datosGestion.sw1erRecMediador.no').checked = false;
  			
    		}else{
    			document.getElementById('poliza.datosGestion.sw1erRecMediador.si').checked = false;
    			document.getElementById('poliza.datosGestion.sw1erRecMediador.no').checked = true;
    		}
    	}
    }
  
  	/**		Gestion pais, provincia, poblacion y codigo postal 	**/
	//	Actualiza los campos de la localizacion cuando se modifica el combo de paises
	function changePaisLogicNew(idComboPaises, idComboProvincias, idLocalidad, idFlechaLocalidades, idCodPostal, idCodPais,isLupa) {	
		var codigoProvincia = document.getElementById( idComboProvincias ).value;					
		// Para marcar el valor inicial no obtenido desde la BD
		if (codigoProvincia == undefined) {
			codigoProvincia = '';
		}
		var comboPaises = document.getElementById( idComboPaises );
		var codigoPais = '';
		if (comboPaises.selectedIndex != -1 ) {
			codigoPais = comboPaises.options[comboPaises.selectedIndex].id;
			if(document.getElementById(idCodPais) != null){
				document.getElementById(idCodPais).value = codigoPais;	
			}		
		}
		// Si el pais es ESPANA
	    if (codigoPais == codigoPaisCompania) {
	    	jQuery("#tomador\\.domicilioView\\.localidad").prop( "disabled", true );
	    	jQuery("#tomador\\.domicilioView\\.idProvincia").prop( "disabled", true );
	    	// Si esta marcada una provincia no ESPANOLA
	    	if(null==isLupa || !isLupa){
	    		if (codigoProvincia == '99') {
		    		mostrarCodPostalSPNew(idCodPostal,idLocalidad,idFlechaLocalidades);
		    		marcaProvinciaNew(idComboProvincias,'');	//	Desmarcamos provincia
		    	} else {
		    		mostrarCodPostalSPNew(idCodPostal,idLocalidad,idFlechaLocalidades);    		
		    	}    
	    	}    	
	    } else if (codigoPais != codigoPaisCompania && codigoPais != '') {
	    	jQuery("#tomador\\.domicilioView\\.localidad").prop( "disabled", false );
	    	jQuery("#tomador\\.domicilioView\\.idProvincia").prop( "disabled", true );
	    	marcaProvinciaNew(idComboProvincias, '99');
	    	// Si el pais NO es ESPANA
	    	if(null==isLupa || !isLupa){
	    		if (codigoProvincia != '99' && codigoProvincia !='') {
		    		mostrarCodPostalEXTNew(idCodPostal,idLocalidad,idFlechaLocalidades); 				    		
		    	} else if (codigoProvincia == '' || codigoProvincia.length == 0) {
		    		mostrarCodPostalEXTNew(idCodPostal,idLocalidad,idFlechaLocalidades);
		    	}
	    	}	    	
	    } else if (codigoPais == '') {
			// Si no selecciona ningun pais
			mostrarCodPostalSPNew(idCodPostal,idLocalidad,idFlechaLocalidades);
			marcaProvinciaNew(idComboProvincias, '');
	    }
	}
	
	//	Actualiza los campos de la localizacion cuando se modifica el combo de provincias
	function changeProvinciaLogicNew(idComboPaises, idComboProvincias, idLocalidad, idFlechaLocalidades, idCodPostal){
	    
	    var comboPaises = document.getElementById( idComboPaises );
	    var comboProvincias = document.getElementById( idComboProvincias );

		var codigoISOPais = comboPaises.options[comboPaises.selectedIndex].id;
	    var codigoProvincia = comboProvincias.value;
	
	    if (codigoProvincia == '99') {
	    	
	    	// Si el pais es de la compania
	    	if (codigoISOPais == codigoPaisCompania) {
				marcaPaisISONew(idComboPaises,'');
				mostrarCodPostalEXTNew(idCodPostal, idLocalidad, idFlechaLocalidades);
	    	}
	    } else if (codigoProvincia != '99' && codigoProvincia != '') {
	    	
	    	// Si la provincia es de la compania con pais EXTRANJERO
	    	if(codigoISOPais != codigoPaisCompania) {
	    		marcaPaisISONew(idComboPaises,codigoPaisCompania);
	    	}
 	       	mostrarCodPostalSPNew(idCodPostal, idLocalidad, idFlechaLocalidades);
 	   } else if (codigoProvincia == '') {
 		   	
 		   	// Si no hay elegido ningun pais marcamos el de la compania
 		   	marcaPaisISONew(idComboPaises,codigoPaisCompania);
 		   	mostrarCodPostalSPNew(idCodPostal, idLocalidad, idFlechaLocalidades);
 	   }
	}
	
	// Muestra Codigo Postal Extranjero y actualiza resto de campos
	function mostrarCodPostalEXTNew(idCodPostal, idLocalidad, idFlechaLocalidades){
		var idCodPostalSP = idCodPostal;
		var idCodPostalEXT = idCodPostal + "Ext";
						
		var divCodPostalSP = idCodPostalSP + "Div";
		var divCodPostalEXT = idCodPostalEXT + "Div";
		
		//	Reseteamos y ocultamos codigo postal espanol
		showHide(divCodPostalSP,false);
		showHide(divCodPostalEXT,true);
		
		var codPostalSP = document.getElementById( idCodPostalSP );
		
		//	Reseteamos y mostramos codigo postal extranjero
		var codPostalEXT = document.getElementById( idCodPostalEXT );
	    
		// Si el codigo postal extranjero es 0, es decir no se ha incluido ninguno, lo incializo
	    if (codPostalEXT.value != '') {
	       codPostalEXT.value ='';
	    }
	    
		//	Ocultamos combo de localidades y flecha de localidades
		var localidad = document.getElementById( idLocalidad );
 	    localidad.value = ''; 	 
 	    
 	    if ( document.getElementById( idFlechaLocalidades ) != undefined ) 	    
	    	document.getElementById( idFlechaLocalidades ).style.visibility = "hidden";
	}

	// Muestra Codigo Postal Espanol y actualiza resto de campos
	function mostrarCodPostalSPNew(idCodPostal, idLocalidad, idFlechaLocalidades){
	    var idCodPostalSP = idCodPostal;
		var idCodPostalEXT = idCodPostal + "Ext";
		
		var divCodPostalSP = idCodPostalSP + "Div";
		var divCodPostalEXT = idCodPostalEXT + "Div";
		
		//	Reseteamos y ocultamos codigo postal extranjero
		if ( document.getElementById(divCodPostalEXT) != undefined ) {
			showHide(divCodPostalEXT,false);
			var codPostalEXT = document.getElementById( idCodPostalEXT );
			codPostalEXT.value = '0';
		}
		
		//	Reseteamos y mostramos codigo postal espanol
		var codPostalSP = document.getElementById( idCodPostalSP );
		if ( codPostalSP != undefined ) {
		    // Si el codigo postal espanol es 0, es decir no se ha incluido ninguno, lo incializo
		    if (codPostalSP.value != '') {
		    	codPostalSP.value ='';
		    }
		    
			showHide(divCodPostalSP,true);
		}
	
		//	Ocultamos combo de localidades y flecha de localidades
		var localidad = document.getElementById( idLocalidad );
 	    localidad.value = '';
 	  	
 	  	if ( document.getElementById( idFlechaLocalidades ) != undefined )     
	    	document.getElementById( idFlechaLocalidades ).style.visibility = "visible";
	}
	
	//	Establece el combo Paises al valor con codigo ISO pasado como parametro
	function marcaPaisISONew(idComboPaises,codigoISO){
	    var comboPaises = document.getElementById( idComboPaises );
	    if (codigoISO=='') {
	       comboPaises.selectedIndex = 0;
	       return;
	    }
	
	    for (i=0;i < comboPaises.options.length;i++) {
	       if (comboPaises.options[i].id == codigoISO) {
	          comboPaises.selectedIndex = i;
	          break;
	       }
	    }
	}
	
	//	Establece el combo Provincias al valor con codigo pasado como parametro
	function marcaProvinciaNew(idComboProvincias, codigo) {
		var comboProvincias = document.getElementById( idComboProvincias );
		var provinciasHidden = document.getElementById( idComboProvincias+"_hidden" );
	    if (codigo == '') {
	       comboProvincias.selectedIndex = 0;
	       return;
	    } 
	
	    for (i = 0; i < comboProvincias.options.length; i++) {
	       if (comboProvincias.options[i].value == codigo){
	          comboProvincias.selectedIndex = i;
	          if(null!=provinciasHidden){
	        	  provinciasHidden.value=comboProvincias.options[i].value; 
	          }          
	          break;
	       }
	    }
	}
	
	function updateCodigoPostal(formPrefix) {
		var idCodPostalSP = formPrefix + ".codPostal";
		var idCodPostalEXT = idCodPostalSP + "Ext";	
		var divCodPostalSP = idCodPostalSP + "Div";
		var divCodPostalEXT = idCodPostalEXT + "Div";		
		var idComboPaises = formPrefix + ".idPais";
		var comboPaises = document.getElementById( idComboPaises );
		if(comboPaises!=null){
			var codISOPais = comboPaises.selectedIndex != -1 ? comboPaises.options[comboPaises.selectedIndex].id : null;			
			var imgBusqLocalidad = formPrefix + ".imgBusqLocalidad";
			if (codISOPais == codigoPaisCompania) {
		    	document.getElementById(divCodPostalEXT).style.display = 'none';
		    	document.getElementById(divCodPostalSP).style.display = 'block';
		    	if ( document.getElementById(imgBusqLocalidad) != undefined ){
		    		document.getElementById(imgBusqLocalidad).style.visibility = 'visible';
		    	}
		    } else {
		    	document.getElementById(divCodPostalEXT).style.display = 'block';
		    	document.getElementById(divCodPostalSP).style.display = 'none';
		    	if ( document.getElementById(imgBusqLocalidad) != undefined ){
		    		document.getElementById(imgBusqLocalidad).style.visibility = 'hidden';
		    	}
		    }
		}
	}
		
	function setProvinciaValuesNew(id) {
    	setValue('domicilio.provincia.descripcion', selectProvincia.options[selectProvincia.selectedIndex].text);
   		setValue('domicilio.provincia.codigo', selectProvincia.options[selectProvincia.selectedIndex].id.split('#')[0]);
	}
	
	
    function seleccionaLocalidadPro(idCodPostal,descLocalidad,idProvincia,pag,idCodPostalExt) {
       
    	var codPostal = '';
    	if(idCodPostal != null){
    		codPostal = document.getElementById(idCodPostal).value;
    	}
       var codPostalExt = '';
       if (document.getElementById(idCodPostalExt) != null) {
           codPostalExt = document.getElementById(idCodPostalExt).value;
       }
       var localidad = document.getElementById(descLocalidad).value;    
       var provincia = document.getElementById(idProvincia).value; 
       if (codPostal=='0') codPostal = '';   
       if (codPostalExt=='0') codPostalExt = '';   
       if (codPostal!='') pag += '?codPostal=' + codPostal;
          else if (codPostalExt!='') pag += '?codPostal=' + codPostalExt;
              else pag += "?"
       pag += '&descripcion=' + localidad;
       pag += '&provincia=' + provincia;
    
       var valor = lanzarVentana(pag,600,500);
     
       if (valor != undefined) {
      
    	  if(idCodPostal != null){
    		  setValue(idCodPostal,valor[0]);
    	  }
          setValue(descLocalidad,valor[1]);
          //setValue(idLocalidad,valor[3]);
          setValue(idProvincia, valor[2]);
        
          changePaisPro(true);
       }
  }

	function changePaisPro(flag){
		if(flag){
			if(document.getElementById('tomador.domicilioView.idPais')!=undefined){
				var valuePais = obtenerValueComboMedianteId('tomador.domicilioView.idPais', codigoPaisCompania);
				setValue('tomador.domicilioView.idPais',valuePais);
			
			}else if(document.getElementById('tomador.domicilioCobroView.idPais')!=undefined){
				var valuePais = obtenerValueComboMedianteId('tomador.domicilioCobroView.idPais', codigoPaisCompania);
				setValue('tomador.domicilioCobroView.idPais',valuePais);
			
			}else if(document.getElementById('tomador.domicilioDocumView.idPais')!=undefined){
				var valuePais = obtenerValueComboMedianteId('tomador.domicilioCobroView.idPais', codigoPaisCompania);
				setValue('tomador.domicilioCobroView.idPais',valuePais);
			
			}
		}
	}
	
	function buscarLocalidadSeleccionadaPro(valor){
		if (valor.length>0) {
			seleccionaLocalidadPro('<html:rewrite page="/localidad/lista/buscarLocalidades.do"/>');
		}
	}
      		
   function seleccionarProvinciaPro(destino, origen, control, destinoDatos, datoLocalidad) {
	   var varPais = control;
	   
	   if(varPais==null || varPais == '' ){
	   		varPais = codigoPaisCompania;
	   }
	
	   if (varPais == codigoPaisCompania) {

		   // Pais Compania -> Busqueda la provincia
		   codProvincia = parseInt(document.forms[0].elements[origen].value.substring(0,2),10);
	
		   for (i = 0; i < document.forms[0].elements[destino].length; i++) {
			   var codigo = document.forms[0].elements[destino].options[i].id.split('#')[0];
	     
			   // si los dos primeros caracteres del codpostal coinciden con el codigo de la provincia         
			   if (parseInt(codigo, 10) == codProvincia) {
				   document.forms[0].elements[destino].value = document.forms[0].elements[destino].options[i].value;
				   break;
			   }
		   }
		   
		   document.forms[0].elements[destinoDatos].value = document.forms[0].elements[destino].value;
	   	}
   }
   
   function seleccionarProvinciaProduccion(destino, origen, control, destinoDatos, datoLocalidad) {
	   if(control == null || control == '' ){
		   control = codigoPaisCompania;
		}
		
		if (control == codigoPaisCompania || control.value == codigoPaisCompania) {
			
			// Pais ESPANA -> Busqueda la provincia
			codProvincia = parseInt(document.getElementById(origen).value.substring(0,2),10);
		
			for (i = 0; i < document.getElementById(destino).length; i++) {
		
				var codigo = document.getElementById(destino).options[i].id.split('#')[0];
		
				// si los dos primeros caracteres del codpostal coinciden con el codigo de la provincia         
				if (parseInt(codigo, 10) == codProvincia) {
					document.getElementById(destino).value = document.getElementById(destino).options[i].value;
					break;
				}
			}
		
			document.getElementById(destinoDatos).value = document.getElementById(destino).value;

		} else {
			// Pais EXTRANJERO
			document.getElementById(destino).value = 99;
			document.getElementById(destinoDatos).value = 99;
		}
	}
   
   function changePaisLogicPro(pais, provincia){
	   // se invoca a la funcion con el formulario 
	   changePaisLogicFormPro(pais, provincia, document.forms[0]);
   }
    
   function changePaisLogicFormPro(pais, provincia, form){
	   selectProvincia = form.elements[provincia];
		
	   codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].id;
	  	
	  	if (codigoProvincia == undefined) codigoProvincia ='';
	  	codigoPais = pais.options[pais.selectedIndex].id;
	  	//para marcar el valor inicial no obtenido desde la BD
	    //si el pais es ESPA?A 
	    
	    if (codigoPais == codigoPaisCompania){
			//si esta marcada una provincia no ESPA?OLA
			if (codigoProvincia == '99'){
	       		marcaProvinciaPro('', provincia, form);			
			}       
	    }else if (codigoPais != codigoPaisCompania && codigoPais !=''){
	       //si el pais NO es ESPA?A
	         if (codigoProvincia != '99' && codigoProvincia !=''){
	       		marcaProvinciaPro('99', provincia, form);			
			 }else if(codigoProvincia ==''){
	       		marcaProvinciaPro('99', provincia, form);	
			 }

	    }else if (codigoPais == ''){
	    	//si no selecciona ning?n pais
	        marcaProvinciaPro('', provincia, form);        
	    }
   }
    
   function marcaProvinciaPro(codigo, provincia, form){    	
		selectProvincia = form.elements[provincia];
		if (codigo==''){
			selectProvincia.selectedIndex = 0;
			return;
		}	
		
		for(i=0;i < selectProvincia.options.length;i++){   		
			if (selectProvincia.options[i].id == codigo){
			    selectProvincia.selectedIndex = i;
				break;
			}
		}
   }   
  
   function vaciarCodPostalLocalidad(provincia){
  
	   var  doc1 = provincia.indexOf('domicilioView',0);    
	   var  docCob = provincia.indexOf('domicilioCobroView',0);          
	   var  docDocum = provincia.indexOf('domicilioDocumView',0);
    
	   if(doc1 != -1){
		   if(document.getElementById('tomador.domicilioView.localidad')!=undefined){
			   document.getElementById('tomador.domicilioView.localidad').value = '';
		   }

		   if(document.getElementById('tomador.domicilioView.codPostal')!=undefined){
			   document.getElementById('tomador.domicilioView.codPostal').value = '';
		   }  		
	  
	   }else if(docCob != -1){
		   if(document.getElementById('tomador.domicilioCobroView.localidad')!=undefined){
			   document.getElementById('tomador.domicilioCobroView.localidad').value = '';
		   } 		

		   if(document.getElementById('tomador.domicilioCobroView.codPostal')!=undefined){
			   document.getElementById('tomador.domicilioCobroView.codPostal').value = '';
		   }  		

	   }if(docDocum != -1){
		   if(document.getElementById('tomador.domicilioDocumView.localidad')!=undefined){
			   document.getElementById('tomador.domicilioDocumView.localidad').value = '';
		   }

		   if(document.getElementById('tomador.domicilioDocumView.codPostal')!=undefined){
			   document.getElementById('tomador.domicilioDocumView.codPostal').value = '';
		   }   		
	   }
   }   
   
   function changeProvinciaLogicPro(pais,provincia){

	   selectPais = document.forms[0].elements[pais];
	   selectProvincia = document.forms[0].elements[provincia];
   
	   codigoISO = selectPais.options[selectPais.selectedIndex].id;
	   codigoProvincia = selectProvincia.options[selectProvincia.selectedIndex].id.split('#')[0];
   
	   if (codigoProvincia == '99') {
	
		   // Si el pais es ESPANA
		   if (codigoISO == 'ES') {       
			   marcaPaisISOPro('',pais);
		   }
	   
	   } else if (codigoProvincia != '99' && codigoProvincia != '') {
		   
		   // Si la provincia es ESPANOLA con pais EXTRANJERO
		   if(codigoISO != 'ES') {      	
			   //marcamos ESPANA como pais
			   marcaPaisISOPro('ES',pais);
		   }
		   vaciarCodPostalLocalidad(provincia);
	   
	   } else if (codigoProvincia == '') {   		
		   // Si no hay elegido ningun pais
		   // marcamos ESPANA como pais
		   marcaPaisISOPro('ES',pais);
		   vaciarCodPostalLocalidad(provincia);
	   }
   }
	
   function marcaPaisISOPro(codigoISO,pais){
	   selectPais = document.forms[0].elements[pais];   
	   if (codigoISO=='') {
		   selectPais.selectedIndex = 0;
		   return;
	   }
	
	   for (i=0;i < selectPais.options.length;i++) {
		   if (selectPais.options[i].id == codigoISO) {
			   selectPais.selectedIndex = i;
			   break;
		   }
	   }
   }
/**	FIN Gestion pais, provincia, poblacion y codigo postal */
 
/*     ***    CONTROL DE VALIDACIONES PARA EL RIESGO DE LA POLIA     ****  **   */
   function showFormaPagoRiesgo(value){

	   if(value!=null && value!=undefined){
	
		   if(value==2){			
			   showHide(document.getElementById('td1IdFormaPagoRiesgo'),true);							
			   showHide(document.getElementById('td2IdFormaPagoRiesgo'),true);
		   
		   }else{
			   showHide(document.getElementById('td1IdFormaPagoRiesgo'),false);							
			   showHide(document.getElementById('td2IdFormaPagoRiesgo'),false);
		   }
	   }	
   }

   function showMedioCobroRiesgo(value){	

	   if(value!=null && value!=undefined){
			if(value==2){		//	Riesgo		
				showHide(document.getElementById('td1IdMedioCobroRiesgo'),true);							
				showHide(document.getElementById('td2IdMedioCobroRiesgo'),true);
			
			}else if (value == 1){		//	Poliza
				//	Si la emision de recibo es a nivel de riesgo y 
				//	el medio de cobro es Domiciliacion Bancaria
				if ((document.getElementById('poliza.idNivelEmisionRecibo').value == 2)	//	Nivel Emision Recibo = Riesgo 	
				     && (document.getElementById('poliza.datosGestion.idMedioCobro').value == 1) ){	//	Medicio de cobro = 	Domiciliacion Bancaria
				      
					showHide(document.getElementById('td1IdMedioCobroRiesgo'),true);							
					showHide(document.getElementById('td2IdMedioCobroRiesgo'),true);
					if(document.getElementById('riesgoBean.datosGestion.idMedioCobro')!= undefined || 
							document.getElementById('riesgoBean.datosGestion.idMedioCobro')!=null){
						document.getElementById('riesgoBean.datosGestion.idMedioCobro').value = '1';
					}		
				} else {
					showHide(document.getElementById('td1IdMedioCobroRiesgo'),false);							
					showHide(document.getElementById('td2IdMedioCobroRiesgo'),false);
					if(document.getElementById('riesgoBean.datosGestion.idMedioCobro')!= undefined || 
							document.getElementById('riesgoBean.datosGestion.idMedioCobro')!=null){
						document.getElementById('riesgoBean.datosGestion.idMedioCobro').value = '';
					}				
				}
			}
	   }	
   }

   function handlerBlockPoliza(pObj, pBol)  {
	  
	   pBol = (pBol != null) ? pBol : (document.getElementById('tit'+pObj).title.substr(0,3) == "Exp")? true : false;;
	   var literal = (pBol)? textoContraer : textoExpandir;
	   
	   document.getElementById('img'+pObj).title = literal;
	   document.getElementById('tit'+pObj).title = literal;
	   showHide(pObj, pBol);
	   
	   var imgSrc = (literal == textoContraer)? rutaImg + "botContraer.png" : rutaImg + "botExpandir.png";
	   changeIcon('img' + pObj, imgSrc );
   }



   function masInfoTomador(action){
	   if(document.getElementById('tomador.idTipoIdent')!=undefined){
		   action = action + '?identificadorPersona=' + document.getElementById('tomador.idTipoIdent').value;
	   }else{
		   action = action + '?identificadorPersona=2';
	   }
	   lanzarVentana(action,1000,300);
   }

   function parametersMediador(mediador) {
	   return '&codigo=' + getValue('poliza.datosGestion.mediadorGestor.codMediador') + '&tipoUniOrg=' + mediador;
   }
   
   function localizarRiesgo(action,action2,tipoRiesgo) {
 
 	   var retorno;
   	   retorno = lanzarVentana(action,720,450);
   	   if(retorno){   	  
   		   getPage(action2+"?tipoRgoForward="+tipoRiesgo);
   	   }
   }
   
   //Ventana de busqueda de riesgos por criterio
   function abrirVentanaBusquedaRiesgoPorCriterio(action, action2, tipoRiesgo) {
         
          var retorno;
          retorno = lanzarVentana(action,720,450);
          if(retorno){         
              top.window.frames['iAreaTrabajo'].document.location = action2+"?tipoRgoForward="+tipoRiesgo;
          }
   }
	
   //	Seccion Otros Datos
   function updateNumSuplExterno(flag){
	   var readonly;
	   if ( flag == "1" ) {
		   // Negocio directo
		   readonly = true;
	   
	   } else {
		   // Coaseguro y Reaseguro
		   readonly = false;
	   }

	   document.getElementById("poliza.numSuplExterno").readOnly = readonly;	
	}
	
	// Muestra las partes correspondientes al coaseguro o al reaseguro
	function showTipoNegocio(value){	 				
		if(value==tipoNegocioCoa){
		  	//Coaseg  	
		  	showHide(document.getElementById('idDivCoaseguro'),true);
		  	showHide(document.getElementById('idDivReaseguro'),false);
			jQuery('#poliza.otrosDatos.swCoaseguroCedido').val(0);
			jQuery('#poliza.otrosDatos.cuadroCoaseguroCedido').val('');
			if(jQuery('#poliza.otrosDatos.swReaseguroFacultativo')){
				jQuery('#poliza.otrosDatos.swReaseguroFacultativo').val(0);
			}
			if(jQuery('#poliza.otrosDatos.cuadroFacultativo')){
				jQuery('#poliza.otrosDatos.cuadroFacultativo').val('');
			}
		  	disableCoaseguroCedido(true);
		  	disableFacultativo(true);
		  	showCoasCedido(0);	  
			jQuery('#poliza.otrosDatos.cuadroReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.polizaReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.suplementoReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.reciboReaseguroCedente').val('');
		
		}else if(value==tipoNegocioRea){
		  	//Reaseg
		  	showHide(document.getElementById('idDivCoaseguro'),false);
		  	showHide(document.getElementById('idDivReaseguro'),true);
			jQuery('#poliza.otrosDatos.swCoaseguroCedido').val(0);
		  	jQuery('#poliza.otrosDatos.cuadroCoaseguroCedido').val('');
		  	if(jQuery('#poliza.otrosDatos.swReaseguroFacultativo')){
		  		jQuery('#poliza.otrosDatos.swReaseguroFacultativo').val(0);
		  	}
			jQuery('#poliza.otrosDatos.cuadroFacultativo').val('');
		  	disableCoaseguroCedido(true);
		  	disableFacultativo(true);
		  	showCoasCedido(0);		  
			jQuery('#poliza.otrosDatos.cuadroCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.polizaCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.suplementoCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.reciboCoaseguroCedente').val('');

		}else if(value != tipoNegocioCoa && value != tipoNegocioRea){
		  	showHide(document.getElementById('idDivCoaseguro'),false);
		  	showHide(document.getElementById('idDivReaseguro'),false);
		  	showCoasCedido(1);
		  	disableCoaseguroCedido(false);
		  	disableFacultativo(false);
			jQuery('#poliza.otrosDatos.cuadroCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.polizaCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.suplementoCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.reciboCoaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.cuadroReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.polizaReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.suplementoReaseguroCedente').val('');
			jQuery('#poliza.otrosDatos.reciboReaseguroCedente').val('');
		}	  
	}
	  
	// Controla el numero de cuadro segun el sw de coaseguro cedido
	function showCoasCedido(value){	
		if(value==0){	 
	  		showHide(document.getElementById('idNumCuadroLit'),false);
		  	showHide(document.getElementById('idNumCuadroInput'),false);
		} else if(value==1){
		  	//Reaseg
		  	if ( document.getElementById('poliza.otrosDatos.swCoaseguroCedido') != undefined && document.getElementById('poliza.otrosDatos.swCoaseguroCedido').value == 1 ) {
			  	showHide(document.getElementById('idNumCuadroLit'),true);
			  	showHide(document.getElementById('idNumCuadroInput'),true);
			}		  		  
		}	  
	}
	
	//	Controla el numero de cuadro segun el sw de reaseguro facultativo
	function showFacultativo(value){	
		if(value==0){	 
	  		showHide(document.getElementById('idNumFacultativoLit'),false);
		  	showHide(document.getElementById('idNumFacultativoInput'),false);
		} else if(value==1){
		  	//Reaseg
		  	if ( document.getElementById('poliza.otrosDatos.swReaseguroFacultativo') != undefined && document.getElementById('poliza.otrosDatos.swReaseguroFacultativo').value == 1 ) {
			  	showHide(document.getElementById('idNumFacultativoLit'),true);
			  	showHide(document.getElementById('idNumFacultativoInput'),true);
			}		  		  
		}	  
	}
	
	//	Inhabilita y resetea los campos relativos a Coaseguro Cedido  
	function disableCoaseguroCedido(flag) {
		if ( document.getElementById('poliza.otrosDatos.swCoaseguroCedido') != undefined ) {
			// document.getElementById('poliza.otrosDatos.swCoaseguroCedido').value = 0;
			document.getElementById('poliza.otrosDatos.swCoaseguroCedido').disabled = flag;
		}		
		if ( document.getElementById('poliza.otrosDatos.cuadroCoaseguroCedido') != undefined ) {	
			document.getElementById('poliza.otrosDatos.cuadroCoaseguroCedido').disabled = flag;
			// document.getElementById('poliza.otrosDatos.cuadroCoaseguroCedido').value = "";
		}
	}
	
	//	Inhabilita y resetea los campos relativos a Facultativo  
	function disableFacultativo(flag) {
		if ( document.getElementById('poliza.otrosDatos.swReaseguroFacultativo') != undefined ) {
			document.getElementById('poliza.otrosDatos.swReaseguroFacultativo').disabled = flag;
		}		
		if ( document.getElementById('poliza.otrosDatos.cuadroFacultativo') != undefined ) {	
			document.getElementById('poliza.otrosDatos.cuadroFacultativo').disabled = flag;
		}
	}
	
	//	Abre popup cuadro coaseguro cedido
	function lanzarVentanaCoaseguroAceptado(action,numCuadro,fechaEfectoMvto,modo,ancho,alto) {
		
		var numCuadroValue = document.getElementById(numCuadro).value;

		modo = "EDITABLE";
		
		var parametros = "?";
		parametros += "numCuadro=" + numCuadroValue + "&";			//	Numero de cuadro
		parametros += "fechaEfectoMvto=" + fechaEfectoMvto + "&";	//	Fecha de efecto de movimiento
		parametros += "modo=" + modo;								//	Modo

		var url = action + "" + parametros;
		
		var valores = lanzarVentanaOpenScroll(url,ancho, alto);
		
		if ( valores != undefined ) {
			setValue(numCuadro,valores[0]);
		}
	}

	//	Abre popup cuadro reaseguro aceptado
	function lanzarVentanaReaseguroAceptado(action,numCuadro,fechaEfectoMvto,modo,ancho,alto) {
		
		var numCuadroValue = document.getElementById(numCuadro).value;
		
		modo = "EDITABLE";
		
		var parametros = "?";
		parametros += "numCuadro=" + numCuadroValue + "&";			//	Numero de cuadro
		parametros += "fechaEfectoMvto=" + fechaEfectoMvto + "&";	//	Fecha de efecto de movimiento
		parametros += "modo=" + modo;								//	Modo

		var url = action + "" + parametros;
		
		var valores = lanzarVentanaOpenScroll(url,ancho, alto);
		
		if ( valores != undefined ) {
			setValue(numCuadro,valores[0]);
		}
	}

	//	Abre popup cuadro coaseguro cedido
	function lanzarVentanaCoaseguroCedido(action,numCuadro,fechaEfectoMvto,modo,ancho,alto) {
		
		var numCuadroValue = document.getElementById(numCuadro).value;
		
		modo = "EDITABLE";
		
		var parametros = "?";
		parametros += "numCuadro=" + numCuadroValue + "&";			//	Numero de cuadro
		parametros += "fechaEfectoMvto=" + fechaEfectoMvto + "&";	//	Fecha de efecto de movimiento
		parametros += "modo=" + modo;								//	Modo

		var url = action + "" + parametros;
		
		var valores = lanzarVentanaOpenScroll(url,ancho, alto);
		
		if ( valores != undefined ) {
			setValue(numCuadro,valores[0]);
		}
	}
	
	//	Abre popup cuadro facultativo
	function lanzarVentanaFacultativo(action,numFacultativo,fechaEfectoMvto,modo,ancho,alto) {
		
		modo = "EDITABLE";
		
		var parametros = "?";
		parametros += "numFacultativo=" + numFacultativo + "&";		//	Numero de cuadro
		parametros += "fechaEfectoMvto=" + fechaEfectoMvto + "&";	//	Fecha de efecto de movimiento
		parametros += "modo=" + modo;								//	Modo

		var url = action + "" + parametros;
		
		var valores = lanzarVentanaOpenScroll(url,ancho, alto);
		if ( valores != undefined ) {
			setValue(numFacultativo,valores[1]);
		}
			
	}
	
	//	Seccion Relaciones
	function lupaPersonaRelacionada(forward){
			
		var tipo;
		var tipoIdentificador = document.getElementById('poliza.personaRelacionada.idTipoIdent').value;
		if( tipoIdentificador == 1){
			tipo = 2;
		}else{
			tipo = 1;
		}
				
    	pag= forward;
    	pag= pag + "?tipoPersona=" + tipo;
    	pag= pag + "&tipoIdentificador="+tipoIdentificador;
    	
    	var valor = lanzarVentana(pag,600,400);
    	
    	if(valor!=undefined){
    		setValue('poliza.personaRelacionada.idPersona',valor[0]);
    		setValue('poliza.personaRelacionada.docIdPersona',valor[1]);
    		setValue('poliza.personaRelacionada.nombre',valor[2]);
    		
    		//actionTomador -> inicializado para llevar a reloadPersona.
    		retrieveURLPorPost(actionPersonaRelacionada,document.forms(0).name,false);

    		//	Ponemos a readonly
    		readonlyDatosPersonaRelacionada();  		
    	}	
	}	

	function compruebaNumPolizaRepetidos(form, window){
		var listaCodigos = document.getElementById("codigo");
		var elements = form.elements;		
		
		var codigosTmp = new Array();				
		var codigosRepetidos = false;
		
		for (i=0; i<elements.length && !codigosRepetidos; i++){
			if ( elements[i].type == 'text' && 
				(elements[i].name.indexOf('.codPoliza') != -1) && 
				 elements[i].value != "" ) {				 
				
				if ( !estaEn(codigosTmp,elements[i].value) ){ 
					codigosTmp.push(elements[i].value);
				} else {
					codigosRepetidos = true;
				}
			}
		}		
		
		if ( codigosRepetidos ) {
			alert("Error. Ha insertado n?meros de p?liza repetidos.");
		} else {
			submitForm(form,null,null);
		}		
	}
	
	function disabledDatosPersonaRelacionada(flag){
		document.getElementById("imgBusqPersonaRelacionada").disabled = flag;	
		if (!flag) {
			document.getElementById("poliza.personaRelacionada.docIdPersona").value = "";
			document.getElementById("poliza.personaRelacionada.idPersona").value = "";
			document.getElementById("poliza.personaRelacionada.nombre").value = "";
		}
			
		document.getElementById("poliza.personaRelacionada.docIdPersona").disabled = flag;
   		document.getElementById("poliza.personaRelacionada.idTipoIdent").disabled = flag;
	}
	
	function cleanDatosPersonaRelacionada(){
		disabledDatosPersonaRelacionada(false);	
	}	
	
	function readonlyDatosPersonaRelacionada(){
		disabledDatosPersonaRelacionada(true);
	}
		
	function estaEn(array,value){
		for (i=0; i < array.length; i++){
			if ( array[i] == value) {
				return true;
			}
		}	
		return false;
	}
	
	function borraRelacionPoliza(field, reemplazo){

		if ((document.getElementById(field) != null) && (document.getElementById(field).options.length > 2)){
			var encontrado = false;
			for (i=1; i<=document.getElementById(field).options.length; i++) {
		        var codigo = document.getElementById(field).options[i].text;
		        if(codigo == reemplazo){
		        	document.getElementById(field).options[i] = null;
		        }
			}
		}
	}
	
	/*
	*	Funcion encargada de bloquear los datos de los mediadores
	*	formulario --> formulario que contiene los campos a bloquear
	*/
	function bloqueoDatosMediadores(formulario){
		obj = new Object(formulario);

		//campos mediador
		if(obj['mediador.codMediador'])obj['mediador.codMediador'].disabled=true;
		if(obj['mediador.descMediador'])obj['mediador.descMediador'].disabled=true;
		if(obj['mediador.idRelacionMediador'])obj['mediador.idRelacionMediador'].disabled=true;
		if(obj['mediador.porcParticComisPrimer'])obj['mediador.porcParticComisPrimer'].disabled=true;
		if(obj['mediador.porcParticComisSuc'])obj['mediador.porcParticComisSuc'].disabled=true;
		if(document.getElementById('imgLupaMediador'))document.getElementById('imgLupaMediador').disabled=true;
		
		var imgs = document.getElementsByTagName("img");
		arrayLinks = new Array(document.links.length);
		
		for(var i=0;i<document.links.length;i++){
			if(!isObjInArray(linksEnabled, document.links[i].id)){ 
				arrayLinks[i]=document.links[i].onclick;
				document.links[i].onclick="";
			}
		}
		
		//botones jsp
		if(obj['botonAnadir'])obj['botonAnadir'].disabled=true;
		if(obj['botonModificar'])obj['botonModificar'].disabled=true;
		if(obj['botonEliminar'])obj['botonEliminar'].disabled=true;
		if(obj['botonLimpiar'])obj['botonLimpiar'].disabled=true;	
		if(obj['botonAceptar'])obj['botonAceptar'].disabled=true;
	}
	
	function calculaPesoPotencia(){
		var taraVar = document.getElementById('riesgoBean.riesgoPredef.tara').value;
		var potcvVar = document.getElementById('riesgoBean.riesgoPredef.potcv').value;
		
		if((taraVar != null && taraVar != '') && (potcvVar != null && potcvVar != '')){
			taraVar = undoNumber(taraVar);
			potcvVar = undoNumber(potcvVar);
			if(taraVar == 0 || potcvVar == 0){
				if(document.getElementById('riesgoBean.riesgoPredef.pesopot'))
					setValue('riesgoBean.riesgoPredef.pesopot','');
			}else{
				if(document.getElementById('riesgoBean.riesgoPredef.pesopot')){
					setValue('riesgoBean.riesgoPredef.pesopot',formateoDecimales(doNumber(taraVar/potcvVar),',',2,'.',10));
				}
			}	
		}else{
			if(document.getElementById('riesgoBean.riesgoPredef.pesopot'))
				setValue('riesgoBean.riesgoPredef.pesopot','');
		}
	}
	
	/* Funcion para recoger un elemento de un array */
	function setValueLst(element, value) {
		 if(value != null){
			 for(var i=0; i<value.length;i++){
				 //if(document.getElementById(element) != undefined && document.getElementById(element) != null){
					 document.getElementById(element).value = value[i];
				 //}
			 }   	
		 }
		 else
		 {
			 document.getElementById(element).value="";
		 }
			 
	 }

	 /* Funcion para recoger un elemento de un array */
	 function setLstValueLst(element, value) {
		 if(value != null && element != undefined){
			 for(var i=0; i<value.length;i++){
				 if(element[i] != undefined && element[i] != null){
				 	element[i].value = value[i];
				 }
			 }   	
		 }
	 }
	 
	 function bloquearCamposPersonas(form,personaInformada){
		 var campos = form.elements;
		 
		 for(var i= 0;i<campos.length; i++){
			 if((campos[i].name).indexOf('idPersona') != -1) {
				 if(campos[i].value != null && campos[i].value != '' || (null!=personaInformada && !personaInformada)){
					 // Se obtiene la subclave del formulario para bloquear.
					 var pos2 = (campos[i].name).indexOf('.idPersona');
					 var pos = (campos[i].name).indexOf('Persona.') + 8;					
					 var subClave = (campos[i].name).substring(pos,pos2);
					 if (personaInformada == 'tomador') {
						 disableDatosPersona(true, subClave, personaInformada);
					 } else {
						 disableDatosPersona(true, subClave);
					 }
				 }
			 }
		 }
		 if(jQuery('select[name*='+aseguradoJuridico+']')){
			 jQuery('select[name*='+aseguradoJuridico+']').attr("disabled","disabled");
		 }		 
	 }
	 
	 function bloquearRolesRiesgos(form){
		 bloquearCamposPersonas(form,false);
	 }
	 
	 function cargaMapaCamposPrecargados(form){
		 var campos = form.elements;		 
		 for(var i= 0;i<campos.length; i++){
			 if((campos[i].name).indexOf('idPersona') != -1) {
				 if(campos[i].value != null && campos[i].value != ''){
					 // Se obtiene la subclave del formulario para bloquear.
					 var pos2 = (campos[i].name).indexOf('.idPersona');
					 var pos = (campos[i].name).indexOf('Persona.') + 8;
					
					 var subClave = (campos[i].name).substring(pos,pos2);
					 agregaAtributoPrecarga(subClave);
				 }
			 }
		 }
	}

	function disableDatosPersonales(flag, formPrefix){
		var docIdent=document.getElementById(formPrefix + '.docIdent');
		var btnLimpiar=document.getElementById(formPrefix + '.btLimpiar');
		bloqueoCampoConDatos(flag, formPrefix + '.docIdent',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.idTipoIdent',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.nombre',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.apel1',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.apel2',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.razonSocial',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.idIdioma',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.idSexo',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.fecNacimiento',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.fecNacimiento.imgCal',formPrefix);		

		if(docIdent!=undefined && null!=btnLimpiar){
			if(docIdent.value!="" ){
				btnLimpiar.disabled = false;
			}else{
				btnLimpiar.disabled = true;			
			}
		}
	}
	
	function disableDomicilioPersonal(flag, formPrefix, subClave){
		disableDomicilio(flag, formPrefix + '.domicilioView',subClave);
	}
	
	function disableDomicilio(flag, formPrefix, subClave){
		
		bloqueoCampoConDatos(flag, formPrefix + '.id',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.via',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.numVia',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.bloque',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.piso',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.puerta',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.idPais',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.codPostal',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.codPostalExt',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.localidad',subClave);
		bloqueoCampoConDatos(flag, formPrefix + '.idProvincia',subClave);
		
		
		if(document.getElementById(formPrefix + '.via')!=undefined){
			bloqueoCampoConDatos(flag, formPrefix + '.idTipoVia',subClave);
		}
	}
	 
	function disableDatosAdicionales(flag, formPrefix){
		bloqueoCampoConDatos(flag, formPrefix + '.tlfn1',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.tlfn2',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.tlfn3',formPrefix)
		bloqueoCampoConDatos(flag, formPrefix + '.email',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.fax',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.url',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.observaciones',formPrefix);
	}

	function disableDatosPersonaAdic(flag, formPrefix){
		bloqueoCampoConDatos(flag, formPrefix + '.fecNacimiento',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.idEstadoCivil',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.numHijos',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix+'.fecIniCarnet',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix+'.fecFinCarnet',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix+'.idCategoriaCarnet',formPrefix);
	}

	function disableDatosBancarios(flag, formPrefix){
		bloqueoCampoConDatos(flag, formPrefix + '.codIban',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.codBanco',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.codSucursal',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.ctaDigito',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.ctaBanco',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.idCtaBanco',formPrefix);
		
		if((document.getElementById('tomador.codIban')!=undefined && document.getElementById('tomador.codIban').value!='') ||
			(document.getElementById('tomador.codBanco')!=undefined && document.getElementById('tomador.codBanco').value!='' &&
		 	 document.getElementById('tomador.codSucursal')!=undefined && document.getElementById('tomador.codSucursal').value!='' &&
		 	 document.getElementById('tomador.ctaDigito')!=undefined && document.getElementById('tomador.ctaDigito').value!='' &&
		 	 document.getElementById('tomador.ctaBanco')!=undefined && document.getElementById('tomador.ctaBanco').value!='')){
			 
			bloqueoCampoConDatos(flag, formPrefix + '.tipoDatoBancario',formPrefix);
		}else{
			if(document.getElementById(formPrefix + '.tipoDatoBancario')!=undefined){
				document.getElementById(formPrefix + '.tipoDatoBancario').disabled = false;
			}	
		}
	}
	
	function disableDatosTja(flag, formPrefix){
		bloqueoCampoConDatos(flag, formPrefix + '.idTipoTarjeta',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.codTarjeta',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.mesTarjeta',formPrefix);
		bloqueoCampoConDatos(flag, formPrefix + '.annoTarjeta',formPrefix);
	}

	function bloqueoCampoConDatos(flag, idObjeto, subClave){
	
		var elementoHTML=document.getElementById(idObjeto);
		
		if(elementoHTML!=undefined){
			
			var precargado=null;
			
			// Si el mapa de precargados tiene entradas
			if(mapaPrecargados!= undefined && mapaPrecargados!=null && subClave != null){
				
				var arrayClave= subClave != null ? subClave.split("\.") : new Array();
				
				var codigoRol="";
				//Caso roles
				if(arrayClave.length>1) codigoRol=arrayClave[2];
				// Caso tomador
				else codigoRol=arrayClave[0];
				
				var mapaPrecargadosRol=mapaPrecargados[codigoRol];
				
				if(mapaPrecargadosRol!=null){
					// Recuperamos la entrada del campo en cuestión
					precargado=mapaPrecargadosRol[elementoHTML.getAttribute("name")];
				}
			}

			if(precargado==null){
				if(elementoHTML.value!=""){
					elementoHTML.disabled = flag;
				}else{
					elementoHTML.disabled = false;		
				}		
			}else{
				if(elementoHTML.value!="" && precargado!= undefined && precargado){
					elementoHTML.disabled = true;
				}else{
					elementoHTML.disabled = false;		
				}			
			}		
			
		}
	}
	
    function masInfoTomadorNuevaProd(action){
        if(document.getElementById('tomador.idTipoIdent')!=undefined){
  			action = action + '?identificadorPersona=' + document.getElementById('tomador.idTipoIdent').value+'&idPersona='+document.getElementById('idPersona').value;
  		}else{
  			action = action + '?identificadorPersona=2'+'&idPersona='+document.getElementById('idPersona').value;
  		}
  		
  		prelanzarVentana(action,1000,300);
  	}
    
    function prelanzarVentana(pag,width, height, parametros){
        if(valorConsulta == false){
     		lanzarVentana(pag+"&readonly=",width,height,parametros);
     	}else{
     		lanzarVentana(pag+"&readonly=1",width,height,parametros);
     	}
     }
    
	function setLocalidadMandato(){
		if(!document.getElementById("tomador.mandato.idLocalidad").value){
			seleccionaLocalidadIdLocIdProv('tomador.mandato.idCodPostal','tomador.mandato.descLocalidad','tomador.mandato.idLocalidad','tomador.mandato.idProvincia',actionLocalidadMandato,null);
		}
	}
	
	function changeLocalidadMandato(){
		document.getElementById("tomador.mandato.idLocalidad").value =  "";
		document.getElementById("tomador.mandato.idCodPostal").value =  "";
		document.getElementById("tomador.mandato.idProvincia").value =  "";
		setLocalidadMandato();
	}


/**
 * Se encarga de evaluar todos los botones "Recoger Datos Tomador" y determinar si 
 * deben estas activados o desactivados
 *
 * @param idTipoIdentTomador Id del tipo de identificador del tomador de la poliza/cotizacion
 * @param idenCIF Dato maestro que se refiere al id del tipo de identificacion <b>CIF</b>
 */
function disabledEnabledBtnRecogerTomador(idTipoIdentTomador,idenCIF){
	var botonesRecogerDatosTomador=jQuery('input[name="recogeDatosTomador"]').get();
	for (var i = 0, length = botonesRecogerDatosTomador.length; i < length; i++) {
		var idBotonRecogerDatosTomador = botonesRecogerDatosTomador[i].id;
		if(idBotonRecogerDatosTomador.indexOf(aseguradoJuridico) != -1){
			if(idTipoIdentTomador == idenCIF){
				disabled=false;
			}else{
				disabled=true;
			}
		}else if(idBotonRecogerDatosTomador.indexOf(aseguradoFisico) != -1 || 
				idBotonRecogerDatosTomador.indexOf(conductorHabitual) != -1 ||
				idBotonRecogerDatosTomador.indexOf(conductorOcasional) != -1){
			if(idTipoIdentTomador != idenCIF){
				disabled=false;
			}else{
				disabled=true;
			}
			// beneficiario, asegurado y propietario
		}else{
			disabled=false;		
		}
		document.getElementById(idBotonRecogerDatosTomador).disabled=disabled;
	}
}

function cleanDatosDomicilioTomador(){
	if (mapaPrecargados != null)mapaPrecargados['tomador']=null;
	if(document.getElementById('btLimpiarDomicCobro').value == 'Desbloquear'){
		document.getElementById('btLimpiarDomicCobro').value = 'Limpiar';
		disableCamposNoModif(false);
		disableDomicilioTomador(false);
		changePaisLogicNew('tomador.domicilioView.idPais','tomador.domicilioView.idProvincia','tomador.domicilioView.localidad','tomador.domicilioView.imgBusqLocalidad','tomador.domicilioView.codPostal','tomador.domicilioView.codigoPais',true);
		if (jQuery("#tomador\\.swDomicilioCobro")) {
			jQuery("#tomador\\.swDomicilioCobro").prop("disabled", false);
		}
		if (jQuery("#tomador\\.swDomicilioDocu")) {
			jQuery("#tomador\\.swDomicilioDocu").prop("disabled", false);
		}
	}else{
		cleanDatosDomicilio();
		cleanEmailTlf();
	}
}

function llamaAjaxTienePermisoRechazar(url){
		var ajax = new Ajax.Request( url, { method:"post", onComplete: muestraRechazar });
}

function muestraRechazar(resp){
		if(resp.responseText!=null && resp.responseText == 'true'){
			document.getElementById("botonRech").style.visibility = "visible";
		}else{
			document.getElementById("botonRech").style.visibility = "hidden";
		}
	}

function llamaAjaxTienePermisosRehabilitar(url){
		var ajax = new Ajax.Request( url, { method:"post", onComplete: muestraRehabilitar });
}

function muestraRehabilitar(resp){
		if(resp.responseText!=null && resp.responseText == 'true'){
			
			document.getElementById("botonRehabilitar").style.visibility = "visible";
			
		}else{
			
			document.getElementById("botonRehabilitar").style.visibility = "hidden";
		}
	}	
	
	
	