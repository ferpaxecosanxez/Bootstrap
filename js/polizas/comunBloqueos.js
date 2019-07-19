//polizaNuevaProd.jsp
var datosMovimiento = [	'poliza.numSuplExterno',
                       	'poliza.idOrigenCotizacion',
                       	'poliza.promocion'];
						
//duracion.jsp
var camposDuracion = [	'poliza.datosGenerales.fecEfectoPoliza',
						'poliza.datosGenerales.horaEfecto',
						'poliza.datosGenerales.fecVctoMvtoPoliza',
						'poliza.datosGenerales.horaVencimiento',
						'poliza.duracion.idDuracionSeguro',
						'poliza.duracion.duracionNumero',
						'poliza.duracion.idUnidadDuracion'];
						
//indicador.jsp
var camposIndicador = [	'swMasRiesgos.si',
					 	'swMasRiesgos.no',
					 	'swAgrpRiesgos.si',
					 	'swAgrpRiesgos.no',				 	
					 	'poliza.idNivelEmisionRecibo',
					 	'poliza.idNivelFecVcto',
					 	'swGaranGenRiesgoPoliza.si',
					 	'swGaranGenRiesgoPoliza.no',
					 	'poliza.idNivelMedioCobro',
					 	'poliza.idNivelFormaPago'];
					 	
//procedenciaNegocio.jsp
var camposProcedenciaNegocio = ['poliza.negocioInternacional.idCodProcedencia',
								'poliza.negocioInternacional.oficinaProcedencia',
								'poliza.negocioInternacional.progInternacional'];		
								
//gestion.jsp
var camposGestion =   [	'poliza.datosGestion.idFormaPago',
				 		'poliza.datosGestion.swEmisionRecibo',
				 		'poliza.datosGestion.fecRenovacion',
				 		'poliza.datosGestion.fecSigteRecibo',
				 		'poliza.datosGestion.mediadorGestor.idMediador',
				 		'poliza.datosGestion.mediadorGestor.codMediador',
				 		'poliza.datosGestion.mediadorGestor.descMediador',
				 		'poliza.datosGestion.idTipoComisionCombo',
				 		'poliza.datosGestion.porcComisGestorPrimer',
				 		'poliza.datosGestion.porcComisGestorSuc',
				 		'poliza.datosGestion.mediadorGestor.porcParticComisPrimer',
				 		'poliza.datosGestion.mediadorGestor.porcParticComisSuc',
				 		'poliza.datosGestion.referenciaExterna',
				 		'poliza.datosGestion.lote',
				 		'poliza.datosGestion.swExtraComision',
				 		'poliza.datosGestion.idMedioCobro',
				 		'poliza.datosGestion.fecContable',
				 		'poliza.datosGestion.idMotivoAviso',
				 		'imgDisabled',
				 		'imgDisabledAviso',
				 		'poliza.datosGestion.fecAviso',
				 		'poliza.datosGestion.sw1erRecMediador.si',
				 		'poliza.datosGestion.sw1erRecMediador.no'];

var camposMasMediadores =   [	'mediador.idMediador',
						 		'mediador.idRelacionMediador',
						 		'mediador.porcParticComisPrimer',
						 		'mediador.porcParticComisSuc',
						 		'botonAnadir',
						 		'botonModificar',
						 		'botonEliminar',
						 		'botonLimpiar',
						 		'mediador.codMediador',
						 		'mediador.descMediador',
						 		'mediador.codRelacionMediador',
						 		'mediador.porcParticComisPrimer',
						 		'mediador.porcParticComisSuc',
						 		'mediador.idMediador',
						 		'mediador.idRelacionMediador'];
				 		
//tomador.jsp
var camposTomador =  [	'tomador.idTipoIdent',
						'tomador.docIdent',
						'tomador.idIdioma',
						'tomador.nombre',
						'tomador.apel1',
						'tomador.apel2',
						'tomador.idSexo',
						'tomador.fecNacimiento',
						'tomador.fecNacimiento.imgCal',
						'tomador.razonSocial',
						'tomador.btLimpiar',
						'tomador.tlfn1',
						'tomador.tlfn2',
						'tomador.tlfn3',
						'tomador.email',
						'tomador.fax',
						'tomador.tipoDatoBancario',
						'tomador.codBanco',
						'tomador.codSucursal',
						'tomador.ctaDigito',
						'tomador.ctaBanco',
						'botonLimpiarCuenta',
						'tomador.codIban',
						'botonLimpiarIban',
						'imgBusqDatosPsn',
						'tomador.idTipoTarjeta',
						'tomador.codTarjeta',
						'tomador.mesTarjeta',
						'tomador.annoTarjeta',
						'botonLimpiarTarjeta',
						'tomador.swDomicilioCobro',
						'tomador.swDomicilioDocu',
						'tomador.btLimpiarDomicCobro',
						'tomador.btLimpiarDomicCobroTipoCobro',
						'tomador.btLimpiarDomicCobroTipoDocu',
						'tomador.btLimpiarDomic',
						'tomador.idIdiomaComm'];			

