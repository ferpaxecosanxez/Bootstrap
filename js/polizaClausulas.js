/*
 *Clausulas en el Movimiento de Poliza
 */

/* variables globales de js */
var isOpcional = false; // control sobre tl tipo, para la accion de annadir una
						// clausula

/* funciones */
function reloadTinyMCE(cambiarSwModificable) {

	var clausulaTexto = tinyMCE.get('polClausulaView.texto');
	clausulaTexto
			.setContent(document.getElementById('polClausulaView.texto').value);
	if (cambiarSwModificable) {
		try{
			tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
					.get('polClausulaView.texto').id);
		}catch(err){
			//que falle eliminando no merece un alert
		}	
		generarEditorTextoEnriquecido("textareas", "simple", 1 - parseInt(document.getElementById('polClausulaView.swClausulaModi').value, 10));
	}
}



function loadDataRowClausula(row, form, trueValue, falseValue, linkedCombo) {
   var celdas = jQuery(row).children();
   jQuery(celdas.each(function(){
	   var td = jQuery(this);
	   valor = jQuery.trim(td.text());
	   if (td.attr("id") == 'polClausulaView.swClausulaModi') {
			jQuery('#polClausulaView.titulo').readOnly = jQuery.trim(valor) == valorNo; 
	   }
	   
	   if (td.attr("id") != 'polClausulaView.tituloUsuario') {
			if (td.attr("id") == 'polClausulaView.textoUsuario') {
				jQuery("#textoUsuario").html(valor);
			} else {   
			   //para tratar variables booleanas
			   if (trueValue != null && falseValue != null){
			      if (valor == trueValue){
			         valor = "true";
			      }else if (valor == falseValue){
			         valor = "false";
			      }
			   }
			   var $form = jQuery(form);
			   var field = $form.find(":input[name='"+td.attr("id")+"']");
			   switchData(field, linkedCombo);
	   		}
	   }
	   if(td.attr("class") != "oculta"){
		   td.attr("class", "selectedRow");
	   }
	 })
   );
   resetSelected(row);
   //bugAsefa204: controlamos errores javascript
   try{
		reloadTinyMCE(false);
   }catch(err){
		alert('Error cargando editor de texto enriquecido, por favor recargue la página');
   }	
}

function controlAdicional(fila, form) {

	// Botón eliminar no estará activo si la clausula es Automática
	var valorTipo = '';
	var modificable = '';
	cells = fila.cells;
	for (i = 0; i < cells.length; i++) {
		td = cells(i);
		if (td.id != '') {
			valor = td.innerText;
			if (valor.toUpperCase() == 'AU' || valor.toUpperCase() == 'LI'
					|| valor.toUpperCase() == 'OP') {
				valorTipo = valor;
			}
			// Recuperamos si es modificable o no
			if (td.id == 'polClausulaView.swClausulaModi') {
				modificable = trim(valor.toLowerCase());
			}
		}
	}

	var combo = form.elements("polClausulaView.tipoClausula");
	var swModificacion = document
			.getElementById("polClausulaView.swClausulaModi");

	if (valorTipo == 'AU') {
		document.getElementById("botonEliminar").disabled = true;
		if (combo.length < 4) {
			combo.options[combo.length] = new Option('AUTOMATICO', valorTipo);
		}
	}

	mismoIdioma = document.getElementById("mismoIdiomaHidden").value;

	if (mismoIdioma == "false" && valorTipo != "LI") {
		document.getElementById("divTextoComunicacion").style.display = "block";
	} else {
		document.getElementById("divTextoComunicacion").style.display = "none";
	}
	seleccionarValorTipo(valorTipo, combo);
	combo.disabled = true;
	// Eliminamos la instancia actual de tiny
	//bugAsefa204: controlamos errores javascript
	try{
		tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
				.get('polClausulaView.texto').id);
	}catch(err){
		//que falle eliminando no merece un alert
	}	
	try{
		if (modificable == 'no') {
			generarEditorTextoEnriquecido("textareas", "simple", 1);
			swModificacion.value = 0;
		} else if (modificable == 'si' || modificable == 'sí') {
			generarEditorTextoEnriquecido("textareas", "simple", 0);
			swModificacion.value = 1;
		}
	}catch(err){
		alert('Error cargando editor de texto enriquecido, por favor recargue la página');
	}	
}

function seleccionarValorTipo(elemento, combo) {
	var cantidad = combo.length;
	for (i = 0; i < cantidad; i++) {
		if (combo[i].value == elemento) {
			combo[i].selected = true;
		}
	}
}

function eliminarValorTipo(elemento, combo) {
	var cantidad = combo.length;
	for (i = 0; i < cantidad; i++) {
		if (combo[i] != undefined && combo[i].value == elemento) {
			combo.remove(i);
		}
	}
}

