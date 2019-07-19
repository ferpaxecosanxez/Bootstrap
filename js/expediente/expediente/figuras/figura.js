/* Funcion para la comprobar si es posible mostrar los datos adicionales de la persona */
function datosDomicilio(action,mensaje){
	var idPersona = document.getElementById('figuraFormView.idPersona').value;
	var tipoPersona = document.getElementById('figuraFormView.idTipoPersona').value;

	if(idPersona == ""){
		alert(mensaje);
	}else{
		var pag = action;
		pag = pag + "?persona.id=" + idPersona;
		pag = pag + "&persona.tipoPersona.id=" + tipoPersona;
		pag = pag + "&swCtasBancarias=0";
		pag = pag + "&swPermisos=0";
		var valor = lanzarVentana(pag,500,550);

		if (valor != null) {

			var pagina = actionFiguraDomicilio;

			document.getElementById('figuraFormView.idDomicilioNuevo').value = valor[0][0];

			var idsTelefonos = "";
			for(var i=0;i< valor[1].length; i++){
				if(i>0){
					idsTelefonos = idsTelefonos + "_";
				}
				idsTelefonos = idsTelefonos + valor[1][i];
			}
			document.getElementById('figuraFormView.idsTelefonosNuevo').value = idsTelefonos;

			if(valor[2].length != null && valor[2].length>0){
				document.getElementById('figuraFormView.idEmailNuevo').value = valor[2][0];
			}

			// se actualizan los datos
			var action = pagina;
			document.forms[0].action = action;

			if (esVehiculo == true){
				submitFormActionMsg(document.forms[0],action,null,'iTabContent',null);
			}else{
				submitFormActionMsg(document.forms[0],action,null,'iAreaTrabajo',null);
			}
		}
	}
}

/* Funcion para la busqueda de una persona del sistema */
function buscarPsnSistemaT(pag, target){		
	var valor = lanzarVentana(pag,600,400);		

	if (valor != undefined){
		setValue('figuraFormView.tipoIdent.id',valor[8]);
		setValue('figuraFormView.docIdent', valor[1]);
		setValue('figuraFormView.idPersona', valor[0]);
		validarNumeroDocumento(actionObtenerPersona, target);
	}
}

/* Funcion para limpiar datos */
function limpiarDatosFormulario(form){
	var campos = form.elements;

	for(var i= 0;i<campos.length; i++){
		if(campos[i] != undefined){
			var campo = campos[i].name;
			if ( campo.substring(0,14) == 'figuraFormView'){
				switch(campos[i].type){
				case "text":
					campos[i].value = "";
					campos[i].disabled = false;
					break;
				case "textarea":	           
					campos[i].value = "";
					campos[i].disabled = false;
					break;
				case "checkbox":	    
					campos[i].selectedIndex = 0;          
					campos[i].checked = false;
					campos[i].disabled = false;
					break;
				case "select-one":	               
					campos[i].selectedIndex = 0;
					campos[i].disabled = false;
					break;
				case "hidden":	               
					campos[i].value = "";
					break;
				}
			}
		}
	}
	//document.getElementById('figuraFormView.pais.id').value=64;
	//document.getElementById('figuraFormView.idioma.id').value=1;

	habilitarImagenes();
}


function limpiarTelefonos(){
	document.getElementById('figuraFormView.telefono1').value="";
	document.getElementById('figuraFormView.telefono2').value="";
	document.getElementById('figuraFormView.telefono3').value="";
	document.getElementById('figuraFormView.email').value="";
	document.getElementById('figuraFormView.fax').value="";
}

function rellenarCerosNif(){
	var idTipoIdent = document.getElementById('figuraFormView.tipoIdent.id').value;
	var numIdent = document.getElementById('figuraFormView.docIdent').value;
	if (idTipoIdent==nif)
		document.getElementById('figuraFormView.docIdent').value=ponCerosIzq(numIdent, 9);
}

/* validacion numero documeton*/
function validarNumeroDocumento(action, target){
	var idTipoIdent = document.getElementById('figuraFormView.tipoIdent.id').value;
	var numIdent = document.getElementById('figuraFormView.docIdent').value;

	if (validaDocIdent()){
		if((idTipoIdent != "") && (numIdent != "")){
			var pag = action;
			muestraCargaIFrame();

			if(target == null || target == 'null' || target == '')
			{
				if (esVehiculo == true){
					submitFormActionMsg(document.forms[0],pag,null,'iTabContent',null);
				}else{
					submitFormActionMsg(document.forms[0],pag,null,'iAreaTrabajo',null);
				}
			}			
			else
			{
				submitFormActionMsg(document.forms[0],pag,null,target,null);
			}
		}
	}
}

