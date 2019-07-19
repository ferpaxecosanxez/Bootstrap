
function seleccionar(obj)  {
     var valor = new Array();
     var cells = obj.cells;
      for(var i=0; i<cells.length; i++)  {
        valor[i] = cells[i].innerHTML;
      }
      selectRow(obj);
      window.returnValue = valor;
}

function selectRow(row) {
    var cells = row.cells;
    for (var i = 0; i < cells.length; i++) {
    	alert(i + " " + cells[i].className);
    	if(cells[i].className != "oculta"){
    		cells[i].className = "selectedRow";
    	}
    	alert(i + " " + cells[i].className);
    }
    resetSelected(row);
}

function resetSelected(row) {
    if (tdAnterior != null && tdAnterior != row) {
       cells = tdAnterior.cells;
       alert(i + " " + cells[i].className);
       for (var i = 0; i < cells.length; i++) {
          cells[i].className = "";
       }
       alert(i + " " + cells[i].className);
    }
    if (row != null) {
       tdAnterior = row;
    } else {
       tdAnterior = null;
    }
}

function mantenimientoProceso(form, action) {
     form.action = action;
     form.submit();
}

function limpiarProceso() {  
	document.forms[0].elements["proceso.codigo"].value = '';
	document.forms[0].elements["proceso.id"].value = '';
	//document.forms[0].elements["proceso.url"].value = '';
	document.forms[0].elements["proceso.descripcion"].value = '';
	document.getElementById("botonAnadir").className = "boton2Disabled";
	document.getElementById("botonEliminar").className = "boton2Disabled";
}

function buscarProceso(action){
	var pag = action + "?pagina=1";
	var codProceso = document.getElementById("codProceso").value;
	
	if(codProceso != ''){
		pag += "&codigo=" + codProceso;
	}
	
	var valor = lanzarVentana(pag,600,530);
 	if(valor != undefined) {
	   setValue("proceso.codigo", valor[0]);
	   setValue("proceso.descripcion", valor[1]);
	   setValue("proceso.id", valor[3]);
	   //setValue("proceso.url", valor[4]);
	   document.getElementById("botonAnadir").className = "boton2";
   }
}

function crearTipoAnotacion(action){
	if(validarTipoAnotacion()){
		document.forms[0].action = action;
		submitFormMsg(document.forms[0], null, 'iAreaTrabajo', mensajeAlta);
	}
}

function modificarTipoAnotacion(action){
	if(validarTipoAnotacion()){
		document.forms[0].action = action;
		submitFormMsg(document.forms[0], null, 'iAreaTrabajo', mensajeModificacion);
	}
}

function controlarCampos(){
	
	var tipoAlermen = document.getElementById("tipoAlermen").value;
	
	if(tipoAlermen == 5 || tipoAlermen == 7){
		document.getElementById("numDiasImgOblig").style.display="none";
		document.getElementById("plazoAsignacionImgOblig").style.display="none";
		//document.getElementById("plazorechazoImgOblig").style.display="none";
		//document.getElementById("plazorechazoUtImgOblig").style.display="none";
		document.getElementById("numDiasReenvioImgOblig").style.display="none";
		//document.getElementById("apartirDeImgOblig").style.display="none";
	} else {
		document.getElementById("numDiasImgOblig").style.display="block";
		document.getElementById("plazoAsignacionImgOblig").style.display="block";
		//document.getElementById("plazorechazoImgOblig").style.display="block";
		//document.getElementById("plazorechazoUtImgOblig").style.display="block";
		document.getElementById("numDiasReenvioImgOblig").style.display="block";
		//document.getElementById("apartirDeImgOblig").style.display="none";
	}
	//controlarApartirDe();
	controlarTextoLibre();
	controlarBloqueoGestion();
	controlarTareas();
}

function controlarApartirDe(){
	if(document.getElementById("plazoUtRechazo").value == 2){
		document.getElementById("apartirDeImgOblig").style.display="block";
	} else {
		document.getElementById("apartirDeImgOblig").style.display="none";
	}	
}

function controlarTextoLibre(){
	
	var tipoAlermen = document.getElementById("tipoAlermen").value;
	
	if(tipoAlermen == 3){
		document.getElementById("comboTextoLibre").value = "1";
	} else {
		document.getElementById("comboTextoLibre").value = "0";
	}	
}

