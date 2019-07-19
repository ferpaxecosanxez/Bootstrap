// Constantes
var aseguradoFisico="aseguradofis";
var conductorHabitual="conduchab";
var conductorOcasional="conducoca";
var aseguradoJuridico="aseguradojur";
var propietario="propietario";
var idTipoIdentificador="cotizacion\\.cotizaTomador\\.idTipoIdent";
var idDocumentoTdentificativo="cotizacion\\.cotizaTomador\\.docIdent";
var idPersonaIdentificador = "cotizacion\\.cotizaTomador\\.idPersona";
var botonesRecogerDatosTomador=null;

//Funcion para la busqueda de las personas 
function busquedaPersona(pag){
	var valor = lanzarVentana(pag,600,400);
	if(valor != undefined){
		muestraCarga();
		jQuery("#"+idPersonaIdentificador).val(valor[0]);
		var parametros = obtenerParametersCamposFormularios(['cotizacionForm']);
		nuevaPeticionAjax(actionSelectPersonaTomador,'post',parametros,callbackDatosTomador,callbackError);
				
	}else{
		jQuery("#"+idPersonaIdentificador).val('');
	}
	return valor;
}

/* Funcion que llama a la ventana modal para la busqueda de personas */
function lupaPersonasFisica(){
	if(!jQuery("#tomador\\.btLimpiar").attr("disabled")){
		var actionBuscarPersonaFisica=urlBusquedaPersona;
		actionBuscarPersonaFisica+= "?tipoPersona="+document.getElementById("cotizacion.cotizaTomador.idTipoPersona").value;
		actionBuscarPersonaFisica+= "&tipoIdentificador="+document.getElementById("cotizacion.cotizaTomador.idTipoIdent").value;
		actionBuscarPersonaFisica+= "&identificador="+document.getElementById("cotizacion.cotizaTomador.docIdent").value;
		actionBuscarPersonaFisica+= "&nombre="+document.getElementById("cotizacion.cotizaTomador.nombre").value;
		actionBuscarPersonaFisica+= "&apel1="+document.getElementById("cotizacion.cotizaTomador.apel1").value;
		actionBuscarPersonaFisica+= "&apel2="+document.getElementById("cotizacion.cotizaTomador.apel2").value;
		
		busquedaPersona(actionBuscarPersonaFisica);
		
		inicializarConsultaMutualista();
	}
	
}

function lupaPersonasJuridica(){
	if(!jQuery("#tomador\\.btLimpiar").attr("disabled")){
		var actionBuscarPersonaJuridica=urlBusquedaPersona;
		
		var idTipoPersona = document.getElementById("cotizacion.cotizaTomador.idTipoPersona");
		idTipoPersona = (idTipoPersona != null ? idTipoPersona.value : '');
		actionBuscarPersonaJuridica+= "?tipoPersona=" + idTipoPersona;
		
		var idTipoIdent = document.getElementById("cotizacion.cotizaTomador.idTipoIdent");
		idTipoIdent = (idTipoIdent != null ? idTipoIdent.value : '');
		actionBuscarPersonaJuridica+= "&tipoIdentificador=" + idTipoIdent;
		
		var docIdent = document.getElementById("cotizacion.cotizaTomador.docIdent");
		docIdent = (docIdent != null ? docIdent.value : '');
		actionBuscarPersonaJuridica+= "&identificador=" + docIdent;
				
		var razonSocial = document.getElementById("cotizacion.cotizaTomador.razonSocial");
		razonSocial = (razonSocial != null ? razonSocial.value : '');
		actionBuscarPersonaJuridica+= "&razonSocial=" + razonSocial;
		
		busquedaPersona(actionBuscarPersonaJuridica);
		
		inicializarConsultaMutualista();
	}
}

function bloqueoCampos(){
	disableDatosPersonales(true, 'cotizacion.cotizaTomador');
	
}

function cleanIdent(name){
	var index =name.lastIndexOf('.',name.length);
	var tipoRol = name.substring(0,index);
	if(document.getElementById(tipoRol + ".idTipoIdent").value==""){
		document.getElementById(tipoRol + ".docIdent").value = "" ;
		document.getElementById(tipoRol + ".nombre").value = "" ;
		document.getElementById(tipoRol + ".apel1").value = "" ;
		document.getElementById(tipoRol + ".apel2").value = "" ;
		if(document.getElementById(tipoRol + ".razonSocial"))
			document.getElementById(tipoRol + ".razonSocial").value = "" ;
	}
}

/**
* Esta funcion controla la modificacion del docIdent despues de haber traido la persona utilizando la lupa
* el idPersona se quedara a null
*/
function removeIdersona(){
	document.getElementById("cotizacion.cotizaTomador.idPersona").value = null;
}

/**
* Funcion que evalua el valor del campo hidden 'cotizacion.cotizaTomador.idTipoPersona',
* actualmente este campo tiene el value del combo 'cotizacion.cotizaTomador.idTipoIdent' 
* estos valores van del 1 hasta el 4, los valores de idTipoPersona son 1 para todos los tipos de identificacion
* salvo para el valor de idTipoIdent=2 que entonces nuestro idTipoPersona es igual a dos
*/
function controlIdTipoPersona(idTipoPersonaTipoDocIdent) {
	var selectBox = document.getElementById(idTipoPersonaTipoDocIdent);
	if(selectBox.value != ""){
		if (selectBox.value == 1){
			selectBox.value = 2;
		}else{
			selectBox.value = 1;
		}
	}
}

