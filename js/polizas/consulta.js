/*
*	Funcion de bloqueo de campos
*	se encarga de invocar a la funcion de bloqueo de la jsp en la que estemos
*	formulario --> formulario que contiene los campos a bloquear
*	tipo --> indica la jsp que tiene que bloquear: agrupaciones, datos generales, riesgos,...
*/

function bloqueoCampos(formulario, tipo){

	switch(tipo){
		case 0://datos generales
			//bloqueoDatosGenerales(formulario);
			formulario['poliza.datosGenerales.numExpedienteVenta'].disabled=true;
			break;
		case 1://datos agrupacion
			//bloqueoDatosAgrupacion(formulario);
			break;
		case 2://datos riesgo poliza
			//bloqueoDatosRiesgoPoliza(formulario);
			break;			
		case 4://datos riesgo agrupacion
			//bloqueoDatosRiesgoAgrupacion(formulario);
			break;			
		case 5://datos riesgo asegurado
			//bloqueoDatosRiesgoAsegurado(formulario);
			break;
		case 6://datos mediadores
			//bloqueoDatosMediadores(formulario);
			break;			
	}
}

/*
*	Funcion encargada de bloquear los datos generales de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosGenerales(formulario){

	obj = new Object(formulario);
	
	//duracion.jsp
	if(obj['poliza.datosGenerales.fecEfectoPoliza'])obj['poliza.datosGenerales.fecEfectoPoliza'].disabled=true;
	if(obj['poliza.datosGenerales.horaEfecto'])obj['poliza.datosGenerales.horaEfecto'].disabled=true;
	if(obj['poliza.datosGenerales.fecVctoMvtoPoliza'])obj['poliza.datosGenerales.fecVctoMvtoPoliza'].disabled=true;
	if(obj['poliza.datosGenerales.horaVencimiento'])obj['poliza.datosGenerales.horaVencimiento'].disabled=true;
	if(obj['poliza.duracion.idDuracionSeguro'])obj['poliza.duracion.idDuracionSeguro'].disabled=true;
	if(obj['poliza.duracion.duracionNumero'])obj['poliza.duracion.duracionNumero'].disabled=true;
	if(obj['poliza.duracion.idUnidadDuracion'])obj['poliza.duracion.idUnidadDuracion'].disabled=true;		
	
	//indicador.jsp
	if(obj['swMasRiesgos'])obj['swMasRiesgos'].disabled=true;		
	if(obj['swAgrpRiesgos'])obj['swAgrpRiesgos'].disabled=true;		
	if(obj['poliza.idNivelEmisionRecibo'])obj['poliza.idNivelEmisionRecibo'].disabled=true;		
	if(obj['poliza.idNivelFecVcto'])obj['poliza.idNivelFecVcto'].disabled=true;					
	if(obj['swGaranGenRiesgoPoliza'])obj['swGaranGenRiesgoPoliza'].disabled=true;					
	if(obj['poliza.idNivelMedioCobro'])obj['poliza.idNivelMedioCobro'].disabled=true;					
	if(obj['poliza.idNivelFormaPago'])obj['poliza.idNivelFormaPago'].disabled=true;					
	
	//procedenciaNegocio.jsp
	if(obj['poliza.negocioInternacional.idCodProcedencia'])obj['poliza.negocioInternacional.idCodProcedencia'].disabled=true;		
	if(obj['poliza.negocioInternacional.oficinaProcedencia'])obj['poliza.negocioInternacional.oficinaProcedencia'].disabled=true;		
	if(obj['poliza.negocioInternacional.progInternacional'])obj['poliza.negocioInternacional.progInternacional'].disabled=true;		
	
	//gestion.jsp
	if(obj['poliza.defProductoView.formasPago'])obj['poliza.defProductoView.formasPago'].disabled=true;		
	if(obj['poliza.datosGestion.swEmisionRecibo'])obj['poliza.datosGestion.swEmisionRecibo'].disabled=true;		
	if(obj['poliza.datosGestion.fecRenovacion'])obj['poliza.datosGestion.fecRenovacion'].disabled=true;		
	if(obj['poliza.datosGestion.fecSigteRecibo'])obj['poliza.datosGestion.fecSigteRecibo'].disabled=true;		
	if(obj['poliza.datosGestion.fecPpioAnualidad'])obj['poliza.datosGestion.fecPpioAnualidad'].disabled=true;						
	if(obj['poliza.datosGestion.idTipoComision'])obj['poliza.datosGestion.idTipoComision'].disabled=true;	
	if(obj['poliza.datosGestion.porcComisGestorPrimer'])obj['poliza.datosGestion.porcComisGestorPrimer'].disabled=true;	
	if(obj['poliza.datosGestion.porcComisGestorSuc'])obj['poliza.datosGestion.porcComisGestorSuc'].disabled=true;	
	if(obj['poliza.datosGestion.mediadorGestor.porcParticComisPrimer'])obj['poliza.datosGestion.mediadorGestor.porcParticComisPrimer'].disabled=true;					
	if(obj['poliza.datosGestion.mediadorGestor.porcParticComisSuc'])obj['poliza.datosGestion.mediadorGestor.porcParticComisSuc'].disabled=true;	
	if(obj['poliza.datosGestion.referenciaExterna'])obj['poliza.datosGestion.referenciaExterna'].disabled=true;	
	if(obj['poliza.datosGestion.swExtraComision'])obj['poliza.datosGestion.swExtraComision'].disabled=true;	
	if(obj['poliza.datosGestion.idMedioCobro'])obj['poliza.datosGestion.idMedioCobro'].disabled=true;			
	if(obj['sw1erRecMediador'])obj['sw1erRecMediador'].disabled=true;		
	if(obj['poliza.datosGestion.fecContable'])obj['poliza.datosGestion.fecContable'].disabled=true;		
	if(obj['poliza.datosGestion.swRenovacionAutom'])obj['poliza.datosGestion.swRenovacionAutom'].disabled=true;		
	if(obj['poliza.datosGestion.idMotivoAviso'])obj['poliza.datosGestion.idMotivoAviso'].disabled=true;		
	if(obj['poliza.datosGestion.fecAviso'])obj['poliza.datosGestion.fecAviso'].disabled=true;						
		
	//tomador.jsp
	if(obj['tomador.idTipoIdent'])obj['tomador.idTipoIdent'].disabled=true;
	if(obj['tomador.docIdent'])obj['tomador.docIdent'].disabled=true;
	if(obj['imgDisabledPersonas'])obj['imgDisabledPersonas'].disabled=true;
	if(obj['tomador.idIdioma'])obj['tomador.idIdioma'].disabled=true;
	if(obj['tomador.nombre'])obj['tomador.nombre'].disabled=true;
	if(obj['tomador.apel1'])obj['tomador.apel1'].disabled=true;
	if(obj['tomador.apel2'])obj['tomador.apel2'].disabled=true;
	if(obj['tomador.idSexo'])obj['tomador.idSexo'].disabled=true;
	if(obj['tomador.fecNacimiento'])obj['tomador.fecNacimiento'].disabled=true;
	if(obj['tomador.razonSocial'])obj['tomador.razonSocial'].disabled=true;
	if(obj['tomador.tlfn1'])obj['tomador.tlfn1'].disabled=true;
	if(obj['tomador.tlfn2'])obj['tomador.tlfn2'].disabled=true;
	if(obj['tomador.tlfn3'])obj['tomador.tlfn3'].disabled=true;
	if(obj['tomador.email'])obj['tomador.email'].disabled=true;
	if(obj['tomador.fax'])obj['tomador.fax'].disabled=true;
	if(obj['tomador.tipoDatoBancario'])obj['tomador.tipoDatoBancario'].disabled=true;
	if(obj['tomador.codBanco'])obj['tomador.codBanco'].disabled=true;
	if(obj['tomador.codSucursal'])obj['tomador.codSucursal'].disabled=true;
	if(obj['tomador.ctaDigito'])obj['tomador.ctaDigito'].disabled=true;
	if(obj['tomador.ctaBanco'])obj['tomador.ctaBanco'].disabled=true;
	if(obj['imgDisabledCuenta'])obj['imgDisabledCuenta'].disabled=true;
	if(obj['botonLimpiarCuenta'])obj['botonLimpiarCuenta'].disabled=true;
	if(obj['tomador.codIban'])obj['tomador.codIban'].disabled=true;
	if(obj['imgDisabledIban'])obj['imgDisabledIban'].disabled=true;
	if(obj['botonLimpiarIban'])obj['botonLimpiarIban'].disabled=true;
	if(obj['imgBusqDatosPsn'])obj['imgBusqDatosPsn'].disabled=true;
	if(obj['botonLimpiarDB'])obj['botonLimpiarDB'].disabled=true;
	if(obj['tomador.idTipoTarjeta'])obj['tomador.idTipoTarjeta'].disabled=true;
	if(obj['tomador.codTarjeta'])obj['tomador.codTarjeta'].disabled=true;
	if(obj['tomador.mesTarjeta'])obj['tomador.mesTarjeta'].disabled=true;
	if(obj['tomador.annoTarjeta'])obj['tomador.annoTarjeta'].disabled=true;
	if(obj['imgDisabled'])obj['imgDisabled'].disabled=true;
	if(obj['botonLimpiarTarjeta'])obj['botonLimpiarTarjeta'].disabled=true;
	if(obj['tomador.swDomicilioCobro'])obj['tomador.swDomicilioCobro'].disabled=true;
	if(obj['tomador.swDomicilioDocu'])obj['tomador.swDomicilioDocu'].disabled=true;
	
	if (domiciliosFunctions!=null) eval(domiciliosFunctions);
		
	//otrosDatos.jsp
	if(obj['poliza.otrosDatos.idTipoNegocio'])obj['poliza.otrosDatos.idTipoNegocio'].disabled=true;						
	if(obj['poliza.otrosDatos.swCoaseguroCedido'])obj['poliza.otrosDatos.swCoaseguroCedido'].disabled=true;	
	if(obj['poliza.otrosDatos.swReaseguroFacultativo'])obj['poliza.otrosDatos.swReaseguroFacultativo'].disabled=true;	
	//**OJO, FALTAN CAMPOS EN LA JSP
	
	//relaciones.jsp				
	//**OJO, FALTAN CAMPOS EN LA JSP
	
	
	if(obj['handWrite'])obj['handWrite'].disabled=true;		
}

/*
*	Funcion encargada de bloquear los datos del riesgo de la poliza
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoPoliza(formulario){

    obj = new Object(formulario);
	inhabilitaSelects();
	if(obj['handWrite'])obj['handWrite'].disabled=true;		
}

/*
*	Funcion encargada de bloquear los datos del riesgo de la agrupacion
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoAgrupacion(formulario){

    obj = new Object(formulario);
	inhabilitaSelects();
	if(obj['handWrite'])obj['handWrite'].disabled=true;		

}

/*
*	Funcion encargada de bloquear los datos del riesgo asegurado
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosRiesgoAsegurado(formulario){

    obj = new Object(formulario);
	inhabilitaSelects();
	if(obj['handWrite'])obj['handWrite'].disabled=true;		
}

/*
*	Funcion encargada de bloquear los datos de las agrupaciones
*	formulario --> formulario que contiene los campos a bloquear
*/
function bloqueoDatosAgrupacion(formulario){

	obj = new Object(formulario);
	
	//campos agrupacion
	if(obj['agrupacionRiesgoBean.descAgrpRgo'])obj['agrupacionRiesgoBean.descAgrpRgo'].disabled=true;
	if(obj['swGaranGenRiesgoAgrp.si'])obj['swGaranGenRiesgoAgrp.si'].disabled=true;
	if(obj['swGaranGenRiesgoAgrp.no'])obj['swGaranGenRiesgoAgrp.no'].disabled=true;
	if(obj['agrupacionRiesgoBean.numAgrpRgo'])obj['agrupacionRiesgoBean.numAgrpRgo'].disabled=true;
	
	//botones agrupacion
	if(obj['botonGuardar'])obj['botonGuardar'].disabled=true;
	if(obj['botonAltaAgrupacion'])obj['botonAltaAgrupacion'].disabled=true;
	if(obj['botonDuplicar'])obj['botonDuplicar'].disabled=true;
	
	//tomador.jsp
	if(obj['tomador.idTipoIdent'])obj['tomador.idTipoIdent'].disabled=true;
	if(obj['tomador.docIdent'])obj['tomador.docIdent'].disabled=true;
	if(obj['imgDisabledPersonas'])obj['imgDisabledPersonas'].disabled=true;
	if(obj['tomador.idIdioma'])obj['tomador.idIdioma'].disabled=true;
	if(obj['tomador.nombre'])obj['tomador.nombre'].disabled=true;
	if(obj['tomador.apel1'])obj['tomador.apel1'].disabled=true;
	if(obj['tomador.apel2'])obj['tomador.apel2'].disabled=true;
	if(obj['tomador.idSexo'])obj['tomador.idSexo'].disabled=true;
	if(obj['tomador.fecNacimiento'])obj['tomador.fecNacimiento'].disabled=true;
	if(obj['tomador.razonSocial'])obj['tomador.razonSocial'].disabled=true;
	if(obj['tomador.tlfn1'])obj['tomador.tlfn1'].disabled=true;
	if(obj['tomador.tlfn2'])obj['tomador.tlfn2'].disabled=true;
	if(obj['tomador.tlfn3'])obj['tomador.tlfn3'].disabled=true;
	if(obj['tomador.email'])obj['tomador.email'].disabled=true;
	if(obj['tomador.fax'])obj['tomador.fax'].disabled=true;
	if(obj['tomador.tipoDatoBancario'])obj['tomador.tipoDatoBancario'].disabled=true;
	if(obj['tomador.codBanco'])obj['tomador.codBanco'].disabled=true;
	if(obj['tomador.codSucursal'])obj['tomador.codSucursal'].disabled=true;
	if(obj['tomador.ctaDigito'])obj['tomador.ctaDigito'].disabled=true;
	if(obj['tomador.ctaBanco'])obj['tomador.ctaBanco'].disabled=true;
	if(obj['imgDisabledCuenta'])obj['imgDisabledCuenta'].disabled=true;
	if(obj['botonLimpiarCuenta'])obj['botonLimpiarCuenta'].disabled=true;
	if(obj['tomador.codIban'])obj['tomador.codIban'].disabled=true;
	if(obj['imgDisabledIban'])obj['imgDisabledIban'].disabled=true;
	if(obj['botonLimpiarIban'])obj['botonLimpiarIban'].disabled=true;
	if(obj['imgBusqDatosPsn'])obj['imgBusqDatosPsn'].disabled=true;
	if(obj['tomador.idTipoTarjeta'])obj['tomador.idTipoTarjeta'].disabled=true;
	if(obj['tomador.codTarjeta'])obj['tomador.codTarjeta'].disabled=true;
	if(obj['tomador.mesTarjeta'])obj['tomador.mesTarjeta'].disabled=true;
	if(obj['tomador.annoTarjeta'])obj['tomador.annoTarjeta'].disabled=true;
	if(obj['imgDisabledTarjeta'])obj['imgDisabledTarjeta'].disabled=true;
	if(obj['botonLimpiarTarjeta'])obj['botonLimpiarTarjeta'].disabled=true;
	if(obj['tomador.swDomicilioCobro'])obj['tomador.swDomicilioCobro'].disabled=true;
	if(obj['tomador.swDomicilioDocu'])obj['tomador.swDomicilioDocu'].disabled=true;
	
	//datosDomicilio.jsp
	if(obj['tomador.domicilioView.idTipoVia'])obj['tomador.domicilioView.idTipoVia'].disabled=true;
	if(obj['tomador.domicilioView.via'])obj['tomador.domicilioView.via'].disabled=true;
	if(obj['tomador.domicilioView.numVia'])obj['tomador.domicilioView.numVia'].disabled=true;
	if(obj['tomador.domicilioView.bloque'])obj['tomador.domicilioView.bloque'].disabled=true;
	if(obj['tomador.domicilioView.piso'])obj['tomador.domicilioView.puerta'].disabled=true;
	if(obj['tomador.domicilioView.idPais'])obj['tomador.domicilioView.idPais'].disabled=true;
	if(obj['tomador.domicilioView.idProvincia'])obj['tomador.domicilioView.idProvincia'].disabled=true;
	if(obj['tomador.domicilioView.codPostal'])obj['tomador.domicilioView.codPostal'].disabled=true;
	if(obj['tomador.domicilioView.localidad'])obj['tomador.domicilioView.localidad'].disabled=true;
	if(obj['tomador.domicilioView.idProvincia'])obj['tomador.domicilioView.idProvincia'].disabled=true;			
	
	if(obj['tomador.domicilioCobroView.idTipoVia'])obj['tomador.domicilioCobroView.idTipoVia'].disabled=true;
	if(obj['tomador.domicilioCobroView.via'])obj['tomador.domicilioCobroView.via'].disabled=true;
	if(obj['tomador.domicilioCobroView.numVia'])obj['tomador.domicilioCobroView.numVia'].disabled=true;
	if(obj['tomador.domicilioCobroView.bloque'])obj['tomador.domicilioCobroView.bloque'].disabled=true;
	if(obj['tomador.domicilioCobroView.piso'])obj['tomador.domicilioCobroView.puerta'].disabled=true;
	if(obj['tomador.domicilioCobroView.idPais'])obj['tomador.domicilioCobroView.idPais'].disabled=true;
	if(obj['tomador.domicilioCobroView.idProvincia'])obj['tomador.domicilioCobroView.idProvincia'].disabled=true;
	if(obj['tomador.domicilioCobroView.codPostal'])obj['tomador.domicilioCobroView.codPostal'].disabled=true;
	if(obj['tomador.domicilioCobroView.localidad'])obj['tomador.domicilioCobroView.localidad'].disabled=true;
	if(obj['tomador.domicilioCobroView.idProvincia'])obj['tomador.domicilioCobroView.idProvincia'].disabled=true;			
	
	if(obj['tomador.domicilioDocumView.idTipoVia'])obj['tomador.domicilioDocumView.idTipoVia'].disabled=true;
	if(obj['tomador.domicilioDocumView.via'])obj['tomador.domicilioDocumView.via'].disabled=true;
	if(obj['tomador.domicilioDocumView.numVia'])obj['tomador.domicilioDocumView.numVia'].disabled=true;
	if(obj['tomador.domicilioDocumView.bloque'])obj['tomador.domicilioDocumView.bloque'].disabled=true;
	if(obj['tomador.domicilioDocumView.piso'])obj['tomador.domicilioDocumView.puerta'].disabled=true;
	if(obj['tomador.domicilioDocumView.idPais'])obj['tomador.domicilioDocumView.idPais'].disabled=true;
	if(obj['tomador.domicilioDocumView.idProvincia'])obj['tomador.domicilioDocumView.idProvincia'].disabled=true;
	if(obj['tomador.domicilioDocumView.codPostal'])obj['tomador.domicilioDocumView.codPostal'].disabled=true;
	if(obj['tomador.domicilioDocumView.localidad'])obj['tomador.domicilioDocumView.localidad'].disabled=true;
	if(obj['tomador.domicilioDocumView.idProvincia'])obj['tomador.domicilioDocumView.idProvincia'].disabled=true;		
	
	if(obj['handWrite'])obj['handWrite'].disabled=true;		
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

	//botones jsp
	if(obj['botonAnadir'])obj['botonAnadir'].disabled=true;
	if(obj['botonModificar'])obj['botonModificar'].disabled=true;
	if(obj['botonEliminar'])obj['botonEliminar'].disabled=true;
	if(obj['botonLimpiar'])obj['botonLimpiar'].disabled=true;	
	if(obj['botonAceptar'])obj['botonAceptar'].disabled=true;


}