function controlarBloqueoGestion(){
	
	var tipoAlermen = document.getElementById("tipoAlermen").value;
	
	if(tipoAlermen == 1 || tipoAlermen == 5 || tipoAlermen == 6){
		document.getElementById("bloqueoGest").value = "1";
	} else {
		document.getElementById("bloqueoGest").value = "0";
	}
}

function controlarTareas(){
	
	var tipoAlermen = document.getElementById("tipoAlermen").value;
	var importeObj = document.getElementsByName("tipoAnotacion.importe")[0];
	var plazoBuenoObj = document.getElementsByName("tipoAnotacion.plazoBueno")[0];
	var plazoNormalObj = document.getElementsByName("tipoAnotacion.plazoNormal")[0];
//	alert(tipoAlermen);
	if(tipoAlermen != 6){
		importeObj.value = "";
//		importeObj.disabled = true;
//		importeObj.style.readonly = true;
		plazoBuenoObj.value = "";
//		plazoBuenoObj.disabled = true;
//		plazoBuenoObj.style.readonly = true;
		plazoNormalObj.value = "";
//		plazoNormalObj.disabled = true;
//		plazoNormalObj.style.readonly = true;
//		alert(importeObj.value);
//		alert(plazoBuenoObj.value);
//		alert(plazoNormalObj.value);
	} else {
		// Por si estaban deshabilitados
		importeObj.disabled = false;
		plazoBuenoObj.disabled = false;
		plazoNormalObj.disabled = false;
	}
}