function callbackDatosTomador(respuesta){
	// Split the text response into Span elements
	spanElements = splitTextIntoSpan(respuesta.responseText);
	// Use these span elements to update the page
	replaceExistingWithNewHtml(spanElements);
	// Se deshabilitan los campos del tomador
	deshabilitaDatosTomador(true);
	// Determinamos que tipo de persona es (fisica|jurídica)
	determinaTipoPersona();
	// Comprueba los datos precargados
	compruebaDatosPrecargados();
	// Habilitamos la edición del formulario
	showHideVis('handWrite',true);
	// Ocultamos la animación "cargando"
	ocultaCarga();
	// Aplicamos el control para saber si se debe habilitar o deshabilitar el botón recoger datos del tomador
	habilitaBotonRecogerDatosTomador();	
	// Inicializamos el mapa de campos precargados
	mapaPrecargados=new Object();
	idTipoIdentTomador=document.getElementById("cotizacion.cotizaTomador.idTipoIdent").value;
	
	inicializarConsultaMutualista();
}

function callbackLimpiarDatosTomador(respuesta){
	// Split the text response into Span elements
	spanElements = splitTextIntoSpan(respuesta.responseText);
	// Use these span elements to update the page
	replaceExistingWithNewHtml(spanElements);
	// Se habilitan los campos del tomador
	deshabilitaDatosTomador(false);
	// Deshabilitamos todos los botones recoger datos del tomador
	deshabilitarTodosBotonesRecogerDatosTomador();
	// Determinamos que tipo de persona es
	determinaTipoPersona();
	// Comprueba los datos precargados
	compruebaDatosPrecargados();
	// Inicializamos el mapa de campos precargados
	mapaPrecargados=new Object();
	
	inicializarConsultaMutualista();
}

function compruebaDatosPrecargados(){
	var idPersonaTomador=getValue("cotizacion.cotizaTomador.idPersona");
	if(idPersonaTomador!=undefined && idPersonaTomador!=null && idPersonaTomador!=''){
		if(document.getElementById("cotizacion.cotizaTomador.idTipoIdent") && 
				document.getElementById("cotizacion.cotizaTomador.idTipoIdent").value!=''){
			document.getElementById("cotizacion.cotizaTomador.idTipoIdent").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.docIdent") && 
				document.getElementById("cotizacion.cotizaTomador.docIdent").value!=''){
			document.getElementById("cotizacion.cotizaTomador.docIdent").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.nombre") && 
				document.getElementById("cotizacion.cotizaTomador.nombre").value!=''){
			document.getElementById("cotizacion.cotizaTomador.nombre").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.apel1") && 
				document.getElementById("cotizacion.cotizaTomador.apel1").value!=''){
			document.getElementById("cotizacion.cotizaTomador.apel1").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.apel2") && 
				document.getElementById("cotizacion.cotizaTomador.apel2").value!=''){
			document.getElementById("cotizacion.cotizaTomador.apel2").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.razonSocial") && 
				document.getElementById("cotizacion.cotizaTomador.razonSocial").value!=''){
			document.getElementById("cotizacion.cotizaTomador.razonSocial").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.idSexo") && 
				document.getElementById("cotizacion.cotizaTomador.idSexo").value!=''){
			document.getElementById("cotizacion.cotizaTomador.idSexo").disabled=true;
		}
		if(document.getElementById("cotizacion.cotizaTomador.fecNacimiento") && 
				document.getElementById("cotizacion.cotizaTomador.fecNacimiento").value!=''){
			document.getElementById("cotizacion.cotizaTomador.fecNacimiento").disabled=true;
		}
	}else if(jQuery('#modeloCotizacion').val()!=undefined){
		var modelo=jQuery('#modeloCotizacion').val();
		if(modelo == 'B' || modelo == 'A'){
			if(document.getElementById("cotizacion.cotizaTomador.idTipoIdent"))
				document.getElementById("cotizacion.cotizaTomador.idTipoIdent").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.docIdent"))
				document.getElementById("cotizacion.cotizaTomador.docIdent").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.nombre"))
				document.getElementById("cotizacion.cotizaTomador.nombre").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.apel1"))
				document.getElementById("cotizacion.cotizaTomador.apel1").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.apel2"))
				document.getElementById("cotizacion.cotizaTomador.apel2").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.razonSocial"))
				document.getElementById("cotizacion.cotizaTomador.razonSocial").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.idSexo"))
				document.getElementById("cotizacion.cotizaTomador.idSexo").disabled=false;
			if(document.getElementById("cotizacion.cotizaTomador.fecNacimiento"))
				document.getElementById("cotizacion.cotizaTomador.fecNacimiento").disabled=false;
		}
	}
}