/* Funcion que llama a la ventana modal para la busqueda de personas */
function lupaPersonas(target){

	pag=actionPersonas;
	var texto = document.forms[0].elements['figuraFormView.tipoIdent.id'].options[document.forms[0].elements['figuraFormView.tipoIdent.id'].selectedIndex].innerHTML;
	if (texto=="C.I.F."){
		pag = pag + "?tipoPersona=2";
	}else if (texto==""){
		pag = pag + "?tipoPersona=1";
	}else {
		pag = pag + "?tipoPersona=1";
	}
	pag = pag + "&razonSocial="+document.getElementById('figuraFormView.razonSocial').value;
	pag = pag + "&nombre="+document.getElementById('figuraFormView.nombre').value;
	pag = pag + "&tipoIdentificador="+document.getElementById('figuraFormView.tipoIdent.id').value;
	pag = pag + "&identificador="+document.getElementById('figuraFormView.docIdent').value;
	pag = pag + "&apel1="+document.getElementById('figuraFormView.apellido1').value;
	pag = pag + "&apel2="+document.getElementById('figuraFormView.apellido2').value;

	buscarPsnSistemaT(pag, target);
}

function lupaProfesionales(target){
	pag=actionProfesionales;
	var texto = document.forms[0].elements['figuraFormView.tipoIdent.id'].options[document.forms[0].elements['figuraFormView.tipoIdent.id'].selectedIndex].innerHTML;
	if (texto=="C.I.F."){
		pag = pag + "?idTipoPersona=2";
	}else {
		pag = pag + "?idTipoPersona=1";
	}

	pag = pag + "&idTipoProfesional=&idTipoProveedor="+document.getElementById('figuraFormView.tipoProveedor.id').value;
	pag = pag + "&idTipoIdent="+document.getElementById('figuraFormView.tipoIdent.id').value;
	pag = pag + "&docIdent="+document.getElementById('figuraFormView.docIdent').value;
	pag = pag + "&consorcio=0";
	//pag = pag + "&razonSocial="+document.getElementById('figuraFormView.razonSocial').value;
	//pag = pag + "&nombre="+document.getElementById('figuraFormView.nombre').value;
	//pag = pag + "&apel1="+document.getElementById('figuraFormView.apellido1').value;
	//pag = pag + "&apel2="+document.getElementById('figuraFormView.apellido2').value;

	var valor = lanzarVentana(pag, 700, 450);
	   
	if (valor != undefined){
		setValue('figuraFormView.tipoIdent.id',valor[0]);
		setValue('figuraFormView.docIdent', valor[1]);
		setValue('figuraFormView.idProveedor', valor[3]);
		setValue('figuraFormView.swSubordinado', valor[4]);
		setValue('figuraFormView.codCentro', valor[5]);
		validarNumeroDocumento(actionObtenerPersona, target);
	}
}

function lupaAseguradoras(target){
	pag=actionAseguradoras;
	var valor = lanzarVentana(pag,600,480);		

	if (valor != undefined){
		setValue('figuraFormView.docIdent', valor[1]);
		setValue('figuraFormView.idAseguradora', valor[0]);

		if(valor[0] != ""){
			var pag = actionObtenerAseguradora;
			muestraCargaIFrame();

			if(target == null || target == 'null' || target == '')
			{
				if (esVehiculo == true){
					submitFormActionMsg(document.forms[0],pag,null,'iTabContent',null);
				}else{
					submitFormActionMsg(document.forms[0],pag,null,'iAreaTrabajo',null);
				}
			}			
			else
			{
				submitFormActionMsg(document.forms[0],pag,null,target,null);
			}
		}
	}
}

function lupaJuzgados(target){
	var url = accionBusquedaJuzgado;
	muestraCarga();
	var valor = lanzarVentana(url,700,550);
	ocultaCarga();

	if (valor != null){
		setValue('figuraFormView.razonSocial', valor[1]);
		setValue('figuraFormView.idJuzgado', valor[0]);

		if (document.getElementById('sntroRgoAutoView.juzgado.id') != null){
			document.getElementById('sntroRgoAutoView.juzgado.id').value = valor[0];
			document.getElementById('sntroRgoAutoView.juzgado.nombre').value = valor[1];
		}	

		if ( valor[0] != ""){
			var pag = actionObtenerJuzgado;
			muestraCargaIFrame();

			if(target == null || target == 'null' || target == '')
			{
				if (esVehiculo == true){
					submitFormActionMsg(document.forms[0],pag,null,'iTabContent',null);
				}else{
					submitFormActionMsg(document.forms[0],pag,null,'iAreaTrabajo',null);
				}
			}			
			else
			{
				submitFormActionMsg(document.forms[0],pag,null,target,null);
			}
		}
	}
}


function habilitarImagenes(){
	if (document.getElementById('btLimpiar'))document.getElementById('btLimpiar').disabled=false;
	if (document.getElementById('btLimpiarPsn'))document.getElementById('btLimpiarPsn').disabled=false;
	if (document.getElementById('imgBusqPersona'))document.getElementById('imgBusqPersona').disabled=false;
	if (document.getElementById('imgBusqDatosPsn'))document.getElementById('imgBusqDatosPsn').disabled=false;

	if (document.getElementById('figuraFormView.fecNacimiento').value == ''){
		document.getElementById('imgBusqFecNaci').disabled=false;
	}

	if (document.getElementById('figuraFormView.fecCarnet').value == ''){
		document.getElementById('imgBusqFecCarnet').disabled=false;
	}

	if (document.getElementById('figuraFormView.localidad').value == ''){
		document.getElementById('imgBusqLocalidadFig').disabled=false;
	}
}