var camposMasInfoTomador =  [	'tomador.idPais',
								'tomador.idEstadoCivil',
								'tomador.numHijos',
								'tomador.url',
								'tomador.observaciones',
								'tomador.idCategoriaCarnet',
								'tomador.fecIniCarnet',
								'calendarioCarnet',
								'tomador.fecFinCarnet',
								'calendarioFecVcto'];	

var camposAgrupacion = ['agrupacionRiesgoBean.descAgrpRgo',
						'swGaranGenRiesgoAgrp.si',
						'swGaranGenRiesgoAgrp.no',
						'agrupacionRiesgoBean.numAgrpRgo'];

var camposBotonesAgrupacion = [	'botonGuardar',
								'botonAltaAgrupacion'];
									
var camposDomicilioTomador = [ 	'tomador.domicilioView.idTipoVia',
								'tomador.domicilioView.via',
								'tomador.domicilioView.numVia',
								'tomador.domicilioView.bloque',
								'tomador.domicilioView.piso',
								'tomador.domicilioView.puerta',
								'tomador.domicilioView.idPais',
								'tomador.domicilioView.idProvincia',
								'tomador.domicilioView.codPostal',
								'tomador.domicilioView.codPostalExt',
								'tomador.domicilioView.localidad',
								'tomador.domicilioView.idProvincia',
								'tomador.domicilioCobroView.idTipoVia',
								'tomador.domicilioCobroView.via',
								'tomador.domicilioCobroView.numVia',
								'tomador.domicilioCobroView.bloque',
								'tomador.domicilioCobroView.piso',
								'tomador.domicilioCobroView.puerta',
								'tomador.domicilioCobroView.idPais',
								'tomador.domicilioCobroView.idProvincia',
								'tomador.domicilioCobroView.codPostal',
								'tomador.domicilioCobroView.codPostalExt',
								'tomador.domicilioCobroView.localidad',
								'tomador.domicilioCobroView.idProvincia',
								'tomador.domicilioDocumView.idTipoVia',
								'tomador.domicilioDocumView.via',
								'tomador.domicilioDocumView.numVia',
								'tomador.domicilioDocumView.bloque',
								'tomador.domicilioDocumView.piso',
								'tomador.domicilioDocumView.puerta',
								'tomador.domicilioDocumView.idPais',
								'tomador.domicilioDocumView.idProvincia',
								'tomador.domicilioDocumView.codPostal',
								'tomador.domicilioDocumView.codPostalExt',
								'tomador.domicilioDocumView.localidad',
								'tomador.domicilioDocumView.idProvincia',
								'tomador.mandato.descLocalidad',
								'btLimpiarDomicCobro', 'btLimpiarDomicCobroTipoCobro', 'btLimpiarDomicCobroTipoDocu', 'btLimpiarDomic' ];		
																							
var camposMedidador = [	'mediador.codMediador',
						'mediador.descMediador',
						'mediador.idRelacionMediador',
						'mediador.porcParticComisPrimer',
						'mediador.porcParticComisSuc'];
						

var camposBotonesMediador = [	'botonAnadir',
								'botonModificar',
								'botonEliminar',
								'botonLimpiar',
								'botonAceptar' ];
								
//otrosDatos.jsp								
var camposOtrosDatos = [ 'poliza.otrosDatos.swCoaseguroCedido',
						 'poliza.otrosDatos.idTipoNegocio',
						 'poliza.otrosDatos.swReaseguroFacultativo'];
						 