function habilitaBotonRecogerDatosTomador(){
	var idTipoIdent = jQuery("#"+idTipoIdentificador).val();
	var documento = jQuery("#"+idDocumentoTdentificativo).val();
	if(documento!=null && documento!=''){
		var documentoValido=null;
		// Si el tipo de documento es un pasaporte no se valida.
		if(idTipoIdent=="4"){
			documentoValido=true;
		}else{
			documentoValido=validaDocumentoIdentificativo(idDocumentoTdentificativo,idTipoIdent);
		}
		var disabled=false;
		if(botonesRecogerDatosTomador==null)botonesRecogerDatosTomador=jQuery('input[name="recogeDatosTomador"]').get()
		if(botonesRecogerDatosTomador!=null){
			if(idTipoIdent!=''){
				for (var i = 0, length = botonesRecogerDatosTomador.length; i < length; i++) {
					var idBotonRecogerDatosTomador = botonesRecogerDatosTomador[i].id;
					if(idBotonRecogerDatosTomador.indexOf(aseguradoJuridico) != -1){
						if(idTipoIdent == idenCIF && documentoValido){
							disabled=false;
						}else{
							disabled=true;
						}
					}else if(idBotonRecogerDatosTomador.indexOf(aseguradoFisico) != -1 || 
							idBotonRecogerDatosTomador.indexOf(conductorHabitual) != -1 ||
							idBotonRecogerDatosTomador.indexOf(conductorOcasional) != -1){
						if(idTipoIdent != idenCIF && documentoValido){
							disabled=false;
						}else{
							disabled=true;
						}
						// beneficiario, asegurado y propietario
					}else{
						if(documentoValido){
							disabled=false;
						}else{
							disabled=true;
							
						}			
					}
					document.getElementById(idBotonRecogerDatosTomador).disabled=disabled;
				}
			}else{		
				deshabilitarTodosBotonesRecogerDatosTomador();
			}
		}
	}else{
		deshabilitarTodosBotonesRecogerDatosTomador();
	}	
}

function compruebaNIF(value) {
	if(/^([0-9]{8})*[a-zA-Z]+$/.test(value)){
		var numero = value.substr(0,value.length-1);
		var let = value.substr(value.length-1,1);
		numero = numero % 46;
		var letra='TRWAGMYFPDXBNJZSQVHLCKETtrwagmyfpdxbnjzsqvhlcket';
		letra=letra.substring(numero,numero+1);
		if (letra==let)
			return true;
		return false;
	}
}

function deshabilitarTodosBotonesRecogerDatosTomador(){
	// Deshabilitamos todos los botones
	if(botonesRecogerDatosTomador!=null){
		for (var i = 0, length = botonesRecogerDatosTomador.length; i < length; i++) {
			document.getElementById(botonesRecogerDatosTomador[i].id).disabled=true;
		}
	}
}

function determinaTipoPersona(){
	if(jQuery("#cotizacion\\.cotizaTomador\\.razonSocial").val()){
		document.getElementById("trNomApe").className="oculta";
		if(document.getElementById("trDatPF"))document.getElementById("trDatPF").className="oculta";
		document.getElementById("trRS").className="visible";
		
	}
}

function deshabilitaDatosTomador(boolean){
	jQuery("#cotizacion\\.cotizaTomador\\.idTipoIdent").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.docIdent").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.nombre").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.apel1").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.apel2").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.razonSocial").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.idPersona").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.idTipoPersona").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.idSexo").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.fecNacimiento").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.idEstadoCivil").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.numHijos").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.idTipoVia").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.via").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.numVia").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.bloque").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.piso").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.puerta").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.idPais").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.localidad").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.idLocalidad").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.localidad").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.idProvincia").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.codPostal").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.domicilioView\\.codPostalExt").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.tlfn1").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.tlfn2").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.tlfn3").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.email").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.fax").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.url").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.observaciones").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.codIban").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.codSucursal").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.ctaDigito").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.ctaBanco").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.idTipoTarjeta").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.codTarjeta").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.mesTarjeta").prop("disabled",boolean);
	jQuery("#cotizacion\\.cotizaTomador\\.annoTarjeta").prop("disabled",boolean);

	
	if(jQuery("#riesgoCotizableSelected").val()=='' || jQuery("#riesgoCotizableSelected").val()==undefined){
		jQuery("#tomador\\.btLimpiar").attr("disabled",boolean);
	}
	
}

function limpiarDatosTomador(action){
	var parametros = obtenerParametersCamposFormularios(['cotizacionForm']);
	nuevaPeticionAjax(action,'post',parametros,callbackLimpiarDatosTomador,callbackError);
}

function avisoCambioIdioma(){
	if (jQuery("#numCotizacion").html()!= undefined && jQuery("#numCotizacion").html()!= ''){
		alert(avisoIdiomaComunicacion);
	}    		
}

function lupaPersona(elementId) {
	var elt = document.getElementById(elementId);
	if (elt.selectedIndex == -1){
		return null;
	}
	if (elt.options[elt.selectedIndex].text.toUpperCase() == "C.I.F.") {
		lupaPersonasJuridica();
	} else{
		lupaPersonasFisica();
	}
}