function validarTipoAnotacion(){
	
	var numDias = document.getElementById("numDias").value;
	var tipoAlermen = document.getElementById("tipoAlermen").value;
	var unidadTiempoAsig = document.getElementsByName("tipoAnotacion.plazoUt.id")[0].value;
	var numDiasReenvio = document.getElementsByName("tipoAnotacion.numDiasReenvio")[0].value;
	var plazoRechazo = document.getElementsByName("tipoAnotacion.plazoRechazo")[0].value;
	var utRechazo = document.getElementsByName("tipoAnotacion.plazoUtRechazo.id")[0].value;
	var apartirDe = document.getElementsByName("tipoAnotacion.apartirDe.id")[0].value;
	var swLibre = document.getElementById("comboTextoLibre").value;
// Campos comentados para el desarrollo de agenda de PSN hasta que se vea si son necesarios
//	var importe = document.getElementsByName("tipoAnotacion.importe")[0].value;
//	var plazoBueno = document.getElementsByName("tipoAnotacion.plazoBueno")[0].value;
//	var plazoNormal = document.getElementsByName("tipoAnotacion.plazoNormal")[0].value;
//	var bloqueoGestion = document.getElementById("bloqueoGest").value;
	var prioridad = document.getElementsByName("tipoAnotacion.prioridad")[0].value;
	var codigo = document.getElementsByName("tipoAnotacion.codigo")[0].value;;
	var descripcion = document.getElementsByName("tipoAnotacion.descripcion")[0].value;;
	var tipo = document.getElementsByName("tipoAnotacion.tipoAlermen.id")[0].value;
	var ambito = document.getElementsByName("tipoAnotacion.ambitoAlermen.id")[0].value;
	var entidad = document.getElementsByName("tipoAnotacion.entidad.id")[0].value;
	
	var esMarcaoHito = (tipoAlermen == 5 || tipoAlermen == 7);
	var error = false;
	var mensajeError = "";
	
	if(codigo == ""){
		mensajeError += msgCodigoOblig + "\n";
		error = true;
	}
	if(descripcion == ""){
		mensajeError += msgDescripcionOblig + "\n";
		error = true;
	}
	if(tipo == ""){
		mensajeError += msgTipoOblig + "\n";
		error = true;
	}
	if(ambito == ""){
		mensajeError += msgAmbitoOblig + "\n";
		error = true;
	}
	if(!esMarcaoHito && numDias == "") {
		mensajeError += msgPlazoAsigObl + "\n";
		error = true;
	}
	if(!esMarcaoHito && unidadTiempoAsig == "") {
		mensajeError += msgPlazoAsigUtObl + "\n";
		error = true;
	}
	if(!esMarcaoHito && numDiasReenvio == "") {
		mensajeError += msgPlazoReenvioOblig + "\n";
		error = true;
	}
	/* Se comenta validación, por si se decide rehabilitar el campo
	if(!esMarcaoHito && plazoRechazo == "") {
		mensajeError += msgPlazoRechazoOblig + "\n";
		error = true;
	}
	if(!esMarcaoHito && utRechazo == "") {
		mensajeError += msgPlazoRechazoUtOblig + "\n";
		error = true;
	}  
	if(utRechazo == 2 && apartirDe == "") {
		mensajeError += msgApartirDeOblig + "\n";
		error = true;
	}*/
	if(tipoAlermen == 3){
		if(swLibre == 0){
			mensajeError += msgSwLibreErroneo + "\n";
			error = true;
		}
	} else {
		if(swLibre == 1){
			mensajeError += msgSwLibreErroneo + "\n";
			error = true;
		}
	} 
	
	if(entidad == ""){
		mensajeError += msgEntidadObl + "\n";
		error = true;
	}

// Campos comentados para el desarrollo de agenda de PSN hasta que se vea si son necesarios	
//	if(tipoAlermen != 6 && importe != ""){
//		mensajeError += msgImporteErroneo + "\n";
//		error = true;
//	}
//	if(tipoAlermen != 6 && plazoBueno != ""){
//		mensajeError += msgPlazoBuenoErroneo + "\n";
//		error = true;
//	}
//	if(tipoAlermen != 6 && plazoBueno != ""){
//		mensajeError += msgPlazoNormalErroneo + "\n";
//		error = true;
//	}
	if(tipoAlermen == 6 && prioridad == ""){
		mensajeError += msgprioridadOblig + "\n";
		error = true;
	}
	
// Campos comentados para el desarrollo de agenda de PSN hasta que se vea si son necesarios
//	if((tipoAlermen == 1 || tipoAlermen == 5 || tipoAlermen == 6) && bloqueoGestion == 0){
//		mensajeError += msgGestBloErroneoALTaMa + "\n";
//		error = true;
//	} else if((tipoAlermen == 2 || tipoAlermen == 3 || tipoAlermen == 4 || tipoAlermen == 7) && bloqueoGestion == 1){
//		mensajeError += msgGestBloErroneoAcMeCoHi + "\n";
//		error = true;
//	}
//	if(plazoBueno != "" && plazoNormal != "" && numDiasReenvio != ""){
//		var sumaPlazos = parseInt(plazoBueno) + parseInt(plazoNormal);
//		if(sumaPlazos > parseInt(numDiasReenvio)){
//			mensajeError += msgPlazosMayorReevio + "\n";
//			error = true;
//		}
//	}
	if(plazoRechazo != "" && numDiasReenvio != "" && parseInt(plazoRechazo) >= parseInt(numDiasReenvio) && (plazoRechazo != "0" || numDiasReenvio != "0")){
		mensajeError += msgPlazoRechazoMayorReenvio + "\n";
		error = true;
	}
	
	if(error){
		alert(mensajeError);
	}
	
	return !error;
}

function seleccionaUsuario() 
{
 var pag = actionSelecUsuario; 
 var valor = lanzarVentana(pag,600,530)
 if(valor != undefined) {

   setValue("codigo", valor[0]);
   setValue("usuario.codUsuario", valor[0]);
   
   setValue("nombreCompleto", valor[1]);
   
   setValue("usuario.id", valor[2]);
   setValue("idUsuario", valor[2]);
   
   setValue("usuario.personaFisica.docIdent", valor[3]);

   setValue("usuario.personaFisica.nombre", valor[4]);
   setValue("usuario.personaFisica.apel1", valor[5]);
   setValue("usuario.personaFisica.apel2", valor[6]);
   
   setValue("idCargo", "");
   setValue("codCargo", "");
   setValue("descripcionCargo", "");
   setValue("cargo.id", "");
   setValue("cargo.codigo", "");
   setValue("cargo.descripcion", "");
   
   document.getElementById("botonAnadir").onclick = function(){envioFormulario(1);};
   document.getElementById("botonEliminar").onclick = function(){envioFormulario(2);};

 }
}