function habilitarElementos(auxDeshabilitar){
	var listaInput = document.getElementsByTagName('input');
	var listaSelect = document.getElementsByTagName('select');
	var campo = '';

	if (auxDeshabilitar != 'true'){
		for (i=0;i < listaInput.length; i++){
			input = listaInput[i];
			campo=input.name;
			if (input.value == '' && campo.substring(0,14) == 'figuraFormView'){
				input.disabled=false;
			}
		}

		for (i=0;i < listaSelect.length; i++){
			select = listaSelect[i];
			campo = select.name;
			if (select.value == '' && campo.substring(0,14) == 'figuraFormView'){
				select.disabled=false;
			}
		}

		habilitarImagenes();
	}
}

function operacionesOnLoadFigura() {
	controlTipoPersona('figuraFormView.tipoIdent.id','cNFisica','cFisica','cJuridica','cNJuridica','cNSexo','cSexo', 'cFechas','cNIdioma','cIdioma');

	idNumKm = document.getElementById('figuraFormView.numKm.id').value;
	if (idNumKm == km){
		showHide('kilometroFig', true);
		showHide('numeroFig', false);
	}else{
		showHide('kilometroFig', false);
		showHide('numeroFig', true);
	}
	//habilitarElementos(deshabilitar);
	ocultaCarga();
}


function cambiarNumKmFiguras(value){
	var id = document.getElementById('figuraFormView.numKm.id').value;
	if (id != null){
		if (id == value){
			document.getElementById('numeroFig').style.display = 'none';
			document.getElementById('kilometroFig').style.display = 'block';

			document.getElementById('figuraFormView.numeroVia').value = "";

		}else{
			document.getElementById('numeroFig').style.display = 'block';
			document.getElementById('kilometroFig').style.display = 'none';

			document.getElementById('figuraFormView.kilometro').value = "";
		}
	}
}

function validarDomiciloCompleto(){

	//Compruebo si con los datos del formulario podria promocionara a persona en caso que no lo fuese
	if(document.getElementById('figuraFormView.tipoIdent.id').value != '' && 
			document.getElementById('figuraFormView.docIdent').value != '' &&
			(document.getElementById('figuraFormView.razonSocial').value != '' || 
					document.getElementById('figuraFormView.nombre').value != '') ){

		//Si alguno de los datos del domicilio no esta vacio, se debera cumplimentar completamente	
		if(document.getElementById('figuraFormView.tipoVia.id').value != '' ||
				document.getElementById('figuraFormView.via').value != '' ||
				document.getElementById('figuraFormView.pais.id').value != '' ||
				document.getElementById('figuraFormView.localidad').value != '' ||
				document.getElementById('figuraFormView.provincia.id').value != '' ||
				document.getElementById('figuraFormView.codPostal').value != '' ||
				document.getElementById('figuraFormView.numeroVia').value != '' ||
				document.getElementById('figuraFormView.kilometro').value != ''){


			if(document.getElementById('figuraFormView.tipoVia.id').value == '' ||
					document.getElementById('figuraFormView.via').value == '' ||
					document.getElementById('figuraFormView.pais.id').value == '' ||
					document.getElementById('figuraFormView.localidad').value == '' ||
					document.getElementById('figuraFormView.provincia.id').value == '' ||
					document.getElementById('figuraFormView.codPostal').value == '' ||
					document.getElementById('figuraFormView.numeroVia').value == '' ||
					document.getElementById('figuraFormView.kilometro').value == ''){

				return false;
			}
		}
	}
	return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion que mira si el tipo de identificador y el numero de documento son correctos y
//lanza un alert en caso de que no lo sean
////////////////////////////////////////////////////////////////////////////////////////////////
function validaDocIdent(){
	var idTipoIdent = document.getElementById('figuraFormView.tipoIdent.id').value;
	var numIdent = document.getElementById('figuraFormView.docIdent').value;
	var correcto = false;

	if (idTipoIdent != null && idTipoIdent != "" && numIdent != null && numIdent != ""){
		var retorno = valida_nif_cif_nie(numIdent);

		if (idTipoIdent == 2 && retorno == 1){
			correcto = true;
		} else if (idTipoIdent == 1 && retorno == 2){
			correcto = true;
		} else if (idTipoIdent == 3 && retorno == 3){
			correcto = true;
		} else if (idTipoIdent == 4){
			correcto = true;
		} 

		if (!correcto) {
			document.getElementById('figuraFormView.docIdent').value="";
			alert(mensajeDocIdentIncorrecto);
		}
	}
	return correcto;      
}