var camposRiesgo = [ 	'riesgoCotizableSelected',
						'riesgoBean.fecEfectoRiesgo',
						'riesgoBean.duracion.idDuracionSeguro',
						'riesgoBean.duracion.duracionNumero',
						'riesgoBean.duracion.idUnidadDuracion',
						'riesgoBean.fecVctoRiesgo',
						'riesgoBean.datosGestion.idFormaPago',
						'riesgoBean.datosGestion.fecRenovacion',
						'riesgoBean.datosGestion.fecSigteRecibo',
						'riesgoBean.datosGestion.fecPpioAnualidad',
						'riesgoBean.datosGestion.idMedioCobro',
						'riesgoBean.datosGestion.sw1erRecMediador',
						'riesgoBean.riesgoOtrosDatos.divisaRieso.idDivisa',
						'riesgoBean.riesgoOtrosDatos.divisaRieso.idTipoCambioDiv',
						'riesgoBean.riesgoOtrosDatos.divisaRieso.idCriterioCambioDiv',
						'riesgoBean.riesgoOtrosDatos.divisaRieso.factorCambio',
						'riesgoBean.riesgoOtrosDatos.revalRiesgo.swReval',
						'riesgoBean.riesgoOtrosDatos.revalRiesgo.descripcionTipoReval',
						'riesgoBean.riesgoOtrosDatos.revalRiesgo.indiceBaseRevaActual',
						'riesgoBean.riesgoOtrosDatos.revalRiesgo.indiceBaseRevaAnt',
						'riesgoBean.riesgoOtrosDatos.revalRiesgo.porcRevalCapital',
						'riesgoBean.swRecargoFraccPago',
						'riesgoBean.datosGestion.swEmisionRecibo',
						'riesgoBean.riesgoOtrosDatos.idReaseguroPoliza' ];				
						
var camposCoaseguroAceptado = [	'poliza.otrosDatos.cuadroCoaseguroCedente',
								'poliza.otrosDatos.polizaCoaseguroCedente',
								'poliza.otrosDatos.suplementoCoaseguroCedente',
								'poliza.otrosDatos.reciboCoaseguroCedente' ];
								
var camposReaseguroAceptado = [ 'poliza.otrosDatos.cuadroReaseguroCedente',
								'poliza.otrosDatos.polizaReaseguroCedente',
								'poliza.otrosDatos.suplementoReaseguroCedente',
								'poliza.otrosDatos.reciboReaseguroCedente' ];

//relaciones.jsp								
var camposRelacionesPoliza = [	'poliza.personaRelacionada.idTipoRelacion',
								'poliza.personaRelacionada.idTipoIdent',
								'poliza.personaRelacionada.idPersona',
								'poliza.personaRelacionada.docIdPersona',
								'poliza.swPolizasRelac',
								'poliza.swPolizasReempl',
								'btLimpiarPersonaRelacionada' ];		 

//polizaNuevaProd.jsp
var linksEnabled = [ 'linkObservaciones',
                     'linkVerificaciones',
					'linkMotivoMovimiento',
					'linkCausaMovimiento',
					'linkClausulasBarra',
					'linkLocalizacion',
					'linkPersonasRelacionadas',
					'linkFranquiciasyLimites',
					'linkAcces',      //Links Accesorios Autos y Sonido (datosVehiculoPol.jsp)	
					'linkAccesSon',
					'linkObjValor',   //Links Objetos Valor, Joyas y Joyas Caja Fuerte (datosViviendaPol.jsp)
					'linkObjValorCft',
					'linkJoyas',
					'linkJoyasCajFte' ];
		
//datosDomicilio.jsp					
//Para compoenentes especiales que el id se genera de forma dinamica, por ejemplo en el caso de imagenes no es imgDisabled	
//Para imgBusqDatosPsn que esta en reloadTomador.jsp se introduce ya que es distinto id que la de datosDomicilio.jsp, se va alternando
//cuando le das a la lupa de domicilio			   
var arrayExcludedEspecialFields = [ 'tomador.domicilioView.imgBusqLocalidad',
								    'tomador.domicilioCobroView.imgBusqLocalidad',
								    'tomador.domicilioDocumView.imgBusqLocalidad',
								    'imgBusqDatosPsn' ];



/*  ******************************************************* */
/* 					Funciones generales 					*/								
/*  ******************************************************* */

function disableFieldsArray(form, fieldsArray) {
	for (i = 0; i < fieldsArray.length; i++) {
		disableField(form,fieldsArray[i]);
	}
}

function disablePartialFieldsArray(form, fieldsArray, excludedFields) {
	for (i = 0; i < fieldsArray.length; i++) {
		var fieldName = fieldsArray[i];
		if ( !isObjInArray(excludedFields, fieldName) ) {
			disableField(form,fieldName);
		}else{
			enableField(form,fieldName);
		}
	}
}