function seleccionaCargo() 
{
 var pag = actionSelecCargo;
 var valor = lanzarVentana(pag,600,530);
 if(valor != undefined) {

   setValue("codigo", "");
   setValue("usuario.codUsuario", "");
   
   setValue("nombreCompleto", "");
   
   setValue("usuario.id", "");
   setValue("idUsuario", "");
   
   setValue("usuario.personaFisica.docIdent", "");

   setValue("usuario.personaFisica.nombre", "");
   setValue("usuario.personaFisica.apel1", "");
   setValue("usuario.personaFisica.apel2", "");

   setValue("idCargo", valor[2]);
   setValue("codCargo", valor[0]);
   setValue("descripcionCargo", valor[1]);
   setValue("cargo.id", valor[2]);
   setValue("cargo.codigo", valor[0]);
   setValue("cargo.descripcion", valor[1]);
   
   document.getElementById("botonAnadir").onclick = function(){envioFormulario(3);};
   document.getElementById("botonEliminar").onclick = function(){envioFormulario(4);};

 }
}

function cargaDatosCajas(codigo,nombre,apellido1,apellido2,codCargo,nombreCargo)
{
	var nombreCompleto = nombre + ' ' + apellido1 + ' ' + apellido2;
	window.document.forms[0].codigo.value = codigo;
	window.document.forms[0].nombreCompleto.value = nombreCompleto;
	window.document.forms[0].codCargo.value = codCargo;
	window.document.forms[0].descripcionCargo.value = nombreCargo;
	
	// Si codigo es != '' es porq se cargan usuarios, si no, se cargan cargos.
	// Hay que modificar el comportamiento de los botones
	if(codigo != ''){
		document.getElementById("botonAnadir").onclick = function(){envioFormulario(1);};
		document.getElementById("botonEliminar").onclick = function(){envioFormulario(2);};
	} else {
		document.getElementById("botonAnadir").onclick = function(){envioFormulario(3);};
	    document.getElementById("botonEliminar").onclick = function(){envioFormulario(4);};
	}
}

/*
* En funcion de la accion seleccionada, cambia el action del formulario y hace el submit
* Parametro :
* Anadir Usuario -> 1, Eliminar Usuario -> 2, Anadir Cargo -> 3, Eliminar Cargo -> 4
*/
function envioFormulario( accion )
{

if ((document.forms[0].codigo.value != null && document.forms[0].codigo.value != '') || (document.forms[0].codCargo.value != null && document.forms[0].codCargo.value != ''))
{
   switch(accion)
   {
      case 1:
         window.document.forms[0].action = actionAnadirUsuario;
         window.document.forms[0].submit();
         break;
      case 2:
         window.document.forms[0].action = actionEliminarUsuario;
         window.document.forms[0].submit();
         break;
      case 3:
         window.document.forms[0].action = actionAnadirCargo;
         window.document.forms[0].submit();
         break;
      case 4:
         window.document.forms[0].action = actionEliminarCargo;
         window.document.forms[0].submit();
         break;
      default :
         return false;
    }
}
else
{
   return false;
}
}


function buscarTipoAnotacion(url){
	
	var claseAlermen = null;
	var idAreaFuncional = document.getElementById('idAreaFuncional').value;
	var tipoAlermen = document.getElementById('tipoAlermen').value;
	var idEntidad = document.getElementById('idEntidad').value;
	var idTipoGeneracionAnotacion = document.getElementById('idTipoGeneracionAnotacion').value;
	var codigo = document.getElementById('idCodigo').value;
	

	url = url + "?idAreaFuncional=" + idAreaFuncional + "&idTipoAlermen=" + tipoAlermen + "&codigo=" + codigo +"&idEntidad=" + idEntidad +"&idTipoGeneracionAnotacion=" + idTipoGeneracionAnotacion;
	
	
	var valor = lanzarVentana(url,800,600);
 	if(valor != undefined) {
 		setValue("anotacion.tipoAnotacion.codigo", valor[0]);
 		setValue("anotacion.tipoAnotacion.descripcion", valor[6]);
 		setValue("anotacion.tipoAnotacion.ambitoAlermen.descripcion", valor[2]);
 		
 		document.getElementById('idTipoAlermen').value =  valor[7];
 		if(document.getElementById('tipoAlermen')){
 			document.getElementById('tipoAlermen').value =  valor[7];
 		}
 		
 		document.getElementById('idEntidadAnotacion').value =  valor[8];
 		if(document.getElementById('idEntidad')){
 			document.getElementById('idEntidad').value =  valor[8];
 		}

 		var swLibre = valor[4];
 		
 		if(swLibre == 0 || swLibre == textoNO){
 			document.getElementById('descripcion').value = "";
 			document.getElementById('descripcion').disabled = true;
 		} else if(swLibre == 1 || swLibre == textoSI){
 			document.getElementById('descripcion').disabled = false;
 		}
 		
 		document.getElementById('idCargoReenTipoAnot').value =  valor[9];
 		document.getElementById('idUsuarioReenTipoAnot').value =  valor[10];
 		setValue("anotacion.tipoAnotacion.swCompartir", valor[11]);
 		
// 		if(document.getElementById('idTipoAlermen').value == alermenMarca || document.getElementById('idTipoAlermen').value == alermenHito){
// 			setValue("anotacion.fecAparicion", "");
// 			document.getElementsByName("anotacion.fecAparicion")[0].disabled = true;
// 			var valorDest = 0;
// 			var options = document.getElementsByName("destinatario.id")[0].options;
// 			document.getElementsByName("destinatario.id")[0].value = valor[8];
// 			document.getElementsByName("destinatario.id")[0].readonly = true;
// 		}
   }
}