function limpiarCamposClau() {

	document.getElementById("polClausulaView.codClausula").value = "";
	document.getElementById("polClausulaView.orden").value = "";
	document.getElementById("polClausulaView.titulo").value = "";
	document.getElementById('polClausulaView.titulo').readOnly = false;
	document.getElementById("polClausulaView.tipoClausula").value = "";
	document.getElementById("polClausulaView.swClausulaParametros").value = "";
	document.getElementById("polClausulaView.swClausulaModi").value = "";
	document.getElementById("polClausulaView.id").value = "";
	document.getElementById("polClausulaView.idProdClausula").value = "";
	document.getElementById("textoUsuario").innerHTML = "";
	document.getElementById("divTextoComunicacion").style.display = "none";
	var combo = document.getElementById("polClausulaView.tipoClausula");
	// Habilitamos el select
	combo.disabled = false;
	// Si existe el valor automático lo eliminamos
	eliminarValorTipo("AU", combo);

	// Inicializar el control sobre opcionales
	isOpcional = false;

	// Eliminamos la instancia actual de tiny
	tinyMCE.execCommand('mceRemoveControl', false, tinyMCE
			.get('polClausulaView.texto').id);
	generarEditorTextoEnriquecido("textareas", "simple", 0);
	var clausulaTexto = tinyMCE.get('polClausulaView.texto');
	clausulaTexto.setContent("");
	jQuery('#polClausulaView\\.idAmbitoClausula option')[0].selected=true;
	jQuery('#polClausulaView\\.idAmbitoClausula').change();
	jQuery('#polClausulaView\\.desAmbitoClausula').val("");
	jQuery('#polClausulaView\\.idGarantia').val("");
	jQuery('#polClausulaView\\.garantiaPT').val("");
	jQuery('#polClausulaView\\.desGarantia').val("");

}

function modificaClausula(action) {

	var combo = document.getElementById("polClausulaView.tipoClausula");
	var texto = document.getElementById("polClausulaView.texto");
	combo.disabled = false;
	texto.disabled = false;

	var ed = tinyMCE.get('polClausulaView.texto');
	document.getElementById("polClausulaView.texto").value = ed.getContent();

	if (submitFormActionMsg(polClausulaForm, action, validatePolClausulaForm)) {
		limpiarCamposClau();
		modificaBotones('');
	}
}

function eliminaClausula(action) {
	var combo = document.getElementById("polClausulaView.tipoClausula");
	var texto = document.getElementById("polClausulaView.texto");
	combo.disabled = false;
	texto.disabled = false;
	document.forms[0].action = action;
	submitForm(polClausulaForm, null, null);
	limpiarCamposClau();
}

function lupa() {
	if (document.getElementById("polClausulaView.tipoClausula").value == "") {
		alert(mensajeErrorSeleccionar);
	} else if (document.getElementById("polClausulaView.tipoClausula").value == codTipoAuto) {
		return;
	} else {		
		var valor = lanzarVentana(
				actionLupa + '?idAmbitoClausula=' + document.getElementById("polClausulaView.idAmbitoClausula").value
				+ '&tipoClausula='+ document.getElementById('polClausulaView.tipoClausula').value,
				700, 700);

		if (valor != null) {
			document.getElementById('polClausulaView.titulo').value = valor[3];
			document.getElementById('polClausulaView.texto').value = valor[4];
			var tipoClausula = document
					.getElementById("polClausulaView.tipoClausula").value;
			document.getElementById('polClausulaView.codClausula').value = valor[2];
			if (tipoClausula == codTipoOpcional) {
				isOpcional = true;				
			}
			if (document.getElementById("mismoIdiomaHidden").value == "false"
					&& tipoClausula != codTipoLibre) {
				document.getElementById("divTextoComunicacion").style.display = "block";
			} else {
				document.getElementById("divTextoComunicacion").style.display = "none";
			}
			document.getElementById("textoUsuario").innerHTML = valor[1];
			document.getElementById("polClausulaView.idProdClausula").value = valor[5];
			document.getElementById("polClausulaView.orden").value = valor[6];
			document.getElementById("polClausulaView.swClausulaModi").value = valor[7];
			reloadTinyMCE(true);
		}
	}
}

function annadirClausula(action) {
	if (document.getElementById("polClausulaView.tipoClausula").value == codTipoAuto) {
		alert(mensajeErrorNoValido);
	} else if (document.getElementById("polClausulaView.tipoClausula").value == codTipoOpcional
			&& isOpcional == false) {
		alert(mensajeErrorNoValido);
	} else {
		// Para la correcta validacion de struts, seteamos el
		// valor en los campos que usen TinyMCE.
		var ed = tinyMCE.get('polClausulaView.texto');
		document.getElementById("polClausulaView.texto").value = ed
				.getContent();
		submitFormActionMsg(polClausulaForm, action, validatePolClausulaForm);
	}
}

function swValor(valor) {		
	if (valor == codTipoLibre) {
		document.getElementById("polClausulaView.swClausulaParametros").value = "0";
		document.getElementById("polClausulaView.swClausulaModi").value = "1";
		
		visible = "none";
		
		document.getElementById('polClausulaView.codigo').readOnly = false;		
	}
	else
	{
		visible = "inline";
		document.getElementById('polClausulaView.codigo').readOnly = true;		
	}

	
	jQuery("#tdAmbitoTit").css({"display" : visible});
	jQuery("#tdAmbito").css({"display" : visible});
	jQuery("#imgLupa").css({"display" : visible});
	
}