function isObjInArray(array,obj) {
	for (j = 0; j < array.length; j++) {
		if ( array[j] == obj) {
			return true;
		}
	}
	return false;
}

function disableField(form,fieldName) {
	if(form[fieldName])
		form[fieldName].disabled=true;
}

function enableField(form,fieldName) {
	if(form[fieldName])
		form[fieldName].disabled=false;
}			

function replace(texto,s1,s2){
	return texto.split(s1).join(s2);
}					


//Funcion que deshabilita, imagenes, botones y enlaces
//Se le pasa como parametro array los elementos que no queremos que se deshabiliten
function disableComponents(array){
	if(!window.attachEvent) return false;
	
	var inputs = document.getElementsByTagName("input");
	var imgs = document.getElementsByTagName("img");
	
	//Botones	
	for(i=0; i<inputs.length; i++ ){
		if (inputs[i].type=="button" && inputs[i].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
			if(!isObjInArray(array, inputs[i].id)){
				inputs[i].disabled = true;
			}
		}
	}	
			
	//Imagenes
	for(i=0; i<imgs.length; i++ ){
		if(imgs[i].id != "handWrite"){ //El id handWrite es la mano de modificacion que no queremos que se deshabilite
			imgs[i].disabled = true;
		}
		if(imgs[i].id == "imgDisabled" || isObjInArray(arrayExcludedEspecialFields,imgs[i].id)){ //El id de las cajas de fechas, mapas, lupas...			
			//Comprobamos si la caja de texto que le precede esta deshabilitada, ya que si esta habilitada no deshabilitamos la imagen
			//El espacio entre la caja de texto y la fecha tambien es un node de tipo #text, por eso ponemos dos previousSibling
			if(array != null){
				if((imgs[i].previousSibling != undefined) && (imgs[i].previousSibling != null)){
					if(imgs[i].previousSibling.previousSibling != null
					   && isObjInArray(array,imgs[i].previousSibling.previousSibling.name)){
						//Si el objeto esta en el array la imagen no hay que deshabilitarla
						imgs[i].disabled = false;
					}
					//Ponemos otro previousSibling por la imagen de la flecha de obligatorio
					if((imgs[i].previousSibling.previousSibling != undefined) && (imgs[i].previousSibling.previousSibling != null)){
						if(imgs[i].previousSibling.previousSibling.previousSibling != null 
						   && isObjInArray(array,imgs[i].previousSibling.previousSibling.previousSibling.name)){
						   //Si el objeto esta en el array la imagen no hay que deshabilitarla	
						   imgs[i].disabled = false;
						}
					}
				}
				
			}
		}
	}	

	//Links
	for(i=0;i<document.links.length;i++){
		if(!isObjInArray(linksEnabled, document.links[i].id)){ 
			document.links[i].onclick="";
		}
	}				
}


//Funcion que habilita, imagenes, botones y enlaces
//Se le pasa como parametro array los elementos que queremos que se deshabiliten
function enabledComponents(array){
	if(!window.attachEvent) return false;
	
	var inputs = document.getElementsByTagName("input");
	var imgs = document.getElementsByTagName("img");
	
	//Botones	
	for(i=0; i<inputs.length; i++ ){
		if (inputs[i].type=="button" && inputs[i].className=="boton2"){ //El class boton2 es el de los botonos dentro de formulario			
			if(isObjInArray(array, inputs[i].id)){
				inputs[i].disabled = true;
			}
		}
	}	
			
	//Imagenes
	for(i=0; i<imgs.length; i++ ){
		if(imgs[i].id == "imgDisabled"){ //El id de las cajas de fechas, mapas, lupas...
			//Comprobamos si la caja de texto que le precede esta deshabilitada, ya que si esta habilitada no deshabilitamos la imagen
			//El espacio entre la caja de texto y la fecha tambien es un node de tipo #text, por eso ponemos dos previousSibling
			if(array != null){
				if(imgs[i].previousSibling.previousSibling != null
				   && isObjInArray(array,imgs[i].previousSibling.previousSibling.name)){
					//Si el objeto esta en el array la imagen no hay que deshabilitarla
					imgs[i].disabled = true;
				}
				//Ponemos otro previousSibling por la imagen de la flecha de obligatorio
				if(imgs[i].previousSibling.previousSibling.previousSibling != null 
				   && isObjInArray(array,imgs[i].previousSibling.previousSibling.previousSibling.name)){
				   //Si el objeto esta en el array la imagen no hay que deshabilitarla	
				   imgs[i].disabled = true;
				}
			}
		}
	}		
}