function seleccionarProceso() {
	pag = actionProcesos;
	submitFormActionMsg(document.forms[0],pag,null,null,null);
}

function cargaPag(pPag, pBol, literal) {
    if((pPag.indexOf("http") == -1) && (pPag.indexOf("www.") == -1)) {
       top.window.frames["iAreaTrabajo"].location = pPag;
       parent.writeSituation(literal, pPag, true)
    } else {
       if (pPag.lastIndexOf("http") != -1) {
         ventana = window.open(pPag.substring(pPag.lastIndexOf("http")));
       } else if (pPag.lastIndexOf("www.")!=-1) {
         ventana = window.open('http://' + pPag.substring(pPag.lastIndexOf("www.")));
       }
    }
 }

function lanzarProceso(pPage, targetFrame, ctxt, uri, swDesacoplar, nivelLlamada) {
	var location = ctxt + uri;
	var winOpener = window.opener;
    // Si la agenda está desacoplada del área de trabajo
    if(swDesacoplar != null && swDesacoplar == 'S'){
    	if(nivelLlamada == 1){ // Llamada desde popup de búsqueda de anotaciones
    		winOpener.top.window.frames["iAreaTrabajo"].location = location;
    		// Se traslada el foco a la ventana del área de trabajo
    		self.blur();
    		winOpener.top.window.focus();
    		// Se lanza lavadora en area de trabajo
    		winOpener.top.window.muestraCarga();
    	} else if (nivelLlamada == 2){ // Llamada desde popup de detalle de anotación
    		var parentWinOpener = winOpener.opener;
    		if(parentWinOpener != undefined){
    			parentWinOpener.top.window.frames["iAreaTrabajo"].location = location;
    			parentWinOpener.top.window.focus();
    			// Se lanza lavadora en area de trabajo
            	parentWinOpener.top.window.muestraCarga();
    		} else {
    			winOpener.top.window.frames["iAreaTrabajo"].location = location;
    			// Se traslada el foco a la ventana del área de trabajo
    			winOpener.top.window.focus();
    			winOpener.top.window.muestraCarga();
    		}
        	self.blur();
    	}
    } else {
    	opener.top.window.frames["iAreaTrabajo"].location = location;
    	// Se lanza lavadora en area de trabajo
    	opener.top.window.muestraCarga();
    	setTimeout("window.close();", 300);
    }
 }

function openWindow(pag, width, height, name)  {
	var args = "centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=no, width=" + width + "px, height=" + height + "px, scrollbars=auto";
	ventana = window.open(pag, name, args);
}

var i=0;
function openWindowAltaManual() {
	openWindow(actionAltaManual,900,550, 'ven' + i);	
	i++;
}

function submitFormConsulta(nombreForm, action){
	var actionOld = document.forms[nombreForm].action;
	document.forms[nombreForm].action = action;
	submitForm(document.forms[nombreForm], null, 'iAreaTrabajo', true);
	document.forms[nombreForm].action = actionOld;
}

function submitFormBusqueda(pForm, swDesacoplar, width, height){
	// Si la agenda está desacoplada del área de trabajo
	if(swDesacoplar == 'S') {
		lanzarVentanaEmergente('about:blank', width, height, "modal=no");
	    document.miAgendaConsultaForm.setAttribute('target', 'win');
	    document.miAgendaConsultaForm.submit();
	} else {
		submitForm(document.miAgendaConsultaForm, null, 'iAreaTrabajo', true);
	}
}

function submitFormModalidad(targetFrame, pPage, swDesacoplar, width, height){
	// Si la agenda está desacoplada del área de trabajo
	if(swDesacoplar == 'S') {
		lanzarVentanaEmergente(pPage, width, height, "modal=no");
	} else {
		// Se ejecuta consulta en área de trabajo
		submitFormConsulta(targetFrame, pPage);
	}
}

function getPageModalidad(pPage, targetFrame, swDesacoplar, width, height){
	// Si la agenda está desacoplada del área de trabajo
	if(swDesacoplar == 'S') {
		lanzarVentanaEmergente(pPage, width, height, "modal=no");
	} else {
		getPage(pPage, targetFrame, null);
	}
}

function lanzarVentanaEmergente(pPage, width, height, params) {
   ventana = openWindowScroll(pPage, "win", width, height, params);
   return ventana;
}


function openWindowScroll(pPage, winName, width, height, params){
	var left = (screen.width/2)-(width/2);
	var args = ",centered=yes, status=no, alwaysRaised=yes, dependent=yes, directories=no, menubar=no, toolbar=no, resizable=yes,";
	args += "width="+width+ "px, height="+height+"px, scrollbars=yes, left="+left;
	ventana = window.open(pPage, winName, params+args);
	return ventana;
}

function getDetalleReferencia(pPage, targetFrame, ctx, uri, swDesacoplar){
	var nivel = 1;
	// Si la agenda está desacoplada del área de trabajo
	if(swDesacoplar == 'S') {
		lanzarProceso(pPage, targetFrame, ctx, uri, swDesacoplar, nivel);
	} else {
		getPage(ctx + uri, targetFrame, null);
	}
}

function cargarUsuarioXCargo(objId, url, idUsuarioDefecto, selectName){
	url = url + "?idCargoSelect=" + document.getElementById(objId).value;
	var ajax = new Ajax.Request( url, { method:"post",
                               			onComplete: function(resp){
                               				procesaCargarUsuarioXCargo(resp, idUsuarioDefecto, selectName)	
                               			}
                                });
}

function procesaCargarUsuarioXCargo(resp, idUsuarioDefecto, selectName){
	var listUsuariosAjax = new Array();
	var updateDatosAjax = resp.responseText;
	listUsuariosAjax = updateDatosAjax.split('|--|');
	var i=0;
	var innerUsuarios = '<select name="'+selectName+'" id="usuarioReen" style="width:100%">'+'<option value="0"></option>';
	var usuarioAjax = new Array();
	var selectedProp = '';
	while(i < listUsuariosAjax.length){
		usuarioAjax = listUsuariosAjax[i].split('|-|');
		if(idUsuarioDefecto != null && idUsuarioDefecto == usuarioAjax[1]){
			selectedProp = 'selected';
		} else {
			selectedProp = '';
		}
		innerUsuarios = innerUsuarios + '<option '+selectedProp+' value="'+usuarioAjax[1]+'">'+usuarioAjax[0]+'</option>';
		i++;
	}
	innerUsuarios = innerUsuarios + '</select>';
	jQuery("#divComboUsuarios").html(innerUsuarios)
}

function habilitarCargosTipoAnotacion(flag){
	if(flag == '1'){
		jQuery('#cargoReen').prop('disabled', false);
		jQuery('#usuarioReen').prop('disabled', false);
		jQuery('#cargoReen').change();
	} else {
		jQuery('#cargoReen').val(0);
		jQuery('#cargoReen').prop('disabled', 'disabled');
		jQuery('#usuarioReen').val(0);
		jQuery('#usuarioReen').prop('disabled', 'disabled');
	}
}

function actualizaAgenda() {
	getPage("<html:rewrite action='/miagenda/consulta/pendientes/reload'/>", 'iAgenda', true);
}